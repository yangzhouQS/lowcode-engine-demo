import { ref, reactive, computed, type Ref } from 'vue';
import { useEventBus } from '@vue3-lowcode/utils';
import type { IWorkspace } from './Workspace';

/**
 * EditorWindow 接口定义
 */
export interface IEditorWindow {
  /**
   * 获取窗口 ID
   */
  get id(): string;

  /**
   * 获取窗口标题
   */
  get title(): string;

  /**
   * 设置窗口标题
   */
  set title(value: string);

  /**
   * 获取工作区
   */
  get workspace(): IWorkspace;

  /**
   * 获取是否激活
   */
  get active(): boolean;

  /**
   * 设置是否激活
   */
  set active(value: boolean);

  /**
   * 获取是否最小化
   */
  get minimized(): boolean;

  /**
   * 设置是否最小化
   */
  set minimized(value: boolean);

  /**
   * 获取是否最大化
   */
  get maximized(): boolean;

  /**
   * 设置是否最大化
   */
  set maximized(value: boolean);

  /**
   * 获取窗口位置
   */
  get position(): { x: number; y: number };

  /**
   * 设置窗口位置
   */
  set position(value: { x: number; y: number });

  /**
   * 获取窗口大小
   */
  get size(): { width: number; height: number };

  /**
   * 设置窗口大小
   */
  set size(value: { width: number; height: number });

  /**
   * 激活窗口
   */
  activate(): void;

  /**
   * 最小化窗口
   */
  minimize(): void;

  /**
   * 最大化窗口
   */
  maximize(): void;

  /**
   * 恢复窗口
   */
  restore(): void;

  /**
   * 关闭窗口
   */
  close(): void;

  /**
   * 销毁窗口
   */
  destroy(): void;

  /**
   * 监听窗口激活
   */
  onActivate(fn: () => void): () => void;

  /**
   * 监听窗口关闭
   */
  onClose(fn: () => void): () => void;

  /**
   * 监听窗口状态变化
   */
  onStateChange(fn: (state: any) => void): () => void;
}

/**
 * EditorWindow 类实现
 */
export class EditorWindow implements IEditorWindow {
  private eventBus = useEventBus();

  /**
   * 窗口 ID
   */
  private _id: string;

  /**
   * 窗口标题
   */
  private _title: Ref<string>;

  /**
   * 工作区
   */
  private _workspace: IWorkspace;

  /**
   * 是否激活
   */
  private _active: Ref<boolean> = ref(false);

  /**
   * 是否最小化
   */
  private _minimized: Ref<boolean> = ref(false);

  /**
   * 是否最大化
   */
  private _maximized: Ref<boolean> = ref(false);

  /**
   * 窗口位置
   */
  private _position: Ref<{ x: number; y: number }> = ref({ x: 0, y: 0 });

  /**
   * 窗口大小
   */
  private _size: Ref<{ width: number; height: number }> = ref({ width: 800, height: 600 });

  /**
   * 之前的状态（用于恢复）
   */
  private _previousState: {
    minimized: boolean;
    maximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
  } | null = null;

  /**
   * 是否已销毁
   */
  private _destroyed: Ref<boolean> = ref(false);

  constructor(workspace: IWorkspace, id: string, title: string) {
    this._workspace = workspace;
    this._id = id;
    this._title = ref(title);
  }

  /**
   * 获取窗口 ID
   */
  get id(): string {
    return this._id;
  }

  /**
   * 获取窗口标题
   */
  get title(): string {
    return this._title.value;
  }

  /**
   * 设置窗口标题
   */
  set title(value: string) {
    this._title.value = value;
    this.eventBus.emit('state-change', { title: value });
  }

  /**
   * 获取工作区
   */
  get workspace(): IWorkspace {
    return this._workspace;
  }

  /**
   * 获取是否激活
   */
  get active(): boolean {
    return this._active.value;
  }

  /**
   * 设置是否激活
   */
  set active(value: boolean) {
    if (this._active.value === value) {
      return;
    }

    this._active.value = value;
    this.eventBus.emit('state-change', { active: value });

    if (value) {
      this.eventBus.emit('activate');
    }
  }

