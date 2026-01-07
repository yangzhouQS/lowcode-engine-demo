import type {
  IPluginManager,
  IPlugin,
  IPluginConfig,
  IPluginState,
  IPluginManagerConfig,
  PluginEventData,
} from '../types';
import { PluginContext } from '../context/PluginContext';

/**
 * 插件管理器类
 * 管理所有插件的注册、初始化、启动、停止和销毁
 */
export class PluginManager implements IPluginManager {
  private name: string;
  private autoStart: boolean;
  private enableErrorHandling: boolean;
  private plugins: Map<string, IPlugin>;
  private pluginStates: Map<string, IPluginState>;
  private pluginContexts: Map<string, PluginContext>;
  private globalState: Record<string, any>;
  private eventHandlers: Map<string, Set<(data: PluginEventData) => void>>;

  constructor(config: IPluginManagerConfig = {}) {
    this.name = config.name || 'PluginManager';
    this.autoStart = config.autoStart ?? true;
    this.enableErrorHandling = config.enableErrorHandling ?? true;
    this.plugins = new Map();
    this.pluginStates = new Map();
    this.pluginContexts = new Map();
    this.globalState = config.globalState || {};
    this.eventHandlers = new Map();
  }

  /**
   * 注册插件
   */
  register(plugin: IPlugin): void {
    const { name } = plugin.config;

    if (this.plugins.has(name)) {
      throw new Error(`Plugin "${name}" is already registered`);
    }

    this.plugins.set(name, plugin);

    // 初始化插件状态
    const state: IPluginState = {
      initialized: false,
      started: false,
      destroyed: false,
    };
    this.pluginStates.set(name, state);

    // 创建插件上下文
    const context = new PluginContext(this, plugin.config, state);
    this.pluginContexts.set(name, context);

    // 发送注册事件
    this.emit('plugin:register', {
      pluginName: name,
      pluginConfig: plugin.config,
      pluginState: state,
    });

    // 如果启用自动启动，则自动启动插件
    if (this.autoStart && plugin.config.enabled !== false) {
      this.init(name).catch((error) => {
        if (this.enableErrorHandling) {
          console.error(`Failed to auto-start plugin "${name}":`, error);
        }
      });
    }
  }

  /**
   * 注销插件
   */
  unregister(pluginName: string): void {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }

    // 如果插件已启动，先停止
    if (this.isStarted(pluginName)) {
      this.stop(pluginName).catch((error) => {
        if (this.enableErrorHandling) {
          console.error(`Failed to stop plugin "${pluginName}":`, error);
        }
      });
    }

    // 销毁插件
    const context = this.pluginContexts.get(pluginName);
    if (context) {
      this.destroy(pluginName).catch((error) => {
        if (this.enableErrorHandling) {
          console.error(`Failed to destroy plugin "${pluginName}":`, error);
        }
      });
      context.destroy();
    }

    // 移除插件
    this.plugins.delete(pluginName);
    this.pluginStates.delete(pluginName);
    this.pluginContexts.delete(pluginName);

