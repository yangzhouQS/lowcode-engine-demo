import { VNode, defineComponent, h } from 'vue';
import { makeObservable, obx, action } from '@vue-lowcode/designer';
import { createContent, uniqueId } from '@vue-lowcode/utils';
import { PanelDockConfig } from '../types';
import { ISkeleton, SkeletonEvents } from '../skeleton';
import { IWidget } from './widget';
import { IPublicTypePanelConfig } from '@vue-lowcode/types';

export interface IPanelDock extends IWidget {
  readonly isPanelDock: true;
  panelName?: string;
  active(): void;
  unactive(): void;
}

export class PanelDock implements IPanelDock {
  readonly isWidget = true;
  readonly isPanelDock = true;

  readonly id = uniqueId('panel-dock');

  readonly name: string;

  @obx.ref private _visible = true;

  get visible(): boolean {
    return this._visible;
  }

  @obx.ref inited = false;

  @obx.ref private _disabled = false;

  @obx.ref private _active = false;

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

  readonly panelName?: string;

  @obx.ref panel?: IPublicTypePanelConfig;

  constructor(readonly skeleton: ISkeleton, readonly config: PanelDockConfig) {
    makeObservable(this);
    const { props = {}, name, panelName, panelProps } = config;
    this.name = name;
    this.align = props.align;
    this.title = props.title || name;
    this.panelName = panelName;
    if (panelProps) {
      this.panel = panelProps as IPublicTypePanelConfig;
    }
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

  @action
  active() {
    if (this._active) {
      return;
    }
    this._active = true;
    this.skeleton.postEvent(SkeletonEvents.PANEL_DOCK_ACTIVE, this.name, this);
  }

  @action
  unactive() {
    if (!this._active) {
      return;
    }
    this._active = false;
    this.skeleton.postEvent(SkeletonEvents.PANEL_DOCK_UNACTIVE, this.name, this);
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

  get active(): boolean {
    return this._active;
  }

  private setDisabled(flag: boolean) {
    if (this._disabled === flag) return;
    this._disabled = flag;
  }
}

export function isPanelDock(obj: any): obj is PanelDock {
  return obj && obj.isPanelDock;
}
