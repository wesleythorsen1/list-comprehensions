import { Grouping } from '../types';
import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';
import { hash } from '../util';

export function groupBy<TSource, TKey>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
): IEnumerable<Grouping<TKey, TSource>>;

export function groupBy<TSource, TKey, TValue>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
  valueSelector: (element: TSource) => TValue = (x: any) => x,
): IEnumerable<Grouping<TKey, TValue>> {
  const map = new Map<number, { key: TKey; values: TValue[] }>();

  for (const element of this) {
    const key = keySelector(element);
    const keyHash = hash(JSON.stringify(key)); // equatable version of key (allows object keys)
    const value = valueSelector(element);

    if (map.has(keyHash)) {
      map.get(keyHash)?.values.push(value);
    } else {
      map.set(keyHash, { key, values: [value] });
    }
  }

  return Enumerable.from({
    *[Symbol.iterator]() {
      for (const [, { key, values }] of map) {
        const group = Enumerable.from(values) as Grouping<TKey, TValue>;

        group.key = key;

        yield group;
      }
    },
  });
}
