# Widget Views 模块文档

## 文件路径

`packages/editor-skeleton/src/components/widget-views/index.tsx`

## 功能概述

`widget-views` 模块提供了各种 Widget 的视图组件，负责渲染 Widget、Panel、Dock 等组件的 UI。这些视图组件处理了可见性、激活状态、事件发布等逻辑。

## 主要组件

### 1. DockView

Dock 视图组件，用于渲染 Dock Widget。

```typescript
export function DockView({ title, icon, description, size, className, onClick }: DockProps)
```

**属性:**
- `title`: 标题
- `icon`: 图标
- `description`: 描述
- `size`: 尺寸
- `className`: 自定义类名
- `onClick`: 点击回调

### 2. PanelDockView

PanelDock 视图组件，用于渲染 PanelDock Widget。

```typescript
@observer
export class PanelDockView extends Component<DockProps & { dock: PanelDock }>
```

**主要功能:**
- 监听 PanelDock 的激活状态
- 发布激活/取消激活事件
- 处理点击事件，切换关联的 Panel

**关键方法:**
```typescript
checkActived() {
  const { dock } = this.props;
  if (dock.actived !== this.lastActived) {
    this.lastActived = dock.actived;
    if (this.lastActived) {
      dock.skeleton.postEvent(SkeletonEvents.PANEL_DOCK_ACTIVE, dock.name, dock);
    } else {
      dock.skeleton.postEvent(SkeletonEvents.PANEL_DOCK_UNACTIVE, dock.name, dock);
    }
  }
}
```

### 3. DraggableLineView

可拖拽分割线视图组件，用于调整 Panel 宽度。

```typescript
export class DraggableLineView extends Component<{ panel: Panel }>
```

**主要功能:**
- 监听拖拽事件
- 动态调整 Panel 宽度
- 发布拖拽相关事件

**关键方法:**
```typescript
onDrag(value: number) {
  const defaultWidth = this.getDefaultWidth();
  const width = defaultWidth + value;

  const containerRef = this.shell?.getParent();
  if (containerRef) {
    containerRef.style.width = `${width}px`;
  }

  const { editor } = this.props.panel.skeleton;
  editor?.eventBus.emit('dockpane.drag', width);
}

onDragChange(type: 'start' | 'end') {
  const { editor } = this.props.panel.skeleton;
  editor?.eventBus.emit('dockpane.dragchange', type);
  editor?.eventBus.emit('designer.builtinSimulator.disabledEvents', type === 'start');
}
```

### 4. TitledPanelView

带标题的 Panel 视图组件。

```typescript
@observer
export class TitledPanelView extends Component<{ panel: Panel; area?: string }>
```

**主要功能:**
- 渲染 Panel 标题栏
- 渲染 Panel 内容
- 集成可拖拽分割线
- 发布显示/隐藏事件

**关键方法:**
```typescript
checkVisible() {
  const { panel } = this.props;
  const currentVisible = panel.inited && panel.visible;
  if (currentVisible !== this.lastVisible) {
    this.lastVisible = currentVisible;
    if (this.lastVisible) {
      panel.skeleton.postEvent(SkeletonEvents.PANEL_SHOW, panel.name, panel);
    } else {
      panel.skeleton.postEvent(SkeletonEvents.PANEL_HIDE, panel.name, panel);
    }
  }
}
```

### 5. PanelView

Panel 视图组件（无标题栏）。

```typescript
@observer
export class PanelView extends Component<{
  panel: Panel;
  area?: string;
  hideOperationRow?: boolean;
  hideDragLine?: boolean;
}>
```

**主要功能:**
- 渲染 Panel 内容
- 可选显示操作行
- 可选显示可拖拽分割线
- 发布显示/隐藏事件

### 6. TabsPanelView

Tab 形式的 Panel 视图组件。

```typescript
@observer
export class TabsPanelView extends Component<{
  container: WidgetContainer<Panel>;
  shouldHideSingleTab?: boolean;
}>
```

**主要功能:**
- 渲染 Tab 标题
- 渲染 Tab 内容
- 支持单个 Tab 时隐藏 Tab 栏

