# src/index.ts 文件功能说明

## 文件路径

`packages/react-renderer/src/index.ts`

## 功能概述

[`src/index.ts`](packages/react-renderer/src/index.ts) 是 React Renderer 模块的主入口文件，负责初始化 React 运行时环境、配置渲染器适配器、注册各种渲染器类型，并导出最终的 ReactRenderer 组件。该文件是整个模块的核心，将 React 框架的能力适配到低代码渲染核心中。

## 主要功能

1. **导入依赖**: 导入 React、ReactDOM、renderer-core 和 Fusion Design ConfigProvider
2. **全局挂载**: 将 React 和 ReactDOM 挂载到全局对象，方便调试
3. **配置运行时适配器**: 设置 React 运行时环境到适配器
4. **注册渲染器**: 注册多种类型的渲染器（页面、组件、区块、插件、临时、Div）
5. **配置 ConfigProvider**: 设置 Fusion Design 的 ConfigProvider
6. **创建 ReactRenderer**: 使用工厂模式创建并导出 ReactRenderer 组件

## 代码结构

```typescript
// 1. 导入 React 和 ReactDOM 的核心 API
import React, { Component, PureComponent, createElement, createContext, forwardRef, ReactInstance, ContextType } from 'react';
import ReactDOM from 'react-dom';

// 2. 导入 renderer-core 的适配器和渲染器工厂
import {
  adapter,                    // 运行时适配器
  pageRendererFactory,         // 页面渲染器工厂
  componentRendererFactory,     // 组件渲染器工厂
  blockRendererFactory,         // 区块渲染器工厂
  addonRendererFactory,         // 插件渲染器工厂
  tempRendererFactory,          // 临时渲染器工厂
  rendererFactory,             // 通用渲染器工厂
  types,                      // 类型定义
} from '@alilc/lowcode-renderer-core';

// 3. 导入 Fusion Design 的 ConfigProvider
import ConfigProvider from '@alifd/next/lib/config-provider';

// 4. 将 React 和 ReactDOM 挂载到全局对象
window.React = React;
(window as any).ReactDom = ReactDOM;

// 5. 配置 React 运行时环境
adapter.setRuntime({
  Component,           // React 组件基类
  PureComponent,      // React 纯组件基类
  createContext,       // 创建 React Context
  createElement,       // 创建 React 元素
  forwardRef,          // 转发 Ref
  findDOMNode: ReactDOM.findDOMNode,  // 查找 DOM 节点
});

// 6. 注册各种渲染器类型
adapter.setRenderers({
  PageRenderer: pageRendererFactory(),        // 页面渲染器
  ComponentRenderer: componentRendererFactory(), // 组件渲染器
  BlockRenderer: blockRendererFactory(),       // 区块渲染器
  AddonRenderer: addonRendererFactory(),       // 插件渲染器
  TempRenderer: tempRendererFactory(),        // 临时渲染器
  DivRenderer: blockRendererFactory(),        // Div 渲染器（复用 BlockRenderer）
});

// 7. 配置 Fusion Design 的 ConfigProvider
adapter.setConfigProvider(ConfigProvider);

// 8. 创建 ReactRenderer 组件
function factory(): types.IRenderComponent {
  const Renderer = rendererFactory();
  return class ReactRenderer extends Renderer implements Component {
    readonly props: types.IRendererProps;
    context: ContextType<any>;
    setState: (state: types.IRendererState, callback?: () => void) => void;
    forceUpdate: (callback?: () => void) => void;
    refs: { [key: string]: ReactInstance };

    constructor(props: types.IRendererProps, context: ContextType<any>) {
      super(props, context);
    }

    isValidComponent(obj: any) {
      return obj?.prototype?.isReactComponent || obj?.prototype instanceof Component;
    }
  };
}

// 9. 导出默认渲染器
export default factory();
```

## 详细说明

### 1. 依赖导入

#### React 和 ReactDOM

```typescript
import React, { Component, PureComponent, createElement, createContext, forwardRef, ReactInstance, ContextType } from 'react';
import ReactDOM from 'react-dom';
```

