import { expect } from "@std/expect";
import { Enumerable } from "../../../src/index.ts";

Deno.test("it should throw an error when count is negative", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3]);

  // act & assert
  expect(() => data.take(-1)).toThrow("count must be 0 or larger");
});

Deno.test("it should return an empty enumerable when count is 0", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3]);

  // act
  const result = data.take(0);

  // assert
  expect([...result]).toEqual([]);
});

Deno.test("it should return the first n elements when count is less than or equal to the length of the enumerable", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4, 5]);

  // act
  const result = data.take(3);

  // assert
  expect([...result]).toEqual([1, 2, 3]);
});

Deno.test("it should return all elements when count exceeds the length of the enumerable", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3]);

  // act
  const result = data.take(5);

  // assert
  expect([...result]).toEqual([1, 2, 3]);
});

Deno.test("it should return an empty enumerable when the source is empty regardless of count", () => {
  // arrange
  const data = Enumerable.from<number>([]);

  // act
  const result = data.take(3);

  // assert
  expect([...result]).toEqual([]);
});
