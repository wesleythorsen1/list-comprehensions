export type IsKeyValuePair<T> = T extends
  [infer Key extends string | number | symbol, unknown] ? true
  : false;
