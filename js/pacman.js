'use strict'


const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {

    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.code)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === CHERRY) {
        updateScore(CHERRY_SCORE)
    } else if (nextCell === FOOD) {
        updateScore(FOOD_SCORE)
        gFoodCount--
    } else if (nextCell === SUPER_FOOD) {
        //Done: When Pacman in already super mode, he cannot eat another Super Food
        if(gSuperPowerMode) return
        gSuperPowerMode = true
        changeGhostColor('blue')
        setTimeout(backToNormal, 5000)
    }

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gSuperPowerMode) {
            var ghost = removeGhostFromGghosts(nextLocation)
            if(ghost.currCellContent === FOOD) {
                gFoodCount--
                updateScore(1)
            }
        }else {
            gameOver()
            return
        }

    }

    


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    gEmptySpaces.push({i:gPacman.location.i, j:gPacman.location.j})
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
    if (gFoodCount === 0) {
        gIsVictory = true
        gameWon()
    }
}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // TODO: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }

    return nextLocation
}