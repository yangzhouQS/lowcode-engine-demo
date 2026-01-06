/**
 * Creates an array of elements split into groups the length of size.
 * 
 * @param arr - The array to process
 * @param size - The length of each chunk
 * @returns The new array of chunks
 * 
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 1) // [[1], [2], [3]]
 * chunk([], 2) // []
 * chunk(null, 2) // []
 * ```
 */
export function chunk<T>(arr: T[] | null | undefined, size: number = 1): T[][] {
  if (!arr || arr.length === 0 || size <= 0) {
    return []
  }

  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
