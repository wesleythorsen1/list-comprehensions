import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

declare global {
  interface Map<K, V> extends IEnumerable<[K, V]> {
    __extendsIEnumerable: boolean;
  }
}

if (!Map.prototype.__extendsIEnumerable) {
  Map.prototype.__extendsIEnumerable = true;
  Object.assign(Map.prototype, Enumerable.prototype);
}
