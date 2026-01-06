import { h, computed, ref } from 'vue';
import type { VNode } from 'vue';
import { uniqueId } from '@vue3-lowcode/utils';
import type { WidgetConfig, IWidget, ISkeleton } from '../types';

/**
 * Widget 类
 * 基础 Widget 实现
 */
export class Widget implements IWidget {
  readonly isWidget = true;

  readonly id = uniqueId('widget');

  readonly name: string;

  readonly align?: string;

  private _visible = ref(true);

  get visible(): boolean {
    return this._visible.value;
  }

  private inited = ref(false);

  private _disabled = ref(false);

  private _body: VNode | null = null;

  get body(): VNode {
    if (this.inited.value) {
      return this._body!;
    }
    this.inited.value = true;
    const { content, contentProps } = this.config;
    this._body = this.createContent(content, contentProps);
    return this._body;
  }

  get content(): VNode {
    return h('div', {
      key: this.id,
      class: 'lc-widget',
    }, [this.body]);
  }

  readonly title: any;

  constructor(readonly skeleton: ISkeleton, readonly config: WidgetConfig) {
    const { props = {}, name } = config;
    this.name = name;
    this.align = props.align;
    this.title = props.title || name;
    if (props.onInit) {
      props.onInit.call(this, this);
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getContent(): VNode {
    return this.content;
  }

  hide(): void {
    this.setVisible(false);
  }

  show(): void {
    this.setVisible(true);
  }

  setVisible(flag: boolean): void {
    if (flag === this._visible.value) {
      return;
    }
    if (flag) {
      this._visible.value = true;
    } else if (this.inited.value) {
      this._visible.value = false;
    }
  }

  toggle(): void {
    this.setVisible(!this._visible.value);
  }

  private setDisabled(flag: boolean): void {
    if (this._disabled.value === flag) return;
    this._disabled.value = flag;
  }

  disable(): void {
    this.setDisabled(true);
  }

  enable(): void {
    this.setDisabled(false);
  }

  get disabled(): boolean {
    return this._disabled.value;
  }

  private createContent(content: any, contentProps?: Record<string, any>): VNode {
    if (typeof content === 'function') {
      return h(content, {
        ...contentProps,
        config: this.config,
        editor: this.skeleton.editor,
      });
    }
    if (typeof content === 'string') {
      return h('div', content);
    }
    return h(content, contentProps || {});
  }
}

export function isWidget(obj: any): obj is Widget {
  return obj && obj.isWidget === true;
}
