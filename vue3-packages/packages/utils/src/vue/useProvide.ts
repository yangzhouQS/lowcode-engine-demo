import { provide, type InjectionKey } from 'vue'

/**
 * 提供一个值，可以被后代组件注入
 * @param key 注入键
 * @param value 提供的值
 */
export function useProvide<T>(key: InjectionKey<T> | string, value: T): void {
  provide(key as any, value)
}
