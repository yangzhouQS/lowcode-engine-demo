# @vue3-lowcode/renderer-core

Vue3 低代码引擎渲染器核心包，提供渲染器基础接口和抽象类。

## 概述

`@vue3-lowcode/renderer-core` 是 Vue3 低代码引擎的渲染器核心包，提供了：

- **IRuntime 接口**: 定义了运行时的核心接口
- **BaseRenderer 类**: 提供了渲染器的基类实现
- **类型定义**: 完整的 TypeScript 类型支持

## 安装

```bash
pnpm add @vue3-lowcode/renderer-core
```

## 使用

### IRuntime 接口

`IRuntime` 接口定义了运行时的核心功能：

```typescript
import type { IRuntime } from '@vue3-lowcode/renderer-core';

class MyRuntime implements IRuntime {
  renderComponent(component, container, context) {
    // 实现组件渲染
  }
  
  unmountComponent(container) {
    // 实现组件卸载
  }
  
  // ... 其他方法
}
```

### BaseRenderer 类

`BaseRenderer` 是渲染器的基类，提供了核心功能：

```typescript
import { BaseRenderer } from '@vue3-lowcode/renderer-core';

class MyRenderer extends BaseRenderer {
  constructor() {
    super(myRuntime);
  }
  
  // 继承所有 IRuntime 方法
  renderComponent(component, container, context) {
    return super.renderComponent(component, container, context);
  }
}
```

## API

### IRuntime 接口

| 方法 | 描述 |
|------|------|
| `renderComponent(component, container, context?)` | 渲染组件到指定容器 |
| `unmountComponent(container)` | 卸载容器中的组件 |
| `createContext(data?)` | 创建渲染上下文 |
| `useContext(context)` | 使用渲染上下文 |
| `createComponentInstance(componentMeta, schema)` | 创建组件实例 |
| `destroyComponentInstance(instance)` | 销毁组件实例 |
| `getRuntimeConfig()` | 获取运行时配置 |
| `setRuntimeConfig(config)` | 设置运行时配置 |
| `registerComponent(name, component)` | 注册全局组件 |
| `unregisterComponent(name)` | 注销全局组件 |
| `getComponent(name)` | 获取全局组件 |
| `registerDirective(name, directive)` | 注册全局指令 |
| `unregisterDirective(name)` | 注销全局指令 |
| `getDirective(name)` | 获取全局指令 |
| `registerPlugin(plugin, options?)` | 注册全局插件 |
| `unregisterPlugin(plugin)` | 注销全局插件 |
| `getApp()` | 获取应用实例 |
| `destroy()` | 销毁运行时 |

### BaseRenderer 类

`BaseRenderer` 继承自 `IRuntime`，提供了额外的保护方法：

| 方法 | 描述 |
|------|------|
| `init()` | 初始化渲染器 |
| `log(message, ...data)` | 记录日志 |
| `generateId(prefix)` | 生成唯一 ID |
| `createReactive(initial)` | 创建响应式状态 |
| `createRef(initial)` | 创建响应式引用 |
| `createComputed(getter)` | 创建计算属性 |

## 类型

### RenderContext

渲染上下文接口：

```typescript
interface RenderContext {
  id: string;
  data: Record<string, any>;
  parent?: RenderContext;
  children?: RenderContext[];
}
```

### ComponentInstance

组件实例接口：

```typescript
interface ComponentInstance {
  instance: any;
  componentMeta: IComponentMeta;
  schema: ISchema;
  state: Record<string, any>;
  props: Record<string, any>;
  updateState(state: Record<string, any>): void;
  updateProps(props: Record<string, any>): void;
  destroy(): void;
}
```

### RuntimeConfig

运行时配置接口：

```typescript
interface RuntimeConfig {
  debug?: boolean;
  performance?: boolean;
  errorBoundary?: boolean;
  errorHandler?: (error: Error) => void;
  warningHandler?: (warning: string) => void;
  components?: Record<string, Component>;
  directives?: Record<string, any>;
  plugins?: Array<{ plugin: any; options?: any }>;
  context?: Record<string, any>;
}
```

## 示例

### 基本使用

```typescript
import { BaseRenderer } from '@vue3-lowcode/renderer-core';

// 创建自定义运行时
class MyRuntime implements IRuntime {
  renderComponent(component, container, context) {
    // 实现渲染逻辑
  }
  
  // ... 实现其他方法
}

// 创建渲染器
const renderer = new BaseRenderer(new MyRuntime(), {
  debug: true,
});

// 初始化渲染器
renderer.init();

// 渲染组件
const vnode = renderer.renderComponent(MyComponent, container);

// 销毁渲染器
renderer.destroy();
```

### 使用上下文

```typescript
// 创建上下文
const context = renderer.createContext({
  userId: '123',
  theme: 'dark',
});

// 使用上下文
const data = renderer.useContext(context);

// 渲染组件时传入上下文
renderer.renderComponent(MyComponent, container, context);
```

### 组件实例管理

```typescript
// 创建组件实例
const instance = renderer.createComponentInstance(componentMeta, schema);

// 更新状态
instance.updateState({ count: 10 });

// 更新属性
instance.updateProps({ title: 'Hello' });

// 销毁实例
instance.destroy();
```

## 最佳实践

1. **初始化**: 在使用渲染器前，先调用 `init()` 方法
2. **错误处理**: 设置 `errorBoundary` 和 `errorHandler` 来处理错误
3. **调试**: 开启 `debug` 模式来查看日志
4. **性能监控**: 开启 `performance` 模式来监控性能
5. **资源清理**: 使用完毕后调用 `destroy()` 方法清理资源

## TypeScript 支持

本包完全支持 TypeScript，提供完整的类型定义：

```typescript
import type {
  IRuntime,
  RenderContext,
  ComponentInstance,
  RuntimeConfig,
} from '@vue3-lowcode/renderer-core';
```

## 许可证

MIT
