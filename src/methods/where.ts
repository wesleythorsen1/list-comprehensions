import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function where<TSource>(
  this: IEnumerable<TSource>,
  predicate: (element: TSource, i: number) => boolean,
): IEnumerable<TSource> {
  const source = this;

  const result = {
    *[Symbol.iterator]() {
      let i = 0;
      for (const element of source) {
        if (predicate(element, i++)) {
          yield element;
        }
      }
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<TSource>;
}
