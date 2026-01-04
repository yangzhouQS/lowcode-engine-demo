/**
 * Vue3 LowCode Engine - Utils Package
 * 克隆可枚举属性相关工具
 */

export function cloneEnumerableProperty<T extends Record<string, any>>(obj: T): T {
  const result: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
