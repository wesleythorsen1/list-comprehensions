const { writeFileSync } = require('fs');
const { composite, filter, map } = require('./benchmarks');
const package = require('./package.json');

const blcVersion = package.dependencies['@bussin/list-comprehensions'].replace(/^[\^\~]/g, '');

(async () => {
  const output = [
    {
      suite: 'suite',
      name: 'name',
      ops_sec: 'ops/sec',
      variance: 'variance',
      samples: 'samples',
    },
  ];

  for (const suite of [composite, filter, map]) {
    console.log(`Running ${suite.name}`);

    await new Promise(resolve => {
      suite
        .on('cycle', function (event) {
          console.log(String(event.target));
        })
        .on('complete', function () {
          output.push(
            ...this.map(r => ({
              suite: suite.name,
              name: r.name,
              ops_sec: r.hz,
              variance: r.stats.rme,
              samples: r.stats.sample.length,
            })),
          );

          resolve();
        })
        .run({ async: true });
    });
  }

  const fileOutput = output
    .map(o => `${o.suite},${o.name},${o.ops_sec},${o.variance},${o.samples}`)
    .join('\n');

  writeFileSync(`./benchmark/results/${Date.now()}.${blcVersion}.csv`, fileOutput);

  console.log('done');
})();
