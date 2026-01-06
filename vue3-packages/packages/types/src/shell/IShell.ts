/**
 * IShell Interface
 * 
 * Shell API 接口,提供对低代码引擎的统一访问入口
 * 
 * @public
 */
export interface IShell {
  /**
   * Shell 配置
   */
  config: IShellConfig;

  /**
   * Shell 模型
   */
  model: IShellModel;

  /**
   * 初始化 Shell
   * 
   * @param config - Shell 配置
   * @returns Promise<void>
   */
  init(config: IShellConfig): Promise<void>;

  /**
   * 启动 Shell
   * 
   * @returns Promise<void>
   */
  start(): Promise<void>;

  /**
   * 停止 Shell
   * 
   * @returns Promise<void>
   */
  stop(): Promise<void>;

  /**
   * 销毁 Shell
   * 
   * @returns Promise<void>
   */
  dispose(): Promise<void>;

  /**
   * 获取文档模型
   * 
   * @returns 文档模型
   */
  getDocumentModel(): any;

  /**
   * 获取选区
   * 
   * @returns 选区
   */
  getSelection(): any;

  /**
   * 获取历史记录
   * 
   * @returns 历史记录
   */
  getHistory(): any;

  /**
   * 获取项目
   * 
   * @returns 项目
   */
  getProject(): any;

  /**
   * 获取编辑器
   * 
   * @returns 编辑器
   */
  getEditor(): any;

  /**
   * 获取设计器
   * 
   * @returns 设计器
   */
  getDesigner(): any;

  /**
   * 获取引擎
   * 
   * @returns 引擎
   */
  getEngine(): any;

  /**
   * 获取插件管理器
   * 
   * @returns 插件管理器
   */
  getPluginManager(): any;

  /**
   * 获取事件总线
   * 
   * @returns 事件总线
   */
  getEventBus(): any;

  /**
   * 获取命令
   * 
   * @returns 命令
   */
  getCommand(): any;

  /**
   * 获取配置
   * 
   * @returns 配置
   */
  getConfig(): any;

  /**
   * 获取快捷键
   * 
   * @returns 快捷键
   */
  getHotkey(): any;

  /**
   * 获取国际化
   * 
   * @returns 国际化
   */
  getIntl(): any;

  /**
   * 获取容器
   * 
   * @returns 容器
   */
  getContainer(): any;
}
