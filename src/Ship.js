function Ship(length) {
  if (!(typeof length == 'number')) throw new Error('Non-number passed as parameter Ship Factory');
  if (length < 1 || length > 4) throw new Error('Length must be between 1 and 4');

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
    hit,
    isSunk
  };
}

module.exports = Ship;