class Visualization {
  constructor(canvas, size, time, stats) {
    // store canvas and its properties
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.stats = stats;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.time = time * 1000; // time for the animation
    this.margin = 5; // space between the columns
    this.numArea = 20; // the total space to write value of each column

    // make calculations from size
    this.size = size;
    this.columnWidth = Math.round(this.canvasWidth / this.size);
    this.columHeightUnit = Math.floor(
      (this.canvasHeight - this.numArea) / (this.size * 3)
    );

    // initialize array
    this.array = [];
    for (let i = 0; i < this.size; i++) {
      this.array[i] = {
        value: 0,
        x: this.columnWidth * i,
        color: colors.ideal
      };
    }

    // keep track of board state
    this.state = { i: 1, instructions: [], nSwaps: 0, nCompares: 0 };
    this.running = false;
  }

  getRandArray() {
    let localArray = [];
    for (let i = 0; i < this.size; i++) {
      localArray[i] = Math.floor(
        Math.random() *
          ((this.canvasHeight - this.numArea) / this.columHeightUnit - 1) +
          1
      );
    }
    return localArray;
  }

  async change(arr) {
    // animate the change
    let flag = false;
    do {
      flag = false;
      for (let i = 0; i < this.size; i++) {
        if (arr[i] != this.array[i].value) {
          flag = true;
          if (arr[i] > this.array[i].value) {
            this.array[i].value++;
          } else {
            this.array[i].value--;
          }
        }
      }

      this.draw();
      await sleep(10);
    } while (flag == true);
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
    let end = this.array[j].x;
    let distance = this.array[j].x - this.array[i].x;
    let step = Math.ceil((distance * 4) / this.time);

    // color the swapped indices
    this.array[i].color = colors.swapped;
    this.array[j].color = colors.swapped;

    // animate the swap
    while (true) {
      // if swap is finished
      if (this.array[j].x <= start) {
        // swap them in array
        let temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;

        // restore color
        this.array[i].color = colors.ideal;
        this.array[j].color = colors.ideal;

        // end animation
        this.draw();
        break;
      }

      // move each col 1 step at a time
      if (this.array[j].x - start > step) {
        this.array[i].x += step;
        this.array[j].x -= step;
      } else {
        this.array[i].x = end;
        this.array[j].x = start;
      }

      // draw the update
      this.draw();
      await sleep(this.time / distance);
    }
  }

  // animate the compare
  async compareAnimation(i, j) {
    // check that i is the left col
    if (i > j) {
      let t = i;
      i = j;
      j = t;
    }

    // color the compared indices
    this.array[i].color = colors.compared;
    this.array[j].color = colors.compared;

    // draw the update
    this.draw();
    await sleep((2 * this.time) / 3);

    // see compare results
    if (this.at(i) <= this.at(j)) {
      this.array[i].color = colors.okay;
      this.array[j].color = colors.okay;
    } else {
      this.array[i].color = colors.swapped;
      this.array[j].color = colors.swapped;
    }

    // draw the updates
    this.draw();
    await sleep(this.time / 3);

    // restore everything
    this.array[i].color = colors.ideal;
    this.array[j].color = colors.ideal;
    this.draw();
  }

  async select(i, j) {
    // make sure all colors are default
    for (let x = 0; x < this.size; x++) {
      this.array[x].color = colors.ideal;
    }

    // color the indexed interval
    for (let x = i; x <= j && x >= 0; x++) {
      this.array[x].color = colors.selected;
    }

    // visualize
    this.draw();
    await sleep(this.time);
  }

  // animate an instruction
  // handles board
  async animate() {
    // if algorithm is finished
    if (this.state.i == this.state.instructions.length - 1) {
      this.stats.innerHTML = `${
        this.state.instructions[this.state.i].message
      }\nCompares: ${this.state.nCompares}, Swaps: ${this.state.nSwaps}`;
      return;
    }

    // if beyond
    if (this.state.i >= this.state.instructions.length) return;

    // animate the operation
    if (this.state.instructions[this.state.i].type == operations.swap) {
      await this.swapAnimation(
        this.state.instructions[this.state.i].left,
        this.state.instructions[this.state.i].right
      );
      this.state.nSwaps++;
        
    } else if (
      this.state.instructions[this.state.i].type == operations.compare
    ) {
      await this.compareAnimation(
        this.state.instructions[this.state.i].left,
        this.state.instructions[this.state.i].right
      );
      this.state.nCompares++;
        
    } else if (this.state.instructions[this.state.i] == operations.select) {
      await this.select(
        this.state.instructions[this.state.i].left,
        this.state.instructions[this.state.i].right
      );
    }

    // update the board stats
    if (this.running == true)
      this.stats.innerHTML = `${
        this.state.instructions[0].message
      }\nCompares: ${this.state.nCompares}, Swaps: ${this.state.nSwaps}`;
  }

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

  /* ==== Helper Methods ==== */

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

  setTime(t) {
    this.time = t * 1000;
  }
}
