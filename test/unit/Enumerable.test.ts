import { expect } from "@std/expect";
import { Enumerable } from "../../src/Enumerable.ts";

Deno.test("it can be enumerate array base more than once", () => {
  const enumerable = Enumerable.from([1, 2, 3, 4, 5, 6])
    .select((n) => n * 3)
    .where((n) => n % 2 === 0);

  const enumeration1 = enumerable.toArray();
  const enumeration2 = enumerable.toArray();

  expect(enumeration1).toEqual([6, 12, 18]);
  expect(enumeration2).toEqual([6, 12, 18]);
});

Deno.test("it can be enumerate generator base more than once", () => {
  const enumerable = Enumerable.range(1, 7)
    .select((n) => n * 3)
    .where((n) => n % 2 === 0);

  const enumeration1 = enumerable.toArray();
  const enumeration2 = enumerable.toArray();

  expect(enumeration1).toEqual([6, 12, 18]);
  expect(enumeration2).toEqual([6, 12, 18]);
});
