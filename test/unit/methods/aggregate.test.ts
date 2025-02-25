// import { Enumerable } from '@src';

describe('aggregate', () => {
  it('todo', async () => {
    expect(1).toEqual(1);
  });

  //   it('should throw an error when aggregating an empty enumerable without a seed', () => {
  //     // arrange
  //     const data = Enumerable.from<number>([]);
  //     const accumulator = (acc: number, x: number) => acc + x;

  //     // act & assert
  //     expect(() => data.aggregate(accumulator)).toThrow();
  //   });

  //   it('should aggregate using the first element as seed when no seed is provided', () => {
  //     // arrange
  //     const data = Enumerable.from<number>([1, 2, 3, 4]);
  //     const accumulator = (acc: number, x: number) => acc + x;

  //     // act
  //     const result = data.aggregate(accumulator);

  //     // assert
  //     expect(result).toBe(10);
  //   });

  //   it('should aggregate correctly with a seed and accumulator for a non-empty enumerable', () => {
  //     // arrange
  //     const data = Enumerable.from<number>([1, 2, 3]);
  //     const seed = 10;
  //     const accumulator = (acc: number, x: number) => acc * x;

  //     // act
  //     const result = data.aggregate(seed, accumulator);

  //     // assert
  //     expect(result).toBe(60); // 10 * 1 * 2 * 3 = 60
  //   });

  //   it('should return the seed when aggregating an empty enumerable with a seed', () => {
  //     // arrange
  //     const data = Enumerable.from<number>([]);
  //     const seed = 10;
  //     const accumulator = (acc: number, x: number) => acc * x;

  //     // act
  //     const result = data.aggregate(seed, accumulator);

  //     // assert
  //     expect(result).toBe(10);
  //   });

  //   it('should aggregate correctly with seed, accumulator, and resultSelector for a non-empty enumerable', () => {
  //     // arrange
  //     const data = Enumerable.from<number>([1, 2, 3]);
  //     const seed = 10;
  //     const accumulator = (acc: number, x: number) => acc + x;
  //     const resultSelector = (acc: number) => `Result: ${acc}`;

  //     // act
  //     const result = data.aggregate(seed, accumulator, resultSelector);

  //     // assert
  //     expect(result).toBe('Result: 16'); // 10 + 1 + 2 + 3 = 16
  //   });

  //   it('should return resultSelector(seed) when aggregating an empty enumerable with seed, accumulator, and resultSelector', () => {
  //     // arrange
  //     const data = Enumerable.from<number>([]);
  //     const seed = 10;
  //     const accumulator = (acc: number, x: number) => acc + x;
  //     const resultSelector = (acc: number) => `Result: ${acc}`;

  //     // act
  //     const result = data.aggregate(seed, accumulator, resultSelector);

  //     // assert
  //     expect(result).toBe('Result: 10');
  //   });

  //   it('should aggregate strings correctly without a seed', () => {
  //     // arrange
  //     const data = Enumerable.from<string>(['a', 'b', 'c']);
  //     const accumulator = (acc: string, x: string) => acc + x;

  //     // act
  //     const result = data.aggregate(accumulator);

  //     // assert
  //     expect(result).toBe('abc');
  //   });
});
