import { ref, reactive, type ComponentInternalInstance } from 'vue';
import type { IBaseRendererInstance } from '@vue3-lowcode/renderer-core';
import type { INode } from '@vue3-lowcode/types';

/**
 * Vue3 renderer instance implementation
 * Vue3 渲染器实例实现
 */
export class VueRendererInstance implements IBaseRendererInstance {
  protected _id: string;
  protected _node: INode | undefined;
  protected _component: ComponentInternalInstance | undefined;
  protected _props: Record<string, any>;
  protected _mounted: boolean;
  protected _eventListeners: Map<string, Set<(...args: any[]) => void>>;

  constructor(id: string) {
    this._id = id;
    this._node = undefined;
    this._component = undefined;
    this._props = reactive({});
    this._mounted = false;
    this._eventListeners = new Map();
  }

  /**
   * Get the node id
   * 获取节点 ID
   */
  getId(): string {
    return this._id;
  }

  /**
   * Get the node
   * 获取节点
   */
  getNode(): INode | undefined {
    return this._node;
  }

  /**
   * Set the node
   * 设置节点
   * @param node - The node instance
   */
  setNode(node: INode): void {
    this._node = node;
    this.emit('nodeChanged', node);
  }

  /**
   * Get the component instance
   * 获取组件实例
   */
  getComponent(): ComponentInternalInstance | undefined {
    return this._component;
  }

  /**
   * Set the component instance
   * 设置组件实例
   * @param component - The component instance
   */
  setComponent(component: ComponentInternalInstance): void {
    this._component = component;
    this.emit('componentChanged', component);
  }

  /**
   * Get the props
   * 获取属性
   */
  getProps(): Record<string, any> {
    return { ...this._props };
  }

  /**
   * Set the props
   * 设置属性
   * @param props - The props
   */
  setProps(props: Record<string, any>): void {
    Object.assign(this._props, props);
    this.emit('propsChanged', this._props);
  }

  /**
   * Get a prop value
   * 获取属性值
   * @param key - The prop key
   */
  getProp(key: string): any {
    return this._props[key];
  }

  /**
   * Set a prop value
   * 设置属性值
   * @param key - The prop key
   * @param value - The prop value
   */
  setProp(key: string, value: any): void {
    this._props[key] = value;
    this.emit('propChanged', key, value);
  }

  /**
   * Check if the instance is mounted
   * 检查实例是否已挂载
   */
  isMounted(): boolean {
    return this._mounted;
  }

  /**
   * Mount the instance
   * 挂载实例
   */
  mount(): void {
    if (this._mounted) {
      return;
    }
    this._mounted = true;
    this.emit('mounted');
  }

  /**
   * Unmount the instance
   * 卸载实例
   */
  unmount(): void {
    if (!this._mounted) {
      return;
    }
    this._mounted = false;
    this.emit('unmounted');
  }

  /**
   * Update the instance
   * 更新实例
   */
  update(): void {
    if (!this._mounted) {
      return;
    }
    this.emit('updated');
  }

  /**
   * Destroy the instance
   * 销毁实例
   */
  destroy(): void {
    this.unmount();
    this._eventListeners.clear();
    this._node = undefined;
    this._component = undefined;
    Object.keys(this._props).forEach(key => {
      delete this._props[key];
    });
    this.emit('destroyed');
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
