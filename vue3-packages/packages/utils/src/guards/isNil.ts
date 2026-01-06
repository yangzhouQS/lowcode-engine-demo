/**
 * Checks if a value is null or undefined.
 * 
 * @param value - The value to check
 * @returns True if the value is null or undefined, false otherwise
 * 
 * @example
 * ```ts
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 * isNil('') // false
 * isNil(false) // false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}
