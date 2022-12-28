import json
import random
import os
import copy
from pathlib import Path

cwd = os.getcwd()
cur_file = str(Path(Path(__file__).parent))
print("Current directory is: " + cur_file)
os.chdir(cur_file)
MAPS = "./game_maps.json"
with open(MAPS, 'r') as j:
    maps = json.loads(j.read())
os.chdir(cwd)


class Map:
    def __init__(self):
        self.maps = copy.deepcopy(maps)
        self.chosen_map = self.choose_map()
        # print(self.chosen_map)
        self.chosen_target = self.choose_target()
        # print(self.chosen_target)
        chosen_target_row, chosen_target_col = self.get_row_col(str(self.chosen_target))
        self.update_map(chosen_target_row, chosen_target_col, "T")
        # print(self.maps)

    def choose_map(self):
        return random.choice(list(self.maps['objects']['maps']))

    def choose_target(self):
        return random.choice(list(self.maps['objects']['maps'][str(self.chosen_map)]['targets']))

    def get_row_col(self, to_find):
        for row in range(len(self.maps['objects']['maps'][str(self.chosen_map)]['layout'])):
            for col in range(len(self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row])):
                if self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row][col] == to_find: 
                    return row, col

    def update_map(self, row, col, new_node):
        self.maps['objects']['maps'][str(self.chosen_map)]['layout'][row][col] = new_node

    # Returns index of chosen map and map data as tuple
    def get_map(self):
        return self.maps['objects']['maps'][str(self.chosen_map)]

    # Returns target letter and target name as tuple
    def get_target(self):
        return self.chosen_target

# map1 = Map()
# map2 = Map()

# test_dict = {"a":1, "b":2}
# dict_copy = test_dict.copy()

# dict_copy['a'] = 3
# print(dict_copy)
# print(test_dict)
# class Map:
#     def __init__(self):
#         self.maps_copy = maps.copy() #Create copy of maps dict so dict changes only in effect inside object
#         print("Maps copy: ")
#         print(self.maps_copy)
#         self.chosen_map_index, self.map, self.objects = self.random_map()
#         print("Chosen map index: "+str(self.chosen_map_index))
#         self.target = self.choose_target()
#         print("Chosen target: "+str(self.target))
#         self.place_target()
 

#     # Returns randomly selected map index, map data and map objects as tuple
#     def random_map(self):
#         map_nums = [x for x in self.maps_copy['objects']['maps']]
#         chosen_map_index = random.randint(0, len(map_nums)-1)
#         chosen_map = map_nums[chosen_map_index]
        
#         return chosen_map_index+1, self.maps_copy['objects']['maps'][str(chosen_map)], self.maps_copy['objects']

#     # Returns a randomly selected target
#     def choose_target(self):
#         chosen_target = self.map['targets'][random.randint(0, len(self.map['targets'])-1)]
#         return chosen_target

#     # Places target on map
#     def place_target(self):
#         for row in range(0, len(self.map['layout'])-1):
#             for column in range(0, len(self.map['layout'][row])-1):
#                 if self.map['layout'][row][column] == self.target:
#                     self.update_node(column, row, "T")

#     # Returns index of chosen map and map data as tuple
#     def get_map(self):
#         return self.chosen_map_index, self.map

#     # Returns target letter and target name as tuple
#     def get_target(self):
#         target_name = self.objects['nodes'].get(self.target)
#         return self.target, target_name

#     # Change the value of a node
#     def update_node(self, x, y, new_label):
#         self.map['layout'][y][x] = new_label

#     # Returns a list of target names from target letters
#     def transcribe_targets(self):
#         target_names = []
#         for t in range(len(self.maps_copy['objects']['maps'][str(self.chosen_map_index)]['targets'])):
#             # print(t)
#             target = self.maps_copy['objects']['maps'][str(self.chosen_map_index)]['targets'][t]
#             target_names.append(self.maps_copy['objects']['nodes'].get(target))

#         return target_names


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
        # print(self.map.get_map())
        char_start_y, char_start_x = self.place_character()
        self.char = Character(char_start_y, char_start_x, 0)

    def place_character(self):
        map_data = self.map.get_map()['layout']
        for i in range(len(map_data)):
            for j in range(len(map_data[i])):
                if map_data[i][j] == "S":
                    self.map.update_map(i, j, "c")
        return i, j

    def update_text(self, text):
        self.prev_text = self.cur_text
        self.cur_text = text

    def load_prev_text(self):
        return self.prev_text

    # Reset game data to default values - keeps map the same but character is sent back to start
    def reset_game(self):
        self.char = Character(char_start_y, char_start_x, 0)
        self.prev_text = ""
        self.cur_text = ""

    def get_character(self):
        return self.char

    # Returns game data as json
    def to_json(self):
        map = self.map.get_map()
        return {
            'target': self.map.get_target(),
            'map': map,
            'char_dir': self.char.get_direction()
        }


class GameFactory:
    def __init__(self):
        self.game_exists = False

    def new_game(self):
        self.game = Game()
        self.game_exists = True

gameFac = GameFactory()
gameFac.new_game()
game1 = gameFac.game

gameFac.new_game()
game2 = gameFac.game
print(game1.to_json())

print(game2.to_json())
