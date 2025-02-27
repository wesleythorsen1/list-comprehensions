import { IEnumerable } from './IEnumerable';
import { Comparable, IsKeyValuePair } from './types';

const valueNotSet = Symbol('valueNotSet');

export abstract class Enumerable<T> implements IEnumerable<T> {
  // public readonly [Symbol.iterator]!: () => Iterator<T>;

  // protected constructor(iterator: () => Iterator<T>) {
  //   this[Symbol.iterator] = iterator;
  // }

  abstract [Symbol.iterator](): Iterator<T>;

  // Fold All Regions: ⌘ K 8
  // Unfold All: ⌘ K J

  // #region static

  // #region from
  static from<T>(source: Iterable<T>): IEnumerable<T> {
    const result = Object.create(Enumerable.prototype) as IEnumerable<T>;

    result[Symbol.iterator] = source[Symbol.iterator];

    return result;
  }
  // #endregion

  // #region empty
  static empty<TValue>(): IEnumerable<TValue> {
    return Enumerable.from(new Array<TValue>(0));
  }
  // #endregion

  // #region range
  static range(start: number, end: number): IEnumerable<number> {
    const result = Object.create(Enumerable.prototype) as IEnumerable<number>;
    result[Symbol.iterator] = function* () {
      for (let i = start; i < end; i++) {
        yield i;
      }
    };

    return result;
  }
  // #endregion

  // #region repeat
  static repeat<TValue>(value: TValue, count: number): IEnumerable<TValue> {
    const result = Object.create(Enumerable.prototype) as IEnumerable<TValue>;
    result[Symbol.iterator] = function* () {
      for (let i = 0; i < count; i++) {
        yield value;
      }
    };

    return result;
  }
  // #endregion

  // #endregion

  // #region all
  all(predicate: (element: T) => boolean): boolean {
    for (const element of this) {
      if (!predicate(element)) return false;
    }

    return true;
  }
  // #endregion

  // #region any
  any(): boolean;
  any(predicate: (element: T) => boolean = x => !!x): boolean {
    for (const element of this) {
      if (predicate(element)) return true;
    }

    return false;
  }
  // #endregion

  // #region append
  append(value: T): IEnumerable<T> {
    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<T>;
    result[Symbol.iterator] = function* () {
      for (const element of source) {
        yield element;
      }

      yield value;
    };

    return result;
  }
  // #endregion

  // #region asEnumerable
  asEnumerable(this: IEnumerable<T>): IEnumerable<T> {
    return Enumerable.from(this);
  }
  // #endregion

  // #region chunk
  chunk(size: number): IEnumerable<IEnumerable<T>> {
    if (size <= 0) throw new Error('batch size must be larger than 0');

    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<IEnumerable<T>>;
    result[Symbol.iterator] = function* () {
      let batch = new Array<T>();

      for (const element of source) {
        batch.push(element);

        if (batch.length === size) {
          yield Enumerable.from(batch);
          batch = [];
        }
      }

      if (batch.length) {
        yield Enumerable.from(batch);
      }
    };

    return result;
  }
  // #endregion

  // #region concat
  concat(enumerable: IEnumerable<T>): IEnumerable<T> {
    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<T>;
    result[Symbol.iterator] = function* () {
      for (const element of source) {
        yield element;
      }

      for (const element of enumerable) {
        yield element;
      }
    };

    return result;
  }
  // #endregion

  // #region contains
  contains(value: T): boolean;
  contains(value: T, comparer: (x: T, y: T) => boolean = (x, y) => x === y): boolean {
    for (const element of this) {
      if (comparer(element, value)) return true;
    }

    return false;
  }
  // #endregion

  // #region count
  count(): number;
  count(predicate: (element: T) => boolean = _ => true): number {
    let i = 0;

    for (const element of this) {
      if (predicate(element)) {
        i++;
      }
    }

    return i;
  }
  // #endregion

  // #region countBy
  countBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<[TKey, number]>;
  countBy<TKey>(
    keySelector: (element: T) => TKey,
    comparer: (x: TKey, y: TKey) => boolean = (x, y) => x === y,
  ): IEnumerable<[TKey, number]> {
    const list: [TKey, number][] = [];

    sourceIterator: for (const element of this) {
      const key = keySelector(element);

      for (const kvp of list) {
        if (comparer(key, kvp[0])) {
          kvp[1]++;

          continue sourceIterator;
        }
      }

      list.push([key, 1]);
    }

    const result = Object.create(Enumerable.prototype) as IEnumerable<[TKey, number]>;
    result[Symbol.iterator] = function* () {
      for (const [key, count] of list) {
        yield [key, count];
      }
    };

    return result;
  }
  // #endregion

  // #region min
  min(this: Enumerable<T & Comparable>): T | null {
    return this.minBy(x => x);
  }
  // #endregion

