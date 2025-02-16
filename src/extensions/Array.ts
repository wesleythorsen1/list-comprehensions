import { Enumerable } from '../Enumerable';
import { IEnumerable } from '../IEnumerable';

declare global {
  interface Array<T> extends IEnumerable<T> {
    __extendsIEnumerable: boolean;
    concat(enumerable: IEnumerable<T>): IEnumerable<T>; // !!! Overrides the existing .concat() method !!!
  }
}

if (!Array.prototype.__extendsIEnumerable) {
  Array.prototype.__extendsIEnumerable = true;
  Object.assign(Array.prototype, Enumerable.prototype);
}
