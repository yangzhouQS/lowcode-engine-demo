/**
 * Creates a new object by deeply merging properties of source objects into destination object.
 * 
 * @param target - The destination object
 * @param sources - The source objects
 * @returns The deeply merged object
 * 
 * @example
 * ```ts
 * deepMerge({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
 * deepMerge({ a: { b: 1 } }, { a: { b: 2 } }) // { a: { b: 2 } }
 * deepMerge({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }
 * ```
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result = { ...target }

  for (const source of sources) {
    if (!source) continue

    for (const key in source) {
      const sourceValue = source[key]
      const targetValue = result[key]

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        )
      } else {
        result[key] = sourceValue
      }
    }
  }

  return result
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}
