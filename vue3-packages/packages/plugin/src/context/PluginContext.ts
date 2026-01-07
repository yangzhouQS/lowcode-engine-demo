import type {
  IPluginContext,
  IPluginManager,
  IPluginConfig,
  IPluginState,
} from '../types';

/**
 * 插件上下文类
 * 为插件提供运行时上下文环境
 */
export class PluginContext implements IPluginContext {
  private pluginManager: IPluginManager;
  private pluginConfig: IPluginConfig;
  private pluginState: IPluginState;
  private eventHandlers: Map<string, Set<(...args: any[]) => void>>;

  constructor(
    pluginManager: IPluginManager,
    pluginConfig: IPluginConfig,
    pluginState: IPluginState
  ) {
    this.pluginManager = pluginManager;
    this.pluginConfig = pluginConfig;
    this.pluginState = pluginState;
    this.eventHandlers = new Map();
  }

  /**
   * 获取插件管理器
   */
  getPluginManager(): IPluginManager {
    return this.pluginManager;
  }

  /**
   * 获取插件配置
   */
  getPluginConfig(): IPluginConfig {
    return this.pluginConfig;
  }

  /**
   * 获取插件状态
   */
  getPluginState(): IPluginState {
    return { ...this.pluginState };
  }

  /**
   * 设置插件状态
   */
  setPluginState(state: Partial<IPluginState>): void {
    this.pluginState = {
      ...this.pluginState,
      ...state,
    };
  }

  /**
   * 发送事件
   */
  emit(event: string, data?: any): void {
    this.pluginManager.emit(event, {
      pluginName: this.pluginConfig.name,
      pluginConfig: this.pluginConfig,
      pluginState: this.pluginState,
      data,
    });
  }

  /**
   * 监听事件
   */
  on(event: string, handler: (...args: any[]) => void): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)!.add(handler);
  }

  /**
   * 移除事件监听
   */
  off(event: string, handler?: (...args: any[]) => void): void {
    if (!this.eventHandlers.has(event)) {
      return;
    }

    if (handler) {
      this.eventHandlers.get(event)!.delete(handler);
    } else {
      this.eventHandlers.delete(event);
    }
  }

  /**
   * 获取全局状态
   */
  getGlobalState(key: string): any {
    return this.pluginManager.getGlobalState(key);
  }

  /**
   * 设置全局状态
   */
  setGlobalState(key: string, value: any): void {
    this.pluginManager.setGlobalState(key, value);
  }

  /**
   * 销毁上下文
   */
  destroy(): void {
    this.eventHandlers.clear();
  }
}
