import { h } from 'vue';
import type { VNode } from 'vue';
import { Dock } from './Dock';
import type { PanelDockConfig, ISkeleton, IPanelDock } from '../types';

/**
 * PanelDock 类
 * 面板 Dock 实现
 */
export class PanelDock extends Dock implements IPanelDock {
  readonly isPanelDock = true;

  readonly panelName?: string;

  constructor(skeleton: ISkeleton, config: PanelDockConfig) {
    super(skeleton, {
      ...config,
      type: 'PanelDock',
    });
    this.panelName = config.panelName;
  }

  get content(): VNode {
    return h('div', {
      class: 'lc-panel-dock',
      onClick: () => this.togglePanel(),
    }, [
      h('div', { class: 'lc-panel-dock-icon' }, this.title),
    ]);
  }

  togglePanel(): void {
    const panel = this.skeleton.getPanel(this.panelName || '');
    if (panel) {
      panel.active();
    }
  }
}

export function isPanelDock(obj: any): obj is PanelDock {
  return obj && obj.isPanelDock === true;
}
