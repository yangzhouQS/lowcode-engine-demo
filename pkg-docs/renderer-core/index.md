# Renderer Core 模块概览

## 功能概述

[`@alilc/lowcode-renderer-core`](packages/renderer-core) 是低代码引擎的渲染器核心模块，负责将低代码协议的 Schema 转换为 React/Rax 组件并渲染到画布上。它是低代码引擎渲染层的基础，提供了完整的渲染能力，包括组件渲染、页面渲染、区块渲染、插件渲染等。

## 主要功能

1. **运行时适配**：适配 React 和 Rax 运行时，提供统一的渲染接口
2. **组件渲染**：支持普通组件、页面组件、区块组件、插件组件、临时组件的渲染
3. **高阶组件**：提供 Leaf HOC，支持组件属性变化、可见性变化、子元素变化等
4. **上下文管理**：提供 React Context，管理渲染器上下文
5. **类型系统**：定义完整的类型系统，支持 React 和 Rax
6. **生命周期管理**：支持组件生命周期方法的执行
7. **数据源管理**：支持数据源的加载和管理
8. **国际化支持**：支持多语言国际化
9. **表达式解析**：支持 JS 表达式和函数的解析
10. **错误处理**：提供错误组件，处理渲染异常
11. **样式管理**：支持 CSS 样式的动态注入
12. **设计模式**：支持 live、design、preview 等设计模式

## 模块架构

```
renderer-core/
├── adapter/           # 运行时适配层
│   └── index.ts    # 适配 React/Rax 运行时
├── context/           # 上下文管理
│   └── index.ts    # React Context 工厂
├── hoc/               # 高阶组件
│   ├── index.tsx    # HOC 入口
│   └── leaf.tsx    # Leaf HOC 实现
├── renderer/           # 渲染器
│   ├── index.ts     # 渲染器入口
│   ├── base.tsx    # 基础渲染器
│   ├── page.tsx    # 页面渲染器
│   ├── component.tsx # 组件渲染器
│   ├── block.tsx    # 区块渲染器
│   ├── addon.tsx    # 插件渲染器
│   ├── temp.tsx     # 临时渲染器
│   └── renderer.tsx # 渲染器入口
├── components/         # 基础组件
│   ├── Div.tsx     # Div 组件
│   └── VisualDom/   # 虚拟 DOM 组件
│       ├── index.tsx
│       └── index.css
├── types/             # 类型定义
│   └── index.ts    # 所有类型定义
└── utils/             # 工具函数
    ├── index.ts     # 工具函数入口
    ├── common.ts    # 通用工具函数
    ├── data-helper.ts # 数据源管理
    ├── logger.ts    # 日志工具
    └── request.ts   # 请求工具
```

## 核心类

### Adapter
- [`adapter/index.ts`](adapter/index.md) - 运行时适配器，适配 React 和 Rax 运行时

### Context
- [`context/index.ts`](context/index.md) - 上下文工厂，创建 React Context

### HOC
- [`hoc/index.tsx`](hoc/index.md) - 高阶组件入口
- [`hoc/leaf.tsx`](hoc/leaf.md) - Leaf HOC，支持组件属性变化、可见性变化、子元素变化

### Renderer
- [`renderer/base.tsx`](renderer/base.md) - 基础渲染器，提供核心渲染能力
- [`renderer/page.tsx`](renderer/page.md) - 页面渲染器
- [`renderer/component.tsx`](renderer/component.md) - 组件渲染器
- [`renderer/block.tsx`](renderer/block.md) - 区块渲染器
- [`renderer/addon.tsx`](renderer/addon.md) - 插件渲染器
- [`renderer/temp.tsx`](renderer/temp.md) - 临时渲染器
- [`renderer/renderer.tsx`](renderer/renderer.md) - 渲染器入口

### Components
- [`components/Div.tsx`](components/Div.md) - Div 组件
- [`components/VisualDom/index.tsx`](components/VisualDom.md) - 虚拟 DOM 组件

### Types
- [`types/index.ts`](types/index.md) - 类型定义

### Utils
- [`utils/common.ts`](utils/common.md) - 通用工具函数
- [`utils/data-helper.ts`](utils/data-helper.md) - 数据源管理
- [`utils/logger.ts`](utils/logger.md) - 日志工具
- [`utils/request.ts`](utils/request.md) - 请求工具

## API 设计

