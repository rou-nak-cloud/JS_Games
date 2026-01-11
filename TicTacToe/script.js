const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')

// Initialize variables for the game
let player = 'X'
let isGameEnd = false
let isGameStart = false
let isGamePaused = false

// Array of input cells
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']

// Array of win conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
]

// Add click Event Listener to each cell
cells.forEach((cell,idx) => {
    cell.addEventListener("click", () => clickCell(cell,idx))
})

function clickCell(cell,idx) {
    // ensure cell is not empty and game is not paused
    if(cell.textContent === "" && !isGameEnd){
        isGameStart = true
        updateCell(cell,idx)

        // change to another player if no one has yet won
        if(!checkWinner()){
            changePlayer()
            // for computer move
            randomPick()
        }
    }
}

function updateCell(cell,idx) {
    cell.textContent = player
    inputCells[idx] = player
    cell.style.color = (player === 'X') ? '#1892ea' : '#a737ff'
    console.log(inputCells)
}

// for computer
function randomPick() {
    //  pause the game for computer move
    isGamePaused = true

    setTimeout(() => {
        let randomIdx 
        do{
            randomIdx = Math.floor(Math.random() * inputCells.length)
        } while (
            // ensure the chosen cell is empty
            // “If the cell is taken → try again.”
            inputCells[randomIdx] !== ''
        )
        // update the cell with computer move
        updateCell(cells[randomIdx], randomIdx, player) // Pass the cell element and its index
        // check if computer won
        if(!checkWinner()){
            changePlayer()
            // switch back to human
            isGamePaused = false
            return
        }
        // change player back to 'X' if comp 'O' wins
        player = player === 'X' ? 'O' : 'X';
    },500)
}

// NOW SWITCH PLAYER
function changePlayer() {
    player = player === 'X' ? 'O' : 'X' 
}

function checkWinner() {
    for (const [a,b,c] of winConditions){
        // winning condition
        if(inputCells[a] === player &&
            inputCells[b] === player &&
            inputCells[c] === player 
        ){
            declareWinner([a,b,c])
            return true;
        }
    }
    // check for draw
    if(inputCells.every(cell => cell !== '')){
        declareDraw()
        return true
    }
}

function declareWinner(winningCells) {
    titleHeader.textContent = `${player} Won!`
    isGameEnd = true

    // Highlight the winning cells
    winningCells.forEach((idx) => {
        cells[idx].style.background = '#2a2343'
    })
    restartBtn.style.visibility = 'visible'
}
function declareDraw() {
    titleHeader.textContent = 'Draw!'
    isGameEnd = true
    restartBtn.style.visibility = 'visible'
}

// choose another player
function choosePlayer(selectedPlayer) {
    if(!isGameStart){
        // override the player
        player = selectedPlayer
        if(player === 'X') {
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        }else{
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
    }
}

// restart Game
restartBtn.addEventListener('click', () => restartGame())

// or normal function as restart game ()
const restartGame = () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach((cell) => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isGameEnd = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose'
}