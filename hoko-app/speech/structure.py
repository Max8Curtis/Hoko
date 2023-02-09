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
        # print(f"Popping item: {item}")
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
