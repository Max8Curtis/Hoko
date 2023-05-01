import wave
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

def read_audio(filename):
    with open(filename, 'rb') as file:
        audio = file.read()
    return audio

def recognize_speech(audiofile, duration, stack):

    audio = read_audio(audiofile)

    headers = {'authorization': 'Bearer ' + os.getenv("WIT_ACCESS_TOKEN"),
               'Content-Type': 'audio/mpeg3'}

    resp = requests.post(os.getenv("API_ENDPOINT")+os.getenv("API_FUNCTION_SPEECH"), headers = headers,
                         data = audio)
    data = resp.content.decode("utf-8")

    # Clean up reponse data
    data = data.replace("\r", ",")
    data = data.replace(" ", "")
    data = data.replace("\n","")

    json_list = decode_json(stack, data)
        # If the JSON returned from Wit.ai is empty, json_list will be a bool, so `text` should be empty
    if type(json_list) != type(False):
        text = json_list[len(json_list)-1]['text']
    else:
        text = ""
    #
    ###
    return text, json_list

# Decode the wit.ai response object
def decode_json(stack, text):
    json_list = []
    json_text = ''
    block = False
    for i in range(0, len(text)):
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
                json_obj = json.loads(json_text)

                if len(list(json_obj.keys())) > 1:
                    json_list.append(json_obj)         
                json_text = ''
                block = True

    return json_list

if __name__ == "__main__":
    text =  recognize_speech('voice.mp3', duration=6)