**功能**: 导入 React 框架的核心 API，包括：
- [`Component`](packages/react-renderer/src/index.ts:1): React 组件基类
- [`PureComponent`](packages/react-renderer/src/index.ts:1): React 纯组件基类，用于性能优化
- [`createElement`](packages/react-renderer/src/index.ts:1): 创建 React 元素
- [`createContext`](packages/react-renderer/src/index.ts:1): 创建 React Context
- [`forwardRef`](packages/react-renderer/src/index.ts:1): 转发 Ref
- [`ReactInstance`](packages/react-renderer/src/index.ts:1): React 实例类型
- [`ContextType`](packages/react-renderer/src/index.ts:1): Context 类型
- [`ReactDOM.findDOMNode`](packages/react-renderer/src/index.ts:24): 查找 DOM 节点

#### renderer-core

```typescript
import {
  adapter,                    // 运行时适配器
  pageRendererFactory,         // 页面渲染器工厂
  componentRendererFactory,     // 组件渲染器工厂
  blockRendererFactory,         // 区块渲染器工厂
  addonRendererFactory,         // 插件渲染器工厂
  tempRendererFactory,          // 临时渲染器工厂
  rendererFactory,             // 通用渲染器工厂
  types,                      // 类型定义
} from '@alilc/lowcode-renderer-core';
```

**功能**: 导入 renderer-core 提供的核心功能：
- [`adapter`](packages/react-renderer/src/index.ts:4): 运行时适配器，用于桥接框架和渲染核心
- [`pageRendererFactory`](packages/react-renderer/src/index.ts:5): 创建页面级渲染器
- [`componentRendererFactory`](packages/react-renderer/src/index.ts:6): 创建普通组件渲染器
- [`blockRendererFactory`](packages/react-renderer/src/index.ts:7): 创建区块渲染器
- [`addonRendererFactory`](packages/react-renderer/src/index.ts:8): 创建插件渲染器
- [`tempRendererFactory`](packages/react-renderer/src/index.ts:9): 创建临时渲染器
- [`rendererFactory`](packages/react-renderer/src/index.ts:10): 创建通用渲染器
- [`types`](packages/react-renderer/src/index.ts:11): TypeScript 类型定义

#### Fusion Design ConfigProvider

```typescript
import ConfigProvider from '@alifd/next/lib/config-provider';
```

**功能**: 导入 Fusion Design 组件库的 ConfigProvider，用于提供全局配置和主题。

### 2. 全局挂载

```typescript
window.React = React;
(window as any).ReactDom = ReactDOM;
```

**功能**: 将 React 和 ReactDOM 挂载到全局对象 `window` 上。

**设计目的**:
- 方便在浏览器控制台调试
- 允许外部代码访问 React 和 ReactDOM
- 支持某些依赖全局 React 的第三方库

### 3. 配置运行时适配器

```typescript
adapter.setRuntime({
  Component,           // React 组件基类
  PureComponent,      // React 纯组件基类
  createContext,       // 创建 React Context
  createElement,       // 创建 React 元素
  forwardRef,          // 转发 Ref
  findDOMNode: ReactDOM.findDOMNode,  // 查找 DOM 节点
});
```

**功能**: 将 React 框架的核心 API 注册到渲染核心的适配器中。

**参数说明**:
- `Component`: React 组件基类，用于创建有状态组件
- `PureComponent`: React 纯组件基类，用于性能优化
- `createContext`: 创建 React Context，用于跨组件传递数据
- `createElement`: 创建 React 元素，用于渲染组件树
- `forwardRef`: 转发 Ref，用于访问子组件的 DOM 节点
- `findDOMNode`: 查找 DOM 节点，用于直接操作 DOM

**设计模式**: 适配器模式（Adapter Pattern），将 React 框架的能力适配到通用的渲染核心中。

### 4. 注册渲染器类型

