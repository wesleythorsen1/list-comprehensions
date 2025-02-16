# @bussin/list-comprehensions

[![NPM Version](https://img.shields.io/npm/v/@bussin/list-comprehensions)](https://npmjs.com/package/@bussin/list-comprehensions) [![NPM Version](https://img.shields.io/npm/dw/@bussin/list-comprehensions)](https://npmjs.com/package/@bussin/list-comprehensions) [![NPM Version](https://img.shields.io/bundlephobia/min/@bussin/list-comprehensions)](https://npmjs.com/package/@bussin/list-comprehensions)

A blazingly fast and strongly typed list comprehension library built with TypeScript. Uses deferred execution for extremely performant operations. Provides prototype extension on all Iterable NodeJS classes for more fluent use (`Array`, `Map`, `Set`, etc., this is optional, opt-in). Heavily influenced by C#'s [LINQ](https://learn.microsoft.com/en-us/dotnet/csharp/linq/) library.

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

- all
- any
- append
- batch
- concat
- count
- distinct
- distinctBy
- empty
- first
- firstBy
- firstOrDefault
- firstOrDefaultBy
- groupBy
- intersect
- intersectBy
- max
- maxBy
- min
- minBy
- range
- repeat
- select
- skip
- take
- toArray
- toLookup
- toMap
- toSet
- union
- unionBy
- where

## Support

Please create a PR if you find any missing functionality that you's like to add. For bugs, please use the [issues tracker](https://github.com/wesleythorsen1/list-comprehensions/issues). I'll be happy to help you!
