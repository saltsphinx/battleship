const Board = require('./Board');
const Player = require('./Player');
// will include methods for placing ship
// ship sizes will be predetermined
// their 'core' node will be on the top left
// the ships can be rotated on the core node
// there are two orientations, right where theyre horiziontal or bottom where theyre vertical
// ships can be touching but can not overlap
// ships must be within bounds of the board

const shipSizes = [5, 4, 2, 2, 1];
const directions = ['right', 'bottom'];

function init() {
  this.player1 = Player();
  this.player0 = Player();

  randomPositions(this.player0);
  randomPositions(this.player1);
}

function randomPositions(player) {
  const board = player.board;

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

module.exports = {
  init
}