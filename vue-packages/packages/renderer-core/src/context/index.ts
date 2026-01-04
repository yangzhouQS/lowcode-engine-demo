import { defineComponent, inject, provide, InjectionKey } from 'vue';

export interface IBaseRendererContext {
  appHelper: any;
  components: Record<string, any>;
  engine: any;
  pageContext?: any;
  compContext?: any;
}

const contextKey: InjectionKey<IBaseRendererContext> = Symbol('renderer-context');

export function contextFactory() {
  return {
    key: contextKey,
    Provider: defineComponent({
      name: 'RendererContextProvider',
      setup(props, { slots }) {
        provide(contextKey, props);
        return () => slots.default?.();
      },
    }),
    Consumer: defineComponent({
      name: 'RendererContextConsumer',
      setup(_, { slots }) {
        const context = inject(contextKey);
        return () => slots.default?.(context);
      },
    }),
  };
}

export default contextFactory;
