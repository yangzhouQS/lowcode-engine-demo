/**
 * 插件配置接口
 */
export interface IPluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件版本 */
  version?: string;
  /** 插件描述 */
  description?: string;
  /** 插件作者 */
  author?: string;
  /** 插件依赖 */
  dependencies?: Record<string, string>;
  /** 插件是否启用 */
  enabled?: boolean;
  /** 插件初始化配置 */
  initOptions?: Record<string, any>;
}

/**
 * 插件上下文接口
 */
export interface IPluginContext {
  /** 获取插件管理器 */
  getPluginManager(): IPluginManager;
  /** 获取插件配置 */
  getPluginConfig(): IPluginConfig;
  /** 获取插件状态 */
  getPluginState(): IPluginState;
  /** 设置插件状态 */
  setPluginState(state: Partial<IPluginState>): void;
  /** 发送事件 */
  emit(event: string, data?: any): void;
  /** 监听事件 */
  on(event: string, handler: (...args: any[]) => void): void;
  /** 移除事件监听 */
  off(event: string, handler?: (...args: any[]) => void): void;
  /** 获取全局状态 */
  getGlobalState(key: string): any;
  /** 设置全局状态 */
  setGlobalState(key: string, value: any): void;
}

/**
 * 插件状态接口
 */
export interface IPluginState {
  /** 插件是否已初始化 */
  initialized: boolean;
  /** 插件是否已启动 */
  started: boolean;
  /** 插件是否已销毁 */
  destroyed: boolean;
  /** 插件错误信息 */
  error?: Error;
  /** 插件自定义数据 */
  data?: Record<string, any>;
}

/**
 * 插件生命周期钩子
 */
export interface IPluginHooks {
  /** 插件初始化前 */
  beforeInit?: (context: IPluginContext) => void | Promise<void>;
  /** 插件初始化后 */
  afterInit?: (context: IPluginContext) => void | Promise<void>;
  /** 插件启动前 */
  beforeStart?: (context: IPluginContext) => void | Promise<void>;
  /** 插件启动后 */
  afterStart?: (context: IPluginContext) => void | Promise<void>;
  /** 插件停止前 */
  beforeStop?: (context: IPluginContext) => void | Promise<void>;
  /** 插件停止后 */
  afterStop?: (context: IPluginContext) => void | Promise<void>;
  /** 插件销毁前 */
  beforeDestroy?: (context: IPluginContext) => void | Promise<void>;
  /** 插件销毁后 */
  afterDestroy?: (context: IPluginContext) => void | Promise<void>;
}

/**
 * 插件接口
 */
export interface IPlugin {
  /** 插件配置 */
  config: IPluginConfig;
  /** 插件生命周期钩子 */
  hooks?: IPluginHooks;
  /** 初始化插件 */
  init(context: IPluginContext): void | Promise<void>;
  /** 启动插件 */
  start(context: IPluginContext): void | Promise<void>;
  /** 停止插件 */
  stop(context: IPluginContext): void | Promise<void>;
  /** 销毁插件 */
  destroy(context: IPluginContext): void | Promise<void>;
}

/**
 * 插件管理器接口
 */
export interface IPluginManager {
  /** 注册插件 */
  register(plugin: IPlugin): void;
  /** 注销插件 */
  unregister(pluginName: string): void;
  /** 获取插件 */
  getPlugin(pluginName: string): IPlugin | undefined;
  /** 获取所有插件 */
  getAllPlugins(): IPlugin[];
  /** 获取已启用的插件 */
  getEnabledPlugins(): IPlugin[];
  /** 获取已禁用的插件 */
  getDisabledPlugins(): IPlugin[];
  /** 启用插件 */
  enable(pluginName: string): void;
  /** 禁用插件 */
  disable(pluginName: string): void;
  /** 启动插件 */
  start(pluginName: string): Promise<void>;
  /** 停止插件 */
  stop(pluginName: string): Promise<void>;
  /** 启动所有插件 */
  startAll(): Promise<void>;
  /** 停止所有插件 */
  stopAll(): Promise<void>;
  /** 检查插件是否已注册 */
  has(pluginName: string): boolean;
  /** 检查插件是否已启用 */
  isEnabled(pluginName: string): boolean;
  /** 检查插件是否已启动 */
  isStarted(pluginName: string): boolean;
  /** 获取插件状态 */
  getPluginState(pluginName: string): IPluginState | undefined;
  /** 发送全局事件 */
  emit(event: string, data?: any): void;
  /** 监听全局事件 */
  on(event: string, handler: (...args: any[]) => void): void;
  /** 移除全局事件监听 */
  off(event: string, handler?: (...args: any[]) => void): void;
  /** 获取全局状态 */
  getGlobalState(key: string): any;
  /** 设置全局状态 */
  setGlobalState(key: string, value: any): void;
  /** 初始化所有插件 */
  initAll(): Promise<void>;
  /** 销毁所有插件 */
  destroyAll(): Promise<void>;
}

/**
 * 插件管理器配置接口
 */
export interface IPluginManagerConfig {
  /** 插件管理器名称 */
  name?: string;
  /** 是否自动启动插件 */
  autoStart?: boolean;
  /** 是否启用错误处理 */
  enableErrorHandling?: boolean;
  /** 全局状态初始值 */
  globalState?: Record<string, any>;
}

/**
 * 插件事件类型
 */
export type PluginEventType =
  | 'plugin:register'
  | 'plugin:unregister'
  | 'plugin:init'
  | 'plugin:start'
  | 'plugin:stop'
  | 'plugin:destroy'
  | 'plugin:enable'
  | 'plugin:disable'
  | 'plugin:error'
  | 'plugin:beforeInit'
  | 'plugin:afterInit'
  | 'plugin:beforeStart'
  | 'plugin:afterStart'
  | 'plugin:beforeStop'
  | 'plugin:afterStop'
  | 'plugin:beforeDestroy'
  | 'plugin:afterDestroy';

/**
 * 插件事件数据
 */
export interface PluginEventData {
  /** 插件名称 */
  pluginName: string;
  /** 插件配置 */
  pluginConfig?: IPluginConfig;
  /** 插件状态 */
  pluginState?: IPluginState;
  /** 错误信息 */
  error?: Error;
  /** 自定义数据 */
  data?: any;
}
