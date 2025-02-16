// import { IEnumerable } from '../IEnumerable';

// export function aggregate<TSource>(
//   this: IEnumerable<TSource>,
//   accumulator: (accumulate: TSource, element: TSource) => TSource,
// ): TSource;
// export function aggregate<TSource, TAccumulate>(
//   this: IEnumerable<TSource>,
//   seed: TAccumulate,
//   accumulator: (accumulate: TAccumulate, element: TSource) => TAccumulate,
// ): TAccumulate;
// export function aggregate<TSource, TAccumulate, TResult = TAccumulate>(
//   this: IEnumerable<TSource>,
//   seed: TAccumulate,
//   accumulator: (accumulate: TAccumulate, element: TSource) => TAccumulate,
//   resultSelector: (accumulate: TAccumulate) => TResult,
// ): TResult {
//   for (const element of this) {
//     seed = accumulator(seed, element);
//   }

//   return resultSelector(seed);
// }

import { IEnumerable } from '../IEnumerable';

export function aggregate<TSource>(
  this: IEnumerable<TSource>,
  accumulator: (accumulate: TSource, element: TSource) => TSource,
): TSource;
export function aggregate<TSource, TAccumulate>(
  this: IEnumerable<TSource>,
  seed: TAccumulate,
  accumulator: (accumulate: TAccumulate, element: TSource) => TAccumulate,
): TAccumulate;
export function aggregate<TSource, TAccumulate, TResult>(
  this: IEnumerable<TSource>,
  seed: TAccumulate,
  accumulator: (accumulate: TAccumulate, element: TSource) => TAccumulate,
  resultSelector: (accumulate: TAccumulate) => TResult,
): TResult;

export function aggregate<TSource, TAccumulate, TResult>(
  this: IEnumerable<TSource>,
  seed_or_accumulator: TAccumulate | ((accumulate: TSource, element: TSource) => TSource),
  accumulator?: (accumulate: TAccumulate, element: TSource) => TAccumulate,
  resultSelector?: (accumulate: TAccumulate) => TResult,
): any {
  if (arguments.length === 1) {
    /*

    function aggregate<TSource>(
      this: IEnumerable<TSource>,
      accumulator: (accumulate: TSource, element: TSource) => TSource,
    ): TSource;

    */
    return aggregate_internal(this, seed_or_accumulator, this.skip(1), x => x);
  }

  if (arguments.length === 2) {
    /*
    function aggregate<TSource>(
      this: IEnumerable<TSource>,
      accumulator: (accumulate: TSource, element: TSource) => TSource,
    ): TSource;
    */
    return aggregate_internal();
  }

  if (arguments.length === 3) {
    return aggregate_internal();
  }

  throw new Error('aggregate invalid number of arguments');

  if (arguments.length === 1) {
    // Only accumulator provided.
    // Use the first element of the sequence as the seed.
    const iterator = this[Symbol.iterator]();
    const first = iterator.next();
    if (first.done) {
      throw new Error('Sequence contains no elements');
    }
    seed = first.value;
    accumulator = arg1;
    resultSelector = (x: any) => x;
    for (const element of iterator) {
      seed = accumulator(seed, element);
    }
  } else if (arguments.length === 2) {
    // Seed and accumulator provided.
    seed = arg1;
    accumulator = arg2;
    resultSelector = (x: any) => x;
    for (const element of this) {
      seed = accumulator(seed, element);
    }
  } else {
    // Seed, accumulator, and resultSelector provided.
    seed = arg1;
    accumulator = arg2;
    resultSelector = arg3;
    for (const element of this) {
      seed = accumulator(seed, element);
    }
  }

  return resultSelector(seed);
}

function aggregate_internal<TSource, TAccumulate, TResult>(
  this: IEnumerable<TSource>,
  seed: TAccumulate,
  accumulator: (accumulate: TAccumulate, element: TSource) => TAccumulate,
  resultSelector: (accumulate: TAccumulate) => TResult,
): TResult {
  for (const element of this) {
    seed = accumulator(seed, element);
  }

  return resultSelector(seed);
}
