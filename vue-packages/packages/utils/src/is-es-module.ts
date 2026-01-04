/**
 * Vue3 LowCode Engine - Utils Package
 * ES模块检查相关工具
 */

export function isESModule(obj: any): boolean {
  return obj && obj.__esModule;
}
