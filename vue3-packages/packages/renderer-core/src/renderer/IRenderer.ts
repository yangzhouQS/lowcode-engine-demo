import type { IRuntime } from '../runtime/IRuntime';
import type { IRendererProps } from './IRendererProps';

/**
 * Renderer interface for component rendering
 * 渲染器接口，用于组件渲染
 */
export interface IRenderer {
  /**
   * Initialize the renderer
   * 初始化渲染器
   */
  init(): void;

  /**
   * Start the renderer
   * 启动渲染器
   */
  start(): void;

  /**
   * Stop the renderer
   * 停止渲染器
   */
  stop(): void;

  /**
   * Dispose the renderer
   * 销毁渲染器
   */
  dispose(): void;

  /**
   * Render a component
   * 渲染组件
   * @param props - The renderer props
   */
  render(props: IRendererProps): void;

  /**
   * Get the runtime
   * 获取运行时
   */
  getRuntime(): IRuntime | undefined;

  /**
   * Set the runtime
   * 设置运行时
   * @param runtime - The runtime instance
   */
  setRuntime(runtime: IRuntime): void;

  /**
   * Check if the renderer is ready
   * 检查渲染器是否已就绪
   */
  isReady(): boolean;

  /**
   * Check if the renderer is active
   * 检查渲染器是否处于活动状态
   */
  isActive(): boolean;

  /**
   * Get the renderer config
   * 获取渲染器配置
   */
  getConfig(): Record<string, any>;

  /**
   * Set the renderer config
   * 设置渲染器配置
   * @param config - The renderer config
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
