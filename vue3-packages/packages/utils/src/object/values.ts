/**
 * Returns an array of a given object's own enumerable property values.
 * 
 * @param obj - The object to query
 * @returns An array of property values
 * 
 * @example
 * ```ts
 * values({ a: 1, b: 2, c: 3 }) // [1, 2, 3]
 * values({}) // []
 * values(null) // []
 * ```
 */
export function values<T = unknown>(obj: Record<string, T> | null | undefined): T[] {
  if (!obj || typeof obj !== 'object') {
    return []
  }
  return Object.values(obj)
}
