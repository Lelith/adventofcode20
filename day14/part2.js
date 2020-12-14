const utils = require('../utils');

function applyBitMask(mask, value) {
  const newValue = [...value];
  mask.forEach((item, i) => {
    if (item !== 'Y') {
      newValue[i] = item;
    }
  });
  return newValue.join('');
}

function generateMaskVariations(mask) {
  const floatingBits = mask.reduce((acc, el, i) => (el === 'X' ? [...acc, i] : acc), []);
  const maskVariants = [];
  const variations = Math.pow(2, floatingBits.length);
  for (let idx = 0; idx < variations; idx += 1) {
    let cnt = idx.toString(2);
    cnt = cnt.padStart(floatingBits.length, '0');
    cnt = cnt.split('');
    for (let jdx = 0; jdx < floatingBits.length; jdx += 1) {
      mask[floatingBits[jdx]] = cnt[jdx];
    }
    maskVariants.push([...mask]);
  }
  return maskVariants;
}

function executeProgram(programm) {
  let mask = '';
  const memory = {};
  let maskVariants = [];
  programm.forEach((instruction) => {
    let [command, value] = instruction;
    command = command.trim();
    if (command === 'mask') {
      mask = value.trim();
      mask = mask.replace(/0/g, 'Y');
      mask = mask.split('');
      maskVariants = generateMaskVariations(mask);
    } else {
      // console.log('iterate over all mask variations for each of the entries to save the input');
      value = parseInt(value, 10);
      let memoryPointer = parseInt(command.match(/(\d+)/g), 10).toString(2);
      memoryPointer = memoryPointer.padStart(36, '0');
      memoryPointer.split('');
      maskVariants.forEach((variant) => {
        const memoryPlace = parseInt(applyBitMask(variant, memoryPointer), 2);
        memory[memoryPlace] = value;
      });
    }
  });
  const sum = Object.values(memory).reduce((acc, curr) => acc + curr, 0);
  console.log(sum);
}

try {
  // let data = utils.readInput('./example2.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map((line) => line.split('='));
  executeProgram(data);
} catch (e) {
  console.log('Error', e.stack);
}
