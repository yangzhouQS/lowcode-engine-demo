/**
 * Creates an array of elements, sorted in ascending order by the results of running each element through iteratee.
 * 
 * @param arr - The array to iterate over
 * @param iteratee - The iteratee to sort by
 * @returns The new sorted array
 * 
 * @example
 * ```ts
 * sortBy([{a: 2}, {a: 1}, {a: 3}], 'a') // [{a: 1}, {a: 2}, {a: 3}]
 * sortBy([{a: 2}, {a: 1}, {a: 3}], x => x.a) // [{a: 1}, {a: 2}, {a: 3}]
 * sortBy([3, 1, 2], x => x) // [1, 2, 3]
 * ```
 */
export function sortBy<T>(
  arr: T[] | null | undefined,
  iteratee: ((item: T) => unknown) | keyof T
): T[] {
  if (!arr || arr.length === 0) {
    return []
  }

  const getValue = (item: T): unknown => {
    return typeof iteratee === 'function'
      ? (iteratee as (item: T) => unknown)(item)
      : (item as Record<string, unknown>)[iteratee as string]
  }

  return [...arr].sort((a, b) => {
    const valueA = getValue(a)
    const valueB = getValue(b)

    if (valueA < valueB) return -1
    if (valueA > valueB) return 1
    return 0
  })
}
