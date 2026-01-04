/**
 * Vue3 LowCode Engine - Utils Package
 * 内容创建相关工具
 */

import { VNode, h, isVNode } from 'vue';
import { isVueComponent } from './is-vue3';

export function createContent(
    content: VNode | any,
    props?: Record<string, unknown>,
  ): VNode {
  if (isVNode(content)) {
    return props ? h(content.type as any, { ...props, ...content.props }) : content;
  }
  if (isVueComponent(content)) {
    return h(content, props);
  }

  return content as VNode;
}