**渲染逻辑:**
```typescript
render() {
  const { container } = this.props;
  const titles: ReactElement[] = [];
  const contents: ReactElement[] = [];
  
  if (this.props.shouldHideSingleTab && container.items.length === 1) {
    contents.push(<PanelView key={container.items[0].id} panel={container.items[0]} hideOperationRow hideDragLine />);
  } else {
    container.items.forEach((item: any) => {
      titles.push(<PanelTitle key={item.id} panel={item} className="lc-tab-title" />);
      contents.push(<PanelView key={item.id} panel={item} hideOperationRow hideDragLine />);
    });
  }

  if (!titles.length) {
    return contents;
  }

  return (
    <div className="lc-tabs">
      <div className="lc-tabs-title" onClick={...}>
        {titles}
      </div>
      <div className="lc-tabs-content">{contents}</div>
    </div>
  );
}
```

### 7. PanelTitle

Panel 标题组件。

```typescript
@observer
class PanelTitle extends Component<{ panel: Panel; className?: string }>
```

**主要功能:**
- 渲染 Panel 标题
- 显示激活状态
- 显示帮助提示

### 8. WidgetView

Widget 视图组件，用于渲染所有类型的 Widget。

```typescript
@observer
export class WidgetView extends Component<{ widget: IWidget }>
```

**主要功能:**
- 监听 Widget 的可见性
- 监听 Widget 的禁用状态
- 发布相应的事件
- 根据状态渲染不同的样式

**关键方法:**
```typescript
checkVisible() {
  const { widget } = this.props;
  const currentVisible = widget.visible;
  if (currentVisible !== this.lastVisible) {
    this.lastVisible = currentVisible;
    if (this.lastVisible) {
      widget.skeleton.postEvent(SkeletonEvents.WIDGET_SHOW, widget.name, widget);
    } else {
      widget.skeleton.postEvent(SkeletonEvents.WIDGET_HIDE, widget.name, widget);
    }
  }
}

checkDisabled() {
  const { widget } = this.props;
  const currentDisabled = widget.disabled;
  if (currentDisabled !== this.lastDisabled) {
    this.lastDisabled = currentDisabled;
    if (this.lastDisabled) {
      widget.skeleton.postEvent(SkeletonEvents.WIDGET_DISABLE, widget.name, widget);
    } else {
      widget.skeleton.postEvent(SkeletonEvents.WIDGET_ENABLE, widget.name, widget);
    }
  }
}
```

## 使用示例

### 使用 DockView

```typescript
import { DockView } from '@alilc/lowcode-editor-skeleton';

<DockView
  title="我的工具"
  icon={MyIcon}
  description="这是一个工具"
  size="medium"
  className="my-dock"
  onClick={() => console.log('Dock clicked')}
/>
```

### 使用 PanelDockView

```typescript
import { PanelDockView } from '@alilc/lowcode-editor-skeleton';

<PanelDockView
  dock={panelDock}
  title="打开面板"
  icon={PanelIcon}
  onClick={() => console.log('PanelDock clicked')}
/>
```

### 使用 TitledPanelView

```typescript
import { TitledPanelView } from '@alilc/lowcode-editor-skeleton';

<TitledPanelView
  panel={panel}
  area="leftFloatArea"
/>
```

### 使用 PanelView

```typescript
import { PanelView } from '@alilc/lowcode-editor-skeleton';

<PanelView
  panel={panel}
  area="leftFloatArea"
  hideOperationRow={false}
  hideDragLine={false}
/>
```

### 使用 TabsPanelView

```typescript
import { TabsPanelView } from '@alilc/lowcode-editor-skeleton';

<TabsPanelView
  container={panelContainer}
  shouldHideSingleTab={true}
/>
```

### 使用 WidgetView

```typescript
import { WidgetView } from '@alilc/lowcode-editor-skeleton';

<WidgetView widget={widget} />
```

## 事件发布

所有视图组件都会在状态变化时发布事件：

### PanelDockView 事件

```typescript
// 激活时
dock.skeleton.postEvent(SkeletonEvents.PANEL_DOCK_ACTIVE, dock.name, dock);

// 取消激活时
dock.skeleton.postEvent(SkeletonEvents.PANEL_DOCK_UNACTIVE, dock.name, dock);
```

### PanelView 事件

