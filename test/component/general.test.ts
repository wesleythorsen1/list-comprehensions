import '../../src/extensions/asEnumerable';
import { Enumerable } from '../../src';

describe('for debugging', () => {
  it('debug random stuff', async () => {
    const e1 = Enumerable.empty<number>();

    const e2 = e1
      .append(2)
      .append(3)
      .append(1)
      .append(-100)
      .append(100)
      .where(n => n > 0)
      .where(n => n < 10)
      .append(200)
      .select(n => n * 2)
      .select((n: number, i: number) => [i, n] as [number, number]);

    const record1 = e2.toRecord();

    const lookup = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
      { id: 1, name: 'd' },
    ]
      .asEnumerable()
      .toLookup(e => e.id);

    const group = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
      { id: 1, name: 'd' },
    ]
      .asEnumerable()
      .groupBy(
        el => el.id,
        el => el.name,
      );

    expect(1).toEqual(1);
  });
});
