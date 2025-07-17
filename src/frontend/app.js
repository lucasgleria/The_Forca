// Estrutura inicial do app.js

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const endingScreen = document.getElementById('ending-screen');

function hideAllScreens() {
  menuScreen.style.display = 'none';
  gameScreen.style.display = 'none';
  endingScreen.style.display = 'none';
}

function showScreen(screenId) {
  hideAllScreens();
  document.getElementById(screenId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  // Exibe o menu ao carregar
  showScreen('menu-screen');

  // Event listeners dos botões de dificuldade
  document.getElementById('easy-btn').addEventListener('click', () => {
    console.log('Dificuldade selecionada: easy');
    showScreen('game-screen');
    gerarTecladoVirtual();
  });
  document.getElementById('medium-btn').addEventListener('click', () => {
    console.log('Dificuldade selecionada: medium');
    showScreen('game-screen');
    gerarTecladoVirtual();
  });
  document.getElementById('hard-btn').addEventListener('click', () => {
    console.log('Dificuldade selecionada: hard');
    showScreen('game-screen');
    gerarTecladoVirtual();
  });

  // Event listener do botão Jogar Novamente
  const playAgainBtn = document.getElementById('play-again-btn');
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      showScreen('menu-screen');
    });
  }
});

// Função para gerar o teclado virtual (A-Z)
function gerarTecladoVirtual() {
  const keyboard = document.getElementById('keyboard');
  if (!keyboard) return;
  keyboard.innerHTML = '';
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let letra of alfabeto) {
    const btn = document.createElement('button');
    btn.textContent = letra;
    btn.className = 'py-2 px-2 sm:px-3 bg-gray-600 rounded font-bold text-base sm:text-lg hover:bg-gray-500 transition';
    btn.addEventListener('click', function () {
      console.log('Letra clicada:', letra);
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    });
    keyboard.appendChild(btn);
  }
}

// Expor funções no escopo global para facilitar testes e integração
window.showScreen = showScreen;
window.hideAllScreens = hideAllScreens;
window.gerarTecladoVirtual = gerarTecladoVirtual;
