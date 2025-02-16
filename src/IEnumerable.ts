import { Comparable } from './types';

export interface IEnumerable<T> extends Iterable<T> {
  // aggregate(accumulator: (accumulate: T, element: T) => T): T;
  // aggregate<TAccumulate>(
  //   seed: TAccumulate,
  //   accumulator: (accumulate: TAccumulate, element: T) => TAccumulate,
  // ): TAccumulate;
  // aggregate<TAccumulate, TResult>(
  //   seed: TAccumulate,
  //   accumulator: (accumulate: TAccumulate, element: T) => TAccumulate,
  //   resultSelector: (accumulate: TAccumulate) => TResult,
  // ): TResult;

  all(predicate: (element: T) => boolean): boolean;
  any(): boolean;
  any(predicate: (element: T) => boolean): boolean;
  append(value: T): IEnumerable<T>;
  chunk(size: number): IEnumerable<IEnumerable<T>>;
  concat(enumerable: IEnumerable<T>): IEnumerable<T>;
  contains(value: T): boolean;
  contains(value: T, comparer: (x: T, y: T) => boolean): boolean;
  count(): number;
  count(predicate: (element: T) => boolean): number;
  countBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<[TKey, number]>;
  countBy<TKey>(
    keySelector: (element: T) => TKey,
    comparer: (x: TKey, y: TKey) => boolean,
  ): IEnumerable<[TKey, number]>;
  // distinct;
  // distinctBy;
  // first;
  // firstBy;
  // firstOrDefault;
  // firstOrDefaultBy;
  // groupBy;
  // intersect;
  // intersectBy;
  // leftJoin;
  // max;
  // maxBy;
  // min;
  minBy<TValue extends Comparable>(valueSelector: (element: T) => TValue): T | null;
  minBy<TValue>(
    valueSelector: (element: T) => TValue,
    comparer: (x: TValue, y: TValue) => number,
  ): T | null;
  select<TResult>(selector: (element: T) => TResult): IEnumerable<TResult>;
  select<TResult>(selector: (element: T, i: number) => TResult): IEnumerable<TResult>;
  selectMany<TResult>(selector: (element: T) => IEnumerable<TResult>): IEnumerable<TResult>;
  selectMany<TResult>(
    selector: (element: T, i: number) => IEnumerable<TResult>,
  ): IEnumerable<TResult>;
  skip(count: number): IEnumerable<T>;
  take(count: number): IEnumerable<T>;
  toArray(): T[];
  // toLookup;
  // toMap;
  // toSet;
  // union;
  // unionBy;
  where(predicate: (element: T) => boolean): IEnumerable<T>;
  where(predicate: (element: T, i: number) => boolean): IEnumerable<T>;
}
