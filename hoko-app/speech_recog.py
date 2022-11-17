from ssl import ALERT_DESCRIPTION_ACCESS_DENIED
import requests
import json
import pykakasi
from recorder import record_audio, read_audio
import os
from dotenv import load_dotenv

load_dotenv()

API_ENDPOINT = 'https://api.wit.ai/'
API_FUNCTION_SPEECH = 'speech'

def recognize_speech(audiofile, duration):

    record_audio(duration, audiofile)

    audio = read_audio(audiofile)

    headers = {'authorization': 'Bearer ' + os.getenv('WIT_ACCESS_TOKEN'),
               'Content-Type': 'audio/wav'}

    resp = requests.post(API_ENDPOINT+API_FUNCTION_SPEECH, headers=headers,
                         data=audio)
    # print(resp.content)
    data = "["+resp.content.decode('utf-8')+"]"
    data = data.replace("}\r\n{", "},\r\n{")
    data = json.loads(data)


    print(data)
    text = ''
    if 'text' in data[len(data)-1]:
        text = data[len(data)-1]['text']
    print(text)

    return text


def get_romaji(duration):
    text = recognize_speech('myspeech.wav', duration)
    romaji = ''
    if text:
        print("\nYou said: {}".format(text))
        print("**************************************")
        kks = pykakasi.kakasi()
        result = kks.convert(text)
        for item in result:
            print("{}[{}] ".format(item['orig'],
                  item['hepburn'].capitalize()), end='')
            romaji += item['hepburn']
            print()
    return romaji


def evaluate_speech(target_word, user_input):
    if user_input == target_word:
        return 'Correct'
    else:
        return 'Incorrect'


if __name__ == "__main__":
    user_input = ''
    user_input = get_romaji(4)
    if user_input != '':
        print('You said: ' + user_input + ' which is: ' +
              evaluate_speech("neko", user_input))
    else:
        print("Unrecognized audio. Try again.")
