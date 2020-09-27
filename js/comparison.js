// document elements
let randbtn = document.getElementById("randBtn");
let startbtn = document.getElementById("startBtn");
let stopbtn = document.getElementById("stopBtn");
let algoMenu1 = document.getElementById("algorithms1");
let algoMenu2 = document.getElementById("algorithms2");
let canvas1 = document.getElementById("mainCanvas");
let canvas2 = document.getElementById("secondCanvas");
let stats1 = document.getElementById("boardStats1");
let stats2 = document.getElementById("boardStats2");

// additional vars
let changed1 = false;
let changed2 = false;

// generate boards
let board1 = new Visualization(canvas1, 30, 0.05, stats1);
let board2 = new Visualization(canvas2, 30, 0.05, stats2);
let arr = board1.getRandArray();
board1.change(arr);
board2.change(arr);

// main functions

async function animateBoard(board) {
  while (board.running && board.state.i < board.state.instructions.length) {
    await board.animate();
    board.state.i++;
  }
}

async function start() {
  board1.running = true;
  board2.running = true;
  startbtn.disabled = true;

  // set up state and stats for board1
  let algorithm1 = algoMenu1.options[algoMenu1.selectedIndex].value;
  board1.state = {
    i: 1,
    instructions: eval(algorithm1)(board1.toArray()),
    nSwaps: 0,
    nCompares: 0
  };
  board1.stats.innerHTML = `${
    board1.state.instructions[0].message
  }\nCompares: 0, Swaps: 0`;

  // set up state and stats for board2
  let algorithm2 = algoMenu2.options[algoMenu2.selectedIndex].value;
  board2.state = {
    i: 1,
    instructions: eval(algorithm2)(board2.toArray()),
    nSwaps: 0,
    nCompares: 0
  };
  board2.stats.innerHTML = `${
    board2.state.instructions[0].message
  }\nCompares: 0, Swaps: 0`;

  // make the animation
  animateBoard(board1);
  animateBoard(board2);

  startbtn.disabled = false;
}

function stop() {
  board1.running = false;
  board2.running = false;
  board1.stats.innerHTML = "";
  board2.stats.innerHTML = "";
}

// handle click events

randbtn.onclick = async function() {
  stop();
  randbtn.disabled = true;
  startbtn.disabled = true;
    
  let arr = board1.getRandArray();
  board1.change(arr);
  await board2.change(arr);
    
  randbtn.disabled = false;
  startbtn.disabled = false;
};

algoMenu1.onchange = function() {
  stop();
  changed1 = true;
  if (changed1 && changed2) startbtn.disabled = false;
};

algoMenu2.onchange = function() {
  stop();
  changed2 = true;
  if (changed1 && changed2) startbtn.disabled = false;
};

startbtn.onclick = start;

stopbtn.onclick = stop;
