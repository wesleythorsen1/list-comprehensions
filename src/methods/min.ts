import type { IEnumerable } from "../IEnumerable.ts";
import type { Comparable } from "../types/Comparable.ts";

export function min<TSource extends Comparable>(
  this: IEnumerable<TSource>,
): TSource | null {
  return this.minBy((x) => x);
}
