import { Enumerable } from '../../../src';

describe('minBy', () => {
  it('should return null when the source is empty', () => {
    // arrange
    const data = Enumerable.from<number>([]);

    // act
    const result = data.minBy(x => x);

    // assert
    expect(result).toBeNull();
  });

  it('should return the element with the minimum value using the default comparer', () => {
    // arrange
    const data = Enumerable.from<number>([7, 3, 9, 1, 4]);

    // act
    const result = data.minBy(x => x);

    // assert
    expect(result).toBe(1);
  });

  it('should return the first occurrence of the minimum value when duplicates exist', () => {
    // arrange
    const data = Enumerable.from<number>([3, 1, 1, 2]);

    // act
    const result = data.minBy(x => x);

    // assert
    expect(result).toBe(1);
  });

  it('should work with objects using a valueSelector', () => {
    // arrange
    interface Item {
      weight: number;
      name: string;
    }
    const data = Enumerable.from<Item>([
      { weight: 10, name: 'A' },
      { weight: 5, name: 'B' },
      { weight: 7, name: 'C' },
    ]);

    // act
    const result = data.minBy(item => item.weight);

    // assert
    expect(result).toEqual({ weight: 5, name: 'B' });
  });

  it('should work correctly with a custom comparer', () => {
    // arrange
    const data = Enumerable.from<string>(['sunflower', 'rose', 'tulip', 'daisy']);
    const valueSelector = (s: string) => s;
    // custom comparer: alphabetical order using localeCompare
    const comparer = (a: string, b: string) => a.localeCompare(b);

    // act
    const result = data.minBy(valueSelector, comparer);

    // assert
    // 'daisy' is the alphabetically smallest string among the provided values
    expect(result).toBe('daisy');
  });
});
