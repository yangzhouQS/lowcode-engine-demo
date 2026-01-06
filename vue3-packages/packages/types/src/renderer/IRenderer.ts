/**
 * IRenderer Interface
 * 
 * 渲染器接口,定义渲染器的基本功能
 * 
 * @public
 */
export interface IRenderer {
  /**
   * 渲染组件
   * 
   * @param component - 组件
   * @param props - 属性
   * @param container - 容器
   * @returns 渲染结果
   */
  renderComponent(component: any, props: any, container: any): any;

  /**
   * 卸载组件
   * 
   * @param component - 组件
   * @returns Promise<void>
   */
  unmountComponent(component: any): Promise<void>;

  /**
   * 创建上下文
   * 
   * @param key - 上下文键
   * @param defaultValue - 默认值
   * @returns 上下文
   */
  createContext(key: any, defaultValue: any): any;

  /**
   * 使用上下文
   * 
   * @param key - 上下文键
   * @returns 上下文值
   */
  useContext(key: any): any;
}
