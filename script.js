const back = document.getElementById('board');
const satus = document.getElementById('status');
const reset = document.getElementById('reset');
const temp = document.getElementById('tempDiv');

let board = ['', '', '', '', '', '', '', '', ''];
let canplay = false;
var put;
function player(p1){
    put = p1;
    canplay = true;
    temp.remove();
}

const winningconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function start() {
    back.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'flex items-center justify-center w-16 h-16 text-3xl font-bold border cursor-pointer';
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => xochange(index));
        back.appendChild(cellElement);
    });
}

function xochange(index) {
    if (board[index] || !canplay) return;
    board[index] = put;
    checkwin();
    put = put == 'X' ? 'O' : 'X';
    start();
}

function checkwin() {
    for (const condition of winningconditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            canplay = false;
            alert(`${board[a]} wins!`);
            return;
        }
    }
    if (!board.includes('')) {
        canplay = false;
        alert('DRAW!!!!');
    }
}

reset.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    put = 'X';
    canplay = true;
    satus.textContent = '';
    back.insertAdjacentElement('afterend',temp);
    start();
});

start();