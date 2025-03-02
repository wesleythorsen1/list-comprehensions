import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function where<TSource>(
  this: IEnumerable<TSource>,
  predicate: (element: TSource, i: number) => boolean,
): IEnumerable<TSource> {
  const source = this;

  return Enumerable.from({
    *[Symbol.iterator]() {
      let i = 0;
      for (const element of source) {
        if (predicate(element, i++)) {
          yield element;
        }
      }
    },
  });
}
