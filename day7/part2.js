const utils = require('../utils');

function saveInstructions(data) {
  const instructions = {};
  data.forEach((rule) => {
    let bags = rule.replace(/((contain)|\.|,)/g, '');
    bags = bags.replace(/((bag)s{0,1})/g, ';');
    bags = bags.split(';', -1).map((splitted) => splitted.trim());
    if (bags.length > 2) {
      const mainBag = bags.shift().split(' ').join('');
      const bagObj = {};
      bags.forEach((bag) => {
        let name = (bag.split(' '));
        if (name.length === 3) {
          const amount = parseInt(name.shift(), 10);
          name = name.join('');
          bagObj[name] = amount;
        }
      });
      instructions[mainBag] = bagObj;
    }
  });
  return instructions;
}

function findBags(instructions, searchTerm) {
  if (Object.keys(instructions[searchTerm]).length > 0) {
    let sum = 0;
    Object.keys(instructions[searchTerm]).forEach((content) => {
      console.log(`${content} ${instructions[searchTerm][content]}`);
      sum += Number(instructions[searchTerm][content]);
      console.log(sum);
      return sum * findBags(instructions, content);
    });
  }
}

try {
  let data = utils.readInput('./example.txt');
  // let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const instructions = saveInstructions(data);
  // console.log(instructions);
  const sum = findBags(instructions, 'shinygold');
  console.log(sum);
} catch (e) {
  console.log('Error', e.stack);
}
