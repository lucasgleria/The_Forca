from fastapi import FastAPI, Request
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware
from game_logic import GameSession
from word_manager import get_random_word, add_word_to_bank, validate_word_exists
from pydantic import BaseModel
from typing import Optional, Dict, Any

# Modelos Pydantic
class StartGameRequest(BaseModel):
    difficulty: Optional[str] = "easy"

class StartGameResponse(BaseModel):
    session_id: str
    game_state: Dict[str, Any]

class GuessRequest(BaseModel):
    session_id: str
    letter: str

class GuessResponse(BaseModel):
    game_state: Dict[str, Any]
    error: Optional[str] = None

class AddWordRequest(BaseModel):
    word: str
    hint: str

class AddWordResponse(BaseModel):
    message: str
    difficulty: Optional[str] = None
    error: Optional[str] = None

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

@app.post("/api/game/start", response_model=StartGameResponse)
async def start_game(body: StartGameRequest):
    word_obj = get_random_word(body.difficulty)
    session_id = str(uuid4())
    game_session = GameSession(word_obj["palavra"], word_obj["dica"])
    sessions[session_id] = game_session
    return StartGameResponse(
        session_id=session_id,
        game_state=game_session.get_game_state()
    )

@app.post("/api/game/guess", response_model=GuessResponse)
async def make_guess(body: GuessRequest):
    session_id = body.session_id
    letter = body.letter
    if session_id not in sessions:
        return GuessResponse(game_state={}, error="Sessão inválida.")
    game_session = sessions[session_id]
    if letter in game_session.guessed_letters:
        return GuessResponse(game_state=game_session.get_game_state(), error="Letra já tentada.")
    game_session.make_guess(letter)
    return GuessResponse(game_state=game_session.get_game_state())

@app.get("/api/game/status/{session_id}")
async def get_status(session_id: str):
    game_session = sessions.get(session_id)
    if not game_session:
        return {"error": "Sessão não encontrada."}
    return {"game_state": game_session.get_game_state()}

@app.post("/api/words/add", response_model=AddWordResponse)
async def add_word(body: AddWordRequest):
    word = body.word
    hint = body.hint
    if not word or not word.isalpha():
        return AddWordResponse(message="", error="Palavra inválida.")
    # Validação de existência via API externa
    exists = await validate_word_exists(word)
    if not exists:
        return AddWordResponse(message="", error="Palavra não reconhecida como válida em português.")
    result = add_word_to_bank(word, hint)
    if result is False:
        return AddWordResponse(message="", error=f"A palavra '{word.lower()}' já existe no banco.")
    return AddWordResponse(message=f"Palavra '{word}' adicionada como '{result}'", difficulty=result)