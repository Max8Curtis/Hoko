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

def recognize_speech(audiofile, duration):
    
    # record_audio(duration, audiofile)
    
    audio = read_audio(audiofile)
    
    headers = {'authorization': 'Bearer ' + os.getenv("WIT_ACCESS_TOKEN"),
               'Content-Type': 'audio/wav'}

    resp = requests.post(os.getenv("API_ENDPOINT")+os.getenv("API_FUNCTION_SPEECH"), headers = headers,
                         data = audio)
    data = resp.content.decode("utf-8")

    data = data.replace("\r", ",")
    data = data.replace(" ", "")
    res = data.rfind("text")

    text = ''
    res += 7
    while data[res] != '"':
        text += data[res]
        res+=1

    data = data.replace("\n","")
    return text

if __name__ == "__main__":
    text =  recognize_speech('myspeech.wav', duration=6)
    print(text)