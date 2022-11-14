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

# sys.path.insert(0, '..')
# from speech import example
app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)

@app.route('/speak')
def new_speech():
    kanji_text = example.get_user_speech()
    return {
        'ID': "0",
        'DisplayText': kanji_text,
        'KanjiText': kanji_text,
        'DisplayType': 'kanji'
    }


@app.route('/data')
def return_data():
    return {
        'ID': "0",
        'DisplayText': "私は大学生です",
        'KanjiText': "私は大学生です",
        'DisplayType': 'kanji'
    }


@app.route('/switch', methods=['POST'])
def switch_kanji():
    data = json.loads(request.data)
    print(data['displayType'])
    if data['displayType'] == 'kanji':
        kks = pk.kakasi()
        result = kks.convert(data['displayText'])
        romaji_text = ""
        for word in result:
            romaji_text += word['hepburn'] + " "
        romaji_text = romaji_text[:len(romaji_text)-1]

    return jsonify({
        'ID': data['id'],
        'DisplayText': romaji_text,
        'KanjiText': data['kanjiText'],
        'DisplayType': 'romaji'
    })

@app.route('/undo')
def retrieve_previous():
    previous_text = example.get_previous_text()
    return {
        'ID': "0",
        'DisplayText': previous_text,
        'KanjiText': previous_text,
        'DisplayType': 'kanji'
    }


if __name__ == "__main__":
    app.run()
