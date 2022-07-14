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


//Random Number Gen
function random(num) {
  return Math.floor(Math.random() * Math.floor(num))
}

function placeS1() {
  let direction = ''
  let units = 2;
  let dir = random(size) % 2
  let x = random(size);
  let y = random(size);
  let coordCheck = []

  if (dir == 0) {
    direction = 'vertical'
  } else if (dir == 1) {
    direction = 'horizontal'
  }

  if (direction == 'vertical' && x < 8) {
    for(i=0; i<units;i++) {
      coordCheck.push([x+i, y]);
    }
  } else if (direction == 'horizontal' && y < 8) {
    for(i=0; i<units;i++) {
      coordCheck.push([x, y+i]);
    }
  } else {
    return placeS1();
  }

  for(i=0; i<units; i++) {
    if (!shipSpace[coordCheck[i]]) {
    } else {
      return placeS1();
    }

  }
  for (i=0;i<units;i++) {
    markSpot(coordCheck[i][0],coordCheck[i][1],"O");
    ships ++;
    shipSpace[coordCheck[i]] = true;
  }

}

function placeS2() {
  let direction = ''
  let units = 3;
  let dir = random(size) % 2
  let x = random(size);
  let y = random(size);
  let coordCheck = []

  if (dir == 0) {
    direction = 'vertical'
  } else if (dir == 1) {
    direction = 'horizontal'
  }

  if (direction == 'vertical' && x < 7) {
    for(i=0; i<units;i++) {
      coordCheck.push([x+i, y]);
    }
  } else if (direction == 'horizontal' && y < 7) {
    for(i=0; i<units;i++) {
      coordCheck.push([x, y+i]);
    }
  } else {
    return placeS2();
  }

  for(i=0; i<units; i++) {
    if (!shipSpace[coordCheck[i]]) {
    } else {
      return placeS2();
    }

  }
  for (i=0;i<units;i++) {
    markSpot(coordCheck[i][0],coordCheck[i][1],"O");
    ships ++;
    shipSpace[coordCheck[i]] = true;
  }
  

}

function placeS3() {
  let direction = ''
  let units = 4;
  let dir = random(size) % 2
  let x = random(size);
  let y = random(size);
  let coordCheck = []

  if (dir == 0) {
    direction = 'vertical'
  } else if (dir == 1) {
    direction = 'horizontal'
  }

  if (direction == 'vertical' && x < 6) {
    for(i=0; i<units;i++) {
      coordCheck.push([x+i, y]);
    }
  } else if (direction == 'horizontal' && y < 6) {
    for(i=0; i<units;i++) {
      coordCheck.push([x, y+i]);
    }
  } else {
    return placeS3();
  }

  for(i=0; i<units; i++) {
    if (!shipSpace[coordCheck[i]]) {
    } else {
      return placeS3();
    }

  }
  for (i=0;i<units;i++) {
    markSpot(coordCheck[i][0],coordCheck[i][1],"O");
    ships ++;
    shipSpace[coordCheck[i]] = true;
  }

}

