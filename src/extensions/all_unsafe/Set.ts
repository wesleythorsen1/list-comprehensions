// import { Enumerable } from '../../Enumerable';
// import { IEnumerable } from '../../IEnumerable';

// declare global {
//   interface Set<T> extends IEnumerable<T> {
//     __extendsIEnumerable: boolean;
//   }
// }

// if (!Set.prototype.__extendsIEnumerable) {
//   console.warn(
//     "Warning: Importing '@bussin/list-comprehensions/extensions/all_unsafe/Set' will modify the built-in Set prototype and may lead to unexpected behavior. Consider using '@me/my-package/extensions/asEnumerable/Set' instead.",
//   );
//   Set.prototype.__extendsIEnumerable = true;
//   Object.assign(Set.prototype, Enumerable.prototype);
// }
