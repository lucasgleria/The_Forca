import random
from typing import Set

class GameSession:
    def __init__(self, word: str, max_errors: int = 6):
        self.word: str = word
        self.guessed_letters: Set[str] = set()
        self.errors: int = 0
        self.max_errors: int = max_errors
        self.status: str = "playing"
    
    def make_guess(self, letter: str) -> bool:
        letter = letter.lower()

        if self.status != "playing" or letter in self.guessed_letters:
            return False

        self.guessed_letters.add(letter)

        if letter not in self.word.lower():
            self.errors += 1

        self.update_status()

        return letter in self.word.lower()

    def update_status(self):
        if self.errors >= self.max_errors:
            self.status = "lost"
        elif all(char.lower() in self.guessed_letters for char in self.word):
            self.status = "won"

    def get_word_display(self) -> str:
        return " ".join([
            char if char.lower() in self.guessed_letters else "_"
            for char in self.word
        ])

    def get_game_state(self) -> dict:
        return {
            "word_display": self.get_word_display(),
            "errors": self.errors,
            "max_errors": self.max_errors,
            "status": self.status,
            "guessed_letters": list(self.guessed_letters),
            "original_word": self.word
        }