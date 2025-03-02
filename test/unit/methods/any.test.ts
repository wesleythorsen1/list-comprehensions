import { expect } from "@std/expect";
import { Enumerable } from "../../../src/index.ts";

Deno.test("it should return false for an empty iterable with no predicate", () => {
  // arrange
  const data = Enumerable.from<number>([]);

  // act
  const result = data.any();

  // assert
  expect(result).toBe(false);
});

Deno.test("it should return false for an empty iterable even when a predicate is provided", () => {
  // arrange
  const data = Enumerable.from<number>([]);

  // act
  const result = data.any((x) => x > 0);

  // assert
  expect(result).toBe(false);
});

Deno.test("it should return false when no element is truthy using the default predicate", () => {
  // arrange
  const data = Enumerable.from<unknown>([0, false, "", null, undefined]);

  // act
  const result = data.any();

  // assert
  expect(result).toBe(false);
});

Deno.test("it should return true when at least one element is truthy using the default predicate", () => {
  // arrange
  const data = Enumerable.from<unknown>([0, false, "", "hello"]);

  // act
  const result = data.any();

  // assert
  expect(result).toBe(true);
});

Deno.test("it should return true when at least one element satisfies the given predicate", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4]);

  // act
  const result = data.any((x) => x % 2 === 0);

  // assert
  expect(result).toBe(true);
});

Deno.test("it should return false when no element satisfies the given predicate", () => {
  // arrange
  const data = Enumerable.from<number>([1, 3, 5]);

  // act
  const result = data.any((x) => x % 2 === 0);

  // assert
  expect(result).toBe(false);
});

Deno.test("it should stop iterating as soon as the predicate returns true", () => {
  // arrange
  let callCount = 0;
  const data = Enumerable.from<number>([1, 2, 3, 4]);

  // act
  const result = data.any((x) => {
    callCount++;
    return x === 1;
  });

  // assert
  expect(result).toBe(true);
  expect(callCount).toBe(1);
});
