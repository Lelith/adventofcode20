const utils = require('../utils');

function countTrees(data, rowJump, lineJump) {
  let pointer = 0;
  let amountTrees = 0;
  for (let index = 0; index < data.length; index += lineJump) {
    const rowArr = data[index].split('');
    // console.log(`we are in row ${index} and look at ${pointer}`);
    // console.log(rowArr);
    if (rowArr[pointer] === '#' && index !== 0) {
      // console.log(`tree found at ${pointer}`);
      amountTrees += 1;
    }
    if (pointer + rowJump >= rowArr.length) {
      pointer = (pointer + rowJump) % rowArr.length;
    } else {
      pointer += rowJump;
    }
  }
  console.log(`for ${rowJump} and ${lineJump} the navigationSystem has encounterd ${amountTrees} trees`);
  return amountTrees;
}

function navigationSystem(data) {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const amountTrees = [];
  slopes.forEach((slope) => {
    amountTrees.push(countTrees(data, slope[0], slope[1]));
  });
  const sumTrees = amountTrees.reduce((a, b) => a * b);
  return sumTrees;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const amountTrees = navigationSystem(data);
  console.log(`the navigation system encountered ${amountTrees} trees`);
} catch (e) {
  console.log('Error', e.stack);
}
