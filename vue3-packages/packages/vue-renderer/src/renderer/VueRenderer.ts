import { BaseRenderer } from '@vue3-lowcode/renderer-core';
import { VueRuntime } from '../runtime/VueRuntime';
import type { Component, VNode } from 'vue';
import type { IComponentMeta, ISchema } from '@vue3-lowcode/types';
import type { RenderContext, ComponentInstance } from '@vue3-lowcode/renderer-core';

/**
 * Vue3 渲染器实现
 * 
 * 继承自 BaseRenderer，提供 Vue3 特定的渲染功能。
 * 
 * @example
 * ```typescript
 * const renderer = new VueRenderer({
 *   debug: true,
 *   performance: true,
 * });
 * 
 * // 渲染组件
 * renderer.renderComponent(MyComponent, container);
 * 
 * // 创建上下文
 * const context = renderer.createContext({ userId: '123' });
 * ```
 */
export class VueRenderer extends BaseRenderer {
  /**
   * Vue 运行时实例
   */
  protected vueRuntime: VueRuntime;

  /**
   * 构造函数
   * 
   * @param config - 运行时配置
   */
  constructor(config?: Partial<import('@vue3-lowcode/renderer-core').RuntimeConfig>) {
    const vueRuntime = new VueRuntime(config);
    super(vueRuntime, config);
    this.vueRuntime = vueRuntime;
  }

  /**
   * 渲染组件到指定容器
   * 
   * @param component - 要渲染的组件
   * @param container - 容器元素
   * @param context - 渲染上下文
   * @returns 渲染的 VNode
   */
  renderComponent(
    component: Component,
    container: Element,
    context?: RenderContext
  ): VNode {
    if (this['destroyed']) {
      throw new Error('[VueRenderer] Renderer has been destroyed');
    }

    if (!this['initialized']) {
      this.init();
    }

    return this.vueRuntime.renderComponent(component, container, context);
  }

  /**
   * 卸载容器中的组件
   * 
   * @param container - 容器元素
   */
  unmountComponent(container: Element): void {
    if (this['destroyed']) {
      throw new Error('[VueRenderer] Renderer has been destroyed');
    }

    this.vueRuntime.unmountComponent(container);
  }

  /**
   * 创建渲染上下文
   * 
   * @param data - 上下文数据
   * @returns 渲染上下文
   */
  createContext(data?: Record<string, any>): RenderContext {
    return this.vueRuntime.createContext(data);
  }

  /**
   * 使用渲染上下文
   * 
   * @param context - 渲染上下文
   * @returns 上下文数据
   */
  useContext(context: RenderContext): Record<string, any> {
    return this.vueRuntime.useContext(context);
  }

  /**
   * 创建组件实例
   * 
   * @param componentMeta - 组件元数据
   * @param schema - 组件 Schema
   * @returns 组件实例
   */
  createComponentInstance(
    componentMeta: IComponentMeta,
    schema: ISchema
  ): ComponentInstance {
    return this.vueRuntime.createComponentInstance(componentMeta, schema);
  }

  /**
   * 销毁组件实例
   * 
   * @param instance - 组件实例
   */
  destroyComponentInstance(instance: ComponentInstance): void {
    this.vueRuntime.destroyComponentInstance(instance);
  }

  /**
   * 获取运行时配置
   * 
   * @returns 运行时配置
   */
  getRuntimeConfig(): import('@vue3-lowcode/renderer-core').RuntimeConfig {
    return this.vueRuntime.getRuntimeConfig();
  }

  /**
   * 设置运行时配置
   * 
   * @param config - 运行时配置
   */
  setRuntimeConfig(config: Partial<import('@vue3-lowcode/renderer-core').RuntimeConfig>): void {
    this.vueRuntime.setRuntimeConfig(config);
  }

  /**
   * 注册全局组件
   * 
   * @param name - 组件名称
   * @param component - 组件
   */
  registerComponent(name: string, component: Component): void {
    this.vueRuntime.registerComponent(name, component);
  }

  /**
   * 注销全局组件
   * 
   * @param name - 组件名称
   */
  unregisterComponent(name: string): void {
    this.vueRuntime.unregisterComponent(name);
  }

  /**
   * 获取全局组件
   * 
   * @param name - 组件名称
   * @returns 组件
   */
  getComponent(name: string): Component | undefined {
    return this.vueRuntime.getComponent(name);
  }

  /**
   * 注册全局指令
   * 
   * @param name - 指令名称
   * @param directive - 指令
   */
  registerDirective(name: string, directive: any): void {
    this.vueRuntime.registerDirective(name, directive);
  }

  /**
   * 注销全局指令
   * 
   * @param name - 指令名称
   */
  unregisterDirective(name: string): void {
    this.vueRuntime.unregisterDirective(name);
  }

  /**
   * 获取全局指令
   * 
   * @param name - 指令名称
   * @returns 指令
   */
  getDirective(name: string): any | undefined {
    return this.vueRuntime.getDirective(name);
  }

  /**
   * 注册全局插件
   * 
   * @param plugin - 插件
   * @param options - 插件选项
   */
  registerPlugin(plugin: any, options?: any): void {
    this.vueRuntime.registerPlugin(plugin, options);
  }

  /**
   * 注销全局插件
   * 
   * @param plugin - 插件
   */
  unregisterPlugin(plugin: any): void {
    this.vueRuntime.unregisterPlugin(plugin);
  }

  /**
   * 获取应用实例
   * 
   * @returns 应用实例
   */
  getApp(): any {
    return this.vueRuntime.getApp();
  }

  /**
   * 销毁渲染器
   */
  destroy(): void {
    super.destroy();
    this.vueRuntime.destroy();
  }

