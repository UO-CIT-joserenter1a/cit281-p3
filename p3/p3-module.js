//CIT 281 Project 3
// Author: Jose Renteria

module.exports = {
    validDenomination: validDenomination,
    valueFromCoinObject: valueFromCoinObject,
    valueFromArray: valueFromArray,
    coinCount: coinCount
};

function validDenomination(coin) {
    return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
  }

function valueFromCoinObject(obj) {
    const { denom = 0, count = 0 } = obj;
    return denom * count;
  }
  
  function valueFromArray(arr) {
    const flattened = arr.flat();
    return flattened.reduce((total, coin) => total + valueFromCoinObject(coin), 0);
  }
  
  function coinCount(...coinage)
  {
    return valueFromArray(coinage)
  }

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));  // Extra credit