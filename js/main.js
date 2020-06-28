var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let board = new Visualization(ctx, 10, 2);
board.draw();
