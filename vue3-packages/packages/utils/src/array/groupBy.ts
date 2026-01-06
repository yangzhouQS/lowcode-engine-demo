/**
 * Creates an object composed of keys generated from the results of running each element of collection through iteratee.
 * 
 * @param arr - The array to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns The composed aggregate object
 * 
 * @example
 * ```ts
 * groupBy([1.2, 1.4, 2.1], Math.floor) // { 1: [1.2, 1.4], 2: [2.1] }
 * groupBy([{a: 1}, {a: 2}, {a: 1}], 'a') // { 1: [{a: 1}, {a: 1}], 2: [{a: 2}] }
 * groupBy([{a: 1}, {a: 2}, {a: 1}], x => x.a) // { 1: [{a: 1}, {a: 1}], 2: [{a: 2}] }
 * ```
 */
export function groupBy<T>(
  arr: T[] | null | undefined,
  iteratee: ((item: T) => unknown) | keyof T
): Record<string, T[]> {
  if (!arr || arr.length === 0) {
    return {}
  }

  const result: Record<string, T[]> = {}

  for (const item of arr) {
    const key = typeof iteratee === 'function'
      ? String((iteratee as (item: T) => unknown)(item))
      : String((item as Record<string, unknown>)[iteratee as string])

    if (!result[key]) {
      result[key] = []
    }
    result[key].push(item)
  }

  return result
}
