import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

export function select<TSource, TResult>(
  this: IEnumerable<TSource>,
  selector: (element: TSource, i: number) => TResult,
): IEnumerable<TResult> {
  const source = this;

  return Enumerable.from({
    *[Symbol.iterator]() {
      let i = 0;
      for (const element of source) {
        yield selector(element, i++);
      }
    },
  });
}
