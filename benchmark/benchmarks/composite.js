const Benchmark = require('benchmark');
const _ = require('lodash');
const underscore = require('underscore');
const { Enumerable } = require('@bussin/list-comprehensions');

const data = Array.from({ length: 100_000 }, (j, i) => i);
const square = x => x * x;
const isEven = x => x % 2 === 0;
const multiply = (x, y) => x * y;

exports.composite = new Benchmark.Suite('composite')
  .add('Native Array', function () {
    const result = data.filter(isEven).map(square).map(multiply).filter(isEven);
  })
  .add('Enumerable', function () {
    const result = Enumerable.from(data)
      .where(isEven)
      .select(square)
      .select(multiply)
      .where(isEven)
      .toArray();
  })
  .add('Lodash', function () {
    const result = _.filter(data, isEven).map(square).map(multiply).filter(isEven);
  })
  .add('Underscore', function () {
    const result = underscore.filter(data, isEven).map(square).map(multiply).filter(isEven);
  });
