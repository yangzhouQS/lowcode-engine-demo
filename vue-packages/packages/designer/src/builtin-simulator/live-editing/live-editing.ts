import { obx, computed, makeObservable, action, reaction, runInAction } from '@alilc/lowcode-editor-core';
import { IPublicTypeLiveTextEditingConfig } from '@alilc/lowcode-types';
import { createModuleEventBus, IEventBus } from '@alilc/lowcode-utils';
import { Logger } from '@alilc/lowcode-utils';

const logger = new Logger({ level: 'warn', prefix: '[LiveEditing]' });

export interface LiveEditingConfig {
  /**
   * 是否启用实时编辑
   */
  enabled?: boolean;
  
  /**
   * 实时编辑配置
   */
  config?: IPublicTypeLiveTextEditingConfig;
  
  /**
   * 是否自动保存
   */
  autoSave?: boolean;
  
  /**
   * 自动保存延迟（毫秒）
   */
  autoSaveDelay?: number;
}

export class LiveEditing {
  private emitter: IEventBus = createModuleEventBus('LiveEditing');

  private _disposed = false;

  @obx.ref private _enabled = false;

  @obx.ref private _autoSave = false;

  @obx.ref private _autoSaveDelay = 1000;

  @obx.ref private _config: IPublicTypeLiveTextEditingConfig | null = null;

  private _autoSaveTimer: any = null;

  private _currentEditingElement: HTMLElement | null = null;

  private _currentEditingNode: any = null;

  constructor(props: LiveEditingConfig = {}) {
    makeObservable(this);
    
    this._enabled = props.enabled ?? false;
    this._autoSave = props.autoSave ?? false;
    this._autoSaveDelay = props.autoSaveDelay ?? 1000;
    this._config = props.config || null;

    this.setupReactions();
  }

  private setupReactions() {
    this.disposers.push(
      reaction(
        () => this.enabled,
        (enabled) => {
          this.emitter.emit('enabledChange', enabled);
          if (!enabled) {
            this.stopEditing();
          }
        }
      ),
      reaction(
        () => this.autoSave,
        (autoSave) => {
          this.emitter.emit('autoSaveChange', autoSave);
        }
      )
    );
  }

  private disposers: Array<() => void> = [];

  @computed get enabled(): boolean {
    return this._enabled;
  }

  @computed get autoSave(): boolean {
    return this._autoSave;
  }

  @computed get autoSaveDelay(): number {
    return this._autoSaveDelay;
  }

  @computed get config(): IPublicTypeLiveTextEditingConfig | null {
    return this._config;
  }

  @computed get isEditing(): boolean {
    return this._currentEditingElement !== null;
  }

  @computed get currentEditingElement(): HTMLElement | null {
    return this._currentEditingElement;
  }

  @computed get currentEditingNode(): any {
    return this._currentEditingNode;
  }

  @action setEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }

  @action setAutoSave(autoSave: boolean): void {
    this._autoSave = autoSave;
  }

  @action setAutoSaveDelay(delay: number): void {
    this._autoSaveDelay = delay;
  }

  @action setConfig(config: IPublicTypeLiveTextEditingConfig | null): void {
    this._config = config;
  }

  /**
   * 开始编辑
   */
  @action startEditing(element: HTMLElement, node: any): void {
    if (!this._enabled) {
      logger.warn('Live editing is not enabled');
      return;
    }

    this._currentEditingElement = element;
    this._currentEditingNode = node;

    this.emitter.emit('startEditing', { element, node });
  }

  /**
   * 停止编辑
   */
  @action stopEditing(): void {
    if (this._currentEditingElement) {
      this.emitter.emit('stopEditing', {
        element: this._currentEditingElement,
        node: this._currentEditingNode,
      });
    }

    this._currentEditingElement = null;
    this._currentEditingNode = null;

    if (this._autoSaveTimer) {
      clearTimeout(this._autoSaveTimer);
      this._autoSaveTimer = null;
    }
  }

  /**
   * 更新内容
   */
  @action updateContent(content: string): void {
    if (!this._currentEditingElement || !this._currentEditingNode) {
      logger.warn('No editing element or node');
      return;
    }

    this.emitter.emit('contentChange', {
      element: this._currentEditingElement,
      node: this._currentEditingNode,
      content,
    });

    // 自动保存
    if (this._autoSave) {
      this.scheduleAutoSave();
    }
  }

  /**
   * 调度自动保存
   */
  private scheduleAutoSave(): void {
    if (this._autoSaveTimer) {
      clearTimeout(this._autoSaveTimer);
    }

    this._autoSaveTimer = setTimeout(() => {
      this.emitter.emit('autoSave', {
        element: this._currentEditingElement,
        node: this._currentEditingNode,
      });
      this._autoSaveTimer = null;
    }, this._autoSaveDelay);
  }

  /**
   * 取消自动保存
   */
  @action cancelAutoSave(): void {
    if (this._autoSaveTimer) {
      clearTimeout(this._autoSaveTimer);
      this._autoSaveTimer = null;
    }
  }

  /**
   * 订阅事件
   */
  on(event: string, handler: (...args: any[]) => void): () => void {
    this.emitter.on(event, handler);
    return () => {
      this.emitter.off(event, handler);
    };
  }

  /**
   * 取消订阅事件
   */
  off(event: string, handler: (...args: any[]) => void): void {
    this.emitter.off(event, handler);
  }

  /**
   * 销毁
   */
  dispose(): void {
    if (this._disposed) {
      return;
    }
    this._disposed = true;
    this.stopEditing();
    this.disposers.forEach(disposer => disposer());
    this.disposers = [];
    this.emitter.removeAllListeners();
  }

  /**
   * 是否已销毁
   */
  get isDisposed(): boolean {
    return this._disposed;
  }
}

export default LiveEditing;
