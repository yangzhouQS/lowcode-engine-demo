import { createApp, defineComponent, h } from 'vue';
import {
  adapter,
  pageRendererFactory,
  componentRendererFactory,
  blockRendererFactory,
  addonRendererFactory,
  tempRendererFactory,
  rendererFactory,
  types,
} from '@vue3-engine/renderer-core';

// 设置全局 Vue 实例
if (typeof window !== 'undefined') {
  (window as any).Vue = { createApp, defineComponent, h };
}

// 设置运行时
adapter.setRuntime({
  Component: defineComponent,
  PureComponent: defineComponent,
  createElement: h,
  createContext: adapter.getRuntime().createContext,
  forwardRef: adapter.getRuntime().forwardRef,
  findDOMNode: adapter.getRuntime().findDOMNode,
});

// 设置渲染器
adapter.setRenderers({
  PageRenderer: pageRendererFactory(),
  ComponentRenderer: componentRendererFactory(),
  BlockRenderer: blockRendererFactory(),
  AddonRenderer: addonRendererFactory(),
  TempRenderer: tempRendererFactory(),
  DivRenderer: blockRendererFactory(),
});

// 设置配置提供者（可选）
adapter.setConfigProvider(null);

function factory(): types.IRenderComponent {
  const Renderer = rendererFactory();
  return class Vue3Renderer extends Renderer implements types.IGeneralComponent {
    readonly props: types.IRendererProps;

    context: any;

    $forceUpdate: (callback?: () => void) => void;

    refs: {
      [key: string]: any;
    };

    constructor(props: types.IRendererProps, context: any) {
      super(props, context);
      this.props = props;
      this.context = context;
      this.refs = {};
    }

    isValidComponent(obj: any) {
      return obj && typeof obj === 'object' && obj.__vccOpts !== undefined;
    }
  };
}

export default factory();
