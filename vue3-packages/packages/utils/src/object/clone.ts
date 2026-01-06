/**
 * Creates a shallow clone of value.
 * 
 * @param value - The value to clone
 * @returns The cloned value
 * 
 * @example
 * ```ts
 * const obj = { a: 1, b: { c: 2 } }
 * const cloned = clone(obj)
 * cloned !== obj // true
 * cloned.b === obj.b // true (shallow clone)
 * clone(null) // null
 * clone(123) // 123
 * clone([1, 2, 3]) // [1, 2, 3]
 * ```
 */
export function clone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (Array.isArray(value)) {
    return value.slice() as T
  }

  return { ...value }
}
