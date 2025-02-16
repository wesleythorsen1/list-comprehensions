import { IEnumerable } from '../IEnumerable';

export function toArray<TSource>(this: IEnumerable<TSource>): TSource[] {
  return [...this];
}
