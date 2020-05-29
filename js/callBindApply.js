function calculate(addExtrea, two, th = 0) {
  console.log(addExtrea);
  console.log(this.a);
  return this.a + this.b + addExtrea - two + th;
}
let sum = {
  a: 10,
  b: 20
};
// console.log(calculate(sum));
// function borrowing
console.log("call", calculate.call({ a: 30, b: 40 }, 1, 1));

console.log("apply", calculate.apply({ a: 30, b: 40 }, [1, 1]));

let printSum = calculate.bind({ a: 30, b: 40 });
console.log("bind", printSum(1, 1));
console.log("bind", printSum(2, 1));
/**
 *polyfills of bind @function{CalculateBind}
 */
Function.prototype.CalculateBind = function(...args) {
  //console.log(this);
  console.log(args);
  let fun = this;
  return function(...ard) {
    console.log("ard", ard);
    let param = args.slice(1);
    return fun.apply(args[0], [...param, ...ard]);
  };
};

let calSum = calculate.CalculateBind({ a: 30, b: 40 }, 1, 3);
console.log(calSum(6));
