import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function range(start: number, end: number): IEnumerable<number> {
  return Enumerable.from({
    *[Symbol.iterator]() {
      for (let i = start; i < end; i++) {
        yield i;
      }
    },
  });
}
