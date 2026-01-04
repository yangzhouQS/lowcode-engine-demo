import { defineComponent } from 'vue';
import baseRendererFactory from './base';
import { IBaseRenderComponent } from '../../types';

export default function componentRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  
  return defineComponent({
    name: 'ComponentRenderer',
    __namespace: 'component',
    setup(props, { expose }) {
      return () => {
        expose({
          ...BaseRenderer.setup(props, { expose }),
        });
      };
    },
  });
}
