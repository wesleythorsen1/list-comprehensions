import { compileOperations } from './code-gen';
import { IEnumerable } from './IEnumerable';
import * as methods from './methods';
import { Comparable, Grouping, IsKeyValuePair, Operation } from './types';

export class Enumerable<T> implements IEnumerable<T> {
  public operations: Operation[] = [];

  protected constructor(protected readonly source: Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    const sourceArr = Array.from(this.source);

    if (this.operations.length === 0) {
      return sourceArr[Symbol.iterator]();
    }

    const fusedFn = compileOperations(this.operations);

    this.operations = [];

    const resultArr = fusedFn(sourceArr);

    return resultArr[Symbol.iterator]();
  }

  // static
  static from<T>(source: Iterable<T>): IEnumerable<T> {
    return new Enumerable(source);
  }

  static range = methods.range;
  static repeat = methods.repeat;
  static empty = methods.empty;

  // instance
  all = methods.all;
  any = methods.any;
  append = methods.append;
  asEnumerable = methods.asEnumerable;
  chunk = methods.chunk;
  concat = methods.concat;
  contains = methods.contains;
  count = methods.count;
  countBy = methods.countBy;
  groupBy = methods.groupBy;
  max: T extends Comparable ? () => T | null : never = methods.max as any;
  maxBy = methods.maxBy;
  min: T extends Comparable ? () => T | null : never = methods.min as any;
  minBy = methods.minBy;
  select = methods.select;
  selectMany = methods.selectMany;
  skip = methods.skip;
  take = methods.take;
  toArray = methods.toArray;
  toLookup = methods.toLookup;
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
  where = methods.where;
}
