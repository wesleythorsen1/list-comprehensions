import { Enumerable } from '../Enumerable';

export function firstOrDefaultBy<T>(
  this: Enumerable<T>,
  predicate: (element: T) => boolean,
  defaultValue: any = null,
) {
  for (const element of this) {
    if (predicate(element)) return element;
  }

  return defaultValue;
}
