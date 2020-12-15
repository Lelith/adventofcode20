function playMemory() {
  let lastCall = 6;
  const uniqueObj = {
    0: [1],
    3: [2],
    6: [3],
  };
  for (let rounds = 4; rounds <= 2020; rounds += 1) {
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
