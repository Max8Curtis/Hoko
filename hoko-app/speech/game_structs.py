import json
import random
import os
import copy
from pathlib import Path

#################
cwd = os.getcwd()
cur_file = str(Path(Path(__file__).parent))
os.chdir(cur_file)
MAPS = "./game_maps.json"
with open(MAPS, 'r') as j:
    maps = json.loads(j.read())
os.chdir(cwd)
#################

class Data:
    def __init__(self, display_text, kanji_text, display_type):
        self.display_text = display_text
        self.kanji_text = kanji_text
        self.display_type = display_type
        self.error = Error()

    def update(self, display_text, kanji_text, display_type, error):
        display_error = list(error.values())[0]
        error_chars = list(error.values())[1]
        if not(display_text == None and kanji_text == None and display_type == None):      
            self.display_text = display_text
            self.kanji_text = kanji_text
            self.display_type = display_type
            self.error.update(display_error, error_chars)
        else:
            self.error.update(display_error, error_chars)


    def to_json(self):
        return {
            'displayText': self.display_text,
            'kanjiText': self.kanji_text,
            'displayType': self.display_type,
            'error': self.error.to_json()
        }

class Error:
    def __init__(self):
        self.display_error = False
        self.error_chars = []

    def update(self, display_error, error_chars):
        self.display_error = display_error
        self.error_chars = error_chars

    def to_json(self):
        return {
            'displayError': self.display_error,
            'errorChars': self.error_chars
        }

class Map:
    def __init__(self):
        self.maps = copy.deepcopy(maps)
        self.chosen_map = self.choose_map()
        self.max_row = len(self.maps['objects']['maps'][str(self.chosen_map)]['layout'])-1
        self.max_col = len(self.maps['objects']['maps'][str(self.chosen_map)]['layout'][0])-1
        self.chosen_target = self.choose_target()
        chosen_target_row, chosen_target_col = self.get_row_col(str(self.chosen_target))
        self.update_map(chosen_target_row, chosen_target_col, "T")

    def choose_map(self):
        return random.choice(list(self.maps['objects']['maps']))

    def choose_target(self):
        return random.choice(list(self.maps['objects']['maps'][str(self.chosen_map)]['targets']))

    # Returns the row and column of the first occurence of a node
    def get_row_col(self, to_find):
        for row in range(len(self.maps['objects']['maps'][str(self.chosen_map)]['layout'])):
            for col in range(len(self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row])):
                if self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row][col] == to_find: 
                    return row, col

    def update_map(self, row, col, new_node):
        self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row][col] = new_node

    # Reverts a location to the original node
    def revert_location_to_node(self, row, col):
        self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row][col] = maps['objects']['maps'][str(self.chosen_map)]['layout'][row][col]

    def get_node_at(self, row, col):
        return self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row][col]

    # Returns index of chosen map and map data as tuple
    def get_map(self):
        return self.maps['objects']['maps'][str(self.chosen_map)]

    # Returns target letter and target name as tuple
    def get_target(self):
        return self.chosen_target

    def get_max_row(self):
        return self.max_row

    def get_max_col(self):
        return self.max_col

    def get_chosen_map_index(self):
        return self.chosen_map


class Character:
    def __init__(self, start_row, start_col, start_dir):
        self.row = start_row 
        self.col = start_col
        self.dir = start_dir

    def set_location(self, row, col):
        self.row = row
        self.col = col
        # print(self.row)

    def set_rotation(self, rot):
        self.dir = rot

    def rotate(self, rot):
        self.dir += rot
        self.dir = self.dir % 360

    def get_row(self):
        return self.row

    def get_col(self):
        return self.col

    def get_direction(self):
        return self.dir

