const Dom = require('./Dom');
const Player = require('./Player');
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
  this.player = Player();
  this.ai = Player();

  randomPositions(this.player);
  randomPositions(this.ai);

  Dom.resetGrids();
  displayShips(this.player);

  Dom.setupEnemy(attackLoop);
  Dom.hitNotifier('Your turn', 15000);
  canAttack = true;
}

function randomPositions(other) {
  const board = other.board;

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
function displayShips(other) {
  const grid = Dom.playerGrid;
  const ships = other.ships;

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

function attackLoop(e) {
  if (!canAttack) return;

  const square = e.target;
  if (!square.classList.contains('grid-coordinate')) return;
  if (square.classList.contains('hit')) return Dom.hitNotifier('Square has already been attacked.', 2500);

  const coord = square.classList[1];
  console.log('is square: ' + square.classList[1]);

}

function attackOther(other, coord) {
  const board = other.board;
  const result = board.receiveAttack(coord);
}

module.exports = {
  init,
}