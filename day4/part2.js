const utils = require('../utils');

function formatPassData(passport) {
  passport = utils.modDataNewlineStr(passport);
  passport = passport.join();
  passport = passport.split(' ').map(splitted => splitted.trim());
  passport = passport.join();
  passport = passport.split(',').map(splitted => splitted.trim());
  return passport;
}

function probeValue(entry, probeField) {
  const checkPattern = {
    byr: /(19[2-9][0-9]|200[0-2])/g,
    iyr: /(201[0-9]|2020)/g,
    eyr: /(202[0-9]|2030)/g,
    hgt: /(^1[5-8][0-9]|19[0-3])cm$|^(59|6[0-9]|7[0-6])in$/g,
    hcl: /^#([a-f,\d]){6}$/g,
    ecl: /(\b(amb|blu|brn|gry|grn|hzl|oth)\b)/g,
    pid: /^[0-9]{9}$/g,
  };
  // console.log('-----------------');
  // console.log(`will probe ${entry} of field ${probeField} with regex ${checkPattern[probeField]}`);
  const result = entry.match(checkPattern[probeField]);
  if (result === null) {
    // console.log('value is not correct');
    return false;
  }
  return true;
}

function probePassport(passport) {
  // const checkList = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
  const checkList = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const passportFields = passport.map(entries => entries.split(':'));
  const existingFields = [];
  const passportObj = {};
  passportFields.forEach((entry) => {
    existingFields.push(entry[0]);
    passportObj[entry[0]] = entry[1];
  });
  let valid = true;
  let index = 0;
  // console.log(passportFields);
  while (valid && index < checkList.length) {
    const pattern = checkList[index];
    if (existingFields.indexOf(pattern) < 0) {
      valid = false;
    } else {
      const valueValidty = probeValue(passportObj[pattern], pattern);
      if (valueValidty === false) {
        valid = false;
      }
    }
    index += 1;
  }
  return valid;
}

function validatePassports(data) {
  let validPassports = 0;
  data.forEach((passport) => {
    passport = formatPassData(passport);
    if (probePassport(passport)) {
      validPassports += 1;
    }
  });
  return validPassports;
}

try {
  //  let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = data.split(/\n{2,}/g);
  data = utils.trimData(data);
  const validPassports = validatePassports(data);
  console.log(`the system found ${validPassports} valid passports`);
} catch (e) {
  console.log('Error', e.stack);
}
