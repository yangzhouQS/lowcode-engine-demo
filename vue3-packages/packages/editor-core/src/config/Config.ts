/**
 * Config 配置管理
 * 用于管理编辑器配置
 */

/**
 * Config 配置选项
 */
export interface ConfigOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * Config 类
 * 配置管理，用于管理编辑器配置
 */
export class Config {
  /**
   * 配置数据
   */
  private data: Record<string, any> = {};

  /**
   * 配置选项
   */
  private options: ConfigOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: ConfigOptions = {}) {
    this.options = {
      debug: false,
      ...options,
    };
  }

  /**
   * 获取配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 配置值
   */
  get<T = any>(key: string, defaultValue?: T): T {
    if (this.options.debug) {
      console.log(`[Config] Getting config: ${key}`);
    }

    if (key in this.data) {
      return this.data[key];
    }
    return defaultValue as T;
  }

  /**
   * 设置配置值
   * @param key 配置键
   * @param value 配置值
   */
  set<T = any>(key: string, value: T): void {
    if (this.options.debug) {
      console.log(`[Config] Setting config: ${key}`, value);
    }

    this.data[key] = value;
  }

  /**
   * 检查配置是否存在
   * @param key 配置键
   * @returns 配置是否存在
   */
  has(key: string): boolean {
    return key in this.data;
  }

  /**
   * 删除配置
   * @param key 配置键
   */
  delete(key: string): void {
    if (this.options.debug) {
      console.log(`[Config] Deleting config: ${key}`);
    }

    delete this.data[key];
  }

  /**
   * 合并配置
   * @param config 配置对象
   */
  merge(config: Record<string, any>): void {
    if (this.options.debug) {
      console.log('[Config] Merging config:', config);
    }

    Object.assign(this.data, config);
  }

  /**
   * 获取所有配置
   * @returns 所有配置
   */
  getAll(): Record<string, any> {
    return { ...this.data };
  }

  /**
   * 清除所有配置
   */
  clear(): void {
    if (this.options.debug) {
      console.log('[Config] Clearing all config');
    }

    this.data = {};
  }
}
