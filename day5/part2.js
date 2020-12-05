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

function getSeatNumber(seats) {
  seats = seats.sort((a, b) => a - b);
  const [min, max] = [seats[0], seats[seats.length - 1]];
  /* generate new array with length of original array and fill it from min up to generate ideal list
  then filter the list for the missing seat number
  */
  const missingArr = Array.from(
    { length: Math.abs(max - min) },
    (v, i) => i + min,
  ).filter(item => seats.indexOf(item) === -1);
  console.log(missingArr[0]);
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const seats = findSeat(data);
  getSeatNumber(seats);
} catch (e) {
  console.log('Error', e.stack);
}
