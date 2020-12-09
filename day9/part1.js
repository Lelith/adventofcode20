const utils = require('../utils');

function findSums(data, preamble) {
  let idx = preamble;
  let prePointer = 0;
  const condition = false;
  while (!condition && idx < data.length) {
    let match = false;
    let preIdx = 0;
    const preambleNumbers = data.slice(prePointer, prePointer + preamble);
    // console.log(data[idx]);
    // console.log(preambleNumbers);
    while (!match) {
      if (preIdx > preambleNumbers.length - 1) {
        console.log('no match found', data[idx]);
        return;
      }
      // console.log(`${data[idx]} - ${preambleNumbers[preIdx]}`);
      const rest = data[idx] - preambleNumbers[preIdx];
      //  console.log(rest);
      if (preambleNumbers.indexOf(rest, preIdx + 1) > 0) {
        /* console.log(`the pair ${preambleNumbers[preIdx]} and
        ${preambleNumbers[preambleNumbers.indexOf(rest)]} equal ${data[idx]}`);
        */
        match = true;
        prePointer += 1;
      }
      preIdx += 1;
    }

    idx += 1;
  }
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');

  data = utils.modDataNewline(data);
  //  console.log(data);
  findSums(data, 25);
} catch (e) {
  console.log('Error', e.stack);
}
