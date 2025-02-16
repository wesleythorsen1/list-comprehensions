import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function empty<TValue>(): IEnumerable<TValue> {
  return Enumerable.from(new Array<TValue>(0));
}
