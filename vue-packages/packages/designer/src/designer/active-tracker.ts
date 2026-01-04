import type { INode } from '@vue3-engine/document-model';

export interface ActiveTrackerChangeEvent {
  node: INode | null;
  detail?: any;
}

export interface IActiveTracker {
  onChange(handler: (e: ActiveTrackerChangeEvent) => void): () => void;
  track(node: INode | { node: INode; detail?: any }): void;
  clear(): void;
  get current(): INode | null;
}

export class ActiveTracker implements IActiveTracker {
  private _current: INode | null = null;
  private changeHandlers: Set<(e: ActiveTrackerChangeEvent) => void> = new Set();

  get current(): INode | null {
    return this._current;
  }

  onChange(handler: (e: ActiveTrackerChangeEvent) => void): () => void {
    this.changeHandlers.add(handler);
    return () => this.changeHandlers.delete(handler);
  }

  track(node: INode | { node: INode; detail?: any }) {
    const targetNode = typeof node === 'object' && 'node' in node ? node.node : node;
    const detail = typeof node === 'object' && 'detail' in node ? node.detail : undefined;

    if (this._current !== targetNode) {
      this._current = targetNode;
      this.emitChange({ node: this._current, detail });
    }
  }

  clear() {
    if (this._current !== null) {
      this._current = null;
      this.emitChange({ node: null });
    }
  }

  private emitChange(event: ActiveTrackerChangeEvent) {
    this.changeHandlers.forEach((handler) => {
      handler(event);
    });
  }
}
