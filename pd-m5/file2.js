const { a: a1 } = require('./file1');
const { a: a3 } = require('./file3');

// const { add } = require('./utils/add');
// const { sub } = require('./utils/sub');

const { add: x, sub: y } = require('./utils');

console.log(a1);
console.log(a3);

console.log("Addition:", x(a1, a3));
console.log("Subtraction:", y(a3, a1));
