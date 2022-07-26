const rs = require('readline-sync');
const rowAlpha = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
];
let ships = 0;
let shipSpace = {};
let size = 10;
const myBoard = boardSpace(size)
let coord = ''
let units = {
  2: 1,
  3: 2,
  4: 1,
  5: 1
}
//Random Number Gen
function random(num) {
  return Math.floor(Math.random() * Math.floor(num))
}

const getDirection = (size) => {
  let rand = random(size) % 2;
  return (rand = 0) ? 'vertical' : 'horizontal';
}

const placeShip = (units, boardSize, amount) => {
  for (i=0; i<amount; i++){
    const direction = getDirection(boardSize);
    let x = random(size);
    let y = random(size);
    let coordCheck = [];
    const someIndex = (size) - units;

    if (direction == 'vertical' && x < someIndex) {
      for(i=0; i<units;i++) {
        coordCheck.push([x+i, y])
      } 
    } else if (direction == 'horizontal' && y < someIndex) {
      for(i=0; i<units;i++) {
        coordCheck.push([x, y+i]);
      }
    } else {
      return placeShip(units, boardSize)
    }

    for (i=0;i<units; i++) {
      if (!shipSpace[coordCheck[i]]) {
      } else {
        return placeShip(units, boardSize);
      }
    }

    for (i=0;i<units; i++) {
      markSpot(coordCheck[i][0],coordCheck[i][1],"O");
      ships++;
      shipSpace[coordCheck[i]] = true
    }
  }
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

//This places the numbers on the top of the grid
function top(size) {
  let result = '  ';
  for (let i = 1; i <= size; i++) {
    result += i + ' ';
  }
  console.log(result)
  return result;
}

//This console.logs the board so it can be seen
function displayBoard(board) {
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

//This marks the spot on fire
function markSpot(x, y, s) {
  myBoard[x][y] = s;
}

//This is the attack
function attack(x, y){
  if(myBoard[x][y] == "O") {
    markSpot(x, y, "!");
    ships--;
    console.log("Hit!")
    console.log(' ')
    displayBoard(myBoard)
    return true;
  } else if (myBoard[x][y] == "-") {
    markSpot(x, y, "X");
    console.log('You have missed....')
    console.log(' ')
    displayBoard(myBoard)
    return false;
  } else if (myBoard[x][y] == "X" || myBoard[x][y] == "!") {
    console.log('You have already picked this location. Miss!')
    console.log(' ')
    displayBoard(myBoard)
    return false;
  }
}

//Check to see if the slot is valid
function slotCheck(slot) {
  const newSlot = slot.split(' ');
  if (rowAlpha.includes(newSlot[0]) && +newSlot[1] > 0 && +newSlot[1] <= 10) {
    coord = newSlot;
  } else { console.log('That is not a valid space, please  try another'); }
}

//This declares the space to be fired at
function declareAttack() {
  let column = ""
  let ro = ""
  const slot = rs.question('Enter a location to strike! ')
  slotCheck(slot)

  function getX(val) {
    return rowAlpha.indexOf(val);
  }
  function getY(val) {
    return (val <= 10 || val >= 1) ? val - 1 : false;
  }

  ro = getX(coord[0])
  column = getY(coord[1])

  attack(ro, column)
}

//This keeps track of the game state
function gameState() {
  if (ships > 0) {
    console.log(' ');
    declareAttack();
    console.log(' ')
    return gameState();
  } else {
    playAgain()
  }
}

//Prompt for when game is finished
function playAgain() {
  if (rs.keyInYN('you have destroyed all battleships. Would you like to play again?')) {
    beginGame()
  } else {
    console.log('thank you for playing')
  }
} 

//Begins the game
function beginGame() {
  const begin = rs.keyIn('Press any key to Begin ');
  console.log(' ')
  console.log('5 Ships will now  be placed')
  Object.entries(units).map((ship) => {
    placeShip(ship[0], size, ship[1])
  });
  console.log(' ')
  displayBoard(myBoard);
  gameState();
}

beginGame();