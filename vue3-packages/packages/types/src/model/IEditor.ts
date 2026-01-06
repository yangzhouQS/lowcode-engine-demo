/**
 * IEditor Interface
 * 
 * 编辑器接口,提供编辑器核心功能
 * 
 * @public
 */
export interface IEditor {
  /**
   * 编辑器 ID
   */
  id: string;

  /**
   * 编辑器名称
   */
  name: string;

  /**
   * 编辑器版本
   */
  version: string;

  /**
   * 初始化编辑器
   * 
   * @param config - 编辑器配置
   * @returns Promise<void>
   */
  init(config: any): Promise<void>;

  /**
   * 启动编辑器
   * 
   * @returns Promise<void>
   */
  start(): Promise<void>;

  /**
   * 停止编辑器
   * 
   * @returns Promise<void>
   */
  stop(): Promise<void>;

  /**
   * 销毁编辑器
   * 
   * @returns Promise<void>
   */
  dispose(): Promise<void>;

  /**
   * 获取设计器
   * 
   * @returns 设计器
   */
  getDesigner(): any;

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

  /**
   * 获取 Setter 注册器
   * 
   * @returns Setter 注册器
   */
  getSetterRegistry(): any;
}
