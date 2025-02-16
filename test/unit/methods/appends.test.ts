import { Enumerable } from '@src';

describe('append', () => {
  it('should return a new enumerable that yields only the appended value when the source is empty', () => {
    // arrange
    const data = Enumerable.from<number>([]);
    const valueToAppend = 42;

    // act
    const result = data.append(valueToAppend);

    // assert
    expect([...result]).toEqual([valueToAppend]);
  });

  it('should return a new enumerable that yields the source elements followed by the appended value', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);
    const valueToAppend = 4;

    // act
    const result = data.append(valueToAppend);

    // assert
    expect([...result]).toEqual([1, 2, 3, 4]);
  });

  it('should not modify the original enumerable', () => {
    // arrange
    const data = Enumerable.from<number>([1, 2, 3]);
    const valueToAppend = 4;

    // act
    const result = data.append(valueToAppend);

    // assert
    expect([...data]).toEqual([1, 2, 3]);
    expect([...result]).toEqual([1, 2, 3, 4]);
  });
});
