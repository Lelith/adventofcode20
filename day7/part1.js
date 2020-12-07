const utils = require('../utils');

function saveInstructions(data) {
  const instructions = {};
  data.forEach((rule) => {
    console.log(rule);
    let bags = rule.split(/\d/g).map(splitted => splitted.trim());
    bags = bags.map(bag => bag.split(' ', 2).join(''));
    if (bags.length > 1) {
      const mainBag = bags.shift();
      instructions[mainBag] = bags;
    }
  });
  console.log(instructions);
}

try {
  let data = utils.readInput('./example.txt');
  // let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  saveInstructions(data);
} catch (e) {
  console.log('Error', e.stack);
}