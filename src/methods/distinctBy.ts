// import { Enumerable } from "../Enumerable.ts";

// export function distinctBy<T, TKey>(this: IEnumerable<T>, selector: (element: T) => TKey) {
//   const inner = this;
//   const set = new Set<TKey>();

//   function* generator() {
//     for (const element of inner) {
//       const key = selector(element);

//       if (set.has(key)) continue;

//       set.add(key);

//       yield element;
//     }
//   }

//   return Enumerable.from(generator);
// }
