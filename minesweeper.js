document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = { cells: []};

function createCells(numCol, numRow) {
  //code that generates random no. of bombs
  var numBombs = Math.ceil((numCol * numRow) * 0.15);
  numBombs += Math.floor(Math.random() * 5) -2;
  if(numBombs <= 0) {
    numBombs = 1;
  }

  var bombIndexes = [];
  for(var h = 0; h <= numBombs; h++) {
    //creates new bomb
    var currentIndex = 0;
    var hasValidIndex = false;
    //loops until an index is generated that isn't already in bombIndexes
    while(hasValidIndex == false) {
      currentIndex = Math.floor(Math.random() * (numCol * numRow));
      hasValidIndex = true;
      //loops through bombIndexes to check that currentIndex isn't already in it
      for(var l = 0; l < bombIndexes.length; l++) {
        if(bombIndexes[l] == currentIndex) {
          hasValidIndex = false;
          break;
        }
      }
      if(hasValidIndex == true) {
        bombIndexes.push(currentIndex);
      }
    }
  }

  for(var i = 0; i < numRow; i++) {
    for(var j= 0; j < numCol; j++) {
      var isBomb = false;
      for(var h = 0; h < bombIndexes.length; h++) {
        //loops through bombIndexes to check in currentIndex is a bomb
        if(bombIndexes[h] == (i * numCol) + j) {
          isBomb = true;
          break;
        }
      }
      board.cells[(i * numCol) + j] = new Cell(i, j, isBomb, true);
    }
  }
}
createCells(6, 6);

function Cell (row, col, isMine, hidden) {
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.hidden = hidden;
  this.surroundingMines = 0;
}

function startGame () {
  for(var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  var hasWon = true;
  for(var i = 0; i < board.cells.length; i++) {
    if(board.cells[i].isMine && !board.cells[i].isMarked) {
      hasWon = false;
      break;
    }
    else if(!board.cells[i].isMine && board.cells[i].hidden) {
      hasWon = false;
      break;
    }
  }


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  if(hasWon) {
    lib.displayMessage('You win!');
    window.setTimeout(resetBoard, 2000);
  }
  else {
    var hasLost = false;
    for(var i = 0; i < board.cells.length; i++) {
      if(board.cells[i].isMine && !board.cells[i].hidden) {
        hasLost = true;
        break;
      }
    }
    if(hasLost) {
      window.setTimeout(resetBoard, 2000);
    }
  }
}

function resetBoard() {
  location.reload();
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var counter = 0;
  for(var i = 0; i < surrounding.length; i++) {
    if(surrounding[i].isMine == true) {
      counter++;
    }
  }
  return(counter);
}
