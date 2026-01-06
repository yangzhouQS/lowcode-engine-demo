/**
 * Flattens array a single level deep.
 * 
 * @param arr - The array to flatten
 * @returns The new flattened array
 * 
 * @example
 * ```ts
 * flatten([1, [2, [3, [4]], 5]) // [1, 2, [3, [4]], 5]
 * flatten([]) // []
 * flatten(null) // []
 * ```
 */
export function flatten<T>(arr: (T | T[])[] | null | undefined): T[] {
  if (!arr) {
    return []
  }
  return arr.flat(1) as T[]
}
