import { reactive, type UnwrapNestedRefs } from 'vue'

/**
 * 创建一个响应式对象
 * @param value 原始对象
 * @returns 响应式对象
 */
export function useReactive<T extends object>(value: T): UnwrapNestedRefs<T> {
  return reactive(value)
}
