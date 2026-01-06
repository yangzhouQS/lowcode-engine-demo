/**
 * IPluginManager Interface
 * 
 * 插件管理器接口,管理所有插件
 * 
 * @public
 */
export interface IPluginManager {
  /**
   * 注册插件
   * 
   * @param plugin - 插件
   * @returns Promise<void>
   */
  registerPlugin(plugin: any): Promise<void>;

  /**
   * 注销插件
   * 
   * @param name - 插件名称
   * @returns Promise<void>
   */
  unregisterPlugin(name: string): Promise<void>;

  /**
   * 获取插件
   * 
   * @param name - 插件名称
   * @returns 插件
   */
  getPlugin(name: string): any;

  /**
   * 检查插件是否存在
   * 
   * @param name - 插件名称
   * @returns 是否存在
   */
  hasPlugin(name: string): boolean;

  /**
   * 获取所有插件
   * 
   * @returns 插件列表
   */
  getAllPlugins(): any[];

  /**
   * 初始化所有插件
   * 
   * @returns Promise<void>
   */
  initPlugins(): Promise<void>;

  /**
   * 销毁所有插件
   * 
   * @returns Promise<void>
   */
  destroyPlugins(): Promise<void>;
}
