import { expect } from "@std/expect";
import { Enumerable } from "../../../src/index.ts";

Deno.test("it should return an empty record when the source is empty (tuple overload)", () => {
  // arrange
  const data = Enumerable.from([] as [string, number][]);

  // act
  const record = data.toRecord();

  // assert
  expect(record).toEqual({});
});

Deno.test("it should convert a sequence of tuples into a record (tuple overload)", () => {
  // arrange
  const data = Enumerable.from<[string, number]>([
    ["a", 1],
    ["b", 2],
  ]);

  // act
  const record = data.toRecord();

  // assert
  expect(record).toEqual({ a: 1, b: 2 });
});

Deno.test("it should create a record using keySelector only", () => {
  // arrange
  interface Item {
    id: string;
    value: number;
  }
  const data = Enumerable.from<Item>([
    { id: "a", value: 10 },
    { id: "b", value: 20 },
  ]);
  const keySelector = (item: Item) => item.id;

  // act
  const record = data.toRecord(keySelector);

  // assert
  expect(record).toEqual({
    a: { id: "a", value: 10 },
    b: { id: "b", value: 20 },
  });
});

Deno.test("it should create a record using keySelector and valueSelector", () => {
  // arrange
  interface Item {
    id: string;
    value: number;
  }
  const data = Enumerable.from<Item>([
    { id: "a", value: 10 },
    { id: "b", value: 20 },
  ]);
  const keySelector = (item: Item) => item.id;
  const valueSelector = (item: Item) => item.value;

  // act
  const record = data.toRecord(keySelector, valueSelector);

  // assert
  expect(record).toEqual({
    a: 10,
    b: 20,
  });
});

Deno.test("it should overwrite duplicate keys, taking the last element encountered", () => {
  // arrange
  interface Item {
    id: string;
    value: number;
  }
  const data = Enumerable.from<Item>([
    { id: "a", value: 1 },
    { id: "a", value: 2 },
  ]);
  const keySelector = (item: Item) => item.id;

  // act
  const recordKeyOnly = data.toRecord(keySelector);
  const valueSelector = (item: Item) => item.value;
  const recordWithValueSelector = data.toRecord(keySelector, valueSelector);

  // assert
  expect(recordKeyOnly).toEqual({ a: { id: "a", value: 2 } });
  expect(recordWithValueSelector).toEqual({ a: 2 });
});
