const gridDivs = [document.querySelector('.player-grid'), document.querySelector('.ai-grid')];
const playerGrid = {};
const aiGrid = {};
const grids = [playerGrid, aiGrid];
const notifier = document.querySelector('.notifier');
let contNote;
let timeoutId;

function setupGrids() {
  for (let g = 0; g < 2; g++) {
    const gridDiv = gridDivs[g];
    const grid = grids[g];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const coord = [i, j].toString();
        const div = document.createElement('div');
        div.classList.add('grid-coordinate', coord);

        gridDiv.append(div);
        grid[coord] = div;
      }
    }
  }
}

function resetGrids() {
  gridDivs.forEach((grid) => {
    let firstChild = grid.firstChild;
    while (firstChild) {
      firstChild.remove();
      firstChild = grid.firstChild;
    }
  });

  setupGrids();
}

function setupEnemy(cb) {
  const ai = gridDivs[1];

  ai.addEventListener('click', cb);
}

function hitNotifier(msg, time = 6500) {
  if (contNote) {
    contNote(true);
    clearTimeout(timeoutId);
  }

  const continuePromise = new Promise((resolve) => contNote = resolve);
  notifier.textContent = msg;

  notifier.classList.remove('hide')
  Promise.race([continuePromise, timeoutPromise(time)]).then((toContinue) => {
    if (!toContinue) notifier.classList.add('hide');
  });
}

function timeoutPromise(delay) {
  return new Promise((resolve) => {
    timeoutId = setTimeout(() => resolve(false), delay)
  })
}

module.exports = {
  resetGrids,
  setupEnemy,
  hitNotifier,
  playerGrid,
  aiGrid,
}