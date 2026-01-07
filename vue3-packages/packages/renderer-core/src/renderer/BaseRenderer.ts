import { ref, reactive, computed, type Component, type VNode } from 'vue';
import type { IComponentMeta, ISchema } from '@vue3-lowcode/types';
import type {
  IRuntime,
  RenderContext,
  ComponentInstance,
  RuntimeConfig,
} from '../runtime/IRuntime';

/**
 * 渲染器基类
 * 
 * 提供了渲染器的核心功能实现，包括组件渲染、挂载、卸载等操作。
 * 子类可以继承此类并实现特定框架的渲染逻辑。
 * 
 * @example
 * ```typescript
 * class VueRenderer extends BaseRenderer {
 *   constructor() {
 *     super(new VueRuntime());
 *   }
 *   
 *   renderComponent(component, container, context) {
 *     // Vue 特定的渲染逻辑
 *   }
 * }
 * ```
 */
export abstract class BaseRenderer implements IRuntime {
  /**
   * 运行时实例
   */
  protected runtime: IRuntime;

  /**
   * 运行时配置
   */
  protected config: RuntimeConfig;

  /**
   * 组件实例映射
   */
  protected componentInstances: Map<string, ComponentInstance>;

  /**
   * 渲染上下文映射
   */
  protected contexts: Map<string, RenderContext>;

  /**
   * 是否已初始化
   */
  protected initialized: boolean;

  /**
   * 是否已销毁
   */
  protected destroyed: boolean;

  /**
   * 构造函数
   * 
   * @param runtime - 运行时实例
   * @param config - 运行时配置
   */
  constructor(runtime: IRuntime, config?: Partial<RuntimeConfig>) {
    this.runtime = runtime;
    this.config = {
      debug: false,
      performance: false,
      errorBoundary: true,
      ...config,
    };
    this.componentInstances = new Map();
    this.contexts = new Map();
    this.initialized = false;
    this.destroyed = false;

    this.setupErrorHandling();
  }

  /**
   * 初始化渲染器
   */
  init(): void {
    if (this.initialized) {
      console.warn('[BaseRenderer] Renderer already initialized');
      return;
    }

    this.initialized = true;
    this.log('[BaseRenderer] Renderer initialized');
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
    if (this.destroyed) {
      throw new Error('[BaseRenderer] Renderer has been destroyed');
    }

    if (!this.initialized) {
      this.init();
    }

    return this.runtime.renderComponent(component, container, context);
  }

  /**
   * 卸载容器中的组件
   * 
   * @param container - 容器元素
   */
  unmountComponent(container: Element): void {
    if (this.destroyed) {
      throw new Error('[BaseRenderer] Renderer has been destroyed');
    }

    this.runtime.unmountComponent(container);
  }

  /**
   * 创建渲染上下文
   * 
   * @param data - 上下文数据
   * @returns 渲染上下文
   */
  createContext(data?: Record<string, any>): RenderContext {
    const contextId = this.generateId('context');
    const context: RenderContext = {
      id: contextId,
      data: data || {},
    };

    this.contexts.set(contextId, context);
    this.log('[BaseRenderer] Context created:', contextId);

    return context;
  }

  /**
   * 使用渲染上下文
   * 
   * @param context - 渲染上下文
   * @returns 上下文数据
   */
  useContext(context: RenderContext): Record<string, any> {
    return this.runtime.useContext(context);
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
    const instanceId = this.generateId('instance');
    const instance = this.runtime.createComponentInstance(componentMeta, schema);

    this.componentInstances.set(instanceId, instance);
    this.log('[BaseRenderer] Component instance created:', instanceId);

    return instance;
  }

  /**
   * 销毁组件实例
   * 
   * @param instance - 组件实例
   */
  destroyComponentInstance(instance: ComponentInstance): void {
    this.runtime.destroyComponentInstance(instance);

    // 从映射中移除
    for (const [id, inst] of this.componentInstances.entries()) {
      if (inst === instance) {
        this.componentInstances.delete(id);
        this.log('[BaseRenderer] Component instance destroyed:', id);
        break;
      }
    }
  }

  /**
   * 获取运行时配置
   * 
   * @returns 运行时配置
   */
  getRuntimeConfig(): RuntimeConfig {
    return { ...this.config };
  }

