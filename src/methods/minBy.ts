import { Enumerable } from '../Enumerable';
import { Comparable } from '../types';

const valueNotSet = Symbol('valueNotSet');

export function minBy<TSource, TValue extends Comparable>(
  this: Enumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
): TSource | null;
export function minBy<TSource, TValue>(
  this: Enumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
  comparer: (x: TValue, y: TValue) => number = (x: any, y: any) => x - y, // will break if called with non-comparable TValue
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
