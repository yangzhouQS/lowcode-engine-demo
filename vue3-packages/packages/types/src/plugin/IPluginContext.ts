/**
 * IPluginContext Interface
 * 
 * 插件上下文接口,提供插件可用的API和上下文
 * 
 * @public
 */
export interface IPluginContext {
  /**
   * 编辑器
   */
  editor: any;

  /**
   * 设计器
   */
  designer: any;

  /**
   * 引擎
   */
  engine: any;

  /**
   * 插件管理器
   */
  pluginManager: any;

  /**
   * 事件总线
   */
  eventBus: any;

  /**
   * 命令
   */
  command: any;

  /**
   * 配置
   */
  config: any;

  /**
   * 快捷键
   */
  hotkey: any;

  /**
   * 国际化
   */
  intl: any;

  /**
   * 容器
   */
  container: any;

  /**
   * 文档模型
   */
  documentModel: any;

  /**
   * 选区
   */
  selection: any;

  /**
   * 历史记录
   */
  history: any;

  /**
   * 项目
   */
  project: any;
}
