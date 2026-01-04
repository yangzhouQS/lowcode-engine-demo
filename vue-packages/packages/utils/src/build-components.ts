/**
 * Vue3 LowCode Engine - Utils Package
 * 组件构建相关工具
 */

import { h, VNode, defineComponent, Component } from 'vue';

export interface BuildComponentOptions {
  component: Component;
  props?: Record<string, any>;
  children?: VNode[] | VNode | string;
}

export function buildComponent(options: BuildComponentOptions): VNode {
  const { component, props = {}, children } = options;
  return h(component, props, children);
}

export function buildComponents(
  components: BuildComponentOptions[]
): VNode[] {
  return components.map(buildComponent);
}

export function createComponentWrapper(
  component: Component,
  wrapperProps?: Record<string, any>
): Component {
  return defineComponent({
    name: `Wrapper${component.name || 'Component'}`,
    setup(props: any, { slots, attrs }) {
      return () => {
        return h(component, { ...attrs, ...wrapperProps, ...props }, slots);
      };
    },
  });
}

export function mergeComponents(...components: Component[]): Component {
  return defineComponent({
    name: 'MergedComponent',
    setup(props, { slots }) {
      return () => {
        return components.map(comp => h(comp, props, slots));
      };
    },
  });
}
