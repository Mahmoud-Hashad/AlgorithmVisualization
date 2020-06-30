let board = new Visualization("mainCanvas", 40, 1);
board.draw();
async function main() {
  await board.swap(20, 2);
  await board.swap(0, 1);
}

main();
