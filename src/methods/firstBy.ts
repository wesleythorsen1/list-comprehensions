import { Enumerable } from '../Enumerable';

export function firstBy<T>(this: Enumerable<T>, predicate: (element: T) => boolean) {
  for (const element of this) {
    if (predicate(element)) return element;
  }

  throw new Error('no items in enumerable');
}
