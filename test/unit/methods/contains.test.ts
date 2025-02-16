import { Enumerable } from '@src';

describe('contains', () => {
  it('should return false for an empty enumerable', () => {
    // arrange
    const data = Enumerable.from<number>([]);

    // act
    const result = data.contains(42);

    // assert
    expect(result).toBe(false);
  });

  it('should return true if the enumerable contains the given value using default comparer', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);

    // act
    const result = data.contains(2);

    // assert
    expect(result).toBe(true);
  });

  it('should return false if the enumerable does not contain the given value using default comparer', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);

    // act
    const result = data.contains(4);

    // assert
    expect(result).toBe(false);
  });

  it('should return true if the enumerable contains the given value using a custom comparer', () => {
    // arrange
    const data = Enumerable.from<string>(['Apple', 'Banana', 'Cherry']);
    const comparer = (x: string, y: string) => x.toLowerCase() === y.toLowerCase();

    // act
    const result = data.contains('apple', comparer);

    // assert
    expect(result).toBe(true);
  });

  it('should return false if the enumerable does not contain the given value using a custom comparer', () => {
    // arrange
    const data = Enumerable.from<string>(['Apple', 'Banana', 'Cherry']);
    const comparer = (x: string, y: string) => x.toLowerCase() === y.toLowerCase();

    // act
    const result = data.contains('Durian', comparer);

    // assert
    expect(result).toBe(false);
  });
});
