/**
 * Vue3 LowCode Engine - Is Object Utils
 * 对象检查工具
 */

/**
 * 检查值是否为对象
 * @param value 要检查的值
 * @returns 是否为对象
 */
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object';
}

/**
 * 检查值是否为普通对象
 * @param value 要检查的值
 * @returns 是否为普通对象
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (!isObject(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * 检查值是否为空对象
 * @param value 要检查的值
 * @returns 是否为空对象
 */
export function isEmptyObject(value: any): boolean {
  return isObject(value) && Object.keys(value).length === 0;
}
