import { h, createApp, type App } from 'vue';
import { BaseRenderer } from '@vue3-lowcode/renderer-core';
import type { IRendererProps } from '@vue3-lowcode/renderer-core';
import type { INode } from '@vue3-lowcode/types';
import { VueRendererInstance } from './VueRendererInstance';

/**
 * Vue3 renderer implementation
 * Vue3 渲染器实现
 */
export class VueRenderer extends BaseRenderer {
  protected _app: App | undefined;
  protected _container: HTMLElement | undefined;
  protected _componentMap: Map<string, any>;
  protected _instanceMap: Map<string, VueRendererInstance>;

  constructor(config: Record<string, any> = {}) {
    super(config);
    this._componentMap = new Map();
    this._instanceMap = new Map();
  }

  /**
   * Render a component
   * 渲染组件
   * @param props - The renderer props
   */
  render(props: IRendererProps): void {
    super.render(props);

    if (!this._container) {
      console.warn('Container not set, cannot render');
      return;
    }

    // Clean up previous app
    if (this._app) {
      this._app.unmount();
      this._app = undefined;
    }

    // Create new app
    this._app = createApp({
      setup() {
        return () => {
          const document = props.document;
          if (!document) {
            return null;
          }

          const rootNode = document.getRootNode();
          if (!rootNode) {
            return null;
          }

          return renderNode(rootNode, this._componentMap);
        };
      },
    });

    // Mount app
    this._app.mount(this._container);
    this.emit('rendered', props);
  }

  /**
   * Set the container element
   * 设置容器元素
   * @param container - The container element
   */
  setContainer(container: HTMLElement): void {
    this._container = container;
    this.emit('containerChanged', container);
  }

  /**
   * Get the container element
   * 获取容器元素
   */
  getContainer(): HTMLElement | undefined {
    return this._container;
  }

  /**
   * Register a component
   * 注册组件
   * @param name - The component name
   * @param component - The component
   */
  registerComponent(name: string, component: any): void {
    this._componentMap.set(name, component);
    this.emit('componentRegistered', name, component);
  }

  /**
   * Unregister a component
   * 注销组件
   * @param name - The component name
   */
  unregisterComponent(name: string): void {
    const component = this._componentMap.get(name);
    if (component) {
      this._componentMap.delete(name);
      this.emit('componentUnregistered', name, component);
    }
  }

  /**
   * Get a component
   * 获取组件
   * @param name - The component name
   */
  getComponent(name: string): any | undefined {
    return this._componentMap.get(name);
  }

  /**
   * Get all components
   * 获取所有组件
   */
  getComponents(): Map<string, any> {
    return new Map(this._componentMap);
  }

  /**
   * Get a renderer instance by node id
   * 根据节点ID获取渲染器实例
   * @param nodeId - The node id
   */
  getRendererInstance(nodeId: string): VueRendererInstance | undefined {
    return this._instanceMap.get(nodeId);
  }

  /**
   * Register a renderer instance
   * 注册渲染器实例
   * @param nodeId - The node id
   * @param instance - The renderer instance
   */
  registerRendererInstance(nodeId: string, instance: VueRendererInstance): void {
    this._instanceMap.set(nodeId, instance);
  }

  /**
   * Unregister a renderer instance
   * 注销渲染器实例
   * @param nodeId - The node id
   */
  unregisterRendererInstance(nodeId: string): void {
    this._instanceMap.delete(nodeId);
  }

  /**
   * Dispose the renderer
   * 销毁渲染器
   */
  dispose(): void {
    if (this._app) {
      this._app.unmount();
      this._app = undefined;
    }
    this._container = undefined;
    this._componentMap.clear();
    this._instanceMap.clear();
    super.dispose();
  }
}

/**
 * Render a node recursively
 * 递归渲染节点
 * @param node - The node to render
 * @param componentMap - The component map
 */
function renderNode(node: INode, componentMap: Map<string, any>): any {
  const componentName = node.getComponentName();
  const component = componentMap.get(componentName);

  if (!component) {
    console.warn(`Component "${componentName}" not found`);
    return null;
  }

  const props = node.getProps();
  const propsValue = props.getSchema();
  const children = node.getChildren();

  return h(
    component,
    propsValue,
    children.map(child => renderNode(child, componentMap))
  );
}
