const Ship = require("./Ship");

function Board() {
  const coordinates = {};
  const hitCoordinates = {};
  const ships = {};
  let shipCount = 0;
  let hits = 0;

  function placeShip(coord, length, direction) {
    const coords = generateCoordinates(coord, length, direction);
    if (!coords) return false;

    const ship = Ship(length, coords, direction);
    coords.forEach(coord => coordinates[coord] = ship);

    ships[coord] = ship;
    shipCount += length;
  }

  function receiveAttack(coord) {
    if (!(typeof coord == 'string')) throw new Error('parameter must be a string');
    if (hitCoordinates[coord]) return false;
    hitCoordinates[coord] = true;

    const spot = coordinates[coord];
    if (spot) {
      spot.hit()
      hits++;
      return 'hit';
    }
    else {
      return 'miss';
    }
  }

  function allSunken() {
    return hits >= shipCount;
  }

  function generateCoordinates(coord, length, direction) {
    if (coordinates[coord]) return false;

    const coords = [coord];
    const coordArr = coord.split(',').map(str => +str);
    const i = direction == 'right' ? 1 : 0;

    for (let n = 0; n < length - 1; n++) {
      coordArr[i] = coordArr[i] + 1;
      if (coordinates[coordArr]) return false;
      if (coordArr[0] < 0 || coordArr[0] > 9 || coordArr[1] < 0 || coordArr[1] > 9) return false;

      coords.push(Array.from(coordArr).toString());
    }

    return coords;
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      coordinates[`${i},${j}`] = undefined;
    }
  }

  return {
    ships,
    coordinates,
    hitCoordinates,
    placeShip,
    receiveAttack,
    allSunken,
    generateCoordinates,
  }
}

module.exports = Board;