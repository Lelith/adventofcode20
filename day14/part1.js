const utils = require('../utils');

function applyBitMask(mask, value) {
  const newValue = [...value];
  mask.forEach((item, i) => {
    if (item !== 'X') {
      newValue[i] = item;
    }
  });
  return newValue.join('');
}
function executeProgram(programm) {
  let mask = '';
  const memory = [];
  programm.forEach((instruction) => {
    let [command, value] = instruction;
    command = command.trim();
    if (command === 'mask') {
      mask = value.trim();
      mask = mask.split('');
      // console.log(mask);
    } else {
      value = parseInt(value, 10).toString(2);
      value = value.padStart(36, '0');
      value = value.split('');
      const newValue = applyBitMask(mask, value);
      const memoryPointer = parseInt(command.match(/(\d+)/g), 10);
      memory[memoryPointer] = parseInt(newValue, 2);
    }
  });
  console.log(memory.reduce((a, b) => a + b));
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map((line) => line.split('='));
  executeProgram(data);
} catch (e) {
  console.log('Error', e.stack);
}
