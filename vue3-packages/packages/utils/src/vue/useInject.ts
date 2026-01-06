import { inject, type InjectionKey } from 'vue'

/**
 * 注入一个由祖先组件或整个应用提供的值
 * @param key 注入键
 * @param defaultValue 默认值（可选）
 * @returns 注入的值
 */
export function useInject<T>(key: InjectionKey<T> | string, defaultValue?: T): T | undefined {
  return inject(key as any, defaultValue)
}
