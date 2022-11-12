from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import pykakasi as pk
import json

app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)


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


if __name__ == "__main__":
    app.run()
