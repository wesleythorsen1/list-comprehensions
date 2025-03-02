import { expect } from "@std/expect";
import { Enumerable } from "../../../src/Enumerable.ts";

Deno.test("it should return an empty enumerable when the source is empty", () => {
  // arrange
  const data = Enumerable.from<number>([]);

  // act
  const result = data.where((x: number) => x > 0);
  const arr = [...result];

  // assert
  expect(arr).toEqual([]);
});

Deno.test("it should return only the elements that satisfy the predicate", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4, 5]);

  // act
  const result = data.where((x: number) => x % 2 === 0);
  const arr = [...result];

  // assert
  expect(arr).toEqual([2, 4]);
});

Deno.test("it should filter elements based on their index", () => {
  // arrange
  const data = Enumerable.from<number>([10, 20, 30, 40, 50]);
  // keep elements at even indices: 0, 2, 4 -> [10, 30, 50]

  // act
  const result = data.where((_: number, i: number) => i % 2 === 0);
  const arr = [...result];

  // assert
  expect(arr).toEqual([10, 30, 50]);
});

Deno.test("it should return an empty enumerable when no elements satisfy the predicate", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3]);

  // act
  const result = data.where((x: number) => x > 10);
  const arr = [...result];

  // assert
  expect(arr).toEqual([]);
});

Deno.test("it should return all elements when predicate always returns true", () => {
  // arrange
  const data = Enumerable.from<string>(["a", "b", "c"]);

  // act
  const result = data.where(() => true);
  const arr = [...result];

  // assert
  expect(arr).toEqual(["a", "b", "c"]);
});
