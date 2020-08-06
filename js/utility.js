// sleep function
// stop execution of every thing for (ms) of time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// define global operations
const operations = {
  swap: "swap",
  compare: "compare",
  select: "select",
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

let description = {
  linearSearch: `Linear Search:
  Linear search is a very simple search algorithm. In this type of search, a sequential search is made over all items one by one. Every item is checked and if a match is found then that particular item is returned, otherwise the search continues till the end of the data collection.
  Complexity: O(n)`,
  binarySearch: `Binary Search:
  Binary Search Searches a sorted array by repeatedly dividing the search interval in half. Begin with an interval covering the whole array. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise narrow it to the upper half. Repeatedly check until the value is found or the interval is empty.
  Complexity: O(log n)`,
  insertionSort: `Insertion sort:
  Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.
  Complexity: O(n2)`,
  selectionSort: `Selection Sort:
  The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.
  Complexity: O(n2)
  `,
  bubbleSort: `Bubble Sort:
  Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.
  Complexity: O(n2)`,
};

// code is object hold all the different code of each algorithm
// each algorithm have:
//  - ideal (required)
//  - swap
//  - compare
//  - select
let code = {
  bubbleSort: {
    ideal: `function bubbleSort(arr, n) {  
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n - i - 1; j++)
          if (arr[j] > arr[j + 1])
            swap(j, j + 1);
    }`,
    swap: `function bubbleSort(arr, n) {  
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n - i - 1; j++)
          if (arr[j] > arr[j + 1])
            <span class="swap">swap(j, j + 1);</span>
    }`,
    compare: `function bubbleSort(arr, n) {  
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n - i - 1; j++)
          <span class="compare">if (arr[j] > arr[j + 1])</span>
            swap(j, j + 1);
    }`,
  },
  insertionSort: {
    ideal: `function insertionSort(arr, n) {  
    for (let i = 1; i < n; i++)
      for (let j = i; j > 0; j--)
        if (arr[j] < arr[j - 1])
            swap(j, j - 1);
        else 
            break;
  }`,
    swap: `function insertionSort(arr, n) {  
    for (let i = 1; i < n; i++)
      for (let j = i; j > 0; j--)
        if (arr[j] < arr[j - 1])
            <span class="swap">swap(j, j - 1);</span>
        else 
            break;
  }`,
    compare: `function insertionSort(arr, n) {  
    for (let i = 1; i < n; i++)
      for (let j = i; j > 0; j--)
        <span class="compare">if (arr[j] < arr[j - 1])</span>
            swap(j, j - 1);
        else 
            break;
  }`,
  },
  selectionSort: {
    ideal: `function selectionSort(arr, n) {
      for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++)
          if (arr[j] < arr[min])
            min = j;
        swap(i, min);
      }
    }`,
    swap: `function selectionSort(arr, n) {
      for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++)
          if (arr[j] < arr[min])
            min = j;
        <span class="swap">swap(i, min)</span>;
      }
    }`,
    compare: `function selectionSort(arr, n) {
      for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++)
          <span class = "compare">if (arr[j] < arr[min])</span>
            min = j;
        swap(i, min);
      }
    }`,
    select: `function selectionSort(arr, n) {
      for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++)
          if (arr[j] < arr[min])
            <span class="select">min = j;</span>
        swap(i, min);
      }
    }`,
  },
  linearSearch: {
    ideal: `function linearSearch(arr, n, key) {
      for (let i = 0; i < n; i++)
        if (arr[i] == key)
          return i;
    }`,
    compare: `function linearSearch(arr, n, key) {
      for (let i = 0; i < n; i++)
        <span class="compare">if (arr[i] == key)</span>
          return i;
    }`,
    select: `function linearSearch(arr, n, key) {
      for (let i = 0; i < n; i++)
        if (arr[i] == key)
          <span class="select">return i;</span>
    }`,
  },
  binarySearch: {
    ideal: `function binarySearch(arr, n, key) {
      let left = 0;
      let right = n - 1;
    
      while (left <= right) {
        let middle = left + (right - left) / 2;
        
        if (arr[middle] == key)    
          return middle;
        else if (arr[middle] < key)
          left = middle + 1;
        else
          right = middle - 1;
      }
    }`,
    compare: `function binarySearch(arr, n, key) {
      let left = 0;
      let right = n - 1;
    
      while (left <= right) {
        let middle = left + (right - left) / 2;
        
        if (arr[middle] == key)    
          return middle;
        else if (arr[middle] < key)
          left = middle + 1;
        else
          right = middle - 1;
      }
    }`,
    select: `function binarySearch(arr, n, key) {
      let left = 0;
      let right = n - 1;
    
      while (left <= right) {
        let middle = left + (right - left) / 2;
        
        if (arr[middle] == key)    
          return middle;
        else if (arr[middle] < key)
          left = middle + 1;
        else
          right = middle - 1;
      }
    }`,
  },
};

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
