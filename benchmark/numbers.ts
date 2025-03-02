import { Enumerable } from "../src/Enumerable.ts";

const data = Array.from({ length: 1_000_000 }, (_, i) => i);
const square = (x: number) => x * x;
const isEven = (x: number) => x % 2 === 0;
const multiply = (x: number, y: number) => x * y;

Deno.bench("Enumerable", () => {
  Enumerable.from(data)
    .where(isEven)
    .select(square)
    .select(multiply)
    .where(isEven)
    .toArray();
});

Deno.bench("Array", () => {
  data.filter(isEven).map(square).map(multiply).filter(isEven);
});
