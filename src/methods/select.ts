import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function select<TSource, TResult>(
  this: IEnumerable<TSource>,
  selector: (element: TSource, i: number) => TResult,
): IEnumerable<TResult> {
  this.operations.push({ type: 'select', fn: selector });

  return this as unknown as Enumerable<TResult>;
}
