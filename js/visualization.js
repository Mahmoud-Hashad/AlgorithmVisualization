class Visualization {
  constructor(canvasId, size, time) {
    // store canvas and its context
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    // save canvas width and height and calc column width
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.columnWidth = Math.round(this.canvasWidth / size);

    this.time = time; // time for the animation
    this.margin = 5; // space between the columns
    this.numArea = 20; // the total space to wite value of each column

    // value of each column related to count of the columns
    this.scale = 3;

    // each 1 in colum value = height px
    this.columHeightUnit =
      (this.canvasHeight - this.columnWidth) / (size * this.scale);

    // define global colors
    this.colors = {
      ideal: "rgba(51, 0, 255, .6)",
      swapped: "rgba(255, 0, 51, .6)",
    };

    // create the array
    this.array = [];
    this.resize(size);
  }

  randomize() {
    // start a new visualization with random numbers
    for (let i = 0; i < this.size; i++) {
      this.array[i] = {
        // random value [1, size * scale - 2]
        value: Math.floor(1 + Math.random() * (this.size * this.scale - 2)),
        x: this.columnWidth * i,
        color: this.colors.ideal,
      };
    }
  }

  at(index) {
    return this.array[index].value;
  }

  // a method to turn the object array into a numeric array
  toArray() {
    let array = [];
    for (let i = 0; i < this.size; i++) {
      array[i] = this.array[i].value;
    }
    return array;
  }

  resize(s) {
    // change the size and start a new visual.
    this.size = s;
    this.columnWidth = this.canvasWidth / this.size;
    this.randomize();
    this.draw(); // mosa: add this to restart canvas after changing the size
  }

  setTime(s) {
    this.time = s;
  }

  async swapAnimation(i, j) {
    // check that i is the left col
    if (i > j) {
      let t = i;
      i = j;
      j = t;
    }

    // save the starting point and distance
    let start = this.array[i].x;
    let distance = this.array[j].x - this.array[i].x;
    // color the swapped indices
    this.array[i].color = this.colors.swapped;
    this.array[j].color = this.colors.swapped;

    // animate the swap

    // if swap is finished
    while (true) {
      if (this.array[j].x <= start) {
        // swap them in array
        let temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;

        // restore color
        this.array[i].color = this.colors.ideal;
        this.array[j].color = this.colors.ideal;

        // end animation
        this.draw();
        return;
      }

      // move each col 1 pixel at a time
      this.array[i].x += 1;
      this.array[j].x -= 1;

      // draw the update
      this.draw();
      await sleep((this.time / distance) * 1000);
    }
  }

  // animate the sort
  async animate(sortFunc) {
    this.instructions = sortFunc(this.toArray());

    for (let i = 0; i < this.instructions.length; i++) {
      if (this.instructions[i].type == operations.swap) {
        await this.swapAnimation(
          this.instructions[i].left,
          this.instructions[i].right
        );
      }
    }
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
      drawColumn(
        this.ctx,
        this.margin + this.array[i].x,
        -this.numArea,
        this.columnWidth - this.margin,
        -this.at(i) * this.columHeightUnit,
        3,
        this.at(i),
        this.array[i].color
      );
    }

    // remaps the (0,0) position to the top left
    this.ctx.translate(0, -this.canvasHeight);
  }
}
