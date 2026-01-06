/**
 * Checks if a value is an array.
 * 
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * 
 * @example
 * ```ts
 * isArray([]) // true
 * isArray([1, 2, 3]) // true
 * isArray({}) // false
 * isArray(null) // false
 * ```
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}
