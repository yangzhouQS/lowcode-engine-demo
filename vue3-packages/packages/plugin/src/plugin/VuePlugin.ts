import type {
  IPlugin,
  IPluginConfig,
  IPluginContext,
  IPluginHooks,
} from '../types';
import { ref, computed, watch, onUnmounted } from 'vue';

/**
 * Vue3 插件基类
 * 提供基于 Vue3 的插件实现基类
 */
export abstract class VuePlugin implements IPlugin {
  public config: IPluginConfig;
  public hooks?: IPluginHooks;
  protected context?: IPluginContext;
  protected internalState = ref({
    initialized: false,
    started: false,
    destroyed: false,
  });
  protected error = ref<Error | undefined>(undefined);
  protected data = ref<Record<string, any>>({});

  constructor(config: IPluginConfig) {
    this.config = config;
  }

  /**
   * 初始化插件
   */
  async init(context: IPluginContext): Promise<void> {
    this.context = context;
    this.internalState.value.initialized = true;

    // 监听全局状态变化
    this.setupGlobalStateWatchers();
  }

  /**
   * 启动插件
   */
  async start(context: IPluginContext): Promise<void> {
    this.context = context;
    this.internalState.value.started = true;

    // 执行启动逻辑
    await this.onStart();
  }

  /**
   * 停止插件
   */
  async stop(context: IPluginContext): Promise<void> {
    this.context = context;
    this.internalState.value.started = false;

    // 执行停止逻辑
    await this.onStop();
  }

  /**
   * 销毁插件
   */
  async destroy(context: IPluginContext): Promise<void> {
    this.context = context;
    this.internalState.value.destroyed = true;

    // 执行销毁逻辑
    await this.onDestroy();

    // 清理监听器
    this.cleanup();
  }

  /**
   * 插件启动钩子（子类实现）
   */
  protected abstract onStart(): void | Promise<void>;

  /**
   * 插件停止钩子（子类实现）
   */
  protected abstract onStop(): void | Promise<void>;

  /**
   * 插件销毁钩子（子类实现）
   */
  protected abstract onDestroy(): void | Promise<void>;

  /**
   * 获取插件状态
   */
  get state() {
    return computed(() => ({
      initialized: this.internalState.value.initialized,
      started: this.internalState.value.started,
      destroyed: this.internalState.value.destroyed,
      error: this.error.value,
      data: this.data.value,
    }));
  }

  /**
   * 设置插件数据
   */
  setPluginData(key: string, value: any): void {
    this.data.value = {
      ...this.data.value,
      [key]: value,
    };
  }

  /**
   * 获取插件数据
   */
  getPluginData(key: string): any {
    return this.data.value[key];
  }

  /**
   * 发送事件
   */
  emit(event: string, data?: any): void {
    if (this.context) {
      this.context.emit(event, data);
    }
  }

  /**
   * 监听事件
   */
  on(event: string, handler: (...args: any[]) => void): void {
    if (this.context) {
      this.context.on(event, handler);
    }
  }

  /**
   * 移除事件监听
   */
  off(event: string, handler?: (...args: any[]) => void): void {
    if (this.context) {
      this.context.off(event, handler);
    }
  }

  /**
   * 获取全局状态
   */
  getGlobalState(key: string): any {
    if (this.context) {
      return this.context.getGlobalState(key);
    }
    return undefined;
  }

  /**
   * 设置全局状态
   */
  setGlobalState(key: string, value: any): void {
    if (this.context) {
      this.context.setGlobalState(key, value);
    }
  }

  /**
   * 监听全局状态变化
   */
  watchGlobalState(key: string, callback: (value: any) => void): () => void {
    const stopWatch = watch(
      () => this.getGlobalState(key),
      (newValue) => {
        callback(newValue);
      },
      { immediate: true }
    );

    return stopWatch;
  }

  /**
   * 设置全局状态监听器
   */
  private setupGlobalStateWatchers(): void {
    // 可以在子类中扩展
  }

  /**
   * 清理资源
   */
  private cleanup(): void {
    // 清理 Vue 响应式监听器
    this.internalState.value = {
      initialized: false,
      started: false,
      destroyed: false,
    };
    this.error.value = undefined;
    this.data.value = {};
  }
}

/**
 * 创建 Vue3 插件的工厂函数
 */
export function createVuePlugin<T extends VuePlugin>(
  PluginClass: new (config: IPluginConfig) => T,
  config: IPluginConfig
): T {
  return new PluginClass(config);
}
