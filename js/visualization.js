class Visualization {
  constructor(canvasId, size, speed) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.columnWidth = Math.round(this.canvasWidth / this.size);

    this.speed = speed;
    this.margin = 1;
    this.colors = {
      ideal: "rgba(51, 0, 255, .6)",
    };

    this.oldIX = 0;

    this.array = [];
    this.resize(size);
  }

  randomize() {
    // start a new visualization with random numbers
    for (let i = 0; i < this.size; i++) {
      this.array[i] = {
        // value between 4 and canvas height
        value: 4 + Math.floor(Math.random() * (this.canvasHeight - 4)),
        x: this.columnWidth * i,
        color: this.colors.ideal,
      };
    }
  }

  at(index) {
    return this.array[index].value;
  }

  resize(s) {
    // change the size and start a new visual.
    this.size = s;
    this.columnWidth = this.canvasWidth / this.size;
    this.randomize();
  }

  setSpeed(s) {
    this.speed = s;
  }

  swap(i, j) {
    // color the two indeces
    this.array[i].color = "red";
    this.array[j].color = "red";

    // animate the swap
    this.oldIX = this.array[i].x;
    let dest = this.array[i].x - this.myArray[j].x;
    this.swapAnimation(i, j);

    // swap them
    let temp = this.array[i];
    this.array[i] = this.aArray[j];
    this.aArray[j] = temp;

    // restore color
    this.array[i].color = "blue";
    this.array[j].color = "blue";
  }

  swapAnimation(i, j, dest) {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.array[j].x == this.oldIX) {
      this.draw();
      return;
    }

    this.array[i].x += dest / this.time;
    this.array[j].x -= dest / this.time;

    this.draw();
    requestAnimationFrame(swapAnimation);
  }

  compare(i, j) {
    if (this.at(i) > this.at(j)) return 1;
    if (this.at(i) < this.at(j)) return -1;
    return 0;
  }

  select(i) {}

  draw() {
    // clear canvas content
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // remaps the (0,0) position to the bottom left
    this.ctx.translate(0, this.canvasHeight);

    for (let i = 0; i < this.size; i++) {
      // draw every column
      this.ctx.beginPath();
      this.ctx.rect(
        this.margin + this.array[i].x,
        0,
        this.columnWidth - this.margin * 2,
        -this.at(i)
      );
      this.ctx.fillStyle = this.array[i].color;
      this.ctx.fill();
    }

    // remaps the (0,0) position to the top left
    this.ctx.translate(0, -this.canvasHeight);
  }
}
