const Player = require('../src/Player');

it('returns player object with Board property', () => {
  const playerT = Player();

  expect(playerT).toHaveProperty('board');
});