  /**
   * 获取 Vue 运行时实例
   * 
   * @returns Vue 运行时实例
   */
  getVueRuntime(): VueRuntime {
    return this.vueRuntime;
  }

  /**
   * 批量注册组件
   * 
   * @param components - 组件映射
   */
  registerComponents(components: Record<string, Component>): void {
    for (const [name, component] of Object.entries(components)) {
      this.registerComponent(name, component);
    }
  }

  /**
   * 批量注册指令
   * 
   * @param directives - 指令映射
   */
  registerDirectives(directives: Record<string, any>): void {
    for (const [name, directive] of Object.entries(directives)) {
      this.registerDirective(name, directive);
    }
  }

  /**
   * 批量注册插件
   * 
   * @param plugins - 插件列表
   */
  registerPlugins(plugins: Array<{ plugin: any; options?: any }>): void {
    for (const { plugin, options } of plugins) {
      this.registerPlugin(plugin, options);
    }
  }

  /**
   * 获取所有已注册的组件
   * 
   * @returns 组件映射
   */
  getAllComponents(): Record<string, Component> {
    const components: Record<string, Component> = {};
    for (const [name, component] of this['runtime']['components']) {
      components[name] = component;
    }
    return components;
  }

  /**
   * 获取所有已注册的指令
   * 
   * @returns 指令映射
   */
  getAllDirectives(): Record<string, any> {
    const directives: Record<string, any> = {};
    for (const [name, directive] of this['runtime']['directives']) {
      directives[name] = directive;
    }
    return directives;
  }

  /**
   * 获取所有已注册的插件
   * 
   * @returns 插件列表
   */
  getAllPlugins(): Array<{ plugin: any; options?: any }> {
    return [...this['runtime']['plugins']];
  }

  /**
   * 清空所有已注册的组件
   */
  clearComponents(): void {
    for (const name of this['runtime']['components'].keys()) {
      this.unregisterComponent(name);
    }
  }

  /**
   * 清空所有已注册的指令
   */
  clearDirectives(): void {
    for (const name of this['runtime']['directives'].keys()) {
      this.unregisterDirective(name);
    }
  }

  /**
   * 清空所有已注册的插件
   */
  clearPlugins(): void {
    for (const { plugin } of this['runtime']['plugins']) {
      this.unregisterPlugin(plugin);
    }
  }

  /**
   * 检查组件是否已注册
   * 
   * @param name - 组件名称
   * @returns 是否已注册
   */
  hasComponent(name: string): boolean {
    return this['runtime']['components'].has(name);
  }

  /**
   * 检查指令是否已注册
   * 
   * @param name - 指令名称
   * @returns 是否已注册
   */
  hasDirective(name: string): boolean {
    return this['runtime']['directives'].has(name);
  }

  /**
   * 检查插件是否已注册
   * 
   * @param plugin - 插件
   * @returns 是否已注册
   */
  hasPlugin(plugin: any): boolean {
    return this['runtime']['plugins'].some((p) => p.plugin === plugin);
  }

  /**
   * 获取组件实例数量
   * 
   * @returns 组件实例数量
   */
  getComponentInstanceCount(): number {
    return this['componentInstances'].size;
  }

  /**
   * 获取渲染上下文数量
   * 
   * @returns 渲染上下文数量
   */
  getContextCount(): number {
    return this['contexts'].size;
  }

  /**
   * 获取所有组件实例
   * 
   * @returns 组件实例列表
   */
  getAllComponentInstances(): ComponentInstance[] {
    return Array.from(this['componentInstances'].values());
  }

  /**
   * 获取所有渲染上下文
   * 
   * @returns 渲染上下文列表
   */
  getAllContexts(): RenderContext[] {
    return Array.from(this['contexts'].values());
  }

  /**
   * 根据组件实例 ID 获取组件实例
   * 
   * @param instanceId - 组件实例 ID
   * @returns 组件实例
   */
  getComponentInstanceById(instanceId: string): ComponentInstance | undefined {
    return this['componentInstances'].get(instanceId);
  }

  /**
   * 根据上下文 ID 获取渲染上下文
   * 
   * @param contextId - 上下文 ID
   * @returns 渲染上下文
   */
  getContextById(contextId: string): RenderContext | undefined {
    return this['contexts'].get(contextId);
  }

  /**
   * 批量创建组件实例
   * 
   * @param items - 组件项列表
   * @returns 组件实例列表
   */
  createComponentInstances(
    items: Array<{ componentMeta: IComponentMeta; schema: ISchema }>
  ): ComponentInstance[] {
    return items.map((item) =>
      this.createComponentInstance(item.componentMeta, item.schema)
    );
  }

  /**
   * 批量销毁组件实例
   * 
   * @param instances - 组件实例列表
   */
  destroyComponentInstances(instances: ComponentInstance[]): void {
    for (const instance of instances) {
      this.destroyComponentInstance(instance);
    }
  }

  /**
   * 批量创建渲染上下文
   * 
   * @param dataList - 上下文数据列表
   * @returns 渲染上下文列表
   */
  createContexts(dataList?: Record<string, any>[]): RenderContext[] {
    return dataList ? dataList.map((data) => this.createContext(data)) : [this.createContext()];
  }

  /**
   * 批量渲染组件
   * 
   * @param items - 渲染项列表
   * @returns VNode 列表
   */
  renderComponents(
    items: Array<{ component: Component; container: Element; context?: RenderContext }>
  ): VNode[] {
    return items.map((item) =>
      this.renderComponent(item.component, item.container, item.context)
    );
  }

  /**
   * 批量卸载组件
   * 
   * @param containers - 容器元素列表
   */
  unmountComponents(containers: Element[]): void {
    for (const container of containers) {
      this.unmountComponent(container);
    }
  }
}
