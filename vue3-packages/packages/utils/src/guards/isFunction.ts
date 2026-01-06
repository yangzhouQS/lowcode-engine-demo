/**
 * Checks if a value is a function.
 * 
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 * 
 * @example
 * ```ts
 * isFunction(() => {}) // true
 * isFunction(function() {}) // true
 * isFunction('function') // false
 * isFunction(null) // false
 * ```
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function'
}
