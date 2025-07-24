// Estrutura inicial do app.js

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const endingScreen = document.getElementById('ending-screen');

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8000";

// Estado global da dificuldade
let currentDifficulty = 'easy';
const difficulties = [
  { key: 'easy', label: 'Easy', color: 'bg-gray-600', gradient: 'bg-gradient-to-br from-green-400 to-green-600' },
  { key: 'medium', label: 'Medium', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600', gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600' },
  { key: 'hard', label: 'Hard', color: 'bg-gradient-to-br from-red-400 to-red-600', gradient: 'bg-gradient-to-br from-red-400 to-red-600' }
];
// Estado das letras clicadas por dificuldade
const letrasClicadasPorDificuldade = {
  easy: new Set(),
  medium: new Set(),
  hard: new Set()
};

// Variável global para session_id
let sessionId = null;

function hideAllScreens() {
  menuScreen.style.display = 'none';
  gameScreen.style.display = 'none';
  endingScreen.style.display = 'none';
}

function showScreen(screenId, gameState) {
  hideAllScreens();
  document.getElementById(screenId).style.display = 'block';
  if (screenId === 'game-screen') {
    atualizarPainelDificuldade();
    if (gameState) {
      gerarTecladoVirtual(gameState);
      configurarBotaoDica(gameState);
    } else if (window.currentGameState) {
      gerarTecladoVirtual(window.currentGameState);
      configurarBotaoDica(window.currentGameState);
    }
  }
}

function configurarBotaoDica(gameState) {
  const btn = document.getElementById('show-hint-btn');
  const hintArea = document.getElementById('hint-area');
  if (!btn || !hintArea) return;
  hintArea.classList.add('hidden');
  btn.disabled = false;
  btn.onclick = () => {
    if (gameState && gameState.hint) {
      hintArea.textContent = `Dica: ${gameState.hint}`;
      hintArea.classList.remove('hidden');
      btn.disabled = true;
    }
  };
}

// Função para atualizar a área da palavra
function atualizarWordArea(wordDisplay) {
  const wordArea = document.getElementById('word-area');
  if (wordArea) {
    wordArea.textContent = wordDisplay;
  }
}

// Função para mostrar partes do boneco conforme o número de erros
function atualizarBonecoSVG(errors) {
  const partes = [
    'head',
    'body',
    'left-arm',
    'right-arm',
    'left-leg',
    'right-leg'
  ];
  partes.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = (errors > idx) ? '' : 'none';
    }
  });
}

// Função para atualizar painel de tentativas
function atualizarGuessesArea(guessedLetters, word) {
  const guessesArea = document.getElementById('guesses-area');
  if (!guessesArea) return;
  guessesArea.innerHTML = '';
  guessedLetters.forEach(letra => {
    const span = document.createElement('span');
    span.textContent = letra.toUpperCase();
    if (word.toLowerCase().includes(letra.toLowerCase())) {
      span.className = 'py-2 px-2 sm:px-3 rounded font-bold text-base sm:text-lg text-white bg-green-600';
    } else {
      span.className = 'py-2 px-2 sm:px-3 rounded font-bold text-base sm:text-lg text-white bg-red-600';
    }
    guessesArea.appendChild(span);
  });
}

// Função para atualizar tela de fim de jogo
function atualizarEndingScreen(status, word) {
  const winMsg = document.getElementById('ending-message');
  const loseMsg = document.getElementById('ending-message-lose');
  const revealedWord = document.getElementById('revealed-word');
  if (winMsg && loseMsg && revealedWord) {
    if (status === 'won') {
      winMsg.classList.remove('hidden');
      loseMsg.classList.add('hidden');
      winMsg.textContent = 'You won!';
    } else {
      winMsg.classList.add('hidden');
      loseMsg.classList.remove('hidden');
      loseMsg.textContent = 'You were hanged!';
    }
    revealedWord.textContent = word.toUpperCase();
  }
}

// Refatorar botões de dificuldade para iniciar o jogo via backend
function iniciarJogo(dificuldade) {
  fetch(`${API_BASE_URL}/api/game/start`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty: dificuldade })
  })
    .then(res => res.json())
    .then(data => {
      sessionId = data.session_id;
      const gameState = data.game_state;
      atualizarWordArea(gameState.word_display);
      atualizarBonecoSVG(gameState.errors);
      atualizarGuessesArea(gameState.guessed_letters, gameState.word_display.replace(/ /g, ''));
      showScreen('game-screen', gameState);
      gerarTecladoVirtual(gameState);
      configurarBotaoDica(gameState);
    })
    .catch(err => {
      alert('Erro ao iniciar o jogo: ' + err);
    });
}

