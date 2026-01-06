import type { INode } from '@vue3-lowcode/types';

/**
 * Base renderer instance interface
 * 基础渲染器实例接口
 */
export interface IBaseRendererInstance {
  /**
   * Get the node id
   * 获取节点 ID
   */
  getId(): string;

  /**
   * Get the node
   * 获取节点
   */
  getNode(): INode | undefined;

  /**
   * Set the node
   * 设置节点
   * @param node - The node instance
   */
  setNode(node: INode): void;

  /**
   * Get the component instance
   * 获取组件实例
   */
  getComponent(): any;

  /**
   * Set the component instance
   * 设置组件实例
   * @param component - The component instance
   */
  setComponent(component: any): void;

  /**
   * Get the props
   * 获取属性
   */
  getProps(): Record<string, any>;

  /**
   * Set the props
   * 设置属性
   * @param props - The props
   */
  setProps(props: Record<string, any>): void;

  /**
   * Get a prop value
   * 获取属性值
   * @param key - The prop key
   */
  getProp(key: string): any;

  /**
   * Set a prop value
   * 设置属性值
   * @param key - The prop key
   * @param value - The prop value
   */
  setProp(key: string, value: any): void;

  /**
   * Check if the instance is mounted
   * 检查实例是否已挂载
   */
  isMounted(): boolean;

  /**
   * Mount the instance
   * 挂载实例
   */
  mount(): void;

  /**
   * Unmount the instance
   * 卸载实例
   */
  unmount(): void;

  /**
   * Update the instance
   * 更新实例
   */
  update(): void;

  /**
   * Destroy the instance
   * 销毁实例
   */
  destroy(): void;

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
