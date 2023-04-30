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

print("Server starting...")

nlp = spacy.load(os.path.join(Path(__file__).parent.absolute().parent.absolute(), 'speech', 'model'))

app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)

gameFactory = game_structs.GameFactory()

class API:
        
    ## Test endpoint
    @app.route('/')
    def return_data():
        return 'API working'

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
        # Get audio file
        audio_location = os.path.join(path, "speech", request.files['file'].filename)
        request.files['file'].save(audio_location)
        myspeechlocation = os.path.join(path, "speech", "voice.mp3")

        os.remove(myspeechlocation)

        text, json_list = recorder.recognize_speech(audio_location, None, structure.Stack())

        # Display error message if no audio detected
        if text == "":
            gameFactory.game.update_data(None, None, None, {'a': True, 'b':[]})
            config = gameFactory.game.to_json()
            print(config)
            return {
                'message': config
            } 

        error_chars = []

        # Predict move for each phrase in the text, then apply move sequentially
        phrases = convert_text.split_text(nlp, text)
        moves = convert_text.predict(nlp, phrases)
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

        
            gameFactory.game.update_data(display_text, text, display_type, {'display_error': False, 'error_chars': error_chars, 'invalid_move': False})
        else:
            gameFactory.game.update_data(None, None, None, {'display_error': None, 'error_chars': None, 'invalid_move': True})

        gameFactory.save_game_state()
        config = gameFactory.game.to_json()
        
        # Return updated game configuration
        return {
            'message': config
        }

    # Switch the script used for displaying text
    @app.route('/switch', methods=['POST'])
    def switch_kanji():
        data = json.loads(request.data)

        # Transliterate text if written in pure Japanese
        if data['data']['displayType'] == 'kanji':
            romaji_text = structure.kanji_to_romaji(data['data']['kanjiText'])

        gameFactory.game.update_data(romaji_text, data['data']['kanjiText'], 'romaji', {'display_error': data['data']['error']['displayError'], 'error_chars':data['data']['error']['errorChars'], 'invalid_move':data['data']['error']['invalidMove']})
        config = gameFactory.game.to_json()
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
    app.run(host='0.0.0.0', port=5000)
