# BaseRenderer - 基础渲染器

## 功能概述

[`renderer/base.tsx`](../../packages/renderer-core/src/renderer/base.tsx) 是基础渲染器（BaseRenderer），提供了低代码渲染器的核心功能。它是所有渲染器的基类，负责将低代码协议的 Schema 转换为 React/Rax 组件并渲染到画布上。BaseRenderer 提供了完整的渲染能力，包括组件渲染、页面渲染、区块渲染、插件渲染等。

## 主要功能

1. **Schema 解析**：解析低代码协议的 Schema
2. **组件渲染**：渲染各种类型的组件
3. **生命周期管理**：支持组件生命周期方法
4. **数据源管理**：支持数据源的加载和管理
5. **国际化支持**：支持多语言国际化
6. **表达式解析**：支持 JS 表达式和函数的解析
7. **错误处理**：提供错误组件，处理渲染异常
8. **样式管理**：支持 CSS 样式的动态注入
9. **设计模式**：支持 live、design、preview 等设计模式
10. **循环渲染**：支持循环渲染
11. **条件渲染**：支持条件渲染
12. **插槽渲染**：支持插槽渲染

## 核心类型和接口

### IBaseRendererProps

基础渲染器属性接口，定义了基础渲染器的所有属性。

```typescript
export interface IBaseRendererProps extends IRendererProps {
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
  rendererName?: 'LowCodeRenderer' | 'PageRenderer' | string;
  notFoundComponent?: IGeneralComponent;
  faultComponent?: IGeneralComponent;
  faultComponentMap?: {
    [prop: string]: IGeneralComponent;
  };
  device?: string;
  thisRequiredInJSE?: boolean;
  enableStrictNotFoundMode?: boolean;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| schema | IPublicTypeRootSchema \| IPublicTypeNodeSchema | Schema 配置 |
| components | Record<string, IGeneralComponent> | 组件映射 |
| className | string | 类名 |
| style | CSSProperties | 样式对象 |
| id | string \| number | 组件 ID |
| locale | string | 当前语言 |
| messages | Record<string, any> | 国际化消息 |
| appHelper | IRendererAppHelper | 应用助手 |
| componentsMap | { [key: string]: any } | 组件映射 |
| designMode | string | 设计模式（live/design/preview） |
| suspended | boolean | 是否挂起 |
| onCompGetRef | (schema, ref) => void | 组件获取引用回调 |
| onCompGetCtx | (schema, ref) => void | 组件获取上下文回调 |
| getSchemaChangedSymbol | () => boolean | 获取 Schema 变化标识 |
| setSchemaChangedSymbol | (symbol: boolean) => void | 设置 Schema 变化标识 |
| customCreateElement | (Component, props, children) => any | 自定义创建元素 |
| rendererName | 'LowCodeRenderer' \| 'PageRenderer' \| string | 渲染器名称 |
| notFoundComponent | IGeneralComponent | 未找到组件 |
| faultComponent | IGeneralComponent | 错误组件 |
| faultComponentMap | { [prop: string]: IGeneralComponent } | 错误组件映射 |
| device | string | 设备类型 |
| thisRequiredInJSE | boolean | JS 表达式中是否需要 this |
| enableStrictNotFoundMode | boolean | 是否启用严格未找到模式 |

### IBaseRendererState

基础渲染器状态接口，定义了基础渲染器的所有状态。

```typescript
export interface IBaseRendererState {
  locale: string;
  messages: Record<string, any>;
  schemaChanged: boolean;
  dataSource: any;
  error: Error | null;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| locale | string | 当前语言 |
| messages | Record<string, any> | 国际化消息 |
| schemaChanged | boolean | Schema 是否变化 |
| dataSource | any | 数据源 |
| error | Error \| null | 错误信息 |

### IBaseRendererInstance

基础渲染器实例接口，定义了基础渲染器的所有方法。

```typescript
export interface IBaseRendererInstance extends IGeneralComponent<
  IBaseRendererProps,
  IBaseRendererState,
  any
> {
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
}
```

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| reloadDataSource | - | Promise<any> | 重新加载数据源 |
| __beforeInit | props: IBaseRendererProps | void | 初始化前调用 |
| __init | props: IBaseRendererProps | void | 初始化 |
| __afterInit | props: IBaseRendererProps | void | 初始化后调用 |
| __executeLifeCycleMethod | method: string, args?: any[] | void | 执行生命周期方法 |
| __bindCustomMethods | props: IBaseRendererProps | void | 绑定自定义方法 |
| __generateCtx | ctx: Record<string, any> | void | 生成上下文 |
| __parseData | data: any, ctx?: any | any | 解析数据 |
| __initDataSource | props: IBaseRendererProps | void | 初始化数据源 |
| __render | - | void | 渲染 |
| __getRef | ref: any | void | 获取引用 |
| __getSchemaChildrenVirtualDom | schema, Comp, nodeChildrenMap? | any | 获取 Schema 子元素虚拟 DOM |
| __getComponentProps | schema, scope, Comp, componentInfo? | any | 获取组件属性 |
| __createDom | - | any | 创建 DOM |
| __createVirtualDom | schema, self, parentInfo, idx | any | 创建虚拟 DOM |
| __createLoopVirtualDom | schema, self, parentInfo, idx | any | 创建循环虚拟 DOM |
| __parseProps | props, self, path, info | any | 解析属性 |
| __initDebug | - | void | 初始化调试 |
| __debug | ...args: any[] | void | 调试 |
| __renderContextProvider | customProps?, children? | any | 渲染上下文 Provider |
| __renderContextConsumer | children | any | 渲染上下文 Consumer |
| __renderContent | children | any | 渲染内容 |
| __checkSchema | schema, extraComponents? | any | 检查 Schema |
| __renderComp | Comp, ctxProps | any | 渲染组件 |
| $ | filedId: string, instance? | any | 获取字段值 |

### INodeInfo

节点信息接口，定义了节点的信息。

```typescript
export interface INodeInfo {
  parent: any;
  item?: any;
  index?: number;
  path?: string;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| parent | any | 父节点 |
| item | any | 当前项 |
| index | number | 索引 |
| path | string | 路径 |

## 核心类

### BaseRenderer

基础渲染器类，提供了低代码渲染器的核心功能。

```typescript
export class LowCodeRenderer extends React.Component<IBaseRendererProps, IBaseRendererState> {
  static displayName = 'LowCodeRenderer';

