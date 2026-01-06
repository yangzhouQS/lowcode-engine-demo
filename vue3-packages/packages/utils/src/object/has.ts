/**
 * Checks if path is a direct property of object.
 * 
 * @param obj - The object to query
 * @param path - The path to check
 * @returns True if path exists, false otherwise
 * 
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } }
 * has(obj, 'a.b.c') // true
 * has(obj, 'a.b.d') // false
 * has(obj, ['a', 'b', 'c']) // true
 * ```
 */
export function has(obj: Record<string, unknown>, path: string | string[]): boolean {
  if (!obj) {
    return false
  }

  const keys = Array.isArray(path) ? path : path.split('.')
  let result: unknown = obj

  for (const key of keys) {
    if (result == null) {
      return false
    }
    result = (result as Record<string, unknown>)[key]
  }

  return result !== undefined
}
