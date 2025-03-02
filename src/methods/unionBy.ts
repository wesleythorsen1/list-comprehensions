// import { Enumerable } from "../Enumerable.ts";

// export function unionBy<T, TKey>(
//   this: IEnumerable<T>,
//   enumerable: Enumerable<T>,
//   selector: (element: T) => TKey,
// ) {
//   const inner = this;
//   const set = new Set<TKey>();

//   function* generator() {
//     for (const element of inner) {
//       const key = selector(element);
//       if (set.has(key)) continue;
//       set.add(key);
//       yield element;
//     }

//     for (const element of enumerable) {
//       const key = selector(element);
//       if (set.has(key)) continue;
//       set.add(key);
//       yield element;
//     }
//   }

//   return Enumerable.from(generator);
// }
