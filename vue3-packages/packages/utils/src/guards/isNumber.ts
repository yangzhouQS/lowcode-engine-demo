/**
 * Checks if a value is a number.
 * 
 * @param value - The value to check
 * @returns True if the value is a number, false otherwise
 * 
 * @example
 * ```ts
 * isNumber(123) // true
 * isNumber('123') // false
 * isNumber(null) // false
 * isNumber(NaN) // true (typeof NaN === 'number')
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}
