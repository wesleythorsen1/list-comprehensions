// import { Enumerable } from '../Enumerable';

// export function intersectBy<T, TKey>(
//   this: Enumerable<T>,
//   enumerable: Enumerable<T>,
//   selector: (element: T) => TKey,
// ) {
//   const inner = this;
//   const set = new Set();

//   function* generator() {
//     for (const element of inner) {
//       set.add(selector(element));
//     }

//     for (const element of enumerable) {
//       if (set.has(selector(element))) {
//         yield element;
//       }
//     }
//   }

//   return Enumerable.from(generator);
// }
