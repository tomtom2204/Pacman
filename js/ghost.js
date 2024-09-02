'use strict'

const GHOST = '👻'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        backgroundColor: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    console.log('\n\n')

}

function moveGhost(ghost) {

    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if(gSuperPowerMode){
            removeGhostFromGghosts(nextLocation)
        }else{
            gameOver()
        }
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost)) 
    //renderCell(nextLocation, `<span style="background-color:${getRandomColor()};"> ${getGhostHTML(ghost)}</span>`) // GHOST
}

function getMoveDiff() {

    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span class="ghost" style="background-color:${ghost.backgroundColor};"> ${GHOST}</span>`
}

function removeGhostFromGghosts(nextLocation){
    console.log(gGhosts.length)
    for(var i = 0; i<gGhosts.length; i++){
        if(gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j ) {
            var ghost = gGhosts[i]
            gGhosts.splice(i, 1)
            return ghost
        }
    }
}

function changeGhostColor(color){
    for(var i = 0; i< gGhosts.length; i++){
        gGhosts[i].backgroundColor = color  ? color : getRandomColor()
    }
}