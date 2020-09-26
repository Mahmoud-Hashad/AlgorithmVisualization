let canvas1 = document.getElementById("mainCanvas");
let canvas2 = document.getElementById("secondCanvas");
let stats1 = document.getElementById("boardStats1");
let stats2 = document.getElementById("boardStats2");
let startbtn = document.getElementById("startbtn");

let board1 = new Visualization(canvas1, 30, 0.05, stats1, null);
let board2 = new Visualization(canvas2, 30, 0.05, stats2, board1);
let arr = board1.getRandArray();
board1.change(arr);
board2.change(arr);

async function start() {
  board1.running = true;
  board2.running = true;
  startbtn.disabled = true;
    
  let algoMenu1 = document.getElementById("algorithms1");
  let algorithm1 = algoMenu1.options[algoMenu1.selectedIndex].value;
  board1.state = {i: 1, instructions: eval(algorithm1)(board1.toArray()), nSwaps: 0, nCompares: 0};
  board1.stats.innerHTML = `${board1.state.instructions[0].message}\nCompares: 0, Swaps: 0`;

  let algoMenu2 = document.getElementById("algorithms2");
  let algorithm2 = algoMenu2.options[algoMenu2.selectedIndex].value;
  board2.state = {i: 1, instructions: eval(algorithm2)(board2.toArray()), nSwaps: 0, nCompares: 0};
  board2.stats.innerHTML = `${board2.state.instructions[0].message}\nCompares: 0, Swaps: 0`;
    
  // make the animation
  animateFirst();
  animateSecond();
    
  startbtn.disabled = false;
}

function stop() {
  board1.running = false;
  board2.running = false;
  board1.stats.innerHTML = "";
  board2.stats.innerHTML = "";
}

function change() {
    stop();
    startbtn.disabled = false;
}

async function animateFirst() {
    while (board1.running && board1.state.i < board1.state.instructions.length) {        
        await board1.animate();
        board1.state.i++;
  }
}

async function animateSecond() {
    while (board2.running && board2.state.i < board2.state.instructions.length) {        
        await board2.animate();
        board2.state.i++;
  }
}