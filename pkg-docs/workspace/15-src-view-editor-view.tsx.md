# src/view/editor-view.tsx 文档

## 文件路径

`packages/workspace/src/view/editor-view.tsx`

## 功能概述

编辑器视图组件，渲染单个编辑器视图，支持加载状态显示和激活状态样式。

## 主要功能

1. **视图渲染**: 渲染单个编辑器视图
2. **加载状态**: 显示加载组件
3. **激活状态**: 支持激活状态样式
4. **骨架集成**: 与骨架系统集成

## 代码分析

### 导入

```typescript
import { BuiltinLoading } from '@alilc/lowcode-designer';
import { engineConfig, observer } from '@alilc/lowcode-editor-core';
import {
  Workbench,
} from '@alilc/lowcode-editor-skeleton';
import { PureComponent } from 'react';
import { Context } from '../context/view-context';

export * from '../context/base-context';
```

### 类定义

```typescript
@observer
export class EditorView extends PureComponent<{
  editorView: Context;
  active: boolean;
}, any>
```

**Props**:
- `editorView: Context` - 编辑器视图上下文
- `active: boolean` - 是否激活

### 渲染方法

```typescript
render() {
  const { active } = this.props;
  const editorView = this.props.editorView;
  const skeleton = editorView.innerSkeleton;
  if (!editorView.isInit) {
    const Loading = engineConfig.get('loadingComponent', BuiltinLoading);
    return <Loading />;
  }

  return (
    <Workbench
      skeleton={skeleton}
      className={active ? 'active engine-editor-view' : 'engine-editor-view'}
      topAreaItemClassName="engine-actionitem"
    />
  );
}
```

**说明**:
- 如果视图未初始化，显示加载组件
- 如果视图已初始化，渲染 Workbench
- 根据激活状态添加 'active' 类名

## 使用示例

### 基本使用

```typescript
import { EditorView } from '@alilc/lowcode-workspace';

<EditorView
  editorView={context}
  active={true}
/>
```

### 在 ResourceView 中使用

```typescript
import { EditorView } from '@alilc/lowcode-workspace';

Array.from(editorViews.values()).map((editorView: any) => {
  return (
    <EditorView
      key={editorView.name}
      active={editorView.active}
      editorView={editorView}
    />
  );
})
```

## 注意事项

1. **初始化检查**: 必须检查 isInit 状态，避免渲染未初始化的视图
2. **加载组件**: 加载组件可以通过 engineConfig 自定义
3. **激活状态**: 激活状态通过 active prop 控制
4. **骨架传递**: 骨架通过 editorView.innerSkeleton 获取
5. **类名**: 使用 observer 装饰器，确保响应式更新

## 最佳实践

1. **加载状态**: 提供友好的加载组件，提升用户体验
2. **激活样式**: 使用激活状态样式，突出当前视图
3. **性能优化**: 使用 PureComponent 避免不必要的渲染
4. **响应式更新**: 使用 observer 装饰器，确保状态变化时自动更新
5. **错误处理**: 在初始化失败时显示错误提示

## 相关文件

- [`context/view-context.ts`](./12-src-context-view-context.ts.md) - 视图上下文类
- [`view/resource-view.tsx`](./16-src-view-resource-view.tsx.md) - 资源视图组件
- [`layouts/workbench.tsx`](./14-src-layouts-workbench.tsx.md) - 工作台布局组件

## 总结

`src/view/editor-view.tsx` 是编辑器视图组件，负责渲染单个编辑器视图。它支持加载状态显示和激活状态样式，是视图层的基础组件。
