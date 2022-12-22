import json
import random
import os
from pathlib import Path

cwd = os.getcwd()
# print(cwd)

# cur_file = os.path.realpath(__file__).parent.absolute()
cur_file = str(Path(Path(__file__).parent))
print("Current directory is: " + cur_file)
os.chdir(cur_file)
MAPS = "./game_maps.json"
with open(MAPS, 'r') as j:
    maps = json.loads(j.read())
os.chdir(cwd)

class Map:
    def __init__(self):
        self.chosen_map_index, self.map, self.objects = self.random_map()
        self.target = self.choose_target()
        self.map = self.place_target()

    # Returns randomly selected map index, map data and map objects as tuple
    def random_map(self):
        map_nums = [x for x in maps['objects']['maps']]
        chosen_map_index = random.randint(0, len(map_nums)-1)
        chosen_map = map_nums[chosen_map_index]
        # print(maps['objects']['maps'][str(chosen_map)]['targets'])
        
        return chosen_map_index+1, maps['objects']['maps'][str(chosen_map)], maps['objects']

    # Returns a randomly selected target
    def choose_target(self):
        chosen_target = self.map['targets'][random.randint(0, len(self.map['targets'])-1)]
        return chosen_target

    # Places target on map
    def place_target(self):
        for row in range(0, len(self.map['layout'])-1):
            for column in range(0, len(self.map['layout'][row])-1):
                if self.map['layout'][row][column] == self.target:
                    self.update_node(column, row, "T")

        return self.map

    # Returns index of chosen map and map data as tuple
    def get_map(self):
        return self.chosen_map_index, self.map

    # Returns target letter and target name as tuple
    def get_target(self):
        target_name = self.objects['nodes'].get(self.target)
        return self.target, target_name

    # Change the value of a node
    def update_node(self, x, y, new_label):
        self.map['layout'][y][x] = new_label


    # Returns a list of target names from target letters
    def transcribe_targets(self):
        target_names = []
        for t in range(len(maps['objects']['maps'][str(self.chosen_map_index)]['targets'])):
            # print(t)
            target = maps['objects']['maps'][str(self.chosen_map_index)]['targets'][t]
            target_names.append(maps['objects']['nodes'].get(target))

        return target_names


class Character:
    def __init__(self, start_x, start_y, start_dir):
        self.x = start_x 
        self.y = start_y
        self.dir = start_dir

    def move(self, move_x, move_y):
        self.x += move_x
        self.y += move_y

    def rotate(self, rot):
        self.dir += rot % 360

    def get_x(self):
        return self.x

    def get_y(self):
        return self.y

    def get_direction(self):
        return self.dir

class Game:
    def __init__(self):        
        self.prev_text = ""
        self.cur_text = ""
        self.map = Map()
        char_start_y, char_start_x = self.place_character()
        self.char = Character(char_start_y, char_start_x, 0)

    def place_character(self):
        map_data = self.map.get_map()[1]['layout']
        for i in range(len(map_data)):
            for j in range(len(map_data[i])):
                if map_data[i][j] == "S":
                    self.map.update_node(j, i, "c")
        return i, j

    def update_text(self, text):
        self.prev_text = self.cur_text
        self.cur_text = text

    def load_prev_text(self):
        return self.prev_text

    def reset_game(self):
        self.char = Character(char_start_y, char_start_x, 0)
        self.prev_text = ""
        self.cur_text = ""

    def get_map(self):
        return self.map

    def get_character(self):
        return self.char

    # Returns game data as json - list of target letters is transcribed to target names for front end to use
    def to_json(self):
        map = self.map.get_map()[1]
        map['targets'] = self.map.transcribe_targets()
        return {
            'target': self.map.get_target()[1],
            'map': map
        }

# game = Game()
# print(game.to_json())