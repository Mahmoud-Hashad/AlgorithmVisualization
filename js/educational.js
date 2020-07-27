let board = new Visualization("mainCanvas", 10, 1.8);
let algorithm = null;
function start() {
  let algoMenu = document.getElementById("algorithms");
  algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  document.getElementById("code").innerHTML = code[algorithm]["ideal"];
  board.animate(eval(algorithm), true, code[algorithm]);
}

function stop() {
  board.running = false;
}
