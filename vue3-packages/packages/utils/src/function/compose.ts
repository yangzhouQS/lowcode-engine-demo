export function compose<T extends (...args: any[]) => any>(
  ...funcs: T[]
): (...args: Parameters<T>) => ReturnType<T> {
  if (funcs.length === 0) {
    return ((arg: any) => arg) as any
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  )
}
