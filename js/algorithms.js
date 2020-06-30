function bubbleSort(inputArray) {
  // array to hold each step of the sort
  outputLog = [];

  // loop over the array
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray.length - i; j++) {
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
