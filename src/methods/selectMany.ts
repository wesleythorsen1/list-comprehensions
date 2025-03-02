import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function selectMany<TSource, TResult>(
  this: IEnumerable<TSource>,
  selector: (element: TSource, i: number) => IEnumerable<TResult>,
): IEnumerable<TResult> {
  const source = this;

  return Enumerable.from({
    *[Symbol.iterator]() {
      let i = 0;
      for (const element of source) {
        for (const innerElement of selector(element, i++)) {
          yield innerElement;
        }
      }
    },
  });
}
