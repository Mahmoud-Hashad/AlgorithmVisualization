let board = new Visualization("mainCanvas", 10, 1.8, "boardStats");
let algoMenu = document.getElementById("algorithms");
let logList = document.getElementById("log-list");
let code_c = document.getElementById("code");
let desc = document.getElementById("desc");

function start() {
  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  logList.innerHTML = "";
  code_c.innerHTML = code[algorithm]["ideal"];
  desc.innerHTML = description[algorithm];
  board.animate(eval(algorithm), true, code[algorithm]);
}

function stop() {
  board.running = false;
}

function change() {
    let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
    logList.innerHTML = "";
    code_c.innerHTML = code[algorithm]["ideal"];
    desc.innerHTML = description[algorithm];
}
