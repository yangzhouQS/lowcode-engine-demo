/**
 * IShellConfig Interface
 * 
 * Shell 配置接口
 * 
 * @public
 */
export interface IShellConfig {
  /**
   * Shell 名称
   */
  name?: string;

  /**
   * Shell 版本
   */
  version?: string;

  /**
   * 是否启用调试模式
   */
  debug?: boolean;

  /**
   * 设计器配置
   */
  designer?: any;

  /**
   * 编辑器配置
   */
  editor?: any;

  /**
   * 项目配置
   */
  project?: any;

  /**
   * 插件配置
   */
  plugins?: any[];

  /**
   * 自定义配置
   */
  [key: string]: any;
}
