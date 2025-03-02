import type { IEnumerable } from "./IEnumerable.ts";
import type { Comparable } from "./types/Comparable.ts";
import type { IsKeyValuePair } from "./types/IsKeyValuePair.ts";
import { all } from "./methods/all.ts";
import { any } from "./methods/any.ts";
import { append } from "./methods/append.ts";
import { asEnumerable } from "./methods/asEnumerable.ts";
import { chunk } from "./methods/chunk.ts";
import { concat } from "./methods/concat.ts";
import { contains } from "./methods/contains.ts";
import { count } from "./methods/count.ts";
import { countBy } from "./methods/countBy.ts";
import { empty } from "./methods/empty.ts";
import { groupBy } from "./methods/groupBy.ts";
import { max } from "./methods/max.ts";
import { maxBy } from "./methods/maxBy.ts";
import { min } from "./methods/min.ts";
import { minBy } from "./methods/minBy.ts";
import { range } from "./methods/range.ts";
import { repeat } from "./methods/repeat.ts";
import { select } from "./methods/select.ts";
import { selectMany } from "./methods/selectMany.ts";
import { skip } from "./methods/skip.ts";
import { take } from "./methods/take.ts";
import { toArray } from "./methods/toArray.ts";
import { toLookup } from "./methods/toLookup.ts";
import { toRecord } from "./methods/toRecord.ts";
import { where } from "./methods/where.ts";

export class Enumerable<T> implements IEnumerable<T> {
  protected constructor(protected readonly source: Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  // static
  static from<T>(source: Iterable<T>): IEnumerable<T> {
    return new Enumerable(source);
  }

  static range = range;
  static repeat = repeat;
  static empty = empty;

  // instance
  all = all;
  any = any;
  append = append;
  asEnumerable = asEnumerable;
  chunk = chunk;
  concat = concat;
  contains = contains;
  count = count;
  countBy = countBy;
  groupBy = groupBy;
  max: T extends Comparable ? () => T | null : never = max as any;
  maxBy = maxBy;
  min: T extends Comparable ? () => T | null : never = min as any;
  minBy = minBy;
  select = select;
  selectMany = selectMany;
  skip = skip;
  take = take;
  toArray = toArray;
  toLookup = toLookup;
  toRecord: IsKeyValuePair<T> extends true ? {
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
    } = toRecord;
  where = where;
}
