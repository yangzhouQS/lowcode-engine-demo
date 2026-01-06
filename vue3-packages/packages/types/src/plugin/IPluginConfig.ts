/**
 * IPluginConfig Interface
 * 
 * 插件配置接口
 * 
 * @public
 */
export interface IPluginConfig {
  /**
   * 插件名称
   */
  name: string;

  /**
   * 插件版本
   */
  version?: string;

  /**
   * 插件描述
   */
  description?: string;

  /**
   * 插件依赖的其他插件
   */
  deps?: string[];

  /**
   * 插件配置选项
   */
  options?: Record<string, any>;

  /**
   * 是否启用
   */
  enabled?: boolean;

  /**
   * 插件优先级
   */
  priority?: number;
}
