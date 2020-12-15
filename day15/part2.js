function playMemory() {
  const numbers = ['X', 0, 3, 6];
  const uniqueObj = {
    0: [1],
    3: [2],
    6: [3],
  };
  for (let rounds = numbers.length; rounds <= 30000000; rounds += 1) {
    const lastNumberCalled = numbers[rounds - 1];
    const lastNumberObj = uniqueObj[lastNumberCalled];
    if (lastNumberObj.length > 1) {
      const arrLength = lastNumberObj.length;
      const newNumber = lastNumberObj[arrLength - 1] - lastNumberObj[arrLength - 2];
      numbers[rounds] = newNumber;
      if (uniqueObj[newNumber] !== undefined) {
        uniqueObj[newNumber].push(rounds);
      } else {
        uniqueObj[newNumber] = [rounds];
      }
    } else {
      numbers[rounds] = 0;
      uniqueObj[0].push(rounds);
    }
  }
  console.log(numbers[30000000]);
}

try {
  // let data = utils.readInput('./example.txt');
  // let data = utils.readInput('./input.txt');
  // data = utils.modDataCommas(data);

  playMemory();
} catch (e) {
  console.log('Error', e.stack);
}
