import { Enumerable } from '../Enumerable';
import { Comparable } from '../types';

const valueNotSet = Symbol('valueNotSet');

export function maxBy<TSource, TValue extends Comparable>(
  this: Enumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
): TSource | null;
export function maxBy<TSource, TValue>(
  this: Enumerable<TSource>,
  valueSelector: (element: TSource) => TValue,
  comparer: (x: TValue, y: TValue) => number = (x: any, y: any) => x - y, // will break if called with non-comparable TValue
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
