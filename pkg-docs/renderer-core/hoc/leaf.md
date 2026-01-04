# Leaf HOC - 叶子节点高阶组件

## 功能概述

[`hoc/leaf.tsx`](../../packages/renderer-core/src/hoc/leaf.tsx) 是叶子节点高阶组件（Leaf HOC），负责为组件添加设计模式下的交互能力。它监听组件的属性变化、可见性变化、子元素变化等，并触发相应的回调函数。Leaf HOC 是低代码引擎设计模式的核心，使得组件可以在设计模式下被拖拽、选中、编辑等。

## 主要功能

1. **属性变化监听**：监听组件属性变化
2. **可见性变化监听**：监听组件可见性变化
3. **子元素变化监听**：监听组件子元素变化
4. **设计模式支持**：支持 live、design、preview 等设计模式
5. **组件引用管理**：管理组件的 ref
6. **组件上下文管理**：管理组件的上下文
7. **组件生命周期**：支持组件生命周期方法
8. **错误处理**：处理组件渲染错误
9. **性能优化**：优化组件渲染性能

## 核心类型和接口

### ILeafProps

Leaf HOC 属性接口，定义了 Leaf HOC 的所有属性。

```typescript
export interface ILeafProps {
  __tag: string;
  __nodeId: string;
  __id: string;
  __componentName: string;
  __designMode: string;
  __isLocked: boolean;
  __isHidden: boolean;
  __condition: boolean;
  __loop: any;
  __loopArgs: string[];
  __children: any;
  __props: any;
  __methods: any;
  __lifeCycles: any;
  __dataSource: any;
  __dataSourceMap: any;
  __css: string;
  __style: any;
  __className: string;
  __customProps: any;
  __fieldId: string;
  __schema: IPublicTypeNodeSchema;
  __container: any;
  __getRef: (ref: any) => void;
  __getCtx: (ref: any) => void;
  __onCompGetRef: (schema: IPublicTypeNodeSchema, ref: any) => void;
  __onCompGetCtx: (schema: IPublicTypeNodeSchema, ref: any) => void;
  __getComponentProps: (schema: IPublicTypeNodeSchema | undefined, scope: any, Comp: any, componentInfo?: any) => any;
  __parseProps: (props: any, self: any, path: string, info: INodeInfo) => any;
  __checkSchema: (schema: IPublicTypeNodeSchema | undefined, extraComponents?: string | string[]) => any;
  __renderComp: (Comp: any, ctxProps: object) => any;
  __createVirtualDom: (schema: any, self: any, parentInfo: INodeInfo, idx: string | number) => any;
  __createLoopVirtualDom: (schema: any, self: any, parentInfo: INodeInfo, idx: number | string) => any;
  __getSchemaChildrenVirtualDom: (schema: IPublicTypeNodeSchema | undefined, Comp: any, nodeChildrenMap?: any) => any;
  __getSchemaChangedSymbol: () => boolean;
  __setSchemaChangedSymbol: (symbol: boolean) => void;
  __appHelper: IRendererAppHelper;
  __locale: string;
  __messages: Record<string, any>;
  __config: IRendererConfig;
  __components: Record<string, IGeneralComponent>;
  __customCreateElement: (Component: any, props: any, children: any) => any;
  __rendererName: 'LowCodeRenderer' | 'PageRenderer' | string;
  __notFoundComponent: IGeneralComponent;
  __faultComponent: IGeneralComponent;
  __faultComponentMap: { [prop: string]: IGeneralComponent };
  __device: string;
  __thisRequiredInJSE: boolean;
  __enableStrictNotFoundMode: boolean;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| __tag | string | 组件标签 |
| __nodeId | string | 节点 ID |
| __id | string | 组件 ID |
| __componentName | string | 组件名称 |
| __designMode | string | 设计模式 |
| __isLocked | boolean | 是否锁定 |
| __isHidden | boolean | 是否隐藏 |
| __condition | boolean | 条件表达式 |
| __loop | any | 循环配置 |
| __loopArgs | string[] | 循环参数 |
| __children | any | 子元素 |
| __props | any | 属性 |
| __methods | any | 方法 |
| __lifeCycles | any | 生命周期 |
| __dataSource | any | 数据源 |
| __dataSourceMap | any | 数据源映射 |
| __css | string | CSS 样式 |
| __style | any | 样式对象 |
| __className | string | 类名 |
| __customProps | any | 自定义属性 |
| __fieldId | string | 字段 ID |
| __schema | IPublicTypeNodeSchema | Schema |
| __container | any | 容器 |
| __getRef | (ref: any) => void | 获取引用回调 |
| __getCtx | (ref: any) => void | 获取上下文回调 |
| __onCompGetRef | (schema, ref) => void | 组件获取引用回调 |
| __onCompGetCtx | (schema, ref) => void | 组件获取上下文回调 |
| __getComponentProps | (schema, scope, Comp, componentInfo?) => any | 获取组件属性 |
| __parseProps | (props, self, path, info) => any | 解析属性 |
| __checkSchema | (schema, extraComponents?) => any | 检查 Schema |
| __renderComp | (Comp, ctxProps) => any | 渲染组件 |
| __createVirtualDom | (schema, self, parentInfo, idx) => any | 创建虚拟 DOM |
| __createLoopVirtualDom | (schema, self, parentInfo, idx) => any | 创建循环虚拟 DOM |
| __getSchemaChildrenVirtualDom | (schema, Comp, nodeChildrenMap?) => any | 获取 Schema 子元素虚拟 DOM |
| __getSchemaChangedSymbol | () => boolean | 获取 Schema 变化标识 |
| __setSchemaChangedSymbol | (symbol: boolean) => void | 设置 Schema 变化标识 |
| __appHelper | IRendererAppHelper | 应用助手 |
| __locale | string | 当前语言 |
| __messages | Record<string, any> | 国际化消息 |
| __config | IRendererConfig | 渲染器配置 |
| __components | Record<string, IGeneralComponent> | 组件映射 |
| __customCreateElement | (Component, props, children) => any | 自定义创建元素 |
| __rendererName | 'LowCodeRenderer' \| 'PageRenderer' \| string | 渲染器名称 |
| __notFoundComponent | IGeneralComponent | 未找到组件 |
| __faultComponent | IGeneralComponent | 错误组件 |
| __faultComponentMap | { [prop: string]: IGeneralComponent } | 错误组件映射 |
| __device | string | 设备类型 |
| __thisRequiredInJSE | boolean | JS 表达式中是否需要 this |
| __enableStrictNotFoundMode | boolean | 是否启用严格未找到模式 |

### ILeafState

Leaf HOC 状态接口，定义了 Leaf HOC 的所有状态。

```typescript
export interface ILeafState {
  visible: boolean;
  locked: boolean;
  condition: boolean;
  loopData: any;
  props: any;
  children: any;
  error: Error | null;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| visible | boolean | 是否可见 |
| locked | boolean | 是否锁定 |
| condition | boolean | 条件表达式结果 |
| loopData | any | 循环数据 |
| props | any | 属性 |
| children | any | 子元素 |
| error | Error \| null | 错误信息 |

## 核心组件

### Leaf

叶子节点高阶组件，为组件添加设计模式下的交互能力。

```typescript
export function leafWrapper(Comp: any): any {
  class Leaf extends React.Component<ILeafProps, ILeafState> {
    static displayName = `Leaf(${Comp.displayName || Comp.name || 'Component'})`;

    static contextType = RendererContext;

    constructor(props: ILeafProps, context: any) {
      super(props, context);
      this.state = {
        visible: !props.__isHidden,
        locked: props.__isLocked,
        condition: props.__condition,
        loopData: null,
        props: props.__props,
        children: props.__children,
        error: null,
      };
      this.__init(props);
    }

    componentDidMount() {
      this.__executeLifeCycleMethod('componentDidMount');
    }

    componentDidUpdate(prevProps: ILeafProps, prevState: ILeafState) {
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
      const { __designMode, __notFoundComponent, __faultComponent, __faultComponentMap } = this.props;

      if (error) {
        const FaultComponent = __faultComponent || __faultComponentMap?.['default'];
        if (FaultComponent) {
          return <FaultComponent error={error} />;
        }
        return <div className="lowcode-component-error">{error.message}</div>;
      }

      if (!this.state.visible) {
        return null;
      }

      if (!this.state.condition) {
        return null;
      }

      if (this.state.loopData) {
        return this.__renderLoop();
      }

      return this.__renderComponent();
    }

    private __init(props: ILeafProps): void {
      this.__bindCustomMethods(props);
      this.__initDataSource(props);
    }

    private __bindCustomMethods(props: ILeafProps): void {
      const { __methods, __thisRequiredInJSE } = props;
      if (!__methods) return;

      const methods: any = {};
      Object.keys(__methods).forEach((key) => {
        methods[key] = (...args: any[]) => {
          const method = __methods[key];
          if (typeof method === 'function') {
            return method.apply(this, args);
          }
          if (__thisRequiredInJSE) {
            return method.apply(this, args);
          }
          return method(...args);
        };
      });

      this.__methods = methods;
    }

    private __initDataSource(props: ILeafProps): void {
      const { __dataSource, __dataSourceMap, __appHelper } = props;
      if (!__dataSource) return;

      const dataSource = new DataHelper({
        dataSourceConfig: __dataSource,
        requestHandlersMap: __dataSourceMap,
        appHelper: __appHelper,
      });

      this.__dataSource = dataSource;
      dataSource.init().then(() => {
        this.setState({ loopData: dataSource.get(this.__loop) });
      });
    }

    private __executeLifeCycleMethod(method: string, args?: any[]): void {
      const { __lifeCycles } = this.props;
      if (!__lifeCycles) return;

      const lifecycle = __lifeCycles[method];
      if (typeof lifecycle === 'function') {
        lifecycle.apply(this, args || []);
      }
    }

    private __renderComponent(): any {
      const { __props, __children, __customProps, __getComponentProps, __parseProps, __checkSchema, __renderComp } = this.props;
      const { props: stateProps, children: stateChildren } = this.state;

      const props = { ...__props, ...stateProps, ...__customProps };
      const children = __children || stateChildren;

      const Comp = this.__getComponent();

      const ctxProps = {
        ...props,
        children,
        __tag: this.props.__tag,
        __nodeId: this.props.__nodeId,
        __id: this.props.__id,
        __componentName: this.props.__componentName,
        __designMode: this.props.__designMode,
        __isLocked: this.props.__isLocked,
        __isHidden: this.props.__isHidden,
        __condition: this.props.__condition,
        __loop: this.props.__loop,
        __loopArgs: this.props.__loopArgs,
        __children,
        __props,
        __methods: this.__methods,
        __lifeCycles: this.props.__lifeCycles,
        __dataSource: this.__dataSource,
        __dataSourceMap: this.props.__dataSourceMap,
        __css: this.props.__css,
        __style: this.props.__style,
        __className: this.props.__className,
        __customProps,
        __fieldId: this.props.__fieldId,
        __schema: this.props.__schema,
        __container: this.props.__container,
        __getRef: this.__getRef,
        __getCtx: this.__getCtx,
        __onCompGetRef: this.props.__onCompGetRef,
        __onCompGetCtx: this.props.__onCompGetCtx,
        __getComponentProps,
        __parseProps,
        __checkSchema,
        __renderComp,
        __createVirtualDom: this.props.__createVirtualDom,
        __createLoopVirtualDom: this.props.__createLoopVirtualDom,
        __getSchemaChildrenVirtualDom: this.props.__getSchemaChildrenVirtualDom,
        __getSchemaChangedSymbol: this.props.__getSchemaChangedSymbol,
        __setSchemaChangedSymbol: this.props.__setSchemaChangedSymbol,
        __appHelper: this.props.__appHelper,
        __locale: this.props.__locale,
        __messages: this.props.__messages,
        __config: this.props.__config,
        __components: this.props.__components,
        __customCreateElement: this.props.__customCreateElement,
        __rendererName: this.props.__rendererName,
        __notFoundComponent: this.props.__notFoundComponent,
        __faultComponent: this.props.__faultComponent,
        __faultComponentMap: this.props.__faultComponentMap,
        __device: this.props.__device,
        __thisRequiredInJSE: this.props.__thisRequiredInJSE,
        __enableStrictNotFoundMode: this.props.__enableStrictNotFoundMode,
      };

      return __renderComp(Comp, ctxProps);
    }

    private __renderLoop(): any {
      const { __loop, __loopArgs, __createLoopVirtualDom } = this.props;
      const { loopData } = this.state;

      if (!loopData || !Array.isArray(loopData)) {
        return null;
      }

      return loopData.map((item: any, index: number) => {
        return __createLoopVirtualDom(__loop, this, { parent: this, item, index }, index);
      });
    }

    private __getComponent(): any {
      const { __components, __componentName, __notFoundComponent, __enableStrictNotFoundMode } = this.props;
      const Comp = __components[__componentName];

      if (!Comp) {
        if (__enableStrictNotFoundMode) {
          throw new Error(`Component not found: ${__componentName}`);
        }
        return __notFoundComponent || (() => <div>Component not found: {__componentName}</div>);
      }

      return Comp;
    }

    private __getRef(ref: any): void {
      const { __getRef, __onCompGetRef, __schema } = this.props;
      if (__getRef) {
        __getRef(ref);
      }
      if (__onCompGetRef) {
        __onCompGetRef(__schema, ref);
      }
    }

    private __getCtx(ref: any): void {
      const { __getCtx, __onCompGetCtx, __schema } = this.props;
      if (__getCtx) {
        __getCtx(ref);
      }
      if (__onCompGetCtx) {
        __onCompGetCtx(__schema, ref);
      }
    }

    private __methods: any;
    private __dataSource: any;
  }

  return Leaf;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| props | ILeafProps | 组件属性 |
| state | ILeafState | 组件状态 |
| context | IRendererContext | 渲染器上下文 |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| constructor | props: ILeafProps, context: any | void | 构造函数 |
| componentDidMount | - | void | 组件挂载后调用 |
| componentDidUpdate | prevProps: ILeafProps, prevState: ILeafState | void | 组件更新后调用 |
| componentWillUnmount | - | void | 组件卸载前调用 |
| componentDidCatch | error: Error, errorInfo: any | void | 捕获组件错误 |
| render | - | any | 渲染组件 |
| __init | props: ILeafProps | void | 初始化组件 |
| __bindCustomMethods | props: ILeafProps | void | 绑定自定义方法 |
| __initDataSource | props: ILeafProps | void | 初始化数据源 |
| __executeLifeCycleMethod | method: string, args?: any[] | void | 执行生命周期方法 |
| __renderComponent | - | any | 渲染组件 |
| __renderLoop | - | any | 渲染循环 |
| __getComponent | - | any | 获取组件 |
| __getRef | ref: any | void | 获取引用 |
| __getCtx | ref: any | void | 获取上下文 |

**说明：**
- 为组件添加设计模式下的交互能力
- 监听组件属性变化、可见性变化、子元素变化
- 支持组件生命周期方法
- 支持数据源管理
- 支持循环渲染
- 支持错误处理

## 使用示例

### 基础使用

```typescript
import { leafWrapper } from '@alilc/lowcode-renderer-core';

const MyComponent = () => {
  return <div>Hello World</div>;
};

const WrappedComponent = leafWrapper(MyComponent);

// 使用
<WrappedComponent
  __tag="MyComponent"
  __nodeId="node-1"
  __id="comp-1"
  __componentName="MyComponent"
  __designMode="design"
  __isLocked={false}
  __isHidden={false}
  __condition={true}
  __loop={null}
  __loopArgs={[]}
  __children={null}
  __props={{}}
  __methods={{}}
  __lifeCycles={{}}
  __dataSource={null}
  __dataSourceMap={{}}
  __css=""
  __style={{}}
  __className=""
  __customProps={{}}
  __fieldId=""
  __schema={{}}
  __container={null}
  __getRef={(ref) => console.log('Ref:', ref)}
  __getCtx={(ref) => console.log('Ctx:', ref)}
  __onCompGetRef={(schema, ref) => console.log('Comp Ref:', ref)}
  __onCompGetCtx={(schema, ref) => console.log('Comp Ctx:', ref)}
  __getComponentProps={(schema, scope, Comp) => ({})}
  __parseProps={(props, self, path, info) => props}
  __checkSchema={(schema) => schema}
  __renderComp={(Comp, ctxProps) => <Comp {...ctxProps} />}
  __createVirtualDom={(schema, self, parentInfo, idx) => null}
  __createLoopVirtualDom={(schema, self, parentInfo, idx) => null}
  __getSchemaChildrenVirtualDom={(schema, Comp) => null}
  __getSchemaChangedSymbol={() => false}
  __setSchemaChangedSymbol={(symbol) => {}}
  __appHelper={{}}
  __locale="zh-CN"
  __messages={{}}
  __config={{}}
  __components={{}}
  __customCreateElement={(Component, props, children) => React.createElement(Component, props, children)}
  __rendererName="LowCodeRenderer"
  __notFoundComponent={null}
  __faultComponent={null}
  __faultComponentMap={{}}
  __device="desktop"
  __thisRequiredInJSE={true}
  __enableStrictNotFoundMode={false}
/>
```

### 在渲染器中使用

```typescript
import { leafWrapper } from '@alilc/lowcode-renderer-core';

class BaseRenderer extends React.Component<IRendererProps, IBaseRendererState> {
  render() {
    const { schema, components, config, appHelper, locale, messages } = this.props;
    const Comp = components[schema.componentName];
    const WrappedComp = leafWrapper(Comp);

    return (
      <WrappedComp
        __tag={schema.componentName}
        __nodeId={schema.id}
        __id={schema.id}
        __componentName={schema.componentName}
        __designMode={config.designMode}
        __isLocked={false}
        __isHidden={false}
        __condition={true}
        __loop={schema.props?.loop}
        __loopArgs={schema.props?.loopArgs}
        __children={schema.children}
        __props={schema.props}
        __methods={schema.methods}
        __lifeCycles={schema.lifeCycles}
        __dataSource={schema.dataSource}
        __dataSourceMap={appHelper?.requestHandlersMap}
        __css={schema.props?.css}
        __style={schema.props?.style}
        __className={schema.props?.className}
        __customProps={schema.props?.customProps}
        __fieldId={schema.props?.fieldId}
        __schema={schema}
        __container={this}
        __getRef={this.__getRef}
        __getCtx={this.__getCtx}
        __onCompGetRef={config.onCompGetRef}
        __onCompGetCtx={config.onCompGetCtx}
        __getComponentProps={this.__getComponentProps}
        __parseProps={this.__parseProps}
        __checkSchema={this.__checkSchema}
        __renderComp={this.__renderComp}
        __createVirtualDom={this.__createVirtualDom}
        __createLoopVirtualDom={this.__createLoopVirtualDom}
        __getSchemaChildrenVirtualDom={this.__getSchemaChildrenVirtualDom}
        __getSchemaChangedSymbol={this.getSchemaChangedSymbol}
        __setSchemaChangedSymbol={this.setSchemaChangedSymbol}
        __appHelper={appHelper}
        __locale={locale}
        __messages={messages}
        __config={config}
        __components={components}
        __customCreateElement={config.customCreateElement}
        __rendererName={config.rendererName}
        __notFoundComponent={config.notFoundComponent}
        __faultComponent={config.faultComponent}
        __faultComponentMap={config.faultComponentMap}
        __device={config.device}
        __thisRequiredInJSE={config.thisRequiredInJSE}
        __enableStrictNotFoundMode={config.enableStrictNotFoundMode}
      />
    );
  }
}
```

### 循环渲染

```typescript
import { leafWrapper } from '@alilc/lowcode-renderer-core';

const ListItem = (props: any) => {
  const { item, index } = props;
  return <div>{item.name}</div>;
};

const WrappedListItem = leafWrapper(ListItem);

// 使用
<WrappedListItem
  __tag="ListItem"
  __nodeId="node-1"
  __id="comp-1"
  __componentName="ListItem"
  __designMode="design"
  __loop={{
    type: 'JSExpression',
    value: 'this.state.items',
    args: ['item', 'index'],
  }}
  __loopArgs={['item', 'index']}
  __dataSource={{
    list: [{
      id: 'user',
      isInit: true,
      dataHandler: 'this.handleUserData',
    }],
  }}
  __dataSourceMap={{
    user: {
      isInit: true,
      dataHandler: 'this.handleUserData',
    },
  }}
  // ... 其他属性
/>
```

## 注意事项

1. **性能优化**：避免不必要的重新渲染
2. **内存管理**：注意组件卸载时的内存清理
3. **错误处理**：提供友好的错误信息
4. **生命周期**：注意生命周期方法的执行顺序
5. **数据源**：数据源配置需要正确设置
6. **循环渲染**：循环渲染需要注意性能优化
7. **设计模式**：设计模式影响组件行为
8. **类型安全**：使用 TypeScript 类型确保类型安全

## 相关文件

- [`hoc/index.tsx`](index.md) - 高阶组件入口
- [`renderer/base.tsx`](../renderer/base.md) - 基础渲染器
- [`context/index.ts`](../context/index.md) - 上下文工厂
- [`utils/data-helper.ts`](../utils/data-helper.md) - 数据源管理

## 外部依赖

- `react`: React 运行时
- `@alilc/lowcode-datasource-engine`: 数据源引擎
- `@alilc/lowcode-utils`: 工具函数

## 典型使用场景

1. **设计模式**：在设计模式下为组件添加交互能力
2. **属性监听**：监听组件属性变化
3. **可见性监听**：监听组件可见性变化
4. **子元素监听**：监听组件子元素变化
5. **循环渲染**：支持循环渲染
6. **数据源管理**：支持数据源管理
7. **生命周期管理**：支持组件生命周期方法
8. **错误处理**：处理组件渲染错误
