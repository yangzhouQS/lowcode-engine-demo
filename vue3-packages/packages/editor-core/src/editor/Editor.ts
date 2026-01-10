/**
 * Editor 编辑器核心类
 * 集成所有编辑器模块
 */

import { EventBus } from '../event-bus/EventBus';
import { Command } from '../command/Command';
import { Config } from '../config/Config';
import { Hotkey } from '../hotkey/Hotkey';
import { DIContainer } from '../di/DIContainer';
import { Intl } from '../intl/Intl';
import { SetterRegistry } from '../setters/SetterRegistry';

/**
 * 编辑器配置选项
 */
export interface EditorOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;

  /**
   * 语言代码
   */
  locale?: string;

  /**
   * 国际化消息
   */
  messages?: Record<string, string | Record<string, any>>;

  /**
   * 编辑器配置
   */
  config?: Record<string, any>;
}

/**
 * 编辑器状态
 */
export enum EditorState {
  /**
   * 未初始化
   */
  UNINITIALIZED = 'uninitialized',

  /**
   * 已初始化
   */
  INITIALIZED = 'initialized',

  /**
   * 已启动
   */
  STARTED = 'started',

  /**
   * 已停止
   */
  STOPPED = 'stopped',

  /**
   * 已销毁
   */
  DISPOSED = 'disposed',
}

/**
 * Editor 类
 * 编辑器核心类，集成所有编辑器模块
 */
export class Editor {
  /**
   * 编辑器状态
   */
  private state: EditorState = EditorState.UNINITIALIZED;

  /**
   * 事件总线
   */
  private eventBus: EventBus;

  /**
   * 命令系统
   */
  private command: Command;

  /**
   * 配置管理
   */
  private config: Config;

  /**
   * 快捷键系统
   */
  private hotkey: Hotkey;

  /**
   * 依赖注入容器
   */
  private di: DIContainer;

  /**
   * 国际化
   */
  private intl: Intl;

  /**
   * Setter 注册表
   */
  private setters: SetterRegistry;

  /**
   * 配置选项
   */
  private options: EditorOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: EditorOptions = {}) {
    this.options = {
      debug: false,
      locale: 'zh-CN',
      ...options,
    };

    // 初始化所有模块
    this.eventBus = new EventBus({ debug: this.options.debug });
    this.command = new Command({ debug: this.options.debug });
    this.config = new Config({ debug: this.options.debug });
    this.hotkey = new Hotkey({ debug: this.options.debug });
    this.di = new DIContainer({ debug: this.options.debug });
    this.intl = new Intl({ debug: this.options.debug });
    this.setters = new SetterRegistry({ debug: this.options.debug });

    // 注册核心依赖
    this.di.register('eventBus', this.eventBus);
    this.di.register('command', this.command);
    this.di.register('config', this.config);
    this.di.register('hotkey', this.hotkey);
    this.di.register('di', this.di);
    this.di.register('intl', this.intl);
    this.di.register('setters', this.setters);
    this.di.register('editor', this);

    // 初始化国际化
    if (this.options.messages && this.options.locale) {
      this.intl.init(this.options.locale, this.options.messages);
    }

    // 合并配置
    if (this.options.config) {
      this.config.merge(this.options.config);
    }

    this.state = EditorState.INITIALIZED;
  }

  /**
   * 初始化编辑器
   */
  init(): void {
    if (this.options.debug) {
      console.log('[Editor] Initializing editor');
    }

    if (this.state !== EditorState.UNINITIALIZED && this.state !== EditorState.INITIALIZED) {
      throw new Error(`Editor cannot be initialized in state: ${this.state}`);
    }

    this.eventBus.emit('editor:init');
    this.state = EditorState.INITIALIZED;
  }

  /**
   * 启动编辑器
   */
  start(): void {
    if (this.options.debug) {
      console.log('[Editor] Starting editor');
    }

    if (this.state !== EditorState.INITIALIZED) {
      throw new Error(`Editor cannot be started in state: ${this.state}`);
    }

    this.eventBus.emit('editor:start');
    this.state = EditorState.STARTED;
  }

  /**
   * 停止编辑器
   */
  stop(): void {
    if (this.options.debug) {
      console.log('[Editor] Stopping editor');
    }

    if (this.state !== EditorState.STARTED) {
      throw new Error(`Editor cannot be stopped in state: ${this.state}`);
    }

    this.eventBus.emit('editor:stop');
    this.state = EditorState.STOPPED;
  }

  /**
   * 销毁编辑器
   */
  dispose(): void {
    if (this.options.debug) {
      console.log('[Editor] Disposing editor');
    }

    this.eventBus.emit('editor:dispose');
    this.eventBus.clear();
    this.command.clear();
    this.config.clear();
    this.hotkey.clear();
    this.di.clear();
    this.intl.clear();
    this.setters.clear();
    this.state = EditorState.DISPOSED;
  }

  /**
   * 获取编辑器状态
   * @returns 编辑器状态
   */
  getState(): EditorState {
    return this.state;
  }

  /**
   * 获取事件总线
   * @returns 事件总线
   */
  getEventBus(): EventBus {
    return this.eventBus;
  }

  /**
   * 获取命令系统
   * @returns 命令系统
   */
  getCommand(): Command {
    return this.command;
  }

  /**
   * 获取配置管理
   * @returns 配置管理
   */
  getConfig(): Config {
    return this.config;
  }

  /**
   * 获取快捷键系统
   * @returns 快捷键系统
   */
  getHotkey(): Hotkey {
    return this.hotkey;
  }

  /**
   * 获取依赖注入容器
   * @returns 依赖注入容器
   */
  getDI(): DIContainer {
    return this.di;
  }

  /**
   * 获取国际化
   * @returns 国际化
   */
  getIntl(): Intl {
    return this.intl;
  }

  /**
   * 获取 Setter 注册表
   * @returns Setter 注册表
   */
  getSetters(): SetterRegistry {
    return this.setters;
  }

  /**
   * 获取插件管理器
   * @returns 插件管理器（暂未实现）
   */
  getPluginManager(): any {
    // TODO: 实现插件管理器
    // 当插件系统完全集成后，这里应该返回实际的 PluginManager 实例
    return null;
  }

  /**
   * 获取容器（DI 容器）
   * @returns DI 容器
   */
  getContainer(): DIContainer {
    return this.di;
  }

  /**
   * 解析依赖
   * @param token 依赖标识
   * @returns 依赖实例
   */
  resolve<T>(token: string): T {
    return this.di.resolve<T>(token);
  }
}
