import { IEnumerable } from '../IEnumerable';

export function any<TSource>(this: IEnumerable<TSource>): boolean;
export function any<TSource>(
  this: IEnumerable<TSource>,
  predicate: (element: TSource) => boolean = x => !!x,
): boolean {
  for (const element of this) {
    if (predicate(element)) return true;
  }

  return false;
}