### IRuntime
运行时接口，定义了 React/Rax 运行时需要提供的所有 API。

```typescript
interface IRuntime {
  Component: IGeneralConstructor;
  PureComponent: IGeneralConstructor;
  createElement: (...args: any) => any;
  createContext: (...args: any) => any;
  forwardRef: (...args: any) => any;
  findDOMNode: (...args: any) => any;
}
```

### IRendererProps
渲染器属性接口，定义了渲染器的所有配置项。

```typescript
interface IRendererProps {
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

### IBaseRendererInstance
基础渲染器实例接口，定义了基础渲染器的所有方法。

```typescript
interface IBaseRendererInstance extends IGeneralComponent<
  IBaseRendererProps,
  Record<string, any>,
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

## 架构模式

### 适配器模式
使用适配器模式，将 React 和 Rax 运行时适配为统一的接口。

### 工厂模式
使用工厂模式创建各种类型的渲染器。

### 高阶组件模式
使用高阶组件模式，为组件添加额外的功能。

### 策略模式
使用策略模式，根据不同的渲染类型选择不同的渲染策略。

### 观察者模式
使用观察者模式，监听组件属性变化并触发重新渲染。

### 模板方法模式
使用模板方法模式，定义渲染的核心算法。

### 组合模式
使用组合模式，组合多个组件形成复杂的渲染结构。

### 单例模式
使用单例模式，确保某些全局资源只创建一次。

## 核心流程

### 渲染流程
1. 接收 Schema
2. 解析 Schema
3. 创建组件实例
4. 执行生命周期方法
5. 渲染组件
6. 返回渲染结果

### 数据源流程
1. 初始化数据源配置
2. 加载数据
3. 处理数据
4. 更新状态
5. 触发重新渲染

### 生命周期流程
1. constructor
2. componentWillMount（已废弃）
3. render
4. componentDidMount
5. componentDidUpdate
6. componentWillUnmount
7. componentDidCatch

## 使用示例

### 基础使用

```typescript
import { Renderer } from '@alilc/lowcode-renderer-core';

const renderer = new Renderer({
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
import { Renderer } from '@alilc/lowcode-renderer-core';

const renderer = new Renderer({
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
import { Renderer } from '@alilc/lowcode-renderer-core';

const renderer = new Renderer({
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

## 注意事项

1. **运行时适配**：确保正确适配 React 或 Rax 运行时
2. **生命周期**：注意生命周期方法的执行顺序
3. **数据源**：数据源配置需要正确设置
4. **表达式解析**：表达式解析需要正确的上下文
5. **错误处理**：错误处理需要提供友好的错误信息
6. **性能优化**：注意组件渲染的性能优化
7. **内存管理**：注意组件销毁时的内存清理
8. **样式注入**：样式注入需要避免重复注入
9. **国际化**：国际化需要提供完整的语言包
10. **设计模式**：设计模式需要正确设置，影响组件行为

## 相关文件

- [`adapter/index.ts`](adapter/index.md) - 适配器
- [`context/index.ts`](context/index.md) - 上下文
- [`hoc/index.tsx`](hoc/index.md) - 高阶组件
- [`hoc/leaf.tsx`](hoc/leaf.md) - Leaf HOC
- [`renderer/base.tsx`](renderer/base.md) - 基础渲染器
- [`renderer/page.tsx`](renderer/page.md) - 页面渲染器
- [`renderer/component.tsx`](renderer/component.md) - 组件渲染器
- [`renderer/block.tsx`](renderer/block.md) - 区块渲染器
- [`renderer/addon.tsx`](renderer/addon.md) - 插件渲染器
- [`renderer/temp.tsx`](renderer/temp.md) - 临时渲染器
- [`renderer/renderer.tsx`](renderer/renderer.md) - 渲染器入口
- [`types/index.ts`](types/index.md) - 类型定义
- [`utils/common.ts`](utils/common.md) - 通用工具函数
- [`utils/data-helper.ts`](utils/data-helper.md) - 数据源管理
- [`utils/logger.ts`](utils/logger.md) - 日志工具
- [`utils/request.ts`](utils/request.md) - 请求工具

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-designer`: 设计器
- `@alilc/lowcode-utils`: 工具函数
- `@alilc/lowcode-datasource-engine`: 数据源引擎
- `prop-types`: React PropTypes
- `intl-messageformat`: 国际化消息格式化
- `lodash`: 工具函数库
- `debug`: 调试工具
