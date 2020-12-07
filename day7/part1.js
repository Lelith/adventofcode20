const utils = require('../utils');

function saveInstructions(data) {
  const instructions = {};
  data.forEach((rule) => {
    let bags = rule.split(/\d/g).map((splitted) => splitted.trim());
    bags = bags.map((bag) => bag.split(' ', 2).join(''));
    if (bags.length > 1) {
      const mainBag = bags.shift();
      instructions[mainBag] = bags;
    }
  });
  return instructions;
}

function findBags(instructions, searchTerm, possibleBags) {
  return Object.keys(instructions).map((bag) => {
    if (instructions[bag].indexOf(searchTerm) > -1) {
      if (possibleBags.indexOf(bag) === -1) {
        possibleBags.push(bag);
        findBags(instructions, bag, possibleBags);
      }
    }
  });
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const instructions = saveInstructions(data);
  const possibleBags = [];
  findBags(instructions, 'shinygold', possibleBags);
  console.log(possibleBags.length);
} catch (e) {
  console.log('Error', e.stack);
}
