import { Enumerable } from '../Enumerable';
import { iterateRecord, toLookupIntermediary } from '../internals';

export function groupBy<T, TKey extends keyof any>(
  this: Enumerable<T>,
  keySelector: (element: T) => TKey,
): Enumerable<{ key: TKey; values: Enumerable<T> }> {
  const intermediary = toLookupIntermediary(this, keySelector);

  return Enumerable.from(iterateRecord(intermediary)).select(({ key, value }) => ({
    key,
    values: Enumerable.from(value),
  }));
}
