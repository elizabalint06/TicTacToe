const board = document.getElementById("board");
const cells = board.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartBtn = document.getElementById('restart-btn');
const winningCombinations= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer = 'X';
let moves = 0;
restartBtn.style.display = 'none';


function makeMove(index) {
    if (cells[index].textContent === '') {
        cells[index].textContent = currentPlayer;
        ++moves;

        if (checkWinner(currentPlayer)) {
            message.textContent = `Player ${currentPlayer} wins!`;
            launchConfetti();
            disableCells();
            restartBtn.style.display = 'block';
           
        } else if (moves === 9) {
            message.textContent = 'It is a draw!';
            disableCells();
            restartBtn.style.display = 'block';
         
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner(player) {
    return winningCombinations.some(combination => {
        return combination.every(cell => cells[cell].textContent === player);
    });
}

function launchConfetti() {
    confetti({
        particleCount: 500,
        spread: 70,
        origin: { y: 0.9 }
    });
}
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto'; 
    });
    currentPlayer = 'X';
    moves = 0;
    message.textContent = ' ';
    restartBtn.style.display = 'none';
}

function disableCells() {
    cells.forEach(cell => cell.style.pointerEvents = 'none');
}
restartBtn.addEventListener('click', resetGame);
