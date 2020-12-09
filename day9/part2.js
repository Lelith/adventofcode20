const utils = require('../utils');

function sequenceFound(sequence) {
  console.log('sequence found');
  sequence.sort((a, b) => a - b);
  console.log(sequence[0] + sequence[sequence.length - 1]);
}
function findSequence(data, invalidNumber) {
  console.log(data.length);
  let idx = 0;
  const sumArr = [];
  let sum = 0;
  while (sum !== invalidNumber && idx < data.length - 1) {
    while (sum < invalidNumber && idx < data.length - 1) {
      sumArr.push(data[idx]);
      sum = sumArr.reduce((a, b) => a + b);
      idx += 1;
    }
    while (sum > invalidNumber) {
      console.log('sum too big, need to shift');
      sumArr.shift();
      sum = sumArr.reduce((a, b) => a + b);
    }
    if (sum === invalidNumber) {
      sequenceFound(sumArr);
    }
  }
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');

  data = utils.modDataNewline(data);
  // console.log(data);
  // data = data.slice(0, data.indexOf(127));
  // findSequence(data, 127);
  data = data.slice(0, data.indexOf(400480901));
  findSequence(data, 400480901);
} catch (e) {
  console.log('Error', e.stack);
}
