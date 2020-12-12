const utils = require('../utils');

function moveTo(orientation, value, shipPosition) {
//  console.log(`move the ship ${orientation} about ${value}`);
  switch (orientation) {
    case 'N':
      shipPosition[0] += value;
      break;
    case 'S':
      shipPosition[0] -= value;
      break;
    case 'E':
      shipPosition[1] += value;
      break;
    case 'W':
      shipPosition[1] -= value;
      break;
    default:
  }
}

function shipNavigator(directions) {
  const shipPosition = [0, 0]; // n-s and w-e pos
  const compass = ['N', 'E', 'S', 'W'];
  let needlePosition = 1;
  directions.forEach((instruction) => {
    const operation = instruction[0];
    const value = instruction[1];
    if (operation === 'F') {
      moveTo(compass[needlePosition], value, shipPosition);
    } else if (operation === 'L') {
      needlePosition -= (value / 90);
      if (needlePosition < 0) {
        needlePosition = 4 + needlePosition;
      }
      // console.log(`turn left, new direction${compass[needlePosition]}`);
    } else if (operation === 'R') {
      needlePosition += (value / 90);
      if (needlePosition > 3) {
        needlePosition -= 4;
      }
      // console.log(`turn right, new direction${compass[needlePosition]}`);
    } else {
      moveTo(operation, value, shipPosition);
    }
  });
  const distance = Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]);
  console.log('distance', distance);
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const directions = [];
  data.forEach((item) => {
    directions.push([item.substr(0, 1), parseInt(item.substr(1), 10)]);
  });
  shipNavigator(directions);
} catch (e) {
  console.log('Error', e.stack);
}
