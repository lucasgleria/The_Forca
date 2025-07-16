// Estrutura inicial do app.js

document.addEventListener('DOMContentLoaded', () => {
  const menuScreen = document.getElementById('menu-screen');
  const gameScreen = document.getElementById('game-screen');
  const endingScreen = document.getElementById('ending-screen');

  function showScreen(screenId) {
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    endingScreen.style.display = 'none';
    document.getElementById(screenId).style.display = 'block';
  }

  // Exibe o menu ao carregar
  showScreen('menu-screen');

  // Aqui serão adicionados event listeners e lógica do jogo
});
