import { expect } from "@std/expect";
import { Enumerable } from "../../../src/index.ts";

Deno.test(
  "it should return true for an empty iterable (vacuous truth)",
  () => {
    // arrange
    const data = Enumerable.from<number>([]);

    // act
    const result = data.all((x: number) => x > 0);

    // assert
    expect(result).toBe(true);
  },
);

Deno.test(
  "it should return true if all elements satisfy the predicate",
  () => {
    // arrange
    const data = Enumerable.from<number>([2, 4, 6]);

    // act
    const result = data.all((x: number) => x % 2 === 0);

    // assert
    expect(result).toBe(true);
  },
);

Deno.test(
  "it should return false if any element does not satisfy the predicate",
  () => {
    // arrange
    const data = Enumerable.from<number>([2, 3, 4]);

    // act
    const result = data.all((x: number) => x % 2 === 0);

    // assert
    expect(result).toBe(false);
  },
);

Deno.test("it should stop iterating as soon as a predicate fails", () => {
  // arrange
  let count = 0;
  const data = Enumerable.from<number>([2, 3, 4, 6]);

  // act
  const result = data.all((x: number) => {
    count++;
    return x % 2 === 0;
  });

  // assert
  expect(result).toBe(false);
  expect(count).toBe(2);
});
