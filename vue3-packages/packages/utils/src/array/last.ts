/**
 * Gets the last element of array.
 * 
 * @param arr - The array to query
 * @returns The last element of array, or undefined if array is empty
 * 
 * @example
 * ```ts
 * last([1, 2, 3]) // 3
 * last([]) // undefined
 * last(null) // undefined
 * ```
 */
export function last<T>(arr: T[] | null | undefined): T | undefined {
  if (!arr || arr.length === 0) {
    return undefined
  }
  return arr[arr.length - 1]
}
