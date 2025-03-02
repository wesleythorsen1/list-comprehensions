import { Enumerable } from "../src/Enumerable.ts";

const lengthGreaterThan = (n: number) => (str: string) => str.length > n;
const startsWith = (start: string) => (str: string) => str.startsWith(start);
const substr = (n: number) => (str: string) => str.substring(n);

const file = await Deno.readTextFile("./benchmark/words.txt");
const lines = file.split("\n");

console.log(lines.length);

const a = Enumerable.from(lines)
  .where(lengthGreaterThan(6))
  .select(substr(2))
  .where(startsWith("s"))
  .skip(5000)
  .select(substr(1))
  .where(startsWith("a"))
  .take(100)
  .toArray();

console.log(a);

const b = lines.filter(lengthGreaterThan(6))
  .map(substr(2))
  .filter(startsWith("s"))
  .slice(5000)
  .map(substr(1))
  .filter(startsWith("a"))
  .slice(0, 100);

console.log(b);

Deno.bench("Enumerable", () => {
  Enumerable.from(lines)
    .where(lengthGreaterThan(6))
    .select(substr(2))
    .where(startsWith("s"))
    .skip(5000)
    .select(substr(1))
    .where(startsWith("a"))
    .take(100)
    .toArray();
});

Deno.bench("Array", () => {
  lines.filter(lengthGreaterThan(6))
    .map(substr(2))
    .filter(startsWith("s"))
    .slice(5000)
    .map(substr(1))
    .filter(startsWith("a"))
    .slice(0, 100);
});
