/**
 * Gets the first element of array.
 * 
 * @param arr - The array to query
 * @returns The first element of array, or undefined if array is empty
 * 
 * @example
 * ```ts
 * first([1, 2, 3]) // 1
 * first([]) // undefined
 * first(null) // undefined
 * ```
 */
export function first<T>(arr: T[] | null | undefined): T | undefined {
  if (!arr || arr.length === 0) {
    return undefined
  }
  return arr[0]
}
