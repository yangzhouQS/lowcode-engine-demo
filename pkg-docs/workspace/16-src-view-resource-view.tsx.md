# src/view/resource-view.tsx 文档

## 文件路径

`packages/workspace/src/view/resource-view.tsx`

## 功能概述

资源视图组件，渲染资源的所有编辑器视图，支持顶部区域和编辑器视图的渲染。

## 主要功能

1. **资源视图渲染**: 渲染资源的所有编辑器视图
2. **顶部区域**: 渲染资源的顶部区域
3. **编辑器视图**: 渲染所有编辑器视图
4. **样式支持**: 支持自定义样式

## 代码分析

### 导入

```typescript
import { PureComponent } from 'react';
import { EditorView } from './editor-view';
import { observer } from '@alilc/lowcode-editor-core';
import { IResource } from '../resource';
import { IEditorWindow } from '../window';
import './resource-view.less';
import { TopArea } from '@alilc/lowcode-editor-skeleton';
```

### 类定义

```typescript
@observer
export class ResourceView extends PureComponent<{
  window: IEditorWindow;
  resource: IResource;
}, any>
```

**Props**:
- `window: IEditorWindow` - 编辑器窗口实例
- `resource: IResource` - 资源实例

### 渲染方法

```typescript
render() {
  const { skeleton } = this.props.resource;
  const { editorViews } = this.props.window;
  return (
    <div className="workspace-resource-view">
      <TopArea area={skeleton.topArea} itemClassName="engine-actionitem" />
      <div className="workspace-editor-body">
        {
          Array.from(editorViews.values()).map((editorView: any) => {
            return (
              <EditorView
                key={editorView.name}
                active={editorView.active}
                editorView={editorView}
              />
            );
          })
        }
      </div>
    </div>
  );
}
```

**说明**:
- 外层容器：`workspace-resource-view`
- TopArea：顶部区域，使用资源的骨架
- 编辑器主体：`workspace-editor-body`
  - 渲染所有编辑器视图
  - 使用 editorView.name 作为 key
  - 传递 editorView.active 和 editorView

## 使用示例

### 基本使用

```typescript
import { ResourceView } from '@alilc/lowcode-workspace';

<ResourceView
  window={editorWindow}
  resource={resource}
/>
```

### 在 WindowView 中使用

```typescript
import { ResourceView } from '@alilc/lowcode-workspace';

<div className={`workspace-engine-main ${active ? 'active' : ''}`}>
  <ResourceView
    resource={resource}
    window={this.props.window}
  />
</div>
```

## 注意事项

1. **骨架获取**: 骨架从 resource.skeleton 获取，确保资源已初始化
2. **编辑器视图**: 编辑器视图从 window.editorViews 获取，确保窗口已初始化
3. **Key 属性**: 使用 editorView.name 作为 key，确保列表渲染正确
4. **激活状态**: 激活状态通过 editorView.active 控制
5. **样式文件**: 需要导入 resource-view.less 样式文件

## 最佳实践

1. **性能优化**: 使用 PureComponent 避免不必要的渲染
2. **响应式更新**: 使用 observer 装饰器，确保状态变化时自动更新
3. **样式隔离**: 使用独立的样式文件，避免样式冲突
4. **错误处理**: 在编辑器视图加载失败时显示错误提示
5. **空状态**: 如果没有编辑器视图，显示友好的空状态

## 相关文件

- [`view/editor-view.tsx`](./15-src-view-editor-view.tsx.md) - 编辑器视图组件
- [`resource.ts`](./06-src-resource.ts.md) - 资源类
- [`window.ts`](./09-src-window.ts.md) - 编辑器窗口类
- [`view/resource-view.less`](./17-src-view-resource-view.less.md) - 资源视图样式

## 总结

`src/view/resource-view.tsx` 是资源视图组件，负责渲染资源的所有编辑器视图。它支持顶部区域和编辑器视图的渲染，是资源层的核心组件。
