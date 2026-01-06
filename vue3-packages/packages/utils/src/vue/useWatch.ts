import { watch, type WatchStopHandle, type WatchSource } from 'vue'

/**
 * 监听响应式数据的变化
 * @param source 监听的数据源
 * @param callback 回调函数
 * @param options 配置选项
 * @returns 停止监听的函数
 */
export function useWatch<T>(
  source: WatchSource<T> | WatchSource<T>[],
  callback: (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void,
  options?: {
    immediate?: boolean
    deep?: boolean
    flush?: 'pre' | 'post' | 'sync'
  }
): WatchStopHandle {
  return watch(source as any, callback as any, options)
}
