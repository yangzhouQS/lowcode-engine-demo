/**
 * Returns an array of a given object's own enumerable property names.
 * 
 * @param obj - The object to query
 * @returns An array of property names
 * 
 * @example
 * ```ts
 * keys({ a: 1, b: 2, c: 3 }) // ['a', 'b', 'c']
 * keys({}) // []
 * keys(null) // []
 * ```
 */
export function keys(obj: Record<string, unknown> | null | undefined): string[] {
  if (!obj || typeof obj !== 'object') {
    return []
  }
  return Object.keys(obj)
}
