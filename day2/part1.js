const utils = require('../utils');

function splitEntry(passwordEntry) {
  const parts = passwordEntry.split(':');
  const searchQuery = parts[0].split(' ');
  const range = searchQuery[0].split('-').map(Number);

  const instructions = {
    password: parts[1].trim(),
    range,
    searchPattern: searchQuery[1].trim(),
  };
  return instructions;
}

function testPasswords(data) {
  data.forEach((passwordEntry) => {
    const instructions = splitEntry(passwordEntry);
    console.log(instructions);
  });
  return 0;
}

try {
  let data = utils.readInput('./example.txt');
  data = utils.modDataNewlineStr(data);
  // let data = utils.readInput('./input.txt');
  console.log(data[0]);
  const validPasswords = testPasswords(data);
  console.log(validPasswords);
} catch (e) {
  console.log('Error', e.stack);
}
