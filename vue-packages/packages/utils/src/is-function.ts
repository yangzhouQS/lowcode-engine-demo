/**
 * Vue3 LowCode Engine - Utils Package
 * 函数检查相关工具
 */

export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}
