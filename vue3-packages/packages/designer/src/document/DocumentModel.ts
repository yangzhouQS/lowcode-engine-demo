import { ref, computed } from 'vue';
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

  getDocument(id: string): IDocument | undefined {
    return this.documents.get(id);
  }

  async createDocument(schema: any): Promise<IDocument> {
    const id = this.generateId();
    const document = new Document(id, schema);
    this.documents.set(id, document);
    this.eventBus.emit('document:create', { document });
    return document;
  }

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

  getCurrentDocument(): IDocument | undefined {
    if (!this.currentDocumentId.value) {
      return undefined;
    }
    return this.documents.get(this.currentDocumentId.value);
  }

  async setCurrentDocument(document: IDocument): Promise<void> {
    this.currentDocumentId.value = document.id;
    this.eventBus.emit('document:change', { document });
  }

  getDocuments(): IDocument[] {
    return Array.from(this.documents.values());
  }

  hasDocument(id: string): boolean {
    return this.documents.has(id);
  }

  getDocumentsRef(): Ref<IDocument[]> {
    return this.documentsRef;
  }

  getCurrentDocumentRef(): Ref<IDocument | undefined> {
    return this.currentDocumentRef;
  }

  private generateId(): string {
    return `document_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  on(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.on(event, listener);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.off(event, listener);
  }

  clearListeners(): void {
    this.eventBus.clear();
  }

  exportState(): any {
    return {
      documents: Array.from(this.documents.entries()).map(([id, doc]) => ({
        id,
        schema: doc.export(),
      })),
      currentDocumentId: this.currentDocumentId.value,
    };
  }

  async importState(state: any): Promise<void> {
    this.documents.clear();
    for (const { id, schema } of state.documents) {
      const document = new Document(id, schema);
      this.documents.set(id, document);
    }
    this.currentDocumentId.value = state.currentDocumentId;
    this.eventBus.emit('document:import', { state });
  }

  export(): any {
    return this.exportState();
  }

  async import(state: any): Promise<void> {
    return this.importState(state);
  }
}
