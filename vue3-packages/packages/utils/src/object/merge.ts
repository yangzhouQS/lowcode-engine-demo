/**
 * Creates a new object by merging the properties of the source objects into the destination object.
 * 
 * @param target - The destination object
 * @param sources - The source objects
 * @returns The merged object
 * 
 * @example
 * ```ts
 * merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
 * merge({ a: 1 }, { a: 2 }) // { a: 2 }
 * merge({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }
 * ```
 */
export function merge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result = { ...target }
  for (const source of sources) {
    if (source) {
      Object.assign(result, source)
    }
  }
  return result
}
