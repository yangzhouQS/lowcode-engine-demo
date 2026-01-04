export interface OffsetObserverOptions {
  node: any;
  offsetObserver?: any;
}

export class OffsetObserver {
  private node: any;
  private offsetObserver: any;
  private _offset: { left: number; top: number } | null = null;
  private _purged = false;

  constructor(options: OffsetObserverOptions) {
    this.node = options.node;
    this.offsetObserver = options.offsetObserver;
  }

  compute(): { left: number; top: number } | null {
    if (this._purged) {
      return null;
    }

    try {
      const rect = this.node.getBoundingClientRect();
      this._offset = {
        left: rect.left,
        top: rect.top,
      };
      return this._offset;
    } catch (e) {
      console.warn('Failed to compute offset:', e);
      return null;
    }
  }

  get offset(): { left: number; top: number } | null {
    return this._offset;
  }

  isPurged(): boolean {
    return this._purged;
  }

  purge() {
    this._purged = true;
    this._offset = null;
  }
}

export function createOffsetObserver(nodeInstance: any): OffsetObserver | null {
  if (!nodeInstance || !nodeInstance.node) {
    return null;
  }

  try {
    return new OffsetObserver({
      node: nodeInstance.node,
      offsetObserver: nodeInstance,
    });
  } catch (e) {
    console.warn('Failed to create offset observer:', e);
    return null;
  }
}
