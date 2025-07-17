import random

# Dicionário com palavras por nível de dificuldade
word_bank = {
    "easy": [
        "casa", "bola", "pato", "rua", "mato",
        "gato", "mesa", "livro", "sol", "pao"
    ],
    "medium": [
        "janela", "escola", "computador", "telefone", "travesseiro",
        "carro", "caneta", "cadeira", "nuvem", "mercado"
    ],
    "hard": [
        "helicoptero", "programaçao", "desenvolvedor", "universidade", "matematica",
        "dificuldade", "eletricidade", "filosofia", "microfone", "laboratorio"
    ]
}

def get_random_word(difficulty: str) -> str:
    # Retorna uma palavra aleatória com base na dificuldade.

    #:para difficulty: "easy", "medium", ou "hard"
    #:return: palavra (str)
    #:raises ValueError: se dificuldade for inválida

    difficulty = difficulty.lower()
    #Converte o valor de difficulty para letras minúsculas.

    if difficulty not in word_bank:
        raise ValueError(f"Dificuldade inválida: '{difficulty}'. Use 'easy', 'medium' ou 'hard'.")
        
    return random.choice(word_bank[difficulty])   