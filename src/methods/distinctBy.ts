// import { Enumerable } from '../Enumerable';

// export function distinctBy<T, TKey>(this: Enumerable<T>, selector: (element: T) => TKey) {
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
