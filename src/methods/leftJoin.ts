import { Enumerable } from '../Enumerable';
import { iterateRecord, toLookupIntermediary } from '../internals';

export function leftJoin<TLeft, TRight, TKey extends keyof any>(
  this: Enumerable<TLeft>,
  leftKeySelector: (element: TLeft) => TKey,
  right: Enumerable<TRight>,
  rightKeySelector: (element: TRight) => TKey,
): Enumerable<{ key: TKey; left: TLeft; right: Enumerable<TRight> }> {
  const leftIntermediary = toLookupIntermediary(this, leftKeySelector);
  const rightIntermediary = toLookupIntermediary(right, rightKeySelector);

  return Enumerable.from(iterateRecord(leftIntermediary)).select(l => {
    if (l.value.length > 1) throw new Error('Left Enumerable contains duplicate keys');

    return {
      key: l.key,
      left: l.value[0],
      right: Enumerable.from(rightIntermediary[l.key] || []),
    };
  });
}
