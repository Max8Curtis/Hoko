class Data:
    def __init__(self, id, display_text, kanji_text, display_type, error):
        self.id = id
        self.display_text = display_text
        self.kanji_text = kanji_text
        self.display_type = display_type
        self.error = error

    def to_json(self):
        return {
            'id': self.id,
            'displayText': self.display_text,
            'kanjiText': self.kanji_text,
            'displayType': self.display_type,
            'error': self.error.to_json()
        }

class Error:
    def __init__(self, display_error, error_chars):
        self.display_error = display_error
        self.error_chars = error_chars

    def to_json(self):
        return {
            'displayError': self.display_error,
            'errorChars': self.error_chars
        }

class Config:
    def __init__(self, target):
        self.target = target

    def to_json(self):
        return {
            'target': self.target
        }