```typescript
adapter.setRenderers({
  PageRenderer: pageRendererFactory(),        // 页面渲染器
  ComponentRenderer: componentRendererFactory(), // 组件渲染器
  BlockRenderer: blockRendererFactory(),       // 区块渲染器
  AddonRenderer: addonRendererFactory(),       // 插件渲染器
  TempRenderer: tempRendererFactory(),        // 临时渲染器
  DivRenderer: blockRendererFactory(),        // Div 渲染器（复用 BlockRenderer）
});
```

**功能**: 注册多种类型的渲染器，用于渲染不同类型的组件。

**渲染器说明**:

| 渲染器名称 | 工厂函数 | 用途 |
|-----------|---------|------|
| [`PageRenderer`](packages/react-renderer/src/index.ts:28) | [`pageRendererFactory()`](packages/react-renderer/src/index.ts:28) | 渲染页面级组件，通常作为根组件 |
| [`ComponentRenderer`](packages/react-renderer/src/index.ts:29) | [`componentRendererFactory()`](packages/react-renderer/src/index.ts:29) | 渲染普通组件 |
| [`BlockRenderer`](packages/react-renderer/src/index.ts:30) | [`blockRendererFactory()`](packages/react-renderer/src/index.ts:30) | 渲染区块组件，用于组织页面结构 |
| [`AddonRenderer`](packages/react-renderer/src/index.ts:31) | [`addonRendererFactory()`](packages/react-renderer/src/index.ts:31) | 渲染插件组件，用于扩展功能 |
| [`TempRenderer`](packages/react-renderer/src/index.ts:32) | [`tempRendererFactory()`](packages/react-renderer/src/index.ts:32) | 渲染临时组件，用于临时展示 |
| [`DivRenderer`](packages/react-renderer/src/index.ts:33) | [`blockRendererFactory()`](packages/react-renderer/src/index.ts:33) | 渲染 Div 元素，复用 BlockRenderer |

**设计模式**: 工厂模式（Factory Pattern），通过工厂函数创建不同类型的渲染器。

### 5. 配置 ConfigProvider

```typescript
adapter.setConfigProvider(ConfigProvider);
```

**功能**: 设置 Fusion Design 的 ConfigProvider 作为配置提供者。

**设计目的**:
- 提供全局主题配置
- 支持国际化配置
- 统一管理组件库配置

### 6. 创建 ReactRenderer 组件

```typescript
function factory(): types.IRenderComponent {
  const Renderer = rendererFactory();
  return class ReactRenderer extends Renderer implements Component {
    readonly props: types.IRendererProps;
    context: ContextType<any>;
    setState: (state: types.IRendererState, callback?: () => void) => void;
    forceUpdate: (callback?: () => void) => void;
    refs: { [key: string]: ReactInstance };

    constructor(props: types.IRendererProps, context: ContextType<any>) {
      super(props, context);
    }

    isValidComponent(obj: any) {
      return obj?.prototype?.isReactComponent || obj?.prototype instanceof Component;
    }
  };
}
```

**功能**: 创建 ReactRenderer 组件类，继承自核心渲染器并实现 React Component 接口。

**类结构说明**:

- `extends Renderer`: 继承核心渲染器的基础功能
- `implements Component`: 实现 React Component 接口
- `readonly props: types.IRendererProps`: 只读的 props 属性
- `context: ContextType<any>`: React Context 类型
- `setState`: 更新组件状态的方法
- `forceUpdate`: 强制重新渲染的方法
- `refs`: 组件引用映射表
- `constructor(props, context)`: 构造函数，接收 props 和 context
- `isValidComponent(obj)`: 验证对象是否为有效的 React 组件

**设计模式**: 组合模式（Composite Pattern），结合核心渲染器和 React Component 的能力。

### 7. 导出默认渲染器

```typescript
export default factory();
```

**功能**: 导出默认的 ReactRenderer 组件实例。

**使用方式**:

```typescript
import ReactRenderer from '@alilc/lowcode-react-renderer';

// 使用 ReactRenderer
<ReactRenderer
  schema={schema}
  components={components}
  appHelper={appHelper}
  locale="zh-CN"
  messages={messages}
/>
```

