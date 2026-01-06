import { h, computed, ref } from 'vue';
import type { VNode } from 'vue';
import { uniqueId } from '@vue3-lowcode/utils';
import type { PanelConfig, IPanel, ISkeleton, HelpTipConfig } from '../types';
import { WidgetContainer } from './WidgetContainer';
import { Widget } from './Widget';

/**
 * Panel 类
 * Panel 面板实现
 */
export class Panel extends Widget implements IPanel {
  readonly isPanel = true;

  readonly id: string;

  private inited = ref(false);

  private _actived = ref(false);

  get actived(): boolean {
    return this._actived.value;
  }

  get visible(): boolean {
    if (!this.parent || this.parent.visible) {
      const { props } = this.config;
      if (props?.condition) {
        return props.condition(this);
      }
      return this._actived.value;
    }
    return false;
  }

  get body(): VNode {
    if (this.container) {
      return h('div', {
        class: 'lc-panel-tabs',
      }, this.container.items.value.map((item) => h(item.body)));
    }

    const { content, contentProps } = this.config;
    return this.createContent(content, contentProps);
  }

  get content(): VNode {
    const area = this.config?.area || this.parent?.name;
    if (this.plain) {
      return h('div', {
        class: 'lc-panel lc-panel-plain',
        key: this.id,
      }, [this.body]);
    }
    return h('div', {
      class: 'lc-panel lc-panel-titled',
      key: this.id,
    }, [
      h('div', { class: 'lc-panel-title' }, this.title),
      h('div', { class: 'lc-panel-body' }, [this.body]),
    ]);
  }

  readonly title: any;

  readonly help?: HelpTipConfig;

  private plain = false;

  private container?: WidgetContainer<Panel, PanelConfig>;

  private parent?: WidgetContainer;

  constructor(skeleton: ISkeleton, config: PanelConfig) {
    super(skeleton, config);
    const { name, content, props = {} } = config;
    const { hideTitleBar, title, icon, description, help } = props;
    this.name = name;
    this.id = uniqueId(`pane:${name}$`);
    this.title = this.composeTitle(title || name, icon, description);
    this.plain = hideTitleBar || !title;
    this.help = help;
    if (Array.isArray(content)) {
      this.container = skeleton.createContainer(
        name,
        (item) => {
          if (this.isPanel(item)) {
            return item;
          }
          return skeleton.createPanel(item);
        },
        true,
        () => this.visible,
        true,
      );
      content.forEach((item) => this.add(item));
    }
    if (props.onInit) {
      props.onInit.call(this, this);
    }

    if (typeof content !== 'string' && content && content.onInit) {
      content.onInit.call(this, this);
    }
  }

  setParent(parent: WidgetContainer): void {
    if (parent === this.parent) {
      return;
    }
    if (this.parent) {
      this.parent.remove(this);
    }
    this.parent = parent;
  }

  add(item: Panel | PanelConfig): Panel | undefined {
    return this.container?.add(item);
  }

  getPane(name: string): Panel | null {
    return this.container?.get(name) || null;
  }

  remove(item: Panel | string): number {
    return this.container?.remove(item) ?? -1;
  }

  active(item?: Panel | string | null): void {
    if (item) {
      this.container?.active(item);
    } else {
      this.setActive(true);
    }
  }

  setActive(flag: boolean): void {
    if (flag === this._actived.value) {
      return;
    }
    if (flag) {
      if (this.isChildOfFloatArea()) {
        (this.skeleton as any).leftFixedArea?.container?.unactiveAll();
      } else if (this.isChildOfFixedArea()) {
        (this.skeleton as any).leftFloatArea?.container?.unactiveAll();
      }
      this._actived.value = true;
      this.parent?.active(this);
      if (!this.inited.value) {
        this.inited.value = true;
      }
    } else if (this.inited.value) {
      if (this.parent?.name && this.name.startsWith(this.parent.name)) {
        this.inited.value = false;
      }
      this._actived.value = false;
      this.parent?.unactive(this);
    }
  }

  toggle(): void {
    this.setActive(!this._actived.value);
  }

  hide(): void {
    this.setActive(false);
  }

  disable(): void {}

  enable(): void {}

  show(): void {
    this.setActive(true);
  }

  isChildOfFloatArea(): boolean {
    return this.parent?.name === 'leftFloatArea';
  }

  isChildOfFixedArea(): boolean {
    return this.parent?.name === 'leftFixedArea';
  }

  private composeTitle(title: any, icon?: any, description?: string): any {
    if (icon && typeof icon === 'string') {
      return h('div', { class: 'lc-panel-title-content' }, [
        h('span', { class: 'lc-panel-icon' }, icon),
        h('span', { class: 'lc-panel-text' }, title),
        description ? h('span', { class: 'lc-panel-desc' }, description) : null,
      ]);
    }
    return title;
  }

  private isPanel(obj: any): obj is Panel {
    return obj && obj.isPanel === true;
  }
}

export function isPanel(obj: any): obj is Panel {
  return obj && obj.isPanel === true;
}
