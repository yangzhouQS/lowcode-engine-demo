import {
  createApp,
  h,
  inject,
  provide,
  type App,
  type Component,
  type VNode,
  type InjectionKey,
} from 'vue';
import type { IComponentMeta, ISchema } from '@vue3-lowcode/types';
import type {
  IRuntime,
  RenderContext,
  ComponentInstance,
  RuntimeConfig,
} from '@vue3-lowcode/renderer-core';

/**
 * Vue3 运行时实现
 * 
 * 实现了 IRuntime 接口，提供 Vue3 特定的运行时功能。
 * 
 * @example
 * ```typescript
 * const runtime = new VueRuntime();
 * const app = runtime.getApp();
 * app.mount('#app');
 * ```
 */
export class VueRuntime implements IRuntime {
  /**
   * Vue 应用实例
   */
  protected app: App;

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
   * 全局组件映射
   */
  protected components: Map<string, Component>;

  /**
   * 全局指令映射
   */
  protected directives: Map<string, any>;

  /**
   * 全局插件列表
   */
  protected plugins: Array<{ plugin: any; options?: any }>;

  /**
   * 上下文注入键
   */
  protected contextKey: InjectionKey<RenderContext>;

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
   * @param config - 运行时配置
   */
  constructor(config?: Partial<RuntimeConfig>) {
    this.config = {
      debug: false,
      performance: false,
      errorBoundary: true,
      ...config,
    };
    this.componentInstances = new Map();
    this.contexts = new Map();
    this.components = new Map();
    this.directives = new Map();
    this.plugins = [];
    this.contextKey = Symbol('vue-renderer-context') as InjectionKey<RenderContext>;
    this.initialized = false;
    this.destroyed = false;

    this.app = createApp({
      setup() {
        // 提供默认上下文
        const defaultContext: RenderContext = {
          id: 'default',
          data: {},
        };
        provide(contextKey, defaultContext);
        return {};
      },
    });

    this.setupErrorHandling();
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
      throw new Error('[VueRuntime] Runtime has been destroyed');
    }

    if (!this.initialized) {
      this.init();
    }

    // 创建 VNode
    const vnode = h(component);

    // 如果有上下文，提供上下文
    if (context) {
      const contextComponent = {
        setup() {
          provide(this.contextKey, context);
          return () => vnode;
        },
      };
      const contextVNode = h(contextComponent);
      this.app.mount(container);
      return contextVNode;
    }

