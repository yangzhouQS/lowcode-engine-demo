/**
 * Sets the value at path of object.
 * 
 * @param obj - The object to modify
 * @param path - The path of the property to set
 * @param value - The value to set
 * @returns The modified object
 * 
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } }
 * set(obj, 'a.b.c', 2)
 * // obj => { a: { b: { c: 2 } } }
 * 
 * set(obj, 'a.b.d', 3)
 * // obj => { a: { b: { c: 2, d: 3 } } }
 * 
 * set(obj, ['a', 'e'], 4)
 * // obj => { a: { b: { c: 2, d: 3 }, e: 4 } }
 * ```
 */
export function set<T = unknown>(
  obj: Record<string, unknown>,
  path: string | string[],
  value: T
): Record<string, unknown> {
  if (!obj) {
    return obj
  }

  const keys = Array.isArray(path) ? path : path.split('.')
  let current: Record<string, unknown> = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] == null || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return obj
}
