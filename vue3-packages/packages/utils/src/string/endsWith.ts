export function endsWith(str: string, suffix: string): boolean {
  if (!str || !suffix) return false
  return str.slice(-suffix.length) === suffix
}
