import { ref, reactive } from 'vue';
import type { IRuntime } from '@vue3-lowcode/renderer-core';
import type { IRenderer } from '@vue3-lowcode/renderer-core';
import type { IBaseRendererInstance } from '@vue3-lowcode/renderer-core';

/**
 * Vue3 runtime implementation
 * Vue3 运行时实现
 */
export class VueRuntime implements IRuntime {
  protected _renderer: IRenderer | undefined;
  protected _rendererInstances: Map<string, IBaseRendererInstance>;
  protected _config: Record<string, any>;
  protected _ready: boolean;
  protected _active: boolean;
  protected _eventListeners: Map<string, Set<(...args: any[]) => void>>;

  constructor(config: Record<string, any> = {}) {
    this._rendererInstances = reactive(new Map());
    this._config = reactive(config);
    this._ready = false;
    this._active = false;
    this._eventListeners = new Map();
  }

  /**
   * Initialize the runtime
   * 初始化运行时
   */
  init(): void {
    if (this._ready) {
      return;
    }
    this._ready = true;
    this.emit('init');
  }

  /**
   * Start the runtime
   * 启动运行时
   */
  start(): void {
    if (!this._ready) {
      this.init();
    }
    if (this._active) {
      return;
    }
    this._active = true;
    this.emit('start');
  }

  /**
   * Stop the runtime
   * 停止运行时
   */
  stop(): void {
    if (!this._active) {
      return;
    }
    this._active = false;
    this.emit('stop');
  }

  /**
   * Dispose the runtime
   * 销毁运行时
   */
  dispose(): void {
    this.stop();
    this._rendererInstances.clear();
    this._eventListeners.clear();
    this._ready = false;
    this.emit('dispose');
  }

  /**
   * Get the renderer
   * 获取渲染器
   */
  getRenderer(): IRenderer | undefined {
    return this._renderer;
  }

  /**
   * Set the renderer
   * 设置渲染器
   * @param renderer - The renderer instance
   */
  setRenderer(renderer: IRenderer): void {
    this._renderer = renderer;
    this.emit('rendererChanged', renderer);
  }

  /**
   * Get a renderer instance by id
   * 根据ID获取渲染器实例
   * @param id - The renderer instance id
   */
  getRendererInstance(id: string): IBaseRendererInstance | undefined {
    return this._rendererInstances.get(id);
  }

  /**
   * Register a renderer instance
   * 注册渲染器实例
   * @param id - The renderer instance id
   * @param instance - The renderer instance
   */
  registerRendererInstance(id: string, instance: IBaseRendererInstance): void {
    this._rendererInstances.set(id, instance);
    this.emit('rendererInstanceRegistered', id, instance);
  }

  /**
   * Unregister a renderer instance
   * 注销渲染器实例
   * @param id - The renderer instance id
   */
  unregisterRendererInstance(id: string): void {
    const instance = this._rendererInstances.get(id);
    if (instance) {
      this._rendererInstances.delete(id);
      this.emit('rendererInstanceUnregistered', id, instance);
    }
  }

  /**
   * Get all renderer instances
   * 获取所有渲染器实例
   */
  getRendererInstances(): Map<string, IBaseRendererInstance> {
    return new Map(this._rendererInstances);
  }

  /**
   * Check if the runtime is ready
   * 检查运行时是否已就绪
   */
  isReady(): boolean {
    return this._ready;
  }

  /**
   * Check if the runtime is active
   * 检查运行时是否处于活动状态
   */
  isActive(): boolean {
    return this._active;
  }

  /**
   * Get the runtime config
   * 获取运行时配置
   */
  getConfig(): Record<string, any> {
    return { ...this._config };
  }

  /**
   * Set the runtime config
   * 设置运行时配置
   * @param config - The runtime config
   */
  setConfig(config: Record<string, any>): void {
    Object.assign(this._config, config);
    this.emit('configChanged', this._config);
  }

  /**
   * Add event listener
   * 添加事件监听器
   * @param event - The event name
   * @param handler - The event handler
   */
  on(event: string, handler: (...args: any[]) => void): void {
    if (!this._eventListeners.has(event)) {
      this._eventListeners.set(event, new Set());
    }
    this._eventListeners.get(event)!.add(handler);
  }

  /**
   * Remove event listener
   * 移除事件监听器
   * @param event - The event name
   * @param handler - The event handler
   */
  off(event: string, handler: (...args: any[]) => void): void {
    const listeners = this._eventListeners.get(event);
    if (listeners) {
      listeners.delete(handler);
      if (listeners.size === 0) {
        this._eventListeners.delete(event);
      }
    }
  }

  /**
   * Emit an event
   * 触发事件
   * @param event - The event name
   * @param args - The event arguments
   */
  emit(event: string, ...args: any[]): void {
    const listeners = this._eventListeners.get(event);
    if (listeners) {
      listeners.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`Error in event handler for "${event}":`, error);
        }
      });
    }
  }
}