## 架构模式

### 1. 适配器模式（Adapter Pattern）

通过 [`adapter.setRuntime()`](packages/react-renderer/src/index.ts:18) 将 React 框架的能力适配到通用的渲染核心中，实现框架无关性。

### 2. 工厂模式（Factory Pattern）

通过 [`adapter.setRenderers()`](packages/react-renderer/src/index.ts:27) 注册多种渲染器工厂，根据组件类型创建相应的渲染器实例。

### 3. 组合模式（Composite Pattern）

通过 [`factory()`](packages/react-renderer/src/index.ts:38) 函数创建 ReactRenderer 类，继承核心渲染器并实现 React Component 接口，组合两种能力。

## 设计优势

1. **框架无关性**: 通过适配器模式，核心渲染逻辑可以支持多种框架
2. **类型安全**: 使用 TypeScript 提供完整的类型定义
3. **可扩展性**: 支持自定义组件、工具函数和国际化配置
4. **组件化**: 每种渲染器类型都有独立的工厂函数，职责清晰
5. **复用性**: DivRenderer 复用 BlockRenderer，避免重复代码

## 注意事项

1. **全局挂载**: 将 React 和 ReactDOM 挂载到全局可能会污染全局命名空间
2. **渲染器注册**: 所有渲染器必须在导出 ReactRenderer 之前注册
3. **ConfigProvider**: ConfigProvider 必须在渲染器使用前配置
4. **类型定义**: 使用 types.IRenderComponent 确保类型安全
5. **组件验证**: isValidComponent 方法用于验证组件的有效性

## 相关文件

- [`packages/react-renderer/package.json`](packages/react-renderer/package.json): 包配置文件
- [`packages/react-renderer/tsconfig.json`](packages/react-renderer/tsconfig.json): TypeScript 配置文件
- [`packages/react-renderer/build.json`](packages/react-renderer/build.json): 构建配置文件
- [`@alilc/lowcode-renderer-core`](packages/react-renderer/src/index.ts:12): 渲染核心库

## 使用示例

### 基础使用

```typescript
import ReactRenderer from '@alilc/lowcode-react-renderer';

const schema = {
  componentName: 'Page',
  props: {
    style: { padding: '20px' }
  },
  children: [
    {
      componentName: 'Div',
      children: 'Hello World'
    }
  ]
};

const components = {
  Div: ({ children, ...props }) => <div {...props}>{children}</div>
};

<ReactRenderer
  schema={schema}
  components={components}
/>
```

### 完整使用（带工具函数和国际化）

```typescript
import ReactRenderer from '@alilc/lowcode-react-renderer';

const schema = {
  componentName: 'Page',
  state: {
    text: 'Hello'
  },
  methods: {
    onClick: {
      type: 'JSFunction',
      value: 'function() { console.log("clicked") }'
    }
  },
  children: [
    {
      componentName: 'Button',
      props: {
        onClick: {
          type: 'JSFunction',
          value: 'function() { this.onClick() }'
        }
      },
      children: 'Click Me'
    }
  ]
};

const components = {
  Button: ({ children, onClick }) => <button onClick={onClick}>{children}</button>
};

const appHelper = {
  utils: {
    formatDate: (date) => new Date(date).toLocaleDateString()
  },
  constants: {
    API_URL: 'https://api.example.com'
  }
};

<ReactRenderer
  schema={schema}
  components={components}
  appHelper={appHelper}
  locale="zh-CN"
  messages={{
    "hello": "你好",
    "world": "世界"
  }}
/>
```

## 总结

[`src/index.ts`](packages/react-renderer/src/index.ts) 是 React Renderer 模块的核心文件，通过适配器模式、工厂模式和组合模式，构建了一个灵活、可扩展的低代码渲染系统。它将 React 框架的能力适配到通用的渲染核心中，支持多种组件类型的渲染，并提供了丰富的扩展点，是低代码引擎运行时的关键组件。
