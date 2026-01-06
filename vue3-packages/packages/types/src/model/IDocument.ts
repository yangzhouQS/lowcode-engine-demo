/**
 * IDocument Interface
 *
 * 文档接口,表示一个低代码文档
 *
 * @public
 */
import type { Ref } from 'vue';
import type { INode } from '../node/INode';

export interface IDocument {
  /**
   * 文档 ID
   */
  id: string;

  /**
   * 文档名称
   */
  name: string;

  /**
   * 获取根节点
   *
   * @returns 根节点
   */
  getRootNode(): INode | undefined;

  /**
   * 获取节点
   *
   * @param id - 节点 ID
   * @returns 节点
   */
  getNode(id: string): INode | undefined;

  /**
   * 获取所有节点
   *
   * @returns 节点列表
   */
  getNodes(): INode[];

  /**
   * 检查节点是否存在
   *
   * @param id - 节点 ID
   * @returns 是否存在
   */
  hasNode(id: string): boolean;

  /**
   * 导出 schema
   *
   * @returns schema
   */
  export(): any;

  /**
   * 导入 schema
   *
   * @param schema - schema
   * @returns Promise<void>
   */
  import(schema: any): Promise<void>;

  /**
   * 获取 schema
   *
   * @returns schema
   */
  getSchema(): any;

  /**
   * 设置 schema
   *
   * @param schema - schema
   * @returns Promise<void>
   */
  setSchema(schema: any): Promise<void>;

  /**
   * 获取节点列表的响应式引用
   *
   * @returns 节点列表的响应式引用
   */
  getNodesRef(): Ref<INode[]>;

  /**
   * 获取根节点的响应式引用
   *
   * @returns 根节点的响应式引用
   */
  getRootNodeRef(): Ref<INode | undefined>;

  /**
   * 添加节点
   *
   * @param node - 节点
   * @param parentId - 父节点 ID
   * @returns Promise<void>
   */
  addNode(node: INode, parentId?: string): Promise<void>;

  /**
   * 删除节点
   *
   * @param id - 节点 ID
   * @returns Promise<void>
   */
  removeNode(id: string): Promise<void>;

  /**
   * 注册事件监听器
   *
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  on(event: string, listener: (...args: any[]) => void): void;

  /**
   * 移除事件监听器
   *
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  off(event: string, listener: (...args: any[]) => void): void;

  /**
   * 清除所有监听器
   */
  clearListeners(): void;
}
