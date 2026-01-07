import type { Component, App, VNode } from 'vue';
import type { IComponentMeta, ISchema } from '@vue3-lowcode/types';

/**
 * 运行时接口
 * 
 * 定义了低代码引擎运行时的核心接口，用于管理组件的渲染、挂载、卸载等操作。
 * 
 * @example
 * ```typescript
 * class VueRuntime implements IRuntime {
 *   renderComponent(component, container) {
 *     // 实现组件渲染
 *   }
 *   
 *   unmountComponent(container) {
 *     // 实现组件卸载
 *   }
 * }
 * ```
 */
export interface IRuntime {
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
  ): VNode;

  /**
   * 卸载容器中的组件
   * 
   * @param container - 容器元素
   */
  unmountComponent(container: Element): void;

  /**
   * 创建渲染上下文
   * 
   * @param data - 上下文数据
   * @returns 渲染上下文
   */
  createContext(data?: Record<string, any>): RenderContext;

  /**
   * 使用渲染上下文
   * 
   * @param context - 渲染上下文
   * @returns 上下文数据
   */
  useContext(context: RenderContext): Record<string, any>;

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
  ): ComponentInstance;

  /**
   * 销毁组件实例
   * 
   * @param instance - 组件实例
   */
  destroyComponentInstance(instance: ComponentInstance): void;

  /**
   * 获取运行时配置
   * 
   * @returns 运行时配置
   */
  getRuntimeConfig(): RuntimeConfig;

  /**
   * 设置运行时配置
   * 
   * @param config - 运行时配置
   */
  setRuntimeConfig(config: Partial<RuntimeConfig>): void;

  /**
   * 注册全局组件
   * 
   * @param name - 组件名称
   * @param component - 组件
   */
  registerComponent(name: string, component: Component): void;

  /**
   * 注销全局组件
   * 
   * @param name - 组件名称
   */
  unregisterComponent(name: string): void;

  /**
   * 获取全局组件
   * 
   * @param name - 组件名称
   * @returns 组件
   */
  getComponent(name: string): Component | undefined;

  /**
   * 注册全局指令
   * 
   * @param name - 指令名称
   * @param directive - 指令
   */
  registerDirective(name: string, directive: any): void;

  /**
   * 注销全局指令
   * 
   * @param name - 指令名称
   */
  unregisterDirective(name: string): void;

  /**
   * 获取全局指令
   * 
   * @param name - 指令名称
   * @returns 指令
   */
  getDirective(name: string): any | undefined;

  /**
   * 注册全局插件
   * 
   * @param plugin - 插件
   * @param options - 插件选项
   */
  registerPlugin(plugin: any, options?: any): void;

  /**
   * 注销全局插件
   * 
   * @param plugin - 插件
   */
  unregisterPlugin(plugin: any): void;

  /**
   * 获取应用实例
   * 
   * @returns 应用实例
   */
  getApp(): App;

  /**
   * 销毁运行时
   */
  destroy(): void;
}

/**
 * 渲染上下文
 */
export interface RenderContext {
  /**
   * 上下文数据
   */
  data: Record<string, any>;

  /**
   * 上下文 ID
   */
  id: string;

  /**
   * 父上下文
   */
  parent?: RenderContext;

  /**
   * 子上下文
   */
  children?: RenderContext[];
}

/**
 * 组件实例
 */
export interface ComponentInstance {
  /**
   * 组件实例
   */
  instance: any;

  /**
   * 组件元数据
   */
  componentMeta: IComponentMeta;

  /**
   * 组件 Schema
   */
  schema: ISchema;

  /**
   * 组件状态
   */
  state: Record<string, any>;

  /**
   * 组件属性
   */
  props: Record<string, any>;

  /**
   * 更新组件状态
   * 
   * @param state - 新状态
   */
  updateState(state: Record<string, any>): void;

  /**
   * 更新组件属性
   * 
   * @param props - 新属性
   */
  updateProps(props: Record<string, any>): void;

  /**
   * 销毁组件实例
   */
  destroy(): void;
}

/**
 * 运行时配置
 */
export interface RuntimeConfig {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;

  /**
   * 是否启用性能监控
   */
  performance?: boolean;

  /**
   * 是否启用错误边界
   */
  errorBoundary?: boolean;

  /**
   * 错误处理器
   */
  errorHandler?: (error: Error) => void;

  /**
   * 警告处理器
   */
  warningHandler?: (warning: string) => void;

  /**
   * 全局组件
   */
  components?: Record<string, Component>;

  /**
   * 全局指令
   */
  directives?: Record<string, any>;

  /**
   * 全局插件
   */
  plugins?: Array<{ plugin: any; options?: any }>;

  /**
   * 自定义上下文数据
   */
  context?: Record<string, any>;
}
