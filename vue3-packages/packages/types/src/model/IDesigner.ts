/**
 * IDesigner Interface
 * 
 * 设计器接口,提供设计器核心功能
 * 
 * @public
 */
export interface IDesigner {
  /**
   * 设计器 ID
   */
  id: string;

  /**
   * 设计器名称
   */
  name: string;

  /**
   * 设计器版本
   */
  version: string;

  /**
   * 初始化设计器
   * 
   * @param config - 设计器配置
   * @returns Promise<void>
   */
  init(config: any): Promise<void>;

  /**
   * 启动设计器
   * 
   * @returns Promise<void>
   */
  start(): Promise<void>;

  /**
   * 停止设计器
   * 
   * @returns Promise<void>
   */
  stop(): Promise<void>;

  /**
   * 销毁设计器
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
   * 获取 Dragon
   * 
   * @returns Dragon
   */
  getDragon(): any;

  /**
   * 获取模拟器
   * 
   * @returns 模拟器
   */
  getSimulator(): any;
}
