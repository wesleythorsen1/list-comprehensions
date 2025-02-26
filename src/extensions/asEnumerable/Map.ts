import { IEnumerable } from '../../IEnumerable';
import { asEnumerable } from '../../methods';

declare global {
  interface Map<K, V> extends IEnumerable<[K, V]> {
    asEnumerable: IEnumerable<[K, V]>['asEnumerable'];
  }
}

if (!Map.prototype.asEnumerable) {
  Map.prototype.asEnumerable = asEnumerable;
}
