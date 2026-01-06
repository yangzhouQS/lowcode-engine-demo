# @vue3-lowcode/renderer-core

## 简介

`@vue3-lowcode/renderer-core` 是 Vue3 LowCode 框架的渲染器核心包，提供了渲染器的基础接口和抽象类。

## 功能特性

- 提供运行时接口 `IRuntime`
- 提供渲染器接口 `IRenderer`
- 提供渲染器实例接口 `IBaseRendererInstance`
- 提供渲染器属性接口 `IRendererProps`
- 提供渲染器抽象基类 `BaseRenderer`

## 安装

```bash
pnpm add @vue3-lowcode/renderer-core
```

## 使用

### IRuntime 接口

运行时接口，用于管理渲染器的生命周期和状态。

```typescript
import type { IRuntime } from '@vue3-lowcode/renderer-core';

const runtime: IRuntime = {
  init(): void { /* 初始化逻辑 */ },
  start(): void { /* 启动逻辑 */ },
  stop(): void { /* 停止逻辑 */ },
  dispose(): void { /* 销毁逻辑 */ },
  getRenderer(): IRenderer | null { /* 获取渲染器 */ },
  setRenderer(renderer: IRenderer): void { /* 设置渲染器 */ },
  // ... 其他方法
};
```

### BaseRenderer 抽象类

渲染器抽象基类，提供了渲染器的基本实现。

```typescript
import { BaseRenderer } from '@vue3-lowcode/renderer-core';

class MyRenderer extends BaseRenderer {
  render(props: IRendererProps): void {
    // 实现渲染逻辑
  }
}

const renderer = new MyRenderer();
renderer.init();
renderer.start();
```

### IRenderer 接口

渲染器接口，定义了渲染器的基本行为。

```typescript
import type { IRenderer } from '@vue3-lowcode/renderer-core';

const renderer: IRenderer = {
  init(): void { /* 初始化逻辑 */ },
  start(): void { /* 启动逻辑 */ },
  stop(): void { /* 停止逻辑 */ },
  dispose(): void { /* 销毁逻辑 */ },
  render(props: IRendererProps): void { /* 渲染逻辑 */ },
  // ... 其他方法
};
```

### IBaseRendererInstance 接口

渲染器实例接口，表示单个组件的渲染实例。

```typescript
import type { IBaseRendererInstance } from '@vue3-lowcode/renderer-core';

const instance: IBaseRendererInstance = {
  getId(): string { /* 获取实例 ID */ },
  getNode(): INode | null { /* 获取节点 */ },
  setNode(node: INode): void { /* 设置节点 */ },
  getComponent(): any { /* 获取组件 */ },
  setComponent(component: any): void { /* 设置组件 */ },
  // ... 其他方法
};
```

### IRendererProps 接口

渲染器属性接口，定义了渲染器的属性。

```typescript
import type { IRendererProps } from '@vue3-lowcode/renderer-core';

const props: IRendererProps = {
  node: node,
  schema: schema,
  // ... 其他属性
};
```

## API 文档

### IRuntime

| 方法 | 描述 |
|------|------|
| `init()` | 初始化运行时 |
| `start()` | 启动运行时 |
| `stop()` | 停止运行时 |
| `dispose()` | 销毁运行时 |
| `getRenderer()` | 获取渲染器 |
| `setRenderer(renderer)` | 设置渲染器 |
| `getRendererInstance(id)` | 获取渲染器实例 |
| `registerRendererInstance(instance)` | 注册渲染器实例 |
| `unregisterRendererInstance(id)` | 注销渲染器实例 |
| `getRendererInstances()` | 获取所有渲染器实例 |
| `isReady()` | 检查是否准备就绪 |
| `isActive()` | 检查是否活动 |
| `getConfig()` | 获取配置 |
| `setConfig(config)` | 设置配置 |
| `on(event, listener)` | 监听事件 |
| `off(event, listener)` | 取消监听事件 |
| `emit(event, ...args)` | 触发事件 |

### IRenderer

| 方法 | 描述 |
|------|------|
| `init()` | 初始化渲染器 |
| `start()` | 启动渲染器 |
| `stop()` | 停止渲染器 |
| `dispose()` | 销毁渲染器 |
| `render(props)` | 渲染组件 |
| `getRuntime()` | 获取运行时 |
| `setRuntime(runtime)` | 设置运行时 |
| `isReady()` | 检查是否准备就绪 |
| `isActive()` | 检查是否活动 |
| `getConfig()` | 获取配置 |
| `setConfig(config)` | 设置配置 |
| `on(event, listener)` | 监听事件 |
| `off(event, listener)` | 取消监听事件 |
| `emit(event, ...args)` | 触发事件 |

### IBaseRendererInstance

| 方法 | 描述 |
|------|------|
| `getId()` | 获取实例 ID |
| `getNode()` | 获取节点 |
| `setNode(node)` | 设置节点 |
| `getComponent()` | 获取组件 |
| `setComponent(component)` | 设置组件 |
| `getProps()` | 获取属性 |
| `setProps(props)` | 设置属性 |
| `getProp(key)` | 获取属性值 |
| `setProp(key, value)` | 设置属性值 |
| `isMounted()` | 检查是否已挂载 |
| `mount()` | 挂载组件 |
| `unmount()` | 卸载组件 |
| `update()` | 更新组件 |
| `destroy()` | 销毁组件 |
| `on(event, listener)` | 监听事件 |
| `off(event, listener)` | 取消监听事件 |
| `emit(event, ...args)` | 触发事件 |

### IRendererProps

| 属性 | 描述 |
|------|------|
| `node` | 节点 |
| `schema` | Schema |
| `runtime` | 运行时 |
| `renderer` | 渲染器 |

### BaseRenderer

`BaseRenderer` 实现了 `IRenderer` 接口，提供了以下功能：

- 生命周期管理（init, start, stop, dispose）
- 渲染功能（render）
- 运行时管理（getRuntime, setRuntime）
- 配置管理（getConfig, setConfig）
- 事件系统（on, off, emit）
- 状态管理（isReady, isActive）

## 事件

### Runtime 事件

| 事件名 | 描述 |
|--------|------|
| `init` | 初始化完成 |
| `start` | 启动完成 |
| `stop` | 停止完成 |
| `dispose` | 销毁完成 |
| `change` | 状态变化 |

### Renderer 事件

| 事件名 | 描述 |
|--------|------|
| `init` | 初始化完成 |
| `start` | 启动完成 |
| `stop` | 停止完成 |
| `dispose` | 销毁完成 |
| `render` | 渲染完成 |
| `change` | 状态变化 |

### RendererInstance 事件

| 事件名 | 描述 |
|--------|------|
| `mounted` | 挂载完成 |
| `unmounted` | 卸载完成 |
| `updated` | 更新完成 |
| `destroyed` | 销毁完成 |
| `change` | 状态变化 |

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 测试
pnpm test

# 测试覆盖率
pnpm test:coverage
```

## 许可证

MIT
