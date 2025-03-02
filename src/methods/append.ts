import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function append<TSource>(
  this: IEnumerable<TSource>,
  value: TSource,
): IEnumerable<TSource> {
  const source = this;

  return Enumerable.from({
    *[Symbol.iterator]() {
      for (const element of source) {
        yield element;
      }

      yield value;
    },
  });
}
