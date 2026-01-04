import { defineComponent, h } from 'vue';
import baseRendererFactory from './base';
import { IBaseRenderComponent } from '../../types';

export default function tempRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();

  return defineComponent({
    name: 'TempRenderer',
    __namespace: 'temp',
    setup(props: any, { expose }) {
      return () => {
        const baseMethods = BaseRenderer.setup(props, { expose });
        expose(baseMethods);

        // Temp 渲染器用于渲染临时组件
        const schema = props.__schema;
        if (!schema) {
          return null;
        }

        // Temp 通常是一个临时容器，渲染其子节点
        const children = schema.children || [];
        const renderedChildren = Array.isArray(children)
          ? children.map((child: any, i: number) =>
              h(child.componentName || 'div', { key: i }, child.children)
            )
          : h(children.componentName || 'div', {}, children.children);

        return h('div', {
          className: props.className || 'lowcode-temp',
          style: props.style || {},
        }, renderedChildren);
      };
    },
  });
}
