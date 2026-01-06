/**
 * Converts string to kebab case.
 * 
 * @param str - The string to convert
 * @returns The kebab cased string
 * 
 * @example
 * ```ts
 * kebabCase('fooBar') // 'foo-bar'
 * kebabCase('foo_bar') // 'foo-bar'
 * kebabCase('Foo Bar') // 'foo-bar'
 * kebabCase('--fooBar--') // 'foo-bar'
 * ```
 */
export function kebabCase(str: string): string {
  if (!str) return ''
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
