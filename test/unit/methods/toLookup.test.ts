import { expect } from "@std/expect";
import { Enumerable } from "../../../src/Enumerable.ts";

Deno.test("it should return an empty map when the source is empty", () => {
  // arrange
  const data = Enumerable.from<number>([]);
  const keySelector = (x: number) => x % 2;

  // act
  const lookup = data.toLookup(keySelector);

  // assert
  expect(lookup.size).toBe(0);
});

Deno.test("it should group elements by even/odd using the keySelector", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3, 4, 5, 6]);
  const keySelector = (x: number) => (x % 2 === 0 ? "even" : "odd");

  // act
  const lookup = data.toLookup(keySelector);

  // assert
  expect(lookup.size).toBe(2);
  const oddGroup = lookup.get("odd");
  const evenGroup = lookup.get("even");
  expect(oddGroup ? [...oddGroup] : []).toEqual([1, 3, 5]);
  expect(evenGroup ? [...evenGroup] : []).toEqual([2, 4, 6]);
});

Deno.test("it should group all elements under a single key when keySelector returns a constant", () => {
  // arrange
  const data = Enumerable.from<number>([10, 20, 30]);
  const keySelector = (_: number) => "all";

  // act
  const lookup = data.toLookup(keySelector);

  // assert
  expect(lookup.size).toBe(1);
  const allGroup = lookup.get("all");
  expect(allGroup ? [...allGroup] : []).toEqual([10, 20, 30]);
});

Deno.test("it should group each element individually when using identity as keySelector", () => {
  // arrange
  const data = Enumerable.from<number>([1, 2, 3]);
  const keySelector = (x: number) => x;

  // act
  const lookup = data.toLookup(keySelector);

  // assert
  expect(lookup.size).toBe(3);
  expect(lookup.get(1) ? [...lookup.get(1)!] : []).toEqual([1]);
  expect(lookup.get(2) ? [...lookup.get(2)!] : []).toEqual([2]);
  expect(lookup.get(3) ? [...lookup.get(3)!] : []).toEqual([3]);
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
  const lookup = data.toLookup(keySelector, valueSelector);

  // assert
  expect(lookup.size).toBe(2);
  expect(lookup.get(1) ? [...lookup.get(1)!] : []).toEqual([
    "Alice",
    "Charlie",
  ]);
  expect(lookup.get(2) ? [...lookup.get(2)!] : []).toEqual(["Bob"]);
});
