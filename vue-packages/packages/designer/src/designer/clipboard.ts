import type { INode } from '@vue3-engine/document-model';

export interface ClipboardData {
  type: 'nodes' | 'schema';
  data: INode[] | any[];
}

export class Clipboard {
  private data: ClipboardData | null = null;
  private changeHandlers: Set<(data: ClipboardData | null) => void> = new Set();

  setData(data: ClipboardData): void {
    this.data = data;
    this.emitChange();
  }

  getData(): ClipboardData | null {
    return this.data;
  }

  clear(): void {
    this.data = null;
    this.emitChange();
  }

  isEmpty(): boolean {
    return this.data === null;
  }

  onChange(handler: (data: ClipboardData | null) => void): () => void {
    this.changeHandlers.add(handler);
    return () => this.changeHandlers.delete(handler);
  }

  private emitChange() {
    this.changeHandlers.forEach((handler) => {
      handler(this.data);
    });
  }
}
