import type { IRenderer } from '../renderer/IRenderer';
import type { IBaseRendererInstance } from '../renderer/IBaseRendererInstance';

/**
 * Runtime interface for renderer runtime management
 * 运行时接口，用于管理渲染器运行时
 */
export interface IRuntime {
  /**
   * Initialize the runtime
   * 初始化运行时
   */
  init(): void;

  /**
   * Start the runtime
   * 启动运行时
   */
  start(): void;

  /**
   * Stop the runtime
   * 停止运行时
   */
  stop(): void;

  /**
   * Dispose the runtime
   * 销毁运行时
   */
  dispose(): void;

  /**
   * Get the renderer
   * 获取渲染器
   */
  getRenderer(): IRenderer | undefined;

  /**
   * Set the renderer
   * 设置渲染器
   * @param renderer - The renderer instance
   */
  setRenderer(renderer: IRenderer): void;

  /**
   * Get a renderer instance by id
   * 根据ID获取渲染器实例
   * @param id - The renderer instance id
   */
  getRendererInstance(id: string): IBaseRendererInstance | undefined;

  /**
   * Register a renderer instance
   * 注册渲染器实例
   * @param id - The renderer instance id
   * @param instance - The renderer instance
   */
  registerRendererInstance(id: string, instance: IBaseRendererInstance): void;

  /**
   * Unregister a renderer instance
   * 注销渲染器实例
   * @param id - The renderer instance id
   */
  unregisterRendererInstance(id: string): void;

  /**
   * Get all renderer instances
   * 获取所有渲染器实例
   */
  getRendererInstances(): Map<string, IBaseRendererInstance>;

  /**
   * Check if the runtime is ready
   * 检查运行时是否已就绪
   */
  isReady(): boolean;

  /**
   * Check if the runtime is active
   * 检查运行时是否处于活动状态
   */
  isActive(): boolean;

  /**
   * Get the runtime config
   * 获取运行时配置
   */
  getConfig(): Record<string, any>;

  /**
   * Set the runtime config
   * 设置运行时配置
   * @param config - The runtime config
   */
  setConfig(config: Record<string, any>): void;

  /**
   * Add event listener
   * 添加事件监听器
   * @param event - The event name
   * @param handler - The event handler
   */
  on(event: string, handler: (...args: any[]) => void): void;

  /**
   * Remove event listener
   * 移除事件监听器
   * @param event - The event name
   * @param handler - The event handler
   */
  off(event: string, handler: (...args: any[]) => void): void;

  /**
   * Emit an event
   * 触发事件
   * @param event - The event name
   * @param args - The event arguments
   */
  emit(event: string, ...args: any[]): void;
}
