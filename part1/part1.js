const rs = require('readline-sync');

let ships = 0;
const rowAlpha = [
  "a",
  "b",
  "c"
];
let shipSpace = {};
let size = 3;
const myBoard = boardSpace(size)

//Random Gen for CPU ship
function random(num) {
  return Math.floor(Math.random() * Math.floor(num))
}

//This function creates the board
function boardSpace(size) {
  let board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = "-";
    }
  }
  return board;
}

//This places the numbers on the top  of  the grid
function top(size) {
  let result = '  ';
  for (let i = 1; i <= size; i++) {
    result += i + ' ';
  }
  console.log(result)
  return result;
}

//This console.logs the board so it can  be seen
function displayBoard(board) {
  top(board.length);
  for(let i = 0; i < board.length; i++) {
    let row = rowAlpha[i] + " ";
    for (let space of board[i]) {
      if (space == "O") {
        row +='- ';
      } else {
        row += space + ' ';
      }
    }
    console.log(row)
  }
}

function placeBoat(x, y, s) {
  myBoard[x][y] = s;
  ships ++;
}

function hitBoat(x, y, s) {
  myBoard[x][y] = s;
  ships --;
}

function missBoat(x, y, s) {
  myBoard[x][y] = s;
}

function placeShip () {
  let occupied = false;
  while (!occupied) {
    let x = random(3);
    let y = random(3);
    if (!shipSpace[`${x}-${y}`]){
      placeBoat(x,y,"O");
      occupied = true;
      shipSpace[`${x}-${y}`] = true;
    }
  }
}

function attack(x, y){
  if(myBoard[x][y] == "O") {
    hitBoat(x, y, "!")
    console.log("Hit. You have sunk a battleship. " + ships + " ship remaining.")
    showBoard(myBoard)
    return true;
  } else if (myBoard[x][y] == "-") {
    missBoat(x, y, "X");
    console.log('You have missed!')
    showBoard(myBoard)
    return false;
  } else if (myBoard[x][y] == "X") {
    console.log('You have already picked this location. Miss!')
    showBoard(myBoard)
    return false;
  }
}

function showBoard(board) {
  top(board.length);
  for(let i = 0; i < board.length; i++) {
    let row = rowAlpha[i] + " ";
    for (let space of board[i]) {
      if (space == "O") {
        row +='- ';
      } else if (space == "!") {
        row +='! ';
      } else if (space == "X") {
        row +='x ';
      } else {
        row += space + ' ';
      }
    }
    console.log(row)
  }
}

function declareAttack() {
  let column = ""
  let ro = ""
  const slot = rs.question('Declare Slot ')
  if (slot !== 'a1' && slot !== 'a2' && slot !== 'a3' && slot !== 'b1' && slot !== 'b2' && slot !== 'b3' && slot !== 'c1' && slot !== 'c2' && slot !== 'c3') {
    console.log('That is not a valid space, please try another')
  } else {
    const coord = slot.split('')

  function getX(val) {
    switch (val) {
      case 'a':
        ro = 0;
        break;
      case 'b':
        ro = 1;
        break;
      case 'c':
        ro = 2;
        break;
    }
    return ro;
  }

  function getY(val) {
    switch (val) {
      case '1':
        column = 0;
        break;
      case '2':
        column = 1;
        break;
      case '3':
        column = 2;
        break;
    }
    return column;
  }

  ro = getX(coord[0])
  column = getY(coord[1])
  console.log(' ')

  attack(ro, column)
  }
  
}
function gameState() {
  if (ships > 0) {
    declareAttack();
    return gameState();
  } else {
    playAgain()
  }
}

function playAgain() {
  if (rs.keyInYN('you have destroyed all battleships. Would you like to play again?')) {
    beginGame()
  } else {
    console.log('thank you for playing')
  }
} 

function beginGame() {
  const begin = rs.keyIn('Press any key to Begin ');
  displayBoard(myBoard);
  console.log('2 Ships will now  be placed')
  for (i = 0; i < 2; i++) {
    placeShip()
  }
  gameState();
}

beginGame();