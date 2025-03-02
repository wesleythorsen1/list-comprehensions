import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function empty<TValue>(): IEnumerable<TValue> {
  return Enumerable.from(new Array<TValue>(0));
}
