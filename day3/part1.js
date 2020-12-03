const utils = require('../utils');

function countTrees(data) {
  let pointer = 0;
  let amountTrees = 0;
  const rowJump = 3;
  data.forEach((mapRow, index) => {
    const rowArr = mapRow.split('');
    // console.log(pointer);
    // console.log(rowArr);
    if (rowArr[pointer] === '#' && index !== 0) {
      // console.log(`tree found at ${pointer}`);
      amountTrees += 1;
    }
    if (pointer + rowJump > rowArr.length) {
      pointer = (pointer + rowJump) - rowArr.length;
    } else {
      pointer += rowJump;
    }
  });

  return amountTrees;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const amountTrees = countTrees(data);
  console.log(`the navigation system encountered ${amountTrees} trees`);
} catch (e) {
  console.log('Error', e.stack);
}
