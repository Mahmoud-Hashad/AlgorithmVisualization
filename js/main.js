let startbtn = document.getElementById("startbtn");
let algoMenu = document.getElementById("algorithms");
let canvas = document.getElementById("mainCanvas");
let stats = document.getElementById("boardStats");

let board = new Visualization(canvas, 20, 0.5, stats);
board.change(board.getRandArray());

async function start() {
  board.running = true;
  startbtn.disabled = true;

  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  board.state = {i: 1, instructions: eval(algorithm)(board.toArray()), nSwaps: 0, nCompares: 0};
  board.stats.innerHTML = `${board.state.instructions[0].message}\nCompares: 0, Swaps: 0`;
      
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

function change() {
    stop();
    startbtn.disabled = false;
}
