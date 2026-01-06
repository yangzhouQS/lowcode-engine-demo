/**
 * Converts string to camel case.
 * 
 * @param str - The string to convert
 * @returns The camel cased string
 * 
 * @example
 * ```ts
 * camelCase('foo-bar') // 'fooBar'
 * camelCase('foo_bar') // 'fooBar'
 * camelCase('Foo Bar') // 'fooBar'
 * camelCase('--foo-bar--') // 'fooBar'
 * ```
 */
export function camelCase(str: string): string {
  if (!str) return ''
  
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, c => c.toLowerCase())
}