  // #region minBy
  minBy<TValue extends Comparable>(valueSelector: (element: T) => TValue): T | null;
  minBy<TValue>(
    valueSelector: (element: T) => TValue,
    comparer: (x: TValue, y: TValue) => number = (x: any, y: any) => x - y, // will break if called with non-comparable TValue
  ): T | null {
    let minElement: T | typeof valueNotSet = valueNotSet;
    let minValue: TValue | typeof valueNotSet = valueNotSet;

    for (const element of this) {
      const value = valueSelector(element);

      if (minValue === valueNotSet || comparer(minValue, value) > 0) {
        minElement = element;
        minValue = value;
      }
    }

    if (minElement === valueNotSet) {
      return null;
    }

    return minElement;
  }
  // #endregion

  // #region select
  select<TResult>(selector: (element: T, i: number) => TResult): IEnumerable<TResult> {
    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<TResult>;
    result[Symbol.iterator] = function* () {
      let i = 0;
      for (const element of source) {
        yield selector(element, i++);
      }
    };

    return result;
  }
  // #endregion

  // #region selectMany
  selectMany<TResult>(
    selector: (element: T, i: number) => IEnumerable<TResult>,
  ): IEnumerable<TResult> {
    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<TResult>;
    result[Symbol.iterator] = function* () {
      let i = 0;

      for (const element of source) {
        for (const innerElement of selector(element, i++)) {
          yield innerElement;
        }
      }
    };

    return result;
  }
  // #endregion

  // #region skip
  skip(count: number): IEnumerable<T> {
    if (count < 0) throw new Error('count must be 0 or larger');

    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<T>;
    result[Symbol.iterator] = function* () {
      let current = 0;

      for (const element of source) {
        if (current < count) {
          current++;
          continue;
        }

        yield element;
      }
    };

    return result;
  }
  // #endregion

  // #region take
  take(count: number): IEnumerable<T> {
    if (count < 0) throw new Error('count must be 0 or larger');

    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<T>;
    result[Symbol.iterator] = function* () {
      let current = 0;

      for (const element of source) {
        if (current >= count) {
          return;
        }

        current++;
        yield element;
      }
    };

    return result;
  }
  // #endregion

  // #region toArray
  toArray(): T[] {
    return [...this];
  }
  // #endregion

  // #region toLookup
  toLookup<TKey>(keySelector: (element: T) => TKey): Map<TKey, IEnumerable<T>> {
    const map = new Map<TKey, IEnumerable<T>>();

    for (const element of this) {
      const key = keySelector(element);

      if (!map.has(key)) {
        map.set(key, Enumerable.from([element]));
      } else {
        map.get(key)?.append(element);
      }
    }

    return map;
  }
  // #endregion

  // #region toRecord
  // // toRecord: IsKeyValuePair<T> extends true
  // //   ? {
  // //       <TKey extends string | number | symbol, TValue>(
  // //         this: IEnumerable<[TKey, TValue]>,
  // //       ): Record<TKey, TValue>;
  // //       <TKey extends string | number | symbol>(
  // //         this: IEnumerable<T>,
  // //         keySelector: (element: T) => TKey,
  // //       ): Record<TKey, T>;
  // //       <TKey extends string | number | symbol, TValue>(
  // //         this: IEnumerable<T>,
  // //         keySelector: (element: T) => TKey,
  // //         valueSelector: (element: T) => TValue,
  // //       ): Record<TKey, TValue>;
  // //     }
  // //   : {
  // //       <TKey extends string | number | symbol>(
  // //         this: IEnumerable<T>,
  // //         keySelector: (element: T) => TKey,
  // //       ): Record<TKey, T>;
  // //       <TKey extends string | number | symbol, TValue>(
  // //         this: IEnumerable<T>,
  // //         keySelector: (element: T) => TKey,
  // //         valueSelector: (element: T) => TValue,
  // //       ): Record<TKey, TValue>;
  // //     } = methods.toRecord as any;

  // // toRecord<TKey extends string | number | symbol, TValue>(
  // //   this: IEnumerable<T & [TKey, TValue]>,
  // // ): Record<TKey, TValue>;
  // toRecord<TKey extends string | number | symbol>(
  //   keySelector: (element: T) => TKey,
  // ): Record<TKey, T>;
  // toRecord<TKey extends string | number | symbol, TValue>(
  //   keySelector: (element: T) => TKey,
  //   valueSelector: (element: T) => TValue,
  // ): Record<TKey, TValue>;
  // toRecord<TKey extends string | number | symbol, TValue>(
  //   keySelector?: (element: T) => TKey,
  //   valueSelector?: (element: T) => TValue,
  // ): Record<TKey, TValue> {
  //   if (!keySelector) {
  //     // @ts-expect-error
  //     return Object.fromEntries(this);
  //   }

  //   if (!valueSelector) {
  //     return Object.fromEntries(this.select(e => [keySelector(e), e]));
  //   }

  //   return Object.fromEntries(this.select(e => [keySelector(e), valueSelector(e)]));
  // }
  // #endregion

  // #region where
  where(predicate: (element: T, i: number) => boolean): IEnumerable<T> {
    const source = this;

    const result = Object.create(Enumerable.prototype) as IEnumerable<T>;
    result[Symbol.iterator] = function* () {
      let i = 0;
      for (const element of source) {
        if (predicate(element, i++)) {
          yield element;
        }
      }
    };

    return result;
  }
  // #endregion
}
