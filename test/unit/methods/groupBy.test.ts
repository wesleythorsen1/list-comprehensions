import { expect } from "@std/expect";
import { Enumerable } from "../../../src/index.ts";

Deno.test("it should return an empty enumerable when the source is empty", () => {
  // arrange
  const data = Enumerable.from<number>([]);
  const keySelector = (x: number) => x % 2;

  // act
  const result = data.groupBy(keySelector);
  const arr = [...result];

  // assert
  expect(arr).toEqual([]);
});

Deno.test("it should group elements by even/odd using the keySelector", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4, 5, 6]);
  const keySelector = (x: number) => (x % 2 === 0 ? "even" : "odd");

  // act
  const result = data.groupBy(keySelector);
  const arr = [...result].map((group) => [group.key, [...group]]);

  // assert
  expect(arr).toEqual([
    ["odd", [1, 3, 5]],
    ["even", [2, 4, 6]],
  ]);
});

Deno.test("it should group all elements under a single key when keySelector returns a constant", () => {
  // arrange
  const data = Enumerable.from<number>([10, 20, 30]);
  const keySelector = (_: number) => "all";

  // act
  const result = data.groupBy(keySelector);
  const arr = [...result].map((group) => [group.key, [...group]]);

  // assert
  expect(arr).toEqual([["all", [10, 20, 30]]]);
});

Deno.test("it should group each element individually when using identity as keySelector", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3]);
  const keySelector = (x: number) => x;

  // act
  const result = data.groupBy(keySelector);
  const arr = [...result].map((group) => [group.key, [...group]]);

  // assert
  expect(arr).toEqual([
    [1, [1]],
    [2, [2]],
    [3, [3]],
  ]);
});

Deno.test("it should apply the valueSelector to transform grouped values", () => {
  // arrange
  interface Person {
    id: number;
    name: string;
  }
  const data = Enumerable.from<Person>([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Charlie" },
  ]);
  const keySelector = (p: Person) => p.id;
  const valueSelector = (p: Person) => p.name;

  // act
  const result = data.groupBy(keySelector, valueSelector);
  const arr = [...result].map((group) => [group.key, [...group]]);

  // assert
  expect(arr).toEqual([
    [1, ["Alice", "Charlie"]],
    [2, ["Bob"]],
  ]);
});

Deno.test("it should group objects correctly when key is an object", () => {
  // arrange
  const data = Enumerable.from<{ a: number }>([{ a: 1 }, { a: 1 }, { a: 2 }]);
  const keySelector = (x: { a: number }) => x;

  // act
  const result = data.groupBy(keySelector);
  const arr = [...result].map((group) => [group.key, [...group]]);

  // assert
  expect(arr).toEqual([
    [{ a: 1 }, [{ a: 1 }, { a: 1 }]],
    [{ a: 2 }, [{ a: 2 }]],
  ]);
});
