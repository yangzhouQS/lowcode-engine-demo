# Widget 模块文档

## 文件路径

`packages/editor-skeleton/src/widget/widget.ts`

## 功能概述

`Widget` 类是所有 Widget 组件的基类，提供了 Widget 的基础功能，包括可见性控制、禁用状态、内容渲染等。所有其他 Widget 类型（如 Dock、Panel、PanelDock、Stage）都继承自这个基类。

## 主要功能

### 1. 生命周期管理

- 支持初始化回调
- 支持延迟初始化（lazy init）
- 支持销毁清理

### 2. 可见性控制

- 支持显示/隐藏 Widget
- 支持切换可见性状态
- 延迟隐藏策略（只在已初始化后才隐藏）

### 3. 禁用状态

- 支持启用/禁用 Widget
- 禁用状态会影响渲染样式

### 4. 内容渲染

- 支持多种内容类型（字符串、React 元素、组件）
- 支持内容属性传递
- 支持延迟内容创建

## 接口定义

```typescript
export interface IWidget {
  readonly name: string;
  readonly content: ReactNode;
  readonly align?: string;
  readonly isWidget: true;
  readonly visible: boolean;
  readonly disabled?: boolean;
  readonly body: ReactNode;
  readonly skeleton: ISkeleton;
  readonly config: IPublicTypeWidgetBaseConfig;

  getName(): string;
  getContent(): any;
  show(): void;
  hide(): void;
  toggle(): void;
  enable?(): void;
  disable?(): void;
}
```

## 类定义

```typescript
export class Widget implements IWidget {
  constructor(readonly skeleton: ISkeleton, readonly config: WidgetConfig)
}
```

## 属性

### `readonly isWidget = true`

类型标识，用于判断对象是否为 Widget。

### `readonly id = uniqueId('widget')`

Widget 的唯一标识符。

### `readonly name: string`

Widget 名称，从配置中获取。

### `readonly align?: string`

对齐方式，从配置的 `props.align` 获取。

### `@obx.ref private _visible = true`

内部可见性状态。

### `get visible(): boolean`

计算属性，返回 Widget 的可见性状态。

### `@obx.ref inited = false`

初始化状态标记，用于延迟初始化。

### `@obx.ref private _disabled = false`

内部禁用状态。

### `private _body: ReactNode`

Widget 的主体内容，延迟创建。

### `get body()`

计算属性，返回 Widget 的主体内容。

**行为:**
- 如果已初始化，直接返回缓存的 `_body`
- 否则，创建内容并标记为已初始化
- 将 `config.content` 和 `config.contentProps` 传递给内容创建函数

### `get content(): ReactNode`

计算属性，返回 Widget 的 React 内容。

**行为:**
- 返回一个 `WidgetView` 组件，包装当前的 Widget

### `readonly title: IPublicTypeTitleContent`

Widget 标题，从配置的 `props.title` 获取，如果未设置则使用 `name`。

## 方法

### `constructor(readonly skeleton: ISkeleton, readonly config: WidgetConfig)`

构造函数，创建 Widget 实例。

**参数:**
- `skeleton`: Skeleton 实例
- `config`: Widget 配置

**行为:**
- 设置 `name` 和 `align` 属性
- 设置 `title` 属性（优先使用 `props.title`，否则使用 `name`）
- 如果配置了 `props.onInit`，调用初始化回调

### `getId(): string`

获取 Widget 的唯一标识符。

**返回值:** Widget 的 ID

### `getName(): string`

获取 Widget 名称。

**返回值:** Widget 名称

### `getContent(): any`

获取 Widget 内容。

**返回值:** Widget 的 React 内容

### `hide(): void`

隐藏 Widget。

### `show(): void`

显示 Widget。

### `setVisible(flag: boolean): void`

设置 Widget 的可见性。

**参数:**
- `flag`: 是否可见

**行为:**
- 如果新状态与当前状态相同，不执行任何操作
- 如果设置为可见，立即设置为可见
- 如果设置为不可见，只有在已初始化后才执行隐藏操作

### `toggle(): void`

切换 Widget 的可见性状态。

### `private setDisabled(flag: boolean): void`

设置 Widget 的禁用状态。

**参数:**
- `flag`: 是否禁用

**行为:**
- 如果新状态与当前状态相同，不执行任何操作
- 否则，更新 `_disabled` 状态

### `disable(): void`

禁用 Widget。

### `enable(): void`

启用 Widget。

### `get disabled(): boolean`

