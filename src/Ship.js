function Ship(length, coords, direction) {
  if (!(typeof length == 'number')) throw new Error('Non-number passed as parameter Ship Factory');
  if (length < 1 || length > 5) throw new Error('Length must be between 1 and 5');
  if (!Array.isArray(coords) || coords.length == 0) throw new Error('Second parameter must be a non-empty array');

  let hits = 0;

  const hit = function hit() {
    this.hits++;
  };

  const isSunk = function isSunk() {
    return this.hits >= this.length;
  };

  return {
    length,
    hits,
    coords,
    direction,
    hit,
    isSunk
  };
}

module.exports = Ship;