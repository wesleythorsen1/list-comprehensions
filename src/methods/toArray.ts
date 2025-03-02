import type { IEnumerable } from "../IEnumerable.ts";

export function toArray<TSource>(this: IEnumerable<TSource>): TSource[] {
  return [...this];
}
