const utils = require('../utils');

function busWaitingTime(data) {
  const busShedule = data[1].split(',');
  const allBusses = [];
  busShedule.forEach((bus, offset) => {
    if (bus !== 'x') {
      allBusses.push([offset, parseInt(bus, 10)]);
    }
  });
  //  console.log(allBusses);

  let tick = allBusses[0][1]; // first bus is our takt giver
  let t = 0;
  let index = 1;
  // console.log(allBusses.length);
  while (index < allBusses.length) {
    t += tick;
    const offset = allBusses[index][0];
    const busID = allBusses[index][1];
    if ((t + offset) % busID === 0) {
      tick *= busID;
      index += 1;
    }
  }
  console.log(t);
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  busWaitingTime(data);
} catch (e) {
  console.log('Error', e.stack);
}
