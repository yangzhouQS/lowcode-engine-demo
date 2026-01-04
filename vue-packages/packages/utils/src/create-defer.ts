/**
 * Vue3 LowCode Engine - Utils Package
 * 创建延迟对象
 */

export interface IDefer<T = any> {
  promise: () => Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export function createDefer<T = any>(): IDefer<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise: () => promise,
    resolve: resolve!,
    reject: reject!,
  };
}
