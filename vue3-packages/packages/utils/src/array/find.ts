/**
 * Returns the first element predicate returns truthy for.
 * 
 * @param arr - The array to inspect
 * @param predicate - The predicate invoked per element
 * @returns The found element, else undefined
 * 
 * @example
 * ```ts
 * find([1, 2, 3], x => x > 2) // 3
 * find([1, 2, 3], x => x > 5) // undefined
 * find([], x => x > 2) // undefined
 * find(null, x => x > 2) // undefined
 * ```
 */
export function find<T>(
  arr: T[] | null | undefined,
  predicate: (item: T, index: number, arr: T[]) => boolean
): T | undefined {
  if (!arr || arr.length === 0) {
    return undefined
  }

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i]
    }
  }

  return undefined
}
