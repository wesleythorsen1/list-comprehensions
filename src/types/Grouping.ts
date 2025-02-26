import { IEnumerable } from '../IEnumerable';

export type Grouping<TKey, TValue> = IEnumerable<TValue> & { key: TKey };