class Game:
    def __init__(self):
        self.at_game_start = True
        self.game_won = False
        # self.prev_text = ""
        # self.cur_text = ""
        self.map = Map()
        self.char_start_row, self.char_start_col = self.place_character()
        self.char = Character(self.char_start_row, self.char_start_col, 0)
        # self.error = Error()
        self.data = Data("", "", 'kanji')

    def place_character(self):
        map_data = self.map.get_map()['layout']
        for row in range(len(map_data)):
            for col in range(len(map_data[row])):
                if map_data[row][col] == "S":
                    self.map.update_map(row, col, "c")
                    break

        return row, col

    def update_data(self, display_text, kanji_text, display_type, error):
        self.data.update(display_text, kanji_text, display_type, error)

    def update_error(self, display_error, error_chars):
        self.error.update(display_error, error_chars)
    
    def update_game_start(self, val):
        self.at_game_start = val

    def load_prev_text(self):
        return self.prev_text

    # Reset game data to default values - keeps map the same but character is sent back to start
    def reset_game(self):
        self.char = Character(self.char_start_row, self.char_start_col, 0)
        self.data = Data("", "", 'kanji')
        self.at_game_start = True

    def get_character(self):
        return self.char

    def get_game_won(self):
        return self.game_won

    def get_game_start(self):
        return self.at_game_start

    def get_display_text(self):
        return self.data.display_text

    def get_display_type(self):
        return self.data.display_type
    
    def get_errors(self):
        return self.data.erro

    def valid_move(self, node_at_new_loc):
        valid_move = False
        if node_at_new_loc == "_" or node_at_new_loc == "i" or node_at_new_loc == "T" or node_at_new_loc == "S":
            valid_move = True
        
        return valid_move

    def load_config(self, config):
        self.char.set_location(config['char_row'], config['char_col'])
        self.char.set_rotation(config['char_dir'])
        self.data.update(config['data']['displayText'], config['data']['kanjiText'], config['data']['displayType'], config['data']['error'])

    # Performs move if valid
    def make_move(self, move):
        valid_move = False
        # game_winning_move = False
        curr_char_row = self.char.get_row()
        curr_char_col = self.char.get_col()
        curr_char_dir = self.char.get_direction()
        new_row = curr_char_row
        new_col = curr_char_col

        if move == "turn_left":
            self.char.rotate(-90)
            valid_move = True
        elif move == "turn_right":
            self.char.rotate(90)
            valid_move = True
        elif move == "reverse":
            self.char.rotate(180)
            valid_move = True
        elif move == "forward":
            if curr_char_dir == 0 and curr_char_row >= 1:
                new_row = curr_char_row-1
                new_col = curr_char_col              
            elif curr_char_dir == 90 and curr_char_col <= self.map.get_max_col():
                new_row = curr_char_row
                new_col = curr_char_col+1
            elif curr_char_dir == 180 and curr_char_row <= self.map.get_max_row():
                new_row = curr_char_row+1
                new_col = curr_char_col
            elif curr_char_dir == 270 and curr_char_col >= 1:
                new_row = curr_char_row
                new_col = curr_char_col-1

            # Check that move is within map boundary            
            if new_row <= self.map.get_max_row() and new_col <= self.map.get_max_col():
                node_at_new_loc = self.map.get_node_at(new_row, new_col)
                print(node_at_new_loc)
                valid_move = self.valid_move(node_at_new_loc)

            if valid_move:
                self.char.set_location(new_row, new_col)

                # Return current square to original node when character is moved
                self.map.revert_location_to_node(curr_char_row, curr_char_col)
                if node_at_new_loc == "T":
                    # game_winning_move = True
                    self.game_won = True
            # print(f"Row: {self.char.get_row()}")
        return self.char.get_row(), self.char.get_col(), self.char.get_direction(), valid_move

    def to_json(self):
        map = self.map.get_map()
        return {
            'target': self.map.get_target(),
            'map': self.map.get_chosen_map_index(),
            'char_row': self.char.get_row(),
            'char_col': self.char.get_col(),
            'char_dir': self.char.get_direction(),
            'game_won': self.get_game_won(),
            'at_game_start': self.get_game_start(),
            'data': self.data.to_json()
        }

class GameFactory:

    ###
    #   Could implement a 'move counter' for knowing when at_game_start is true, increment/decrement so check == 0?
    #
    ###

    def __init__(self):
        self.game_exists = False

    def new_game(self):
        self.game = Game()
        self.game_states = []
        self.game_exists = True
        self.game_state_count = 0
        self.game.update_game_start(True)

    # Saves the current game state so that it can be reverted to
    def save_game_state(self):
        self.game_states.append(self.game.to_json())
        self.game_state_count += 1
        if self.game_state_count > 1:
            self.game.update_game_start(False)

    # Loads the previous game state into the Game object to 'undo' a move, then removes state from the list
    def load_previous_config(self):
        self.game.load_config(self.game_states[self.game_state_count-2])
        last_state = self.game_states.pop()
        self.game_state_count -= 1
        if self.game_state_count == 1:
            self.game.update_game_start(True)

    def reset_game(self):
        self.game.reset_game()
        self.game_state_count = 1
        self.game_states = [self.game_states[0]]

# gameFac = GameFactory()
# gameFac.new_game()
# game1 = gameFac.game

# gameFac.new_game()
# game2 = gameFac.game
# print(game1.to_json())

# print(game2.to_json())
