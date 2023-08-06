const Board = require('./Board');

function Player() {
  const board = Board();

  return {
    board,
    ships: board.ships
  };
};

module.exports = Player;