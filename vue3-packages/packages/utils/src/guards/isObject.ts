/**
 * Checks if a value is an object (excluding null and arrays).
 * 
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 * 
 * @example
 * ```ts
 * isObject({}) // true
 * isObject({ key: 'value' }) // true
 * isObject([]) // false
 * isObject(null) // false
 * isObject('string') // false
 * ```
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
