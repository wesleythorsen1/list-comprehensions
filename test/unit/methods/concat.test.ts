import { expect } from "@std/expect";
import { Enumerable } from "../../../src/Enumerable.ts";

Deno.test("it should return an empty enumerable when both sources are empty", () => {
  // arrange
  const first = Enumerable.from<number>([]);
  const second = Enumerable.from<number>([]);

  // act
  const result = first.concat(second);

  // assert
  expect([...result]).toEqual([]);
});

Deno.test("it should return the second enumerable when the first is empty", () => {
  // arrange
  const first = Enumerable.from<number>([]);
  const second = Enumerable.from<number>([1, 2, 3]);

  // act
  const result = first.concat(second);

  // assert
  expect([...result]).toEqual([1, 2, 3]);
});

Deno.test("it should return the first enumerable when the second is empty", () => {
  // arrange
  const first = Enumerable.from<number>([4, 5, 6]);
  const second = Enumerable.from<number>([]);

  // act
  const result = first.concat(second);

  // assert
  expect([...result]).toEqual([4, 5, 6]);
});

Deno.test("it should return a concatenated enumerable preserving the order of elements", () => {
  // arrange
  const first = Enumerable.from<number>([1, 2]);
  const second = Enumerable.from<number>([3, 4]);

  // act
  const result = first.concat(second);

  // assert
  expect([...result]).toEqual([1, 2, 3, 4]);
});

Deno.test("it should not mutate the original enumerables", () => {
  // arrange
  const first = Enumerable.from<number>([7, 8]);
  const second = Enumerable.from<number>([9, 10]);

  // act
  const result = first.concat(second);

  // assert
  expect([...first]).toEqual([7, 8]);
  expect([...second]).toEqual([9, 10]);
  expect([...result]).toEqual([7, 8, 9, 10]);
});
