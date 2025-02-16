import { Enumerable } from '../Enumerable';

export function union<T>(this: Enumerable<T>, enumerable: Enumerable<T>) {
  return this.unionBy(enumerable, x => x);
}
