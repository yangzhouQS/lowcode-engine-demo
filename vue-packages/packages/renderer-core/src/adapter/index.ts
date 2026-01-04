import { Component, defineComponent, h, createVNode, VNode } from 'vue';

export interface IRuntime {
  Component: typeof Component;
  PureComponent: typeof Component;
  createElement: (...args: any) => VNode;
  createContext: (...args: any) => any;
  forwardRef: (...args: any) => any;
  findDOMNode: (...args: any) => any;
}

export interface IAdapter {
  getRuntime(): IRuntime;
  getRenderers(): any;
  getConfigProvider(): any;
}

class Vue3Adapter implements IAdapter {
  private runtime: IRuntime;
  private renderers: any = {};

  constructor() {
    this.runtime = {
      Component: defineComponent,
      PureComponent: defineComponent,
      createElement: h,
      createContext: this.createContext.bind(this),
      forwardRef: this.forwardRef.bind(this),
      findDOMNode: this.findDOMNode.bind(this),
    };
  }

  private createContext(defaultValue?: any) {
    const key = Symbol('context');
    return {
      key,
      Provider: defineComponent({
        name: 'ContextProvider',
        setup(_, { slots }) {
          return () => slots.default?.();
        },
      }),
      Consumer: defineComponent({
        name: 'ContextConsumer',
        setup(_, { slots }) {
          return () => slots.default?.();
        },
      }),
    };
  }

  private forwardRef(render: any) {
    return defineComponent({
      setup(props, { expose }) {
        const ref = render(props);
        expose(ref);
        return () => ref;
      },
    });
  }

  private findDOMNode(componentInstance: any): Element | null {
    if (componentInstance && componentInstance.$el) {
      return componentInstance.$el;
    }
    return null;
  }

  getRuntime(): IRuntime {
    return this.runtime;
  }

  getRenderers(): any {
    return this.renderers;
  }

  setRenderers(renderers: any): void {
    this.renderers = renderers;
  }

  getConfigProvider(): any {
    return null;
  }

  setConfigProvider(provider: any): void {
    // Config provider can be set here
  }

  setRuntime(runtime: Partial<IRuntime>): void {
    this.runtime = { ...this.runtime, ...runtime };
  }
}

const adapter = new Vue3Adapter();

export default adapter;