```typescript
// 显示时
panel.skeleton.postEvent(SkeletonEvents.PANEL_SHOW, panel.name, panel);

// 隐藏时
panel.skeleton.postEvent(SkeletonEvents.PANEL_HIDE, panel.name, panel);
```

### WidgetView 事件

```typescript
// 显示时
widget.skeleton.postEvent(SkeletonEvents.WIDGET_SHOW, widget.name, widget);

// 隐藏时
widget.skeleton.postEvent(SkeletonEvents.WIDGET_HIDE, widget.name, widget);

// 禁用时
widget.skeleton.postEvent(SkeletonEvents.WIDGET_DISABLE, widget.name, widget);

// 启用时
widget.skeleton.postEvent(SkeletonEvents.WIDGET_ENABLE, widget.name, widget);
```

## DraggableLineView 配置

### 启用拖拽

```typescript
{
  name: 'myPanel',
  props: {
    enableDrag: true,
    width: 300,
  },
}
```

### 禁用拖拽

```typescript
{
  name: 'myPanel',
  props: {
    enableDrag: false,
  },
}
```

### 右侧面板不显示拖拽线

右侧面板默认不显示拖拽线：

```typescript
const isRightArea = this.props.panel.config?.area === 'rightArea';
if (isRightArea || !enableDrag || this.props.panel?.parent?.name === 'leftFixedArea') {
  return null;
}
```

## TabsPanelView 配置

### 隐藏单个 Tab

```typescript
<TabsPanelView
  container={panelContainer}
  shouldHideSingleTab={true}
/>
```

当只有一个子面板时，会隐藏 Tab 栏，直接显示内容。

### 显示所有 Tab

```typescript
<TabsPanelView
  container={panelContainer}
  shouldHideSingleTab={false}
/>
```

即使只有一个子面板，也会显示 Tab 栏。

## 响应式更新

所有视图组件都使用 `@observer` 装饰器实现响应式更新：

```typescript
@observer
export class PanelDockView extends Component<DockProps & { dock: PanelDock }>

@observer
export class TitledPanelView extends Component<{ panel: Panel; area?: string }>

@observer
export class PanelView extends Component<{ panel: Panel; area?: string; ... }>

@observer
export class TabsPanelView extends Component<{ container: WidgetContainer<Panel>; ... }>

@observer
export class WidgetView extends Component<{ widget: IWidget }>
```

当观察的属性变化时，组件会自动重新渲染。

## 样式定制

### DockView 样式

```typescript
<DockView
  className="my-custom-dock"
  size="large"
/>
```

### PanelView 样式

```typescript
<PanelView
  panel={panel}
  className="my-custom-panel"
/>
```

### WidgetView 样式

WidgetView 会根据 Widget 的状态添加不同的类名：

```typescript
// Widget 禁用时
<div className="lc-widget-disabled">{widget.body}</div>

// Widget 可见时
{widget.body}
```

## 注意事项

1. **事件发布**: 所有视图组件都会在状态变化时发布事件
2. **响应式更新**: 使用 `@observer` 装饰器，自动响应状态变化
3. **拖拽限制**: 右侧面板和固定面板不显示拖拽线
4. **Tab 隐藏**: 可以通过 `shouldHideSingleTab` 控制单个 Tab 的显示
5. **状态检查**: 视图组件会检查 Widget/Panel 的状态并相应更新 UI

## 相关文件

- [`../../widget/widget.ts`](../../widget/widget.md) - Widget 基类
- [`../../widget/panel.ts`](../../widget/panel.md) - Panel 类
- [`../../widget/panel-dock.ts`](../../widget/panel-dock.md) - PanelDock 类
- [`../../skeleton.ts`](../../skeleton.md) - Skeleton 核心类
- [`../draggable-line/index.tsx`](../draggable-line/index.md) - 可拖拽分割线组件
- [`../popup/index.tsx`](../popup/index.md) - 弹窗组件

## 外部依赖

- `@alilc/lowcode-editor-core` - 提供 `observer`、`Title`、`HelpTip` 等
- `@alilc/lowcode-utils` - 提供 `composeTitle` 等工具函数
- `@alilc/lowcode-types` - 提供 `IPublicTypeTitleContent` 等类型
