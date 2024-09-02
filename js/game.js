'use strict'

const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '🧫'
const CHERRY = '🍒'
const EMPTY = ' '
const FOOD_SCORE = 1
const SUPER_FOOD_SCORE = 0
const GHOST_SCORE = 0
const CHERRY_SCORE = 10


const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gIsVictory
var gFoodCount
var gSuperPowerMode
var gEmptySpaces
var gSetCherryInterval

function onInit() {
    console.log('hello')

    gFoodCount = -1
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    hideModal()
    gIsVictory = false
    gSuperPowerMode = false
    gEmptySpaces = []
    gSetCherryInterval = setInterval(renderCherry, 15000);
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }else if((i === 1 && j === 1) || (i === size - 2 && j === size - 2) || (i === size - 2 && j === 1) || (i === 1 && j === size - 2) ){
                board[i][j] = SUPER_FOOD

            } else{
                board[i][j] = FOOD
                gFoodCount++
            }
            
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // update model 
    if (diff) {
        gGame.score += diff
    } else {
        gGame.score = 0
    }
    // and dom
    document.querySelector('span.score').innerText = gGame.score 
    

}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    showModal()
    clearInterval(gSetCherryInterval)
}
//Done: Show game-over modal with ‘play again’ button. (When the game is finished).
function showModal() {
    if(gIsVictory){
        const userMsg = document.querySelector('.user-msg')
        userMsg.innerText = "Victorious"
    }
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

//Done: When Pacman collects all the foods, the user wins – Show ‘victorious’ modal with ‘play again’ button
function gameWon() {
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    showModal()
}

function backToNormal(){
    gSuperPowerMode = false
    changeGhostColor()
    for (var i = gGhosts.length; i < 3; i++) {
        createGhost(gBoard)
    }   
}

function drawLocation() {
    var idx = getRandomIntInclusive(0, gEmptySpaces.length - 1);
    return gEmptySpaces.splice(idx, 1)[0];
}

function renderCherry(){
    var location =  drawLocation()
    if(location){
        gBoard[location.i][location.j] = CHERRY
        renderCell(location, CHERRY)
    }
}