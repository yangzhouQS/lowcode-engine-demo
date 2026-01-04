import { defineComponent, ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { debounce } from '../utils/common';
import adapter from '../adapter';
import * as types from '../types/index';
import logger from '../utils/logger';

export interface IComponentHocInfo {
  schema: any;
  baseRenderer: types.IBaseRendererInstance;
  componentInfo: any;
  scope: any;
}

export interface IComponentHocProps {
  __tag: any;
  componentId: any;
  _leaf: any;
  forwardedRef?: any;
}

export interface IComponentHocState {
  childrenInState: boolean;
  nodeChildren: any;
  nodeCacheProps: any;
  visible: boolean;
  condition: boolean;
  nodeProps: any;
}

type DesignMode = 'design' | 'preview' | 'live';

export interface IComponentHoc {
  designMode: DesignMode | DesignMode[];
  hoc: any;
}

export type IComponentConstruct = (Comp: types.IBaseRenderComponent, info: IComponentHocInfo) => any;

interface IProps {
  _leaf: any;
  visible: boolean;
  componentId: number;
  children?: any[];
  __tag: number;
  forwardedRef?: any;
}

enum RenderType {
  All = 'All',
  ChildChanged = 'ChildChanged',
  PropsChanged = 'PropsChanged',
  VisibleChanged = 'VisibleChanged',
  MinimalRenderUnit = 'MinimalRenderUnit',
}

class LeafCache {
  component = new Map();
  state = new Map();
  event = new Map();
  ref = new Map();

  constructor(public documentId: string, public device: string) {}
}

let cache: LeafCache;

function initRenderEvent({
  schema,
  __debug,
  container,
  getNode,
}: any) {
  const leaf = getNode?.(schema.id);
  if (!leaf
    || cache.event.get(schema.id)?.clear
    || leaf === cache.event.get(schema.id)
  ) {
    return;
  }
  cache.event.get(schema.id)?.dispose.forEach((disposeFn: any) => disposeFn && disposeFn());
  const debounceRender = debounce(() => {
    container.rerender();
  }, 20);
  cache.event.set(schema.id, {
    clear: false,
    leaf,
    dispose: [
      leaf?.onPropChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onPropsChange make rerender`);
        debounceRender();
      }),
      leaf?.onChildrenChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onChildrenChange make rerender`);
        debounceRender();
      }),
      leaf?.onVisibleChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onVisibleChange make rerender`);
        debounceRender();
      }),
    ],
  });
}

function clearRenderEvent(id: string): void {
  if (cache.event.get(id)?.clear) {
    return;
  }
  cache.event.get(id)?.dispose?.forEach((disposeFn: any) => disposeFn && disposeFn());
  cache.event.set(id, {
    clear: true,
    dispose: [],
  });
}

export function leafWrapper(Comp: types.IBaseRenderComponent, {
  schema,
  baseRenderer,
  componentInfo,
  scope,
}: IComponentHocInfo) {
  const {
    __debug,
    __getComponentProps: getProps,
    __getSchemaChildrenVirtualDom: getChildren,
    __parseData,
  } = baseRenderer;
  const { engine } = baseRenderer.context;
  const host = baseRenderer.props?.__host;
  const curDocumentId = baseRenderer.props?.documentId ?? '';
  const curDevice = baseRenderer.props?.device ?? '';
  const getNode = baseRenderer.props?.getNode;
  const container = baseRenderer.props?.__container;
  const setSchemaChangedSymbol = baseRenderer.props?.setSchemaChangedSymbol;
  const editor = host?.designer?.editor;
  const runtime = adapter.getRuntime();
  const { forwardRef, createElement } = runtime;
  const Component = runtime.Component;

  const componentCacheId = schema.id;

  if (!cache || (curDocumentId && curDocumentId !== cache.documentId) || (curDevice && curDevice !== cache.device)) {
    cache?.event.forEach(event => {
      event.dispose?.forEach((disposeFn: any) => disposeFn && disposeFn());
    });
    cache = new LeafCache(curDocumentId, curDevice);
  }

  initRenderEvent({
    schema,
    __debug,
    container,
    getNode,
  });

  const LeafHoc = defineComponent({
    name: schema.componentName,
    setup(props: IProps, { expose }) {
      const recordInfo = ref<{
        startTime?: number | null;
        type?: string;
        node?: any;
      }>({});

      const curEventLeaf = ref<any>(undefined);
      const disposeFunctions = ref<Array<() => void>>([]);

      const visible = ref<boolean>(true);
      const condition = ref<boolean>(true);
      const nodeChildren = ref<any>(null);
      const nodeProps = ref<any>({});
      const childrenInState = ref<boolean>(false);

      const autoRepaintNode = computed(() => container?.autoRepaintNode);

      const makeUnitRenderDebounced = debounce(() => {
        beforeRender(RenderType.MinimalRenderUnit);
        const parsedSchema = schema?.export?.();
        if (!parsedSchema) {
          return;
        }
        const nextProps = getProps(parsedSchema, scope, Comp, componentInfo);
        const children = getChildren(parsedSchema, scope, Comp);
        const nextState = {
          nodeProps: nextProps,
          nodeChildren: children,
          childrenInState: true,
        };
        if ('children' in nextProps) {
          nextState.nodeChildren = nextProps.children;
        }

        __debug(`${curEventLeaf.value?.componentName}(${props.componentId}) MinimalRenderUnit Render!`);
        Object.assign(nodeProps.value, nextProps);
        nodeChildren.value = children;
        childrenInState.value = true;
      }, 20);

      const beforeRender = (type: string, node?: any): void => {
        recordInfo.value.startTime = Date.now();
        recordInfo.value.type = type;
        recordInfo.value.node = node;
        setSchemaChangedSymbol?.(true);
      };

      const recordTime = () => {
        if (!recordInfo.value.startTime) {
          return;
        }
        const endTime = Date.now();
        const nodeCount = host?.designer?.currentDocument?.getNodeCount?.();
        const componentName = recordInfo.value.node?.componentName || curEventLeaf.value?.componentName || 'UnknownComponent';
        editor?.eventBus?.emit?.('Node.Render', {
          componentName,
          time: endTime - recordInfo.value.startTime,
          type: recordInfo.value.type,
          nodeCount,
        });
        recordInfo.value.startTime = null;
      };

      const makeUnitRender = () => {
        makeUnitRenderDebounced();
      };

      const getLeaf = () => {
        if (props._leaf?.isMock) {
          return undefined;
        }
        return getNode?.(componentCacheId);
      };

      onMounted(() => {
        const _leaf = getLeaf();
        curEventLeaf.value = _leaf;
        initOnPropsChangeEvent(_leaf.value);
        initOnChildrenChangeEvent(_leaf.value);
        initOnVisibleChangeEvent(_leaf.value);
        recordTime();
      });

      onUnmounted(() => {
        disposeFunctions.value.forEach(fn => fn());
      });

      watch(() => props.componentId, (newComponentId, oldComponentId) => {
        if (props.__tag === oldComponentId) {
          return null;
        }

        const _leaf = getNode?.(newComponentId);
        if (_leaf && curEventLeaf.value && _leaf !== curEventLeaf.value) {
          disposeFunctions.value.forEach((fn) => fn());
          disposeFunctions.value = [];
          initOnPropsChangeEvent(_leaf.value);
          initOnChildrenChangeEvent(_leaf.value);
          initOnVisibleChangeEvent(_leaf.value);
          curEventLeaf.value = _leaf;
        }

        const {
          visible: newVisible,
          condition: newCondition,
        } = props.__inner__ || _leaf?.export?.() || {};
        visible.value = !newVisible;
        condition.value = __parseData?.(newCondition, scope);
      }, { deep: true });

      const initOnPropsChangeEvent = (leaf: any): void => {
        const handlePropsChange = debounce((propChangeInfo: any) => {
          const { key, newValue = null } = propChangeInfo;
          const node = leaf;

          if (key === '___condition___') {
            const { condition = true } = leaf?.export?.() || {};
            const conditionValue = __parseData?.(condition, scope);
            __debug(`key is ___condition___, change condition value to [${condition}]`);
            this.condition = conditionValue;
            return;
          }

          if (key === '___loop___') {
            __debug('key is ___loop___, render a page!');
            container?.rerender();
            cache.component.delete(componentCacheId);
            return;
          }

          beforeRender(RenderType.PropsChanged);
          const { state } = { visible: visible.value, condition: condition.value };
          const nodePropsValue = getProps(node?.export?.(), scope, Comp, componentInfo);
          
          if (key && !(key in nodePropsValue) && (key in props)) {
            nodePropsValue[key] = newValue;
          }

          __debug(`${leaf?.componentName}[${props.componentId}] component trigger onPropsChange!`, nodePropsValue);
          Object.assign(nodeProps.value, nodePropsValue);
          nodeChildren.value = getChildren(node?.export?.(), scope, Comp);
          childrenInState.value = true;
          judgeMiniUnitRender();
        });

        const dispose = leaf?.onPropChange?.((propChangeInfo: any) => {
          if (!autoRepaintNode.value) {
            return;
          }
          handlePropsChange(propChangeInfo);
        });

        dispose && disposeFunctions.value.push(dispose);
      };

      const initOnChildrenChangeEvent = (leaf: any): void => {
        const dispose = leaf?.onChildrenChange?.((param: any): void => {
          if (!autoRepaintNode.value) {
            return;
          }
          const { type, node } = param || {};
          beforeRender(`${RenderType.ChildChanged}-${type}`, node);
          const nextChild = getChildren(leaf?.export?.(), scope, Comp);
          __debug(`${leaf?.componentName}[${props.componentId}] component trigger onChildrenChange event`, nextChild);
          nodeChildren.value = nextChild;
          childrenInState.value = true;
          judgeMiniUnitRender();
        });

        dispose && disposeFunctions.value.push(dispose);
      };

      const initOnVisibleChangeEvent = (leaf: any): void => {
        const dispose = leaf?.onVisibleChange?.((flag: boolean) => {
          if (!autoRepaintNode.value) {
            return;
          }
          if (visible.value === flag) {
            return;
          }

          __debug(`${leaf?.componentName}[${props.componentId}] component trigger onVisibleChange(${flag}) event`);
          beforeRender(RenderType.VisibleChanged);
          visible.value = flag;
          judgeMiniUnitRender();
        });

        dispose && disposeFunctions.value.push(dispose);
      };

      const hasChildren = () => {
        if (!childrenInState.value) {
          return 'children' in props;
        }
        return true;
      };

      const getDefaultState = (nextProps: any) => {
        const { hidden = false, condition = true } = nextProps.__inner__ || getLeaf()?.export?.() || {};
        return {
          nodeChildren: null,
          childrenInState: false,
          visible: !hidden,
          condition: __parseData?.(condition, scope),
          nodeCacheProps: {},
          nodeProps: {},
        };
      };

      expose({
        state: {
          visible,
          condition,
          nodeChildren,
          nodeProps,
          childrenInState,
        },
        __getComponentProps: getProps,
        __getSchemaChildrenVirtualDom: getChildren,
        __parseData,
        __render: () => {
          if (!visible.value || !condition.value) {
            return null;
          }

          const { forwardedRef, ...rest } = props;
          const compProps = {
            ...rest,
            ...nodeProps.value,
            ...{ nodeChildren: nodeChildren.value },
            children: [],
            __id: props.componentId,
            ref: forwardedRef,
          };

          delete compProps.__inner__;

          if (hasChildren()) {
            return createElement(Comp, compProps, () => nodeChildren.value);
          }

          return createElement(Comp, compProps);
        },
        $: (filedId: string) => nodeProps.value[filedId],
      });

      return () => {
        const { forwardedRef, ...rest } = props;
        const compProps = {
          ...rest,
          ...nodeProps.value,
          ...{ nodeChildren: nodeChildren.value },
          children: [],
          __id: props.componentId,
          ref: forwardedRef,
        };

        delete compProps.__inner__;

        if (hasChildren()) {
          return createElement(Comp, compProps, () => nodeChildren.value);
        }

        return createElement(Comp, compProps);
      };
    },
  });

  const LeafWrapper = cloneEnumerableProperty(
    forwardRef((props: any, ref: any) => {
      return createElement(LeafHoc, {
        ...props,
        forwardedRef: ref,
      });
    }),
    Comp,
  );

  cache.component.set(componentCacheId, {
    LeafWrapper,
    Comp,
  });

  return LeafWrapper;
}
