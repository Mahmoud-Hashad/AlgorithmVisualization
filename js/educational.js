// get document elements
let randbtn = document.getElementById("randBtn");
let algoMenu = document.getElementById("algorithmsMenu");
let startbtn = document.getElementById("startBtn");
let stopbtn = document.getElementById("stopBtn");
let canvas = document.getElementById("mainCanvas");
let stats = document.getElementById("boardStats");
let controls = document.getElementById("eduControls");
let playpausebtn = document.getElementById("playPauseBtn");
let forwardbtn = document.getElementById("forwardBtn");
let logList = document.getElementById("logList");
let code_c = document.getElementById("code");
let desc = document.getElementById("desc");

// generate board
let board = new Visualization(canvas, 10, 0.6, stats);
board.change(board.getRandArray());

// main functions
function start() {
  // set up board state
  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  board.state = {
    i: 1,
    instructions: eval(algorithm)(board.toArray()),
    nSwaps: 0,
    nCompares: 0
  };

  // default display
  logList.innerHTML = board.state.instructions[0].message + "<br>";
  board.stats.innerHTML = `${
    board.state.instructions[0].message
  }\nCompares: 0, Swaps: 0`;
  playpausebtn.innerHTML = "&#9654;";
  controls.style.display = "flex";
}

function stop() {
  board.stats.innerHTML = "";
  board.running = false;
  controls.style.display = "none";
}

function change() {
  stop();

  // update algorithm related
  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  logList.innerHTML = "";
  code_c.innerHTML = code[algorithm];
  desc.innerHTML = description[algorithm];

  startbtn.disabled = false;
}

async function animateStep() {
  // handle logs
  if (board.state.i == board.state.instructions.length - 1) {
    // if finished
    logList.innerHTML += `${board.state.instructions[board.state.i].message}`;
    logList.scrollTop = logList.scrollHeight;
  } else {
    // add current action
    logList.innerHTML += `<li class='${
      board.state.instructions[board.state.i].type
    }'> ${board.state.i} - ${
      board.state.instructions[board.state.i].message
    }</li>`;
    logList.scrollTop = logList.scrollHeight;
  }

  await board.animate();
  board.state.i++;
}

async function playpause() {
  // handle play vs pause
  if (board.running) playpausebtn.innerHTML = "&#9654;";
  else playpausebtn.innerHTML = "<b>||</b>";
  board.running = !board.running;

  while (board.running && board.state.i < board.state.instructions.length) {
    await animateStep();
  }
}

async function forward() {
  // disable buttons
  playpausebtn.disabled = true;
  forwardbtn.disabled = true;

  if (board.running) {
    playpausebtn.innerHTML = "&#9654;";
    board.running = false;
  } else if (board.state.i < board.state.instructions.length) {
    await animateStep();
  }

  // re enable
  playpausebtn.disabled = false;
  forwardbtn.disabled = false;
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

algoMenu.onchange = change;

startbtn.onclick = start;

stopbtn.onclick = stop;

playpausebtn.onclick = playpause;

forwardbtn.onclick = forward;
