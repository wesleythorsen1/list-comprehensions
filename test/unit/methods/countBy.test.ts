import { Enumerable } from '@src';

describe('countBy', () => {
  it('should return an empty enumerable when the source is empty', () => {
    // arrange
    const data = Enumerable.from<number>([]);
    const keySelector = (x: number) => x % 2;

    // act
    const result = data.countBy(keySelector);
    const arr = [...result];

    // assert
    expect(arr).toEqual([]);
  });

  it('should group elements by even/odd using the keySelector', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3, 4, 5, 6]);
    const keySelector = (x: number) => (x % 2 === 0 ? 'even' : 'odd');

    // act
    const result = data.countBy(keySelector);
    const arr = [...result];

    // assert
    expect(arr).toEqual([
      ['odd', 3],
      ['even', 3],
    ]);
  });

  it('should group all elements under a single key when keySelector returns a constant', () => {
    // arrange
    const data = Enumerable.from<number>([10, 20, 30]);
    const keySelector = (_: number) => 'all';

    // act
    const result = data.countBy(keySelector);
    const arr = [...result];

    // assert
    expect(arr).toEqual([['all', 3]]);
  });

  it('should count each unique element when using identity as keySelector', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);
    const keySelector = (x: number) => x;

    // act
    const result = data.countBy(keySelector);
    const arr = [...result];

    // assert
    expect(arr).toEqual([
      [1, 1],
      [2, 1],
      [3, 1],
    ]);
  });

  it('should use a custom comparer to group objects correctly', () => {
    // arrange
    interface Item {
      id: number;
    }
    const data = Enumerable.from<Item>([{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }]);
    const keySelector = (item: Item) => item;
    const comparer = (a: Item, b: Item) => a.id === b.id;

    // act
    const result = data.countBy(keySelector, comparer);
    const arr = [...result].map(([item, count]) => [item.id, count]);

    // assert
    expect(arr).toEqual([
      [1, 2],
      [2, 1],
      [3, 1],
    ]);
  });
});
