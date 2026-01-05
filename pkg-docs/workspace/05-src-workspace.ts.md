# src/workspace.ts 文档

## 文件路径

`packages/workspace/src/workspace.ts`

## 功能概述

工作空间核心类，负责管理编辑器窗口、资源类型、窗口队列和资源列表。它是 Workspace 模块的核心实现，提供完整的窗口管理、资源管理和事件系统。

## 主要功能

1. **窗口管理**: 创建、打开、关闭、切换窗口
2. **资源管理**: 注册资源类型、管理资源列表
3. **窗口队列**: 延迟打开窗口，避免性能问题
4. **事件系统**: 发射窗口相关事件
5. **活动窗口**: 管理当前活动窗口
6. **窗口映射**: 维护窗口 ID 到窗口实例的映射

## 代码分析

### 类定义

```typescript
export class Workspace implements IWorkspace {
  context: BasicContext;
  enableAutoOpenFirstWindow: boolean;
  resourceTypeMap: Map<string, ResourceType>;
  @obx.ref windows: IEditorWindow[];
  editorWindowMap: Map<string, IEditorWindow>;
  @obx window: IEditorWindow;
  windowQueue: IWindowInfo[];
  resourceList: IResource[];
  shellModelFactory?: IPublicTypeShellModelFactory;
  emitter: IEventBus;
}
```

### 关键属性

- `context`: 基础上下文，提供插件上下文
- `enableAutoOpenFirstWindow`: 是否自动打开第一个窗口
- `resourceTypeMap`: 资源类型映射
- `windows`: 窗口列表（可观察）
- `editorWindowMap`: 窗口 ID 到窗口实例的映射
- `window`: 当前活动窗口（可观察）
- `windowQueue`: 窗口队列
- `resourceList`: 资源列表
- `shellModelFactory`: Shell 模型工厂
- `emitter`: 事件总线

### 构造函数

```typescript
constructor(
  registryInnerPlugin: (plugins: ILowCodePluginManager) => void,
  shellModelFactory?: IPublicTypeShellModelFactory
)
```

**说明**:
- 创建 BasicContext 实例
- 初始化事件总线
- 注册内部插件
- 初始化窗口队列和资源列表

### 核心方法

#### initWindow()

```typescript
async initWindow(): Promise<void>
```

**功能**: 初始化默认窗口

**说明**:
- 如果启用了自动打开第一个窗口
- 则会创建并打开第一个窗口

**使用示例**:
```typescript
await workspace.initWindow();
```

#### openEditorWindowByResource()

```typescript
async openEditorWindowByResource(resource: IResource, sleep: boolean = false): Promise<void>
```

**功能**: 通过资源打开编辑器窗口

**参数**:
- `resource`: 要打开的资源对象
- `sleep`: 是否休眠窗口（默认 `false`）

**说明**:
- 如果当前窗口正在初始化且未休眠，则将资源加入窗口队列
- 否则直接打开窗口
- 发射 `CHANGE_WINDOW` 和 `CHANGE_ACTIVE_WINDOW` 事件

**使用示例**:
```typescript
const resource = new Resource(resourceData, resourceType, workspace);
await workspace.openEditorWindowByResource(resource);
```

#### openEditorWindow()

```typescript
async openEditorWindow(name: string, title?: string, options?: IPublicTypeEditorWindowOptions, viewName?: string): Promise<void>
```

**功能**: 通过名称打开编辑器窗口

**参数**:
- `name`: 窗口名称
- `title`: 可选的窗口标题
- `options`: 可选的窗口选项
- `viewName`: 可选的视图名称

**说明**:
- 根据窗口名称查找资源类型
- 创建资源并打开窗口
- 发射 `CHANGE_WINDOW` 和 `CHANGE_ACTIVE_WINDOW` 事件

**使用示例**:
```typescript
await workspace.openEditorWindow(
  'myWindow',
  'My Window',
  { width: 800, height: 600 },
  'editor'
);
```

#### removeEditorWindow()

```typescript
removeEditorWindow(id: string): void
```

**功能**: 移除编辑器窗口

**参数**:
- `id`: 窗口 ID

**说明**:
- 从窗口列表中移除窗口
- 从窗口映射中移除窗口
- 更新活动窗口
- 发射 `CHANGE_WINDOW` 事件

**使用示例**:
```typescript
workspace.removeEditorWindow('window-1');
```

#### checkWindowQueue()

```typescript
checkWindowQueue(): void
```

**功能**: 检查并处理窗口队列

**说明**:
- 检查窗口队列是否为空
- 如果不为空，则取出队列中的第一个窗口信息
- 递归处理队列中的所有窗口

**使用示例**:
```typescript
workspace.checkWindowQueue();
```

#### setActive()

```typescript
setActive(): void
```

**功能**: 设置工作空间为激活状态

