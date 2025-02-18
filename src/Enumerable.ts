import { IEnumerable } from './IEnumerable';
import { Comparable } from './types';

const valueNotSet = Symbol('valueNotSet');

export class Enumerable<T> implements IEnumerable<T> {
  private constructor(protected readonly source: Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  // static
  static from<T>(source: Iterable<T>): IEnumerable<T> {
    return new Enumerable(source);
  }

  static empty<TValue>(): IEnumerable<TValue> {
    return Enumerable.from(new Array<TValue>(0));
  }

  static range(start: number, end: number): IEnumerable<number> {
    const result = Object.create(Enumerable.prototype) as IEnumerable<number>;
    result[Symbol.iterator] = function* () {
      for (let i = start; i < end; i++) {
        yield i;
      }
    };

    return result;
  }

  static repeat<TValue>(value: TValue, count: number): IEnumerable<TValue> {
    const result = Object.create(Enumerable.prototype) as IEnumerable<TValue>;
    result[Symbol.iterator] = function* () {
      for (let i = 0; i < count; i++) {
        yield value;
      }
    };

    return result;
  }

  // instance
  // aggregate = methods.aggregate;

  all(predicate: (element: T) => boolean): boolean {
    for (const element of this) {
      if (!predicate(element)) return false;
    }

    return true;
  }

  any(): boolean;
  any(predicate: (element: T) => boolean = x => !!x): boolean {
    for (const element of this) {
      if (predicate(element)) return true;
    }

    return false;
  }

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

  contains(value: T): boolean;
  contains(value: T, comparer: (x: T, y: T) => boolean = (x, y) => x === y): boolean {
    for (const element of this) {
      if (comparer(element, value)) return true;
    }

    return false;
  }

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

  min<T extends Comparable>(this: Enumerable<T>) {
    return this.minBy(x => x);
  }

  minBy<TValue extends Comparable>(
    this: Enumerable<T>,
    valueSelector: (element: T) => TValue,
  ): T | null;
  minBy<TValue>(
    this: Enumerable<T>,
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

  toArray(): T[] {
    return [...this];
  }

  // toLookup = methods.toLookup;
  // toMap = methods.toMap;
  // toSet = methods.toSet;
  // union = methods.union;
  // unionBy = methods.unionBy;

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
}

// // Enumerable.prototype.aggregate = methods.aggregate;
// Enumerable.prototype.all = methods.all;
// Enumerable.prototype.any = methods.any;
// Enumerable.prototype.append = methods.append;
// Enumerable.prototype.chunk = methods.chunk;
// Enumerable.prototype.concat = methods.concat;
// Enumerable.prototype.contains = methods.contains;
// Enumerable.prototype.count = methods.count;
// Enumerable.prototype.countBy = methods.countBy;
// // Enumerable.prototype.distinct = methods.distinct;
// // Enumerable.prototype.distinctBy = methods.distinctBy;
// // Enumerable.prototype.first = methods.first;
// // Enumerable.prototype.firstBy = methods.firstBy;
// // Enumerable.prototype.firstOrDefault = methods.firstOrDefault;
// // Enumerable.prototype.firstOrDefaultBy = methods.firstOrDefaultBy;
// // Enumerable.prototype.groupBy = methods.groupBy;
// // Enumerable.prototype.intersect = methods.intersect;
// // Enumerable.prototype.intersectBy = methods.intersectBy;
// // Enumerable.prototype.leftJoin = methods.leftJoin;
// // Enumerable.prototype.max = methods.max;
// // Enumerable.prototype.maxBy = methods.maxBy;
// Enumerable.prototype.min = methods.min;
// Enumerable.prototype.minBy = methods.minBy;
// Enumerable.prototype.select = methods.select;
// Enumerable.prototype.selectMany = methods.selectMany;
// Enumerable.prototype.skip = methods.skip;
// Enumerable.prototype.take = methods.take;
// Enumerable.prototype.toArray = methods.toArray;
// // Enumerable.prototype.toLookup = methods.toLookup;
// // Enumerable.prototype.toMap = methods.toMap;
// // Enumerable.prototype.toSet = methods.toSet;
// // Enumerable.prototype.union = methods.union;
// // Enumerable.prototype.unionBy = methods.unionBy;
// Enumerable.prototype.where = methods.where;
