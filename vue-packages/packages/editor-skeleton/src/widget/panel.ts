import { VNode, defineComponent, h } from 'vue';
import { makeObservable, obx, computed } from '@vue-lowcode/designer';
import { createContent, uniqueId } from '@vue-lowcode/utils';
import { IPublicTypePanelConfig, IPublicTypePanelConfigProps } from '@vue-lowcode/types';
import { ISkeleton } from '../skeleton';
import { IWidget } from './widget';

export interface IPanel extends IWidget {
  readonly isPanel: true;
  readonly parent?: Area<any, any>;
  isChildOfFloatArea(): boolean;
  hide(): void;
  show(): void;
  toggle(): void;
}

export class Panel implements IPanel {
  readonly isWidget = true;
  readonly isPanel = true;

  readonly id = uniqueId('panel');

  readonly name: string;

  @obx.ref private _visible = true;

  get visible(): boolean {
    return this._visible;
  }

  @obx.ref inited = false;

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

  @computed get help() {
    return this.config.props?.help;
  }

  @computed get description() {
    return this.config.props?.description;
  }

  parent?: any;

  constructor(readonly skeleton: ISkeleton, readonly config: IPublicTypePanelConfig) {
    makeObservable(this);
    const { props = {}, name } = config;
    this.name = name;
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

  isChildOfFloatArea(): boolean {
    return this.parent?.name === 'leftFloatArea';
  }
}

export function isPanel(obj: any): obj is Panel {
  return obj && obj.isPanel;
}
