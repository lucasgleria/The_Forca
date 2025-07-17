// Estrutura inicial do app.js

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const endingScreen = document.getElementById('ending-screen');

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

function hideAllScreens() {
  menuScreen.style.display = 'none';
  gameScreen.style.display = 'none';
  endingScreen.style.display = 'none';
}

function showScreen(screenId) {
  hideAllScreens();
  document.getElementById(screenId).style.display = 'block';
  if (screenId === 'game-screen') {
    atualizarPainelDificuldade();
    gerarTecladoVirtual();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Exibe o menu ao carregar
  showScreen('menu-screen');

  // Event listeners dos botões de dificuldade
  document.getElementById('easy-btn').addEventListener('click', () => {
    currentDifficulty = 'easy';
    console.log('Dificuldade selecionada: easy');
    showScreen('game-screen');
  });
  document.getElementById('medium-btn').addEventListener('click', () => {
    currentDifficulty = 'medium';
    console.log('Dificuldade selecionada: medium');
    showScreen('game-screen');
  });
  document.getElementById('hard-btn').addEventListener('click', () => {
    currentDifficulty = 'hard';
    console.log('Dificuldade selecionada: hard');
    showScreen('game-screen');
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
    addWordOverlay.addEventListener('click', () => {
      addWordOverlay.style.display = 'none';
      addWordForm.style.opacity = '1';
      addWordForm.style.pointerEvents = 'auto';
    });
  }

  // Lógica para alternar entre tela de vencedor e perdedor na ending screen (placeholder)
  const toggleEndingBtn = document.getElementById('toggle-ending-btn');
  const endingMessageWin = document.getElementById('ending-message');
  const endingMessageLose = document.getElementById('ending-message-lose');
  if (toggleEndingBtn && endingMessageWin && endingMessageLose) {
    toggleEndingBtn.addEventListener('click', () => {
      const isWin = !endingMessageWin.classList.contains('hidden');
      if (isWin) {
        endingMessageWin.classList.add('hidden');
        endingMessageLose.classList.remove('hidden');
        toggleEndingBtn.textContent = 'Tela de vencedor';
      } else {
        endingMessageWin.classList.remove('hidden');
        endingMessageLose.classList.add('hidden');
        toggleEndingBtn.textContent = 'Tela de perdedor';
      }
    });
  }
});

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

// Função para gerar o teclado virtual (A-Z)
function gerarTecladoVirtual() {
  const keyboard = document.getElementById('keyboard');
  if (!keyboard) return;
  keyboard.innerHTML = '';
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letrasClicadas = letrasClicadasPorDificuldade[currentDifficulty];
  for (let letra of alfabeto) {
    const btn = document.createElement('button');
    btn.textContent = letra;
    btn.className = 'py-2 px-2 sm:px-3 bg-gray-600 rounded font-bold text-base sm:text-lg hover:bg-gray-500 transition';
    if (letrasClicadas.has(letra)) {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    btn.addEventListener('click', function () {
      console.log('Letra clicada:', letra);
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
      letrasClicadasPorDificuldade[currentDifficulty].add(letra);
    });
    keyboard.appendChild(btn);
  }
}

// Expor funções no escopo global para facilitar testes e integração
window.showScreen = showScreen;
window.hideAllScreens = hideAllScreens;
window.gerarTecladoVirtual = gerarTecladoVirtual;
window.atualizarPainelDificuldade = atualizarPainelDificuldade;
