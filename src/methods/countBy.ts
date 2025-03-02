import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

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

  return Enumerable.from({
    *[Symbol.iterator]() {
      for (const [key, count] of list) {
        yield [key, count];
      }
    },
  });
}
