/**
 * DIContainer 依赖注入容器
 * 用于管理编辑器依赖注入
 */

/**
 * 依赖注入配置选项
 */
export interface DIOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * 依赖注入配置选项别名
 */
export type DIContainerOptions = DIOptions;

/**
 * 依赖注入处理器类型
 */
export type DIHandler<T = any> = (...args: any[]) => T;

/**
 * 依赖注入工厂函数类型
 */
export type Factory<T> = () => T;

/**
 * 依赖注入实例类型
 */
export type Instance<T> = T | Factory<T>;

/**
 * DIContainer 类
 * 依赖注入容器，用于管理编辑器依赖注入
 */
export class DIContainer {
  /**
   * 依赖实例映射
   */
  private instances: Map<string, any> = new Map();

  /**
   * 依赖工厂映射
   */
  private factories: Map<string, Factory<any>> = new Map();

  /**
   * 配置选项
   */
  private options: DIOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: DIOptions = {}) {
    this.options = {
      debug: false,
      ...options,
    };
  }

  /**
   * 注册依赖（单例）
   * @param token 依赖标识
   * @param instance 依赖实例
   */
  register<T>(token: string, instance: Instance<T>): void {
    if (this.options.debug) {
      console.log(`[DIContainer] Registering dependency: ${token}`);
    }

    if (typeof instance === 'function') {
      this.factories.set(token, instance as Factory<T>);
    } else {
      this.instances.set(token, instance);
    }
  }

  /**
   * 解析依赖
   * @param token 依赖标识
   * @returns 依赖实例
   */
  resolve<T>(token: string): T {
    if (this.options.debug) {
      console.log(`[DIContainer] Resolving dependency: ${token}`);
    }

    // 检查是否已存在实例
    if (this.instances.has(token)) {
      return this.instances.get(token) as T;
    }

    // 检查是否有工厂函数
    if (this.factories.has(token)) {
      const factory = this.factories.get(token)!;
      const instance = factory();
      this.instances.set(token, instance);
      return instance as T;
    }

    throw new Error(`Dependency not found: ${token}`);
  }

  /**
   * 检查依赖是否存在
   * @param token 依赖标识
   * @returns 依赖是否存在
   */
  has(token: string): boolean {
    return this.instances.has(token) || this.factories.has(token);
  }

  /**
   * 注销依赖
   * @param token 依赖标识
   */
  unregister(token: string): void {
    if (this.options.debug) {
      console.log(`[DIContainer] Unregistering dependency: ${token}`);
    }

    this.instances.delete(token);
    this.factories.delete(token);
  }

  /**
   * 清除所有依赖
   */
  clear(): void {
    if (this.options.debug) {
      console.log('[DIContainer] Clearing all dependencies');
    }

    this.instances.clear();
    this.factories.clear();
  }

  /**
   * 获取所有依赖标识
   * @returns 依赖标识数组
   */
  tokenNames(): string[] {
    return Array.from(new Set([...this.instances.keys(), ...this.factories.keys()]));
  }
}
