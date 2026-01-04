/**
 * Vue3 LowCode Engine - Utils Package
 * 摇树检查相关工具
 */

export function isShaken(): boolean {
  return typeof process !== 'undefined' && process.env.NODE_ENV === 'production';
}