**说明**:
- 设置 BasicContext 的激活状态

**使用示例**:
```typescript
workspace.setActive();
```

#### registerResourceType()

```typescript
async registerResourceType(resourceTypeModel: IPublicTypeResourceType): Promise<void>
```

**功能**: 注册资源类型

**参数**:
- `resourceTypeModel`: 资源类型模型

**说明**:
- 创建 ResourceType 实例
- 存储到资源类型映射中
- 如果启用了自动打开第一个窗口，则初始化窗口

**使用示例**:
```typescript
await workspace.registerResourceType({
  resourceName: 'page',
  resourceType: 'editor',
  resourceTypeModel: {
    editorViews: [
      {
        viewName: 'editor-view',
        type: 'editor',
      }
    ],
  }
});
```

### 事件监听方法

#### onChangeWindows()

```typescript
onChangeWindows(fn: () => void): () => void
```

**功能**: 监听窗口列表变化

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `CHANGE_WINDOW` 事件
- 返回取消监听的函数

**使用示例**:
```typescript
const cancel = workspace.onChangeWindows(() => {
  console.log('Windows changed');
});
// 取消监听
cancel();
```

#### onChangeActiveWindow()

```typescript
onChangeActiveWindow(fn: () => void): () => void
```

**功能**: 监听活动窗口变化

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `CHANGE_ACTIVE_WINDOW` 事件
- 返回取消监听的函数

**使用示例**:
```typescript
const cancel = workspace.onChangeActiveWindow(() => {
  console.log('Active window changed');
});
// 取消监听
cancel();
```

#### onWindowRendererReady()

```typescript
onWindowRendererReady(fn: () => void): () => void
```

**功能**: 监听窗口渲染就绪

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `WINDOW_RENDER_READY` 事件
- 返回取消监听的函数

**使用示例**:
```typescript
const cancel = workspace.onWindowRendererReady(() => {
  console.log('Window renderer ready');
});
// 取消监听
cancel();
```

#### emitWindowRendererReady()

```typescript
emitWindowRendererReady(): void
```

**功能**: 发射窗口渲染就绪事件

**说明**:
- 发射 `WINDOW_RENDER_READY` 事件

**使用示例**:
```typescript
workspace.emitWindowRendererReady();
```

## 使用示例

### 基本使用

```typescript
import { Workspace } from '@alilc/lowcode-workspace';

// 创建工作空间
const workspace = new Workspace(
  (plugins) => {
    // 注册内部插件
  },
  shellModelFactory
);

// 注册资源类型
await workspace.registerResourceType({
  resourceName: 'page',
  resourceType: 'editor',
  resourceTypeModel: {
    editorViews: [
      {
        viewName: 'editor-view',
        type: 'editor',
      }
    ],
  }
});

// 初始化窗口
await workspace.initWindow();

// 监听窗口变化
workspace.onChangeWindows(() => {
  console.log('Windows changed');
});
```

### 打开窗口

```typescript
// 通过资源打开窗口
const resource = new Resource(resourceData, resourceType, workspace);
await workspace.openEditorWindowByResource(resource);

// 通过名称打开窗口
await workspace.openEditorWindow(
  'myWindow',
  'My Window',
  { width: 800, height: 600 },
  'editor'
);
```

### 窗口操作

```typescript
// 获取活动窗口
const activeWindow = workspace.window;

// 保存窗口数据
await activeWindow.save();

// 切换窗口
await workspace.openEditorWindowById(windowId);

// 关闭窗口
workspace.removeEditorWindow(windowId);
```

## 注意事项

1. **窗口状态**: 窗口状态转换有明确的逻辑，不要手动修改状态
2. **事件监听**: 总是在组件卸载时取消事件监听
3. **窗口队列**: 窗口队列用于延迟打开窗口，避免性能问题
4. **资源类型**: 资源类型需要在打开窗口前注册
5. **异步操作**: 所有涉及窗口和资源的操作都是异步的，需要使用 await

## 最佳实践

1. **资源注册**: 在使用资源前先注册资源类型
2. **事件清理**: 总是保存取消监听的函数，在组件卸载时调用
3. **错误处理**: 使用 try-catch 处理异步操作的错误
4. **窗口管理**: 避免直接操作窗口列表，使用提供的方法
5. **性能优化**: 使用窗口休眠机制减少资源消耗

## 相关文件

- [`resource.ts`](./06-src-resource.ts.md) - 资源类
- [`window.ts`](./09-src-window.ts.md) - 编辑器窗口类
- [`context/base-context.ts`](./08-src-context-base-context.ts.md) - 基础上下文类

## 总结

`src/workspace.ts` 是 Workspace 模块的核心实现，提供了完整的窗口管理、资源管理和事件系统。它采用 MobX 进行响应式状态管理，使用事件总线进行组件间通信，为开发者提供了强大、灵活的工作空间管理能力。
