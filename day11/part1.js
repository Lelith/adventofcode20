const _ = require('lodash');
const utils = require('../utils');

function getAdjancedSeats(floorplan, rowIdx, seatIdx) {
  const row = floorplan[rowIdx];
  let topSeats = [];
  let bottomSeats = [];
  const sideSeats = [];
  let start = seatIdx;
  let end = seatIdx + 1;
  if (seatIdx > 0) {
    start = seatIdx - 1;
    sideSeats.push(row[start]);
  }
  if (seatIdx < row.length - 1) {
    end = seatIdx + 1;
    sideSeats.push(row[end]);
  }
  // set topRow
  if (rowIdx > 0) {
    topSeats = floorplan[rowIdx - 1].slice(start, end + 1);
  }
  if (rowIdx < floorplan.length - 1) {
    bottomSeats = floorplan[rowIdx + 1].slice(start, end + 1);
  }

  return topSeats.concat(bottomSeats, sideSeats).join('');
}

function emptyOccupied(floorplan, newFloorplan) {
  let seatsChanged = false;
  floorplan.forEach((row, rowIdx) => {
    row.forEach((seat, seatIdx) => {
      if (seat === '#') {
        const adjancedSeats = getAdjancedSeats(floorplan, rowIdx, seatIdx);
        const occupied = adjancedSeats.match(/#/g);
        if (occupied && occupied.length > 3) {
          newFloorplan[rowIdx][seatIdx] = 'L';
          seatsChanged = true;
        }
      }
    });
  });
  return seatsChanged;
}

function fillSeats(floorplan, newFloorplan) {
  let seatsChanged = false;
  floorplan.forEach((row, rowIdx) => {
    row.forEach((seat, seatIdx) => {
      if (seat === 'L') {
        const adjancedSeats = getAdjancedSeats(floorplan, rowIdx, seatIdx);
        const vacant = adjancedSeats.match(/#/g);
        if (vacant === null) {
          newFloorplan[rowIdx][seatIdx] = '#';
          seatsChanged = true;
        }
      }
    });
  });
  return seatsChanged;
}

function releaseTheChaos(floorplan) {
  let seatsChanged = true;
  let currentFloorplan = _.cloneDeep(floorplan);
  while (seatsChanged) {
    const changedFloorplan = _.cloneDeep(currentFloorplan);
    seatsChanged = emptyOccupied(currentFloorplan, changedFloorplan);
    if (seatsChanged) {
      currentFloorplan = _.cloneDeep(changedFloorplan);
      seatsChanged = fillSeats(currentFloorplan, changedFloorplan);
      currentFloorplan = _.cloneDeep(changedFloorplan);
    }
    // console.log(`seatsChanged? ${seatsChanged}`);
  }
  currentFloorplan = currentFloorplan.reduce((acc, val) => acc.concat(val), []);
  currentFloorplan = currentFloorplan.join('');
  console.log(currentFloorplan.match(/#/g).length);
}


try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map((row) => row.replace(/L/g, '#'));
  data = data.map((row) => row.split(''));;
  releaseTheChaos(data);
} catch (e) {
  console.log('Error', e.stack);
}
