# Panel 模块文档

## 文件路径

`packages/editor-skeleton/src/widget/panel.ts`

## 功能概述

`Panel` 类是面板 Widget 的实现，用于创建可折叠、可激活的面板组件。Panel 支持嵌套子面板、标题栏、帮助提示等功能，并可以在固定和浮动区域之间切换。

## 主要功能

### 1. 面板激活管理

- 支持激活/取消激活面板
- 支持切换激活状态
- 在激活时自动处理相关面板的互斥

### 2. 嵌套面板支持

- 支持在面板中嵌套子面板
- 子面板以 Tab 形式展示
- 支持单面板时隐藏 Tab

### 3. 可见性控制

- 支持条件显示（通过 `props.condition`）
- 支持显示/隐藏面板
- 可见性受父容器和激活状态影响

### 4. 区域切换

- 支持在固定区域和浮动区域之间切换
- 自动保存切换状态到偏好设置
- 提供判断方法检查当前所在区域

### 5. 事件系统

- 支持监听激活状态变化
- 发布面板显示/隐藏事件

## 类定义

```typescript
export class Panel implements IWidget {
  constructor(readonly skeleton: ISkeleton, readonly config: IPublicTypePanelConfig)
}
```

## 属性

### `readonly isWidget = true`

类型标识，继承自 `IWidget`。

### `readonly isPanel = true`

面板标识，用于判断对象是否为 Panel。

### `readonly name: string`

面板名称，从配置中获取。

### `readonly id: string`

面板唯一标识符，格式为 `pane:${name}$`。

### `@obx.ref inited = false`

初始化状态标记。

### `@obx.ref private _actived = false`

内部激活状态。

### `@computed get actived(): boolean`

计算属性，返回面板的激活状态。

### `@computed get visible(): boolean`

计算属性，返回面板的可见性。

**计算逻辑:**
1. 如果父容器不可见，返回 `false`
2. 如果配置了 `props.condition`，执行条件函数
3. 否则返回 `_actived` 状态

### `get body()`

计算属性，返回面板的主体内容。

**行为:**
- 如果有子面板容器，返回 `TabsPanelView`
- 否则，创建内容并传递必要的属性

### `get content()`

计算属性，返回面板的 React 内容。

**行为:**
- 如果是纯面板（`plain`），返回 `PanelView`
- 否则，返回 `TitledPanelView`

### `readonly title: IPublicTypeTitleContent`

面板标题，通过 `composeTitle` 函数组合标题、图标和描述。

### `readonly help?: IPublicTypeHelpTipConfig`

帮助提示配置。

### `private plain = false`

是否为纯面板（无标题栏）。

### `private container?: WidgetContainer<Panel, IPublicTypePanelConfig>`

子面板容器。

### `@obx.ref parent?: WidgetContainer`

父容器引用。

## 方法

### `constructor(readonly skeleton: ISkeleton, readonly config: IPublicTypePanelConfig)`

构造函数，创建 Panel 实例。

**参数:**
- `skeleton`: Skeleton 实例
- `config`: Panel 配置

**行为:**
- 设置 `name`、`id`、`title` 等属性
- 根据 `props.hideTitleBar` 设置 `plain` 标志
- 如果配置了 `content` 为数组，创建子面板容器
- 如果配置了 `props.onInit`，调用初始化回调
- 如果 `content` 本身有 `onInit`，也调用它

### `setParent(parent: WidgetContainer): void`

设置父容器。

**参数:**
- `parent`: 父容器

**行为:**
- 如果新父容器与当前父容器相同，不执行操作
- 如果已有父容器，从原父容器中移除自己
- 设置新的父容器

### `add(item: Panel | IPublicTypePanelConfig): void`

添加子面板。

**参数:**
- `item`: Panel 实例或 Panel 配置

**行为:**
- 通过容器添加子面板

### `getPane(name: string): Panel | null`

根据名称获取子面板。

**参数:**
- `name`: 子面板名称

**返回值:** 子面板实例，如果不存在则返回 `null`

### `remove(item: Panel | string): void`

移除子面板。

**参数:**
- `item`: Panel 实例或 Panel 名称

**行为:**
- 通过容器移除子面板

