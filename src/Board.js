const Ship = require("./Ship");

function Board() {
  const coordinates = {};
  const hitCoordinates = {};
  let shipCount = 0;
  let hits = 0;

  function placeShip(coord, length) {
    if(!(typeof coord == 'string') || !(typeof length == 'number')) throw new Error('Both parameters must be passed, string and number');
    if (coordinates[coord]) return false;

    coordinates[coord] = Ship(length);
    shipCount++;
  }

  function receiveAttack(coord) {
    if(!(typeof coord == 'string')) throw new Error('parameter must be a string');

    const spot = coordinates[coord];
    if (!spot) return false;

    spot.hit()
    hitCoordinates[coord] = true;
    hits++;
  }

  function allSunken() {
    return hits >= shipCount;
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      coordinates[`${i},${j}`] = undefined;
    }
  }

  return {
    coordinates,
    hitCoordinates,
    placeShip,
    receiveAttack,
    allSunken,
  }
}

module.exports = Board;