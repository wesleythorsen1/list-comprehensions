import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function append<TSource>(this: IEnumerable<TSource>, value: TSource): IEnumerable<TSource> {
  const source = this;

  const result = {
    *[Symbol.iterator]() {
      for (const element of source) {
        yield element;
      }

      yield value;
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<TSource>;
}
