/**
 * Vue3 LowCode Engine - Utils Package
 * 纯对象检查相关工具
 */

export function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false;

  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;

  return proto === Object.prototype;
}