### `active(item?: Panel | string | null): void`

激活面板或子面板。

**参数:**
- `item`: 可选，子面板实例或名称

**行为:**
- 如果指定了 `item`，激活对应的子面板
- 否则，激活当前面板

### `getName(): string`

获取面板名称。

**返回值:** 面板名称

### `getContent(): any`

获取面板内容。

**返回值:** 面板的 React 内容

### `isChildOfFloatArea(): boolean`

检查面板是否在浮动区域。

**返回值:** 如果父容器名称为 `'leftFloatArea'`，返回 `true`

### `isChildOfFixedArea(): boolean`

检查面板是否在固定区域。

**返回值:** 如果父容器名称为 `'leftFixedArea'`，返回 `true`

### `setActive(flag: boolean): void`

设置面板的激活状态。

**参数:**
- `flag`: 是否激活

**行为:**
- 如果新状态与当前状态相同，不执行操作
- 如果设置为激活：
  - 如果在浮动区域，取消固定区域所有面板的激活
  - 如果在固定区域，取消浮动区域所有面板的激活
  - 设置 `_actived` 为 `true`
  - 激活父容器
  - 如果未初始化，标记为已初始化
  - 发布激活变化事件
- 如果设置为取消激活：
  - 如果面板名称以父容器名称开头，取消初始化
  - 设置 `_actived` 为 `false`
  - 取消父容器的激活
  - 发布激活变化事件

### `toggle(): void`

切换面板的激活状态。

### `hide(): void`

隐藏面板（取消激活）。

### `disable(): void`

禁用面板（空实现）。

### `enable(): void`

启用面板（空实现）。

### `show(): void`

显示面板（激活）。

### `getAssocDocks(): PanelDock[]`

获取关联的 PanelDock 列表。

**返回值:** 关联的 PanelDock 数组

### `onActiveChange(fn: (flag: boolean) => void): () => void`

**已废弃** - 监听激活状态变化。

**参数:**
- `fn`: 回调函数

**返回值:** 取消监听的函数

## 工具函数

### `isPanel(obj: any): obj is Panel`

判断对象是否为 Panel。

```typescript
export function isPanel(obj: any): obj is Panel {
  return obj && obj.isPanel;
}
```

## 使用示例

### 创建简单 Panel

```typescript
import { Panel } from '@alilc/lowcode-editor-skeleton';

const panel = new Panel(skeleton, {
  type: 'Panel',
  name: 'myPanel',
  props: {
    title: '我的面板',
    icon: 'my-icon',
    description: '这是一个示例面板',
    width: 300,
  },
  content: MyPanelContent,
});

// 激活面板
panel.show();

// 隐藏面板
panel.hide();
```

### 创建嵌套 Panel

```typescript
const panel = new Panel(skeleton, {
  type: 'Panel',
  name: 'parentPanel',
  props: {
    title: '父面板',
  },
  content: [
    {
      type: 'Panel',
      name: 'childPanel1',
      props: {
        title: '子面板 1',
      },
      content: ChildContent1,
    },
    {
      type: 'Panel',
      name: 'childPanel2',
      props: {
        title: '子面板 2',
      },
      content: ChildContent2,
    },
  ],
});

// 激活特定子面板
panel.active('childPanel1');
```

### 创建带条件显示的 Panel

```typescript
const panel = new Panel(skeleton, {
  type: 'Panel',
  name: 'conditionalPanel',
  props: {
    title: '条件面板',
    condition: (panel) => {
      // 根据某些条件决定是否显示
      return someCondition;
    },
  },
  content: ConditionalContent,
});
```

### 创建无标题栏的 Panel

```typescript
const panel = new Panel(skeleton, {
  type: 'Panel',
  name: 'plainPanel',
  props: {
    hideTitleBar: true,
  },
  content: PlainContent,
});
```

### 监听激活状态变化

```typescript
const panel = new Panel(skeleton, {
  type: 'Panel',
  name: 'myPanel',
  props: {
    title: '我的面板',
  },
  content: MyContent,
});

// 监听激活状态变化（已废弃）
const unsubscribe = panel.onActiveChange((isActive) => {
  console.log('Panel active status changed:', isActive);
});

// 取消监听
unsubscribe();
```

