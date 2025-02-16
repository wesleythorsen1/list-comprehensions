import { Enumerable } from '../../src';

describe('everything', () => {
  it('general random stuff works...', async () => {
    expect(1).toEqual(1);

    let e = Enumerable.empty<number>();

    e = e
      .append(2)
      .append(3)
      .append(1)
      .append(-100)
      .append(100)
      .where(n => n > 0)
      .where(n => n < 10)
      .append(200)
      .select(n => n * 2);

    // for (const a of e) {
    //   console.log(a);
    // }

    // console.log(e.toArray());
    // console.log(e.toArray());

    // const v1 = [1, 2, 3];
    // const v2 = new Array<number>(1, 2, 3);
    // const v3 = Enumerable.range(1, 3);
    // const v4 = new Set<number>([1, 2, 3]);
    // function* v5() {
    //   for (let i = 0; i < 10; i++) {
    //     yield i;
    //   }
    // }

    // const e1 = Enumerable.from(v1);
    // const e2 = Enumerable.from(v2);
    // const e3 = Enumerable.from(v3);
    // const e4 = Enumerable.from(v4);
    // const e5 = Enumerable.from(v5);
  });
});
