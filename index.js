const winner = document.getElementById('winner');
const restart = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');

const winnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let boardState = Array(9).fill(null);
const players = {
    x: 'X',
    o: 'O'
}

let curentPlayer = '';
let isTheGameRunning = true;

const initialization = () => {
    for (const cell of cells) {
        cell.addEventListener('click', handleClickCell);
    }

    restart.addEventListener('click', restartGame);
}

const handleClickCell = (e) => {
    if(!isTheGameRunning || e.target.textContent){
        return
    }
    e.target.textContent = curentPlayer;

    const cellIndex = e.target.dataset.cellIndex;
    boardState[cellIndex] = curentPlayer;
    if(checkGameOver()){
        return finishGame();
    }
    curentPlayer = curentPlayer === players.x ? players.o: players.x; 
}

const startGame = () => {
    isTheGameRunning = true;
    winner.textContent = '';
    curentPlayer = players.x;
    cells.forEach(cell => cell.textContent = null)
}

const checkGameOver = () => {
    for (const line of winnerCombination) {
        if(checkLine(line)){
            winner.textContent = `Winner: ${curentPlayer}`
            return true;
        }

        if(!boardState.includes(null)){
            winner.textContent = 'Winner: Draw';
            return true;
        }
    }
}

const checkLine = (line) => {
    const [a, b, c] = line;

    const cellA = boardState[a]
    const cellB = boardState[b]
    const cellC = boardState[c]

    if([cellA, cellB, cellC].includes(null)){
        return false;
    }

    if(cellA === cellB && cellB === cellC){
        return true;
    }
}

const finishGame = () => {
    isTheGameRunning = false;
    boardState = Array(9).fill(null);
}

const restartGame = () => {
    startGame();
}

window.addEventListener('load', () => {
    initialization();
    startGame();
})