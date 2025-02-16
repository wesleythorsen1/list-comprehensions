import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function skip<TSource>(this: IEnumerable<TSource>, count: number): IEnumerable<TSource> {
  if (count < 0) throw new Error('count must be 0 or larger');

  const source = this;

  const result = {
    *[Symbol.iterator]() {
      let current = 0;

      for (const element of source) {
        if (current < count) {
          current++;
          continue;
        }

        yield element;
      }
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<TSource>;
}
