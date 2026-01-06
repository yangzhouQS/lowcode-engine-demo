import { ref, computed, type Ref } from 'vue';
import { useEventBus } from '@vue3-lowcode/utils';
import { BasicContext, type IBasicContext } from './BasicContext';

/**
 * Context 接口定义
 */
export interface IContext extends IBasicContext {
  /**
   * 获取上下文类型
   */
  get type(): string;

  /**
   * 设置上下文类型
   */
  set type(value: string);

  /**
   * 获取上下文作用域
   */
  get scope(): string;

  /**
   * 设置上下文作用域
   */
  set scope(value: string);

  /**
   * 获取上下文优先级
   */
  get priority(): number;

  /**
   * 设置上下文优先级
   */
  set priority(value: number);

  /**
   * 获取上下文是否激活
   */
  get active(): boolean;

  /**
   * 设置上下文是否激活
   */
  set active(value: boolean);

  /**
   * 激活上下文
   */
  activate(): void;

  /**
   * 停用上下文
   */
  deactivate(): void;

  /**
   * 监听上下文激活
   */
  onActivate(fn: () => void): () => void;

  /**
   * 监听上下文停用
   */
  onDeactivate(fn: () => void): () => void;
}

/**
 * Context 类实现
 */
export class Context extends BasicContext implements IContext {
  /**
   * 上下文类型
   */
  private _type: Ref<string>;

  /**
   * 上下文作用域
   */
  private _scope: Ref<string>;

  /**
   * 上下文优先级
   */
  private _priority: Ref<number>;

  /**
   * 是否激活
   */
  private _active: Ref<boolean> = ref(false);

  constructor(id: string, name: string, type: string = 'default', scope: string = 'global', data?: any, meta?: any) {
    super(id, name, data, meta);
    this._type = ref(type);
    this._scope = ref(scope);
    this._priority = ref(0);
  }

  /**
   * 获取上下文类型
   */
  get type(): string {
    return this._type.value;
  }

  /**
   * 设置上下文类型
   */
  set type(value: string) {
    this._type.value = value;
    this.eventBus.emit('change', { type: value });
  }

  /**
   * 获取上下文作用域
   */
  get scope(): string {
    return this._scope.value;
  }

  /**
   * 设置上下文作用域
   */
  set scope(value: string) {
    this._scope.value = value;
    this.eventBus.emit('change', { scope: value });
  }

  /**
   * 获取上下文优先级
   */
  get priority(): number {
    return this._priority.value;
  }

  /**
   * 设置上下文优先级
   */
  set priority(value: number) {
    this._priority.value = value;
    this.eventBus.emit('change', { priority: value });
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
   * 激活上下文
   */
  activate(): void {
    if (this.destroyed) {
      return;
    }

    this.active = true;
  }

  /**
   * 停用上下文
   */
  deactivate(): void {
    if (this.destroyed) {
      return;
    }

    this.active = false;
  }

  /**
   * 监听上下文激活
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
   * 监听上下文停用
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
   * 获取上下文值（支持作用域查找）
   */
  override get<T = any>(key: string): T {
    if (this.destroyed) {
      return undefined as any;
    }

    // 先在当前上下文中查找
    if (super.has(key)) {
      return super.get<T>(key);
    }

    // 如果没有找到，在父级上下文中查找
    if (this.parent && this.parent instanceof Context) {
      return this.parent.get<T>(key);
    }

    return undefined as any;
  }

  /**
   * 查找子上下文（支持类型和作用域过滤）
   */
  findChildByType(type: string): IContext | null {
    if (this.destroyed) {
      return null;
    }

    for (const child of this.children) {
      if (child instanceof Context && child.type === type) {
        return child;
      }

      const found = child.findChildByType?.(type);
      if (found) {
        return found;
      }
    }

    return null;
  }

  /**
   * 查找子上下文（支持作用域过滤）
   */
  findChildByScope(scope: string): IContext | null {
    if (this.destroyed) {
      return null;
    }

    for (const child of this.children) {
      if (child instanceof Context && child.scope === scope) {
        return child;
      }

      const found = child.findChildByScope?.(scope);
      if (found) {
        return found;
      }
    }

    return null;
  }

  /**
   * 查找激活的子上下文
   */
  findActiveChild(): IContext | null {
    if (this.destroyed) {
      return null;
    }

    for (const child of this.children) {
      if (child instanceof Context && child.active) {
        return child;
      }

      const found = child.findActiveChild?.();
      if (found) {
        return found;
      }
    }

    return null;
  }

  /**
   * 激活所有子上下文
   */
  activateChildren(): void {
    if (this.destroyed) {
      return;
    }

    this.children.forEach((child) => {
      if (child instanceof Context) {
        child.activate();
      }
    });
  }

  /**
   * 停用所有子上下文
   */
  deactivateChildren(): void {
    if (this.destroyed) {
      return;
    }

    this.children.forEach((child) => {
      if (child instanceof Context) {
        child.deactivate();
      }
    });
  }

  /**
   * 按优先级排序子上下文
   */
  sortChildrenByPriority(): void {
    if (this.destroyed) {
      return;
    }

    this.children.sort((a, b) => {
      const priorityA = a instanceof Context ? a.priority : 0;
      const priorityB = b instanceof Context ? b.priority : 0;
      return priorityB - priorityA;
    });
  }
}
