const utils = require('../utils');

function findDifferences(data) {
  let num3 = 0;
  let num1 = 0;
  data.forEach((item, index) => {
    if (index === data.length - 1) {
      num3 += 1;
    } else {
      let diff = 0;
      diff = data[index + 1] - item;
      if (diff === 1) {
        num1 += 1;
      } else if (diff === 3) {
        num3 += 1;
      }
    }
  });
  console.log(`num1 differences: ${num1} num3 differences: ${num3}`);
  console.log(num1 * num3);
}

try {
  let data = utils.readInput('./example.txt');
  // let data = utils.readInput('./input.txt');
  data = utils.modDataNewline(data);
  data = data.sort((a, b) => a - b);
  data.unshift(0);
  findDifferences(data);
} catch (e) {
  console.log('Error', e.stack);
}
