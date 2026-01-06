import { ref, onUnmounted } from 'vue'

type EventHandler = (...args: any[]) => void

interface EventBus {
  on(event: string, handler: EventHandler): void
  off(event: string, handler: EventHandler): void
  emit(event: string, ...args: any[]): void
  once(event: string, handler: EventHandler): void
  clear(): void
}

/**
 * 创建一个事件总线，用于组件间通信
 * @returns 事件总线实例
 */
export function useEventBus(): EventBus {
  const events = ref<Map<string, Set<EventHandler>>>(new Map())

  const on = (event: string, handler: EventHandler): void => {
    if (!events.value.has(event)) {
      events.value.set(event, new Set())
    }
    events.value.get(event)!.add(handler)
  }

  const off = (event: string, handler: EventHandler): void => {
    const handlers = events.value.get(event)
    if (handlers) {
      handlers.delete(handler)
      if (handlers.size === 0) {
        events.value.delete(event)
      }
    }
  }

  const emit = (event: string, ...args: any[]): void => {
    const handlers = events.value.get(event)
    if (handlers) {
      handlers.forEach((handler) => handler(...args))
    }
  }

  const once = (event: string, handler: EventHandler): void => {
    const onceHandler: EventHandler = (...args: any[]) => {
      handler(...args)
      off(event, onceHandler)
    }
    on(event, onceHandler)
  }

  const clear = (): void => {
    events.value.clear()
  }

  // 在组件卸载时清理所有事件监听器
  onUnmounted(() => {
    clear()
  })

  return {
    on,
    off,
    emit,
    once,
    clear
  }
}
