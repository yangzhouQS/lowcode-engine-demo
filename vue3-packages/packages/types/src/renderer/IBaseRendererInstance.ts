/**
 * IBaseRendererInstance Interface
 * 
 * 渲染器实例接口,定义渲染器实例的基本功能
 * 
 * @public
 */
export interface IBaseRendererInstance {
  /**
   * 渲染器 ID
   */
  id: string;

  /**
   * 组件
   */
  component: any;

  /**
   * 属性
   */
  props: any;

  /**
   * 插槽
   */
  slots: any;

  /**
   * 上下文
   */
  context: any;

  /**
   * 事件
   */
  events: any;

  /**
   * 获取渲染结果
   * 
   * @returns 渲染结果
   */
  getRenderResult(): any;

  /**
   * 更新属性
   * 
   * @param props - 属性
   * @returns Promise<void>
   */
  updateProps(props: any): Promise<void>;

  /**
   * 更新插槽
   * 
   * @param slots - 插槽
   * @returns Promise<void>
   */
  updateSlots(slots: any): Promise<void>;

  /**
   * 更新上下文
   * 
   * @param context - 上下文
   * @returns Promise<void>
   */
  updateContext(context: any): Promise<void>;

  /**
   * 销毁渲染器
   * 
   * @returns Promise<void>
   */
  dispose(): Promise<void>;
}
