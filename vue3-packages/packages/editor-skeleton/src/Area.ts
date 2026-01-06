import { computed, ref } from 'vue';
import type { IArea, IWidget, IPanel } from './types';
import { WidgetContainer } from './widget/WidgetContainer';

/**
 * Area 类
 * 用于管理编辑器中的不同区域
 */
export class Area<C = any, T extends IWidget = IWidget> implements IArea<C, T> {
  private _visible = ref(true);

  get visible() {
    if (this.exclusive) {
      return this.container.current !== null;
    }
    return this._visible.value;
  }

  get current() {
    if (this.exclusive) {
      return this.container.current;
    }
    return null;
  }

  readonly container: WidgetContainer<T, C>;

  private lastCurrent: T | null = null;

  constructor(
    readonly skeleton: any,
    readonly name: string,
    handle: (item: T | C) => T,
    private exclusive?: boolean,
    defaultSetCurrent = false,
  ) {
    this.container = skeleton.createContainer(name, handle, exclusive, () => this.visible, defaultSetCurrent);
  }

  isEmpty(): boolean {
    return this.container.items.value.length < 1;
  }

  add(config: T | C): T {
    const item = this.container.get((config as any).name);
    if (item) {
      console.warn(`The ${(config as any).name} has already been added to skeleton.`);
      return item;
    }
    return this.container.add(config);
  }

  remove(config: T | string): number {
    return this.container.remove(config);
  }

  setVisible(flag: boolean): void {
    if (this.exclusive) {
      const { current } = this.container;
      if (flag && !current) {
        this.container.active(this.lastCurrent || this.container.getAt(0));
      } else if (current) {
        this.lastCurrent = current;
        this.container.unactive(current);
      }
      return;
    }
    this._visible.value = flag;
  }

  hide(): void {
    this.setVisible(false);
  }

  show(): void {
    this.setVisible(true);
  }

  /**
   * @deprecated
   */
  removeAction(config: string): number {
    return this.remove(config);
  }
}
