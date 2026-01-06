# @vue3-lowcode/editor-skeleton

编辑器骨架包，用于管理编辑器的 UI 布局和组件。

## 简介

`@vue3-lowcode/editor-skeleton` 是 Vue3 低代码框架的编辑器骨架包，负责管理编辑器的 UI 布局、组件和区域。它提供了灵活的编辑器布局系统，支持自定义面板、工具栏、舞台等组件。

## 功能特性

- **灵活的布局系统**：支持多个编辑器区域（顶部、底部、左侧、右侧、主区域）
- **Widget 系统**：支持自定义 Widget 组件
- **Panel 系统**：支持面板管理，支持嵌套面板
- **Dock 系统**：支持 Dock 组件，用于快速切换面板
- **Stage 系统**：支持舞台管理，用于管理编辑器中的舞台
- **响应式设计**：基于 Vue3 响应式系统，实时更新 UI
- **类型安全**：完整的 TypeScript 类型定义

## 安装

```bash
pnpm add @vue3-lowcode/editor-skeleton
```

## 核心概念

### Skeleton（骨架）

Skeleton 是编辑器骨架的核心类，负责管理所有的编辑器区域和组件。

```typescript
import { Skeleton } from '@vue3-lowcode/editor-skeleton';

const skeleton = new Skeleton();
```

### Area（区域）

Area 表示编辑器中的一个区域，如顶部区域、左侧区域等。

```typescript
const leftArea = skeleton.leftArea;
leftArea.add(widget);
```

### Widget（组件）

Widget 是编辑器中的基础组件，可以是按钮、工具栏等。

```typescript
import { Widget } from '@vue3-lowcode/editor-skeleton';

const widget = new Widget(skeleton, {
  name: 'my-widget',
  title: 'My Widget',
  content: () => h('div', 'Hello World'),
});
```

### Panel（面板）

Panel 是一种特殊的 Widget，用于显示面板内容。

```typescript
import { Panel } from '@vue3-lowcode/editor-skeleton';

const panel = new Panel(skeleton, {
  name: 'my-panel',
  title: 'My Panel',
  content: () => h('div', 'Panel Content'),
});
```

### Dock（停靠）

Dock 是一种特殊的 Widget，用于快速切换面板。

```typescript
import { Dock } from '@vue3-lowcode/editor-skeleton';

const dock = new Dock(skeleton, {
  name: 'my-dock',
  title: 'My Dock',
});
```

### Stage（舞台）

Stage 是编辑器中的舞台，用于显示编辑器内容。

```typescript
import { Stage } from '@vue3-lowcode/editor-skeleton';

const stage = new Stage(skeleton, {
  name: 'my-stage',
  title: 'My Stage',
  content: () => h('div', 'Stage Content'),
});
```

## 使用示例

### 创建面板

```typescript
import { Skeleton } from '@vue3-lowcode/editor-skeleton';

const skeleton = new Skeleton();

// 创建面板
const panel = skeleton.createPanel({
  name: 'settings-panel',
  title: '设置',
  content: () => h('div', '设置面板内容'),
  area: 'rightArea',
});

// 激活面板
panel.active();
```

### 创建 Widget

```typescript
// 创建 Widget
const widget = skeleton.createWidget({
  name: 'my-widget',
  title: '我的组件',
  content: () => h('button', '点击我'),
  area: 'topArea',
});

// 添加到区域
skeleton.topArea.add(widget);
```

### 创建 Stage

```typescript
// 创建 Stage
const stage = skeleton.createStage({
  name: 'main-stage',
  title: '主舞台',
  content: () => h('div', '舞台内容'),
  area: 'mainArea',
});

// 激活舞台
stage.active();
```

### 配置解析

```typescript
const config = [
  {
    name: 'left-area',
    type: 'Area',
    area: 'leftArea',
    items: [
      {
        name: 'component-panel',
        type: 'Panel',
        title: '组件',
        content: () => h('div', '组件面板'),
      },
    ],
  },
];

skeleton.parseConfig(config);
```

## API 文档

### Skeleton

#### 属性

- `panels: WidgetContainer<Panel>` - 面板容器
- `containers: Map<string, WidgetContainer>` - 容器映射
- `leftArea: Area` - 左侧区域
- `topArea: Area` - 顶部区域
- `subTopArea: Area` - 子顶部区域
- `toolbar: Area` - 工具栏区域
- `leftFixedArea: Area` - 左侧固定区域
- `leftFloatArea: Area` - 左侧浮动区域
- `rightArea: Area` - 右侧区域
- `mainArea: Area` - 主区域
- `bottomArea: Area` - 底部区域
- `stages: Map<string, Stage>` - 舞台映射
- `widgets: Map<string, Widget>` - 组件映射

#### 方法

- `getPanel(name: string): Panel | undefined` - 获取面板
- `getWidget(name: string): Widget | undefined` - 获取组件
- `createStage(config: StageConfig): Stage` - 创建舞台
- `getStage(name: string): Stage | undefined` - 获取舞台
- `createPanel(config: PanelConfig): Panel` - 创建面板
- `createWidget(config: WidgetConfig): Widget` - 创建组件
- `add(config: WidgetConfig | PanelConfig | DockConfig): Widget | Panel | Dock` - 添加组件
- `createContainer(name: string): WidgetContainer` - 创建容器
- `parseConfig(config: any[]): void` - 解析配置

