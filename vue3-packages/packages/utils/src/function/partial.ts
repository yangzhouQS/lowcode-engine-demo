export function partial<T extends (...args: any[]) => any>(
  func: T,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]) {
    return func.apply(this, [...partialArgs, ...args])
  }
}
