# @vue3-lowcode/vue-renderer

## 简介

`@vue3-lowcode/vue-renderer` 是 Vue3 LowCode 框架的 Vue3 渲染器实现，基于 `@vue3-lowcode/renderer-core` 提供了 Vue3 组件的渲染能力。

## 功能特性

- 提供 Vue3 运行时实现 `VueRuntime`
- 提供 Vue3 渲染器实现 `VueRenderer`
- 提供 Vue3 渲染器实例实现 `VueRendererInstance`
- 支持 Vue3 Composition API
- 支持组件注册和管理
- 支持渲染实例生命周期管理
- 完整的类型支持

## 安装

```bash
pnpm add @vue3-lowcode/vue-renderer
```

## 使用

### VueRuntime

Vue3 运行时实现，用于管理渲染器的生命周期和状态。

```typescript
import { VueRuntime } from '@vue3-lowcode/vue-renderer';

const runtime = new VueRuntime();
runtime.init();
runtime.start();
```

### VueRenderer

Vue3 渲染器实现，用于渲染 Vue3 组件。

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';

const renderer = new VueRenderer();
renderer.init();
renderer.start();

// 设置容器
renderer.setContainer(document.getElementById('app'));

// 渲染组件
renderer.render({
  node: node,
  schema: schema,
});
```

### VueRendererInstance

Vue3 渲染器实例实现，表示单个组件的渲染实例。

```typescript
import { VueRendererInstance } from '@vue3-lowcode/vue-renderer';

const instance = new VueRendererInstance('instance-id');
instance.setNode(node);
instance.mount();
```

## API 文档

### VueRuntime

`VueRuntime` 实现了 `IRuntime` 接口，提供了以下方法：

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

### VueRenderer

`VueRenderer` 继承自 `BaseRenderer`，提供了以下方法：

| 方法 | 描述 |
|------|------|
| `init()` | 初始化渲染器 |
| `start()` | 启动渲染器 |
| `stop()` | 停止渲染器 |
| `dispose()` | 销毁渲染器 |
| `render(props)` | 渲染组件 |
| `setContainer(container)` | 设置容器 |
| `getContainer()` | 获取容器 |
| `registerComponent(name, component)` | 注册组件 |
| `unregisterComponent(name)` | 注销组件 |
| `getComponent(name)` | 获取组件 |
| `getComponents()` | 获取所有组件 |
| `getRendererInstance(id)` | 获取渲染器实例 |
| `registerRendererInstance(instance)` | 注册渲染器实例 |
| `unregisterRendererInstance(id)` | 注销渲染器实例 |
| `dispose()` | 销毁渲染器 |

### VueRendererInstance

`VueRendererInstance` 实现了 `IBaseRendererInstance` 接口，提供了以下方法：

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

## 使用示例

### 基本使用

```typescript
import { VueRuntime, VueRenderer } from '@vue3-lowcode/vue-renderer';

// 创建运行时
const runtime = new VueRuntime();
runtime.init();
runtime.start();

// 创建渲染器
const renderer = new VueRenderer();
renderer.init();
renderer.start();

// 设置容器
const container = document.getElementById('app');
renderer.setContainer(container);

// 渲染组件
renderer.render({
  node: node,
  schema: schema,
});
```

### 组件注册

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';
import MyComponent from './MyComponent.vue';

const renderer = new VueRenderer();
renderer.init();

// 注册组件
renderer.registerComponent('MyComponent', MyComponent);

// 获取组件
const component = renderer.getComponent('MyComponent');
```

### 渲染实例管理

```typescript
import { VueRendererInstance } from '@vue3-lowcode/vue-renderer';

// 创建渲染实例
const instance = new VueRendererInstance('instance-id');

// 设置节点
instance.setNode(node);

// 挂载组件
instance.mount();

// 更新组件
instance.update();

// 卸载组件
instance.unmount();

// 销毁组件
instance.destroy();
```

### 事件监听

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';

const renderer = new VueRenderer();
renderer.init();

// 监听事件
renderer.on('render', (props) => {
  console.log('Rendered:', props);
});

renderer.on('change', (state) => {
  console.log('Changed:', state);
});

// 取消监听
renderer.off('render', handler);
```

## 事件

### VueRuntime 事件

| 事件名 | 描述 |
|--------|------|
| `init` | 初始化完成 |
| `start` | 启动完成 |
| `stop` | 停止完成 |
| `dispose` | 销毁完成 |
| `change` | 状态变化 |

### VueRenderer 事件

| 事件名 | 描述 |
|--------|------|
| `init` | 初始化完成 |
| `start` | 启动完成 |
| `stop` | 停止完成 |
| `dispose` | 销毁完成 |
| `render` | 渲染完成 |
| `change` | 状态变化 |

### VueRendererInstance 事件

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
