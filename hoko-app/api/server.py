from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import pykakasi as pk
import json

# Allow python scripts from other directories to be executed
import sys
from pathlib import Path
path = str(Path(Path(__file__).parent.absolute()).parent.absolute())
print(path)
sys.path.insert(0, path)

from speech import example
from speech import structure

# sys.path.insert(0, '..')
# from speech import example
app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)

## Test endpoint
@app.route('/data')
def return_data():
    data = example.get_example_text()
    return {
        'message': data
    }


@app.route('/reset')
def reset_game():
    return {
        'message': data
    }

@app.route('/speak')
def new_speech():
    kanji_text, display_error, error_chars = example.get_user_speech()
    return {
        'message': data
    }

# Switch the script used for displaying text
@app.route('/switch', methods=['POST'])
def switch_kanji():
    data = json.loads(request.data)
    if data['msgData']['displayType'] == 'kanji':
        kks = pk.kakasi()
        result = kks.convert(data['msgData']['displayText'])
        romaji_text = ""
        for word in result:
            romaji_text += word['hepburn'] + " "
        romaji_text = romaji_text[:len(romaji_text)-1]

    newMsgError = structure.Error(True, [])
    newMsgData = structure.Data(data['msgData']['id'], romaji_text, data['msgData']['kanjiText'], 'romaji', newMsgError)
    print(newMsgData.to_json())
    return {
        'message': newMsgData.to_json()
    }

@app.route('/undo')
def retrieve_previous():
    previousText = example.get_previous_text()
    return {
        'message': previousText
    }


if __name__ == "__main__":
    app.run()
