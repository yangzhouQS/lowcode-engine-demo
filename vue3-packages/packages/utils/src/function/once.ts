export function once<T extends (...args: any[]) => any>(func: T): T {
  let called = false
  let result: ReturnType<T>

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true
      result = func.apply(this, args)
    }
    return result
  } as T
}
