/**
 * Vue3 LowCode Engine - Utils Package
 * 类型检查相关工具
 */

export function checkTypes<T>(value: unknown, type: string): value is T {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    case 'undefined':
      return typeof value === 'undefined';
    case 'null':
      return value === null;
    default:
      return false;
  }
}
