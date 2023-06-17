const Ship = require('../src/Ship');

it('throws error if number isn\'t passed', () => {
  expect(() => Ship()).toThrow();
});

it('increments hits from 0 to 1', () => {
  const testShip = Ship(2);

  testShip.hit();
  expect(testShip.hits).toBe(1);
});

it('throws error if first param isn\' a number', () => {
  expect(() => Ship('0')).toThrow('Non-number passed as parameter Ship Factory');
});

it('throws error if length is less than 1, more than 4', () => {
  expect(() => Ship(0)).toThrow('Length must be between 1 and 4');
  expect(() => Ship(5)).toThrow('Length must be between 1 and 4');
});

it('throws error if second param isn\'t an array or is empty', () => {
  expect(() => Ship(1, '1')).toThrow('Second parameter must be a non-empty array');
  expect(() => Ship(1, [])).toThrow('Second parameter must be a non-empty array');
});

it('detects if ship has sunken', () => {
  const testShip = Ship(1);

  expect(testShip.isSunk()).toBe(false);
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});