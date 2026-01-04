import { defineComponent, h } from 'vue';
import baseRendererFactory from './base';
import { IBaseRenderComponent } from '../../types';

export default function addonRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();

  return defineComponent({
    name: 'AddonRenderer',
    __namespace: 'addon',
    setup(props: any, { expose }) {
      return () => {
        const baseMethods = BaseRenderer.setup(props, { expose });
        expose(baseMethods);

        // Addon 渲染器用于渲染插件/附加组件
        const schema = props.__schema;
        if (!schema) {
          return null;
        }

        // Addon 通常是一个容器，渲染其子节点
        const children = schema.children || [];
        const renderedChildren = Array.isArray(children)
          ? children.map((child: any, i: number) =>
              h(child.componentName || 'div', { key: i }, child.children)
            )
          : h(children.componentName || 'div', {}, children.children);

        return h('div', {
          className: props.className || 'lowcode-addon',
          style: props.style || {},
        }, renderedChildren);
      };
    },
  });
}
