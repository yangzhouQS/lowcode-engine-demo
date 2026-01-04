/**
 * Vue3 LowCode Engine - Utils Package
 * 图标创建相关工具
 */

import { VNode, h, isVNode } from 'vue';
import { IPublicTypeIconType } from '@vue-lowcode/types';
import { isVueComponent } from './is-vue3';
import { isESModule } from './is-es-module';

const URL_RE = /^(https?:)\/\//i;

export function createIcon(
    icon?: IPublicTypeIconType | null,
    props?: Record<string, unknown>,
  ): VNode | null {
  if (!icon) {
    return null;
  }
  if (isESModule(icon)) {
    icon = icon.default;
  }
  if (typeof icon === 'string') {
    if (URL_RE.test(icon)) {
      return h('img', {
        src: icon,
        class: props?.className,
        ...props,
      });
    }
    // 使用 SVG 图标组件
    return h('span', { class: props?.className, ...props }, icon);
  }
  if (isVNode(icon)) {
    return h(icon.type as any, { ...props, ...icon.props });
  }
  if (isVueComponent(icon)) {
    return h(icon, {
      class: props?.className,
      ...props,
    });
  }

  // 默认返回一个 span
  return h('span', { class: props?.className, ...props });
}
