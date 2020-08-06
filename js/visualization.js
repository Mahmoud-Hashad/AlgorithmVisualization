class Visualization {
  constructor(canvasId, size, time, boardStatId) {
    // store canvas and its context
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.stats = document.getElementById(boardStatId);

    // save canvas width and height and calc column width
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.columnWidth = Math.round(this.canvasWidth / size);

    this.time = time; // time for the animation
    this.margin = 5; // space between the columns
    this.numArea = 20; // the total space to write value of each column

    // value of each column related to count of the columns
    this.scale = 3;

    // each 1 in colum value = height px
    this.columHeightUnit =
      (this.canvasHeight - this.columnWidth) / (size * this.scale);

    // define global colors
    this.colors = {
      ideal: "rgba(51, 0, 255, .6)",
      swapped: "rgba(255, 0, 51, .6)",
      compared: "rgba(204, 0, 204, .6)",
      okay: "rgba(0, 151, 51, .6)",
      selected: "rgba(51, 0, 255, 1)",
    };

    // create the array
    this.array = [];
    this.resize(size);

    this.running = false;
  }
  initializeArray() {
    for (let i = 0; i < this.size; i++) {
      this.array[i] = {
        value: 0,
        x: this.columnWidth * i,
        color: this.colors.ideal,
      };
    }
  }
  async randomize() {
    // stop any running function from continuing
    if (this.running == true) {
      this.running = false;
      await sleep(this.time * 1100);
    }
    document.getElementById("rand").disabled = true;
    let localArray = [];
    // start a new visualization with random numbers
    for (let i = 0; i < this.size; i++) {
      localArray[i] = Math.floor(
        1 + Math.random() * (this.size * this.scale - 2)
      );
      this.array.x = this.columnWidth * i;
      this.array.color = this.colors.ideal;
    }

    let flag = false;
    do {
      flag = false;
      for (let i = 0; i < this.size; i++) {
        if (localArray[i] != this.array[i].value) {
          flag = true;
          if (localArray[i] > this.array[i].value) {
            this.array[i].value++;
          } else {
            this.array[i].value--;
          }
        }
      }
      this.draw();
      await sleep(10);
    } while (flag == true);
    this.draw();
    document.getElementById("rand").disabled = false;
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
    this.initializeArray(s);
    this.randomize();
    this.draw();
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

  // animate the compare
  // this works as j supposed to be > i
  async compareAnimation(i, j) {
    // color the compared indices
    this.array[i].color = this.colors.compared;
    this.array[j].color = this.colors.compared;

    // draw the update
    this.draw();
    await sleep(this.time * 1000);

    // if the compare results doing nothing
    if (this.at(i) < this.at(j)) {
      this.array[i].color = this.colors.okay;
      this.array[j].color = this.colors.okay;

      // draw the updates
      this.draw();
      await sleep(this.time * 1000);
    }

    // restore everything
    this.array[i].color = this.colors.ideal;
    this.array[j].color = this.colors.ideal;
    this.draw();
  }

  async select(i, j) {
    for (let x = 0; x < this.size; x++) {
        this.array[x].color = this.colors.ideal;
    }
      
    for (let x = i; x <= j && x >= 0; x++) {
        this.array[x].color = this.colors.selected;
    }

    this.draw();
    await sleep(this.time * 500);
  }

  // animate the log instructions
  async animate(sortFunc, log, code_obj) {
    // stop any other function to start this one
    this.running = false;
    document.getElementById("startbtn").disabled = true;
    await sleep(1000);
    document.getElementById("startbtn").disabled = false;
    this.running = true;  
    
    // set up log and code if educational mode
    var logList = null;
    var code_c = null;
    if (log == true) {
      logList = document.getElementById("log-list");
      logList.innerHTML = "";
      code_c = document.getElementById("code");
    }
     
    // make sure colors are normal
    for (let x = 0; x < this.size; x++) {
        this.array[x].color = this.colors.ideal;
    }
      
    // variables to work with
    this.instructions = sortFunc(this.toArray());
    let nSwaps = 0;
    let nCompares = 0;
    let tempMessage = "";
      
    // update the board stats
    this.stats.innerHTML = `${this.instructions[0].message}\nCompares: ${nCompares}, Swaps: ${nSwaps}`;
      
    // iterate over every instruction / step
    for (let i = 1; i < this.instructions.length - 1 && this.running; i++) {        
      // update log and code  
      if (log == true) {
        logList.innerHTML += `<li class='${this.instructions[i].type}'> ${i + 1} - ${this.instructions[i].message} </li>`;
        logList.scrollTop = logList.scrollHeight;
        code_c.innerHTML = code_obj[this.instructions[i].type];
      }
        
      // animate the operation
      if (this.instructions[i].type == operations.swap) {
        await this.swapAnimation(
          this.instructions[i].left,
          this.instructions[i].right
        );
        nSwaps++;
      } else if (this.instructions[i].type == operations.compare) {
        await this.compareAnimation(
          this.instructions[i].left,
          this.instructions[i].right
        );
        nCompares++;
      } else if (this.instructions[i].type == operations.select) {
        await this.select(
          this.instructions[i].left,
          this.instructions[i].right
        );
      }
    }

    // stats and code final update
    this.stats.innerHTML = `${this.instructions[this.instructions.length - 1].message}\nCompares: ${nCompares}, Swaps: ${nSwaps}`;
    if (log == true) {
      code_c.innerHTML = code_obj.ideal;
    }
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
}
