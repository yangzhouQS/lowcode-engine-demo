# src/window.ts 文档

## 文件路径

`packages/workspace/src/window.ts`

## 功能概述

编辑器窗口类，管理编辑器窗口的状态、视图和资源。支持窗口状态机（sleep, active, inactive, destroyed）。

## 主要功能

1. **窗口状态管理**: 管理窗口的四种状态（sleep, active, inactive, destroyed）
2. **视图管理**: 管理编辑器视图的切换和更新
3. **资源管理**: 管理窗口关联的资源
4. **事件系统**: 提供窗口状态变化事件

## 代码分析

### 导入

```typescript
import { obx, makeObservable } from '@alilc/lowcode-editor-core';
import { IEditorWindow, IResource, IPublicTypeEditorView, WINDOW_STATE } from '@alilc/lowcode-types';
import { BasicContext } from './context/base-context';
```

### 类定义

```typescript
export class EditorWindow implements IEditorWindow {
  id: string;
  title: string;
  icon?: string;
  resource: IResource;
  editorViews: IPublicTypeEditorView[];
  @obx.ref view: IPublicTypeEditorView | null = null;
  @obx.ref state: WINDOW_STATE = WINDOW_STATE.SLEEP;
  context: BasicContext;
}
```

### 构造函数

```typescript
constructor(
  resource: IResource,
  context: BasicContext,
  options: {
    title?: string;
    icon?: string;
  } = {}
)
```

**参数**:
- `resource: IResource` - 窗口关联的资源
- `context: BasicContext` - 基础上下文
- `options.title?: string` - 窗口标题
- `options.icon?: string` - 窗口图标

**说明**:
- 初始化窗口 ID（使用时间戳）
- 设置窗口标题和图标
- 设置窗口关联的资源
- 设置窗口的编辑器视图
- 初始状态为 SLEEP
- 设置窗口上下文
- 使类可观察

### 属性

#### id

```typescript
id: string
```

**功能**: 窗口唯一标识

**说明**: 使用时间戳生成唯一 ID

#### title

```typescript
title: string
```

**功能**: 窗口标题

**说明**: 默认值为资源名称

#### icon

```typescript
icon?: string
```

**功能**: 窗口图标

**说明**: 可选的窗口图标

#### resource

```typescript
resource: IResource
```

**功能**: 窗口关联的资源

**说明**: 包含资源数据和编辑器视图

#### editorViews

```typescript
editorViews: IPublicTypeEditorView[]
```

**功能**: 编辑器视图列表

**说明**: 从资源中获取所有编辑器视图

#### view

```typescript
@obx.ref view: IPublicTypeEditorView | null
```

**功能**: 当前激活的编辑器视图

**说明**: 使用 MobX 的 ref 装饰器，初始值为 null

#### state

```typescript
@obx.ref state: WINDOW_STATE
```

**功能**: 窗口状态

**说明**: 
- 使用 MobX 的 ref 装饰器
- 初始状态为 WINDOW_STATE.SLEEP
- 支持的状态：SLEEP, ACTIVE, INACTIVE, DESTROYED

#### context

```typescript
context: BasicContext
```

**功能**: 窗口上下文

**说明**: 包含设计器、编辑器、骨架等核心模块

### 方法

#### updateState

```typescript
updateState(state: WINDOW_STATE): void
```

**功能**: 更新窗口状态

**参数**:
- `state: WINDOW_STATE` - 新的窗口状态

**说明**:
- 更新窗口状态
- 触发状态变化事件

**使用示例**:
```typescript
window.updateState(WINDOW_STATE.ACTIVE);
```

#### importSchema

```typescript
async importSchema(schema: any): Promise<void>
```

**功能**: 导入 schema 到资源

**参数**:
- `schema: any` - 要导入的 schema

**说明**:
- 调用资源的 import 方法
- 异步操作

**使用示例**:
```typescript
await window.importSchema({ componentName: 'Page', children: [] });
```

#### save

```typescript
async save(value: any): Promise<void>
```

**功能**: 保存资源

**参数**:
- `value: any` - 要保存的值