    // 直接挂载
    this.app.mount(container);
    return vnode;
  }

  /**
   * 卸载容器中的组件
   * 
   * @param container - 容器元素
   */
  unmountComponent(container: Element): void {
    if (this.destroyed) {
      throw new Error('[VueRuntime] Runtime has been destroyed');
    }

    this.app.unmount();
    this.log('[VueRuntime] Component unmounted');
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
    this.log('[VueRuntime] Context created:', contextId);

    return context;
  }

  /**
   * 使用渲染上下文
   * 
   * @param context - 渲染上下文
   * @returns 上下文数据
   */
  useContext(context: RenderContext): Record<string, any> {
    const contextData = inject(this.contextKey);
    return contextData || context.data;
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
    
    const instance: ComponentInstance = {
      instance: null,
      componentMeta,
      schema,
      state: this.createReactiveState(schema.props || {}),
      props: this.createReactiveProps(schema.props || {}),
      updateState: (newState: Record<string, any>) => {
        Object.assign(instance.state, newState);
        this.log('[VueRuntime] State updated:', instanceId, newState);
      },
      updateProps: (newProps: Record<string, any>) => {
        Object.assign(instance.props, newProps);
        this.log('[VueRuntime] Props updated:', instanceId, newProps);
      },
      destroy: () => {
        this.destroyComponentInstance(instance);
      },
    };

    this.componentInstances.set(instanceId, instance);
    this.log('[VueRuntime] Component instance created:', instanceId);

    return instance;
  }

  /**
   * 销毁组件实例
   * 
   * @param instance - 组件实例
   */
  destroyComponentInstance(instance: ComponentInstance): void {
    // 从映射中移除
    for (const [id, inst] of this.componentInstances.entries()) {
      if (inst === instance) {
        this.componentInstances.delete(id);
        this.log('[VueRuntime] Component instance destroyed:', id);
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
    this.log('[VueRuntime] Runtime config updated:', config);
  }

  /**
   * 注册全局组件
   * 
   * @param name - 组件名称
   * @param component - 组件
   */
  registerComponent(name: string, component: Component): void {
    this.app.component(name, component);
    this.components.set(name, component);
    this.log('[VueRuntime] Component registered:', name);
  }

  /**
   * 注销全局组件
   * 
   * @param name - 组件名称
   */
  unregisterComponent(name: string): void {
    this.app.component(name, null);
    this.components.delete(name);
    this.log('[VueRuntime] Component unregistered:', name);
  }

  /**
   * 获取全局组件
   * 
   * @param name - 组件名称
   * @returns 组件
   */
  getComponent(name: string): Component | undefined {
    return this.components.get(name);
  }

  /**
   * 注册全局指令
   * 
   * @param name - 指令名称
   * @param directive - 指令
   */
  registerDirective(name: string, directive: any): void {
    this.app.directive(name, directive);
    this.directives.set(name, directive);
    this.log('[VueRuntime] Directive registered:', name);
  }

  /**
   * 注销全局指令
   * 
   * @param name - 指令名称
   */
  unregisterDirective(name: string): void {
    this.app.directive(name, null);
    this.directives.delete(name);
    this.log('[VueRuntime] Directive unregistered:', name);
  }

  /**
   * 获取全局指令
   * 
   * @param name - 指令名称
   * @returns 指令
   */
  getDirective(name: string): any | undefined {
    return this.directives.get(name);
  }

  /**
   * 注册全局插件
   * 
   * @param plugin - 插件
   * @param options - 插件选项
   */
  registerPlugin(plugin: any, options?: any): void {
    this.app.use(plugin, options);
    this.plugins.push({ plugin, options });
    this.log('[VueRuntime] Plugin registered');
  }

  /**
   * 注销全局插件
   * 
   * @param plugin - 插件
   */
  unregisterPlugin(plugin: any): void {
    const index = this.plugins.findIndex((p) => p.plugin === plugin);
    if (index !== -1) {
      this.plugins.splice(index, 1);
      this.log('[VueRuntime] Plugin unregistered');
    }
  }

  /**
   * 获取应用实例
   * 
   * @returns 应用实例
   */
  getApp(): App {
    return this.app;
  }

  /**
   * 销毁运行时
   */
  destroy(): void {
    if (this.destroyed) {
      console.warn('[VueRuntime] Runtime already destroyed');
      return;
    }

    // 销毁所有组件实例
    for (const instance of this.componentInstances.values()) {
      this.destroyComponentInstance(instance);
    }

    // 清空映射
    this.componentInstances.clear();
    this.contexts.clear();
    this.components.clear();
    this.directives.clear();
    this.plugins = [];

    // 卸载应用
    try {
      this.app.unmount();
    } catch (error) {
      console.warn('[VueRuntime] Error unmounting app:', error);
    }

    this.destroyed = true;
    this.log('[VueRuntime] Runtime destroyed');
  }

  /**
   * 初始化运行时
   */
  protected init(): void {
    if (this.initialized) {
      console.warn('[VueRuntime] Runtime already initialized');
      return;
    }

    // 注册全局组件
    if (this.config.components) {
      for (const [name, component] of Object.entries(this.config.components)) {
        this.registerComponent(name, component);
      }
    }

    // 注册全局指令
    if (this.config.directives) {
      for (const [name, directive] of Object.entries(this.config.directives)) {
        this.registerDirective(name, directive);
      }
    }

    // 注册全局插件
    if (this.config.plugins) {
      for (const { plugin, options } of this.config.plugins) {
        this.registerPlugin(plugin, options);
      }
    }

    this.initialized = true;
    this.log('[VueRuntime] Runtime initialized');
  }

  /**
   * 设置错误处理
   */
  protected setupErrorHandling(): void {
    if (this.config.errorBoundary) {
      this.app.config.errorHandler = (error, instance, info) => {
        this.log('[VueRuntime] Error:', error, info);
        if (this.config.errorHandler) {
          this.config.errorHandler(error);
        }
      };

      this.app.config.warnHandler = (warning, instance, trace) => {
        this.log('[VueRuntime] Warning:', warning, trace);
        if (this.config.warningHandler) {
          this.config.warningHandler(warning);
        }
      };
    }
  }

  /**
   * 创建响应式状态
   * 
   * @param props - 属性
   * @returns 响应式状态
   */
  protected createReactiveState(props: Record<string, any>): Record<string, any> {
    return { ...props };
  }

  /**
   * 创建响应式属性
   * 
   * @param props - 属性
   * @returns 响应式属性
   */
  protected createReactiveProps(props: Record<string, any>): Record<string, any> {
    return { ...props };
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
}
