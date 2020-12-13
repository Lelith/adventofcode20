const utils = require('../utils');

function getAdjancedSeats(floorplan, rowIdx, seatIdx) {
  const row = floorplan[rowIdx];
  let vacantSeats = 0;
  let topSeats = 0;
  let bottomSeats = 0;

  // get vacant seats on the sides
  const rightSide = row.slice(seatIdx + 1);
  const leftSide = row.slice(0, seatIdx);

  const emptySeatRight = rightSide.indexOf('L');
  const vacantSeatRight = rightSide.indexOf('#');
  const emptySeatLeft = leftSide.indexOf('L');
  const vacantSeatLeft = leftSide.indexOf('#');

  if (vacantSeatRight >= 0 && (emptySeatRight < 0 || vacantSeatRight < emptySeatRight)) {
    vacantSeats += 1;
  }
  if (vacantSeatLeft >= 0 && (emptySeatLeft < 0 || vacantSeatLeft > emptySeatLeft)) {
    vacantSeats += 1;
  }

  // find vacant seats above
  if (rowIdx > 0) {
    let rowPointer = rowIdx - 1;
    let leftDig = seatIdx - 1;
    let rightDig = seatIdx + 1;
    let leftFound = false;
    let rightFound = false;
    let topFound = false;
    while (topSeats < 3 && rowPointer >= 0) {
      if (!leftFound && leftDig >= 0) {
        if (floorplan[rowPointer][leftDig] === '#') {
          // console.log('left diagonal vacant found');
          topSeats += 1;
          leftFound = true;
        } else if (floorplan[rowPointer][leftDig] === 'L') {
          // console.log('left diagonal empty found');
          leftFound = true;
        }
      }

      if (!rightFound && rightDig < row.length) {
        if (floorplan[rowPointer][rightDig] === '#') {
          // console.log('right diagonal vacant found');
          topSeats += 1;
          rightFound = true;
        } else if (floorplan[rowPointer][rightDig] === 'L') {
          // console.log('right diagonal empty found');
          rightFound = true;
        }
      }
      if (!topFound) {
        if (floorplan[rowPointer][seatIdx] === '#') {
          topSeats += 1;
          topFound = true;
        } else if (floorplan[rowPointer][seatIdx] === 'L') {
          topFound = true;
        }
      }
      rowPointer -= 1;
      leftDig -= 1;
      rightDig += 1;
    }
  }

  if (rowIdx < row.length) {
    // console.log('look for bottomSeats');
    let rowPointer = rowIdx + 1;
    let leftDig = seatIdx - 1;
    let rightDig = seatIdx + 1;
    let leftFound = false;
    let rightFound = false;
    let bottomFound = false;

    while (bottomSeats < 3 && rowPointer < row.length) {
      if (!leftFound && leftDig >= 0) {
        if (floorplan[rowPointer][leftDig] === '#') {
          // console.log('left diagonal vacant found');
          bottomSeats += 1;
          leftFound = true;
        } else if (floorplan[rowPointer][leftDig] === 'L') {
          // console.log('left diagonal empty found');
          leftFound = true;
        }
      }

      if (!rightFound && rightDig < row.length) {
        if (floorplan[rowPointer][rightDig] === '#') {
          // console.log('right diagonal vacant found');
          bottomSeats += 1;
          rightFound = true;
        } else if (floorplan[rowPointer][rightDig] === 'L') {
          // console.log('right diagonal empty found');
          rightFound = true;
        }
      }

      if (!bottomFound) {
        if (floorplan[rowPointer][seatIdx] === '#') {
          bottomSeats += 1;
          bottomFound = true;
        } else if (floorplan[rowPointer][seatIdx] === 'L') {
          bottomFound = true;
        }
      }
      rowPointer += 1;
      leftDig -= 1;
      rightDig += 1;
    }
  }

  // console.log('vacant seats', vacantSeats + topSeats + bottomSeats);
  return vacantSeats + topSeats + bottomSeats;
}

function emptyOccupied(floorplan, newFloorplan) {
  let seatsChanged = false;
  floorplan.forEach((row, rowIdx) => {
    row.forEach((seat, seatIdx) => {
      if (seat === '#') {
        const occupied = getAdjancedSeats(floorplan, rowIdx, seatIdx);
        if (occupied && occupied.length > 4) {
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
        const vacant = getAdjancedSeats(floorplan, rowIdx, seatIdx);
        if (vacant === 0) {
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
  // let data = utils.readInput('./example2.txt');
  let data = utils.readInput('./example.txt');
  //let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  data = data.map((row) => row.replace(/L/g, '#'));
  data = data.map((row) => row.split(''));
  releaseTheChaos(data);
} catch (e) {
  console.log('Error', e.stack);
}
