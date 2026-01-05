# src/index.ts 文档

## 文件路径

`packages/workspace/src/index.ts`

## 功能概述

模块入口文件，导出 Workspace 模块的所有公共 API，包括 Workspace 类、窗口相关类型和组件、Resource 类和 Context 相关类型。

## 主要功能

1. **导出 Workspace 类**: 工作空间核心类
2. **导出 IWorkspace 接口**: 工作空间接口定义
3. **导出窗口相关类型和类**: EditorWindow 类、WINDOW_STATE 枚举、IWindowInfo 类型
4. **导出 Workbench 组件**: 工作台布局组件
5. **导出 Resource 类**: 资源类
6. **导出 IResource 接口**: 资源接口定义
7. **导出 Context 相关类型**: IViewContext 接口

## 代码分析

```typescript
export { Workspace } from './workspace';
export type { IWorkspace } from './workspace';
export * from './window';
export * from './layouts/workbench';
export { Resource } from './resource';
export type { IResource } from './resource';
export * from './context/view-context';
```

### 导出说明

1. **Workspace**: 工作空间核心类，负责管理编辑器窗口和资源
2. **IWorkspace**: 工作空间接口定义
3. **window**: 窗口相关导出，包括：
   - `EditorWindow`: 编辑器窗口类
   - `WINDOW_STATE`: 窗口状态枚举
   - `IWindowInfo`: 窗口信息类型
4. **workbench**: 工作台布局组件导出，包括：
   - `Workbench`: 工作台布局组件
5. **Resource**: 资源类，负责管理编辑器视图资源
6. **IResource**: 资源接口定义
7. **view-context**: 视图上下文导出，包括：
   - `Context`: 视图上下文类
   - `IViewContext`: 视图上下文接口

## 使用示例

### 基本导入

```typescript
import { Workspace, Workbench, Resource } from '@alilc/lowcode-workspace';

// 创建工作空间
const workspace = new Workspace(registryInnerPlugin, shellModelFactory);

// 渲染工作台
<Workbench workspace={workspace} />
```

### 导入类型

```typescript
import type { IWorkspace, IResource, IWindowInfo } from '@alilc/lowcode-workspace';

// 使用类型
const workspace: IWorkspace = new Workspace(registryInnerPlugin);
const resource: IResource = new Resource(resourceData, resourceType, workspace);
const windowInfo: IWindowInfo = { name: 'myWindow' };
```

### 导入窗口相关

```typescript
import { EditorWindow, WINDOW_STATE } from '@alilc/lowcode-workspace';

// 使用窗口类
const window = new EditorWindow(resource, workspace, options);

// 使用窗口状态
window.updateState(WINDOW_STATE.active);
```

### 导入视图上下文

```typescript
import { Context, IViewContext } from '@alilc/lowcode-workspace';

// 使用视图上下文
const context: IViewContext = new Context(
  workspace,
  'editor-view',
  'editor',
  viewConfig,
  IPublicEnumPluginRegisterLevel.Resource
);
```

## 注意事项

1. **模块入口**: 这是 Workspace 模块的唯一入口文件，所有公共 API 都从这里导出
2. **类型导出**: 使用 `export type` 导出类型，避免运行时开销
3. **批量导出**: 使用 `export *` 导出子模块的所有导出
4. **循环依赖**: 避免子模块之间产生循环依赖

## 相关文件

- [`workspace.ts`](./05-src-workspace.ts.md) - 工作空间核心类
- [`window.ts`](./09-src-window.ts.md) - 编辑器窗口类
- [`resource.ts`](./06-src-resource.ts.md) - 资源类
- [`layouts/workbench.tsx`](./14-src-layouts-workbench.tsx.md) - 工作台布局组件
- [`context/view-context.ts`](./12-src-context-view-context.ts.md) - 视图上下文类

## 最佳实践

1. **统一导入**: 从 `@alilc/lowcode-workspace` 统一导入所有需要的 API
2. **类型导入**: 使用 `import type` 导入类型，避免运行时开销
3. **按需导入**: 只导入需要的 API，减少包体积
4. **类型安全**: 充分利用 TypeScript 类型系统，避免类型错误

## 总结

`src/index.ts` 是 Workspace 模块的入口文件，负责导出所有公共 API。它采用清晰的导出结构，支持按需导入和类型导入，为开发者提供良好的开发体验。
