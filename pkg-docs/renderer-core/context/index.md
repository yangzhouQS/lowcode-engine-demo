# Context - 上下文工厂

## 功能概述

[`context/index.ts`](../../packages/renderer-core/src/context/index.ts) 是上下文工厂模块，负责创建 React Context，用于在组件树中共享渲染器上下文。它提供了统一的上下文创建和管理机制，使得组件可以方便地访问渲染器的全局状态和方法。

## 主要功能

1. **上下文创建**：创建 React Context
2. **上下文提供**：提供上下文 Provider
3. **上下文消费**：提供上下文 Consumer
4. **上下文类型**：定义上下文类型

## 核心类型和接口

### IRendererContext

渲染器上下文接口，定义了渲染器上下文的所有属性和方法。

```typescript
export interface IRendererContext {
  config: IRendererConfig;
  components: Record<string, IGeneralComponent>;
  appHelper?: IRendererAppHelper;
  locale?: string;
  messages?: Record<string, any>;
  getSchemaChangedSymbol?: () => boolean;
  setSchemaChangedSymbol?: (symbol: boolean) => void;
  getNode?: (id: string) => any;
  getSchemaChildrenVirtualDom?: (schema: IPublicTypeNodeSchema | undefined, Comp: any, nodeChildrenMap?: any) => any;
  __createDom?: () => any;
  __getComponentProps?: (schema: IPublicTypeNodeSchema | undefined, scope: any, Comp: any, componentInfo?: any) => any;
  __parseProps?: (props: any, self: any, path: string, info: INodeInfo) => any;
  __createVirtualDom?: (schema: any, self: any, parentInfo: INodeInfo, idx: string | number) => any;
  __createLoopVirtualDom?: (schema: any, self: any, parentInfo: INodeInfo, idx: number | string) => any;
  __checkSchema?: (schema: IPublicTypeNodeSchema | undefined, extraComponents?: string | string[]) => any;
  __renderComp?: (Comp: any, ctxProps: object) => any;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| config | IRendererConfig | 渲染器配置 |
| components | Record<string, IGeneralComponent> | 组件映射 |
| appHelper | IRendererAppHelper | 应用助手 |
| locale | string | 当前语言 |
| messages | Record<string, any> | 国际化消息 |
| getSchemaChangedSymbol | () => boolean | 获取 Schema 变化标识 |
| setSchemaChangedSymbol | (symbol: boolean) => void | 设置 Schema 变化标识 |
| getNode | (id: string) => any | 获取节点 |
| getSchemaChildrenVirtualDom | (schema, Comp, nodeChildrenMap?) => any | 获取 Schema 子元素虚拟 DOM |
| __createDom | () => any | 创建 DOM |
| __getComponentProps | (schema, scope, Comp, componentInfo?) => any | 获取组件属性 |
| __parseProps | (props, self, path, info) => any | 解析属性 |
| __createVirtualDom | (schema, self, parentInfo, idx) => any | 创建虚拟 DOM |
| __createLoopVirtualDom | (schema, self, parentInfo, idx) => any | 创建循环虚拟 DOM |
| __checkSchema | (schema, extraComponents?) => any | 检查 Schema |
| __renderComp | (Comp, ctxProps) => any | 渲染组件 |

### IRendererConfig

渲染器配置接口，定义了渲染器的配置项。

```typescript
export interface IRendererConfig {
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

### IRendererAppHelper

应用助手接口，定义了应用助手的属性和方法。

```typescript
export interface IRendererAppHelper {
  utils?: Record<string, any>;
  constants?: Record<string, any>;
  requestHandlersMap?: Record<string, any>;
  reloadDataSource?: () => Promise<any>;
  transformCode?: (code: string) => string;
  getLocale?: () => string;
  setLocale?: (locale: string) => void;
  getHistory?: () => any;
  getProject?: () => any;
  getDocument?: () => any;
  getNode?: (id: string) => any;
  getComponentByName?: (name: string) => any;
  getComponentMeta?: (name: string) => any;
  getProps?: (id: string) => any;
  setProps?: (id: string, props: any) => void;
  getChildren?: (id: string) => any;
  setChildren?: (id: string, children: any) => void;
  insertChild?: (id: string, child: any, index?: number) => void;
  removeChild?: (id: string, childId: string) => void;
  selectNode?: (id: string) => void;
  hoverNode?: (id: string) => void;
  getSelectedNode?: () => any;
  getHoveredNode?: () => any;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| utils | Record<string, any> | 工具函数 |
| constants | Record<string, any> | 常量 |
| requestHandlersMap | Record<string, any> | 请求处理器映射 |
| reloadDataSource | () => Promise<any> | 重新加载数据源 |
| transformCode | (code: string) => string | 转换代码 |
| getLocale | () => string | 获取当前语言 |
| setLocale | (locale: string) => void | 设置当前语言 |
| getHistory | () => any | 获取历史记录 |
| getProject | () => any | 获取项目 |
| getDocument | () => any | 获取文档 |
| getNode | (id: string) => any | 获取节点 |
| getComponentByName | (name: string) => any | 根据名称获取组件 |
| getComponentMeta | (name: string) => any | 获取组件元数据 |
| getProps | (id: string) => any | 获取属性 |
| setProps | (id: string, props: any) => void | 设置属性 |
| getChildren | (id: string) => any | 获取子元素 |
| setChildren | (id: string, children: any) => void | 设置子元素 |
| insertChild | (id: string, child: any, index?) => void | 插入子元素 |
| removeChild | (id: string, childId: string) => void | 移除子元素 |
| selectNode | (id: string) => void | 选择节点 |
| hoverNode | (id: string) => void | 悬停节点 |
| getSelectedNode | () => any | 获取选中的节点 |
| getHoveredNode | () => any | 获取悬停的节点 |

## 核心函数

### createContext

创建 React Context。

```typescript
export function createContext(): React.Context<IRendererContext> {
  return React.createContext({});
}
```

**返回值：** `React.Context<IRendererContext>` - React Context

**说明：**
- 创建一个空的 React Context
- Context 的类型为 IRendererContext

**使用示例：**

```typescript
import { createContext } from '@alilc/lowcode-renderer-core';

const RendererContext = createContext();
```

## 使用示例

### 基础使用

```typescript
import { createContext } from '@alilc/lowcode-renderer-core';

const RendererContext = createContext();

// 使用 Provider
<RendererContext.Provider value={{ config, components, appHelper }}>
  <App />
</RendererContext.Provider>

// 使用 Consumer
<RendererContext.Consumer>
  {(context) => <div>{context.locale}</div>}
</RendererContext.Consumer>
```

### 在渲染器中使用

```typescript
import { createContext } from '@alilc/lowcode-renderer-core';

const RendererContext = createContext();

class BaseRenderer extends React.Component<IRendererProps, IBaseRendererState> {
  render() {
    const { config, components, appHelper, locale, messages } = this.props;

    return (
      <RendererContext.Provider
        value={{
          config,
          components,
          appHelper,
          locale,
          messages,
          getSchemaChangedSymbol: this.getSchemaChangedSymbol,
          setSchemaChangedSymbol: this.setSchemaChangedSymbol,
          __createDom: this.__createDom,
          __getComponentProps: this.__getComponentProps,
          __parseProps: this.__parseProps,
          __createVirtualDom: this.__createVirtualDom,
          __createLoopVirtualDom: this.__createLoopVirtualDom,
          __checkSchema: this.__checkSchema,
          __renderComp: this.__renderComp,
        }}
      >
        {this.__renderContent(this.__render())}
      </RendererContext.Provider>
    );
  }
}
```

### 在组件中使用

```typescript
import { createContext } from '@alilc/lowcode-renderer-core';

const RendererContext = createContext();

function MyComponent() {
  return (
    <RendererContext.Consumer>
      {(context) => (
        <div>
          <p>Locale: {context.locale}</p>
          <p>Components: {Object.keys(context.components).join(', ')}</p>
        </div>
      )}
    </RendererContext.Consumer>
  );
}
```

### 使用 Hooks

```typescript
import { createContext } from '@alilc/lowcode-renderer-core';

const RendererContext = createContext();

function useRendererContext() {
  return useContext(RendererContext);
}

function MyComponent() {
  const context = useRendererContext();
  return <div>Locale: {context.locale}</div>;
}
```

## 注意事项

1. **上下文传递**：确保上下文正确传递到所有需要的组件
2. **性能优化**：避免在上下文中传递大型对象
3. **类型安全**：使用 TypeScript 类型确保类型安全
4. **默认值**：为上下文提供合理的默认值
5. **上下文更新**：注意上下文更新时的性能影响
6. **嵌套上下文**：避免过多的上下文嵌套
7. **上下文隔离**：确保不同渲染器的上下文隔离
8. **内存泄漏**：注意上下文的内存管理

## 相关文件

- [`adapter/index.ts`](../adapter/index.md) - 运行时适配器
- [`hoc/leaf.tsx`](../hoc/leaf.md) - Leaf HOC
- [`renderer/base.tsx`](../renderer/base.md) - 基础渲染器

## 外部依赖

- `react`: React 运行时

## 典型使用场景

1. **渲染器上下文**：在渲染器中提供全局上下文
2. **组件访问**：在组件中访问渲染器上下文
3. **状态共享**：在组件树中共享状态
4. **国际化**：在组件树中共享国际化配置
5. **工具函数**：在组件树中共享工具函数
