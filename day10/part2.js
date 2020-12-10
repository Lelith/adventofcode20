const utils = require('../utils');

function findSequence(data) {
  const sequenceLengths = [];
  let sumSequence = 0;
  data.forEach((item, index) => {
    if (index < data.length) {
      let diff = 0;
      diff = data[index + 1] - item;
      if (diff === 1) {
        sumSequence += 1;
      } else if (diff === 3) {
        // console.log('sequence stopped, reset and count for new sequence');
        if (sumSequence > 1) {
          sequenceLengths.push(sumSequence);
        }
        sumSequence = 0;
      }
    }
  });
  console.log(sequenceLengths);
  return sequenceLengths;
}

function fib3Step(length) {
  const myArr = [1, 1, 2];
  for (let i = 3; i <= length; i += 1) {
    myArr[i] = myArr[i - 1] + myArr[i - 2] + myArr[i - 3];
  }
  return myArr[length];
}


try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewline(data);
  data = data.sort((a, b) => a - b);
  data.unshift(0);
  data.push(data[data.length - 1] + 3);
  console.log(data);
  const sequences = findSequence(data);
  const fibonaccis = sequences.map(item => fib3Step(item));
  console.log(fibonaccis);
  console.log(fibonaccis.reduce((a, b) => a * b));
} catch (e) {
  console.log('Error', e.stack);
}
