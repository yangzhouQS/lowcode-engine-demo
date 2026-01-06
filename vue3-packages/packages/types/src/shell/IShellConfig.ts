/**
 * IShellConfig Interface
 * 
 * Shell 配置接口,定义 Shell 的初始化配置
 * 
 * @public
 */
export interface IShellConfig {
  /**
   * 设计器配置
   */
  designer?: any;

  /**
   * 编辑器配置
   */
  editor?: any;

  /**
   * 引擎配置
   */
  engine?: any;

  /**
   * 插件配置
   */
  plugins?: any[];

  /**
   * 国际化配置
   */
  intl?: {
    locale?: string;
    messages?: Record<string, any>;
  };

  /**
   * 快捷键配置
   */
  hotkey?: any;

  /**
   * 事件总线配置
   */
  eventBus?: any;

  /**
   * 命令配置
   */
  command?: any;

  /**
   * 容器配置
   */
  container?: any;

  /**
   * 自定义配置
   */
  [key: string]: any;
}
