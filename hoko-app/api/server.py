from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import pykakasi as pk
import json
import spacy
import os

# Allow python scripts from other directories to be executed
import sys
from pathlib import Path
path = str(Path(Path(__file__).parent.absolute()).parent.absolute())
print(path)
sys.path.insert(0, path)

from speech import example
from speech import game_structs
from speech import convert_text
from speech import recorder

nlp = spacy.load(os.path.join(Path(__file__).parent.absolute().parent.absolute(), 'speech', 'model'))
print(convert_text.predict(nlp, '100メートル行ってください'))

app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)

gameFactory = game_structs.GameFactory()
# gameFactory.new_game()
# gameFactory.save_game_state()
# print("Default game:")
# print(gameFactory.game.to_json())
# print(f"Char location: {gameFactory.game.get_character().get_row()} {gameFactory.game.get_character().get_col()} {gameFactory.game.get_character().get_direction()}")

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
        gameFactory.save_game_state()
        config = gameFactory.game.to_json()
        print("New game:")
        print(config)
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

        gameFactory.reset_game()
        config = gameFactory.game.to_json()
        return {
            'message': config
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
        # content = request.files['file']
        # print(content)
        # print(content.read().decode('utf-16-be'))
        # with open("audio.txt", "wb") as file: 
        #     file.write(content.read())
        # file = request.form.get('file')
        text = recorder.recognize_speech(os.path.join(Path(__file__).parent.absolute().parent.absolute(), 'speech', 'myspeech.wav'), 6)
        # print(text)
        text = '100メートル行ってください'
        move = convert_text.predict(nlp, text)
        # print(move)
        new_row, new_col, new_dir, valid_move = gameFactory.game.make_move(move)

        if valid_move:
             
            # Convert text to display_type
            display_type = gameFactory.game.get_display_type()
            if display_type == 'romaji':
                # print(f"game text: {gameFactory.game.get_display_text()}")
                display_text = kanji_to_romaji(text)
            else:
                display_text = text
            # print(f"display text: {display_text}")
            gameFactory.game.update_data(display_text, text, display_type, {'display_error': gameFactory.game.data.error.display_error, 'error_chars':gameFactory.game.data.error.error_chars})
            
            gameFactory.save_game_state()
        config = gameFactory.game.to_json()
        print(config)
        return {
            'message': config
        }

    # @app.route('/speak')
    # def new_speech():
    #     kanji_text, display_error, error_chars = example.get_user_speech()
    #     return {
    #         'message': data
    #     }

    # Switch the script used for displaying text
    @app.route('/switch', methods=['POST'])
    def switch_kanji():
        data = json.loads(request.data)
        print(data)
        if data['data']['displayType'] == 'kanji':
            romaji_text = kanji_to_romaji(data['data']['displayText'])

        gameFactory.game.update_data(romaji_text, data['data']['kanjiText'], 'romaji', {'display_error': False, 'error_chars':[]})
        config = gameFactory.game.to_json()
        # print(newMsgData.to_json())
        return {
            'message': config
        }

    @app.route('/undo')
    def retrieve_previous():

        # TODO: ADD FUNCTIONALITY TO DISABLE UNDO BUTTON IF ALREADY AT START OF GAME

        gameFactory.load_previous_config()
        config = gameFactory.game.to_json()
        return {
            'message': config
        }

def kanji_to_romaji(text):
    kks = pk.kakasi()
    result = kks.convert(text)
    romaji_text = ""
    for word in result:
        romaji_text += word['hepburn'] + " "
    romaji_text = romaji_text[:len(romaji_text)-1]
    
    return romaji_text


if __name__ == "__main__":
    app.run()
