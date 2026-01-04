import { defineComponent, h, computed, ref, onMounted, onUpdated, onUnmounted, onErrorCaptured } from 'vue';
import adapter from '../adapter';
import contextFactory from '../context';
import { isFileSchema, isEmpty } from '../utils';
import divFactory from '../components/Div';
import visualDomFactory from '../components/VisualDom';
import { IRenderComponent, IRendererProps, IRendererState } from '../types';
import { IPublicTypeNodeSchema, IPublicTypeRootSchema } from '@vue3-engine/types';
import logger from '../utils/logger';

export default function rendererFactory(): IRenderComponent {
  const { Component, createElement } = adapter.getRuntime();
  const RENDERER_COMPS: any = adapter.getRenderers();
  const BaseRenderer = baseRendererFactory();
  const AppContext = contextFactory();
  const Div = divFactory();
  const VisualDom = visualDomFactory();

  const ConfigProvider = adapter.getConfigProvider() || Div;

  const debug = logger.debug;

  class FaultComponent extends Component<any, any> {
    render() {
      logger.error(`%c${this.props.componentName || ''} 组件渲染异常, 异常原因: ${this.props.error?.message || this.props.error || '未知'}`, 'color: #ff0000;');
      return createElement(Div, {
        style: {
          width: '100%',
          height: '50px',
          lineHeight: '50px',
          textAlign: 'center',
          fontSize: '15px',
          color: '#ff0000',
          border: '2px solid #ff0000',
        },
      }, `${this.props.componentName || ''} 组件渲染异常，请查看控制台日志`);
    }
  }

  class NotFoundComponent extends Component<{
    componentName: string;
  } & IRendererProps> {
    render() {
      if (this.props.enableStrictNotFoundMode) {
        return `${this.props.componentName || ''} Component Not Found`;
      }
      return createElement(Div, this.props, this.props.children || `${this.props.componentName || ''} Component Not Found`);
    }
  }

  return class Renderer extends Component<IRendererProps, IRendererState> {
    static displayName = 'Renderer';

    static defaultProps: IRendererProps = {
      appHelper: undefined,
      components: {},
      designMode: '',
      suspended: false,
      schema: {} as IPublicTypeRootSchema,
      onCompGetRef: () => { },
      onCompGetCtx: () => { },
      thisRequiredInJSE: true,
    };

    static findDOMNode = adapter.getRuntime().findDOMNode;

    __ref: any;

    constructor(props: IRendererProps) {
      super(props);
      debug(`entry.constructor - ${props?.schema?.componentName}`);
    }

    onMounted() {
      debug(`entry.onMounted - ${this.props.schema && this.props.schema.componentName}`);
    }

    onUpdated() {
      debug(`entry.onUpdated - ${this.props?.schema?.componentName}`);
    }

    onUnmounted() {
      debug(`entry.onUnmounted - ${this.props?.schema?.componentName}`);
    }

    onErrorCaptured(error: Error) {
      this.engineRenderError = true;
      this.error = error;
    }

    shouldComponentUpdate(nextProps: IRendererProps) {
      return !nextProps.suspended;
    }

    __getRef = (ref: any) => {
      this.__ref = ref;
      if (ref) {
        this.props.onCompGetRef?.(this.props.schema, ref);
      }
    };

    isValidComponent(SetComponent: any) {
      return SetComponent;
    }

    createElement(SetComponent: any, props: any, children?: any) {
      return (this.props.customCreateElement || createElement)(SetComponent, props, children);
    }

    getNotFoundComponent() {
      return this.props.notFoundComponent || NotFoundComponent;
    }

    getFaultComponent() {
      const { faultComponent, faultComponentMap, schema } = this.props;
      if (faultComponentMap) {
        const { componentName } = schema;
        return faultComponentMap[componentName] || faultComponent || FaultComponent;
      }
      return faultComponent || FaultComponent;
    }

    getComp() {
      const { schema, components } = this.props;
      const { componentName } = schema;
      const allComponents = { ...RENDERER_COMPS, ...components };
      let Comp = allComponents[componentName] || RENDERER_COMPS[`${componentName}Renderer`];
      if (Comp && Comp.prototype) {
        if (!(Comp.prototype instanceof BaseRenderer)) {
          Comp = RENDERER_COMPS[`${componentName}Renderer`];
        }
      }
      return Comp;
    }

    render() {
      const { schema, designMode, appHelper, components } = this.props;
      if (isEmpty(schema)) {
        return null;
      }
      // 兼容乐高区块模板
      if (schema.componentName !== 'Div' && !isFileSchema(schema)) {
        logger.error('The root component name needs to be one of Page、Block、Component, please check schema: ', schema);
        return '模型结构异常';
      }
      debug('entry.render');
      const allComponents = { ...RENDERER_COMPS, ...components };
      let Comp = this.getComp();

      if (this.engineRenderError) {
        return createElement(this.getFaultComponent(), {
          ...this.props,
          error: this.error,
        });
      }

      if (Comp) {
        return createElement(AppContext.Provider, {
          value: {
            appHelper,
            components: allComponents,
            engine: this,
          },
        }, createElement(ConfigProvider, {
          device: this.props.device,
          locale: this.props.locale,
        }, createElement(Comp, {
          key: schema.__ctx && `${schema.__ctx.lceKey}_${schema.__ctx.idx || '0'}`,
          ref: this.__getRef,
          __appHelper: appHelper,
          __components: allComponents,
          __schema: schema,
          __designMode: designMode,
          ...this.props,
        })));
      }
      return null;
    }
  };
}
