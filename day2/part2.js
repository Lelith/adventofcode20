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

function probePassword(instructions) {
  const { password, range, searchPattern } = instructions;
  let valid = false;
  if (password[range[0] - 1] === searchPattern) {
    // console.log('equals on first range');
    valid = !valid;
  }
  if (password[range[1] - 1] === searchPattern) {
    // console.log('equals on second range');
    valid = !valid;
  }
  // console.log(`${password} is considerd as ${valid}`);
  return valid;
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
