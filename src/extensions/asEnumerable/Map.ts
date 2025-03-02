import type { IEnumerable } from "../../IEnumerable.ts";
import { asEnumerable } from "../../methods/asEnumerable.ts";

declare global {
  interface Map<K, V> extends IEnumerable<[K, V]> {
    asEnumerable: IEnumerable<[K, V]>["asEnumerable"];
  }
}

if (!Map.prototype.asEnumerable) {
  Map.prototype.asEnumerable = asEnumerable;
}
