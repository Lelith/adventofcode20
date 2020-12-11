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
  floorplan.forEach((row, rowIdx) => {
    row.forEach((seat, seatIdx) => {
      // console.log(seat === '#');
      if (seat === '#') {
        const adjancedSeats = getAdjancedSeats(floorplan, rowIdx, seatIdx);
        // console.log(adjancedSeats);
        // console.log(`----${rowIdx}|${seatIdx}-----`);
        const occupied = adjancedSeats.match(/#/g).length;
        if (occupied > 3) {
          newFloorplan[rowIdx][seatIdx] = 'L';
        }
      }
    });
  });
  console.log(newFloorplan);
}

try {
  let data = utils.readInput('./example.txt');
  // let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map((row) => row.replace(/L/g, '#'));
  data = data.map((row) => row.split(''));
  // console.log(data);
  const floorplan = _.cloneDeep(data);
  emptyOccupied(data, floorplan);
  // console.log(data);
} catch (e) {
  console.log('Error', e.stack);
}
