import type { IEnumerable } from "../IEnumerable.ts";

export function toRecord<
  TSource extends [TKey, TValue],
  TKey extends string | number | symbol,
  TValue,
>(this: IEnumerable<TSource>): Record<TKey, TValue>;

export function toRecord<TSource, TKey extends string | number | symbol>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
): Record<TKey, TSource>;

export function toRecord<
  TSource,
  TKey extends string | number | symbol,
  TValue,
>(
  this: IEnumerable<TSource>,
  keySelector: (element: TSource) => TKey,
  valueSelector: (element: TSource) => TValue,
): Record<TKey, TValue>;

export function toRecord<
  TSource,
  TKey extends string | number | symbol,
  TValue,
>(
  this: IEnumerable<TSource>,
  keySelector?: (element: TSource) => TKey,
  valueSelector?: (element: TSource) => TValue,
): Record<TKey, TValue> {
  if (!keySelector) {
    // @ts-expect-error TODO: Types are messed up on this
    return Object.fromEntries(this);
  }

  if (!valueSelector) {
    // @ts-expect-error TODO: Types are messed up on this
    return Object.fromEntries(this.select((e) => [keySelector(e), e]));
  }

  // @ts-expect-error TODO: Types are messed up on this
  return Object.fromEntries(
    this.select((e) => [keySelector(e), valueSelector(e)]),
  );
}
