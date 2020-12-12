const utils = require('../utils');

function moveTo(orientation, value, wayPoint) {
//  console.log(`move the ship ${orientation} about ${value}`);
  switch (orientation) {
    case 'N':
      wayPoint[0] += value;
      break;
    case 'S':
      wayPoint[0] -= value;
      break;
    case 'E':
      wayPoint[1] += value;
      break;
    case 'W':
      wayPoint[1] -= value;
      break;
    default:
  }
}

function shipNavigator(directions) {
  const shipPosition = [0, 0]; // n-s and w-e pos
  const wayPoint = [1, 10];
  directions.forEach((instruction) => {
    const operation = instruction[0];
    const value = instruction[1];
    if (operation === 'F') {
      shipPosition[0] += wayPoint[0] * value;
      shipPosition[1] += wayPoint[1] * value;
    } else if (operation === 'L') {
      const rotateTimes = value / 90;
      for (let i = 0; i < rotateTimes; i += 1) {
        const tempWaypoint = [...wayPoint];
        wayPoint[0] = tempWaypoint[1];
        wayPoint[1] = -tempWaypoint[0];
      }
      // console.log(`turn ${rotateTimes} right, new wayPoint ${wayPoint}`);
    } else if (operation === 'R') {
      const rotateTimes = value / 90;
      for (let i = 0; i < rotateTimes; i += 1) {
        const tempWaypoint = [...wayPoint];
        wayPoint[0] = -tempWaypoint[1];
        wayPoint[1] = tempWaypoint[0];
      }
      // console.log(`turn ${rotateTimes} right, new wayPoint ${wayPoint}`);
    } else {
      moveTo(operation, value, wayPoint);
    }
  });
  const distance = Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]);
  console.log(shipPosition);
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
