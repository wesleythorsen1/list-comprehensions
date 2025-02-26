import { Enumerable } from '../../../src';

describe('where', () => {
  it('should return an empty enumerable when the source is empty', () => {
    // arrange
    const data = Enumerable.from<number>([]);
    const predicate = (x: number, i: number) => x > 0;

    // act
    const result = data.where(predicate);
    const arr = [...result];

    // assert
    expect(arr).toEqual([]);
  });

  it('should return only the elements that satisfy the predicate', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3, 4, 5]);
    const predicate = (x: number, i: number) => x % 2 === 0;

    // act
    const result = data.where(predicate);
    const arr = [...result];

    // assert
    expect(arr).toEqual([2, 4]);
  });

  it('should filter elements based on their index', () => {
    // arrange
    const data = Enumerable.from<number>([10, 20, 30, 40, 50]);
    // keep elements at even indices: 0, 2, 4 -> [10, 30, 50]
    const predicate = (x: number, i: number) => i % 2 === 0;

    // act
    const result = data.where(predicate);
    const arr = [...result];

    // assert
    expect(arr).toEqual([10, 30, 50]);
  });

  it('should return an empty enumerable when no elements satisfy the predicate', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);
    const predicate = (x: number, i: number) => x > 10;

    // act
    const result = data.where(predicate);
    const arr = [...result];

    // assert
    expect(arr).toEqual([]);
  });

  it('should return all elements when predicate always returns true', () => {
    // arrange
    const data = Enumerable.from<string>(['a', 'b', 'c']);
    const predicate = (x: string, i: number) => true;

    // act
    const result = data.where(predicate);
    const arr = [...result];

    // assert
    expect(arr).toEqual(['a', 'b', 'c']);
  });
});
