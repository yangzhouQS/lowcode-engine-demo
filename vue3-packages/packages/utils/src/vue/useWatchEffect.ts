import { watchEffect, type WatchStopHandle } from 'vue'

/**
 * 立即运行一个函数，同时响应式地追踪其依赖，并在依赖变更时重新运行
 * @param effect 副作用函数
 * @param options 配置选项
 * @returns 停止监听的函数
 */
export function useWatchEffect(
  effect: (onCleanup: (cleanupFn: () => void) => void) => void,
  options?: {
    flush?: 'pre' | 'post' | 'sync'
  }
): WatchStopHandle {
  return watchEffect(effect, options)
}
