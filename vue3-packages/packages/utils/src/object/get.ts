/**
 * Gets the value at path of object.
 * 
 * @param obj - The object to query
 * @param path - The path of the property to get
 * @param defaultValue - The value returned for undefined resolved values
 * @returns The resolved value
 * 
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } }
 * get(obj, 'a.b.c') // 1
 * get(obj, 'a.b.d') // undefined
 * get(obj, 'a.b.d', 'default') // 'default'
 * get(obj, ['a', 'b', 'c']) // 1
 * ```
 */
export function get<T = unknown>(
  obj: Record<string, unknown>,
  path: string | string[],
  defaultValue?: T
): T {
  if (!obj) {
    return defaultValue as T
  }

  const keys = Array.isArray(path) ? path : path.split('.')
  let result: unknown = obj

  for (const key of keys) {
    if (result == null) {
      return defaultValue as T
    }
    result = (result as Record<string, unknown>)[key]
  }

  return result === undefined ? (defaultValue as T) : (result as T)
}
