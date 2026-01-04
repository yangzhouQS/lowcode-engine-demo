import { obx, computed, makeObservable, action, reaction, runInAction } from '@alilc/lowcode-editor-core';
import { IPublicTypeLiveTextEditingConfig } from '@alilc/lowcode-types';
import { createModuleEventBus, IEventBus, Logger } from '@alilc/lowcode-utils';
import { LiveEditing, LiveEditingConfig } from './live-editing';

const logger = new Logger({ level: 'warn', prefix: '[LiveEditingManager]' });

export interface LiveEditingManagerConfig {
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

export class LiveEditingManager {
  private emitter: IEventBus = createModuleEventBus('LiveEditingManager');

  private _disposed = false;

  @obx.ref private _liveEditing: LiveEditing | null = null;

  @obx.ref private _enabled = false;

  @obx.ref private _config: IPublicTypeLiveTextEditingConfig | null = null;

  @obx.ref private _autoSave = false;

  @obx.ref private _autoSaveDelay = 1000;

  constructor(props: LiveEditingManagerConfig = {}) {
    makeObservable(this);
    
    this._enabled = props.enabled ?? false;
    this._config = props.config || null;
    this._autoSave = props.autoSave ?? false;
    this._autoSaveDelay = props.autoSaveDelay ?? 1000;

    this.setupReactions();
  }

  private setupReactions() {
    this.disposers.push(
      reaction(
        () => this.enabled,
        (enabled) => {
          this.emitter.emit('enabledChange', enabled);
          if (enabled && !this._liveEditing) {
            this.createLiveEditing();
          } else if (!enabled && this._liveEditing) {
            this.destroyLiveEditing();
          }
        }
      ),
      reaction(
        () => this.config,
        (config) => {
          this.emitter.emit('configChange', config);
          if (this._liveEditing) {
            this._liveEditing.setConfig(config);
          }
        }
      ),
      reaction(
        () => this.autoSave,
        (autoSave) => {
          this.emitter.emit('autoSaveChange', autoSave);
          if (this._liveEditing) {
            this._liveEditing.setAutoSave(autoSave);
          }
        }
      ),
      reaction(
        () => this.autoSaveDelay,
        (delay) => {
          this.emitter.emit('autoSaveDelayChange', delay);
          if (this._liveEditing) {
            this._liveEditing.setAutoSaveDelay(delay);
          }
        }
      )
    );
  }

  private disposers: Array<() => void> = [];

  @computed get enabled(): boolean {
    return this._enabled;
  }

  @computed get config(): IPublicTypeLiveTextEditingConfig | null {
    return this._config;
  }

  @computed get autoSave(): boolean {
    return this._autoSave;
  }

  @computed get autoSaveDelay(): number {
    return this._autoSaveDelay;
  }

  @computed get liveEditing(): LiveEditing | null {
    return this._liveEditing;
  }

  @computed get isEditing(): boolean {
    return this._liveEditing?.isEditing ?? false;
  }

  @computed get currentEditingElement(): HTMLElement | null {
    return this._liveEditing?.currentEditingElement ?? null;
  }

  @computed get currentEditingNode(): any {
    return this._liveEditing?.currentEditingNode ?? null;
  }

  @action setEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }

  @action setConfig(config: IPublicTypeLiveTextEditingConfig | null): void {
    this._config = config;
  }

  @action setAutoSave(autoSave: boolean): void {
    this._autoSave = autoSave;
  }

  @action setAutoSaveDelay(delay: number): void {
    this._autoSaveDelay = delay;
  }

  /**
   * 创建实时编辑实例
   */
  private createLiveEditing(): void {
    if (this._liveEditing) {
      return;
    }

    this._liveEditing = new LiveEditing({
      enabled: true,
      config: this._config,
      autoSave: this._autoSave,
      autoSaveDelay: this._autoSaveDelay,
    });

    // 转发事件
    this._liveEditing.on('startEditing', (data) => {
      this.emitter.emit('startEditing', data);
    });

    this._liveEditing.on('stopEditing', (data) => {
      this.emitter.emit('stopEditing', data);
    });

    this._liveEditing.on('contentChange', (data) => {
      this.emitter.emit('contentChange', data);
    });

    this._liveEditing.on('autoSave', (data) => {
      this.emitter.emit('autoSave', data);
    });

    this.emitter.emit('liveEditingCreated', this._liveEditing);
  }

  /**
   * 销毁实时编辑实例
   */
  private destroyLiveEditing(): void {
    if (!this._liveEditing) {
      return;
    }

    this._liveEditing.dispose();
    this._liveEditing = null;

    this.emitter.emit('liveEditingDestroyed');
  }

  /**
   * 开始编辑
   */
  @action startEditing(element: HTMLElement, node: any): void {
    if (!this._liveEditing) {
      logger.warn('LiveEditing is not created');
      return;
    }

    this._liveEditing.startEditing(element, node);
  }

  /**
   * 停止编辑
   */
  @action stopEditing(): void {
    if (!this._liveEditing) {
      return;
    }

    this._liveEditing.stopEditing();
  }

  /**
   * 更新内容
   */
  @action updateContent(content: string): void {
    if (!this._liveEditing) {
      logger.warn('LiveEditing is not created');
      return;
    }

    this._liveEditing.updateContent(content);
  }

  /**
   * 取消自动保存
   */
  @action cancelAutoSave(): void {
    if (!this._liveEditing) {
      return;
    }

    this._liveEditing.cancelAutoSave();
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
    this.destroyLiveEditing();
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

export default LiveEditingManager;
