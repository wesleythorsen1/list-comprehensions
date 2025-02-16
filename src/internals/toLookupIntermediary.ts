import { Enumerable } from '../Enumerable';

export function toLookupIntermediary<TKey extends keyof any, T>(
  enumerable: Enumerable<T>,
  keySelector: (element: T) => TKey,
) {
  // using intermediary with T[] to avoid Enumerable.append() max call stack
  const lookup = {} as Record<TKey, T[]>;

  for (const element of enumerable) {
    const key = keySelector(element);

    if (!lookup[key]) lookup[key] = [];

    lookup[key].push(element);
  }

  return lookup;
}
