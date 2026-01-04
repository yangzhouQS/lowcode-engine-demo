import { VNode, defineComponent, h } from 'vue';
import { makeObservable, obx } from '@vue-lowcode/designer';
import { createContent, uniqueId } from '@vue-lowcode/utils';
import { DockConfig } from '../types';
import { ISkeleton } from '../skeleton';
import { IWidget } from './widget';
import { IPublicTypeWidgetBaseConfig } from '@vue-lowcode/types';

export interface IDock extends IWidget {
  readonly isDock: true;
}

export class Dock implements IDock {
  readonly isWidget = true;
  readonly isDock = true;

  readonly id = uniqueId('dock');

  readonly name: string;

  @obx.ref private _visible = true;

  get visible(): boolean {
    return this._visible;
  }

  @obx.ref inited = false;

  @obx.ref private _disabled = false;

  private _body: VNode | null = null;

  get body() {
    if (this.inited) {
      return this._body;
    }
    this.inited = true;
    const { content, contentProps } = this.config;
    this._body = createContent(content, {
      ...contentProps,
      config: this.config,
      editor: this.skeleton.editor,
    });
    return this._body;
  }

  get content(): VNode {
    return this.body;
  }

  readonly title: any;

  readonly align?: string;

  constructor(readonly skeleton: ISkeleton, readonly config: DockConfig) {
    makeObservable(this);
    const { props = {}, name } = config;
    this.name = name;
    this.align = props.align;
    this.title = props.title || name;
    if (props.onInit) {
      props.onInit.call(this, this);
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getContent() {
    return this.content;
  }

  hide() {
    this.setVisible(false);
  }

  show() {
    this.setVisible(true);
  }

  setVisible(flag: boolean) {
    if (flag === this._visible) {
      return;
    }
    if (flag) {
      this._visible = true;
    } else if (this.inited) {
      this._visible = false;
    }
  }

  toggle() {
    this.setVisible(!this._visible);
  }

  disable() {
    this.setDisabled(true);
  }

  enable() {
    this.setDisabled(false);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  private setDisabled(flag: boolean) {
    if (this._disabled === flag) return;
    this._disabled = flag;
  }
}

export function isDock(obj: any): obj is Dock {
  return obj && obj.isDock;
}
