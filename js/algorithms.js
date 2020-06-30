function bubbleSort(inputArray) {
  outputLog = [];
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray.length - i; j++) {
      outputLog.push({
        type: operations.compare,
        left: i,
        right: j,
      });
      if (inputArray[j] > inputArray[j + 1]) {
        outputLog.push({
          type: operations.swap,
          left: j,
          right: j + 1,
        });
        swap(inputArray, j, j + 1);
      }
    }
  }
  return outputLog;
}
