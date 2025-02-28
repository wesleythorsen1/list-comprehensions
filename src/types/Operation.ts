export type Operation =
  | { type: 'select'; fn: (x: any, i: number) => any }
  | { type: 'where'; fn: (x: any, i: number) => boolean };
