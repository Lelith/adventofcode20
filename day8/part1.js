const utils = require('../utils');

function prepareInstruction(instruction) {
  return instruction.split(' ').map((splitted) => splitted.trim());
}

function executeProgramm(bootcode) {
  let accumulator = 0;
  const instructionsExecuted = [];
  let codeRepeated = false;
  let pointer = 0;
  while ((pointer < bootcode.length) && !codeRepeated) {
    const instruction = prepareInstruction(bootcode[pointer]);
    const opCode = instruction[0];

    if (instructionsExecuted.indexOf(pointer) > 0) {
      codeRepeated = true;
      console.log('we are trying to access a before executed instruction:', accumulator);
      return;
    }
    instructionsExecuted.push(pointer);

    // interpret Programm
    switch (opCode) {
      case 'acc':
        accumulator += parseInt(instruction[1], 10);
        pointer += 1;
        break;
      case 'jmp':
        pointer += parseInt(instruction[1], 10);
        break;
      default:
        pointer += 1;
    }
  }
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  executeProgramm(data);
} catch (e) {
  console.log('Error', e.stack);
}
