import { defineComponent, h, provide } from 'vue';
import baseRendererFactory from './base';
import { IBaseRenderComponent } from '../../types';
import { IPublicTypeNodeSchema } from '@vue3-engine/types';

export default function blockRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();

  return defineComponent({
    name: 'BlockRenderer',
    __namespace: 'block',
    setup(props: any, { expose }) {
      // 提供块级别的上下文
      provide('compContext', {
        ...BaseRenderer.setup(props, { expose }),
      });

      return () => {
        const baseMethods = BaseRenderer.setup(props, { expose });
        expose(baseMethods);

        // Block 渲染器渲染其子节点
        const schema = props.__schema as IPublicTypeNodeSchema;
        if (!schema || !schema.children) {
          return null;
        }

        // 渲染子节点
        const children = Array.isArray(schema.children)
          ? schema.children.map((child: any, i: number) =>
              h(child.componentName || 'div', { key: i }, child.children)
            )
          : h(schema.children.componentName || 'div', {}, schema.children.children);

        return h('div', {
          className: props.className || '',
          style: props.style || {},
        }, children);
      };
    },
  });
}
