import { ref, type Ref } from 'vue'

/**
 * 创建一个响应式引用
 * @param value 初始值
 * @returns Ref 对象
 */
export function useRef<T>(value: T): Ref<T> {
  return ref(value)
}
