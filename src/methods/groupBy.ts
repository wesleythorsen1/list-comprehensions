import { Grouping } from '../types';
import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';
import {hash} from '../util'

export function groupBy<TSource, TKey>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
): IEnumerable<Grouping<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
  valueSelector: (element: TSource) => TValue = (x: any) => x,
): IEnumerable<Grouping<TKey, TValue>> {
  const map = new Map<TKey, Grouping<TKey, TValue>>();
  // const map = new Map<string, [TKey, TValue[]]>();

  for (const element of this) {
    const key = keySelector(element);
    const keyHash = hash(key);
    const value = valueSelector(element);

    // needs comparable or equatable version of key (it can be object)
    if (map.has(keyHash)) {
      map.get(keyHash)?[1].push(value);
    } else {
      map.set(keyHash, [key, [value]]);
    }
  }

  return Enumerable.from(map).select(m => {
    return m[1];
  });
}
// {
//   const map = new Map<TKey, Grouping<TKey, TValue>>();

//   for (const element of this) {
//     const key = keySelector(element);

//     if (!map.has(key)) {
//       const group = Enumerable.from([valueSelector(element)]) as Grouping<TKey, TValue>;
//       group.key = keySelector(element);
//       map.set(key, group);
//     } else {
//       map.get(key)?.append(valueSelector(element));
//     }
//   }

//   return Enumerable.from(map).select(m => m[1]);
// }
// export function groupBy<TSource, TKey, TValue>(
//   this: IEnumerable<TSource>,
//   keySelector: (element: TSource) => TKey,
//   valueSelector?: (element: TSource) => TValue,
// ): IEnumerable<Grouping<TKey, TValue>> {
//   const selector: (element: TSource) => TValue =
//     valueSelector || ((x: TSource) => x as unknown as TValue);

//   const map = new Map<TKey, Grouping<TKey, TValue>>();

//   for (const element of this) {
//     const key = keySelector(element);

//     if (!map.has(key)) {
//       const group = Enumerable.from([selector(element)]) as Grouping<TKey, TValue>;
//       group.key = keySelector(element);
//       map.set(key, group);
//     } else {
//       map.get(key)?.append(selector(element));
//     }
//   }

//   return Enumerable.from(map).select(m => m[1]);
// }

// {
//   // const source = this;

//   const selector: (element: TSource) => TValue =
//     valueSelector || ((x: TSource) => x as unknown as TValue);

//   const map = new Map<TKey, Grouping<TKey, TValue>>();

//   for (const element of this) {
//     const key = keySelector(element);

//     if (!map.has(key)) {
//       const group = Enumerable.from([selector(element)]) as Grouping<TKey, TValue>;
//       group.key = keySelector(element);
//       map.set(key, group);
//     } else {
//       map.get(key)?.append(selector(element));
//     }
//   }

//   return Enumerable.from(map).select(m => m[1]);
// }
