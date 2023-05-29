const Ship = require('../src/Ship');

it('throws error if number isn\'t passed', () => {
  expect(() => Ship()).toThrow();
});

it('increments hits from 0 to 1', () => {
  const testShip = Ship(2);

  testShip.hit();
  expect(testShip.hits).toBe(1);
});

it('detects if ship has sunken', () => {
  const testShip = Ship(1);

  expect(testShip.isSunk()).toBe(false);
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});