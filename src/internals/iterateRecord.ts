/**
 * Type safe Object.entries(...)
 * @param record
 */
export function* iterateRecord<TKey extends keyof any, TValue>(record: Record<TKey, TValue>) {
  for (const [key, value] of Object.entries(record)) {
    yield { key: key as TKey, value: value as TValue };
  }
}
