import { ref, reactive, computed, type Ref } from 'vue';
import { useEventBus } from '@vue3-lowcode/utils';
import type { IWorkspace } from './Workspace';
import type { IEditorWindow } from './EditorWindow';
import type { IContext } from './Context';

/**
 * Workbench 接口定义
 */
export interface IWorkbench {
  /**
   * 获取工作台 ID
   */
  get id(): string;

  /**
   * 获取工作台名称
   */
  get name(): string;

  /**
   * 设置工作台名称
   */
  set name(value: string);

  /**
   * 获取工作区
   */
  get workspace(): IWorkspace;

  /**
   * 获取当前窗口
   */
  get currentWindow(): IEditorWindow | null;

  /**
   * 获取所有窗口
   */
  get windows(): IEditorWindow[];

  /**
   * 获取当前上下文
   */
  get currentContext(): IContext | null;

  /**
   * 获取所有上下文
   */
  get contexts(): IContext[];

  /**
   * 获取是否激活
   */
  get active(): boolean;

  /**
   * 设置是否激活
   */
  set active(value: boolean);

  /**
   * 创建窗口
   */
  createWindow(id: string, title: string): IEditorWindow;

  /**
   * 打开窗口
   */
  openWindow(window: IEditorWindow): void;

  /**
   * 关闭窗口
   */
  closeWindow(window: IEditorWindow): void;

  /**
   * 激活窗口
   */
  activateWindow(window: IEditorWindow): void;

  /**
   * 获取窗口
   */
  getWindow(id: string): IEditorWindow | null;

  /**
   * 创建上下文
   */
  createContext(id: string, name: string, type?: string, scope?: string): IContext;

  /**
   * 添加上下文
   */
  addContext(context: IContext): void;

  /**
   * 移除上下文
   */
  removeContext(context: IContext): void;

  /**
   * 激活上下文
   */
  activateContext(context: IContext): void;

  /**
   * 获取上下文
   */
  getContext(id: string): IContext | null;

  /**
   * 激活工作台
   */
  activate(): void;

  /**
   * 停用工作台
   */
  deactivate(): void;

  /**
   * 销毁工作台
   */
  destroy(): void;

  /**
   * 监听工作台激活
   */
  onActivate(fn: () => void): () => void;

  /**
   * 监听工作台停用
   */
  onDeactivate(fn: () => void): () => void;

  /**
   * 监听窗口变化
   */
  onWindowChange(fn: (windows: IEditorWindow[]) => void): () => void;

  /**
   * 监听上下文变化
   */
  onContextChange(fn: (contexts: IContext[]) => void): () => void;

  /**
   * 监听当前窗口变化
   */
  onCurrentWindowChange(fn: (window: IEditorWindow | null) => void): () => void;

  /**
   * 监听当前上下文变化
   */
  onCurrentContextChange(fn: (context: IContext | null) => void): () => void;
}

/**
 * Workbench 类实现
 */
export class Workbench implements IWorkbench {
  private eventBus = useEventBus();

  /**
   * 工作台 ID
   */
  private _id: string;

  /**
   * 工作台名称
   */
  private _name: Ref<string>;

  /**
   * 工作区
   */
  private _workspace: IWorkspace;

  /**
   * 窗口列表
   */
  private _windows: Ref<IEditorWindow[]> = ref([]);

  /**
   * 当前窗口
   */
  private _currentWindow: Ref<IEditorWindow | null> = ref(null);

  /**
   * 上下文列表
   */
  private _contexts: Ref<IContext[]> = ref([]);

  /**
   * 当前上下文
   */
  private _currentContext: Ref<IContext | null> = ref(null);

  /**
   * 是否激活
   */
  private _active: Ref<boolean> = ref(false);

  /**
   * 是否已销毁
   */
  private _destroyed: Ref<boolean> = ref(false);

  constructor(workspace: IWorkspace, id: string, name: string) {
    this._workspace = workspace;
    this._id = id;
    this._name = ref(name);
  }

  /**
   * 获取工作台 ID
   */
  get id(): string {
    return this._id;
  }

  /**
   * 获取工作台名称
   */
  get name(): string {
    return this._name.value;
  }

  /**
   * 设置工作台名称
   */
  set name(value: string) {
    this._name.value = value;
    this.eventBus.emit('change', { name: value });
  }

  /**
   * 获取工作区
   */
  get workspace(): IWorkspace {
    return this._workspace;
  }

  /**
   * 获取当前窗口
   */
  get currentWindow(): IEditorWindow | null {
    return this._currentWindow.value;
  }

  /**
   * 获取所有窗口
   */
  get windows(): IEditorWindow[] {
    return this._windows.value;
  }

  /**
   * 获取当前上下文
   */
  get currentContext(): IContext | null {
    return this._currentContext.value;
  }

  /**
   * 获取所有上下文
   */
  get contexts(): IContext[] {
    return this._contexts.value;
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
    this.eventBus.emit('change', { active: value });

    if (value) {
      this.eventBus.emit('activate');
    } else {
      this.eventBus.emit('deactivate');
    }
  }

  /**
   * 是否已销毁
   */
  get destroyed(): boolean {
    return this._destroyed.value;
  }

  /**
   * 创建窗口
   */
  createWindow(id: string, title: string): IEditorWindow {
    if (this._destroyed.value) {
      throw new Error('Workbench has been destroyed');
    }

    const { EditorWindow } = require('./EditorWindow');
    const window = new EditorWindow(this._workspace, id, title);
    this._windows.value.push(window);
    this.eventBus.emit('window-change', this._windows.value);
    return window;
  }

