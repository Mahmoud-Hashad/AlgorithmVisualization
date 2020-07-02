// sleep function
// stop execution of every thing for (ms) of time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// define global operations
const operations = {
  swap: "swap",
  compare: "compare",
  slect: "select",
};

// function swap
// swap two element of an array
function swap(arr, i, j) {
  let t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

// function to change animation time
function changeAnimTime(board) {
  // select the range element and get its value
  rangeValue = document.getElementById("animationTime").value;

  // change board animation time
  board.setTime(rangeValue);

  // timeValue element to match the new value of time
  document.getElementById("timeValue").innerText = rangeValue;
}

// round rect
// from: https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
// note: modify some signs of the height to work with the negative
// change fill form bool to the color value
function drawColumn(ctx, x, y, width, height, radius, value, fill, stroke) {
  // validate the parameters
  if (typeof stroke === "undefined") {
    stroke = false;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  // fill with color if exist

  // start the shape of the rect
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y); // start a the x position
  // bottom side
  ctx.lineTo(x + width - radius.tr, y);
  //  right bottom corner
  ctx.quadraticCurveTo(x + width, y, x + width, y - radius.tr);
  // right side
  ctx.lineTo(x + width, y + height + radius.br);
  // top right corner
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  // top side
  ctx.lineTo(x + radius.bl, y + height);
  // top left corner
  ctx.quadraticCurveTo(x, y + height, x, y + height + radius.bl);
  // left size
  ctx.lineTo(x, y - radius.tl);
  // bottom left corner
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.font = "14px Arial";
  ctx.textAlign = "center";

  ctx.fillText(value, width / 2 + x, y + 18);

  // draw stroke if exist
  if (stroke) {
    ctx.stroke();
  }
}
