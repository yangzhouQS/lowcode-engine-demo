# Workbench 模块文档

## 文件路径

`packages/editor-skeleton/src/layouts/workbench.tsx`

## 功能概述

`Workbench` 组件是低代码编辑器的工作台主布局组件，它整合了所有布局区域（顶部、左侧、右侧、底部、主区域等），提供了完整的编辑器界面结构。

## 主要功能

### 1. 布局整合

整合所有布局区域到一个统一的界面中：
- 顶部区域（TopArea）
- 左侧区域（LeftArea）
- 左侧浮动面板（LeftFloatPane）
- 左侧固定面板（LeftFixedPane）
- 工具栏（Toolbar）
- 主区域（MainArea）
- 右侧区域（RightArea）
- 底部区域（BottomArea）

### 2. 配置构建

从配置构建 Skeleton，初始化所有插件和 Widget。

### 3. Context 提供

提供 SkeletonContext，使子组件可以访问 Skeleton 实例。

### 4. 提示容器

集成 TipContainer，提供全局提示功能。

## 组件定义

```typescript
@observer
export class Workbench extends Component<{
  skeleton: ISkeleton;
  config?: EditorConfig;
  components?: PluginClassSet;
  className?: string;
  topAreaItemClassName?: string;
}>
```

## 属性

### `skeleton: ISkeleton`

Skeleton 实例，必需属性。

### `config?: EditorConfig`

编辑器配置，可选。

### `components?: PluginClassSet`

插件组件集合，可选。

### `className?: string`

自定义类名，可选。

### `topAreaItemClassName?: string`

顶部区域项的自定义类名，可选。

## 方法

### `constructor(props: any)`

构造函数，初始化 Workbench。

**行为:**
- 调用父类构造函数
- 从配置构建 Skeleton

```typescript
constructor(props: any) {
  super(props);
  const { config, components, skeleton } = this.props;
  skeleton.buildFromConfig(config, components);
}
```

### `render(): JSX.Element`

渲染工作台界面。

**返回值:** 工作台的 JSX 元素

**渲染结构:**
```typescript
<div className={classNames('lc-workbench', className)}>
  <SkeletonContext.Provider value={this.props.skeleton}>
    <TopArea area={skeleton.topArea} itemClassName={topAreaItemClassName} />
    <div className="lc-workbench-body">
      <LeftArea area={skeleton.leftArea} />
      <LeftFloatPane area={skeleton.leftFloatArea} />
      <LeftFixedPane area={skeleton.leftFixedArea} />
      <div className="lc-workbench-center">
        <Toolbar area={skeleton.toolbar} />
        <MainArea area={skeleton.mainArea} />
        <BottomArea area={skeleton.bottomArea} />
      </div>
      <RightArea area={skeleton.rightArea} />
    </div>
    <TipContainer />
  </SkeletonContext.Provider>
</div>
```

## 布局结构

```
┌─────────────────────────────────────────────────────────┐
│                    TopArea                          │
├──────────┬───────────────────────────┬─────────────┤
│          │                           │             │
│ LeftArea │      lc-workbench-center  │  RightArea  │
│          │  ┌─────────────────────┐ │             │
│          │  │      Toolbar        │ │             │
│          │  ├─────────────────────┤ │             │
│          │  │      MainArea      │ │             │
│          │  ├─────────────────────┤ │             │
│          │  │     BottomArea     │ │             │
│          │  └─────────────────────┘ │             │
│          │                           │             │
├──────────┴───────────────────────────┴─────────────┤
│         LeftFloatPane / LeftFixedPane                │
└─────────────────────────────────────────────────────────┘
```

## 使用示例

### 基本使用

```typescript
import { Workbench } from '@alilc/lowcode-editor-skeleton';
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

<Workbench
  skeleton={skeleton}
  className="my-workbench"
/>
```

### 带配置使用

```typescript
import { Workbench } from '@alilc/lowcode-editor-skeleton';

const config = {
  plugins: {
    leftArea: [
      {
        pluginKey: 'myPlugin',
        type: 'Dock',
        props: {
          title: '我的插件',
        },
      },
    ],
  },
};

const components = {
  myPlugin: MyPluginComponent,
};

<Workbench
  skeleton={skeleton}
  config={config}
  components={components}
  topAreaItemClassName="my-top-item"
/>
```

