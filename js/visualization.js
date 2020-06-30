class Visualization {
  constructor(canvasId, size, time) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.columnWidth = Math.round(this.canvasWidth / this.size);

    this.time = time;
    this.margin = 1;
    this.colors = {
      ideal: "rgba(51, 0, 255, .6)",
      swapped: "rgba(255, 0, 51, .6)",
    };

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

  async swap(i, j) {
    // check that i is the left col
    if (i > j) {
      let t = i;
      i = j;
      j = t;
    }

    // save the starting point and distance
    let start = this.array[i].x;
    let distance = this.array[j].x - this.array[i].x;
    // color the swaped indeces
    this.array[i].color = this.colors.swaped;
    this.array[j].color = this.colors.swaped;

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
