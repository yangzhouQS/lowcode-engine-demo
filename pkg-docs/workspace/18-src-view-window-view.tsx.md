# src/view/window-view.tsx 文档

## 文件路径

`packages/workspace/src/view/window-view.tsx`

## 功能概述

窗口视图组件，渲染单个编辑器窗口，支持加载状态、webview 类型和 editor 类型的渲染。

## 主要功能

1. **窗口渲染**: 渲染单个编辑器窗口
2. **加载状态**: 显示加载组件
3. **类型支持**: 支持 webview 和 editor 两种类型
4. **激活状态**: 支持激活状态样式

## 代码分析

### 导入

```typescript
import { PureComponent } from 'react';
import { ResourceView } from './resource-view';
import { engineConfig, observer } from '@alilc/lowcode-editor-core';
import { EditorWindow } from '../window';
import { BuiltinLoading } from '@alilc/lowcode-designer';
import { DesignerView } from '../inner-plugins/webview';
```

### 类定义

```typescript
@observer
export class WindowView extends PureComponent<{
  window: EditorWindow;
  active: boolean;
}, any>
```

**Props**:
- `window: EditorWindow` - 编辑器窗口实例
- `active: boolean` - 是否激活

### 渲染方法

```typescript
render() {
  const { active } = this.props;
  const { resource, initReady, url } = this.props.window;

  if (!initReady) {
    const Loading = engineConfig.get('loadingComponent', BuiltinLoading);
    return (
      <div className={`workspace-engine-main ${active ? 'active' : ''}`}>
        <Loading />
      </div>
    );
  }

  if (resource.type === 'webview' && url) {
    return <DesignerView url={url} viewName={resource.name} />;
  }

  return (
    <div className={`workspace-engine-main ${active ? 'active' : ''}`}>
      <ResourceView
        resource={resource}
        window={this.props.window}
      />
    </div>
  );
}
```

**说明**:
- 如果窗口未初始化，显示加载组件
- 如果资源类型为 webview 且有 URL，渲染 DesignerView
- 否则渲染 ResourceView
- 根据激活状态添加 'active' 类名

## 使用示例

### 基本使用

```typescript
import { WindowView } from '@alilc/lowcode-workspace';

<WindowView
  window={editorWindow}
  active={true}
/>
```

### 在 Workbench 中使用

```typescript
import { WindowView } from '@alilc/lowcode-workspace';

workspace.windows.map(d => (
  <WindowView
    active={d.id === workspace.window?.id}
    window={d}
    key={d.id}
  />
))
```

## 渲染流程

### 1. 未初始化状态

```
WindowView
└── workspace-engine-main
    └── Loading
```

### 2. Webview 类型

```
WindowView
└── DesignerView
    └── iframe
```

### 3. Editor 类型

```
WindowView
└── workspace-engine-main
    └── ResourceView
        ├── TopArea
        └── workspace-editor-body
            └── EditorView
                └── Workbench
```

## 注意事项

1. **初始化检查**: 必须检查 initReady 状态，避免渲染未初始化的窗口
2. **加载组件**: 加载组件可以通过 engineConfig 自定义
3. **资源类型**: 根据资源类型选择不同的渲染方式
4. **URL 检查**: webview 类型需要检查 URL 是否存在
5. **激活状态**: 激活状态通过 active prop 控制

## 最佳实践

1. **加载状态**: 提供友好的加载组件，提升用户体验
2. **激活样式**: 使用激活状态样式，突出当前窗口
3. **性能优化**: 使用 PureComponent 避免不必要的渲染
4. **响应式更新**: 使用 observer 装饰器，确保状态变化时自动更新
5. **错误处理**: 在初始化失败时显示错误提示

## 相关文件

- [`window.ts`](./09-src-window.ts.md) - 编辑器窗口类
- [`view/resource-view.tsx`](./16-src-view-resource-view.tsx.md) - 资源视图组件
- [`inner-plugins/webview.tsx`](./13-src-inner-plugins-webview.tsx.md) - Webview 插件

## 总结

`src/view/window-view.tsx` 是窗口视图组件，负责渲染单个编辑器窗口。它支持加载状态显示、webview 类型和 editor 类型的渲染，是窗口层的核心组件。
