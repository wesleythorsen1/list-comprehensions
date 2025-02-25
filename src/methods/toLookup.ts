import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function toLookup<TSource, TKey>(
  this: Enumerable<TSource>,
  keySelector: (element: TSource) => TKey,
): Map<TKey, IEnumerable<TSource>> {
  const map = new Map<TKey, TSource[] | IEnumerable<TSource>>();

  for (const element of this) {
    const key = keySelector(element);

    if (!map.has(key)) {
      map.set(key, [element]);
    } else {
      (map.get(key) as TSource[]).push(element);
    }
  }

  for (const [key, value] of map) {
    map.set(key, Object.setPrototypeOf(value, Enumerable.prototype) as IEnumerable<TSource>);
  }

  return map as Map<TKey, IEnumerable<TSource>>;
}
