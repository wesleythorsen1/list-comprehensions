const Benchmark = require('benchmark');
const _ = require('lodash');
const underscore = require('underscore');
const { Enumerable } = require('@bussin/list-comprehensions');

const data = Array.from({ length: 100_000 }, (j, i) => i);
const square = x => x * x;

exports.map = new Benchmark.Suite('map')
  .add('Native Array', function () {
    const result = data.map(square);
  })
  .add('Enumerable', function () {
    const result = Enumerable.from(data).select(square).toArray();
  })
  .add('Lodash', function () {
    const result = _.map(data, square);
  })
  .add('Underscore', function () {
    const result = underscore.map(data, square);
  });
