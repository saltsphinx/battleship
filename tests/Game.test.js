const Game = require('../src/Game');

it('initializes player1 and player2 properties to objects', () => {
  expect(typeof Game.player1).toBe('undefined');

  Game.init();

  expect(typeof Game.player1).toBe('object');
});