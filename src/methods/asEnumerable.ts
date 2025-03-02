import type { IEnumerable } from "../IEnumerable.ts";
import { Enumerable } from "../Enumerable.ts";

export function asEnumerable<TSource>(
  this: IEnumerable<TSource>,
): IEnumerable<TSource> {
  return Enumerable.from(this);
}
