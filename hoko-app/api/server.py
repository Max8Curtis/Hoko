from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import json
import spacy
import os

# Allow python scripts from other directories to be executed
import sys
from pathlib import Path
path = str(Path(Path(__file__).parent.absolute()).parent.absolute())
sys.path.insert(0, path)

from speech import game_structs
from speech import convert_text
from speech import recorder
from speech import structure

nlp = spacy.load(os.path.join(Path(__file__).parent.absolute().parent.absolute(), 'speech', 'model'))

app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)

gameFactory = game_structs.GameFactory()

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

    @app.route('/reset')
    def reset_game():
        gameFactory.reset_game()
        config = gameFactory.game.to_json()
        return {
            'message': config
        }

    @app.route('/audio', methods=['POST'])
    def get_audio():
        audio_location = os.path.join(path, "speech", request.files['file'].filename)
        request.files['file'].save(audio_location)

        text, json_list = recorder.recognize_speech(audio_location, None, structure.Stack())
        print(text)
        # os.remove(audio_location)

        # Display error message if no audio detected
        if text == "":
            gameFactory.game.update_data(None, None, None, {'a': True, 'b':[]})
            config = gameFactory.game.to_json()
            print(config)
            return {
                'message': config
            } 

        ##### TESTING
        # text = '100メートル行ってください'
        #####

        error_chars = []

        # Predict move for each phrase in the text, then apply move sequentially
        phrases = convert_text.split_text(nlp, text)
        print(phrases)
        moves = convert_text.predict(nlp, phrases)
        print(moves)
        new_row, new_col, new_dir, valid_move = gameFactory.game.make_moves(moves)

        if valid_move:  
            # Convert text to display_type
            display_type = gameFactory.game.get_display_type()
            if display_type == 'romaji':
                display_text = structure.kanji_to_romaji(text)
            else:
                display_text = text

                # Obtain list of characters where confidence is below the threshold
                error_chars = structure.eval_errors(json_list, 0.2)

            gameFactory.game.update_data(display_text, text, display_type, {'display_error': False, 'error_chars': error_chars})
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
        if data['data']['displayType'] == 'kanji':
            romaji_text = structure.kanji_to_romaji(data['data']['kanjiText'])

        gameFactory.game.update_data(romaji_text, data['data']['kanjiText'], 'romaji', {'display_error': data['data']['error']['displayError'], 'error_chars':data['data']['error']['errorChars']})
        config = gameFactory.game.to_json()
        # print(newMsgData.to_json())
        return {
            'message': config
        }

    @app.route('/undo')
    def retrieve_previous():
        gameFactory.load_previous_config()
        config = gameFactory.game.to_json()
        return {
            'message': config
        }

if __name__ == "__main__":
    app.run()