  /**
   * 获取是否最小化
   */
  get minimized(): boolean {
    return this._minimized.value;
  }

  /**
   * 设置是否最小化
   */
  set minimized(value: boolean) {
    if (this._minimized.value === value) {
      return;
    }

    this._minimized.value = value;
    this.eventBus.emit('state-change', { minimized: value });
  }

  /**
   * 获取是否最大化
   */
  get maximized(): boolean {
    return this._maximized.value;
  }

  /**
   * 设置是否最大化
   */
  set maximized(value: boolean) {
    if (this._maximized.value === value) {
      return;
    }

    this._maximized.value = value;
    this.eventBus.emit('state-change', { maximized: value });
  }

  /**
   * 获取窗口位置
   */
  get position(): { x: number; y: number } {
    return this._position.value;
  }

  /**
   * 设置窗口位置
   */
  set position(value: { x: number; y: number }) {
    this._position.value = value;
    this.eventBus.emit('state-change', { position: value });
  }

  /**
   * 获取窗口大小
   */
  get size(): { width: number; height: number } {
    return this._size.value;
  }

  /**
   * 设置窗口大小
   */
  set size(value: { width: number; height: number }) {
    this._size.value = value;
    this.eventBus.emit('state-change', { size: value });
  }

  /**
   * 是否已销毁
   */
  get destroyed(): boolean {
    return this._destroyed.value;
  }

  /**
   * 激活窗口
   */
  activate(): void {
    if (this._destroyed.value) {
      return;
    }

    this.active = true;
  }

  /**
   * 最小化窗口
   */
  minimize(): void {
    if (this._destroyed.value) {
      return;
    }

    // 保存当前状态
    if (!this._previousState) {
      this._previousState = {
        minimized: this._minimized.value,
        maximized: this._maximized.value,
        position: { ...this._position.value },
        size: { ...this._size.value },
      };
    }

    this.minimized = true;
    this.active = false;
  }

  /**
   * 最大化窗口
   */
  maximize(): void {
    if (this._destroyed.value) {
      return;
    }

    // 保存当前状态
    if (!this._previousState) {
      this._previousState = {
        minimized: this._minimized.value,
        maximized: this._maximized.value,
        position: { ...this._position.value },
        size: { ...this._size.value },
      };
    }

    this.maximized = true;
    this.minimized = false;
  }

  /**
   * 恢复窗口
   */
  restore(): void {
    if (this._destroyed.value) {
      return;
    }

    if (this._previousState) {
      this.minimized = this._previousState.minimized;
      this.maximized = this._previousState.maximized;
      this.position = this._previousState.position;
      this.size = this._previousState.size;
      this._previousState = null;
    } else {
      this.minimized = false;
      this.maximized = false;
    }

    this.active = true;
  }

  /**
   * 关闭窗口
   */
  close(): void {
    if (this._destroyed.value) {
      return;
    }

    this.eventBus.emit('close');
    this.destroy();
  }

  /**
   * 销毁窗口
   */
  destroy(): void {
    if (this._destroyed.value) {
      return;
    }

    this._destroyed.value = true;
    this.eventBus.emit('destroy');
    this.eventBus.clear();
  }

  /**
   * 监听窗口激活
   */
  onActivate(fn: () => void): () => void {
    if (this._active.value) {
      fn();
      return () => {};
    }
    this.eventBus.on('activate', fn);
    return () => {
      this.eventBus.off('activate', fn);
    };
  }

  /**
   * 监听窗口关闭
   */
  onClose(fn: () => void): () => void {
    this.eventBus.on('close', fn);
    return () => {
      this.eventBus.off('close', fn);
    };
  }

  /**
   * 监听窗口状态变化
   */
  onStateChange(fn: (state: any) => void): () => void {
    this.eventBus.on('state-change', fn);
    return () => {
      this.eventBus.off('state-change', fn);
    };
  }

  /**
   * 监听窗口销毁
   */
  onDestroy(fn: () => void): () => void {
    this.eventBus.on('destroy', fn);
    return () => {
      this.eventBus.off('destroy', fn);
    };
  }
}
