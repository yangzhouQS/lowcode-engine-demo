import { defineComponent, h, inject } from 'vue';
import baseRendererFactory from './base';
import { IBaseRenderComponent } from '../../types';

export default function pageRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  
  return defineComponent({
    name: 'PageRenderer',
    __namespace: 'page',
    setup(props, { expose }) {
      return () => {
        const context = inject('renderer-context');
        expose({
          ...BaseRenderer.setup(props, { expose }),
        });
      };
    },
  });
}
