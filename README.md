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

- [ ] aggregate
- [ ] aggregateBy
- [x] [all](./src/methods/all.ts)
- [x] [any](./src/methods/any.ts)
- [x] [append](./src/methods/append.ts)
- [ ] asEnumerable
- [ ] average
- [ ] cast
- [x] [chunk](./src/methods/chunk.ts)
- [x] [concat](./src/methods/concat.ts)
- [x] [contains](./src/methods/contains.ts)
- [x] [count](./src/methods/count.ts)
- [x] [countBy](./src/methods/countBy.ts)
- [ ] defaultIfEmpty
- [ ] distinct
- [ ] distinctBy
- [ ] elementAt
- [ ] elementAtOrDefault
- [ ] empty
- [ ] except
- [ ] exceptBy
- [ ] first
- [ ] firstOrDefault
- [ ] groupBy
- [ ] groupJoin
- [ ] index
- [ ] intersect
- [ ] intersectBy
- [ ] join
- [ ] last
- [ ] lastOrDefault
- [ ] longCount
- [ ] max
- [ ] maxBy
- [ ] min
- [x] [minBy](./src/methods/minBy.ts)
- [ ] ofType
- [ ] order
- [ ] orderBy
- [ ] orderByDescending
- [ ] orderDescending
- [ ] prepend
- [x] [range](./src/methods/range.ts)
- [x] [repeat](./src/methods/repeat.ts)
- [x] [reverse](./src/methods/reverse.ts)
- [x] [select](./src/methods/select.ts)
- [x] [selectMany](./src/methods/selectMany.ts)
- [ ] sequenceEqual
- [ ] single
- [ ] singleOrDefault
- [x] [skip](./src/methods/skip.ts)
- [ ] skipLast
- [ ] skipWhile
- [ ] sum
- [x] [take](./src/methods/take.ts)
- [ ] takeLast
- [ ] takeWhile
- [ ] thenBy
- [ ] thenByDescending
- [ ] toArray
- [ ] toList
- [ ] toLookup
- [ ] toMap
- [x] [toRecord](./src/methods/toRecord.ts)
- [ ] toSet
- [ ] tryGetNonEnumeratedCount
- [ ] union
- [ ] unionBy
- [x] [where](./src/methods/where.ts)
- [ ] zip

## Support

Please create a PR if you find any missing functionality that you's like to add. For bugs, please use the [issues tracker](https://github.com/wesleythorsen1/list-comprehensions/issues). I'll be happy to help you!