### Widget

#### 属性

- `isWidget: boolean` - 是否为 Widget
- `id: string` - 组件 ID
- `name: string` - 组件名称
- `align: string` - 对齐方式
- `visible: boolean` - 是否可见
- `disabled: boolean` - 是否禁用
- `body: any` - 组件内容
- `content: VNode` - 组件 VNode
- `title: string` - 组件标题

#### 方法

- `getId(): string` - 获取组件 ID
- `getName(): string` - 获取组件名称
- `getContent(): VNode` - 获取组件内容
- `hide(): void` - 隐藏组件
- `show(): void` - 显示组件
- `setVisible(visible: boolean): void` - 设置可见性
- `toggle(): void` - 切换可见性
- `disable(): void` - 禁用组件
- `enable(): void` - 启用组件

### Panel

#### 属性

- `isPanel: boolean` - 是否为 Panel
- `actived: boolean` - 是否激活
- `container: WidgetContainer | null` - 容器
- `parent: Panel | null` - 父面板

#### 方法

- `setParent(parent: Panel | null): void` - 设置父面板
- `add(panel: Panel): void` - 添加子面板
- `getPane(name: string): Panel | undefined` - 获取子面板
- `remove(panel: Panel): void` - 移除子面板
- `active(): void` - 激活面板
- `setActive(actived: boolean): void` - 设置激活状态
- `toggle(): void` - 切换激活状态
- `hide(): void` - 隐藏面板
- `disable(): void` - 禁用面板
- `enable(): void` - 启用面板
- `show(): void` - 显示面板
- `isChildOfFloatArea(): boolean` - 是否为浮动区域子面板
- `isChildOfFixedArea(): boolean` - 是否为固定区域子面板

### Area

#### 属性

- `visible: boolean` - 是否可见
- `current: any` - 当前激活项
- `container: WidgetContainer` - 容器

#### 方法

- `isEmpty(): boolean` - 是否为空
- `add(item: any): void` - 添加项
- `remove(item: any): void` - 移除项
- `setVisible(visible: boolean): void` - 设置可见性
- `hide(): void` - 隐藏区域
- `show(): void` - 显示区域

### Stage

#### 属性

- `isStage: boolean` - 是否为 Stage
- `name: string` - 舞台名称
- `title: string` - 舞台标题
- `content: any` - 舞台内容
- `props: Record<string, any>` - 舞台属性
- `area: string` - 所属区域
- `actived: boolean` - 是否激活

#### 方法

- `active(): void` - 激活舞台
- `unactive(): void` - 取消激活舞台
- `toggle(): void` - 切换激活状态
- `getContent(): any` - 获取舞台内容
- `getProps(): Record<string, any>` - 获取舞台属性
- `getName(): string` - 获取舞台名称
- `getTitle(): string` - 获取舞台标题

### Dock

#### 属性

- `isDock: boolean` - 是否为 Dock

#### 方法

- `toggle(): void` - 切换状态

### PanelDock

#### 属性

- `isPanelDock: boolean` - 是否为 PanelDock
- `panelName: string | undefined` - 关联的面板名称

#### 方法

- `togglePanel(): void` - 切换关联的面板

## 类型定义

### WidgetConfig

```typescript
interface WidgetConfig {
  name: string;
  title?: string;
  align?: string;
  visible?: boolean;
  disabled?: boolean;
  content?: any;
  props?: Record<string, any>;
  area?: string;
}
```

### PanelConfig

```typescript
interface PanelConfig extends WidgetConfig {
  help?: any;
  plain?: boolean;
  condition?: any;
  onInit?: () => void;
  onDestroy?: () => void;
}
```

### DockConfig

```typescript
interface DockConfig extends WidgetConfig {
  icon?: any;
}
```

### PanelDockConfig

```typescript
interface PanelDockConfig extends DockConfig {
  panelName?: string;
}
```

### StageConfig

```typescript
interface StageConfig {
  name: string;
  title?: string;
  content: any;
  props?: Record<string, any>;
  area?: string;
}
```

## 开发指南

### 添加新的 Widget

```typescript
import { Widget } from '@vue3-lowcode/editor-skeleton';

class CustomWidget extends Widget {
  constructor(skeleton: ISkeleton, config: WidgetConfig) {
    super(skeleton, config);
  }

  get content() {
    return h('div', { class: 'custom-widget' }, this.title);
  }
}
```

### 添加新的 Panel

```typescript
import { Panel } from '@vue3-lowcode/editor-skeleton';

class CustomPanel extends Panel {
  constructor(skeleton: ISkeleton, config: PanelConfig) {
    super(skeleton, config);
  }

  get content() {
    return h('div', { class: 'custom-panel' }, this.title);
  }
}
```

## 依赖

- `@vue3-lowcode/types` - 类型定义
- `@vue3-lowcode/utils` - 工具函数
- `vue` - Vue3 框架
- `element-plus` - Element Plus UI 组件库

## 许可证

MIT
