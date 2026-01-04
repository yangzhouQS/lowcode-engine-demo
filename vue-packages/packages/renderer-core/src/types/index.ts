import type { Component, CSSProperties, VNode } from 'vue';
import type {
  IPublicTypeNodeSchema,
  IPublicTypeRootSchema,
  IPublicTypeJSONObject,
  IPublicTypeJSONValue,
  IPublicTypeCompositeValue,
} from '@vue3-engine/types';

export type ISchema = IPublicTypeNodeSchema | IPublicTypeRootSchema;

export interface IGeneralComponent<P = {}, S = {}> extends Component<P, S> {
  readonly props: Readonly<P> & Readonly<{ children?: any | undefined }>;
  state: Readonly<S>;
  refs: Record<string, any>;
  context: any;
  $forceUpdate(callback?: () => void): void;
  render(): any;
}

export type IGeneralConstructor<
  T = {
    [key: string]: any;
  },
  S = {
    [key: string]: any;
  }
> = new <TT = T, SS = S>(props: TT, context: any) => IGeneralComponent<TT, SS>;

export interface IHistoryLike {
  readonly action: any;
  readonly location: ILocationLike;
  createHref(to: any): string;
  push(to: any, state?: any): void;
  replace(to: any, state?: any): void;
  go(delta: any): void;
  back(): void;
  forward(): void;
  listen(listener: any): () => void;
  block(blocker: any): () => void;
}

export interface ILocationLike {
  pathname: any;
  search: any;
  state: any;
  hash: any;
  key?: any;
}

export type IRendererAppHelper = Partial<{
  utils: Record<string, any>;
  constants: Record<string, any>;
  location: ILocationLike;
  history: IHistoryLike;
  match: any;
  logParams: Record<string, any>;
  addons: Record<string, any>;
  requestHandlersMap: Record<string, any>;
}>;

export interface IRendererProps {
  schema: IPublicTypeRootSchema | IPublicTypeNodeSchema;
  components: Record<string, IGeneralComponent>;
  className?: string;
  style?: CSSProperties;
  id?: string | number;
  locale?: string;
  messages?: Record<string, any>;
  appHelper?: IRendererAppHelper;
  componentsMap?: { [key: string]: any };
  designMode?: string;
  suspended?: boolean;
  onCompGetRef?: (schema: IPublicTypeNodeSchema, ref: any) => void;
  onCompGetCtx?: (schema: IPublicTypeNodeSchema, ref: any) => void;
  getSchemaChangedSymbol?: () => boolean;
  setSchemaChangedSymbol?: (symbol: boolean) => void;
  customCreateElement?: (Component: any, props: any, children: any) => any;
  rendererName?: 'Vue3Renderer' | 'PageRenderer' | string;
  notFoundComponent?: IGeneralComponent;
  faultComponent?: IGeneralComponent;
  faultComponentMap?: {
    [prop: string]: IGeneralComponent;
  };
  device?: string;
  thisRequiredInJSE?: boolean;
  enableStrictNotFoundMode?: boolean;
}

export interface IRendererState {
  engineRenderError?: boolean;
  error?: Error;
}

export interface IBaseRendererProps {
  locale?: string;
  messages: Record<string, any>;
  __appHelper: IRendererAppHelper;
  __components: Record<string, any>;
  __ctx: Record<string, any>;
  __schema: IPublicTypeRootSchema;
  __host?: any;
  __container?: any;
  config?: Record<string, any>;
  designMode?: 'design';
  className?: string;
  style?: CSSProperties;
  id?: string | number;
  getSchemaChangedSymbol?: () => boolean;
  setSchemaChangedSymbol?: (symbol: boolean) => void;
  thisRequiredInJSE?: boolean;
  documentId?: string;
  getNode?: any;
  device?: 'default' | 'mobile' | string;
  componentName?: string;
}

export interface INodeInfo {
  schema?: IPublicTypeNodeSchema;
  Comp: any;
  componentInfo?: any;
  componentChildren?: any;
}

export interface JSExpression {
  type: string;
  value: string;
}

