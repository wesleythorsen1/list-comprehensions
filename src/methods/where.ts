import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function where<TSource>(
  this: IEnumerable<TSource>,
  predicate: (element: TSource, i: number) => boolean,
): IEnumerable<TSource> {
  this.operations.push({ type: 'where', fn: predicate });

  return this;
}
