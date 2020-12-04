const utils = require('../utils');

function formatPassData(passport) {
  passport = utils.modDataNewlineStr(passport);
  passport = passport.join();
  passport = passport.split(' ').map(splitted => splitted.trim());
  passport = passport.join();
  passport = passport.split(',').map(splitted => splitted.trim());
  return passport;
}

function probePassport(passport) {
  // const checkList = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
  const checkList = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let passportFields = passport.map(entries => entries.split(':', 1));
  passportFields = [].concat(...passportFields);
  let valid = true;
  // console.log(passportFields);
  checkList.forEach((pattern) => {
    if (passportFields.indexOf(pattern) < 0) {
      valid = false;
      // console.log(`${pattern} not in ${passportFields}`);
    }
  });
  return valid;
}

function validatePassports(data) {
  let validPassports = 0;
  data.forEach((passport) => {
    passport = formatPassData(passport);
    if (probePassport(passport)) {
      validPassports += 1;
    }
    // console.log(passport);
    // console.log('----------------');
  });
  return validPassports;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = data.split(/\n{2,}/g);
  data = utils.trimData(data);
  const validPassports = validatePassports(data);
  console.log(`the system found ${validPassports} valid passports`);
} catch (e) {
  console.log('Error', e.stack);
}
