import type { IEnumerable } from "../IEnumerable.ts";

export function toSet<T>(this: IEnumerable<T>): Set<T> {
  return new Set([...this]);
}
