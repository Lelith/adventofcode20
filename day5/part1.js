const utils = require('../utils');

function calcMidpoint(range, indicator) {
  const midPoint = (range[0] + range[1]) / 2;

  // f or l are keeping the lower half
  if (indicator === 'F' || indicator === 'L') {
    range[1] = Math.floor(midPoint);
  } else {
    range[0] = Math.round(midPoint);
  }
}

function findNumber(range, rowInstructions) {
  rowInstructions.forEach((instruction) => {
    calcMidpoint(range, instruction);
  });
  return range[0];
}

function findSeat(data) {
  const seats = [];
  data.forEach((boardingPass) => {
    const rowInstructions = boardingPass.substr(0, 7).split('');
    const row = findNumber([0, 127], rowInstructions);
    const columnInstructions = boardingPass.substr(7, 10).split('');
    const column = findNumber([0, 7], columnInstructions);
    seats.push(row * 8 + column);
  });
  return seats;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const seats = findSeat(data);
  const maxSeat = Math.max(...seats);
  console.log(`the highest seat number is ${maxSeat}`);
} catch (e) {
  console.log('Error', e.stack);
}
