/**
 * EventBus 事件总线
 * 用于组件间通信的事件发布订阅系统
 */

/**
 * 事件处理器类型
 */
export type EventHandler<T = (...args: T[]) => void;

/**
 * EventBus 配置选项
 */
export interface EventBusOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * EventBus 类
 * 事件总线，用于组件间通信
 */
export class EventBus {
  /**
   * 事件处理器映射
   */
  private handlers: Map<string, Set<EventHandler<any>>> = new Map();

  /**
   * 配置选项
   */
  private options: EventBusOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: EventBusOptions = {}) {
    this.options = {
      debug: false,
      ...options,
    };
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 事件参数
   */
  emit<T = any>(eventName: string, ...args: T[]): void {
    if (this.options.debug) {
      console.log(`[EventBus] Emitting event: ${eventName}`, args);
    }

    const handlers = this.handlers.get(eventName);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`[EventBus] Error in handler for event ${eventName}:`, error);
        }
      });
    }
  }

  /**
   * 监听事件
   * @param eventName 事件名称
   * @param handler 事件处理器
   * @returns 取消监听的函数
   */
  on<T = any>(eventName: string, handler: EventHandler<T>): () => void {
    if (this.options.debug) {
      console.log(`[EventBus] Adding listener for event: ${eventName}`);
    }

    let handlers = this.handlers.get(eventName);
    if (!handlers) {
      handlers = new Set();
      this.handlers.set(eventName, handlers);
    }
    handlers!.add(handler);

    // 返回取消监听的函数
    return () => this.off(eventName, handler);
  }

  /**
   * 取消监听事件
   * @param eventName 事件名称
   * @param handler 事件处理器
   */
  off<T = any>(eventName: string, handler: EventHandler<T>): void {
    if (this.options.debug) {
      console.log(`[EventBus] Removing listener for event: ${eventName}`);
    }

    const handlers = this.handlers.get(eventName);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  /**
   * 只监听一次事件
   * @param eventName 事件名称
   * @param handler 事件处理器
   * @returns 取消监听的函数
   */
  once<T = any>(eventName: string, handler: EventHandler<T>): () => void {
    if (this.options.debug) {
      console.log(`[EventBus] Adding one-time listener for event: ${eventName}`);
    }

    const wrappedHandler: EventHandler<T> = (...args: T[]) => {
      handler(...args);
      this.off(eventName, wrappedHandler);
    };

    this.on(eventName, wrappedHandler);

    // 返回取消监听的函数
    return () => this.off(eventName, wrappedHandler);
  }

  /**
   * 清除所有事件监听器
   */
  clear(): void {
    if (this.options.debug) {
      console.log('[EventBus] Clearing all event listeners');
    }

    this.handlers.clear();
  }

  /**
   * 获取事件的所有监听器数量
   * @param eventName 事件名称
   * @returns 监听器数量
   */
  listenerCount(eventName: string): number {
    const handlers = this.handlers.get(eventName);
    return handlers ? handlers.size : 0;
  }

  /**
   * 获取所有事件名称
   * @returns 事件名称数组
   */
  eventNames(): string[] {
    return Array.from(this.handlers.keys());
  }
}
