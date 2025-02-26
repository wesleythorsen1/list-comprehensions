import { Enumerable } from '../../src';

describe('method combinations', () => {
  it('repeat -> select -> where -> select -> groupBy -> toArray', async () => {
    const enumerable = Enumerable.repeat(1, 12)
      .select((n: number, i: number) => n * i)
      .where(n => n >= 6)
      .select(n => n * 3)
      .groupBy(e => (e % 2 ? 'odd' : 'even'));

    const result = enumerable.toArray();

    expect(result.length).toEqual(2);
    expect(result[0].key).toEqual('even');
    expect(result[0].toArray()).toEqual([18, 24, 30]);
    expect(result[1].key).toEqual('odd');
    expect(result[1].toArray()).toEqual([21, 27, 33]);
  });
});
