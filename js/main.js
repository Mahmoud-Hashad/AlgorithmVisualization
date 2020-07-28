let board = new Visualization("mainCanvas", 20, 1, "boardStats");

function start() {
  let algoMenu = document.getElementById("algorithms");
  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  board.animate(eval(algorithm));
}

function stop() {
  board.running = false;
}
