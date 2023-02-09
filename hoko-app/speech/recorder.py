import wave
import pyaudio
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

def record_audio(duration, filename):

    FORMAT = pyaudio.paInt16 
    CHANNELS = 2
    RATE = 44100
    CHUNK = 1024

    audio = pyaudio.PyAudio()
     
    stream = audio.open(format=FORMAT,channels=CHANNELS,
                        rate=RATE, input=True,
                        frames_per_buffer=CHUNK)


    print("Listening...")

    frames = []

    for i in range(int(RATE / CHUNK * duration)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("Finished recording.")
      
    stream.stop_stream() 
    stream.close() 
    audio.terminate()

    wave_file = wave.open(filename, 'wb')
    wave_file.setnchannels(CHANNELS)
    wave_file.setsampwidth(audio.get_sample_size(FORMAT))
    wave_file.setframerate(RATE)
    wave_file.writeframes(b''.join(frames))
    wave_file.close()


def read_audio(filename):
    with open(filename, 'rb') as file:
        audio = file.read()
    return audio

def recognize_speech(audiofile, duration, stack):
    
    # record_audio(duration, audiofile)
    
    audio = read_audio(audiofile)
    
    headers = {'authorization': 'Bearer ' + os.getenv("WIT_ACCESS_TOKEN"),
               'Content-Type': 'audio/wav'}

    resp = requests.post(os.getenv("API_ENDPOINT")+os.getenv("API_FUNCTION_SPEECH"), headers = headers,
                         data = audio)
    data = resp.content.decode("utf-8")

    ###
    # Clean up reponse data
    data = data.replace("\r", ",")
    data = data.replace(" ", "")
    data = data.replace("\n","")

    json_list = decode_json(stack, data)
    # print(f"JSON_LIST: {json_list}")
    if type(json_list) != type(False):
        for x in json_list:
            print("JSON object:")
            print(x)
            print("")
        text = json_list[len(json_list)-1]['text']
    else:
        text = ""
      #
    ###
    error_chars = eval_errors(json_list, 0.2)
    print(error_chars)

    return text, error_chars

# Takes list of json objects, and returns list of character indexes where speech confidence is below a threshold (t)
def eval_errors(json_list, t):
    error_indexes = []
    for x in range(len(json_list)-1, 0, -1):
        if (json_list[x]['speech']['tokens'][0]['start'] != json_list[x-1]['speech']['tokens'][0]['start']) and (json_list[x]['speech']['tokens'][0]['end'] != json_list[x-1]['speech']['tokens'][0]['end']):
            text_end_index_high = len(json_list[x]['text'])
            conf_high = json_list[x]['speech']['tokens'][0]['confidence']

            text_end_index_low = len(json_list[x-1]['text'])
            conf_low = json_list[x-1]['speech']['tokens'][0]['confidence']

            # print(json_list[len(json_list)-1]['text'][text_end_index_low:text_end_index_high])

            if abs(conf_high - conf_low) < t:
                error_indexes.extend([y for y in range(text_end_index_low, text_end_index_high)])

    return error_indexes


def decode_json(stack, text):
    json_list = []
    json_text = ''
    block = False
    for i in range(0, len(text)):
        # print(f"Stack: {stack.get_stack()}")
        if block and text[i] != ",":
            block = False
        if not block:
            if text[i] == '{' or text[i] == '(' or text[i] == '[':
                stack.push(text[i])
            if text[i] == '}' or text[i] == ')' or text[i] == ']':
                if not(stack.compare_brackets(text[i])):
                    return False
            json_text += text[i]
            if stack.is_empty():
                print(json_text)           
                json_obj = json.loads(json_text)

                if len(list(json_obj.keys())) > 1:
                    json_list.append(json_obj)    
                print(json_list)       
                json_text = ''
                block = True

    return json_list


if __name__ == "__main__":
    text =  recognize_speech('myspeech.wav', duration=6)
    print(text)