const Ship = require("./Ship");

function Board() {
  // change coordinates variable to ships.
  // ships will hold objects who records direction, length and coordinates
  // makes removal of ships easy and easy tracking of them
  const coordinates = {};
  const hitCoordinates = {};
  let shipCount = 0;
  let hits = 0;

  function placeShip(coord, length) {
    // takes cord, length and direction params
    // checks if coord and all coords in direction are are avaliable and in bounds, if not, return false
    // create Ship object
    // same Ship object on all coords
    // adds Ship to ships property
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