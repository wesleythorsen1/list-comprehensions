import { IEnumerable } from '../../IEnumerable';
import { asEnumerable } from '../../methods';

declare global {
  interface Array<T> extends IEnumerable<T> {
    asEnumerable: IEnumerable<T>['asEnumerable'];
  }
}

if (!Array.prototype.asEnumerable) {
  Array.prototype.asEnumerable = asEnumerable;
}
