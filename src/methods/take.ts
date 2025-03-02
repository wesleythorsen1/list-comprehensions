import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function take<TSource>(
  this: IEnumerable<TSource>,
  count: number,
): IEnumerable<TSource> {
  if (count < 0) throw new Error("count must be 0 or larger");

  const source = this;

  return Enumerable.from({
    *[Symbol.iterator]() {
      let current = 0;

      for (const element of source) {
        if (current >= count) {
          return;
        }

        current++;
        yield element;
      }
    },
  });
}
