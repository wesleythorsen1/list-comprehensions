import { Comparable, Grouping, IsKeyValuePair, Operation } from './types';

export interface IEnumerable<T> extends Iterable<T> {
  operations: Operation[];

  all(predicate: (element: T) => boolean): boolean;
  any(): boolean;
  any(predicate: (element: T) => boolean): boolean;
  append(value: T): IEnumerable<T>;
  asEnumerable(): IEnumerable<T>;
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
  groupBy<TKey, TValue = T>(keySelector: (element: T) => TKey): IEnumerable<Grouping<TKey, TValue>>;
  groupBy<TKey, TValue>(
    keySelector: (element: T) => TKey,
    valueSelector: (element: T) => TValue,
  ): IEnumerable<Grouping<TKey, TValue>>;
  max: T extends Comparable ? () => T | null : never;
  maxBy<TValue extends Comparable>(valueSelector: (element: T) => TValue): T | null;
  maxBy<TValue>(
    valueSelector: (element: T) => TValue,
    comparer: (x: TValue, y: TValue) => number,
  ): T | null;
  min: T extends Comparable ? () => T | null : never;
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
  toLookup<TKey extends string | number | symbol, TValue>(
    keySelector: (element: T) => TKey,
  ): Map<TKey, IEnumerable<TValue>>;
  toLookup<TKey extends string | number | symbol, TValue>(
    keySelector: (element: T) => TKey,
    valueSelector: (element: T) => TValue,
  ): Map<TKey, IEnumerable<TValue>>;
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
      };
  where(predicate: (element: T) => boolean): IEnumerable<T>;
  where(predicate: (element: T, i: number) => boolean): IEnumerable<T>;
}
