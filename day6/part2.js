const utils = require('../utils');


function countAnswers(group) {
  const groupAnswers = {};
  group.forEach((answerSet) => {
    const answers = answerSet.split('');
    answers.map((answer) => {
      if (groupAnswers.hasOwnProperty(answer)) {
        groupAnswers[answer] += 1;
      } else {
        groupAnswers[answer] = 1;
      }
    });
  });

  return groupAnswers;
}

function countSameAnswers(groupAnswers, groupSize) {
  let sameAnswers = 0;
  console.log(groupAnswers);
  Object.keys(groupAnswers).map((key) => {
    // console.log(`${groupAnswers[key]} people of the group answered ${key}`);
    if (groupAnswers[key] === groupSize) {
      sameAnswers += 1;
    }
  });
  return sameAnswers;
}

function collectAnswers(data) {
  let answerSum = 0;
  data.forEach((group) => {
    group = utils.modDataNewlineStr(group);
    const groupAnswers = countAnswers(group);
    answerSum += countSameAnswers(groupAnswers, group.length);
  });
  return answerSum;
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataBlanklines(data);
  data = utils.trimData(data);
  const sumOfAnswers = collectAnswers(data);
  console.log('the sum of all answers is:', sumOfAnswers);
} catch (e) {
  console.log('Error', e.stack);
}
