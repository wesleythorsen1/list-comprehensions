import type { IEnumerable } from "../IEnumerable.ts";

export function all<TSource>(
  this: IEnumerable<TSource>,
  predicate: (element: TSource) => boolean,
): boolean {
  for (const element of this) {
    if (!predicate(element)) return false;
  }

  return true;
}
