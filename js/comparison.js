let board1 = new Visualization("mainCanvas", 20, 0.5, "boardStats1");
let board2 = new Visualization("secondCanvas", 20, 0.5, "boardStats2");

function start() {
  let algoMenu1 = document.getElementById("algorithms1");
  let algorithm1 = algoMenu1.options[algoMenu1.selectedIndex].value;

  let algoMenu2 = document.getElementById("algorithms2");
  let algorithm2 = algoMenu2.options[algoMenu2.selectedIndex].value;
  board1.animate(eval(algorithm1));
  board2.animate(eval(algorithm2));
}

function stop() {
  board1.running = false;
  board2.running = false;
}
