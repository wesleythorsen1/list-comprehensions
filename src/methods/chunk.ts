import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function chunk<TSource>(
  this: IEnumerable<TSource>,
  size: number,
): IEnumerable<IEnumerable<TSource>> {
  if (size <= 0) throw new Error('batch size must be larger than 0');

  const source = this;

  const result = {
    *[Symbol.iterator]() {
      let batch = new Array<TSource>();

      for (const element of source) {
        batch.push(element);

        if (batch.length === size) {
          yield Enumerable.from(batch);
          batch = [];
        }
      }

      if (batch.length) {
        yield Enumerable.from(batch);
      }
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<IEnumerable<TSource>>;
}
