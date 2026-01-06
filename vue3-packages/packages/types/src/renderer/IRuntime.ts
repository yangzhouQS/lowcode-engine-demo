/**
 * IRuntime Interface
 * 
 * 运行时接口,定义运行时接口
 * 
 * @public
 */
export interface IRuntime {
  /**
   * 渲染组件
   * 
   * @param component - 组件
   * @param container - 容器
   * @returns 渲染结果
   */
  renderComponent(component: any, container: any): any;

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
