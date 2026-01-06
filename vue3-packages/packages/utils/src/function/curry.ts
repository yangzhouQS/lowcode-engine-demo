export function curry<T extends (...args: any[]) => any>(
  func: T,
  arity: number = func.length
): (...args: any[]) => any {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= arity) {
      return func.apply(this, args)
    }
    return (...nextArgs: any[]) => curried.apply(this, args.concat(nextArgs))
  }
}
