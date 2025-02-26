import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function concat<TSource>(
  this: IEnumerable<TSource>,
  enumerable: IEnumerable<TSource>,
): IEnumerable<TSource> {
  const source = this;

  return Enumerable.from({
    *[Symbol.iterator]() {
      for (const element of source) {
        yield element;
      }

      for (const element of enumerable) {
        yield element;
      }
    },
  });
}
