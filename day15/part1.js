const utils = require('../utils');

function playMemory(numbers) {
  for (let rounds = numbers.length; rounds <= 2020; rounds += 1) {
    const lastNumberCalled = numbers[rounds - 1];
    const numberExists = numbers.lastIndexOf(lastNumberCalled, -2);
    if (numberExists > 0) {
      numbers[rounds] = rounds - 1 - numberExists;
    } else {
      numbers[rounds] = 0;
    }
  }
  console.log(numbers[2020]);
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataCommas(data);
  console.log(data);
  data.unshift('X');
  playMemory(data);
} catch (e) {
  console.log('Error', e.stack);
}
