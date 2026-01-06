import { computed, type ComputedRef, type WritableComputedRef } from 'vue'

/**
 * 创建一个计算属性
 * @param getter 计算函数
 * @returns 计算属性的 Ref
 */
export function useComputed<T>(getter: () => T): ComputedRef<T>
export function useComputed<T>(options: {
  get: () => T
  set: (value: T) => void
}): WritableComputedRef<T>
export function useComputed<T>(
  getterOrOptions: (() => T) | { get: () => T; set: (value: T) => void }
): ComputedRef<T> | WritableComputedRef<T> {
  return computed(getterOrOptions as any)
}
