import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function toLookup<TSource, TKey extends string | number | symbol>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
): Map<TKey, IEnumerable<TSource>>;

export function toLookup<
  TSource,
  TKey extends string | number | symbol,
  TValue,
>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
  valueSelector: (element: TSource) => TValue = (x: unknown): TValue =>
    x as TValue,
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
