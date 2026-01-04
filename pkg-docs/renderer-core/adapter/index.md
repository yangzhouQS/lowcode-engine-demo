# Adapter - 运行时适配器

## 功能概述

[`adapter/index.ts`](../../packages/renderer-core/src/adapter/index.ts) 是运行时适配器模块，负责适配 React 和 Rax 运行时，提供统一的渲染接口。它通过抽象运行时接口，使得渲染器核心可以同时支持 React 和 Rax 两种前端框架。

## 主要功能

1. **运行时适配**：适配 React 和 Rax 运行时
2. **统一接口**：提供统一的组件创建、上下文创建等接口
3. **类型兼容**：提供类型兼容性支持
4. **运行时检测**：自动检测并适配当前运行时

## 核心类型和接口

### IRuntime

运行时接口，定义了 React/Rax 运行时需要提供的所有 API。

```typescript
export interface IRuntime {
  Component: IGeneralConstructor;
  PureComponent: IGeneralConstructor;
  createElement: (...args: any) => any;
  createContext: (...args: any) => any;
  forwardRef: (...args: any) => any;
  findDOMNode: (...args: any) => any;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| Component | IGeneralConstructor | 组件构造函数 |
| PureComponent | IGeneralConstructor | 纯组件构造函数 |
| createElement | (...args: any) => any | 创建元素的函数 |
| createContext | (...args: any) => any | 创建上下文的函数 |
| forwardRef | (...args: any) => any | 转发 ref 的函数 |
| findDOMNode: (...args: any) => any | 查找 DOM 节点的函数 |

### IGeneralConstructor

通用构造函数接口，用于兼容 React 和 Rax 的组件构造函数。

```typescript
export interface IGeneralConstructor<P = {}, S = {}> extends IReactComponent<P, S> {
  new (props: P, context?: any): IReactComponent<P, S>;
  displayName?: string;
  propTypes?: any;
  contextTypes?: any;
  childContextTypes?: any;
  defaultProps?: P;
  getDerivedStateFromProps?: (props: P, state: S) => S | null;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| new | (props: P, context?: any) => IReactComponent<P, S> | 构造函数 |
| displayName | string | 组件显示名称 |
| propTypes | any | 属性类型定义 |
| contextTypes | any | 上下文类型定义 |
| childContextTypes | any | 子组件上下文类型定义 |
| defaultProps | P | 默认属性 |
| getDerivedStateFromProps | (props: P, state: S) => S \| null | 从属性派生状态 |

### IGeneralComponent

通用组件接口，用于兼容 React 和 Rax 的组件实例。

```typescript
export interface IGeneralComponent<P = {}, S = {}> extends IReactComponent<P, S> {
  props: P;
  state: S;
  context: any;
  refs: Record<string, any>;
  setState(
    partialState: Partial<S> | ((prevState: S, props: P) => Partial<S> | null) | null,
    callback?: () => void
  ): void;
  forceUpdate(callback?: () => void): void;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| props | P | 组件属性 |
| state | S | 组件状态 |
| context | any | 组件上下文 |
| refs | Record<string, any> | 组件引用 |
| setState | (partialState, callback?) => void | 设置组件状态 |
| forceUpdate | (callback?) => void | 强制更新组件 |

### IReactComponent

React 组件接口，定义了 React 组件的基本结构。

```typescript
export interface IReactComponent<P = {}, S = {}> {
  render?(): any;
  componentDidMount?(): void;
  componentWillMount?(): void;
  componentWillReceiveProps?(nextProps: P, nextContext: any): void;
  shouldComponentUpdate?(nextProps: P, nextState: S, nextContext: any): boolean;
  componentWillUpdate?(nextProps: P, nextState: S, nextContext: any): void;
  componentDidUpdate?(prevProps: P, prevState: S, snapshot?: any): void;
  componentWillUnmount?(): void;
  componentDidCatch?(error: Error, errorInfo: any): void;
}
```

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| render | - | any | 渲染组件 |
| componentDidMount | - | void | 组件挂载后调用 |
| componentWillMount | - | void | 组件挂载前调用（已废弃） |
| componentWillReceiveProps | nextProps: P, nextContext: any | void | 组件接收新属性时调用（已废弃） |
| shouldComponentUpdate | nextProps: P, nextState: S, nextContext: any | boolean | 判断组件是否需要更新 |
| componentWillUpdate | nextProps: P, nextState: S, nextContext: any | void | 组件更新前调用（已废弃） |
| componentDidUpdate | prevProps: P, prevState: S, snapshot?: any | void | 组件更新后调用 |
| componentWillUnmount | - | void | 组件卸载前调用 |
| componentDidCatch | error: Error, errorInfo: any | void | 捕获组件错误 |

## 核心函数

### getRuntime

获取当前运行时实例。

```typescript
export function getRuntime(): IRuntime {
  if (!runtime) {
    runtime = createRuntime();
  }
  return runtime;
}
```

**返回值：** `IRuntime` - 当前运行时实例

**说明：**
- 单例模式，确保全局只有一个运行时实例
- 自动检测并适配当前运行时（React 或 Rax）

**使用示例：**

```typescript
import { getRuntime } from '@alilc/lowcode-renderer-core';

const runtime = getRuntime();
const element = runtime.createElement('div', { className: 'container' }, 'Hello');
```

### createRuntime

创建运行时实例。

```typescript
function createRuntime(): IRuntime {
  const React = require('react');
  return {
    Component: React.Component,
    PureComponent: React.PureComponent,
    createElement: React.createElement,
    createContext: React.createContext,
    forwardRef: React.forwardRef,
    findDOMNode: React.findDOMNode,
  };
}
```

**返回值：** `IRuntime` - 运行时实例

**说明：**
- 动态加载 React 模块
- 将 React 的 API 映射到统一的接口

**使用示例：**

```typescript
import { createRuntime } from '@alilc/lowcode-renderer-core';

const runtime = createRuntime();
const Component = runtime.Component;
```

### setRuntime

设置运行时实例（用于测试或自定义运行时）。

```typescript
export function setRuntime(r: IRuntime): void {
  runtime = r;
}
```

**参数：**
- `r: IRuntime` - 运行时实例

**说明：**
- 用于测试场景或自定义运行时
- 覆盖默认的 React 运行时

**使用示例：**

```typescript
import { setRuntime } from '@alilc/lowcode-renderer-core';

const customRuntime = {
  Component: CustomComponent,
  PureComponent: CustomPureComponent,
  createElement: customCreateElement,
  createContext: customCreateContext,
  forwardRef: customForwardRef,
  findDOMNode: customFindDOMNode,
};

setRuntime(customRuntime);
```

## 使用示例

### 基础使用

```typescript
import { getRuntime } from '@alilc/lowcode-renderer-core';

const runtime = getRuntime();

// 创建组件类
class MyComponent extends runtime.Component {
  render() {
    return runtime.createElement('div', null, 'Hello World');
  }
}

// 创建元素
const element = runtime.createElement(MyComponent, { title: 'My Component' });

// 创建上下文
const MyContext = runtime.createContext();
```

### 自定义运行时

```typescript
import { setRuntime, getRuntime } from '@alilc/lowcode-renderer-core';

// 设置自定义运行时
setRuntime({
  Component: MyComponent,
  PureComponent: MyPureComponent,
  createElement: myCreateElement,
  createContext: myCreateContext,
  forwardRef: myForwardRef,
  findDOMNode: myFindDOMNode,
});

// 使用自定义运行时
const runtime = getRuntime();
```

### 类型检查

```typescript
import { IGeneralConstructor, IGeneralComponent } from '@alilc/lowcode-renderer-core';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

class MyComponent extends IGeneralConstructor<MyComponentProps, {}> {
  render() {
    return <div>{this.props.title}</div>;
  }
}
```

## 注意事项

1. **运行时检测**：运行时会自动检测并适配当前运行时
2. **单例模式**：运行时实例是单例的，全局唯一
3. **兼容性**：确保适配的运行时提供所有必需的 API
4. **类型安全**：使用 TypeScript 类型确保类型安全
5. **性能考虑**：运行时适配会有一定的性能开销
6. **测试支持**：可以通过 setRuntime 设置自定义运行时进行测试
7. **版本兼容**：确保 React/Rax 版本兼容性
8. **API 完整性**：确保所有必需的 API 都已实现

## 相关文件

- [`context/index.ts`](../context/index.md) - 上下文工厂
- [`hoc/leaf.tsx`](../hoc/leaf.md) - Leaf HOC
- [`renderer/base.tsx`](../renderer/base.md) - 基础渲染器

## 外部依赖

- `react`: React 运行时（默认）

## 典型使用场景

1. **React 应用**：在 React 应用中使用渲染器核心
2. **Rax 应用**：在 Rax 应用中使用渲染器核心
3. **跨框架应用**：在需要同时支持 React 和 Rax 的应用中使用
4. **测试场景**：在测试中使用自定义运行时
5. **插件开发**：在插件开发中使用运行时适配
