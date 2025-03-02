import { expect } from "@std/expect";
import { Enumerable } from "../../../src/index.ts";

Deno.test("it should throw an error when size is less than or equal to 0", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3]);

  // act & assert
  expect(() => data.chunk(0)).toThrow("batch size must be larger than 0");
});

Deno.test("it should return an empty enumerable when the source is empty", () => {
  // arrange
  const data = Enumerable.from<number>([]);

  // act
  const result = data.chunk(2);

  // assert
  expect([...result]).toEqual([]);
});

Deno.test("it should chunk the source into equal chunks when length is a multiple of the chunk size", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4]);

  // act
  const result = data.chunk(2);
  const chunks = [...result].map((chunk) => [...chunk]);

  // assert
  expect(chunks).toEqual([
    [1, 2],
    [3, 4],
  ]);
});

Deno.test("it should chunk the source with a smaller final chunk when length is not a multiple of the chunk size", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4, 5]);

  // act
  const result = data.chunk(2);
  const chunks = [...result].map((chunk) => [...chunk]);

  // assert
  expect(chunks).toEqual([[1, 2], [3, 4], [5]]);
});
