import type { IEnumerable } from "../../IEnumerable.ts";
import { Enumerable } from "../../Enumerable.ts";

declare global {
  interface Map<K, V> extends IEnumerable<[K, V]> {
    __extendsIEnumerable: boolean;
  }
}

if (!Map.prototype.__extendsIEnumerable) {
  console.warn(
    "Warning: Importing '@bussin/list-comprehensions/extensions/all_unsafe/Map' will modify the built-in Map prototype and may lead to unexpected behavior. Consider using '@me/my-package/extensions/asEnumerable/Map' instead.",
  );
  Map.prototype.__extendsIEnumerable = true;
  Object.assign(Map.prototype, Enumerable.prototype);
}
