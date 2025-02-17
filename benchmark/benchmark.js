const Benchmark = require('benchmark');
const _ = require('lodash');
const underscore = require('underscore');
require('@bussin/list-comprehensions/extensions/Array');

const data = Array.from({ length: 10000 }, (j, i) => i);

// Create benchmark suite
const suite = new Benchmark.Suite();

suite
  .add('Native Array filter', function () {
    data
      .filter(x => x % 2 === 0)
      .map(x => x * x)
      .map((x, i) => x - i * i)
      .filter(x => x % 2 === 0);
  })
  // .add('Enumerable where', function () {
  //   Enumerable.from(data)
  //     .where(x => x % 2 === 0)
  //     .toArray();
  // })
  .add('Enumerable where', function () {
    data
      .where(x => x % 2 === 0)
      .select(x => x * x)
      .select((x, i) => x - i * i)
      .where(x => x % 2 === 0)
      .toArray();
  })
  .add('Lodash filter', function () {
    _.filter(data, x => x % 2 === 0)
      .map(x => x * x)
      .map((x, i) => x - i * i)
      .filter(x => x % 2 === 0);
  })
  .add('Underscore filter', function () {
    underscore
      .filter(data, x => x % 2 === 0)
      .map(x => x * x)
      .map((x, i) => x - i * i)
      .filter(x => x % 2 === 0);
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
