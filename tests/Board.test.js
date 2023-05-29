const Board = require('../src/Board');
let testBoard;

beforeEach(() => {
  testBoard = Board();
});

it('returns object with coordinates property who has 100 properties', () => {
  expect(testBoard).toHaveProperty('coordinates', {});
  expect(Object.keys(testBoard.coordinates).length).toBe(100);
});

it('places ship at specific coordinate', () => {
  const coord = '4,5';
  testBoard.placeShip(coord, 1);

  expect(testBoard.coordinates[coord]).toBeTruthy();
});

it('returns false if corodinate is taken', () => {
  testBoard.placeShip('4,5', 1);

  expect(testBoard.placeShip('4,5', 1)).toBe(false);
});

it('requires parameters for placeShip', () => {
  expect(() => testBoard.placeShip()).toThrow();
});

it('returns false if ship isn\'t at coordinate', () => {
  expect(testBoard.receiveAttack('4,5')).toBe(false);
});

it('marks a coordinate as being hit', () => {
  const coord = '4,5';
  testBoard.placeShip(coord, 1);
  testBoard.receiveAttack(coord);

  expect(testBoard.hitCoordinates).toHaveProperty(coord);
});

it('reports if all ships are sunken', () => {
  const coord = '4,5';
  testBoard.placeShip(coord, 1);
  testBoard.receiveAttack(coord);

  expect(testBoard.allSunken()).toBe(true);
});