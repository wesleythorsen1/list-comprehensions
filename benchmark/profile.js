// require('@bussin/list-comprehensions/extensions/Array');
// const microtime = require('microtime');
const { Duration } = require('luxon');
const { Enumerable } = require('@bussin/list-comprehensions');

// const data = Array.from({ length: 10_000_000 }, (j, i) => i);

// (async () => {
//   for (let i = 0; i < 50; i++) {
//     const start = Date.now();

//     const result = Enumerable.range(0, 500_000_000)
//       .where(x => x % 2 === 0)
//       .select(x => x * x)
//       .select((x, i) => x - i * i)
//       .where(x => x % 2 === 0)
//       .toArray();

//     console.log(i, 'duration', Duration.fromMillis(Date.now() - start).toISOTime());
//   }

//   console.log('done');
// })();

const start = Date.now();

const result = Enumerable.range(0, 100_000_000)
  .where(x => x % 2 === 0)
  .select(x => x * x)
  .select((x, i) => x - i * i)
  .where(x => x % 2 === 0)
  .toArray();

console.log('duration', Duration.fromMillis(Date.now() - start).toISOTime());

// const start = Date.now();

// const result = Array.from({ length: 10_000_000 }, (j, i) => i)
//   .filter(x => x % 2 === 0)
//   .map(x => x * x)
//   .map((x, i) => x - i * i)
//   .filter(x => x % 2 === 0);

// console.log('duration', Duration.fromMillis(Date.now() - start).toISOTime());
