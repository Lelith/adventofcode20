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


function occurances(password, pattern) {
  let count = 0;
  let position = 0;
  if (pattern.length > 0 && pattern.length < password.length) {
    position = password.indexOf(pattern);
    while (position !== -1) {
      count += 1;
      position = password.indexOf(pattern, position + 1);
    }
  }
  return count;
}

function probePassword(instructions) {
  const amountOfPattern = occurances(instructions.password, instructions.searchPattern);
  if (amountOfPattern >= instructions.range[0] && amountOfPattern <= instructions.range[1]) {
    return true;
  }
  return false;
}
function testPasswords(data) {
  let validPasswords = 0;
  data.forEach((passwordEntry) => {
    const instructions = splitEntry(passwordEntry);
    // console.log(instructions);
    if (probePassword(instructions)) {
      // console.log('valid password');
      validPasswords += 1;
    }
  });
  return validPasswords;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const validPasswords = testPasswords(data);
  console.log(validPasswords);
} catch (e) {
  console.log('Error', e.stack);
}
