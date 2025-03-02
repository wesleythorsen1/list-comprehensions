import type { IEnumerable } from "../IEnumerable.ts";
import type { Comparable } from "../types/index.ts";

const valueNotSet = Symbol("valueNotSet");

export function minBy<TSource, TValue extends Comparable>(
  this: IEnumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
): TSource | null;
export function minBy<TSource, TValue>(
  this: IEnumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
  comparer: (x: TValue, y: TValue) => number = (
    x: unknown,
    y: unknown,
  ): number => (x as number) - (y as number),
): TSource | null {
  let minElement: TSource | typeof valueNotSet = valueNotSet;
  let minValue: TValue | typeof valueNotSet = valueNotSet;

  for (const element of this) {
    const value = valueSelector(element);

    if (minValue === valueNotSet || comparer(minValue, value) > 0) {
      minElement = element;
      minValue = value;
    }
  }

  if (minElement === valueNotSet) {
    return null;
  }

  return minElement;
}
