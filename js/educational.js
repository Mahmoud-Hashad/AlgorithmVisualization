let board = new Visualization("mainCanvas", 10, 1.8);

function start() {
  // get the selected algorithm name
  let algoMenu = document.getElementById("algorithms");
  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  // change the code innerHTML with the algorithm code
  document.getElementById("code").innerHTML = code[algorithm]["ideal"];

  board.animate(eval(algorithm), true, code[algorithm]);
  // change the description to the algorithm description
  document.getElementById("desc").innerHTML = description[algorithm];
}

function stop() {
  board.running = false;
}
