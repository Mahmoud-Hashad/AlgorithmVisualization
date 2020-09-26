let canvas = document.getElementById("mainCanvas");
let controls = document.getElementById("controls");
let algoMenu = document.getElementById("algorithms");
let logList = document.getElementById("log-list");
let code_c = document.getElementById("code");
let desc = document.getElementById("desc");
let btns = controls.getElementsByTagName('*');
let stats = document.getElementById("boardStats");
let startbtn = document.getElementById("startbtn");

let board = new Visualization(canvas, 10, 0.6, stats, null);
board.change(board.getRandArray());

function start() {
  let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
  board.state = {i: 1, instructions: eval(algorithm)(board.toArray()), nSwaps: 0, nCompares: 0};
    
  // default display
  logList.innerHTML = board.state.instructions[0].message + "<br>";
  code_c.innerHTML = code[algorithm];
  desc.innerHTML = description[algorithm];
  board.stats.innerHTML = `${board.state.instructions[0].message}\nCompares: 0, Swaps: 0`;
  controls.style.display = "inline";
}

function stop() {
    board.stats.innerHTML = "";
    board.running = false;
    controls.style.display = "none";
}

function change() {
    stop();
    let algorithm = algoMenu.options[algoMenu.selectedIndex].value;
    logList.innerHTML = "";
    code_c.innerHTML = code[algorithm];
    desc.innerHTML = description[algorithm];
    startbtn.disabled = false;
}

async function playpause() {
    // handle play vs pause
    if (board.running)
        btns[0].innerHTML = "&#9654;";
    else
        btns[0].innerHTML = "<b>||</b>";
    board.running = !board.running;
    
    while (board.running && board.state.i < board.state.instructions.length) {
        // if finished
        if (board.state.i == board.state.instructions.length - 1) {
            logList.innerHTML += `${board.state.instructions[board.state.i].message}`;
            logList.scrollTop = logList.scrollHeight;
        }
        
        else {
            // update logs
            logList.innerHTML += `<li class='${board.state.instructions[board.state.i].type}'> ${board.state.i} - ${board.state.instructions[board.state.i].message}</li>`;
            logList.scrollTop = logList.scrollHeight; 

            await board.animate();
        }
        board.state.i++;
    }
}

async function forward() {
    // disable buttons
    for (let i = 0; i < btns.length; i++)
        btns[i].disabled = true;
    
    if (board.running)
        board.running = false;
    
    else if (board.state.i < board.state.instructions.length) {
        // if finished
        if (board.state.i == board.state.instructions.length - 1) {
            logList.innerHTML += `${board.state.instructions[board.state.i].message}`;
            logList.scrollTop = logList.scrollHeight;
        }
        else {
            // update logs
            logList.innerHTML += `<li class='${board.state.instructions[board.state.i].type}'> ${board.state.i} - ${board.state.instructions[board.state.i].message}</li>`;
            logList.scrollTop = logList.scrollHeight;

            await board.animate();
        }
            board.state.i++;
    }
    
    // re enable 
    for (let i = 0; i < btns.length; i++)
        btns[i].disabled = false;
}
