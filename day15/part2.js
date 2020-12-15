function playMemory() {
  let lastCall = 7;
  const uniqueObj = {
    12: [1],
    20: [2],
    0: [3],
    6: [4],
    1: [5],
    17: [6],
    7: [7],
  };
  for (let rounds = 8; rounds <= 30000000; rounds += 1) {
    console.log(rounds);
    const lastNumberObj = uniqueObj[lastCall];
    if (lastNumberObj.length > 1) {
      const arrLength = lastNumberObj.length;
      const newNumber = lastNumberObj[arrLength - 1] - lastNumberObj[arrLength - 2];
      lastCall = newNumber;
      if (uniqueObj[newNumber] !== undefined) {
        uniqueObj[newNumber].push(rounds);
      } else {
        uniqueObj[newNumber] = [rounds];
      }
    } else {
      lastCall = 0;
      uniqueObj[0].push(rounds);
    }
  }
  console.log('----------');
  console.log(lastCall);
}

try {
  // let data = utils.readInput('./example.txt');
  // let data = utils.readInput('./input.txt');
  // data = utils.modDataCommas(data);

  playMemory();
} catch (e) {
  console.log('Error', e.stack);
}
