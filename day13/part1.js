const utils = require('../utils');

function busWaitingTime(data) {
  const departureTime = data[0];
  const waitingTimes = [];
  let busShedule = data[1].replace(/x/g, '').split(',').filter(Boolean);
  busShedule = busShedule.map((busTime) => parseInt(busTime, 10));

  busShedule.map((timeIntervall) => {
    waitingTimes.push(timeIntervall - (departureTime % timeIntervall));
  });
  const minTime = Math.min(...waitingTimes);
  const busID = busShedule[waitingTimes.indexOf(minTime)];
  console.log(`Waiting time is ${minTime} for Bus ${busID}`);
  console.log(minTime * busID);
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  busWaitingTime(data);
} catch (e) {
  console.log('Error', e.stack);
}
