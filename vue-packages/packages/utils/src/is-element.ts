/**
 * Vue3 LowCode Engine - Utils Package
 * 元素检查相关工具
 */

export function isElement(obj: any): obj is Element {
  return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}
