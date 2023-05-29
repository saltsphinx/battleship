const Board = require('../src/Board');
let testBoard;

beforeEach(() => {
  testBoard = Board();
});

it('returns object with coordinates property who has 100 properties', () => {
  expect(testBoard).toHaveProperty('coordinates', {});
  expect(Object.keys(testBoard.coordinates).length).toBe(100);
});

it('returns object with hit coordinates property', () => {
  expect(testBoard).toHaveProperty('hitCoordinates', {});
});

it('places ship at specific coordinate', () => {
  const coord = '4,5';
  testBoard.placeShip(coord, 1);

  expect(testBoard.coordinates[coord]).toBeTruthy();
});

it('returns false if corodinate is taken', () => {
  testBoard.placeShip('4,5', 1);
});

it('requires parameters for placeShip', () => {
  expect(() => testBoard.placeShip()).toThrow();
});