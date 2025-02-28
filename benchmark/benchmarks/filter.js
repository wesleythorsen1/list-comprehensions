const Benchmark = require('benchmark');
const _ = require('lodash');
const underscore = require('underscore');
const { Enumerable } = require('@bussin/list-comprehensions');

const data = Array.from({ length: 100_000 }, (j, i) => i);
const isEven = x => x % 2 === 0;

exports.filter = new Benchmark.Suite('filter')
  .add('Native Array', function () {
    const result = data.filter(isEven);
  })
  .add('Enumerable', function () {
    const result = Enumerable.from(data).where(isEven).toArray();
  })
  .add('Lodash', function () {
    const result = _.filter(data, isEven);
  })
  .add('Underscore', function () {
    const result = underscore.filter(data, isEven);
  });