### 自定义样式

```typescript
<Workbench
  skeleton={skeleton}
  className="custom-workbench"
/>

// CSS
.custom-workbench {
  background: #f0f0f0;
}
```

## 区域说明

### TopArea

顶部区域，放置 Dock 和 PanelDock。

**特点:**
- 支持左/中/右对齐
- 非独占模式

### LeftArea

左侧工具栏区域，放置 Dock 和 PanelDock。

**特点:**
- 支持顶/底对齐
- 非独占模式

### LeftFloatPane

左侧浮动面板区域，放置 Panel。

**特点:**
- 独占模式
- 点击外部自动关闭
- 支持焦点追踪

### LeftFixedPane

左侧固定面板区域，放置 Panel。

**特点:**
- 独占模式
- 固定显示
- 支持拖拽调整宽度

### Toolbar

工具栏区域，放置 Dock 和 PanelDock。

**特点:**
- 支持左/中/右对齐
- 非独占模式

### MainArea

主区域，放置 Widget 和 Panel。

**特点:**
- 独占模式
- 通常放置画布等主要内容

### RightArea

右侧面板区域，放置 Panel。

**特点:**
- 独占模式
- 支持拖拽调整宽度

### BottomArea

底部区域，放置 Panel。

**特点:**
- 独占模式
- 固定在底部

## Context 提供

Workbench 通过 `SkeletonContext.Provider` 提供 Skeleton 实例：

```typescript
<SkeletonContext.Provider value={this.props.skeleton}>
  {/* 子组件 */}
</SkeletonContext.Provider>
```

子组件可以通过 Context 访问 Skeleton：

```typescript
import { SkeletonContext } from '@alilc/lowcode-editor-skeleton';

class MyComponent extends Component {
  static contextType = SkeletonContext;

  render() {
    const skeleton = this.context;
    // 使用 skeleton
    return <div>{/* 内容 */}</div>;
  }
}
```

## 配置构建

Workbench 在构造函数中调用 `skeleton.buildFromConfig` 来构建 Skeleton：

```typescript
constructor(props: any) {
  super(props);
  const { config, components, skeleton } = this.props;
  skeleton.buildFromConfig(config, components);
}
```

**构建过程:**
1. 初始化编辑器
2. 解析配置中的插件
3. 将插件添加到对应区域
4. 初始化所有 Widget

## 响应式更新

Workbench 使用 `@observer` 装饰器实现响应式更新：

```typescript
@observer
export class Workbench extends Component<{...}>
```

当 Skeleton 中的状态变化时，Workbench 会自动重新渲染。

## 样式定制

Workbench 提供了以下 CSS 类名用于样式定制：

- `.lc-workbench` - 工作台容器
- `.lc-workbench-body` - 工作台主体
- `.lc-workbench-center` - 工作台中心区域

可以通过 `className` 属性添加自定义类名：

```typescript
<Workbench
  skeleton={skeleton}
  className="my-custom-workbench"
/>
```

## 注意事项

1. **Skeleton 必需**: `skeleton` 属性是必需的
2. **配置构建**: 配置构建在构造函数中执行，只执行一次
3. **Context 提供**: 所有子组件都可以通过 Context 访问 Skeleton
4. **响应式更新**: 使用 `@observer` 装饰器，自动响应状态变化
5. **提示容器**: 集成了 TipContainer，提供全局提示功能

## 相关文件

- [`../skeleton.ts`](../skeleton.md) - Skeleton 核心类
- [`../context.ts`](../context.md) - React Context
- [`left-area.tsx`](./left-area.md) - 左侧区域组件
- [`left-float-pane.tsx`](./left-float-pane.md) - 左侧浮动面板组件
- [`left-fixed-pane.tsx`](./left-fixed-pane.md) - 左侧固定面板组件
- [`right-area.tsx`](./right-area.md) - 右侧区域组件
- [`top-area.tsx`](./top-area.md) - 顶部区域组件
- [`bottom-area.tsx`](./bottom-area.md) - 底部区域组件
- [`main-area.tsx`](./main-area.md) - 主区域组件
- [`toolbar.tsx`](./toolbar.md) - 工具栏组件
