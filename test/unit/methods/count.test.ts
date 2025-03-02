import { expect } from "@std/expect";
import { Enumerable } from "../../../src/Enumerable.ts";

Deno.test("it should return 0 for an empty enumerable when no predicate is provided", () => {
  // arrange
  const data = Enumerable.from<number>([]);

  // act
  const result = data.count();

  // assert
  expect(result).toBe(0);
});

Deno.test("it should return the total number of elements when no predicate is provided", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4]);

  // act
  const result = data.count();

  // assert
  expect(result).toBe(4);
});

Deno.test("it should count falsy values with a the default predicate", () => {
  // arrange
  const data = Enumerable.from<unknown>([0, false, "", null, undefined]);

  // act
  const result = data.count((_) => true);

  // assert
  expect(result).toBe(5);
});

Deno.test("it should return the correct count when a predicate is provided", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4, 5, 6]);

  // act
  const result = data.count((x) => x % 2 === 0);

  // assert
  expect(result).toBe(3);
});

Deno.test("it should return 0 when no elements satisfy the predicate", () => {
  // arrange
  const data = Enumerable.from<number>([1, 3, 5, 7]);

  // act
  const result = data.count((x) => x % 2 === 0);

  // assert
  expect(result).toBe(0);
});

Deno.test("it should count correctly with a predicate that always returns true", () => {
  // arrange
  const data = Enumerable.from<number>([10, 20, 30]);

  // act
  const result = data.count((_) => true);

  // assert
  expect(result).toBe(3);
});