function placeS4() {
  let direction = ''
  let units = 5;
  let dir = random(size) % 2
  let x = random(size);
  let y = random(size);
  let coordCheck = []

  if (dir == 0) {
    direction = 'vertical'
  } else if (dir == 1) {
    direction = 'horizontal'
  }

  if (direction == 'vertical' && x < 5) {
    for(i=0; i<units;i++) {
      coordCheck.push([x+i, y]);
    }
  } else if (direction == 'horizontal' && y < 5) {
    for(i=0; i<units;i++) {
      coordCheck.push([x, y+i]);
    } 
  } else {
    return placeS4();
  }

  for(i=0; i<units; i++) {
    if (!shipSpace[coordCheck[i]]) {
    } else {
      return placeS4();
    }

  }
  for (i=0;i<units;i++) {
    markSpot(coordCheck[i][0],coordCheck[i][1],"O");
    ships ++;
    shipSpace[coordCheck[i]] = true;
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

function slotCheck(slot) {
  if (slot !== 'a 1' && slot !== 'a 2' && slot !== 'a 3' && slot !== 'a 4' && slot !== 'a 5' && slot !== 'a 6' && slot !== 'a 7' && slot !== 'a 8' && slot !== 'a 9' && slot !== 'a 10' &&
  slot !== 'b 1' && slot !== 'b 2' && slot !== 'b 3' && slot !== 'b 4' && slot !== 'b 5' && slot !== 'b 6' && slot !== 'b 7' && slot !== 'b 8' && slot !== 'b 9' && slot !== 'b 10' &&
  slot !== 'c 1' && slot !== 'c 2' && slot !== 'c 3' && slot !== 'c 4' && slot !== 'c 5' && slot !== 'c 6' && slot !== 'c 7' && slot !== 'c 8' && slot !== 'c 9' && slot !== 'c 10' &&
  slot !== 'd 1' && slot !== 'd 2' && slot !== 'd 3' && slot !== 'd 4' && slot !== 'd 5' && slot !== 'd 6' && slot !== 'd 7' && slot !== 'd 8' && slot !== 'd 9' && slot !== 'd 10' && 
  slot !== 'e 1' && slot !== 'e 2' && slot !== 'e 3' && slot !== 'e 4' && slot !== 'e 5' && slot !== 'e 6' && slot !== 'e 7' && slot !== 'e 8' && slot !== 'e 9' && slot !== 'e 10' && 
  slot !== 'f 1' && slot !== 'f 2' && slot !== 'f 3' && slot !== 'f 4' && slot !== 'f 5' && slot !== 'f 6' && slot !== 'f 7' && slot !== 'f 8' && slot !== 'f 9' && slot !== 'f 10' &&
  slot !== 'g 1' && slot !== 'g 2' && slot !== 'g 3' && slot !== 'g 4' && slot !== 'g 5' && slot !== 'g 6' && slot !== 'g 7' && slot !== 'g 8' && slot !== 'g 9' && slot !== 'g 10' &&
  slot !== 'h 1' && slot !== 'h 2' && slot !== 'h 3' && slot !== 'h 4' && slot !== 'h 5' && slot !== 'h 6' && slot !== 'h 7' && slot !== 'h 8' && slot !== 'h 9' && slot !== 'h 10' &&
  slot !== 'i 1' && slot !== 'i 2' && slot !== 'i 3' && slot !== 'i 4' && slot !== 'i 5' && slot !== 'i 6' && slot !== 'i 7' && slot !== 'i 8' && slot !== 'i 9' && slot !== 'i 10' &&
  slot !== 'j 1' && slot !== 'j 2' && slot !== 'j 3' && slot !== 'j 4' && slot !== 'j 5' && slot !== 'j 6' && slot !== 'j 7' && slot !== 'j 8' && slot !== 'j 9' && slot !== 'j 10') {
    console.log('That is not a valid space, please  try another');
    return declareAttack();
  } else {
    coord = slot.split(' ')
  }
}

//This declares the space to be fired at
function declareAttack() {
  let column = ""
  let ro = ""
  const slot = rs.question('Enter a location to strike! ')
  slotCheck(slot)

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
      case 'd':
        ro = 3;
        break;
      case 'e':
        ro = 4;
        break;
      case 'f':
        ro = 5;
        break;
      case 'g':
        ro = 6;
        break;
      case 'h':
        ro = 7;
        break;
      case 'i':
        ro = 8;
        break;
      case 'j':
        ro = 9;
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
      case '4':
        column = 3;
        break;
      case '5':
        column = 4;
        break;
      case '6':
        column = 5;
        break;
      case '7':
        column = 6;
        break;
      case '8':
        column = 7;
        break;
      case '9':
        column = 8;
        break;
      case '10':
        column = 9;
        break;
    }
    return column;
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
  for (i = 0; i < 2; i++) {
    placeS1();
    placeS2();
    placeS2();
    placeS3();
    placeS4();
  }
  console.log(' ')
  displayBoard(myBoard);
  gameState();
}

beginGame();