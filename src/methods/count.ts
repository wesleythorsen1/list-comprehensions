import type { IEnumerable } from "../IEnumerable.ts";

export function count<TSource>(this: IEnumerable<TSource>): number;
export function count<TSource>(
  this: IEnumerable<TSource>,
  predicate: (element: TSource) => boolean = (_) => true,
): number {
  let i = 0;

  for (const element of this) {
    if (predicate(element)) {
      i++;
    }
  }

  return i;
}
