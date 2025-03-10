import { Enumerable } from '../../../src';

describe('skip', () => {
  it('should throw an error when count is negative', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);

    // act & assert
    expect(() => data.skip(-1)).toThrow('count must be 0 or larger');
  });

  it('should return all elements when count is 0', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);

    // act
    const result = data.skip(0);

    // assert
    expect([...result]).toEqual([1, 2, 3]);
  });

  it('should return an empty enumerable when count exceeds the number of elements', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);

    // act
    const result = data.skip(5);

    // assert
    expect([...result]).toEqual([]);
  });

  it('should skip the specified number of elements and return the rest', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3, 4, 5]);

    // act
    const result = data.skip(2);

    // assert
    expect([...result]).toEqual([3, 4, 5]);
  });

  it('should return an empty enumerable when count equals the number of elements', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);

    // act
    const result = data.skip(3);

    // assert
    expect([...result]).toEqual([]);
  });
});
