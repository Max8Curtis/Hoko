# import spacy
# nlp = spacy.load("ja_core_news_sm")

MOVES = {
    'まっすぐ行って': 'forward',
    '右に曲がります': 'turn_right',
    '左に曲がります': 'turn_left'
}

def convert(text):
    if text in MOVES.keys():
        return MOVES[text]
    return None

def predict(nlp, phrases):
    # test_text1 = '100メートル行ってください'
    moves = []
    for phrase in phrases:
        doc = nlp(phrase)
        values = list(doc.cats.values())
        move = list(doc.cats.keys())[values.index(max(values))]
        moves.append(move)
    return moves

# Split text into phrases to be run through NLP-move-classification model
def split_text(nlp, text):   
    phrases = []
    phrase = ""
    char_count = 0
    for token in nlp(text):
        if token.text != "。":
            phrase += token.text
        char_count += len(token)

        # If this is the last token in the text, add the phrase to the list
        if char_count == len(text):
            phrases.append(phrase)
        else: 
            # If the current token splits the sentence into separate phrases, add the phrase
            if token.pos_ == "SCONJ":
                phrases.append(phrase)
                phrase = ""

    return phrases


# print(split_text("真っすぐに行って右に曲がります。"))
# print(split_text("真っすぐに行ったら右に曲がります。"))