获取 Widget 的禁用状态。

**返回值:** 是否禁用

## 工具函数

### `isWidget(obj: any): obj is IWidget`

判断对象是否为 Widget。

```typescript
export function isWidget(obj: any): obj is IWidget {
  return obj && obj.isWidget;
}
```

## 使用示例

### 创建自定义 Widget

```typescript
import { Widget, WidgetConfig } from '@alilc/lowcode-editor-skeleton';

class MyCustomWidget extends Widget {
  constructor(skeleton: ISkeleton, config: WidgetConfig) {
    super(skeleton, config);
    // 自定义初始化逻辑
  }
  
  // 重写方法
  hide() {
    console.log('Custom hide logic');
    super.hide();
  }
}
```

### 使用 Widget

```typescript
import { Widget } from '@alilc/lowcode-editor-skeleton';

const widget = new Widget(skeleton, {
  type: 'Widget',
  name: 'myWidget',
  area: 'mainArea',
  props: {
    align: 'center',
    title: '我的组件',
    onInit: (widget) => {
      console.log('Widget initialized:', widget.getName());
    },
  },
  content: MyComponent,
  contentProps: {
    customProp: 'value',
  },
});

// 控制可见性
widget.show();
widget.hide();
widget.toggle();

// 控制禁用状态
widget.enable();
widget.disable();

// 获取信息
console.log('Widget name:', widget.getName());
console.log('Widget ID:', widget.getId());
console.log('Is visible:', widget.visible);
console.log('Is disabled:', widget.disabled);
```

### 使用类型判断

```typescript
import { isWidget } from '@alilc/lowcode-editor-skeleton';

function processWidget(widget: any) {
  if (isWidget(widget)) {
    console.log('This is a Widget:', widget.name);
    // 可以安全地访问 Widget 的方法和属性
    widget.show();
  }
}
```

## 延迟初始化机制

Widget 使用延迟初始化机制来优化性能：

### 1. 延迟创建内容

```typescript
get body() {
  if (this.inited) {
    return this._body;
  }
  this.inited = true;
  const { content, contentProps } = this.config;
  this._body = createContent(content, {
    ...contentProps,
    config: this.config,
    editor: getEvent(this.skeleton.editor),
  });
  return this._body;
}
```

### 2. 延迟隐藏

```typescript
setVisible(flag: boolean) {
  if (flag === this._visible) {
    return;
  }
  if (flag) {
    this._visible = true;
  } else if (this.inited) {
    this._visible = false;
  }
}
```

**优势:**
- 减少不必要的渲染
- 提高初始加载性能
- 节省内存资源

## 响应式更新

Widget 使用 `@obx` 装饰器实现响应式更新：

```typescript
@obx.ref private _visible = true;
@obx.ref inited = false;
@obx.ref private _disabled = false;
```

当这些属性变化时，会自动触发相关组件的重新渲染。

## 与 WidgetView 的集成

Widget 通过 `WidgetView` 组件进行渲染：

```typescript
get content(): ReactNode {
  return createElement(WidgetView, {
    widget: this,
    key: this.id,
  });
}
```

`WidgetView` 组件负责：
- 监听 Widget 的可见性变化
- 监听 Widget 的禁用状态变化
- 发布相应的事件
- 根据状态渲染不同的样式

## 事件发布

Widget 的状态变化会通过 `WidgetView` 组件发布事件：

```typescript
// WidgetView 组件中的事件发布
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

## 注意事项

1. **延迟隐藏**: Widget 只在已初始化后才允许隐藏，避免未显示就被隐藏
2. **内容缓存**: Widget 的 body 内容会被缓存，避免重复创建
3. **状态同步**: Widget 的状态变化会自动触发事件发布
4. **继承使用**: 建议通过继承 Widget 类来创建自定义 Widget
5. **响应式更新**: 使用 `@obx` 装饰器的属性会自动触发视图更新

## 相关文件

- [`skeleton.ts`](../skeleton.md) - Skeleton 核心类
- [`widget-container.ts`](./widget-container.md) - Widget 容器
- [`widget-views/index.tsx`](../components/widget-views/index.md) - Widget 视图组件
- [`types.ts`](../types.md) - 类型定义

## 子类

- [`panel.ts`](./panel.md) - Panel 类
- [`dock.ts`](./dock.md) - Dock 类
- [`panel-dock.ts`](./panel-dock.md) - PanelDock 类
- [`stage.ts`](./stage.md) - Stage 类
