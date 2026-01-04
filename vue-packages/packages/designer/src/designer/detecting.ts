import type { INode } from '@vue3-engine/document-model';

export interface DetectingChangeEvent {
  node: INode | null;
}

export class Detecting {
  private _enable = true;
  private _current: INode | null = null;
  private changeHandlers: Set<(e: DetectingChangeEvent) => void> = new Set();

  get enable(): boolean {
    return this._enable;
  }

  set enable(value: boolean) {
    if (this._enable !== value) {
      this._enable = value;
      if (!value) {
        this._current = null;
      }
    }
  }

  get current(): INode | null {
    return this._current;
  }

  set current(node: INode | null) {
    if (this._enable && this._current !== node) {
      this._current = node;
      this.emitChange();
    }
  }

  onChange(handler: (e: DetectingChangeEvent) => void): () => void {
    this.changeHandlers.add(handler);
    return () => this.changeHandlers.delete(handler);
  }

  private emitChange() {
    this.changeHandlers.forEach((handler) => {
      handler({ node: this._current });
    });
  }

  capture(node: INode) {
    if (this._enable) {
      this.current = node;
    }
  }

  release(node?: INode) {
    if (this._enable && (!node || this._current === node)) {
      this.current = null;
    }
  }

  leave(node: INode) {
    if (this._enable && this._current === node) {
      this.current = null;
    }
  }

  hover(node: INode) {
    if (this._enable) {
      this.current = node;
    }
  }

  clear() {
    this._current = null;
  }
}
