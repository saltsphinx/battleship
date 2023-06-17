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

it('returns false if coordinate is marked', () => {
  testBoard.receiveAttack('4,5');

  expect(testBoard.receiveAttack('4,5')).toBe(false);
});

it('returns "miss" if ship isn\'t at coordinate', () => {
  expect(testBoard.receiveAttack('4,5')).toBe('miss');
});

it('returns "hit" if ship is at coordinate', () => {
  testBoard.placeShip('0,0', 1, 'right');

  expect(testBoard.receiveAttack('0,0')).toBe('hit');
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
  expect(testBoard.allSunken()).toBe(false);

  testBoard.receiveAttack(coord);

  expect(testBoard.allSunken()).toBe(true);
});

it('generates and returns coordinates in a given direction', () => {
  const coord = '4,5';
  const length = 3;
  const direction = 'right';
  const expectedArray = ['4,5', '5,5', '6,5']

  expect(testBoard.generateCoordinates(coord, length, direction)).toEqual(expectedArray);
});

it('returns false if coordinate is out of bounds', () => {
  const coord = '9,0';
  const length = 2;
  const direction = 'right';

  expect(testBoard.generateCoordinates(coord, length, direction)).toBe(false);
});

it('returns false if coordinate is taken', () => {
  const coord = '0,0';
  const length = 1;
  const direction = 'right';

  testBoard.coordinates['0,0'] = true;

  expect(testBoard.generateCoordinates(coord, length, direction)).toBe(false);
});