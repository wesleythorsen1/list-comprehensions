import { Enumerable } from '../Enumerable';

export function maxBy<T, TValue>(this: Enumerable<T>, selector: (element: T) => TValue) {
  let max: T | null = null;
  let maxValue: TValue | null = null;

  for (const element of this) {
    const elementValue = selector(element);
    if (maxValue === null || maxValue === undefined || maxValue < elementValue) {
      max = element;
      maxValue = elementValue;
    }
  }

  return max;
}
