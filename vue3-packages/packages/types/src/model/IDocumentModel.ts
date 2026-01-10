/**
 * IDocumentModel Interface
 *
 * 文档模型接口,管理多个文档
 *
 * @public
 */
import type { Ref } from 'vue';
import type { IDocument } from './IDocument';

export interface IDocumentModel {
  /**
   * 获取文档
   *
   * @param id - 文档 ID
   * @returns 文档
   */
  getDocument(id: string): IDocument | undefined;

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
   * 创建文档
   *
   * @param schema - 文档 schema
   * @returns Promise<IDocument>
   */
  createDocument(schema: any): Promise<IDocument>;

  /**
   * 删除文档
   *
   * @param id - 文档 ID
   * @returns Promise<void>
   */
  deleteDocument(id: string): Promise<void>;

  /**
   * 获取当前文档
   *
   * @returns 当前文档
   */
  getCurrentDocument(): IDocument | undefined;

  /**
   * 设置当前文档
   *
   * @param document - 文档
   * @returns Promise<void>
   */
  setCurrentDocument(document: IDocument): Promise<void>;

  /**
   * 获取所有文档
   *
   * @returns 文档列表
   */
  getDocuments(): IDocument[];

  /**
   * 检查文档是否存在
   *
   * @param id - 文档 ID
   * @returns 是否存在
   */
  hasDocument(id: string): boolean;

  /**
   * 获取文档列表的响应式引用
   *
   * @returns 文档列表的响应式引用
   */
  getDocumentsRef(): Ref<IDocument[]>;

  /**
   * 获取当前文档的响应式引用
   *
   * @returns 当前文档的响应式引用
   */
  getCurrentDocumentRef(): Ref<IDocument | undefined>;
}
