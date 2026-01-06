/**
 * IVueContext Interface
 * 
 * Vue3上下文接口,定义Vue3组件的上下文类型
 * 
 * @public
 */
export interface IVueContext {
  /**
   * 属性
   */
  attrs: Record<string, any>;

  /**
   * 插槽
   */
  slots: Record<string, any>;

  /**
   * 触发事件
   */
  emit: (event: string, ...args: any[]) => void;

  /**
   * 暴露公共方法
   */
  expose: (exposed?: Record<string, any>) => void;

  /**
   * 组件实例
   */
  ctx?: any;
}

/**
 * SetupContext Interface
 * 
 * Setup函数上下文接口
 * 
 * @public
 */
export interface SetupContext<E = EmitsOptions> {
  /**
   * 属性
   */
  attrs: Record<string, any>;

  /**
   * 插槽
   */
  slots: Slots;

  /**
   * 触发事件
   */
  emit: EmitFn<E>;

  /**
   * 暴露公共方法
   */
  expose: (exposed?: Record<string, any>) => void;
}

/**
 * EmitsOptions Interface
 * 
 * 事件选项接口
 * 
 * @public
 */
export type EmitsOptions = Array<string> | Record<string, any[] | null>;

/**
 * EmitFn Interface
 * 
 * 触发事件函数接口
 * 
 * @public
 */
export type EmitFn<T = EmitsOptions> = T extends Array<infer E>
  ? (event: E, ...args: any[]) => void
  : T extends Record<infer K, any>
    ? (event: K, ...args: any[]) => void
    : (event: string, ...args: any[]) => void;

/**
 * Slots Interface
 * 
 * 插槽接口
 * 
 * @public
 */
export interface Slots {
  /**
   * 插槽
   */
  [name: string]: ((...args: any[]) => any) | undefined;
}

/**
 * Slot Interface
 * 
 * 插槽函数接口
 * 
 * @public
 */
export type Slot = (...args: any[]) => any;