**说明**:
- 调用资源的 save 方法
- 异步操作

**使用示例**:
```typescript
await window.save({ componentName: 'Page', children: [] });
```

#### init

```typescript
async init(): Promise<void>
```

**功能**: 初始化窗口

**说明**:
- 设置默认视图为第一个编辑器视图
- 异步操作

**使用示例**:
```typescript
await window.init();
```

#### changeViewName

```typescript
changeViewName(viewName: string): void
```

**功能**: 切换编辑器视图

**参数**:
- `viewName: string` - 视图名称

**说明**:
- 根据视图名称查找对应的编辑器视图
- 更新当前视图
- 如果找不到视图，保持当前视图不变

**使用示例**:
```typescript
window.changeViewName('editor-view');
```

#### onStateChange

```typescript
onStateChange(fn: (state: WINDOW_STATE) => void): () => void
```

**功能**: 监听窗口状态变化

**参数**:
- `fn: (state: WINDOW_STATE) => void` - 状态变化回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 使用 MobX 的 autorun 监听状态变化
- 返回取消监听的函数

**使用示例**:
```typescript
const dispose = window.onStateChange((state) => {
  console.log('Window state changed:', state);
});
dispose(); // 取消监听
```

## 窗口状态

### SLEEP

**说明**: 窗口休眠状态，不渲染内容

**转换**:
- SLEEP → ACTIVE: 激活窗口
- SLEEP → DESTROYED: 销毁窗口

### ACTIVE

**说明**: 窗口激活状态，渲染内容

**转换**:
- ACTIVE → INACTIVE: 停用窗口
- ACTIVE → DESTROYED: 销毁窗口

### INACTIVE

**说明**: 窗口停用状态，不渲染内容

**转换**:
- INACTIVE → ACTIVE: 激活窗口
- INACTIVE → DESTROYED: 销毁窗口

### DESTROYED

**说明**: 窗口销毁状态，不可恢复

**转换**:
- DESTROYED: 终态，不可转换

## 使用示例

### 创建窗口

```typescript
import { EditorWindow } from '@alilc/lowcode-workspace';

const window = new EditorWindow(resource, context, {
  title: 'My Page',
  icon: 'page-icon',
});
```

### 初始化窗口

```typescript
await window.init();
```

### 激活窗口

```typescript
window.updateState(WINDOW_STATE.ACTIVE);
```

### 切换视图

```typescript
window.changeViewName('editor-view');
```

### 导入 Schema

```typescript
await window.importSchema({
  componentName: 'Page',
  props: {},
  children: [],
});
```

### 保存资源

```typescript
await window.save({
  componentName: 'Page',
  props: {},
  children: [],
});
```

### 监听状态变化

```typescript
const dispose = window.onStateChange((state) => {
  console.log('State changed:', state);
});
dispose();
```

## 注意事项

1. **窗口状态**: 窗口状态转换需要遵循状态机规则
2. **视图切换**: 切换视图时，视图名称必须存在于 editorViews 中
3. **异步操作**: importSchema、save、init 都是异步方法
4. **事件监听**: 使用 onStateChange 监听状态变化后，记得调用返回的函数取消监听
5. **窗口 ID**: 窗口 ID 使用时间戳生成，确保唯一性

## 最佳实践

1. **状态管理**: 遵循窗口状态机规则，不要随意切换状态
2. **视图切换**: 切换视图前，检查视图是否存在
3. **异步处理**: 使用 async/await 处理异步操作
4. **事件监听**: 及时取消不再需要的事件监听
5. **资源管理**: 窗口销毁时，清理相关资源

## 相关文件

- [`workspace.ts`](./05-src-workspace.ts.md) - 工作空间核心类，管理窗口
- [`resource.ts`](./06-src-resource.ts.md) - 资源类
- [`context/base-context.ts`](./11-src-context-base-context.ts.md) - 基础上下文类

## 总结

`src/window.ts` 是编辑器窗口类，负责管理编辑器窗口的状态、视图和资源。它提供了窗口状态机、视图切换、资源导入保存等功能，是工作空间窗口管理的核心实现。
