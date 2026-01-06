import { ref, reactive, computed, type Ref } from 'vue';
import { useEventBus } from '@vue3-lowcode/utils';

/**
 * BasicContext 接口定义
 */
export interface IBasicContext {
  /**
   * 获取上下文 ID
   */
  get id(): string;

  /**
   * 获取上下文名称
   */
  get name(): string;

  /**
   * 设置上下文名称
   */
  set name(value: string);

  /**
   * 获取上下文数据
   */
  get data(): any;

  /**
   * 设置上下文数据
   */
  set data(value: any);

  /**
   * 获取上下文元数据
   */
  get meta(): any;

  /**
   * 设置上下文元数据
   */
  set meta(value: any);

  /**
   * 获取上下文父级
   */
  get parent(): IBasicContext | null;

  /**
   * 设置上下文父级
   */
  set parent(value: IBasicContext | null);

  /**
   * 获取上下文子级
   */
  get children(): IBasicContext[];

  /**
   * 添加子上下文
   */
  addChild(context: IBasicContext): void;

  /**
   * 移除子上下文
   */
  removeChild(context: IBasicContext): void;

  /**
   * 获取上下文值
   */
  get<T = any>(key: string): T;

  /**
   * 设置上下文值
   */
  set<T = any>(key: string, value: T): void;

  /**
   * 删除上下文值
   */
  delete(key: string): void;

  /**
   * 检查上下文值是否存在
   */
  has(key: string): boolean;

  /**
   * 清空上下文
   */
  clear(): void;

  /**
   * 销毁上下文
   */
  destroy(): void;

  /**
   * 监听上下文变化
   */
  onChange(fn: (data: any) => void): () => void;

  /**
   * 监听上下文销毁
   */
  onDestroy(fn: () => void): () => void;
}

/**
 * BasicContext 类实现
 */
export class BasicContext implements IBasicContext {
  private eventBus = useEventBus();

  /**
   * 上下文 ID
   */
  private _id: string;

  /**
   * 上下文名称
   */
  private _name: Ref<string>;

  /**
   * 上下文数据
   */
  private _data: Ref<any>;

  /**
   * 上下文元数据
   */
  private _meta: Ref<any>;

  /**
   * 上下文父级
   */
  private _parent: Ref<IBasicContext | null>;

  /**
   * 上下文子级
   */
  private _children: Ref<IBasicContext[]> = ref([]);

  /**
   * 上下文值存储
   */
  private _values: Map<string, any> = new Map();

  /**
   * 是否已销毁
   */
  private _destroyed: Ref<boolean> = ref(false);

  constructor(id: string, name: string, data?: any, meta?: any) {
    this._id = id;
    this._name = ref(name);
    this._data = ref(data);
    this._meta = ref(meta || {});
    this._parent = ref(null);
  }

  /**
   * 获取上下文 ID
   */
  get id(): string {
    return this._id;
  }

  /**
   * 获取上下文名称
   */
  get name(): string {
    return this._name.value;
  }

  /**
   * 设置上下文名称
   */
  set name(value: string) {
    this._name.value = value;
    this.eventBus.emit('change', { name: value });
  }

  /**
   * 获取上下文数据
   */
  get data(): any {
    return this._data.value;
  }

  /**
   * 设置上下文数据
   */
  set data(value: any) {
    this._data.value = value;
    this.eventBus.emit('change', { data: value });
  }

  /**
   * 获取上下文元数据
   */
  get meta(): any {
    return this._meta.value;
  }

  /**
   * 设置上下文元数据
   */
  set meta(value: any) {
    this._meta.value = value;
    this.eventBus.emit('change', { meta: value });
  }

  /**
   * 获取上下文父级
   */
  get parent(): IBasicContext | null {
    return this._parent.value;
  }

  /**
   * 设置上下文父级
   */
  set parent(value: IBasicContext | null) {
    this._parent.value = value;
    this.eventBus.emit('change', { parent: value });
  }

  /**
   * 获取上下文子级
   */
  get children(): IBasicContext[] {
    return this._children.value;
  }

  /**
   * 是否已销毁
   */
  get destroyed(): boolean {
    return this._destroyed.value;
  }

  /**
   * 添加子上下文
   */
  addChild(context: IBasicContext): void {
    if (this._destroyed.value) {
      return;
    }

    if (this._children.value.includes(context)) {
      return;
    }

    this._children.value.push(context);
    context.parent = this;
    this.eventBus.emit('change', { children: this._children.value });
  }

  /**
   * 移除子上下文
   */
  removeChild(context: IBasicContext): void {
    if (this._destroyed.value) {
      return;
    }

    const index = this._children.value.indexOf(context);
    if (index === -1) {
      return;
    }

    this._children.value.splice(index, 1);
    context.parent = null;
    this.eventBus.emit('change', { children: this._children.value });
  }

  /**
   * 获取上下文值
   */
  get<T = any>(key: string): T {
    if (this._destroyed.value) {
      return undefined as any;
    }

    return this._values.get(key) as T;
  }

  /**
   * 设置上下文值
   */
  set<T = any>(key: string, value: T): void {
    if (this._destroyed.value) {
      return;
    }

    this._values.set(key, value);
    this.eventBus.emit('change', { key, value });
  }

  /**
   * 删除上下文值
   */
  delete(key: string): void {
    if (this._destroyed.value) {
      return;
    }

    this._values.delete(key);
    this.eventBus.emit('change', { key, deleted: true });
  }

  /**
   * 检查上下文值是否存在
   */
  has(key: string): boolean {
    if (this._destroyed.value) {
      return false;
    }

    return this._values.has(key);
  }

  /**
   * 清空上下文
   */
  clear(): void {
    if (this._destroyed.value) {
      return;
    }

    this._values.clear();
    this.eventBus.emit('change', { cleared: true });
  }

  /**
   * 销毁上下文
   */
  destroy(): void {
    if (this._destroyed.value) {
      return;
    }

    this._destroyed.value = true;

    // 销毁所有子上下文
    this._children.value.forEach((child) => {
      child.destroy();
    });
    this._children.value = [];

    // 清空父级引用
    if (this._parent.value) {
      this._parent.value.removeChild(this);
      this._parent.value = null;
    }

    // 清空值存储
    this._values.clear();

    this.eventBus.emit('destroy');
    this.eventBus.clear();
  }

  /**
   * 监听上下文变化
   */
  onChange(fn: (data: any) => void): () => void {
    this.eventBus.on('change', fn);
    return () => {
      this.eventBus.off('change', fn);
    };
  }

  /**
   * 监听上下文销毁
   */
  onDestroy(fn: () => void): () => void {
    if (this._destroyed.value) {
      fn();
      return () => {};
    }
    this.eventBus.on('destroy', fn);
    return () => {
      this.eventBus.off('destroy', fn);
    };
  }

  /**
   * 查找子上下文
   */
  findChild(predicate: (context: IBasicContext) => boolean): IBasicContext | null {
    if (this._destroyed.value) {
      return null;
    }

    for (const child of this._children.value) {
      if (predicate(child)) {
        return child;
      }

      const found = child.findChild?.(predicate);
      if (found) {
        return found;
      }
    }

    return null;
  }

  /**
   * 遍历所有子上下文
   */
  traverseChildren(callback: (context: IBasicContext) => void): void {
    if (this._destroyed.value) {
      return;
    }

    this._children.value.forEach((child) => {
      callback(child);
      child.traverseChildren?.(callback);
    });
  }
}
