/**
 * IPlugin Interface
 * 
 * 插件接口,定义插件的基本结构
 * 
 * @public
 */
export interface IPlugin {
  /**
   * 插件名称
   */
  name: string;

  /**
   * 插件版本
   */
  version: string;

  /**
   * 插件依赖
   */
  deps?: string[];

  /**
   * 初始化插件
   * 
   * @param context - 插件上下文
   * @returns Promise<void>
   */
  init(context: any): Promise<void>;

  /**
   * 销毁插件
   * 
   * @returns Promise<void>
   */
  destroy(): Promise<void>;
}
