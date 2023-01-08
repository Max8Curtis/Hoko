MOVES = {
    'まっすぐ行って': 'forward',
    '右に曲がります': 'turn_right',
    '左に曲がります': 'turn_left'
}

def convert(text):
    if text in MOVES.keys():
        return MOVES[text]
    return None
