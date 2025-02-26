import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function toLookup<TSource, TKey extends string | number | symbol>(
  this: Enumerable<TSource>,
  keySelector: (element: TSource) => TKey,
): Map<TKey, IEnumerable<TSource>>;

export function toLookup<TSource, TKey extends string | number | symbol, TValue>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
  valueSelector: (element: TSource) => TValue = (x: any) => x,
): Map<TKey, IEnumerable<TValue>> {
  const map = new Map<TKey, TValue[] | IEnumerable<TValue>>();

  for (const element of this) {
    const key = keySelector(element);
    const value = valueSelector(element);

    if (!map.has(key)) {
      map.set(key, [value]);
    } else {
      (map.get(key) as TValue[]).push(value);
    }
  }

  for (const [key, value] of map) {
    map.set(key, Enumerable.from(value));
  }

  return map as Map<TKey, IEnumerable<TValue>>;
}
