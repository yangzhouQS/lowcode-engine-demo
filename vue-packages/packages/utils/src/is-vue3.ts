/**
 * Vue3 LowCode Engine - Utils Package
 * Vue3检查相关工具
 */

import { defineComponent, h } from 'vue';

export function isVueComponent(obj: any): boolean {
  return obj && typeof obj === 'object' && (
    typeof obj.setup === 'function' ||
    typeof obj.render === 'function' ||
    typeof obj.__vccOpts === 'object' ||
    typeof obj.template === 'function' ||
    typeof obj.__name === 'string'
  );
}
