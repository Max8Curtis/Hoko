from . import structure
import random

def add_two(a, b):
    return a + b

def get_user_speech():
    return 'この町は大きいです'

def get_previous_text():
    error = structure.Error(False, [1, 3])
    data = structure.Data(0, 'これは最後のテクスト', 'これは最後のテクスト', 'kanji', error)
    return data.to_json()

def get_example_text():
    error = structure.Error(False, [1, 3])
    data = structure.Data(0, 'この店は大きいですね', 'この店は大きいですね', 'kanji', error)
    return data.to_json()

def new_config(targets):
    target = random.choice(targets)
    config = structure.Config(target)
    return config.to_json()