  static contextType = RendererContext;

  static defaultProps: Partial<IBaseRendererProps> = {
    designMode: 'live',
    suspended: false,
    thisRequiredInJSE: true,
    enableStrictNotFoundMode: false,
  };

  constructor(props: IBaseRendererProps, context: any) {
    super(props, context);
    this.state = {
      locale: props.locale || context?.locale || 'zh-CN',
      messages: props.messages || context?.messages || {},
      schemaChanged: false,
      dataSource: null,
      error: null,
    };
    this.__beforeInit(props);
    this.__init(props);
    this.__afterInit(props);
  }

  componentDidMount() {
    this.__executeLifeCycleMethod('componentDidMount');
  }

  componentDidUpdate(prevProps: IBaseRendererProps, prevState: IBaseRendererState) {
    this.__executeLifeCycleMethod('componentDidUpdate', [prevProps, prevState]);
  }

  componentWillUnmount() {
    this.__executeLifeCycleMethod('componentWillUnmount');
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ error });
    this.__executeLifeCycleMethod('componentDidCatch', [error, errorInfo]);
  }

  render() {
    const { error } = this.state;
    const { faultComponent, faultComponentMap } = this.props;

    if (error) {
      const FaultComponent = faultComponent || faultComponentMap?.['default'];
      if (FaultComponent) {
        return <FaultComponent error={error} />;
      }
      return <div className="lowcode-renderer-error">{error.message}</div>;
    }

    return this.__renderContextProvider(
      {},
      this.__renderContent(this.__render())
    );
  }

  public reloadDataSource(): Promise<any> {
    return this.__dataSource?.reload() || Promise.resolve();
  }

  public $(filedId: string, instance?: any): any {
    if (!instance) {
      instance = this;
    }
    if (instance.__fieldId === filedId) {
      return instance;
    }
    if (instance.__children) {
      for (let i = 0; i < instance.__children.length; i++) {
        const result = this.$(filedId, instance.__children[i]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  private __beforeInit(props: IBaseRendererProps): void {
    // 初始化前调用
  }

  private __init(props: IBaseRendererProps): void {
    this.__bindCustomMethods(props);
    this.__generateCtx(this.__ctx);
    this.__initDataSource(props);
  }

  private __afterInit(props: IBaseRendererProps): void {
    // 初始化后调用
  }

  private __executeLifeCycleMethod(method: string, args?: any[]): void {
    const { schema } = this.props;
    const lifeCycles = schema.lifeCycles || {};
    const lifecycle = lifeCycles[method];
    if (typeof lifecycle === 'function') {
      lifecycle.apply(this, args || []);
    }
  }

  private __bindCustomMethods(props: IBaseRendererProps): void {
    const { schema, thisRequiredInJSE } = props;
    const methods = schema.methods || {};
    const thisRequired = thisRequiredInJSE !== false;

    Object.keys(methods).forEach((key) => {
      const method = methods[key];
      if (typeof method === 'function') {
        this[key] = (...args: any[]) => {
          return method.apply(thisRequired ? this : null, args);
        };
      }
    });
  }

  private __generateCtx(ctx: Record<string, any>): void {
    const { appHelper, schema } = this.props;
    this.__ctx = {
      ...ctx,
      utils: appHelper?.utils || {},
      constants: appHelper?.constants || {},
      props: schema.props || {},
      state: schema.state || {},
      dataSource: this.__dataSource,
      $: this.$.bind(this),
      reloadDataSource: this.reloadDataSource.bind(this),
    };
  }

  private __parseData(data: any, ctx?: any): any {
    if (typeof data === 'string') {
      return data;
    }
    if (data && typeof data === 'object') {
      if (data.type === 'JSExpression') {
        return this.__parseExpression(data.value, ctx);
      }
      if (data.type === 'JSFunction') {
        return this.__parseFunction(data.value, ctx);
      }
      if (data.type === 'JSSlot') {
        return this.__parseSlot(data.value, ctx);
      }
      if (Array.isArray(data)) {
        return data.map((item) => this.__parseData(item, ctx));
      }
      const result: any = {};
      Object.keys(data).forEach((key) => {
        result[key] = this.__parseData(data[key], ctx);
      });
      return result;
    }
    return data;
  }

  private __parseExpression(expression: string, ctx?: any): any {
    const { thisRequiredInJSE } = this.props;
    const thisRequired = thisRequiredInJSE !== false;
    const scope = ctx || this.__ctx;

    try {
      const fn = new Function('this', 'utils', 'constants', 'props', 'state', 'dataSource', '$', 'reloadDataSource', `return ${expression}`);
      return fn(thisRequired ? this : null, scope.utils, scope.constants, scope.props, scope.state, scope.dataSource, scope.$, scope.reloadDataSource);
    } catch (error) {
      console.error('Failed to parse expression:', expression, error);
      return null;
    }
  }

  private __parseFunction(functionStr: string, ctx?: any): any {
    const { thisRequiredInJSE } = this.props;
    const thisRequired = thisRequiredInJSE !== false;
    const scope = ctx || this.__ctx;

    try {
      const fn = new Function('this', 'utils', 'constants', 'props', 'state', 'dataSource', '$', 'reloadDataSource', functionStr);
      return fn.bind(thisRequired ? this : null, thisRequired ? this : null, scope.utils, scope.constants, scope.props, scope.state, scope.dataSource, scope.$, scope.reloadDataSource);
    } catch (error) {
      console.error('Failed to parse function:', functionStr, error);
      return null;
    }
  }

  private __parseSlot(slot: any, ctx?: any): any {
    const { components } = this.props;
    const scope = ctx || this.__ctx;

    if (!slot || !slot.value) {
      return null;
    }

    return this.__createVirtualDom(slot.value, this, { parent: this, scope }, '');
  }

  private __initDataSource(props: IBaseRendererProps): void {
    const { schema, appHelper } = props;
    const dataSourceConfig = schema.dataSource;

    if (!dataSourceConfig) {
      return;
    }

    this.__dataSource = new DataHelper({
      dataSourceConfig,
      requestHandlersMap: appHelper?.requestHandlersMap,
      appHelper,
    });

    this.__dataSource.init().then(() => {
      this.setState({ dataSource: this.__dataSource });
    });
  }

  private __render(): any {
    const { schema, components } = this.props;
    const Comp = components[schema.componentName];

    if (!Comp) {
      const { notFoundComponent, enableStrictNotFoundMode } = this.props;
      if (enableStrictNotFoundMode) {
        throw new Error(`Component not found: ${schema.componentName}`);
      }
      return notFoundComponent ? <notFoundComponent componentName={schema.componentName} /> : <div>Component not found: {schema.componentName}</div>;
    }

    return this.__renderComp(Comp, this.__getComponentProps(schema, this.__ctx, Comp));
  }

  private __getRef(ref: any): void {
    const { onCompGetRef, schema } = this.props;
    if (onCompGetRef) {
      onCompGetRef(schema, ref);
    }
    this.__ref = ref;
  }

  private __getSchemaChildrenVirtualDom(
    schema: IPublicTypeNodeSchema | undefined,
    Comp: any,
    nodeChildrenMap?: any
  ): any {
    if (!schema || !schema.children) {
      return null;
    }

    return schema.children.map((child: IPublicTypeNodeSchema, index: number) => {
      return this.__createVirtualDom(child, this, { parent: this, nodeChildrenMap }, index);
    });
  }

  private __getComponentProps(schema: IPublicTypeNodeSchema | undefined, scope: any, Comp: any, componentInfo?: any): any {
    const { components, designMode, device } = this.props;
    const props = schema?.props || {};
    const parsedProps = this.__parseProps(props, this, '', { parent: this, scope, designMode, device });

    return {
      ...parsedProps,
      __tag: schema?.componentName,
      __nodeId: schema?.id,
      __id: schema?.id,
      __componentName: schema?.componentName,
      __designMode: designMode,
      __isLocked: false,
      __isHidden: false,
      __condition: true,
      __loop: props?.loop,
      __loopArgs: props?.loopArgs,
      __children: schema?.children,
      __props: props,
      __methods: schema?.methods,
      __lifeCycles: schema?.lifeCycles,
      __dataSource: schema?.dataSource,
      __dataSourceMap: this.props.appHelper?.requestHandlersMap,
      __css: props?.css,
      __style: props?.style,
      __className: props?.className,
      __customProps: props?.customProps,
      __fieldId: props?.fieldId,
      __schema: schema,
      __container: this,
      __getRef: this.__getRef.bind(this),
      __getCtx: this.__getCtx.bind(this),
      __onCompGetRef: this.props.onCompGetRef,
      __onCompGetCtx: this.props.onCompGetCtx,
      __getComponentProps: this.__getComponentProps.bind(this),
      __parseProps: this.__parseProps.bind(this),
      __checkSchema: this.__checkSchema.bind(this),
      __renderComp: this.__renderComp.bind(this),
      __createVirtualDom: this.__createVirtualDom.bind(this),
      __createLoopVirtualDom: this.__createLoopVirtualDom.bind(this),
      __getSchemaChildrenVirtualDom: this.__getSchemaChildrenVirtualDom.bind(this),
      __getSchemaChangedSymbol: this.props.getSchemaChangedSymbol,
      __setSchemaChangedSymbol: this.props.setSchemaChangedSymbol,
      __appHelper: this.props.appHelper,
      __locale: this.state.locale,
      __messages: this.state.messages,
      __config: {
        designMode,
        suspended: this.props.suspended,
        onCompGetRef: this.props.onCompGetRef,
        onCompGetCtx: this.props.onCompGetCtx,
        getSchemaChangedSymbol: this.props.getSchemaChangedSymbol,
        setSchemaChangedSymbol: this.props.setSchemaChangedSymbol,
        customCreateElement: this.props.customCreateElement,
        rendererName: this.props.rendererName,
        notFoundComponent: this.props.notFoundComponent,
        faultComponent: this.props.faultComponent,
        faultComponentMap: this.props.faultComponentMap,
        device,
        thisRequiredInJSE: this.props.thisRequiredInJSE,
        enableStrictNotFoundMode: this.props.enableStrictNotFoundMode,
      },
      __components: components,
      __customCreateElement: this.props.customCreateElement,
      __rendererName: this.props.rendererName,
      __notFoundComponent: this.props.notFoundComponent,
      __faultComponent: this.props.faultComponent,
      __faultComponentMap: this.props.faultComponentMap,
      __device: device,
      __thisRequiredInJSE: this.props.thisRequiredInJSE,
      __enableStrictNotFoundMode: this.props.enableStrictNotFoundMode,
    };
  }

  private __createDom(): any {
    const { schema, components } = this.props;
    const Comp = components[schema.componentName];

    if (!Comp) {
      return null;
    }

    return this.__renderComp(Comp, this.__getComponentProps(schema, this.__ctx, Comp));
  }

  private __createVirtualDom(schema: any, self: any, parentInfo: INodeInfo, idx: string | number): any {
    const { components } = this.props;
    const Comp = components[schema.componentName];

    if (!Comp) {
      return null;
    }

    const props = this.__getComponentProps(schema, parentInfo.scope || this.__ctx, Comp);
    return this.__renderComp(Comp, props);
  }

  private __createLoopVirtualDom(schema: any, self: any, parentInfo: INodeInfo, idx: number | string): any {
    const { components } = this.props;
    const Comp = components[schema.componentName];

    if (!Comp) {
      return null;
    }

    const props = this.__getComponentProps(schema, parentInfo.scope || this.__ctx, Comp, {
      item: parentInfo.item,
      index: parentInfo.index,
    });
    return this.__renderComp(Comp, props);
  }

  private __parseProps(props: any, self: any, path: string, info: INodeInfo): any {
    if (!props) {
      return {};
    }

    const result: any = {};
    Object.keys(props).forEach((key) => {
      result[key] = this.__parseData(props[key], info.scope || this.__ctx);
    });

    return result;
  }

  private __initDebug?(): void {
    // 初始化调试
  }

  private __debug(...args: any[]): void {
    console.log(...args);
  }

  private __renderContextProvider(customProps?: object, children?: any): any {
    const { config, components, appHelper } = this.props;
    const { locale, messages } = this.state;

    return (
      <RendererContext.Provider
        value={{
          config: { ...config, ...customProps },
          components,
          appHelper,
          locale,
          messages,
          getSchemaChangedSymbol: this.props.getSchemaChangedSymbol,
          setSchemaChangedSymbol: this.props.setSchemaChangedSymbol,
          getNode: this.props.appHelper?.getNode,
          getSchemaChildrenVirtualDom: this.__getSchemaChildrenVirtualDom.bind(this),
          __createDom: this.__createDom.bind(this),
          __getComponentProps: this.__getComponentProps.bind(this),
          __parseProps: this.__parseProps.bind(this),
          __createVirtualDom: this.__createVirtualDom.bind(this),
          __createLoopVirtualDom: this.__createLoopVirtualDom.bind(this),
          __checkSchema: this.__checkSchema.bind(this),
          __renderComp: this.__renderComp.bind(this),
        }}
      >
        {children}
      </RendererContext.Provider>
    );
  }

  private __renderContextConsumer(children: any): any {
    return (
      <RendererContext.Consumer>
        {(context) => children(context)}
      </RendererContext.Consumer>
    );
  }

  private __renderContent(children: any): any {
    const { className, style, id } = this.props;

    return (
      <div id={id} className={className} style={style}>
        {children}
      </div>
    );
  }

  private __checkSchema(schema: IPublicTypeNodeSchema | undefined, extraComponents?: string | string[]): any {
    if (!schema) {
      return null;
    }

    const { components } = this.props;
    const componentName = schema.componentName;
    const Comp = components[componentName];

    if (!Comp) {
      if (Array.isArray(extraComponents) && extraComponents.includes(componentName)) {
        return null;
      }
      if (typeof extraComponents === 'string' && extraComponents === componentName) {
        return null;
      }
      throw new Error(`Component not found: ${componentName}`);
    }

    return Comp;
  }

  private __renderComp(Comp: any, ctxProps: object): any {
    const { customCreateElement } = this.props;

    if (customCreateElement) {
      return customCreateElement(Comp, ctxProps, ctxProps.children);
    }

    return React.createElement(Comp, ctxProps, ctxProps.children);
  }

  private __ctx: any;
  private __dataSource: any;
  private __ref: any;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| props | IBaseRendererProps | 组件属性 |
| state | IBaseRendererState | 组件状态 |
| context | IRendererContext | 渲染器上下文 |
| __ctx | any | 上下文 |
| __dataSource | any | 数据源 |
| __ref | any | 组件引用 |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| constructor | props: IBaseRendererProps, context: any | void | 构造函数 |
| componentDidMount | - | void | 组件挂载后调用 |
| componentDidUpdate | prevProps: IBaseRendererProps, prevState: IBaseRendererState | void | 组件更新后调用 |
| componentWillUnmount | - | void | 组件卸载前调用 |
| componentDidCatch | error: Error, errorInfo: any | void | 捕获组件错误 |
| render | - | any | 渲染组件 |
| reloadDataSource | - | Promise<any> | 重新加载数据源 |
| $ | filedId: string, instance? | any | 获取字段值 |
| __beforeInit | props: IBaseRendererProps | void | 初始化前调用 |
| __init | props: IBaseRendererProps | void | 初始化 |
| __afterInit | props: IBaseRendererProps | void | 初始化后调用 |
| __executeLifeCycleMethod | method: string, args?: any[] | void | 执行生命周期方法 |
| __bindCustomMethods | props: IBaseRendererProps | void | 绑定自定义方法 |
| __generateCtx | ctx: Record<string, any> | void | 生成上下文 |
| __parseData | data: any, ctx? | any | 解析数据 |
| __parseExpression | expression: string, ctx? | any | 解析表达式 |
| __parseFunction | functionStr: string, ctx? | any | 解析函数 |
| __parseSlot | slot: any, ctx? | any | 解析插槽 |
| __initDataSource | props: IBaseRendererProps | void | 初始化数据源 |
| __render | - | any | 渲染 |
| __getRef | ref: any | void | 获取引用 |
| __getSchemaChildrenVirtualDom | schema, Comp, nodeChildrenMap? | any | 获取 Schema 子元素虚拟 DOM |
| __getComponentProps | schema, scope, Comp, componentInfo? | any | 获取组件属性 |
| __createDom | - | any | 创建 DOM |
| __createVirtualDom | schema, self, parentInfo, idx | any | 创建虚拟 DOM |
| __createLoopVirtualDom | schema, self, parentInfo, idx | any | 创建循环虚拟 DOM |
| __parseProps | props, self, path, info | any | 解析属性 |
| __initDebug | - | void | 初始化调试 |
| __debug | ...args: any[] | void | 调试 |
| __renderContextProvider | customProps?, children? | any | 渲染上下文 Provider |
| __renderContextConsumer | children | any | 渲染上下文 Consumer |
| __renderContent | children | any | 渲染内容 |
| __checkSchema | schema, extraComponents? | any | 检查 Schema |
| __renderComp | Comp, ctxProps | any | 渲染组件 |

**说明：**
- 提供了完整的低代码渲染器功能
- 支持 Schema 解析和组件渲染
- 支持生命周期方法
- 支持数据源管理
- 支持国际化
- 支持表达式解析
- 支持错误处理
- 支持样式管理
- 支持设计模式
- 支持循环渲染
- 支持条件渲染
- 支持插槽渲染

## 使用示例

### 基础使用

```typescript
import { LowCodeRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new LowCodeRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
  },
  components: {
    Button: ButtonComponent,
  },
  designMode: 'design',
});

renderer.render();
```

### 自定义组件

```typescript
import { LowCodeRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new LowCodeRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [{
      componentName: 'MyComponent',
      props: {
        title: 'Hello World',
        onClick: 'this.handleClick',
        text: 'Click me',
        condition: 'this.state.visible',
        loop: {
          type: 'JSExpression',
          value: 'this.state.items',
          args: ['item'],
        },
      },
    }],
  },
  components: {
    MyComponent: MyComponent,
  },
  appHelper: {
    utils: {
      formatDate: (date) => {
        return new Date(date).toLocaleDateString();
      },
    },
    constants: {
      API_URL: 'https://api.example.com',
    },
  },
  designMode: 'design',
});

renderer.render();
```

### 数据源使用

```typescript
import { LowCodeRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new LowCodeRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [{
      componentName: 'List',
      props: {
        dataSource: 'userList',
        renderItem: 'this.renderItem',
      },
    }],
  },
  appHelper: {
    requestHandlersMap: {
      user: {
        isInit: true,
        dataHandler: 'this.handleUserData',
      },
    },
  },
  components: {
    List: ListComponent,
  },
});

renderer.render();
```

### 重新加载数据源

```typescript
import { LowCodeRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new LowCodeRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
  },
  components: {},
});

renderer.reloadDataSource().then(() => {
  console.log('Data source reloaded');
});
```

### 获取字段值

```typescript
import { LowCodeRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new LowCodeRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [{
      componentName: 'Input',
      props: {
        fieldId: 'username',
      },
    }],
  },
  components: {
    Input: InputComponent,
  },
});

const input = renderer.$('username');
console.log(input);
```

## 注意事项

1. **Schema 格式**：确保 Schema 格式正确
2. **组件注册**：正确注册所有需要的组件
3. **生命周期**：注意生命周期方法的执行顺序
4. **数据源**：数据源配置需要正确设置
5. **表达式解析**：表达式解析需要正确的上下文
6. **错误处理**：提供友好的错误信息
7. **性能优化**：注意组件渲染的性能优化
8. **内存管理**：注意组件销毁时的内存清理
9. **样式注入**：样式注入需要避免重复注入
10. **国际化**：国际化需要提供完整的语言包

## 相关文件

- [`renderer/index.ts`](index.md) - 渲染器入口
- [`renderer/page.tsx`](page.md) - 页面渲染器
- [`renderer/component.tsx`](component.md) - 组件渲染器
- [`renderer/block.tsx`](block.md) - 区块渲染器
- [`renderer/addon.tsx`](addon.md) - 插件渲染器
- [`renderer/temp.tsx`](temp.md) - 临时渲染器
- [`hoc/leaf.tsx`](../hoc/leaf.md) - Leaf HOC
- [`context/index.ts`](../context/index.md) - 上下文工厂
- [`utils/data-helper.ts`](../utils/data-helper.md) - 数据源管理

## 外部依赖

- `react`: React 运行时
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
- `@alilc/lowcode-datasource-engine`: 数据源引擎
- `prop-types`: React PropTypes
- `intl-messageformat`: 国际化消息格式化
- `lodash`: 工具函数库
- `debug`: 调试工具

## 典型使用场景

1. **低代码平台**：在低代码平台中使用渲染器
2. **可视化编辑器**：在可视化编辑器中使用渲染器
3. **动态表单**：在动态表单中使用渲染器
4. **页面构建器**：在页面构建器中使用渲染器
5. **组件预览**：在组件预览中使用渲染器
