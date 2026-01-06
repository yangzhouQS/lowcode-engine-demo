/**
 * Returns the index of the first element predicate returns truthy for.
 * 
 * @param arr - The array to inspect
 * @param predicate - The predicate invoked per element
 * @returns The index of the found element, else -1
 * 
 * @example
 * ```ts
 * findIndex([1, 2, 3], x => x > 2) // 2
 * findIndex([1, 2, 3], x => x > 5) // -1
 * findIndex([], x => x > 2) // -1
 * findIndex(null, x => x > 2) // -1
 * ```
 */
export function findIndex<T>(
  arr: T[] | null | undefined,
  predicate: (item: T, index: number, arr: T[]) => boolean
): number {
  if (!arr || arr.length === 0) {
    return -1
  }

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return i
    }
  }

  return -1
}
