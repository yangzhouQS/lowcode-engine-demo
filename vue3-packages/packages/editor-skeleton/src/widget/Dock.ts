import { h } from 'vue';
import type { VNode } from 'vue';
import { Widget } from './Widget';
import type { DockConfig, ISkeleton, IDock } from '../types';

/**
 * Dock 类
 * 基础 Dock 实现
 */
export class Dock extends Widget implements IDock {
  readonly isDock = true;

  constructor(skeleton: ISkeleton, config: DockConfig) {
    super(skeleton, {
      ...config,
      type: 'Dock',
    });
  }

  get content(): VNode {
    return h('div', {
      class: 'lc-dock',
      onClick: () => this.toggle(),
    }, [
      h('div', { class: 'lc-dock-icon' }, this.title),
    ]);
  }
}

export function isDock(obj: any): obj is Dock {
  return obj && obj.isDock === true;
}
