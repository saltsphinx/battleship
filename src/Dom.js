const gridDivs = [document.querySelector('.player-grid'), document.querySelector('.ai-grid')];
const playerGrid = {};
const aiGrid = {};
const grids = [playerGrid, aiGrid];
const notifier = document.querySelector('.notifier');
let contNoti;
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
  if (contNoti) {
    contNoti(true);
    clearTimeout(timeoutId);
  }

  const continuePromise = new Promise((resolve) => contNoti = resolve);
  notifier.textContent = msg;

  notifier.classList.remove('hide')
  Promise.race([continuePromise, timeoutPromise(time)]).then((toContinue) => {
    if (!toContinue) notifier.classList.add('hide');
  });
}

function timeoutPromise(delay) {
  return new Promise((resolve) => {
    timeoutId = setTimeout(() => resolve(false), delay);
  })
}

function renderAttack(square, result) {
  switch (result) {
    case 'miss':
      hitNotifier('The attack missed');
      square.classList.add('miss');
      break;
    case 'hit':
      hitNotifier('The attack hit');
      square.classList.add('hit');
      break;
  }
}

function swapOpacity(other) {
  if (other == 'player') {
    gridDivs[0].classList.add('dim');
    gridDivs[1].classList.remove('dim');
  } else if (other == 'ai') {
    gridDivs[1].classList.add('dim');
    gridDivs[0].classList.remove('dim');
  } else {
    gridDivs[0].classList.remove('dim');
    gridDivs[1].classList.remove('dim');
  }
}

module.exports = {
  resetGrids,
  setupEnemy,
  hitNotifier,
  renderAttack,
  swapOpacity,
  playerGrid,
  aiGrid,
}