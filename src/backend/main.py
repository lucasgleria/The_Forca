from fastapi import FastAPI, Request
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware
from game_logic import GameSession
from word_manager import get_random_word, add_word_to_bank

app = FastAPI()

# Configuração do CORS para permitir acesso do frontend
origins = [
    "http://localhost:8008",
    "http://127.0.0.1:8008"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


sessions = {}

@app.post("/api/game/start")
async def start_game(request: Request):
    data = await request.json()
    difficulty = data.get("difficulty", "easy")

    word = get_random_word(difficulty)
    session_id = str(uuid4())

    game_session = GameSession(word)
    sessions[session_id] = game_session

    return{
        "session_id": session_id,
        "game_state": game_session.get_game_state()
    }


@app.post("/api/game/guess")
async def make_guess(request: Request):
    data = await request.json()
    session_id = data.get("session_id")
    letter = data.get("letter")
    
    if session_id not in sessions:
        return {"error": "Sessão inválida."}

    game_session = sessions[session_id]

    if letter in game_session.guessed_letters:
        return {"error": "Letra já tentada.", "game_state": game_session.get_game_state()}

    game_session.make_guess(letter)

    return {"game_state": game_session.get_game_state()}


@app.get("/api/game/status/{session_id}")
async def get_status(session_id: str):
    game_session = sessions.get(session_id)

    if not game_session:
        return {"error": "Sessão não encontrada."}

    return {"game_state": game_session.get_game_state()}


@app.post("/api/words/add")
async def add_word(request: Request):
    data = await request.json()
    word = data.get("word")
    if not word or not word.isalpha():
        return {"error": "Palavra inválida."}
    result = add_word_to_bank(word)
    if result is False:
        return {"error": f"A palavra '{word.lower()}' já existe no banco."}
    return {"message": f"Palavra '{word}' adicionada como '{result}'", "difficulty": result}