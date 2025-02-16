import { IEnumerable } from '../IEnumerable';

export function contains<TSource>(this: IEnumerable<TSource>, value: TSource): boolean;
export function contains<TSource>(
  this: IEnumerable<TSource>,
  value: TSource,
  comparer: (x: TSource, y: TSource) => boolean = (x, y) => x === y,
): boolean {
  for (const element of this) {
    if (comparer(element, value)) return true;
  }

  return false;
}
