const utils = require('../utils');

function prepareInstruction(instruction) {
  return instruction.split(' ').map((splitted) => splitted.trim());
}

function executeProgramm(bootcode) {
  let accumulator = 0;
  const instructionsExecuted = [];
  let endProgramm = false;
  let pointer = 0;
  while (!endProgramm) {
    if (pointer > bootcode.length - 1) {
      endProgramm = true;
      console.log('we successfully finished the programm', accumulator);
      return true;
    }
    const instruction = prepareInstruction(bootcode[pointer]);
    const opCode = instruction[0];

    if (instructionsExecuted.indexOf(pointer) > 0) {
      endProgramm = true;
      // console.log('we are trying to access a before executed instruction:', accumulator);
      return false;
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

function bruteForceProgramm(data) {
  let exchangePos = 0;
  let successRun = false;
  while (exchangePos < (data.length - 1) && !successRun) {
    const changedData = [...data];
    const instruction = prepareInstruction(changedData[exchangePos]);
    if (instruction[0] === 'jmp') {
      changedData[exchangePos] = changedData[exchangePos].replace(/((jmp)|\.|,)/g, 'nop');
      successRun = executeProgramm(changedData);
      // console.log('run was', successRun);
    }
    exchangePos += 1;
  }
  if (!successRun) {
    exchangePos = 0;
    while (exchangePos < (data.length - 1) && !successRun) {
      const changedData = [...data];
      const instruction = prepareInstruction(changedData[exchangePos]);
      if (instruction[0] === 'nop') {
        changedData[exchangePos] = changedData[exchangePos].replace(/((nop)|\.|,)/g, 'jmp');
        successRun = executeProgramm(changedData);
        // console.log('run was', successRun);
      }
      exchangePos += 1;
    }
  }
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  bruteForceProgramm(data);
} catch (e) {
  console.log('Error', e.stack);
}
