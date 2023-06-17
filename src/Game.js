const Board = require('./Board');
const Player = require('./Player');
// will include methods for placing ship
// ship sizes will be predetermined
// their 'core' node will be on the top left
// the ships can be rotated on the core node
// there are two orientations, right where theyre horiziontal or bottom where theyre vertical
// ships can be touching but can not overlap
// ships must be within bounds of the board

function init() {
  this.player1 = Player();
  this.player0 = Player();
}

module.exports = {
  init
}