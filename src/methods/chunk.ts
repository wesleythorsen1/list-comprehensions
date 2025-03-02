import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function chunk<TSource>(
  this: IEnumerable<TSource>,
  size: number,
): IEnumerable<IEnumerable<TSource>> {
  if (size <= 0) throw new Error("batch size must be larger than 0");

  const source = this;

  return Enumerable.from({
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
  });
}