  /**
   * 打开窗口
   */
  openWindow(window: IEditorWindow): void {
    if (this._destroyed.value) {
      return;
    }

    if (!this._windows.value.includes(window)) {
      this._windows.value.push(window);
      this.eventBus.emit('window-change', this._windows.value);
    }

    this.activateWindow(window);
  }

  /**
   * 关闭窗口
   */
  closeWindow(window: IEditorWindow): void {
    if (this._destroyed.value) {
      return;
    }

    const index = this._windows.value.indexOf(window);
    if (index === -1) {
      return;
    }

    this._windows.value.splice(index, 1);

    if (this._currentWindow.value === window) {
      this._currentWindow.value = this._windows.value[this._windows.value.length - 1] || null;
      this.eventBus.emit('current-window-change', this._currentWindow.value);
    }

    window.destroy();
    this.eventBus.emit('window-change', this._windows.value);
  }

  /**
   * 激活窗口
   */
  activateWindow(window: IEditorWindow): void {
    if (this._destroyed.value) {
      return;
    }

    if (!this._windows.value.includes(window)) {
      return;
    }

    this._currentWindow.value = window;
    window.activate();
    this.eventBus.emit('current-window-change', window);
  }

  /**
   * 获取窗口
   */
  getWindow(id: string): IEditorWindow | null {
    return this._windows.value.find((w) => w.id === id) || null;
  }

  /**
   * 创建上下文
   */
  createContext(id: string, name: string, type: string = 'default', scope: string = 'global'): IContext {
    if (this._destroyed.value) {
      throw new Error('Workbench has been destroyed');
    }

    const { Context } = require('./Context');
    const context = new Context(id, name, type, scope);
    this._contexts.value.push(context);
    this.eventBus.emit('context-change', this._contexts.value);
    return context;
  }

  /**
   * 添加上下文
   */
  addContext(context: IContext): void {
    if (this._destroyed.value) {
      return;
    }

    if (this._contexts.value.includes(context)) {
      return;
    }

    this._contexts.value.push(context);
    this.eventBus.emit('context-change', this._contexts.value);
  }

  /**
   * 移除上下文
   */
  removeContext(context: IContext): void {
    if (this._destroyed.value) {
      return;
    }

    const index = this._contexts.value.indexOf(context);
    if (index === -1) {
      return;
    }

    this._contexts.value.splice(index, 1);

    if (this._currentContext.value === context) {
      this._currentContext.value = this._contexts.value[this._contexts.value.length - 1] || null;
      this.eventBus.emit('current-context-change', this._currentContext.value);
    }

    context.destroy();
    this.eventBus.emit('context-change', this._contexts.value);
  }

  /**
   * 激活上下文
   */
  activateContext(context: IContext): void {
    if (this._destroyed.value) {
      return;
    }

    if (!this._contexts.value.includes(context)) {
      return;
    }

    this._currentContext.value = context;
    context.activate();
    this.eventBus.emit('current-context-change', context);
  }

  /**
   * 获取上下文
   */
  getContext(id: string): IContext | null {
    return this._contexts.value.find((c) => c.id === id) || null;
  }

  /**
   * 激活工作台
   */
  activate(): void {
    if (this._destroyed.value) {
      return;
    }

    this.active = true;
  }

  /**
   * 停用工作台
   */
  deactivate(): void {
    if (this._destroyed.value) {
      return;
    }

    this.active = false;
  }

  /**
   * 销毁工作台
   */
  destroy(): void {
    if (this._destroyed.value) {
      return;
    }

    this._destroyed.value = true;

    // 销毁所有窗口
    this._windows.value.forEach((window) => {
      window.destroy();
    });
    this._windows.value = [];
    this._currentWindow.value = null;

    // 销毁所有上下文
    this._contexts.value.forEach((context) => {
      context.destroy();
    });
    this._contexts.value = [];
    this._currentContext.value = null;

    this.active = false;
    this.eventBus.emit('destroy');
    this.eventBus.clear();
  }

  /**
   * 监听工作台激活
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
   * 监听工作台停用
   */
  onDeactivate(fn: () => void): () => void {
    if (!this._active.value) {
      fn();
      return () => {};
    }
    this.eventBus.on('deactivate', fn);
    return () => {
      this.eventBus.off('deactivate', fn);
    };
  }

  /**
   * 监听窗口变化
   */
  onWindowChange(fn: (windows: IEditorWindow[]) => void): () => void {
    this.eventBus.on('window-change', fn);
    return () => {
      this.eventBus.off('window-change', fn);
    };
  }

  /**
   * 监听上下文变化
   */
  onContextChange(fn: (contexts: IContext[]) => void): () => void {
    this.eventBus.on('context-change', fn);
    return () => {
      this.eventBus.off('context-change', fn);
    };
  }

  /**
   * 监听当前窗口变化
   */
  onCurrentWindowChange(fn: (window: IEditorWindow | null) => void): () => void {
    this.eventBus.on('current-window-change', fn);
    return () => {
      this.eventBus.off('current-window-change', fn);
    };
  }

  /**
   * 监听当前上下文变化
   */
  onCurrentContextChange(fn: (context: IContext | null) => void): () => void {
    this.eventBus.on('current-context-change', fn);
    return () => {
      this.eventBus.off('current-context-change', fn);
    };
  }

  /**
   * 监听工作台销毁
   */
  onDestroy(fn: () => void): () => void {
    this.eventBus.on('destroy', fn);
    return () => {
      this.eventBus.off('destroy', fn);
    };
  }
}
