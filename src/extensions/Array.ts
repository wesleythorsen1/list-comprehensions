// import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';
import { asEnumerable } from '../methods';

declare global {
  // interface Array<T> extends IEnumerable<T> {
  //   __extendsIEnumerable: boolean;
  //   concat(enumerable: IEnumerable<T>): IEnumerable<T>; // !!! Overrides the existing .concat() method !!!
  // }

  interface Array<T> extends IEnumerable<T> {
    asEnumerable: IEnumerable<T>['asEnumerable'];
  }
}

// if (!Array.prototype.__extendsIEnumerable) {
//   Array.prototype.__extendsIEnumerable = true;
//   Object.assign(Array.prototype, Enumerable.prototype);
// }

if (!Array.prototype.asEnumerable) {
  Array.prototype.asEnumerable = asEnumerable;
}