    // 发送注销事件
    this.emit('plugin:unregister', {
      pluginName,
      pluginConfig: plugin.config,
    });
  }

  /**
   * 获取插件
   */
  getPlugin(pluginName: string): IPlugin | undefined {
    return this.plugins.get(pluginName);
  }

  /**
   * 获取所有插件
   */
  getAllPlugins(): IPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * 获取已启用的插件
   */
  getEnabledPlugins(): IPlugin[] {
    return Array.from(this.plugins.values()).filter(
      (plugin) => plugin.config.enabled !== false
    );
  }

  /**
   * 获取已禁用的插件
   */
  getDisabledPlugins(): IPlugin[] {
    return Array.from(this.plugins.values()).filter(
      (plugin) => plugin.config.enabled === false
    );
  }

  /**
   * 启用插件
   */
  enable(pluginName: string): void {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }

    plugin.config.enabled = true;

    // 发送启用事件
    this.emit('plugin:enable', {
      pluginName,
      pluginConfig: plugin.config,
    });
  }

  /**
   * 禁用插件
   */
  disable(pluginName: string): void {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }

    // 如果插件已启动，先停止
    if (this.isStarted(pluginName)) {
      this.stop(pluginName).catch((error) => {
        if (this.enableErrorHandling) {
          console.error(`Failed to stop plugin "${pluginName}":`, error);
        }
      });
    }

    plugin.config.enabled = false;

    // 发送禁用事件
    this.emit('plugin:disable', {
      pluginName,
      pluginConfig: plugin.config,
    });
  }

  /**
   * 启动插件
   */
  async start(pluginName: string): Promise<void> {
    const plugin = this.plugins.get(pluginName);
    const context = this.pluginContexts.get(pluginName);

    if (!plugin || !context) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }

    if (plugin.config.enabled === false) {
      throw new Error(`Plugin "${pluginName}" is disabled`);
    }

    const state = this.pluginStates.get(pluginName);
    if (!state) {
      throw new Error(`Plugin "${pluginName}" state not found`);
    }

    if (state.started) {
      return;
    }

    try {
      // 执行启动前钩子
      if (plugin.hooks?.beforeStart) {
        await this.executeHook(plugin.hooks.beforeStart, context);
        this.emit('plugin:beforeStart', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 启动插件
      await plugin.start(context);
      state.started = true;

      // 执行启动后钩子
      if (plugin.hooks?.afterStart) {
        await this.executeHook(plugin.hooks.afterStart, context);
        this.emit('plugin:afterStart', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 发送启动事件
      this.emit('plugin:start', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
      });
    } catch (error) {
      state.error = error as Error;
      this.emit('plugin:error', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
        error: error as Error,
      });
      throw error;
    }
  }

  /**
   * 停止插件
   */
  async stop(pluginName: string): Promise<void> {
    const plugin = this.plugins.get(pluginName);
    const context = this.pluginContexts.get(pluginName);

    if (!plugin || !context) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }

    const state = this.pluginStates.get(pluginName);
    if (!state) {
      throw new Error(`Plugin "${pluginName}" state not found`);
    }

    if (!state.started) {
      return;
    }

    try {
      // 执行停止前钩子
      if (plugin.hooks?.beforeStop) {
        await this.executeHook(plugin.hooks.beforeStop, context);
        this.emit('plugin:beforeStop', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 停止插件
      await plugin.stop(context);
      state.started = false;

      // 执行停止后钩子
      if (plugin.hooks?.afterStop) {
        await this.executeHook(plugin.hooks.afterStop, context);
        this.emit('plugin:afterStop', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 发送停止事件
      this.emit('plugin:stop', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
      });
    } catch (error) {
      state.error = error as Error;
      this.emit('plugin:error', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
        error: error as Error,
      });
      throw error;
    }
  }

  /**
   * 启动所有插件
   */
  async startAll(): Promise<void> {
    const enabledPlugins = this.getEnabledPlugins();
    for (const plugin of enabledPlugins) {
      try {
        await this.start(plugin.config.name);
      } catch (error) {
        if (this.enableErrorHandling) {
          console.error(`Failed to start plugin "${plugin.config.name}":`, error);
        }
      }
    }
  }

  /**
   * 停止所有插件
   */
  async stopAll(): Promise<void> {
    const startedPlugins = Array.from(this.plugins.values()).filter((plugin) =>
      this.isStarted(plugin.config.name)
    );
    for (const plugin of startedPlugins) {
      try {
        await this.stop(plugin.config.name);
      } catch (error) {
        if (this.enableErrorHandling) {
          console.error(`Failed to stop plugin "${plugin.config.name}":`, error);
        }
      }
    }
  }

  /**
   * 检查插件是否已注册
   */
  has(pluginName: string): boolean {
    return this.plugins.has(pluginName);
  }

  /**
   * 检查插件是否已启用
   */
  isEnabled(pluginName: string): boolean {
    const plugin = this.plugins.get(pluginName);
    return plugin ? plugin.config.enabled !== false : false;
  }

  /**
   * 检查插件是否已启动
   */
  isStarted(pluginName: string): boolean {
    const state = this.pluginStates.get(pluginName);
    return state ? state.started : false;
  }

  /**
   * 获取插件状态
   */
  getPluginState(pluginName: string): IPluginState | undefined {
    return this.pluginStates.get(pluginName);
  }

  /**
   * 发送全局事件
   */
  emit(event: string, data?: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          if (this.enableErrorHandling) {
            console.error(`Error in event handler for "${event}":`, error);
          }
        }
      });
    }
  }

  /**
   * 监听全局事件
   */
  on(event: string, handler: (data: PluginEventData) => void): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)!.add(handler);
  }

  /**
   * 移除全局事件监听
   */
  off(event: string, handler?: (data: PluginEventData) => void): void {
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
    return this.globalState[key];
  }

  /**
   * 设置全局状态
   */
  setGlobalState(key: string, value: any): void {
    this.globalState[key] = value;
  }

  /**
   * 初始化插件
   */
  async init(pluginName: string): Promise<void> {
    const plugin = this.plugins.get(pluginName);
    const context = this.pluginContexts.get(pluginName);

    if (!plugin || !context) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }

    const state = this.pluginStates.get(pluginName);
    if (!state) {
      throw new Error(`Plugin "${pluginName}" state not found`);
    }

    if (state.initialized) {
      return;
    }

    try {
      // 执行初始化前钩子
      if (plugin.hooks?.beforeInit) {
        await this.executeHook(plugin.hooks.beforeInit, context);
        this.emit('plugin:beforeInit', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 初始化插件
      await plugin.init(context);
      state.initialized = true;

      // 执行初始化后钩子
      if (plugin.hooks?.afterInit) {
        await this.executeHook(plugin.hooks.afterInit, context);
        this.emit('plugin:afterInit', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 发送初始化事件
      this.emit('plugin:init', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
      });

      // 启动插件
      await this.start(pluginName);
    } catch (error) {
      state.error = error as Error;
      this.emit('plugin:error', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
        error: error as Error,
      });
      throw error;
    }
  }

  /**
   * 初始化所有插件
   */
  async initAll(): Promise<void> {
    const enabledPlugins = this.getEnabledPlugins();
    for (const plugin of enabledPlugins) {
      try {
        await this.init(plugin.config.name);
      } catch (error) {
        if (this.enableErrorHandling) {
          console.error(`Failed to init plugin "${plugin.config.name}":`, error);
        }
      }
    }
  }

  /**
   * 销毁插件
   */
  async destroy(pluginName: string): Promise<void> {
    const plugin = this.plugins.get(pluginName);
    const context = this.pluginContexts.get(pluginName);

    if (!plugin || !context) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }

    const state = this.pluginStates.get(pluginName);
    if (!state) {
      throw new Error(`Plugin "${pluginName}" state not found`);
    }

    if (state.destroyed) {
      return;
    }

    try {
      // 执行销毁前钩子
      if (plugin.hooks?.beforeDestroy) {
        await this.executeHook(plugin.hooks.beforeDestroy, context);
        this.emit('plugin:beforeDestroy', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 销毁插件
      await plugin.destroy(context);
      state.destroyed = true;

      // 执行销毁后钩子
      if (plugin.hooks?.afterDestroy) {
        await this.executeHook(plugin.hooks.afterDestroy, context);
        this.emit('plugin:afterDestroy', {
          pluginName,
          pluginConfig: plugin.config,
          pluginState: state,
        });
      }

      // 发送销毁事件
      this.emit('plugin:destroy', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
      });
    } catch (error) {
      state.error = error as Error;
      this.emit('plugin:error', {
        pluginName,
        pluginConfig: plugin.config,
        pluginState: state,
        error: error as Error,
      });
      throw error;
    }
  }

  /**
   * 销毁所有插件
   */
  async destroyAll(): Promise<void> {
    // 先停止所有插件
    await this.stopAll();

    // 销毁所有插件
    const plugins = Array.from(this.plugins.values());
    for (const plugin of plugins) {
      try {
        await this.destroy(plugin.config.name);
      } catch (error) {
        if (this.enableErrorHandling) {
          console.error(`Failed to destroy plugin "${plugin.config.name}":`, error);
        }
      }
    }

    // 清理事件处理器
    this.eventHandlers.clear();
  }

  /**
   * 执行钩子函数
   */
  private async executeHook(
    hook: (context: any) => void | Promise<void>,
    context: any
  ): Promise<void> {
    const result = hook(context);
    if (result instanceof Promise) {
      await result;
    }
  }
}
