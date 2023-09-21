const Dom = require('./Dom');
const Player = require('./Player');
let player;
let ai;
let canAttack = false;
// will include methods for placing ship
// ship sizes will be predetermined
// their 'core' node will be on the top left
// the ships can be rotated on the core node
// there are two orientations, right where theyre horiziontal or bottom where theyre vertical
// ships can be touching but can not overlap
// ships must be within bounds of the board

//well have a main gameloop method thats called each time a player clicks on a grid square
//there will be an eventlistener on the enemies grid
//when a square is clicked, get target from event, split className with space, get last item
//last item is coordinate

const shipSizes = [5, 4, 2, 2, 1];
const directions = ['right', 'bottom'];

function init() {
  player = Player();
  ai = Player();

  randomPositions(player.board);
  randomPositions(ai.board);

  Dom.resetGrids();
  displayShips('player', player.ships);
  // displayShips('ai', ai.ships);

  Dom.setupEnemy(attackLoop);
  Dom.hitNotifier('Your turn', 7500);
  Dom.swapOpacity('player');
  canAttack = true;
  console.log(1);
}

function randomPositions(board) {
  shipSizes.forEach(length => {
    const direction = directions[Math.floor(Math.random() * 2)]
    let result = board.placeShip(randomCoord(), length, direction);

    while (result === false) {
      result = board.placeShip(randomCoord(), length, direction); 
    }
  });
}

function randomCoord() {
  const [x, y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];

  return [x, y].toString();
}

// should seperate rendering from this method
// would allow for displaying individual ships when rotated or dragged and dropped
function displayShips(other, ships) {
  const grid = Dom[other == 'player' ? 'playerGrid' : 'aiGrid'];

  Object.values(ships).forEach((ship) => {
    const coords = ship.coords;
    const direction = ship.direction;
    for (let i = 0; i < coords.length; i++) {
      const square = grid[coords[i]];
      square.classList.add(direction, 'ship');

      if (i == 0) square.classList.add('first');
      if (i == coords.length - 1) square.classList.add('last');
    }
  });
}

async function attackLoop(e) {
  if (!canAttack) return;

  const square = e.target;
  if (!square.classList.contains('grid-coordinate')) return;
  
  const aiBoard = ai.board;
  const coord = square.classList[1];
  const result = aiBoard.receiveAttack(coord);
  if (result == false) return Dom.hitNotifier('Square has already been attacked', 1250);

  canAttack = false;
  Dom.renderAttack(square, result);
  if (result == 'hit') {
    if (aiBoard.allSunken()) return endGame('player');

    canAttack = true;
    return;
  }

  await timeoutPromise(1250);
  Dom.swapOpacity('ai');
  if (await attackPlayer()) {
    endGame('ai');
    return;
  }

  canAttack = true;
  Dom.swapOpacity('player');
  Dom.hitNotifier('Your turn', 2000);
}

 async function attackPlayer() {
  const playerBoard = player.board;
  let coord = getPlayerCoord();
  let square = Dom.playerGrid[coord];
  await timeoutPromise(500);

  let result = playerBoard.receiveAttack(coord);
  while (result == 'hit') {
    Dom.hitNotifier('The AI hits');
    Dom.renderAttack(square, result);
    if (playerBoard.allSunken()) return true;

    await timeoutPromise(1250)
    coord = getPlayerCoord();
    square = Dom.playerGrid[coord];
    result = playerBoard.receiveAttack(coord);
  }
  Dom.renderAttack(square, result);
  Dom.hitNotifier('The AI misses');
  await timeoutPromise(1250);
}

function getPlayerCoord() {
  let coord = randomCoord();
  const playerBoard = player.board;

  while (playerBoard.hitCoordinates[coord]) {
    coord = randomCoord();
  }

  return coord;
}

function endGame(winner) {
  Dom.swapOpacity();
  if (winner == 'player') {
    Dom.hitNotifier('You win!');
  } else {
    Dom.hitNotifier('The AI wins!');
  }
}

function timeoutPromise(delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  })
}

module.exports = {
  init,
};