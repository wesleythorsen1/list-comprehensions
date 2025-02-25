import { Enumerable } from './Enumerable';
import { IEnumerable } from './IEnumerable';
import * as methods from './methods';
import { Comparable, Grouping, IsKeyValuePair } from './types';

// export abstract class EnumerableArray<T> extends Enumerable<T> implements Array<T> {
export abstract class EnumerableArray<T> implements IEnumerable<T> {
  abstract all(predicate: (element: T) => boolean): boolean;
  abstract any(): boolean;
  abstract any(predicate: (element: T) => boolean): boolean;
  abstract any(predicate?: unknown): boolean;
  abstract append(value: T): IEnumerable<T>;
  abstract asEnumerable(): IEnumerable<T>;
  abstract chunk(size: number): IEnumerable<IEnumerable<T>>;
  abstract concat(enumerable: IEnumerable<T>): IEnumerable<T>;
  abstract contains(value: T): boolean;
  abstract contains(value: T, comparer: (x: T, y: T) => boolean): boolean;
  abstract contains(value: unknown, comparer?: unknown): boolean;
  abstract count(): number;
  abstract count(predicate: (element: T) => boolean): number;
  abstract count(predicate?: unknown): number;
  abstract countBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<[TKey, number]>;
  abstract countBy<TKey>(
    keySelector: (element: T) => TKey,
    comparer: (x: TKey, y: TKey) => boolean,
  ): IEnumerable<[TKey, number]>;
  abstract groupBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<Grouping<TKey, T>>;
  abstract groupBy<TKey, TValue>(
    keySelector: (element: T) => TKey,
    valueSelector: (element: T) => TValue,
  ): IEnumerable<Grouping<TKey, TValue>>;
  abstract minBy<TValue extends Comparable>(valueSelector: (element: T) => TValue): T | null;
  abstract minBy<TValue>(
    valueSelector: (element: T) => TValue,
    comparer: (x: TValue, y: TValue) => number,
  ): T | null;
  abstract minBy(valueSelector: unknown, comparer?: unknown): T | null;
  abstract select<TResult>(selector: (element: T) => TResult): IEnumerable<TResult>;
  abstract select<TResult>(selector: (element: T, i: number) => TResult): IEnumerable<TResult>;
  abstract selectMany<TResult>(
    selector: (element: T) => IEnumerable<TResult>,
  ): IEnumerable<TResult>;
  abstract selectMany<TResult>(
    selector: (element: T, i: number) => IEnumerable<TResult>,
  ): IEnumerable<TResult>;
  abstract skip(count: number): IEnumerable<T>;
  abstract take(count: number): IEnumerable<T>;
  abstract toArray(): T[];
  abstract toLookup<TKey>(keySelector: (element: T) => TKey): Map<TKey, IEnumerable<T>>;
  abstract toRecord: IsKeyValuePair<T> extends true
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
  abstract where(predicate: (element: T) => boolean): IEnumerable<T>;
  abstract where(predicate: (element: T, i: number) => boolean): IEnumerable<T>;
  abstract where(predicate: unknown): IEnumerable<T>;
  abstract [Symbol.iterator](): Iterator<T, any, any>;
  // select<TResult>(selector: (element: T) => TResult): IEnumerable<TResult>;
  // select<TResult>(selector: (element: T, i: number) => TResult): IEnumerable<TResult>;
  // select(selector: unknown): IEnumerable<TResult> | IEnumerable<TResult> {
  //   return this.map(selector);
  // }
  // select<TResult>(selector: (element: T) => TResult): IEnumerable<TResult>;
  // select<TResult>(selector: (element: T, i: number) => TResult): IEnumerable<TResult> {
  //   const result = this.map(selector);
  //   return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<TResult>;
  // }
}
