
class Visualization {
  constructor(ctx, size, speed) {
    // create all vars and start random array
    this.ctx = ctx;
    console.log(this.ctx);
    this.canvasWitdth = ctx.canvasWidth;
    this.canvasHeight = ctx.canvasHeight;
    this.myArray = [];
    this.size = size;
    this.speed = speed;
    this.columnWidth = this.canvasWitdth / this.size;
    this.normalColor = "blue";
    this.oldIX = 0;
    this.randomize();
  }

  randomize() {
    // start a new visualization with random numbers
    for (let i = 0; i < this.size; i++) {
      this.myArray[i] = {
        value: Math.floor(Math.random() * 10),
        x: 20 * i,
        color: this.normalColor,
      };
      console.log(this.myArray[i]);
    }
  }

  elem(index) {
    return this.myArray[index].value;
  }

  size(s) {
    // change the size and start a new visual.
    myArray.size = s;
    this.randomize();
  }

  setSpeed(s) {
    this.speed = s;
  }

  swap(i, j) {
    // color the two indeces
    this.myArray[i].color = "red";
    this.myArray[j].color = "red";

    // animate the swap
    this.oldIX = this.myArray[i].x;
    let dest = this.myArray[i].x - this.myArray[j].x;
    this.swapAnimation(i, j);

    // swap them
    let temp = this.myArray[i];
    this.myArray[i] = this.myArray[j];
    this.myArray[j] = temp;

    // restore color
    this.myArray[i].color = "blue";
    this.myArray[j].color = "blue";
  }

  swapAnimation(i, j, dest) {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.myArray[j].x == this.oldIX) {
      this.draw();
      return;
    }

    this.myArray[i].x += dest / this.time;
    this.myArray[j].x -= dest / this.time;

    this.draw();
    requestAnimationFrame(swapAnimation);
  }

  compare(i, j) {}

  select(i) {}

  draw() {
    this.ctx.translate(100, 100);

    for (let i = 0; i < this.size; i++) {
      console.log(i, this.myArray[i].value);
      this.ctx.rect(i * 20 + i * 3, 0, 20, this.myArray[i].value);
      this.ctx.fillStyle = this.myArray[i].color;
      this.ctx.fill();
    }
  }
}

var xvi = new Visualization(ctx, 20, 5);

xvi.draw();
