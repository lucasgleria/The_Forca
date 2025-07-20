import random
import unicodedata
import httpx
import re

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

def is_valid_local_word(word: str) -> bool:
    # Deve ter pelo menos 3 letras
    if len(word) < 3:
        return False
    # Não pode ter caracteres não alfabéticos
    if not word.isalpha():
        return False
    # Não pode ser uma sequência de letras repetidas (ex: aaaa, bbb)
    if re.fullmatch(r'(\w)\1{2,}', word):
        return False
    # Não pode ter mais de 2 letras iguais em sequência
    if re.search(r'(\w)\1{2,}', word):
        return False
    return True

async def validate_word_exists(word: str) -> bool:
    # Validação local
    if not is_valid_local_word(word):
        print(f"[VALIDACAO] Palavra '{word}' reprovada na validação local.")
        return False
    # Primeira tentativa: Spell Toolforge
    url_spell = f"https://spell.toolforge.org/spellcheck/pt/{word}"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url_spell)
            if response.status_code == 200:
                data = response.json()
                print(f"[VALIDACAO] Resposta Spell Toolforge: {data}")
                # Se houver sugestões, a palavra é inválida
                if data and isinstance(data, list) and len(data) > 1 and data[1].get("suggestion"):
                    return False
                # Se a palavra for igual ao input e não houver sugestões, é válida
                if data and isinstance(data, list) and data[0] == word:
                    return True
    except Exception as e:
        print(f"[VALIDACAO] Erro Spell Toolforge: {e}")
    # Fallback: LanguageTool
    url_lt = "https://api.languagetool.org/v2/check"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url_lt, data={"text": word, "language": "pt-BR"})
            if response.status_code == 200:
                data = response.json()
                print(f"[VALIDACAO] Resposta LanguageTool: {data}")
                # Se houver matches, a palavra é inválida
                if data and isinstance(data, dict) and data.get("matches"):
                    return False
                # Se não houver matches, é válida
                if data and isinstance(data, dict) and not data.get("matches"):
                    return True
    except Exception as e:
        print(f"[VALIDACAO] Erro LanguageTool: {e}")
    return False 