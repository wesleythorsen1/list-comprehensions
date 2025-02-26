import { Enumerable } from '../Enumerable';
import { Comparable } from '../types';

export function max<TSource extends Comparable>(this: Enumerable<TSource>) {
  return this.maxBy(x => x);
}
