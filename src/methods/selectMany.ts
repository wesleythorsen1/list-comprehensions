import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function selectMany<TSource, TResult>(
  this: IEnumerable<TSource>,
  selector: (element: TSource, i: number) => IEnumerable<TResult>,
): IEnumerable<TResult> {
  const source = this;

  const result = {
    *[Symbol.iterator]() {
      let i = 0;
      for (const element of source) {
        for (const innerElement of selector(element, i++)) {
          yield innerElement;
        }
      }
    },
  };

  return Object.setPrototypeOf(result, Enumerable.prototype) as IEnumerable<TResult>;
}
