/**
 * IRendererProps Interface
 * 
 * 渲染器属性接口,定义渲染器的属性
 * 
 * @public
 */
export interface IRendererProps {
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
}
