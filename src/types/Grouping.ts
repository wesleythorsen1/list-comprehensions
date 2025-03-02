import type { IEnumerable } from "../IEnumerable.ts";

export type Grouping<TKey, TValue> = IEnumerable<TValue> & { key: TKey };
