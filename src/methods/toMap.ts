import { Enumerable } from '../Enumerable';

export function toMap<T, TKey extends string | number | symbol>(
  this: Enumerable<T>,
  keySelector: (element: T) => TKey,
): Map<TKey, T> {
  return new Map(this.select(x => [keySelector(x), x]));
}
