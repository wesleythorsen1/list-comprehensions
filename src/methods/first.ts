import { Enumerable } from '../Enumerable';

export function first<T>(this: Enumerable<T>) {
  return this.firstBy(_ => true);
}