### 检查面板所在区域

```typescript
const panel = new Panel(skeleton, {
  type: 'Panel',
  name: 'myPanel',
  props: {
    title: '我的面板',
  },
  content: MyContent,
});

// 检查是否在浮动区域
if (panel.isChildOfFloatArea()) {
  console.log('Panel is in float area');
}

// 检查是否在固定区域
if (panel.isChildOfFixedArea()) {
  console.log('Panel is in fixed area');
}
```

### 获取关联的 Dock

```typescript
const panel = new Panel(skeleton, {
  type: 'Panel',
  name: 'myPanel',
  props: {
    title: '我的面板',
  },
  content: MyContent,
});

// 获取所有关联的 PanelDock
const docks = panel.getAssocDocks();
console.log('Associated docks:', docks);
```

## 面板激活机制

Panel 的激活机制包括以下几个关键点：

### 1. 区域互斥

当激活一个面板时，会自动取消同一类型区域的其他面板的激活：

```typescript
setActive(flag: boolean) {
  if (flag) {
    // 对于 Area 的直接 Child，要专门处理 Float & Fixed 分组切换
    if (this.isChildOfFloatArea()) {
      this.skeleton.leftFixedArea.container.unactiveAll();
    } else if (this.isChildOfFixedArea()) {
      this.skeleton.leftFloatArea.container.unactiveAll();
    }
    this._actived = true;
    this.parent?.active(this);
  }
}
```

### 2. 父容器激活

激活面板时会激活父容器：

```typescript
this.parent?.active(this);
```

### 3. 初始化状态

面板只有在激活时才会初始化：

```typescript
if (flag) {
  if (!this.inited) {
    this.inited = true;
  }
}
```

### 4. 事件发布

激活状态变化时会发布事件：

```typescript
this.emitter.emit('activechange', true);
```

## 可见性计算

Panel 的可见性由多个因素决定：

```typescript
@computed get visible(): boolean {
  if (!this.parent || this.parent.visible) {
    const { props } = this.config;
    if (props?.condition) {
      return props.condition(this);
    }
    return this._actived;
  }
  return false;
}
```

**影响因素:**
1. 父容器的可见性
2. 配置的条件函数
3. 面板的激活状态

## 嵌套面板渲染

Panel 支持嵌套子面板，渲染逻辑如下：

```typescript
get body() {
  if (this.container) {
    return createElement(TabsPanelView, {
      container: this.container,
      shouldHideSingleTab: true,
    });
  }

  const { content, contentProps } = this.config;
  return createContent(content, {
    ...contentProps,
    editor: getEvent(this.skeleton.editor),
    config: this.config,
    panel: this,
    pane: this,
  });
}
```

**渲染特点:**
- 有子面板时，使用 `TabsPanelView` 渲染 Tab 形式
- 只有一个子面板时，隐藏 Tab
- 没有子面板时，直接渲染内容

## 标题组合

Panel 的标题通过 `composeTitle` 函数组合：

```typescript
import { composeTitle } from './widget/utils';

this.title = composeTitle(title || name, icon, description);
```

**组合逻辑:**
- 优先使用配置的 `title`
- 否则使用 `name`
- 可以包含图标和描述

## 注意事项

1. **激活互斥**: 同一区域的 Panel 不能同时激活
2. **区域切换**: Panel 可以在固定和浮动区域之间切换
3. **条件显示**: 可以通过 `props.condition` 动态控制显示
4. **延迟初始化**: Panel 只在激活时初始化
5. **事件发布**: 激活状态变化会发布事件
6. **废弃方法**: `onActiveChange` 方法已废弃，建议使用事件监听

## 相关文件

- [`widget.ts`](./widget.md) - Widget 基类
- [`panel-dock.ts`](./panel-dock.md) - PanelDock 类
- [`widget-container.ts`](./widget-container.md) - Widget 容器
- [`utils.ts`](./utils.md) - 工具函数
- [`skeleton.ts`](../skeleton.md) - Skeleton 核心类
- [`components/widget-views/index.tsx`](../components/widget-views/index.md) - Widget 视图组件
