import { reactive, computed, shallowRef, ref } from 'vue';
import { hasOwnProperty } from '@vue3-lowcode/utils';
import type { IPanel } from '../types';

/**
 * WidgetItem 接口
 */
export interface WidgetItem {
  name: string;
}

/**
 * Activeable 接口
 */
export interface Activeable {
  setActive(flag: boolean): void;
}

/**
 * 判断一个对象是否具有可激活的能力
 */
function isActiveable(obj: any): obj is Activeable {
  return obj && typeof obj.setActive === 'function';
}

/**
 * WidgetContainer 类
 * 用于管理 Widget 的容器
 */
export class WidgetContainer<T extends WidgetItem = any, G extends WidgetItem = any> {
  items = shallowRef<T[]>([]);

  private maps: Record<string, T> = reactive({});

  private _current = shallowRef<(T & Activeable) | null>(null);

  get current() {
    return this._current.value;
  }

  constructor(
    readonly name: string,
    private handle: (item: T | G) => T,
    private exclusive: boolean = false,
    private checkVisible: () => boolean = () => true,
    private defaultSetCurrent: boolean = false,
  ) {}

  get visible() {
    return this.checkVisible();
  }

  active(nameOrItem?: T | string | null) {
    let item: any = nameOrItem;
    if (nameOrItem && typeof nameOrItem === 'string') {
      item = this.get(nameOrItem);
    }
    if (!isActiveable(item)) {
      item = null;
    }

    if (this.exclusive) {
      if (this._current.value === item) {
        return;
      }
      if (this._current.value) {
        this._current.value.setActive(false);
      }
      this._current.value = item;
    }

    if (item) {
      item.setActive(true);
    }
  }

  unactive(nameOrItem?: T | string | null) {
    let item: any = nameOrItem;
    if (nameOrItem && typeof nameOrItem === 'string') {
      item = this.get(nameOrItem);
    }
    if (!isActiveable(item)) {
      item = null;
    }
    if (this._current.value === item) {
      this._current.value = null;
    }
    if (item) {
      item.setActive(false);
    }
  }

  unactiveAll() {
    Object.keys(this.maps).forEach((name) => this.unactive(name));
  }

  add(item: T | G): T {
    item = this.handle(item);
    const origin = this.get(item.name);
    if (origin === item) {
      return origin;
    }
    const i = origin ? this.items.value.indexOf(origin) : -1;
    if (i > -1) {
      this.items.value[i] = item;
    } else {
      this.items.value.push(item);
    }
    this.maps[item.name] = item;
    if (this.isPanel(item)) {
      item.setParent(this);
    }
    if (this.defaultSetCurrent) {
      const shouldHiddenWhenInit = (item as any).config?.props?.hiddenWhenInit;
      if (!this._current.value && !shouldHiddenWhenInit) {
        this.active(item);
      }
    }
    return item;
  }

  get(name: string): T | null {
    return this.maps[name] || null;
  }

  getAt(index: number): T | null {
    return this.items.value[index] || null;
  }

  has(name: string): boolean {
    return hasOwnProperty(this.maps, name);
  }

  indexOf(item: T): number {
    return this.items.value.indexOf(item);
  }

  /**
   * 返回删除的索引
   */
  remove(item: string | T): number {
    const thing = typeof item === 'string' ? this.get(item) : item;
    if (!thing) {
      return -1;
    }
    const i = this.items.value.indexOf(thing);
    if (i > -1) {
      this.items.value.splice(i, 1);
    }
    delete this.maps[thing.name];
    if (thing === this._current.value) {
      this._current.value = null;
    }
    return i;
  }

  private isPanel(item: any): item is IPanel {
    return item && item.isPanel === true;
  }
}
