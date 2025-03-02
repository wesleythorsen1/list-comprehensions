import type { IEnumerable } from "../../src/IEnumerable.ts";
import { asEnumerable } from "../../src/methods/asEnumerable.ts";

declare global {
  interface Set<T> extends IEnumerable<T> {
    asEnumerable: IEnumerable<T>["asEnumerable"];
  }
}

if (!Set.prototype.asEnumerable) {
  Set.prototype.asEnumerable = asEnumerable;
}
