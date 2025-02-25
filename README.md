# @bussin/list-comprehensions

[![NPM Version](https://img.shields.io/npm/v/@bussin/list-comprehensions)](https://npmjs.com/package/@bussin/list-comprehensions) [![NPM Version](https://img.shields.io/npm/dw/@bussin/list-comprehensions)](https://npmjs.com/package/@bussin/list-comprehensions) [![NPM Version](https://img.shields.io/bundlephobia/min/@bussin/list-comprehensions)](https://npmjs.com/package/@bussin/list-comprehensions)

A strongly typed list comprehension library built with TypeScript. Uses deferred execution for more performant operations. Provides prototype extensions on all `Iterable<T>` NodeJS classes for more fluent use (`Array`, `Map`, `Set`, etc., this is strictly opt-in). Inspired by [LINQ](https://learn.microsoft.com/en-us/dotnet/csharp/linq/).

License: [MIT](https://opensource.org/licenses/MIT)

## Installation

    npm install @bussin/list-comprehensions

## Quick Start

```TypeScript
// Extend the `Array<T>` prototype (optional)
import '@bussin/list-comprehensions/extensions/Array';

const numbers = [1, 2, 3, 4, 5];

// The `where` and `select` methods build up a query but don't run until you call `toArray()` (deferred execution).
const result = numbers
  .where(n => n > 2)       // Filters numbers greater than 2
  .select(n => n * n)      // Squares each remaining number
  .toArray();              // Materializes the result

console.log(result); // [9, 16, 25]

console.log(results.any(n => n > 100)) // false
console.log(results.all(n => n > 0)) // true
```

Without extending the Array<T> prototype:

```TypeScript
import { Enumerable } from '@bussin/list-comprehensions';

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 20 },
  { name: 'Carol', age: 30 },
  { name: 'David', age: 15 },
];

const namesOfAdults = Enumerable
  .from(people)                      // Converts Array<People> to Enumerable<People>
  .where(person => person.age >= 18) // Filters people older than 18
  .select(person => person.name)     // Selects the persons' name
  .toArray();                        // Materializes the result

console.log(namesOfAdults); // ['Alice', 'Bob', 'Carol']

const youngest = Enumerable
  .from(people)                 // Converts Array<People> to Enumerable<People>
  .minBy(person => person.age); // Gets the youngest person

console.log(youngest.name); // 'David'
```

## Methods

(work in progress)

- [x] aggregate
- [x] aggregateBy
- [ ] [all](./src/methods/all.ts)
- [ ] [any](./src/methods/any.ts)
- [ ] [append](./src/methods/append.ts)
- [x] asEnumerable
- [x] average
- [x] cast
- [ ] [chunk](./src/methods/chunk.ts)
- [ ] [concat](./src/methods/concat.ts)
- [ ] [contains](./src/methods/contains.ts)
- [ ] [count](./src/methods/count.ts)
- [ ] [countBy](./src/methods/countBy.ts)
- [x] defaultIfEmpty
- [x] distinct
- [x] distinctBy
- [x] elementAt
- [x] elementAtOrDefault
- [x] empty
- [x] except
- [x] exceptBy
- [x] first
- [x] firstOrDefault
- [x] groupBy
- [x] groupJoin
- [x] index
- [x] intersect
- [x] intersectBy
- [x] join
- [x] last
- [x] lastOrDefault
- [x] longCount
- [x] max
- [x] maxBy
- [x] min
- [ ] [minBy](./src/methods/minBy.ts)
- [x] ofType
- [x] order
- [x] orderBy
- [x] orderByDescending
- [x] orderDescending
- [x] prepend
- [ ] [range](./src/methods/range.ts)
- [ ] [repeat](./src/methods/repeat.ts)
- [ ] [reverse](./src/methods/reverse.ts)
- [ ] [select](./src/methods/select.ts)
- [ ] [selectMany](./src/methods/selectMany.ts)
- [x] sequenceEqual
- [x] single
- [x] singleOrDefault
- [ ] [skip](./src/methods/skip.ts)
- [x] skipLast
- [x] skipWhile
- [x] sum
- [ ] [take](./src/methods/take.ts)
- [x] takeLast
- [x] takeWhile
- [x] thenBy
- [x] thenByDescending
- [x] toArray
- [x] toList
- [x] toLookup
- [x] toMap
- [ ] [toRecord](./src/methods/toRecord.ts)
- [x] toSet
- [x] tryGetNonEnumeratedCount
- [x] union
- [x] unionBy
- [ ] [where](./src/methods/where.ts)
- [x] zip

## Support

Please create a PR if you find any missing functionality that you's like to add. For bugs, please use the [issues tracker](https://github.com/wesleythorsen1/list-comprehensions/issues). I'll be happy to help you!
