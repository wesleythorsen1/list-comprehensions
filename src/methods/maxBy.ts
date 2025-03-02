import type { IEnumerable } from "../IEnumerable.ts";
import type { Comparable } from "../types/Comparable.ts";

const valueNotSet = Symbol("valueNotSet");

export function maxBy<TSource, TValue extends Comparable>(
  this: IEnumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
): TSource | null;
export function maxBy<TSource, TValue>(
  this: IEnumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
  comparer: (x: TValue, y: TValue) => number = (
    x: unknown,
    y: unknown,
  ): number => (x as number) - (y as number),
): TSource | null {
  let maxElement: TSource | typeof valueNotSet = valueNotSet;
  let maxValue: TValue | typeof valueNotSet = valueNotSet;

  for (const element of this) {
    const value = valueSelector(element);

    if (maxValue === valueNotSet || comparer(maxValue, value) < 0) {
      maxElement = element;
      maxValue = value;
    }
  }

  if (maxElement === valueNotSet) {
    return null;
  }

  return maxElement;
}