  /**
   * 设置运行时配置
   * 
   * @param config - 运行时配置
   */
  setRuntimeConfig(config: Partial<RuntimeConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
    this.log('[BaseRenderer] Runtime config updated:', config);
  }

  /**
   * 注册全局组件
   * 
   * @param name - 组件名称
   * @param component - 组件
   */
  registerComponent(name: string, component: Component): void {
    this.runtime.registerComponent(name, component);
    this.log('[BaseRenderer] Component registered:', name);
  }

  /**
   * 注销全局组件
   * 
   * @param name - 组件名称
   */
  unregisterComponent(name: string): void {
    this.runtime.unregisterComponent(name);
    this.log('[BaseRenderer] Component unregistered:', name);
  }

  /**
   * 获取全局组件
   * 
   * @param name - 组件名称
   * @returns 组件
   */
  getComponent(name: string): Component | undefined {
    return this.runtime.getComponent(name);
  }

  /**
   * 注册全局指令
   * 
   * @param name - 指令名称
   * @param directive - 指令
   */
  registerDirective(name: string, directive: any): void {
    this.runtime.registerDirective(name, directive);
    this.log('[BaseRenderer] Directive registered:', name);
  }

  /**
   * 注销全局指令
   * 
   * @param name - 指令名称
   */
  unregisterDirective(name: string): void {
    this.runtime.unregisterDirective(name);
    this.log('[BaseRenderer] Directive unregistered:', name);
  }

  /**
   * 获取全局指令
   * 
   * @param name - 指令名称
   * @returns 指令
   */
  getDirective(name: string): any | undefined {
    return this.runtime.getDirective(name);
  }

  /**
   * 注册全局插件
   * 
   * @param plugin - 插件
   * @param options - 插件选项
   */
  registerPlugin(plugin: any, options?: any): void {
    this.runtime.registerPlugin(plugin, options);
    this.log('[BaseRenderer] Plugin registered');
  }

  /**
   * 注销全局插件
   * 
   * @param plugin - 插件
   */
  unregisterPlugin(plugin: any): void {
    this.runtime.unregisterPlugin(plugin);
    this.log('[BaseRenderer] Plugin unregistered');
  }

  /**
   * 获取应用实例
   * 
   * @returns 应用实例
   */
  getApp(): any {
    return this.runtime.getApp();
  }

  /**
   * 销毁渲染器
   */
  destroy(): void {
    if (this.destroyed) {
      console.warn('[BaseRenderer] Renderer already destroyed');
      return;
    }

    // 销毁所有组件实例
    for (const instance of this.componentInstances.values()) {
      this.destroyComponentInstance(instance);
    }

    // 清空映射
    this.componentInstances.clear();
    this.contexts.clear();

    // 销毁运行时
    this.runtime.destroy();

    this.destroyed = true;
    this.log('[BaseRenderer] Renderer destroyed');
  }

  /**
   * 设置错误处理
   */
  protected setupErrorHandling(): void {
    if (this.config.errorBoundary && this.config.errorHandler) {
      // 设置全局错误处理器
      this.log('[BaseRenderer] Error handling setup');
    }
  }

  /**
   * 记录日志
   * 
   * @param message - 日志消息
   * @param data - 附加数据
   */
  protected log(message: string, ...data: any[]): void {
    if (this.config.debug) {
      console.log(message, ...data);
    }
  }

  /**
   * 生成唯一 ID
   * 
   * @param prefix - ID 前缀
   * @returns 唯一 ID
   */
  protected generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 创建响应式状态
   * 
   * @param initial - 初始状态
   * @returns 响应式状态
   */
  protected createReactive<T extends Record<string, any>>(initial: T): T {
    return reactive(initial);
  }

  /**
   * 创建响应式引用
   * 
   * @param initial - 初始值
   * @returns 响应式引用
   */
  protected createRef<T>(initial: T): ReturnType<typeof ref<T>> {
    return ref(initial);
  }

  /**
   * 创建计算属性
   * 
   * @param getter - getter 函数
   * @returns 计算属性
   */
  protected createComputed<T>(getter: () => T): ReturnType<typeof computed<T>> {
    return computed(getter);
  }
}
