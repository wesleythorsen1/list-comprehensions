import { Enumerable } from '../Enumerable';

export function toSet<T>(this: Enumerable<T>): Set<T> {
  return new Set([...this]);
}
