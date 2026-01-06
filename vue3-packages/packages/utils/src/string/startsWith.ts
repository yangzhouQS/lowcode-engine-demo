export function startsWith(str: string, prefix: string): boolean {
  if (!str || !prefix) return false
  return str.slice(0, prefix.length) === prefix
}
