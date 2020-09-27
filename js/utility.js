// sleep function
// stop execution of every thing for (ms) of time
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

// function swap
// swap two element of an array
function swap(arr, i, j) {
  let t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
          return false;
      }
  }
  return true;
}

// data

const colors = {
  ideal: "rgba(51, 0, 255, .6)",
  swapped: "rgba(255, 0, 51, .6)",
  compared: "rgba(204, 0, 204, .6)",
  okay: "rgba(0, 151, 51, .6)",
  selected: "rgba(51, 0, 255, 1)"
};

const operations = {
  swap: "swap",
  compare: "compare",
  select: "select"
};

const description = {
  linearSearch: `Linear Search:
  Linear search is a very simple search algorithm.
  In this type of search, a sequential search is made over all items one by one.
  Every item is checked and if a match is found then that particular item is returned, otherwise the search continues till the end of the data collection.
  Complexity: O(n)`,

  binarySearch: `Binary Search:
  Binary Search Searches a sorted array by repeatedly dividing the search interval in half.
  Begin with an interval covering the whole array. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half.
  Otherwise narrow it to the upper half. Repeatedly check until the value is found or the interval is empty.
  Complexity: O(log n)`,

  insertionSort: `Insertion sort:
  Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands.
  The array is virtually split into a sorted and an unsorted part.
  Values from the unsorted part are picked and placed at the correct position in the sorted part.
  Complexity: O(n2)`,

  selectionSort: `Selection Sort:
  The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning.
  The algorithm maintains two subarrays in a given array.
  Complexity: O(n2)`,

  bubbleSort: `Bubble Sort:
  Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.
  Complexity: O(n2)`
};

const code = {
  bubbleSort: `function bubbleSort() {  
  for (i = 0; i < n; i++)
    for (j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1])
        swap(j, j + 1);
}`,

  insertionSort: `function insertionSort() {  
    for (i = 1; i < n; i++)
        for (j = i; j > 0; j--)
            if (arr[j] < arr[j - 1])
                swap(j, j - 1);
            else 
                break;
}`,

  selectionSort: `function selectionSort() {
  for (let i = 0; i < n - 1; i++) {
    min = i;
    for (j = i + 1; j < n; j++)
      if (arr[j] < arr[min])
        min = j;
    swap(i, min);
  }
}`,

  linearSearch: `function linearSearch(key) {
  for (i = 0; i < n; i++)
    if (arr[i] == key)
      return i;
}`,

  binarySearch: `function binarySearch(key) {
    while (left <= right) {
        if (arr[middle] == key)    
            return middle;
        else if (arr[middle] < key)
            left = middle + 1;
        else
            right = middle - 1;
  }
}`
};
