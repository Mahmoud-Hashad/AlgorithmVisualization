// get document elements
let randbtn = document.getElementById("randBtn");
let algoMenu = document.getElementById("algorithms");
let startbtn = document.getElementById("startBtn");
let stopbtn = document.getElementById("stopBtn");
let animationTime = document.getElementById("animationTime");
let timeValue = document.getElementById("timeValue");
let canvas = document.getElementById("mainCanvas");
let stats = document.getElementById("boardStats");

// generate board
let board = new Visualization(canvas, 20, 0.5, stats);
board.change(board.getRandArray());

// main functions

async function start() {
  board.running = true;
  startbtn.disabled = true;

  // set up state and stats
  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  board.state = {
    i: 1,
    instructions: eval(algorithm)(board.toArray()),
    nSwaps: 0,
    nCompares: 0
  };
  board.stats.innerHTML = `${
    board.state.instructions[0].message
  }\nCompares: 0, Swaps: 0`;

  // make the animation
  while (board.running && board.state.i < board.state.instructions.length) {
    await board.animate();
    board.state.i++;
  }

  startbtn.disabled = false;
}

function stop() {
  board.running = false;
  board.stats.innerHTML = "";
}

// handle click events

randbtn.onclick = async function() {
  stop();
    
  randbtn.disabled = true;
  startbtn.disabled = true;
  await board.change(board.getRandArray());
  randbtn.disabled = false;
  startbtn.disabled = false;
};

algoMenu.onchange = function() {
  stop();
  startbtn.disabled = false;
};

startbtn.onclick = start;

stopbtn.onclick = stop;

animationTime.onchange = function() {
  board.setTime(animationTime.value);
  timeValue.innerHTML = animationTime.value;
};
