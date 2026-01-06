/**
 * Hotkey 快捷键系统
 * 用于管理编辑器快捷键
 */

/**
 * 快捷键处理器类型
 */
export type HotkeyHandler = (event: KeyboardEvent) => void;

/**
 * 快捷键配置选项
 */
export interface HotkeyOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * Hotkey 类
 * 快捷键系统，用于管理编辑器快捷键
 */
export class Hotkey {
  /**
   * 快捷键处理器映射
   */
  private handlers: Map<string, Set<HotkeyHandler>> = new Map();

  /**
   * 配置选项
   */
  private options: HotkeyOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: HotkeyOptions = {}) {
    this.options = {
      debug: false,
      ...options,
    };
  }

  /**
   * 注册快捷键
   * @param key 快捷键组合
   * @param handler 处理函数
   */
  register(key: string, handler: HotkeyHandler): void {
    if (this.options.debug) {
      console.log(`[Hotkey] Registering hotkey: ${key}`);
    }

    let handlers = this.handlers.get(key);
    if (!handlers) {
      handlers = new Set();
      this.handlers.set(key, handlers);
    }
    handlers!.add(handler);
  }

  /**
   * 注销快捷键
   * @param key 快捷键组合
   */
  unregister(key: string, handler: HotkeyHandler): void {
    if (this.options.debug) {
      console.log(`[Hotkey] Unregistering hotkey: ${key}`);
    }

    const handlers = this.handlers.get(key);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  /**
   * 触发快捷键
   * @param key 快捷键组合
   * @param event 键盘事件
   */
  trigger(key: string, event: KeyboardEvent): void {
    if (this.options.debug) {
      console.log(`[Hotkey] Triggering hotkey: ${key}`);
    }

    const handlers = this.handlers.get(key);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(event);
        } catch (error) {
          console.error(`[Hotkey] Error in handler for hotkey ${key}:`, error);
        }
      });
    }
  }

  /**
   * 清除所有快捷键
   */
  clear(): void {
    if (this.options.debug) {
      console.log('[Hotkey] Clearing all hotkeys');
    }

    this.handlers.clear();
  }

  /**
   * 获取所有快捷键组合
   * @returns 快捷键组合数组
   */
  keyNames(): string[] {
    return Array.from(this.handlers.keys());
  }
}
