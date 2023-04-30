import pykakasi as pk

class Stack:
    def __init__(self):
        self.stack = []
        self.length = 0

    def pop(self):
        if self.length > 0:
            item = self.stack.pop()
            self.length -= 1
        else:
            item = None
        return item

    def push(self, item):
        self.stack.append(item)
        self.length += 1

        return None

    def is_empty(self):
        if self.length == 0:
            return True
        return False

    def get_stack(self):
        return self.stack

    def compare_brackets(self, item):
        if item == '}' and self.pop() == '{':
            return True
        if item == ']' and self.pop() == '[':
            return True
        if item == ')' and self.pop() == '(':
            return True
        return False

# Converts kanji text to romaji
def kanji_to_romaji(text):
    kks = pk.kakasi()
    result = kks.convert(text)
    romaji_text = ""
    for word in result:
        romaji_text += word['hepburn'] + " "
    romaji_text = romaji_text[:len(romaji_text)-1]
    
    return romaji_text

# Returns list of errored character indexes for romaji text 
# def romaji_eval_errors(json_list, t):
#     for x in range(len(json_list)):
#         json_list[x]['text'] = kanji_to_romaji(json_list[x]['text'])
#     error_chars = eval_errors(json_list, t)


# Takes list of json objects, and returns list of character indexes where speech confidence is below a threshold (t)
def eval_errors(json_list, t):
    error_indexes = []

    # Each json object is inspected from last to first
    for x in range(len(json_list)-1, 0, -1):
        if (json_list[x]['speech']['tokens'][0]['start'] != json_list[x-1]['speech']['tokens'][0]['start']) and (json_list[x]['speech']['tokens'][0]['end'] != json_list[x-1]['speech']['tokens'][0]['end']):
            text_end_index_high = len(json_list[x]['text'])
            conf_high = json_list[x]['speech']['tokens'][0]['confidence']

            text_end_index_low = len(json_list[x-1]['text'])
            conf_low = json_list[x-1]['speech']['tokens'][0]['confidence']

            # Compare confidence of text section with threshold
            if abs(conf_high - conf_low) < t:
                error_indexes.extend([y for y in range(text_end_index_low, text_end_index_high)])

    return error_indexes