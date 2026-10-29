// let n = 5;

// for(let i=1;i<n;i++){
//     console.log(i);
// }

// // console.log(process.argv)
// const args = process.argv;

// for(let i=0;i<args.length;i++){
//     console.log(args[i]);
// }



//! require

//? only one value
// const someValue = require('./math');
// console.log(someValue);

//? importing object 
// const math = require('./math');
// console.log(math)
// console.log(math.sum(1,2))
// console.log(math.mul(1,2))
// console.log(math.g)
// console.log(math.PI)

//? importing multiple module from fruits 
const fruits = require("./fruits/index");

console.log(fruits);