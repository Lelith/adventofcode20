const utils = require('../utils');


function countAnswers(group) {
  const groupAnswers = [];
  group.forEach((answerSet) => {
    const answers = answerSet.split('');
    answers.map((answer) => {
      if (groupAnswers.indexOf(answer) === -1) {
        groupAnswers.push(answer);
      }
    });
  });
  return groupAnswers.length;
}

function collectAnswers(data) {
  let answerSum = 0;
  data.forEach((group) => {
    group = utils.modDataNewlineStr(group);
    answerSum += countAnswers(group);
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
