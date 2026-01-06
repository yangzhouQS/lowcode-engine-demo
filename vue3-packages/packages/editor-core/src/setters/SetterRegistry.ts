/**
 * SetterRegistry Setter 注册表
 * 用于管理编辑器 Setter
 */

/**
 * Setter 配置类型
 */
export interface SetterConfig {
  /**
   * Setter 名称
   */
  name: string;

  /**
   * Setter 组件
   */
  component: any;

  /**
   * Setter 标题
   */
  title?: string;

  /**
   * Setter 描述
   */
  description?: string;

  /**
   * Setter 配置
   */
  config?: Record<string, any>;
}

/**
 * Setter 注册表配置选项
 */
export interface SetterRegistryOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * SetterRegistry 类
 * Setter 注册表，用于管理编辑器 Setter
 */
export class SetterRegistry {
  /**
   * Setter 映射
   */
  private setters: Map<string, SetterConfig> = new Map();

  /**
   * 配置选项
   */
  private options: SetterRegistryOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: SetterRegistryOptions = {}) {
    this.options = {
      debug: false,
      ...options,
    };
  }

  /**
   * 注册 Setter
   * @param config Setter 配置
   */
  register(config: SetterConfig): void {
    if (this.options.debug) {
      console.log(`[SetterRegistry] Registering setter: ${config.name}`);
    }

    this.setters.set(config.name, config);
  }

  /**
   * 注销 Setter
   * @param name Setter 名称
   */
  unregister(name: string): void {
    if (this.options.debug) {
      console.log(`[SetterRegistry] Unregistering setter: ${name}`);
    }

    this.setters.delete(name);
  }

  /**
   * 获取 Setter
   * @param name Setter 名称
   * @returns Setter 配置
   */
  get(name: string): SetterConfig | undefined {
    return this.setters.get(name);
  }

  /**
   * 检查 Setter 是否存在
   * @param name Setter 名称
   * @returns Setter 是否存在
   */
  has(name: string): boolean {
    return this.setters.has(name);
  }

  /**
   * 获取所有 Setter
   * @returns Setter 配置数组
   */
  getAll(): SetterConfig[] {
    return Array.from(this.setters.values());
  }

  /**
   * 获取所有 Setter 名称
   * @returns Setter 名称数组
   */
  names(): string[] {
    return Array.from(this.setters.keys());
  }

  /**
   * 清除所有 Setter
   */
  clear(): void {
    if (this.options.debug) {
      console.log('[SetterRegistry] Clearing all setters');
    }

    this.setters.clear();
  }
}
