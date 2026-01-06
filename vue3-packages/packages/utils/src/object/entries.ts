/**
 * Returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
 * 
 * @param obj - The object to query
 * @returns An array of [key, value] pairs
 * 
 * @example
 * ```ts
 * entries({ a: 1, b: 2, c: 3 }) // [['a', 1], ['b', 2], ['c', 3]]
 * entries({}) // []
 * entries(null) // []
 * ```
 */
export function entries<K extends string, V = unknown>(
  obj: Record<K, V> | null | undefined
): [K, V][] {
  if (!obj || typeof obj !== 'object') {
    return []
  }
  return Object.entries(obj) as [K, V][]
}
