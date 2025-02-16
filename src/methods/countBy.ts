import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function countBy<TSource, TKey>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
): IEnumerable<[TKey, number]>;
export function countBy<TSource, TKey>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
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

  const result = {
    *[Symbol.iterator]() {
      for (const [key, count] of list) {
        yield [key, count];
      }
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<[TKey, number]>;
}
