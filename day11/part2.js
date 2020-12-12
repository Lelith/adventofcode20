const utils = require('../utils');

function getAdjancedSeats(floorplan, rowIdx, seatIdx) {
  const row = floorplan[rowIdx];
  // let topSeats = [];
  // let bottomSeats = [];
  // const sideSeats = [];
  // let start = seatIdx;
  // let end = seatIdx + 1;
  // find seats above
  const rightSide = row.slice(seatIdx);
  const leftSide = row.slice(0, seatIdx);
  console.log('rightSide', rightSide);
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
  let currentFloorplan = JSON.parse(JSON.stringify(floorplan));
  while (seatsChanged) {
    const changedFloorplan = JSON.parse(JSON.stringify(currentFloorplan));
    seatsChanged = emptyOccupied(currentFloorplan, changedFloorplan);
    if (seatsChanged) {
      currentFloorplan = JSON.parse(JSON.stringify(changedFloorplan));
      seatsChanged = fillSeats(currentFloorplan, changedFloorplan);
      currentFloorplan = JSON.parse(JSON.stringify(changedFloorplan));
    }
    // console.log(`seatsChanged? ${seatsChanged}`);
  }
  currentFloorplan = currentFloorplan.reduce((acc, val) => acc.concat(val), []);
  currentFloorplan = currentFloorplan.join('');
  console.log(currentFloorplan.match(/#/g).length);
}

try {
  let data = utils.readInput('./example.txt');
  // let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map((row) => row.replace(/L/g, '#'));
  data = data.map((row) => row.split(''));
  getAdjancedSeats(data, 4, 4);
  /// releaseTheChaos(data);
} catch (e) {
  console.log('Error', e.stack);
}
