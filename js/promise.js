/**
 * 1. example
 * @function calculateSum
 *  */
function calculateSum(a, b) {
  setTimeout(() => {
    // console.log(a + b);
  }, 0);
}
calculateSum(10, 20);
// console.log("which will call 1st");

/**
 * 2. example
 * @function calculateSum1 with promise
 */
a = 10;
function calculateSum1(b, c) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.a + b + c);
    }, 0);
  });
}
// calculateSum1(10, 20).then(res => console.log(res));
// console.log("which will call 1st");

/**
 * 3. example
 * @function calculateSum2 with promise ALL
 */
a = 10;
cal = function calculateSum2(b, c) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (this.a + b + c == 3) {
        // reject("error some is 3"); // prmoise all fail the resposne if sum is 3 and we can't
        //get other passed respponse
      }
      resolve(this.a + b + c);
    }, 0);
  });
};
const sum = [
  // cal(2, 3).then(res => console.log(res)),
  // cal.apply({ a: 2 }, [2, 2]).then(res => console.log(res)),
  //  cal.apply({ a: 1 }, [1, 1]).then(res => console.log(res)),
  cal.apply({ a: 2 }, [2, 2])
];
// Promise.all(sum)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(error => console.log(error));

/**
 * 3. example
 * @function calculateSum3 with promise race
 */
const sum1 = [
  cal(2, 3),
  cal.apply({ a: 2 }, [2, 2]),
  cal.apply({ a: 1 }, [1, 1]),
  cal.apply({ a: 2 }, [2, 2])
];
// Promise.race(sum1)
//   .then(res => {
//     console.log("race", res);
//   })
//   .catch(error => console.log(error));
/**
 * 4. example
 * @function calculateSum3 with promise all limit api calls lets say 2 at a time if any resposne then other 2
 */

function serialiApiCalls(immediate) {
  // This works as our promise queue
  let last = Promise.resolve();
  return function(...a) {
    // Catch is necessary here — otherwise a rejection in a promise will
    // break the serializer forever
    last = last.catch(() => {}).then(() => immediate(...a));
    return last;
  };
}

function limitApiCalls(api, limit) {
  console.log(
    "----limiter----OF:" +
      limit +
      " at a time if any finished then next " +
      limit +
      " in queue"
  );
  const limitCount = [];
  for (let i = 0; i < limit; i++) {
    limitCount.push(i);
  }
  const findWorker = serialiApiCalls(() => Promise.race(limitCount));
  const response = info => {
    return findWorker().then(i => {
      const promise = api(info);
      limitCount[i] = promise.then(
        () => i,
        () => i
      );
      return promise;
    });
  };
  return { response };
}
apiRequest = function calTimer(ar) {
  console.log(`API CALL START FOR ${ar.cal}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`API CALL FINISHED FOR ${ar.cal}`);
    }, ar.time);
  });
};
const AllAPICALLS = [
  { cal: "A", time: 4000 },
  { cal: "B", time: 4300 },
  { cal: "C", time: 5500 },
  { cal: "D", time: 2800 },
  { cal: "E", time: 2000 },
  { cal: "F", time: 2200 },
  { cal: "A1", time: 1000 },
  { cal: "B1", time: 1300 },
  { cal: "C1", time: 1500 },
  { cal: "D1", time: 1800 },
  { cal: "E1", time: 2000 },
  { cal: "F1", time: 2200 },
  { cal: "A2", time: 1000 },
  { cal: "B2", time: 1300 },
  { cal: "C2", time: 1500 },
  { cal: "D2", time: 1800 },
  { cal: "E2", time: 2000 },
  { cal: "F2", time: 2200 },
  { cal: "A3", time: 1000 },
  { cal: "B3", time: 1300 },
  { cal: "C3", time: 1500 },
  { cal: "D3", time: 1800 },
  { cal: "E3", time: 2000 },
  { cal: "F3", time: 2200 }
];
const limit = 3; // 3 api calls at a time;
const limiter = limitApiCalls(apiRequest, limit);

Promise.all(
  AllAPICALLS.map(row => limiter.response(row).then(res => console.log(res)))
);