// Refatorar teclado virtual para integração com backend
function gerarTecladoVirtual(gameState) {
  const keyboard = document.getElementById('keyboard');
  if (!keyboard) return;
  keyboard.innerHTML = '';
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letrasClicadas = new Set(gameState ? gameState.guessed_letters.map(l => l.toUpperCase()) : []);
  let jogoFinalizado = gameState && (gameState.status === 'won' || gameState.status === 'lost');
  for (let letra of alfabeto) {
    const btn = document.createElement('button');
    btn.textContent = letra;
    btn.className = 'py-2 px-2 sm:px-3 bg-gray-600 rounded font-bold text-base sm:text-lg hover:bg-gray-500 transition';
    if (letrasClicadas.has(letra) || jogoFinalizado) {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    if (!jogoFinalizado) {
    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
      if (!sessionId) return;
      fetch(`${API_BASE_URL}/api/game/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, letter: letra })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
            return;
          }
          const gameState = data.game_state;
          atualizarWordArea(gameState.word_display);
          atualizarBonecoSVG(gameState.errors);
          atualizarGuessesArea(gameState.guessed_letters, gameState.word_display.replace(/ /g, ''));
          gerarTecladoVirtual(gameState);
          configurarBotaoDica(gameState);
          if (gameState.status === 'won' || gameState.status === 'lost') {
              if (gameState) {
                window.currentGameState = gameState; // Salva o estado final do jogo
              }
              exibirFormNovaPalavra();
          }
        })
        .catch(err => {
          alert('Erro ao enviar palpite: ' + err);
        });
    });
    }
    keyboard.appendChild(btn);
  }
}

function exibirFormNovaPalavra() {
  const addWordOverlay = document.getElementById('add-word-overlay');
  const addWordForm = document.getElementById('add-word-form');
  const addWordInput = document.getElementById('new-word-input');
  if (addWordOverlay && addWordForm) {
    addWordOverlay.style.display = 'none';
    addWordForm.style.opacity = '1';
    addWordForm.style.pointerEvents = 'auto';
    if (addWordInput) {
      addWordInput.disabled = false;
      addWordInput.focus();
    }
  }
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  if (!notification) return;
  notification.textContent = message;
  notification.classList.remove('hidden');
  notification.classList.remove('bg-green-600', 'bg-red-600');
  notification.classList.add(type === 'success' ? 'bg-green-600' : 'bg-red-600');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 3000);
}

// Função para atualizar o painel lateral de dificuldade
function atualizarPainelDificuldade() {
  const currentBtn = document.getElementById('current-difficulty-btn');
  const changeBtn1 = document.getElementById('change-difficulty-1');
  const changeBtn2 = document.getElementById('change-difficulty-2');
  const wordArea = document.getElementById('word-area');

  // Descobrir as duas dificuldades alternativas
  const atual = difficulties.find(d => d.key === currentDifficulty);
  const alternativas = difficulties.filter(d => d.key !== currentDifficulty);

  // Atualizar botão da dificuldade atual (sempre cinza)
  if (currentBtn) {
    currentBtn.textContent = atual.label;
    currentBtn.className = 'w-full py-2 px-4 rounded-full font-bold text-lg bg-gray-600 text-white cursor-default mb-2';
    currentBtn.disabled = true;
  }

  // Atualizar botões de troca
  if (changeBtn1 && alternativas[0]) {
    changeBtn1.textContent = alternativas[0].label;
    changeBtn1.className = `w-full py-2 px-4 rounded-full font-bold text-base ${alternativas[0].gradient} text-white hover:scale-105 transition`;
    changeBtn1.onclick = () => {
      currentDifficulty = alternativas[0].key;
      console.log('Dificuldade trocada para:', alternativas[0].key);
      atualizarPainelDificuldade();
      gerarTecladoVirtual();
    };
  }
  if (changeBtn2 && alternativas[1]) {
    changeBtn2.textContent = alternativas[1].label;
    changeBtn2.className = `w-full py-2 px-4 rounded-full font-bold text-base ${alternativas[1].gradient} text-white hover:scale-105 transition`;
    changeBtn2.onclick = () => {
      currentDifficulty = alternativas[1].key;
      console.log('Dificuldade trocada para:', alternativas[1].key);
      atualizarPainelDificuldade();
      gerarTecladoVirtual();
    };
  }

  // Simular troca de palavra no word-area
  if (wordArea) {
    let underscores = '';
    if (currentDifficulty === 'easy') underscores = '_ _ _ _';
    else if (currentDifficulty === 'medium') underscores = '_ _ _ _ _ _ _';
    else if (currentDifficulty === 'hard') underscores = '_ _ _ _ _ _ _ _ _ _';
    wordArea.textContent = underscores;
  }
}

// Expor funções no escopo global para facilitar testes e integração
window.showScreen = showScreen;
window.hideAllScreens = hideAllScreens;
window.gerarTecladoVirtual = gerarTecladoVirtual;
window.atualizarPainelDificuldade = atualizarPainelDificuldade;

// Função para validar o formulário de nova palavra
function validarFormNovaPalavra() {
  const input = document.getElementById('new-word-input');
  const select = document.getElementById('hint-select');
  const btn = document.getElementById('add-word-btn');
  if (!input || !select || !btn) return;
  btn.disabled = !(input.value.trim() && select.value);
}

// Adicionar listeners para validar o formulário em tempo real
function configurarValidacaoFormNovaPalavra() {
  const input = document.getElementById('new-word-input');
  const select = document.getElementById('hint-select');
  if (input) input.addEventListener('input', validarFormNovaPalavra);
  if (select) select.addEventListener('change', validarFormNovaPalavra);
}

document.addEventListener('DOMContentLoaded', () => {
  // Exibe o menu ao carregar
  showScreen('menu-screen');

  // Event listeners dos botões de dificuldade
  document.getElementById('easy-btn').addEventListener('click', () => {
    currentDifficulty = 'easy';
    iniciarJogo('easy');
  });
  document.getElementById('medium-btn').addEventListener('click', () => {
    currentDifficulty = 'medium';
    iniciarJogo('medium');
  });
  document.getElementById('hard-btn').addEventListener('click', () => {
    currentDifficulty = 'hard';
    iniciarJogo('hard');
  });

  // Event listener do botão Jogar Novamente
  const playAgainBtn = document.getElementById('play-again-btn');
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      showScreen('menu-screen');
    });
  }

  // Placeholder: lógica para overlay do input de nova palavra
  const addWordOverlay = document.getElementById('add-word-overlay');
  const addWordForm = document.getElementById('add-word-form');
  if (addWordOverlay && addWordForm) {
    addWordForm.style.opacity = '0.3';
    addWordForm.style.pointerEvents = 'none';
    // Removido o event listener de clique no overlay
  }

  // Event listener do botão de adicionar nova palavra
  const addWordBtn = document.getElementById('add-word-btn');
  if (addWordBtn) {
    addWordBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const input = document.getElementById('new-word-input');
      const select = document.getElementById('hint-select');
      const word = input.value.trim();
      const hint = select.value;
      if (!word || !hint) {
        alert('Digite uma palavra válida e selecione a dica!');
        return;
      }
      // Envia para o backend
      try {
        const res = await fetch(`${API_BASE_URL}/api/words/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word, hint })
        });
        const data = await res.json();
        if (data.error) {
          showNotification(data.error, 'error');
          return;
        }
        showNotification(data.message, 'success');
      } catch (err) {
        showNotification('Erro ao adicionar palavra: ' + err, 'error');
      }
      // LOGS DE DEPURAÇÃO
      console.log('DEBUG: window.currentGameState no momento do envio:', window.currentGameState);
      const gameState = window.currentGameState || {};
      console.log('DEBUG: Status passado para atualizarEndingScreen:', gameState.status);
      // Exibir a palavra completa ao final do jogo
      const palavraCompleta = gameState.original_word || (gameState.word_display ? gameState.word_display.replace(/ /g, '') : '');
      atualizarEndingScreen(gameState.status, palavraCompleta);
      showScreen('ending-screen');
      // Opcional: resetar o formulário
      input.value = '';
      select.value = '';
      validarFormNovaPalavra();
      // Esconde o form novamente para o próximo jogo
      const addWordOverlay = document.getElementById('add-word-overlay');
      const addWordForm = document.getElementById('add-word-form');
      if (addWordOverlay && addWordForm) {
        addWordOverlay.style.display = '';
        addWordForm.style.opacity = '0.3';
        addWordForm.style.pointerEvents = 'none';
        const addWordInput = document.getElementById('new-word-input');
        if (addWordInput) {
          addWordInput.disabled = true;
        }
      }
    });
  }
  configurarValidacaoFormNovaPalavra();
});
