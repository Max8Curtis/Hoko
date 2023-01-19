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
from speech import game_structs
from speech import convert_text

app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)

gameFactory = game_structs.GameFactory()
gameFactory.new_game()
print("Default game:")
print(gameFactory.game.to_json())
print(f"Char location: {gameFactory.game.get_character().get_row()} {gameFactory.game.get_character().get_col()} {gameFactory.game.get_character().get_direction()}")

class API:
    ## Test endpoint
    @app.route('/data')
    def return_data():
        data = example.get_example_text()
        return {
            'message': data
        }

    @app.route('/start')
    def start_game():
        gameFactory.new_game()
        game = gameFactory.game
        config = game.to_json()
        print("New game:")
        print(config)
        # config = example.new_config([1,2,3,4,5,6,7,8,9])
        return {
            'message': config
        }

    @app.route('/move', methods=['POST'])
    def move_char():
        data = json.loads(request.data)
        text = data['msgData']['kanjiText']
        # print(text)
        move = convert_text.convert(text)
        # print(move)
        new_row, new_col, new_dir, valid_move = gameFactory.game.make_move(move)
        # print(f"Validity of this move is {valid_move}")
        # print(f"New character position:")
        # print(f"Row: {new_row}, Col: {new_col}, Direction: {new_dir}")
        config = gameFactory.game.to_json()
        # print(config)
        return {
            'message': config
        }

    @app.route('/reset')
    def reset_game():
        game.reset_game()
        return {
            'message': game.to_json()
        }

    @app.route('/audio', methods=['POST'])
    def get_audio():
        # data = json.loads(request.data)
        # print(data)
        # print(request.headers)
        # s = request.get_data(parse_form_data=True)
        # print(request.get_data(parse_form_data=True))
        # print(s.decode('utf-16'))
        # print(s[0:10])
        # print(request.files['file'])

        # print(request.form)
        # print(request.form.get('file'))
        content = request.files['file']
        # print(content)
        print(content.read().decode('utf-16-be'))
        # with open("audio.txt", "wb") as file: 
        #     file.write(content.read())
        # file = request.form.get('file')
        return {
            'message': 'hi there'
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

        newMsgError = structure.Error(False, [])
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
