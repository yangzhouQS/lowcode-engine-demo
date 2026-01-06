import { ref, reactive } from 'vue';
import type { IRenderer } from './IRenderer';
import type { IRuntime } from '../runtime/IRuntime';
import type { IRendererProps } from './IRendererProps';
import { merge } from '@vue3-lowcode/utils';

/**
 * Base renderer class
 * 基础渲染器类
 */
export class BaseRenderer implements IRenderer {
  protected _runtime: IRuntime | undefined;
  protected _config: Record<string, any>;
  protected _ready: boolean;
  protected _active: boolean;
  protected _eventListeners: Map<string, Set<(...args: any[]) => void>>;
  protected _props: IRendererProps;

  constructor(config: Record<string, any> = {}) {
    this._config = reactive(config);
    this._ready = false;
    this._active = false;
    this._eventListeners = new Map();
    this._props = reactive<IRendererProps>({});
  }

  /**
   * Initialize the renderer
   * 初始化渲染器
   */
  init(): void {
    if (this._ready) {
      return;
    }
    this._ready = true;
    this.emit('init');
  }

  /**
   * Start the renderer
   * 启动渲染器
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
   * Stop the renderer
   * 停止渲染器
   */
  stop(): void {
    if (!this._active) {
      return;
    }
    this._active = false;
    this.emit('stop');
  }

  /**
   * Dispose the renderer
   * 销毁渲染器
   */
  dispose(): void {
    this.stop();
    this._eventListeners.clear();
    this._ready = false;
    this.emit('dispose');
  }

  /**
   * Render a component
   * 渲染组件
   * @param props - The renderer props
   */
  render(props: IRendererProps): void {
    this._props = reactive(merge({}, this._props, props));
    this.emit('render', this._props);
  }

  /**
   * Get the runtime
   * 获取运行时
   */
  getRuntime(): IRuntime | undefined {
    return this._runtime;
  }

  /**
   * Set the runtime
   * 设置运行时
   * @param runtime - The runtime instance
   */
  setRuntime(runtime: IRuntime): void {
    this._runtime = runtime;
    this.emit('runtimeChanged', runtime);
  }

  /**
   * Check if the renderer is ready
   * 检查渲染器是否已就绪
   */
  isReady(): boolean {
    return this._ready;
  }

  /**
   * Check if the renderer is active
   * 检查渲染器是否处于活动状态
   */
  isActive(): boolean {
    return this._active;
  }

  /**
   * Get the renderer config
   * 获取渲染器配置
   */
  getConfig(): Record<string, any> {
    return { ...this._config };
  }

  /**
   * Set the renderer config
   * 设置渲染器配置
   * @param config - The renderer config
   */
  setConfig(config: Record<string, any>): void {
    merge(this._config, config);
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

  /**
   * Get the current props
   * 获取当前属性
   */
  getProps(): IRendererProps {
    return { ...this._props };
  }
}
