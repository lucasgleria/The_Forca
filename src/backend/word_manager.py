import random
import unicodedata

# Dicionário com palavras por nível de dificuldade
word_bank = {
    "easy": [
        "casa"
        
    ],
    "medium": [
        "janela"
    ],
    "hard": [
        "helicoptero"
    ]
}

def remove_accents(word: str) -> str:
    # Remove acentos e normaliza a palavra
    nfkd = unicodedata.normalize('NFKD', word)
    return ''.join([c for c in nfkd if not unicodedata.combining(c)])

def get_random_word(difficulty: str) -> str:
    # Retorna uma palavra aleatória com base na dificuldade.
    difficulty = difficulty.lower()
    if difficulty not in word_bank:
        raise ValueError(f"Dificuldade inválida: '{difficulty}'. Use 'easy', 'medium' ou 'hard'.")
    return random.choice(word_bank[difficulty])   

def classify_word(word: str) -> str:
    # Critério simples: tamanho da palavra
    length = len(word)
    if length <= 5:
        return "easy"
    elif length <= 8:
        return "medium"
    else:
        return "hard"

def add_word_to_bank(word: str):
    word = word.lower()
    word = remove_accents(word)
    difficulty = classify_word(word)
    # Verifica existência já normalizando
    if word in [remove_accents(w) for w in word_bank[difficulty]]:
        return False  # Palavra já existe
    word_bank[difficulty].append(word)
    return difficulty 