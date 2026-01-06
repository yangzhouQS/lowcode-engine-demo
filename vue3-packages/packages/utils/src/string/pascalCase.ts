export function pascalCase(str: string): string {
  if (!str) return ''
  const camel = str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, c => c.toLowerCase())
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}
