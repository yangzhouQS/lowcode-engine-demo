# @vue3-lowcode/vue-renderer

Vue3 低代码引擎 Vue 渲染器实现，基于 Vue3 框架提供渲染功能。

## 概述

`@vue3-lowcode/vue-renderer` 是 Vue3 低代码引擎的 Vue 渲染器实现，提供了：

- **VueRuntime 类**: Vue3 特定的运行时实现
- **VueRenderer 类**: Vue3 特定的渲染器实现
- **完整的 TypeScript 支持**: 提供完整的类型定义

## 安装

```bash
pnpm add @vue3-lowcode/vue-renderer
```

## 使用

### VueRuntime 类

`VueRuntime` 实现了 `IRuntime` 接口，提供 Vue3 特定的运行时功能：

```typescript
import { VueRuntime } from '@vue3-lowcode/vue-renderer';

const runtime = new VueRuntime({
  debug: true,
  performance: true,
});

// 获取应用实例
const app = runtime.getApp();

// 挂载应用
app.mount('#app');
```

### VueRenderer 类

`VueRenderer` 继承自 `BaseRenderer`，提供 Vue3 特定的渲染功能：

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';

const renderer = new VueRenderer({
  debug: true,
  performance: true,
});

// 初始化渲染器
renderer.init();

// 渲染组件
const vnode = renderer.renderComponent(MyComponent, container);

// 创建上下文
const context = renderer.createContext({ userId: '123' });

// 销毁渲染器
renderer.destroy();
```

## API

### VueRuntime 类

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

### VueRenderer 类

`VueRenderer` 继承自 `BaseRenderer`，提供了额外的便捷方法：

| 方法 | 描述 |
|------|------|
| `getVueRuntime()` | 获取 Vue 运行时实例 |
| `registerComponents(components)` | 批量注册组件 |
| `registerDirectives(directives)` | 批量注册指令 |
| `registerPlugins(plugins)` | 批量注册插件 |
| `getAllComponents()` | 获取所有已注册的组件 |
| `getAllDirectives()` | 获取所有已注册的指令 |
| `getAllPlugins()` | 获取所有已注册的插件 |
| `clearComponents()` | 清空所有已注册的组件 |
| `clearDirectives()` | 清空所有已注册的指令 |
| `clearPlugins()` | 清空所有已注册的插件 |
| `hasComponent(name)` | 检查组件是否已注册 |
| `hasDirective(name)` | 检查指令是否已注册 |
| `hasPlugin(plugin)` | 检查插件是否已注册 |
| `getComponentInstanceCount()` | 获取组件实例数量 |
| `getContextCount()` | 获取渲染上下文数量 |
| `getAllComponentInstances()` | 获取所有组件实例 |
| `getAllContexts()` | 获取所有渲染上下文 |
| `getComponentInstanceById(instanceId)` | 根据组件实例 ID 获取组件实例 |
| `getContextById(contextId)` | 根据上下文 ID 获取渲染上下文 |
| `createComponentInstances(items)` | 批量创建组件实例 |
| `destroyComponentInstances(instances)` | 批量销毁组件实例 |
| `createContexts(dataList?)` | 批量创建渲染上下文 |
| `renderComponents(items)` | 批量渲染组件 |
| `unmountComponents(containers)` | 批量卸载组件 |

## 示例

### 基本使用

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';

// 创建渲染器
const renderer = new VueRenderer({
  debug: true,
});

// 初始化渲染器
renderer.init();

// 渲染组件
const container = document.getElementById('app');
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

### 批量操作

```typescript
// 批量注册组件
renderer.registerComponents({
  Button: MyButton,
  Input: MyInput,
  Select: MySelect,
});

// 批量注册指令
renderer.registerDirectives({
  focus: MyFocusDirective,
  blur: MyBlurDirective,
});

// 批量创建组件实例
const instances = renderer.createComponentInstances([
  { componentMeta, schema },
  { componentMeta2, schema2 },
]);

// 批量渲染组件
const vnodes = renderer.renderComponents([
  { component: MyComponent, container: container1 },
  { component: MyComponent2, container: container2 },
]);
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

// 获取所有组件实例
const allInstances = renderer.getAllComponentInstances();

// 根据实例 ID 获取实例
const instance = renderer.getComponentInstanceById('instance_id');
```

## 最佳实践

1. **初始化**: 在使用渲染器前，先调用 `init()` 方法
2. **错误处理**: 设置 `errorBoundary` 和 `errorHandler` 来处理错误
3. **调试**: 启用 `debug` 模式来查看日志
4. **性能监控**: 启用 `performance` 模式来监控性能
5. **资源清理**: 使用完毕后调用 `destroy()` 方法清理资源
6. **批量操作**: 使用批量方法来提高性能
7. **上下文管理**: 合理使用上下文来管理组件状态

## TypeScript 支持

本包完全支持 TypeScript，提供完整的类型定义：

```typescript
import {
  VueRuntime,
  VueRenderer,
} from '@vue3-lowcode/vue-renderer';

import type {
  IRuntime,
  RenderContext,
  ComponentInstance,
  RuntimeConfig,
} from '@vue3-lowcode/renderer-core';
```

## 依赖

- `@vue3-lowcode/types`: 类型定义
- `@vue3-lowcode/utils`: 工具库
- `@vue3-lowcode/renderer-core`: 渲染器核心
- `vue`: Vue3 框架

## 许可证

MIT
