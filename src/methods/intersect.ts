import { Enumerable } from '../Enumerable';

export function intersect<T>(this: Enumerable<T>, enumerable: Enumerable<T>) {
  return this.intersectBy(enumerable, x => x);
}
