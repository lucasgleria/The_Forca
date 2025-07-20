import random
import unicodedata
import httpx

# Dicionário com palavras por nível de dificuldade
word_bank = {
    "easy": [
        {"palavra": "casa", "dica": "substantivo"}
    ],
    "medium": [
        {"palavra": "janela", "dica": "substantivo"}
    ],
    "hard": [
        {"palavra": "helicoptero", "dica": "substantivo"}
    ]
}

def remove_accents(word: str) -> str:
    # Remove acentos e normaliza a palavra
    nfkd = unicodedata.normalize('NFKD', word)
    return ''.join([c for c in nfkd if not unicodedata.combining(c)])

def get_random_word(difficulty: str) -> dict:
    # Retorna um dicionário com palavra e dica aleatória com base na dificuldade.
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

def add_word_to_bank(word: str, hint: str):
    word = word.lower()
    word = remove_accents(word)
    difficulty = classify_word(word)
    # Verifica existência já normalizando
    if word in [remove_accents(w["palavra"]) for w in word_bank[difficulty]]:
        return False  # Palavra já existe
    word_bank[difficulty].append({"palavra": word, "dica": hint})
    return difficulty 

async def validate_word_exists(word: str) -> bool:
    url = f"https://spell.toolforge.org/spellcheck/pt/{word}"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code == 200:
                data = response.json()
                # Se não houver sugestões, a palavra existe
                if data and isinstance(data, list) and len(data) > 1 and data[1].get("suggestion"):
                    return False  # Palavra incorreta, há sugestões
                return True  # Palavra correta
    except Exception:
        pass
    return False 