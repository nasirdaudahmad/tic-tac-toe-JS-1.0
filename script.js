const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    gameStatus.textContent = `${currentPlayer} has won!`;
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    gameStatus.textContent = 'It\'s a draw!';
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  isGameActive = true;
  gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);