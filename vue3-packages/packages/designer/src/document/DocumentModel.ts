/**
 * DocumentModel
 * 
 * 文档模型类,管理多个文档
 * 
 * @public
 */
import { ref, reactive, computed } from 'vue';
import type { Ref } from 'vue';
import type { IDocumentModel } from '@vue3-lowcode/types';
import type { IDocument } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';
import { Document } from './Document';

export class DocumentModel implements IDocumentModel {
  private documents: Map<string, IDocument>;
  private currentDocumentId: Ref<string | null>;
  private documentsRef: Ref<IDocument[]>;
  private currentDocumentRef: Ref<IDocument | undefined>;
  private eventBus: ReturnType<typeof useEventBus>;

  constructor() {
    this.documents = new Map();
    this.currentDocumentId = ref<string | null>(null);
    this.documentsRef = computed(() => Array.from(this.documents.values())) as Ref<IDocument[]>;
    this.currentDocumentRef = computed(() => {
      if (!this.currentDocumentId.value) {
        return undefined;
      }
      return this.documents.get(this.currentDocumentId.value);
    }) as Ref<IDocument | undefined>;
    this.eventBus = useEventBus();
  }

  /**
   * 获取文档
   * 
   * @param id - 文档 ID
   * @returns 文档
   */
  getDocument(id: string): IDocument | undefined {
    return this.documents.get(id);
  }

  /**
   * 创建文档
   * 
   * @param schema - 文档 schema
   * @returns Promise<IDocument>
   */
  async createDocument(schema: any): Promise<IDocument> {
    const id = this.generateId();
    const document = new Document(id, schema);
    this.documents.set(id, document);
    this.eventBus.emit('document:create', { document });
    return document;
  }

  /**
   * 删除文档
   * 
   * @param id - 文档 ID
   * @returns Promise<void>
   */
  async deleteDocument(id: string): Promise<void> {
    const document = this.documents.get(id);
    if (document) {
      this.documents.delete(id);
      if (this.currentDocumentId.value === id) {
        this.currentDocumentId.value = null;
      }
      this.eventBus.emit('document:delete', { document });
    }
  }

  /**
   * 获取当前文档
   * 
   * @returns 当前文档
   */
  getCurrentDocument(): IDocument | undefined {
    if (!this.currentDocumentId.value) {
      return undefined;
    }
    return this.documents.get(this.currentDocumentId.value);
  }

  /**
   * 设置当前文档
   * 
   * @param document - 文档
   * @returns Promise<void>
   */
  async setCurrentDocument(document: IDocument): Promise<void> {
    this.currentDocumentId.value = document.id;
    this.eventBus.emit('document:change', { document });
  }

  /**
   * 获取所有文档
   * 
   * @returns 文档列表
   */
  getDocuments(): IDocument[] {
    return Array.from(this.documents.values());
  }

  /**
   * 检查文档是否存在
   * 
   * @param id - 文档 ID
   * @returns 是否存在
   */
  hasDocument(id: string): boolean {
    return this.documents.has(id);
  }

  /**
   * 获取文档列表的响应式引用
   * 
   * @returns 文档列表的响应式引用
   */
  getDocumentsRef(): Ref<IDocument[]> {
    return this.documentsRef;
  }

  /**
   * 获取当前文档的响应式引用
   * 
   * @returns 当前文档的响应式引用
   */
  getCurrentDocumentRef(): Ref<IDocument | undefined> {
    return this.currentDocumentRef;
  }

  /**
   * 生成唯一 ID
   * 
   * @returns 唯一 ID
   */
  private generateId(): string {
    return `document_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 注册事件监听器
   * 
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  on(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.on(event, listener);
  }

  /**
   * 移除事件监听器
   * 
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  off(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.off(event, listener);
  }

  /**
   * 清除所有监听器
   */
  clearListeners(): void {
    this.eventBus.clear();
  }

  /**
   * 导出文档模型状态
   * 
   * @returns 文档模型状态
   */
  export(): any {
    return {
      documents: Array.from(this.documents.entries()).map(([id, doc]) => ({
        id,
        schema: doc.export(),
      })),
      currentDocumentId: this.currentDocumentId.value,
    };
  }

  /**
   * 导入文档模型状态
   * 
   * @param state - 文档模型状态
   */
  async import(state: any): Promise<void> {
    this.documents.clear();
    for (const { id, schema } of state.documents) {
      const document = new Document(id, schema);
      this.documents.set(id, document);
    }
    this.currentDocumentId.value = state.currentDocumentId;
    this.eventBus.emit('document:import', { state });
  }
}
