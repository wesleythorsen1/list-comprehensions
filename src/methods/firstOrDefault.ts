import { Enumerable } from '../Enumerable';

export function firstOrDefault<T>(this: Enumerable<T>, defaultValue: any = null) {
  return this.firstOrDefaultBy(_ => true, defaultValue);
}
