import { makeObservable, obx, computed } from '@vue-lowcode/designer';
import { Logger } from '@vue-lowcode/utils';

const logger = new Logger({ level: 'warn', bizName: 'skeleton:widget-container' });

export class WidgetContainer<T, C> {
  @obx.shallow items: T[] = [];

  @obx.ref current: T | null = null;

  constructor(
    readonly name: string,
    private handle: (item: T | C) => T,
    readonly exclusive: boolean = false,
    private checkVisible: () => boolean = () => true,
    defaultSetCurrent: boolean = false,
  ) {
    makeObservable(this);
    if (defaultSetCurrent) {
      this.activeFirst();
    }
  }

  @computed get visible(): boolean {
    return this.checkVisible();
  }

  @computed get isEmpty(): boolean {
    return this.items.length < 1;
  }

  get(name: string): T | undefined {
    return this.items.find((item: any) => item.name === name);
  }

  getAt(index: number): T | undefined {
    return this.items[index];
  }

  add(config: T | C): T {
    const item = this.handle(config);
    this.items.push(item);
    if (this.exclusive && this.items.length === 1) {
      this.active(item);
    }
    return item;
  }

  remove(config: T | string): number {
    let index = -1;
    if (typeof config === 'string') {
      index = this.items.findIndex((item: any) => item.name === config);
    } else {
      index = this.items.indexOf(config);
    }

    if (index < 0) {
      return -1;
    }

    const item = this.items[index];
    this.items.splice(index, 1);

    if (this.exclusive && item === this.current) {
      this.activeFirst();
    }

    return index;
  }

  active(item: T): void {
    if (!this.exclusive) {
      logger.warn('WidgetContainer is not exclusive, cannot active item');
      return;
    }
    if (this.current === item) {
      return;
    }
    this.current = item;
  }

  unactive(item: T): void {
    if (!this.exclusive) {
      logger.warn('WidgetContainer is not exclusive, cannot unactive item');
      return;
    }
    if (this.current !== item) {
      return;
    }
    this.current = null;
  }

  activeFirst(): void {
    if (!this.exclusive) {
      logger.warn('WidgetContainer is not exclusive, cannot active first item');
      return;
    }
    if (this.items.length > 0) {
      this.current = this.items[0];
    }
  }

  clear(): void {
    this.items = [];
    this.current = null;
  }
}
