// sleep function
// make execution of every thing for (ms) of time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// define global operations
const operations = {
  swap: "swap",
  compare: "compare",
};

// function swap
// swap two element of an array
function swap(arr, i, j) {
  let t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

// animate the sort
async function animatedSort(sortFunc, board) {
  instructions = sortFunc(board.toArray());

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].type == operations.swap) {
      await board.swap(instructions[i].left, instructions[i].right);
    }
  }
}
