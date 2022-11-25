import json
import random

MAPS = "./game_maps.json"

class Game:
    def __init__(self, target_x, target_y):
        self.char = Character(5, 3, 0)
        self.prev_text = ""
        self.cur_text = ""
        self.target_x = target_x, self.target_y = target_y
        self.map = Map()
        self.place_character()

    def place_character(self):
        self.map['layout'][self.char.get_x()][self.char.get_y()] = "c"

    def update_text(self, text):
        self.prev_text = self.cur_text
        self.cur_text = text

    def load_prev_text(self):
        return self.prev_text

class Map:
    def __init__(self):
        self.map, self.objects = self.random_map()
        self.target = self.choose_target()
        self.map = self.update_map()

    def random_map(self):
        with open(MAPS, 'r') as j:
            maps = json.loads(j.read())
        map_nums = [x for x in maps['objects']['maps']]
        chosen_map = map_nums[random.randint(0, len(map_nums)-1)]
        return maps['objects']['maps'][str(chosen_map)], maps['objects']

    def choose_target(self):
        chosen_target = self.map['targets'][random.randint(0, len(self.map['targets'])-1)]
        return chosen_target

    def update_map(self):
        for row in range(0, len(self.map['layout'])-1):
            for column in range(0, len(self.map['layout'][row])-1):
                if self.map['layout'][row][column] == self.target:
                    self.map['layout'][row][column] = "T"

        return self.map
        


map = Map()

class Character:
    def __init__(self, start_x, start_y, start_dir):
        self.x = start_x, self.y = start_y
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