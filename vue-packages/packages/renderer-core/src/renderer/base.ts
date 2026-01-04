import { defineComponent, h, computed, ref, onMounted, onUpdated, onUnmounted, watch, inject, provide } from 'vue';
import adapter from '../adapter';
import { IBaseRenderComponent, IBaseRendererProps, IBaseRendererInstance, INodeInfo } from '../types';
import { IPublicTypeNodeSchema, IPublicTypeRootSchema } from '@vue3-engine/types';
import { parseData, parseProps, executeLifeCycleMethod, bindCustomMethods, generateCtx, initDataSource } from '../utils';
import logger from '../utils/logger';

export default function baseRendererFactory(): IBaseRenderComponent {
  const { Component, createElement } = adapter.getRuntime();

  return defineComponent({
    name: 'BaseRenderer',
    __namespace: 'base',
    setup(props: IBaseRendererProps, { expose, emit }) {
      const debug = logger.debug;
      const state = ref<any>({});
      const engineRenderError = ref(false);
      const error = ref<Error | null>(null);
      const context = inject<any>('appContext', {});
      const pageContext = inject<any>('pageContext', null);
      const compContext = inject<any>('compContext', null);

      // 内部状态
      const _ctx = ref<any>({});
      const _dataSource = ref<any>(null);
      const _lifecycleState = ref('init');
      const _thisRequiredInJSE = ref(props.thisRequiredInJSE !== false);

      // 获取 schema
      const schema = computed(() => props.__schema);

      // 获取组件信息
      const componentInfo = computed(() => {
        const { componentName } = schema.value;
        const components = props.__components || {};
        const Comp = components[componentName];
        return {
          Comp,
          componentName,
        };
      });

      // 获取组件 props
      const getComponentProps = (schema: IPublicTypeNodeSchema | undefined, scope: any, Comp: any, componentInfo?: any): any => {
        if (!schema) return {};
        
        const props: any = {};
        
        // 解析 props
        if (schema.props) {
          const parsedProps = parseProps(schema.props, scope, _ctx.value, _thisRequiredInJSE.value);
          Object.assign(props, parsedProps);
        }

        // 添加 className
        if (schema.props?.className) {
          props.className = schema.props.className;
        } else if (schema.props?.class) {
          props.className = schema.props.class;
        }

        // 添加 style
        if (schema.props?.style) {
          props.style = schema.props.style;
        }

        // 添加 id
        if (schema.props?.id) {
          props.id = schema.props.id;
        }

        return props;
      };

      // 创建虚拟 DOM
      const createVirtualDom = (schema: any, self: any, parentInfo: INodeInfo, idx: string | number): any => {
        if (!schema) return null;

        const { componentName } = schema;
        const components = props.__components || {};
        const Comp = components[componentName];

        if (!Comp) {
          logger.warn(`Component ${componentName} not found`);
          return null;
        }

        // 构建组件信息
        const nodeInfo: INodeInfo = {
          schema,
          Comp,
          componentInfo,
        };

        // 获取组件 props
        const compProps = getComponentProps(schema, self, Comp, componentInfo.value);

        // 处理 children
        let children: any = null;
        if (schema.children) {
          if (Array.isArray(schema.children)) {
            children = schema.children.map((child: any, i: number) => 
              createVirtualDom(child, self, nodeInfo, i)
            );
          } else {
            children = createVirtualDom(schema.children, self, nodeInfo, 0);
          }
        }

        return h(Comp, compProps, children);
      };

      // 渲染内容
      const renderContent = (children: any): any => {
        return children;
      };

      // 渲染组件
      const renderComp = (Comp: any, ctxProps: object): any => {
        return h(Comp, ctxProps);
      };

      // 初始化
      const __beforeInit = (props: IBaseRendererProps) => {
        debug(`base.__beforeInit - ${schema.value?.componentName}`);
      };

      const __init = (props: IBaseRendererProps) => {
        debug(`base.__init - ${schema.value?.componentName}`);
        
        // 生成上下文
        generateCtx(_ctx.value, props, {
          $: (filedId: string, instance?: any) => {
            // 获取字段值的方法
            return _ctx.value[filedId];
          },
          __getComponentProps: getComponentProps,
          __createVirtualDom: createVirtualDom,
          __renderContent: renderContent,
          __renderComp: renderComp,
        });

        // 绑定自定义方法
        if (schema.value?.methods) {
          bindCustomMethods(_ctx.value, schema.value.methods, props);
        }

        // 初始化数据源
        if (schema.value?.dataSource) {
          initDataSource(_dataSource.value, schema.value.dataSource, _ctx.value);
        }
      };

      const __afterInit = (props: IBaseRendererProps) => {
        debug(`base.__afterInit - ${schema.value?.componentName}`);
      };

      // 执行生命周期方法
      const __executeLifeCycleMethod = (method: string, args?: any[]) => {
        if (schema.value?.lifeCycles?.[method]) {
          executeLifeCycleMethod(schema.value.lifeCycles[method], _ctx.value, args);
        }
      };

      // 绑定自定义方法
      const __bindCustomMethods = (props: IBaseRendererProps) => {
        if (schema.value?.methods) {
          bindCustomMethods(_ctx.value, schema.value.methods, props);
        }
      };

      // 生成上下文
      const __generateCtx = (ctx: Record<string, any>) => {
        generateCtx(ctx, props, {
          $: (filedId: string, instance?: any) => {
            return ctx[filedId];
          },
        });
      };

      // 解析数据
      const __parseData = (data: any, ctx?: any): any => {
        return parseData(data, ctx || _ctx.value);
      };

      // 初始化数据源
      const __initDataSource = (props: IBaseRendererProps) => {
        if (schema.value?.dataSource) {
          initDataSource(_dataSource.value, schema.value.dataSource, _ctx.value);
        }
      };

      // 渲染
      const __render = () => {
        debug(`base.__render - ${schema.value?.componentName}`);
      };

      // 获取 ref
      const __getRef = (ref: any) => {
        debug(`base.__getRef - ${schema.value?.componentName}`);
        if (ref) {
          props.onCompGetRef?.(schema.value, ref);
        }
      };

      // 获取 schema 子节点虚拟 DOM
      const __getSchemaChildrenVirtualDom = (
        schema: IPublicTypeNodeSchema | undefined,
        Comp: any,
        nodeChildrenMap?: any
      ): any => {
        if (!schema?.children) return null;
        
        if (Array.isArray(schema.children)) {
          return schema.children.map((child: any, i: number) => 
            createVirtualDom(child, _ctx.value, { schema, Comp }, i)
          );
        }
        return createVirtualDom(schema.children, _ctx.value, { schema, Comp }, 0);
      };

      // 创建循环虚拟 DOM
      const __createLoopVirtualDom = (schema: any, self: any, parentInfo: INodeInfo, idx: number | string): any => {
        return createVirtualDom(schema, self, parentInfo, idx);
      };

      // 解析 props
      const __parseProps = (props: any, self: any, path: string, info: INodeInfo): any => {
        return parseProps(props, self, _ctx.value, _thisRequiredInJSE.value);
      };

      // 创建 DOM
      const __createDom = (): any => {
        const { Comp } = componentInfo.value;
        if (!Comp) return null;

        const compProps = getComponentProps(schema.value, _ctx.value, Comp, componentInfo.value);
        const children = __getSchemaChildrenVirtualDom(schema.value, Comp);

        return h(Comp, compProps, children);
      };

      // 重新加载数据源
      const reloadDataSource = async (): Promise<any> => {
        if (schema.value?.dataSource && _dataSource.value) {
          // 重新加载数据源
          debug(`base.reloadDataSource - ${schema.value?.componentName}`);
        }
      };

      // 检查 schema
      const __checkSchema = (schema: IPublicTypeNodeSchema | undefined, extraComponents?: string | string[]): any => {
        if (!schema) return null;
        const { componentName } = schema;
        const components = props.__components || {};
        const Comp = components[componentName];
        return Comp;
      };

      // 调试
      const __debug = (...args: any[]) => {
        debug(...args);
      };

      // 生命周期钩子
      onMounted(() => {
        __beforeInit(props);
        __init(props);
        __afterInit(props);
        __executeLifeCycleMethod('componentDidMount');
        debug(`base.onMounted - ${schema.value?.componentName}`);
      });

      onUpdated(() => {
        __executeLifeCycleMethod('componentDidUpdate');
        debug(`base.onUpdated - ${schema.value?.componentName}`);
      });

      onUnmounted(() => {
        __executeLifeCycleMethod('componentWillUnmount');
        debug(`base.onUnmounted - ${schema.value?.componentName}`);
      });

      // 监听 schema 变化
      watch(() => props.__schema, (newSchema, oldSchema) => {
        if (newSchema !== oldSchema) {
          __init(props);
        }
      }, { deep: true });

      // 暴露方法
      expose({
        state: state.value,
        __ctx: _ctx.value,
        __beforeInit,
        __init,
        __afterInit,
        __executeLifeCycleMethod,
        __bindCustomMethods,
        __generateCtx,
        __parseData,
        __initDataSource,
        __render,
        __getRef,
        __getSchemaChildrenVirtualDom,
        __createVirtualDom: createVirtualDom,
        __createLoopVirtualDom,
        __parseProps,
        __createDom,
        reloadDataSource,
        __checkSchema,
        __debug,
        $: (filedId: string, instance?: any) => _ctx.value[filedId],
      });

      // 渲染
      return () => {
        if (engineRenderError.value) {
          return h('div', {
            style: {
              padding: '20px',
              border: '1px solid red',
              color: 'red',
            },
          }, `渲染错误: ${error.value?.message || '未知错误'}`);
        }

        const { Comp } = componentInfo.value;
        if (!Comp) {
          return h('div', {
            style: {
              padding: '20px',
              border: '1px dashed #ccc',
              color: '#999',
            },
          }, `组件 ${schema.value?.componentName} 未找到`);
        }

        return __createDom();
      };
    },
  });
}
