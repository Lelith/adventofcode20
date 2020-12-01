const utils = require('../utils');


function expanseReport(data) {
  let sum = 0;
  let index = 0;
  let result = 0;
  while (sum !== 2020 && index < (data.length - 1)) {
    for (let pointer = index + 1; pointer < data.length; pointer += 1) {
      // console.log(`${index} added with ${pointer}`);
      sum = data[index] + data[pointer];
      if (sum === 2020) {
        result = (data[index] * data[pointer]);
        return result;
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
