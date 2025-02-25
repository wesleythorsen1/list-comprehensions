import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function asEnumerable<TSource>(this: IEnumerable<TSource>): IEnumerable<TSource> {
  return Enumerable.from(this);
}
