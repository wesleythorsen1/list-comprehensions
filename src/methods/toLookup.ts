import { Enumerable } from '../Enumerable';
import { iterateRecord, toLookupIntermediary } from '../internals';

export function toLookup<T, TKey extends keyof any>(
  this: Enumerable<T>,
  keySelector: (element: T) => TKey,
): Record<TKey, Enumerable<T>> {
  const intermediary = toLookupIntermediary(this, keySelector);

  const lookup = {} as Record<TKey, Enumerable<T>>;

  for (const { key, value } of iterateRecord(intermediary)) {
    lookup[key] = Enumerable.from(value);
  }

  return lookup;
}
