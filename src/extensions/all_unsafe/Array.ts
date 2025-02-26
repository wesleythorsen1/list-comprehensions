import { Enumerable } from '../../Enumerable';
import { IEnumerable } from '../../IEnumerable';

declare global {
  interface Array<T> extends IEnumerable<T> {
    __extendsIEnumerable: boolean;
  }
}

if (!Array.prototype.__extendsIEnumerable) {
  console.warn(
    "Warning: Importing '@bussin/list-comprehensions/extensions/all_unsafe/Array' will modify the built-in Array prototype and may lead to unexpected behavior. Consider using '@me/my-package/extensions/asEnumerable/Array' instead.",
  );
  Array.prototype.__extendsIEnumerable = true;
  Object.assign(Array.prototype, Enumerable.prototype);
}
