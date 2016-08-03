document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = { cells: []};

function createCells(numCol, numRow) {
  for(var i = 0; i < numRow; i++) {
    for(var j= 0; j < numCol; j++) {
      board.cells[(i * numCol) + j] = new Cell(i, j, false, true);
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
  }
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
