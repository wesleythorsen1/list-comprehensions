import { Enumerable } from '../Enumerable';
import { Comparable } from '../types';

export function min<TSource extends Comparable>(this: Enumerable<TSource>) {
  return this.minBy(x => x);
}
