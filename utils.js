const fs = require('fs');


module.exports = {
  trimData: data => data.map(item => item.trim()),
  calcManhattandistance:
  (a, b) => ((Math.abs(a[0]) - Math.abs(b[0])) + (Math.abs(a[1]) - Math.abs(b[1]))),
  modDataNewline: (data) => {
    const formatData = data.split('\n').map(item => parseInt(item.trim(), 10));
    return formatData;
  },
  modDataNewlineStr: (data) => {
    const formatData = data.split('\n').map(item => item.trim());
    return formatData;
  },
  modDataCommas: (data) => {
    const formatData = data.split(',').map(item => parseInt(item.trim(), 10));
    return formatData;
  },
  readInput: (path) => {
    try {
      const data = fs.readFileSync(path, 'utf8');
      return data;
    } catch (e) {
      console.log('Error:', e.stack);
    }
    return false;
  },
};
