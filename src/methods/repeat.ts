import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function repeat<TValue>(value: TValue, count: number): IEnumerable<TValue> {
  const result = {
    *[Symbol.iterator]() {
      for (let i = 0; i < count; i++) {
        yield value;
      }
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<TValue>;
}
