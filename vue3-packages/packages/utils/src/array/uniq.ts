/**
 * Creates a duplicate-free version of an array.
 * 
 * @param arr - The array to inspect
 * @returns The new duplicate free array
 * 
 * @example
 * ```ts
 * uniq([1, 2, 1, 3, 2]) // [1, 2, 3]
 * uniq([]) // []
 * uniq(null) // []
 * ```
 */
export function uniq<T>(arr: T[] | null | undefined): T[] {
  if (!arr) {
    return []
  }
  return Array.from(new Set(arr))
}
