import { expect } from "@std/expect";
import { Enumerable } from "../../../src/index.ts";

Deno.test("it should return null when the source is empty", () => {
  // arrange
  const data = Enumerable.from<number>([]);

  // act
  const result = data.min();

  // assert
  expect(result).toBeNull();
});

Deno.test("it should return the smallest number in the enumerable", () => {
  // arrange
  const data = Enumerable.from<number>([5, 3, 9, 1, 4]);

  // act
  const result = data.min();

  // assert
  expect(result).toBe(1);
});

Deno.test("it should return the first occurrence of the minimum number when duplicates exist", () => {
  // arrange
  const data = Enumerable.from<number>([3, 1, 1, 2]);

  // act
  const result = data.min();

  // assert
  expect(result).toBe(1);
});
