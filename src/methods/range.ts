import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function range(start: number, end: number): IEnumerable<number> {
  return Enumerable.from({
    *[Symbol.iterator]() {
      for (let i = start; i < end; i++) {
        yield i;
      }
    },
  });
}
