import type { IEnumerable } from "../../IEnumerable.ts";
import { asEnumerable } from "../../methods/asEnumerable.ts";

declare global {
  interface Array<T> extends IEnumerable<T> {
    asEnumerable: IEnumerable<T>["asEnumerable"];
  }
}

if (!Array.prototype.asEnumerable) {
  Array.prototype.asEnumerable = asEnumerable;
}
