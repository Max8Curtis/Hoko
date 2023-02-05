MOVES = {
    'まっすぐ行って': 'forward',
    '右に曲がります': 'turn_right',
    '左に曲がります': 'turn_left'
}

def convert(text):
    if text in MOVES.keys():
        return MOVES[text]
    return None

def predict(nlp, text):
    # test_text1 = '100メートル行ってください'
    doc = nlp(text)
    values = list(doc.cats.values())
    move = list(doc.cats.keys())[values.index(max(values))]
    return move