export interface DataSourceItem {
  id: string;
  isInit?: boolean | JSExpression;
  type?: string;
  options?: {
    uri: string | JSExpression;
    params?: IPublicTypeJSONObject | JSExpression;
    method?: string | JSExpression;
    shouldFetch?: string;
    willFetch?: string;
    fit?: string;
    didFetch?: string;
  };
  dataHandler?: JSExpression;
}

export interface DataSource {
  list?: DataSourceItem[];
  dataHandler?: JSExpression;
}

export interface IRuntime {
  [key: string]: any;
  Component: IGeneralConstructor;
  PureComponent: IGeneralConstructor;
  createElement: (...args: any) => VNode;
  createContext: (...args: any) => any;
  forwardRef: (...args: any) => any;
  findDOMNode: (...args: any) => any;
}

export interface IRendererModules {
  BaseRenderer?: IBaseRenderComponent;
  PageRenderer: IBaseRenderComponent;
  ComponentRenderer: IBaseRenderComponent;
  BlockRenderer?: IBaseRenderComponent;
  AddonRenderer?: IBaseRenderComponent;
  TempRenderer?: IBaseRenderComponent;
  DivRenderer?: IBaseRenderComponent;
}

export interface IBaseRendererContext {
  appHelper: IRendererAppHelper;
  components: Record<string, IGeneralComponent>;
  engine: IRuntime;
  pageContext?: IBaseRenderComponent;
  compContext?: IBaseRenderComponent;
}

export type IBaseRendererInstance = IGeneralComponent<
  IBaseRendererProps,
  Record<string, any>
> & {
  reloadDataSource(): Promise<any>;
  __beforeInit(props: IBaseRendererProps): void;
  __init(props: IBaseRendererProps): void;
  __afterInit(props: IBaseRendererProps): void;
  __executeLifeCycleMethod(method: string, args?: any[]): void;
  __bindCustomMethods(props: IBaseRendererProps): void;
  __generateCtx(ctx: Record<string, any>): void;
  __parseData(data: any, ctx?: any): any;
  __initDataSource(props: IBaseRendererProps): void;
  __render(): void;
  __getRef(ref: any): void;
  __getSchemaChildrenVirtualDom(
    schema: IPublicTypeNodeSchema | undefined,
    Comp: any,
    nodeChildrenMap?: any
  ): any;
  __getComponentProps(schema: IPublicTypeNodeSchema | undefined, scope: any, Comp: any, componentInfo?: any): any;
  __createDom(): any;
  __createVirtualDom(schema: any, self: any, parentInfo: INodeInfo, idx: string | number): any;
  __createLoopVirtualDom(schema: any, self: any, parentInfo: INodeInfo, idx: number | string): any;
  __parseProps(props: any, self: any, path: string, info: INodeInfo): any;
  __initDebug?(): void;
  __debug(...args: any[]): void;
  __renderContextProvider(customProps?: object, children?: any): any;
  __renderContextConsumer(children: any): any;
  __renderContent(children: any): any;
  __checkSchema(schema: IPublicTypeNodeSchema | undefined, extraComponents?: string | string[]): any;
  __renderComp(Comp: any, ctxProps: object): any;
  $(filedId: string, instance?: any): any;
};

export interface IBaseRenderComponent {
  new(
    props: IBaseRendererProps,
    context: any
  ): IBaseRendererInstance;
}

export interface IRenderComponent {
  displayName: string;
  defaultProps: IRendererProps;
  findDOMNode: (...args: any) => any;

  new(props: IRendererProps, context: any): IGeneralComponent<IRendererProps, IRendererState> & {
    [x: string]: any;
    __getRef: (ref: any) => void;
    onMounted?(): Promise<void> | void;
    onUpdated?(): Promise<void> | void;
    onUnmounted?(): Promise<void> | void;
    onError?(e: any): Promise<void> | void;
    isValidComponent(SetComponent: any): any;
    createElement(SetComponent: any, props: any, children?: any): any;
    getNotFoundComponent(): any;
    getFaultComponent(): any;
  };
}
