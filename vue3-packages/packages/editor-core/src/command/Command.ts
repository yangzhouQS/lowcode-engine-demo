/**
 * Command 命令系统
 * 用于执行编辑器命令
 */

/**
 * 命令处理器类型
 */
export type CommandHandler<T = (...args: T[]) => any;

/**
 * Command 配置选项
 */
export interface CommandOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * Command 类
 * 命令系统，用于执行编辑器命令
 */
export class Command {
  /**
   * 命令处理器映射
   */
  private handlers: Map<string, CommandHandler<any>> = new Map();

  /**
   * 配置选项
   */
  private options: CommandOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: CommandOptions = {}) {
    this.options = {
      debug: false,
      ...options,
    };
  }

  /**
   * 执行命令
   * @param name 命令名称
   * @param args 命令参数
   * @returns 命令执行结果
   */
  execute<T = any>(name: string, ...args: T[]): any {
    if (this.options.debug) {
      console.log(`[Command] Executing command: ${name}`, args);
    }

    const handler = this.handlers.get(name);
    if (!handler) {
      console.warn(`[Command] Command not found: ${name}`);
      return undefined;
    }

    try {
      return handler(...args);
    } catch (error) {
      console.error(`[Command] Error executing command ${name}:`, error);
      throw error;
    }
  }

  /**
   * 注册命令
   * @param name 命令名称
   * @param handler 命令处理器
   */
  register<T = any>(name: string, handler: CommandHandler<T>): void {
    if (this.options.debug) {
      console.log(`[Command] Registering command: ${name}`);
    }

    this.handlers.set(name, handler);
  }

  /**
   * 注销命令
   * @param name 命令名称
   */
  unregister(name: string): void {
    if (this.options.debug) {
      console.log(`[Command] Unregistering command: ${name}`);
    }

    this.handlers.delete(name);
  }

  /**
   * 检查命令是否存在
   * @param name 命令名称
   * @returns 命令是否存在
   */
  has(name: string): boolean {
    return this.handlers.has(name);
  }

  /**
   * 清除所有命令
   */
  clear(): void {
    if (this.options.debug) {
      console.log('[Command] Clearing all commands');
    }

    this.handlers.clear();
  }

  /**
   * 获取所有命令名称
   * @returns 命令名称数组
   */
  commandNames(): string[] {
    return Array.from(this.handlers.keys());
  }
}
