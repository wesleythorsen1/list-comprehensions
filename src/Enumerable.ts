import { IEnumerable } from './IEnumerable';
import * as methods from './methods';
import { IsKeyValuePair } from './types';

export abstract class Enumerable<T> implements IEnumerable<T> {
  protected constructor(protected readonly source: Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  static from<T>(source: Iterable<T>): IEnumerable<T> {
    return new Enumerable(source);
  }

  // static
  static range = methods.range;
  static repeat = methods.repeat;
  static empty = methods.empty;

  // instance
  // aggregate = methods.aggregate;
  all = methods.all;
  any = methods.any;
  append = methods.append;
  asEnumerable = methods.asEnumerable;
  chunk = methods.chunk;
  concat = methods.concat;
  contains = methods.contains;
  count = methods.count;
  countBy = methods.countBy;
  // distinct = methods.distinct;
  // distinctBy = methods.distinctBy;
  // first = methods.first;
  // firstBy = methods.firstBy;
  // firstOrDefault = methods.firstOrDefault;
  // firstOrDefaultBy = methods.firstOrDefaultBy;
  // groupBy = methods.groupBy;
  // intersect = methods.intersect;
  // intersectBy = methods.intersectBy;
  // leftJoin = methods.leftJoin;
  // max = methods.max;
  // maxBy = methods.maxBy;
  min = methods.min;
  minBy = methods.minBy;
  select = methods.select;
  selectMany = methods.selectMany;
  skip = methods.skip;
  take = methods.take;
  toArray = methods.toArray;
  toLookup = methods.toLookup;
  // toMap = methods.toMap;
  // toRecord: IsKeyValuePair<T> extends true
  //   ? <TKey extends string | number | symbol, TValue>(
  //       this: IEnumerable<[TKey, TValue]>,
  //     ) => Record<TKey, TValue>
  //   : never = methods.toRecord as any;
  toRecord: IsKeyValuePair<T> extends true
    ? {
        <TKey extends string | number | symbol, TValue>(
          this: IEnumerable<[TKey, TValue]>,
        ): Record<TKey, TValue>;
        <TKey extends string | number | symbol>(
          this: IEnumerable<T>,
          keySelector: (element: T) => TKey,
        ): Record<TKey, T>;
        <TKey extends string | number | symbol, TValue>(
          this: IEnumerable<T>,
          keySelector: (element: T) => TKey,
          valueSelector: (element: T) => TValue,
        ): Record<TKey, TValue>;
      }
    : {
        <TKey extends string | number | symbol>(
          this: IEnumerable<T>,
          keySelector: (element: T) => TKey,
        ): Record<TKey, T>;
        <TKey extends string | number | symbol, TValue>(
          this: IEnumerable<T>,
          keySelector: (element: T) => TKey,
          valueSelector: (element: T) => TValue,
        ): Record<TKey, TValue>;
      } = methods.toRecord as any;
  // toSet = methods.toSet;
  // union = methods.union;
  // unionBy = methods.unionBy;
  where = methods.where;
}

// Enumerable.prototype.aggregate = methods.aggregate;
Enumerable.prototype.all = methods.all;
Enumerable.prototype.any = methods.any;
Enumerable.prototype.append = methods.append;
Enumerable.prototype.asEnumerable = methods.asEnumerable;
Enumerable.prototype.chunk = methods.chunk;
Enumerable.prototype.concat = methods.concat;
Enumerable.prototype.contains = methods.contains;
Enumerable.prototype.count = methods.count;
Enumerable.prototype.countBy = methods.countBy;
// Enumerable.prototype.distinct = methods.distinct;
// Enumerable.prototype.distinctBy = methods.distinctBy;
// Enumerable.prototype.first = methods.first;
// Enumerable.prototype.firstBy = methods.firstBy;
// Enumerable.prototype.firstOrDefault = methods.firstOrDefault;
// Enumerable.prototype.firstOrDefaultBy = methods.firstOrDefaultBy;
// Enumerable.prototype.groupBy = methods.groupBy;
// Enumerable.prototype.intersect = methods.intersect;
// Enumerable.prototype.intersectBy = methods.intersectBy;
// Enumerable.prototype.leftJoin = methods.leftJoin;
// Enumerable.prototype.max = methods.max;
// Enumerable.prototype.maxBy = methods.maxBy;
Enumerable.prototype.min = methods.min;
Enumerable.prototype.minBy = methods.minBy;
Enumerable.prototype.select = methods.select;
Enumerable.prototype.selectMany = methods.selectMany;
Enumerable.prototype.skip = methods.skip;
Enumerable.prototype.take = methods.take;
Enumerable.prototype.toArray = methods.toArray;
// Enumerable.prototype.toLookup = methods.toLookup;
// Enumerable.prototype.toMap = methods.toMap;
Enumerable.prototype.toRecord = methods.toRecord;
// Enumerable.prototype.toSet = methods.toSet;
// Enumerable.prototype.union = methods.union;
// Enumerable.prototype.unionBy = methods.unionBy;
Enumerable.prototype.where = methods.where;
