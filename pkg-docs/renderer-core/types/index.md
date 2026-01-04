# Types - 类型定义

## 功能概述

[`types/index.ts`](../../packages/renderer-core/src/types/index.ts) 是类型定义模块，定义了渲染器核心的所有类型和接口。它提供了完整的类型系统，支持 React 和 Rax 运行时。

## 主要功能

1. **类型定义**：定义所有类型和接口
2. **类型兼容**：支持 React 和 Rax 类型兼容
3. **类型导出**：导出所有类型供外部使用

## 核心类型和接口

### IGeneralComponent

通用组件接口，用于兼容 React 和 Rax 的组件实例。

```typescript
interface IGeneralComponent<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {
  readonly props: Readonly<P> & Readonly<{ children?: any | undefined }>;
  state: Readonly<S>;
  refs: Record<string, any>;
  context: any;
  setState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
  ): void;
  forceUpdate(callback?: () => void): void;
  render(): any;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| props | Readonly<P> & Readonly<{ children?: any | undefined }> | 组件属性 |
| state | Readonly<S> | 组件状态 |
| refs | Record<string, any> | 组件引用 |
| context | any | 组件上下文 |
| setState | (state, callback?) => void | 设置组件状态 |
| forceUpdate | (callback?) => void | 强制更新组件 |
| render | () => any | 渲染组件 |

### IGeneralConstructor

通用构造函数接口，用于兼容 React 和 Rax 的组件构造函数。

```typescript
export type IGeneralConstructor<
  T = {
    [key: string]: any;
  }, S = {
    [key: string]: any;
  }, D = any
> = new <TT = T, SS = S, DD = D>(props: TT, context: any) => IGeneralComponent<TT, SS, DD>;
```

**类型参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| T | { [key: string]: any } | 属性类型 |
| S | { [key: string]: any } | 状态类型 |
| D | any | 其他类型 |

### IRendererAppHelper

应用助手接口，定义了应用助手的属性和方法。

```typescript
export type IRendererAppHelper = Partial<{
  utils: Record<string, any>;
  constants: Record<string, any>;
  location: ILocationLike;
  history: IHistoryLike;
  match: any;
  logParams: Record<string, any>;
  addons: Record<string, any>;
  requestHandlersMap: Record<string, RequestHandler<{
    data: unknown;
  }>>;
}>;
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| utils | Record<string, any> | 全局公共函数 |
| constants | Record<string, any> | 全局常量 |
| location | ILocationLike | react-router 的 location 实例 |
| history | IHistoryLike | react-router 的 history 实例 |
| match | any | react-router 的 match 实例（已废弃） |
| logParams | Record<string, any> | 日志参数（内部使用） |
| addons | Record<string, any> | 插件映射（内部使用） |
| requestHandlersMap | Record<string, RequestHandler> | 请求处理器映射 |

### IRendererProps

渲染器属性接口，定义了渲染器的所有配置项。

```typescript
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
| schema | IPublicTypeRootSchema \| IPublicTypeNodeSchema | 符合低代码搭建协议的数据 |
| components | Record<string, IGeneralComponent> | 组件依赖的实例 |
| className | string | CSS 类名 |
| style | CSSProperties | style |
| id | string \| number | id |
| locale | string | 语言 |
| messages | Record<string, any> | 多语言语料 |
| appHelper | IRendererAppHelper | 应用助手 |
| componentsMap | { [key: string]: any } | 组件映射 |
| designMode | string | 设计模式（live/design） |
| suspended | boolean | 是否挂起 |
| onCompGetRef | (schema, ref) => void | 组件获取 ref 时触发的钩子 |
| onCompGetCtx | (schema, ref) => void | 组件 ctx 更新回调 |
| getSchemaChangedSymbol | () => boolean | 传入的 schema 是否有变更 |
| setSchemaChangedSymbol | (symbol: boolean) => void | 设置 schema 是否有变更 |
| customCreateElement | (Component, props, children) => any | 自定义创建 element 的钩子 |
| rendererName | 'LowCodeRenderer' \| 'PageRenderer' \| string | 渲染类型 |
| notFoundComponent | IGeneralComponent | 当找不到组件时，显示的组件 |
| faultComponent | IGeneralComponent | 当组件渲染异常时，显示的组件 |
| faultComponentMap | { [prop: string]: IGeneralComponent } | 错误组件映射 |
| device | string | 设备信息 |
| thisRequiredInJSE | boolean | JSExpression 是否只支持使用 this 来访问上下文变量 |
| enableStrictNotFoundMode | boolean | 当开启组件未找到严格模式时，渲染模块不会默认给一个容器组件 |

### IBaseRendererProps

基础渲染器属性接口，定义了基础渲染器的所有配置项。

```typescript
export interface IBaseRendererProps {
  locale?: string;
  messages: Record<string, any>;
  __appHelper: IRendererAppHelper;
  __components: Record<string, any>;
  __ctx: Record<string, any>;
  __schema: IPublicTypeRootSchema;
  __host?: BuiltinSimulatorHost;
  __container?: BuiltinSimulatorRenderer;
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
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| locale | string | 语言 |
| messages | Record<string, any> | 国际化消息 |
| __appHelper | IRendererAppHelper | 应用助手 |
| __components | Record<string, any> | 组件映射 |
| __ctx | Record<string, any> | 上下文 |
| __schema | IPublicTypeRootSchema | Schema |
| __host | BuiltinSimulatorHost | 宿主 |
| __container | BuiltinSimulatorRenderer | 容器 |
| config | Record<string, any> | 配置 |
| designMode | 'design' | 设计模式 |
| className | string | 类名 |
| style | CSSProperties | 样式 |
| id | string \| number | ID |
| getSchemaChangedSymbol | () => boolean | 获取 Schema 变化标识 |
| setSchemaChangedSymbol | (symbol: boolean) => void | 设置 Schema 变化标识 |
| thisRequiredInJSE | boolean | JS 表达式中是否需要 this |
| documentId | string | 文档 ID |
| getNode | any | 获取节点 |
| device | 'default' \| 'mobile' \| string | 设备类型 |
| componentName | string | 组件名称 |

### IBaseRendererInstance

基础渲染器实例接口，定义了基础渲染器的所有方法。

```typescript
export type IBaseRendererInstance = IGeneralComponent<
  IBaseRendererProps,
  Record<string, any>,
  any
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
| __parseData | data: any, ctx? | any | 解析数据 |
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

## 相关文件

- [`../adapter/index.ts`](../adapter/index.md) - 运行时适配器
- [`../hoc/leaf.tsx`](../hoc/leaf.md) - Leaf HOC
- [`../renderer/base.tsx`](../renderer/base.md) - 基础渲染器

## 外部依赖

- `react`: React 运行时
- `@alilc/lowcode-designer`: 设计器
- `@alilc/lowcode-types`: 类型定义
