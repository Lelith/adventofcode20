const utils = require('../utils');

function expanseReport(data) {
  let sum = 0;
  let index = 0;
  let result = 0;
  while (sum !== 2020 && index < (data.length - 1)) {
    for (let pointer = index + 1; pointer < data.length; pointer += 1) {
      // console.log(`${index} added with ${pointer}`);
      sum = data[index] + data[pointer];
      // console.log(sum);
      if (sum < 2020) {
        for (let pointer2 = pointer + 1; pointer2 < data.length; pointer2 += 1) {
          // console.log(`${index} added with ${pointer} and ${pointer2}`);
          // console.log(`adding ${data[pointer2]} to ${sum}`);
          const sumOfThree = sum + data[pointer2];
          // console.log(`sum of three: ${sumOfThree}`);
          if (sumOfThree === 2020) {
            result = data[index] * data[pointer] * data[pointer2];
            return result;
          }
        }
      }
    }
    index += 1;
  }
  return result;
}
try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewline(data);
  const result = expanseReport(data);
  console.log(result);
} catch (e) {
  console.log('Error', e.stack);
}
