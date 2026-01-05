# src/layouts/workbench.tsx 文档

## 文件路径

`packages/workspace/src/layouts/workbench.tsx`

## 功能概述

工作台布局组件，工作台的主布局，包含顶部区域、左侧区域、中间区域、底部区域等，支持主题切换和空状态显示。

## 主要功能

1. **工作台布局**: 提供完整的工作台布局结构
2. **骨架集成**: 与骨架系统集成，渲染各个区域
3. **窗口管理**: 渲染所有编辑器窗口
4. **主题支持**: 支持主题切换
5. **空状态显示**: 支持自定义空状态组件

## 代码分析

### 导入

```typescript
import { Component } from 'react';
import { TipContainer, engineConfig, observer } from '@alilc/lowcode-editor-core';
import { WindowView } from '../view/window-view';
import classNames from 'classnames';
import { SkeletonContext } from '../skeleton-context';
import { EditorConfig, PluginClassSet } from '@alilc/lowcode-types';
import { Workspace } from '../workspace';
import { BottomArea, LeftArea, LeftFixedPane, LeftFloatPane, MainArea, SubTopArea, TopArea } from '@alilc/lowcode-editor-skeleton';
```

### 类定义

```typescript
@observer
export class Workbench extends Component<{
  workspace: Workspace;
  config?: EditorConfig;
  components?: PluginClassSet;
  className?: string;
  topAreaItemClassName?: string;
}, {
  workspaceEmptyComponent: any;
  theme?: string;
}>
```

**Props**:
- `workspace: Workspace` - 工作空间实例
- `config?: EditorConfig` - 编辑器配置
- `components?: PluginClassSet` - 插件组件集合
- `className?: string` - 自定义类名
- `topAreaItemClassName?: string` - 顶部区域项的自定义类名

**State**:
- `workspaceEmptyComponent: any` - 工作空间空状态组件
- `theme?: string` - 主题

### 构造函数

```typescript
constructor(props: any) {
  super(props);
  const { config, components, workspace } = this.props;
  const { skeleton } = workspace;
  skeleton.buildFromConfig(config, components);
  engineConfig.onGot('theme', (theme) => {
    this.setState({
      theme,
    });
  });
  engineConfig.onGot('workspaceEmptyComponent', (workspaceEmptyComponent) => {
    this.setState({
      workspaceEmptyComponent,
    });
  });
  this.state = {
    workspaceEmptyComponent: engineConfig.get('workspaceEmptyComponent'),
    theme: engineConfig.get('theme'),
  };
}
```

**说明**:
- 从配置和组件构建骨架
- 监听主题变化
- 监听空状态组件变化
- 初始化状态

### 渲染方法

```typescript
render() {
  const { workspace, className, topAreaItemClassName } = this.props;
  const { skeleton } = workspace;
  const { workspaceEmptyComponent: WorkspaceEmptyComponent, theme } = this.state;

  return (
    <div className={classNames('lc-workspace-workbench', className, theme)}>
      <SkeletonContext.Provider value={skeleton}>
        <TopArea className="lc-workspace-top-area" area={skeleton.topArea} itemClassName={topAreaItemClassName} />
        <div className="lc-workspace-workbench-body">
          <LeftArea className="lc-workspace-left-area lc-left-area" area={skeleton.leftArea} />
          <LeftFloatPane area={skeleton.leftFloatArea} />
          <LeftFixedPane area={skeleton.leftFixedArea} />
          <div className="lc-workspace-workbench-center">
            <div className="lc-workspace-workbench-center-content">
              <SubTopArea area={skeleton.subTopArea} itemClassName={topAreaItemClassName} />
              <div className="lc-workspace-workbench-window">
                {
                  workspace.windows.map(d => (
                    <WindowView
                      active={d.id === workspace.window?.id}
                      window={d}
                      key={d.id}
                    />
                  ))
                }

                {
                  !workspace.windows.length && WorkspaceEmptyComponent ? <WorkspaceEmptyComponent /> : null
                }
              </div>
            </div>
            <MainArea area={skeleton.mainArea} />
            <BottomArea area={skeleton.bottomArea} />
          </div>
          {/* <RightArea area={skeleton.rightArea} /> */}
        </div>
        <TipContainer />
      </SkeletonContext.Provider>
    </div>
  );
}
```

**说明**:
- 外层容器：`lc-workspace-workbench`，支持自定义类名和主题
- SkeletonContext.Provider：提供骨架上下文
- TopArea：顶部区域
- 工作台主体：
  - LeftArea：左侧区域
  - LeftFloatPane：左侧浮动面板
  - LeftFixedPane：左侧固定面板
  - 中心区域：
    - SubTopArea：子顶部区域
    - 窗口容器：
      - 渲染所有窗口
      - 如果没有窗口，显示空状态组件
    - MainArea：主区域
    - BottomArea：底部区域
- TipContainer：提示容器

## 布局结构

```
lc-workspace-workbench
├── TopArea (顶部区域)
└── lc-workspace-workbench-body
    ├── LeftArea (左侧区域)
    ├── LeftFloatPane (左侧浮动面板)
    ├── LeftFixedPane (左侧固定面板)
    └── lc-workspace-workbench-center
        ├── SubTopArea (子顶部区域)
        ├── lc-workspace-workbench-window
        │   ├── WindowView (窗口视图)
        │   └── WorkspaceEmptyComponent (空状态组件)
        ├── MainArea (主区域)
        └── BottomArea (底部区域)
```

## 使用示例

### 基本使用

```typescript
import { Workbench } from '@alilc/lowcode-workspace';

<Workbench
  workspace={workspace}
  config={config}
  components={components}
/>
```

### 自定义样式

```typescript
<Workbench
  workspace={workspace}
  config={config}
  components={components}
  className="my-workbench"
  topAreaItemClassName="my-top-item"
/>
```

### 设置空状态组件

```typescript
engineConfig.set('workspaceEmptyComponent', MyEmptyComponent);
```

### 切换主题

```typescript
engineConfig.set('theme', 'dark');
```

## 注意事项

1. **骨架构建**: 必须先构建骨架，否则无法正确渲染
2. **窗口渲染**: 窗口根据 workspace.windows 数组渲染，确保窗口数据正确
3. **主题切换**: 主题通过 engineConfig 设置，组件会自动监听变化
4. **空状态**: 空状态组件通过 engineConfig 设置，组件会自动监听变化
5. **右侧区域**: 右侧区域目前被注释掉，如果需要可以取消注释

## 最佳实践

1. **骨架配置**: 在使用 Workbench 之前，确保骨架已正确配置
2. **主题管理**: 使用 engineConfig 统一管理主题
3. **空状态处理**: 提供友好的空状态组件，提升用户体验
4. **样式定制**: 使用 className 属性自定义样式，避免直接修改组件内部样式
5. **性能优化**: 使用 observer 装饰器，确保组件响应式更新

## 相关文件

- [`workspace.ts`](./05-src-workspace.ts.md) - 工作空间核心类
- [`view/window-view.tsx`](./18-src-view-window-view.tsx.md) - 窗口视图组件
- [`skeleton-context.ts`](./08-src-skeleton-context.ts.md) - 骨架上下文

## 总结

`src/layouts/workbench.tsx` 是工作台布局组件，负责渲染工作台的主布局。它集成了骨架系统，支持主题切换和空状态显示，是工作台 UI 的核心组件。
