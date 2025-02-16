import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function range(start: number, end: number): IEnumerable<number> {
  const result = {
    *[Symbol.iterator]() {
      for (let i = start; i < end; i++) {
        yield i;
      }
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<number>;
}
