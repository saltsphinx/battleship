const Board = require('./Board');

function Player() {
  return {
    board: Board(),
  };
};

module.exports = Player;