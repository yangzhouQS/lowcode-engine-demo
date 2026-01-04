/**
 * Vue3 LowCode Engine - Unique ID Utils
 * 唯一ID生成工具
 */

let idCounter = 0;

/**
 * 生成唯一ID
 * @param prefix ID前缀
 * @returns 唯一ID
 */
export function uniqueId(prefix: string = 'id'): string {
  return `${prefix}_${++idCounter}`;
}

/**
 * 重置ID计数器
 */
export function resetUniqueIdCounter(): void {
  idCounter = 0;
}

/**
 * 获取当前ID计数器值
 * @returns 当前计数器值
 */
export function getUniqueIdCounter(): number {
  return idCounter;
}
