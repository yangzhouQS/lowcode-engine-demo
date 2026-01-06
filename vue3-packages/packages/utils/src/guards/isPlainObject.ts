/**
 * Checks if a value is a plain object (created by object literal or Object.create(null)).
 * 
 * @param value - The value to check
 * @returns True if the value is a plain object, false otherwise
 * 
 * @example
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject({ key: 'value' }) // true
 * isPlainObject(Object.create(null)) // true
 * isPlainObject([]) // false
 * isPlainObject(null) // false
 * isPlainObject(new Date()) // false
 * isPlainObject(new Map()) // false
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}
