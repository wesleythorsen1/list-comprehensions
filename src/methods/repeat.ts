import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function repeat<TValue>(
  value: TValue,
  count: number,
): IEnumerable<TValue> {
  return Enumerable.from({
    *[Symbol.iterator]() {
      for (let i = 0; i < count; i++) {
        yield value;
      }
    },
  });
}
