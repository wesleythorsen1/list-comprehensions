import { Enumerable } from '../Enumerable';

export function max<T>(this: Enumerable<T>) {
  return this.maxBy(x => x);
}
