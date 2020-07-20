function bubbleSort(inputArray) {
  // array to hold each step of the sort
  outputLog = [];

  // loop over the array
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray.length - i - 1; j++) {
      // add comparison operation to output log
      outputLog.push({
        type: operations.compare,
        left: j,
        right: j + 1,
      });

      // compare two elements and check if the first one is greater
      if (inputArray[j] > inputArray[j + 1]) {
        // add swap operation to output log
        outputLog.push({
          type: operations.swap,
          left: j,
          right: j + 1,
        });

        // make the acutal swap
        swap(inputArray, j, j + 1);
      }
    }
  }
  return outputLog;
}


function insertionSort(inputArray) {
  // array to hold each step of the sort
  outputLog = [];

  // loop over the array
  for (let i = 1; i < inputArray.length; i++) {
    for (let j = i; j > 0; j--) {
      // add comparison operation to output log
      outputLog.push({
        type: operations.compare,
        left: j - 1,
        right: j,
      });

      // compare two elements and check if the first one is greater
      if (inputArray[j] < inputArray[j - 1]) {
        // add swap operation to output log
        outputLog.push({
          type: operations.swap,
          left: j - 1,
          right: j,
        });

        // make the acutal swap
        swap(inputArray, j, j - 1);
      }
    else 
        break;
    }
  }
  return outputLog;
}

function selectionSort(inputArray) {
  // array to hold each step of the sort
  outputLog = [];

  // loop over the array
  for (let i = 0; i < inputArray.length - 1; i++) {
      
    let min = i;
    for (let j = i+1; j < inputArray.length; j++) {
        
      // add comparison operation to output log
      outputLog.push({
        type: operations.compare,
        left: min,
        right: j,
      });

      // compare two elements and check if the first one is greater
      if (inputArray[j] < inputArray[min]) {
        // change the min var
        min = j;
          
        outputLog.push({
        type: operations.select,
        left: min,
        right: -1
      });
      }
    }
      
    // add swap operation to output log
    outputLog.push({
      type: operations.swap,
      left: i,
      right: min,
    });
        
    // make the acutal swap
    swap(inputArray, i, min);
  }
    
  return outputLog;
}

function linearSearch(inputArray) {
  // array to hold each step of the sort
  let outputLog = [];
  let number = parseInt(document.getElementById("searchNumber").value);
  if (number == undefined) {
      number = inputArray[inputArray.length - 4];
  }
    
  // loop over the array
  for (let i = 0; i < inputArray.length; i++) {
      // add comparison operation to output log
      outputLog.push({
        type: operations.compare,
        left: i,
        right: i,
      });

      // compare two elements and check if the first one is greater
      if (inputArray[i] == number) {
        // add swap operation to output log
        outputLog.push({
          type: operations.select,
          left: i,
          right: -1,
        });

          break;
      }
    }
  return outputLog;
}

function binarySearch(inputArray) {
  // array to hold each step of the sort
  let outputLog = [];
  let number = parseInt(document.getElementById("searchNumber").value);
  if (number == undefined) {
      number = inputArray[inputArray.length - 4];
  }
    
 let left = 0;
 let right = inputArray.length - 1;
    
    
  while (left <= right) { 
    let middle = left + Math.floor((right - left) / 2); 
      
    outputLog.push({
        type: operations.select,
        left: left,
        right: right,
    });
    outputLog.push({
        type: operations.compare,
        left: middle,
        right: middle,
     });
      
    if (inputArray[middle] == number) {
        outputLog.push({
          type: operations.select,
          left: middle,
          right: middle,
        });

        break;
    }
    else if (inputArray[middle] < number) { 
        left = middle + 1; 
    }
    else {
        right = middle - 1; 
    }
  } 
  
  return outputLog;
}