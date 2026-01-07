# @vue3-lowcode/editor-skeleton

Vue3 LowCode Engine Editor Skeleton - 编辑器骨架包，提供编辑器布局和面板管理。

## 简介

`@vue3-lowcode/editor-skeleton` 是 Vue3 LowCode Engine 的编辑器骨架包，负责管理编辑器的布局、区域、Widget、面板和设置面板。它提供了灵活的布局管理和组件管理能力，支持动态添加、移除和配置编辑器的各个部分。

## 特性

- 🏗️ **灵活的布局管理**: 支持多种布局区域（顶部、左侧、右侧、底部、主区域）
- 🧩 **组件管理**: 统一管理 Widget、Panel 和 SettingsPane
- 🎨 **样式定制**: 支持自定义样式和主题
- 📱 **响应式设计**: 支持动态调整大小和折叠
- 🔌 **事件系统**: 完整的事件监听和处理机制
- 🎯 **TypeScript 支持**: 完整的类型定义
- ⚡ **高性能**: 基于 Vue3 的响应式系统

## 安装

```bash
npm install @vue3-lowcode/editor-skeleton
# 或
pnpm add @vue3-lowcode/editor-skeleton
# 或
yarn add @vue3-lowcode/editor-skeleton
```

## 快速开始

### 基础使用

```typescript
import { Skeleton } from '@vue3-lowcode/editor-skeleton';
import { Designer } from '@vue3-lowcode/designer';

// 创建设计器实例
const designer = new Designer({
  // 设计器配置
});

// 创建骨架实例
const skeleton = new Skeleton({
  container: '#editor-container',
  designer,
  theme: 'light',
  width: '100%',
  height: '100vh',
  animated: true,
});

// 初始化骨架
await skeleton.init();
```

### 添加区域

```typescript
// 添加左侧区域
const leftArea = skeleton.addArea({
  name: 'left',
  type: 'left',
  title: '组件面板',
  icon: 'el-icon-menu',
  width: 280,
  resizable: true,
  collapsible: true,
});

// 添加右侧区域
const rightArea = skeleton.addArea({
  name: 'right',
  type: 'right',
  title: '属性面板',
  icon: 'el-icon-setting',
  width: 320,
  resizable: true,
  collapsible: true,
});
```

### 添加 Widget

```typescript
// 添加组件树 Widget
const componentTreeWidget = skeleton.addWidget({
  name: 'component-tree',
  title: '组件树',
  icon: 'el-icon-s-grid',
  component: ComponentTreeComponent,
  area: 'left',
  index: 0,
  collapsible: true,
  draggable: true,
  props: {
    // 组件属性
  },
});

// 添加大纲 Widget
const outlineWidget = skeleton.addWidget({
  name: 'outline',
  title: '大纲',
  icon: 'el-icon-document',
  component: OutlineComponent,
  area: 'left',
  index: 1,
  collapsible: true,
});
```

### 添加面板

```typescript
// 添加设置面板
const settingsPanel = skeleton.addPanel({
  name: 'settings',
  title: '设置',
  icon: 'el-icon-setting',
  component: SettingsComponent,
  area: 'right',
  index: 0,
  collapsible: true,
  draggable: true,
});
```

### 添加设置面板

```typescript
// 添加属性设置面板
const propsSettingsPane = skeleton.addSettingsPane({
  name: 'props',
  title: '属性',
  icon: 'el-icon-edit',
  component: PropsSettingsComponent,
  area: 'right',
  index: 0,
  collapsible: true,
});

// 添加样式设置面板
const styleSettingsPane = skeleton.addSettingsPane({
  name: 'style',
  title: '样式',
  icon: 'el-icon-brush',
  component: StyleSettingsComponent,
  area: 'right',
  index: 1,
  collapsible: true,
});
```

## API 文档

### Skeleton

编辑器骨架主类，负责管理整个编辑器的布局和组件。

#### 构造函数

```typescript
constructor(config: SkeletonConfig, events?: SkeletonEvents)
```

**参数:**
- `config`: 骨架配置
  - `container`: 容器元素或选择器
  - `designer`: 设计器实例
  - `theme`: 主题（'light' | 'dark' | 'auto'）
  - `width`: 宽度
  - `height`: 高度
  - `animated`: 是否启用动画
  - `className`: 自定义类名
  - `style`: 自定义样式
- `events`: 骨架事件（可选）

#### 方法

##### init()

初始化骨架。

```typescript
async init(): Promise<void>
```

##### destroy()

销毁骨架。

```typescript
destroy(): void
```

##### getConfig()

获取骨架配置。

```typescript
getConfig(): SkeletonConfig
```

##### setConfig()

设置骨架配置。

```typescript
setConfig(config: Partial<SkeletonConfig>): void
```

##### getDesigner()

获取设计器实例。

```typescript
getDesigner(): Designer
```

##### getContainer()

获取容器元素。

```typescript
getContainer(): HTMLElement | null
```

##### addArea()

添加区域。

```typescript
addArea(config: AreaConfig): Area
```

##### removeArea()

移除区域。

```typescript
removeArea(name: string): void
```

##### getArea()

获取区域。

```typescript
getArea(name: string): Area | undefined
```

##### getAreas()

获取所有区域。

```typescript
getAreas(): Map<string, Area>
```

##### addWidget()

添加 Widget。

```typescript
addWidget(config: WidgetConfig): Widget
```

##### removeWidget()

移除 Widget。

```typescript
removeWidget(name: string): void
```

##### getWidget()

获取 Widget。

```typescript
getWidget(name: string): Widget | undefined
```

##### getWidgets()

获取所有 Widget。

```typescript
getWidgets(): Map<string, Widget>
```

##### addPanel()

添加面板。

```typescript
addPanel(config: PanelConfig): Panel
```

##### removePanel()

移除面板。

```typescript
removePanel(name: string): void
```

##### getPanel()

获取面板。

```typescript
getPanel(name: string): Panel | undefined
```

##### getPanels()

获取所有面板。

```typescript
getPanels(): Map<string, Panel>
```

##### addSettingsPane()

添加设置面板。

```typescript
addSettingsPane(config: SettingsPaneConfig): SettingsPane
```

##### removeSettingsPane()

移除设置面板。

```typescript
removeSettingsPane(name: string): void
```

##### getSettingsPane()

获取设置面板。

```typescript
getSettingsPane(name: string): SettingsPane | undefined
```

##### getSettingsPanes()

获取所有设置面板。

```typescript
getSettingsPanes(): Map<string, SettingsPane>
```

##### isInitialized()

检查骨架是否已初始化。

```typescript
isInitialized(): boolean
```

##### isDestroyed()

检查骨架是否已销毁。

```typescript
isDestroyed(): boolean
```

##### reset()

重置骨架。

```typescript
reset(): void
```

### Area

区域类，负责管理编辑器的各个区域。

#### 方法

##### init()

初始化区域。

```typescript
init(container: HTMLElement): void
```

##### destroy()

销毁区域。

```typescript
destroy(): void
```

##### getConfig()

获取区域配置。

```typescript
getConfig(): AreaConfig
```

##### getState()

获取区域状态。

```typescript
getState(): AreaState
```

##### setConfig()

设置区域配置。

```typescript
setConfig(config: Partial<AreaConfig>): void
```

##### setState()

设置区域状态。

```typescript
setState(state: Partial<AreaState>): void
```

##### getName()

获取区域名称。

```typescript
getName(): string
```

##### getType()

获取区域类型。

```typescript
getType(): string
```

##### getTitle()

获取区域标题。

```typescript
getTitle(): string | undefined
```

##### getIcon()

获取区域图标。

```typescript
getIcon(): string | undefined
```

##### getWidth()

获取区域宽度。

```typescript
getWidth(): string | number | undefined
```

##### setWidth()

设置区域宽度。

```typescript
setWidth(width: string | number): void
```

##### getHeight()

获取区域高度。

```typescript
getHeight(): string | number | undefined
```

##### setHeight()

设置区域高度。

```typescript
setHeight(height: string | number): void
```

##### getSize()

获取区域尺寸。

```typescript
getSize(): { width?: string | number; height?: string | number }
```

##### setSize()

设置区域尺寸。

```typescript
setSize(size: { width?: string | number; height?: string | number }): void
```

##### isCollapsed()

检查区域是否折叠。

```typescript
isCollapsed(): boolean
```

##### setCollapsed()

设置区域折叠状态。

```typescript
setCollapsed(collapsed: boolean): void
```

##### toggleCollapsed()

切换区域折叠状态。

```typescript
toggleCollapsed(): void
```

##### isResizable()

检查区域是否可调整大小。

```typescript
isResizable(): boolean
```

##### isCollapsible()

检查区域是否可折叠。

```typescript
isCollapsible(): boolean
```

##### isDraggable()

检查区域是否可拖拽。

```typescript
isDraggable(): boolean
```

##### isClosable()

检查区域是否可关闭。

```typescript
isClosable(): boolean
```

### Widget

Widget 类，负责管理编辑器的小部件。

#### 方法

Widget 类提供了与 Area 类类似的方法，包括：
- 初始化和销毁
- 配置和状态管理
- 尺寸和折叠控制
- 事件处理

### Panel

面板类，负责管理编辑器的面板。

#### 方法

Panel 类提供了与 Area 类类似的方法，包括：
- 初始化和销毁
- 配置和状态管理
- 尺寸和折叠控制
- 事件处理

### SettingsPane

设置面板类，负责管理编辑器的设置面板。

#### 方法

SettingsPane 类提供了与 Area 类类似的方法，包括：
- 初始化和销毁
- 配置和状态管理
- 尺寸和折叠控制
- 事件处理

## 事件系统

### Skeleton 事件

```typescript
interface SkeletonEvents {
  onInit?: () => void;
  onDestroy?: () => void;
  onAreaAdd?: (area: AreaConfig) => void;
  onAreaRemove?: (name: string) => void;
  onWidgetAdd?: (widget: WidgetConfig) => void;
  onWidgetRemove?: (name: string) => void;
  onPanelAdd?: (panel: PanelConfig) => void;
  onPanelRemove?: (name: string) => void;
  onSettingsPaneAdd?: (settingsPane: SettingsPaneConfig) => void;
  onSettingsPaneRemove?: (name: string) => void;
}
```

### Area 事件

```typescript
interface AreaEvents {
  onCollapse?: (name: string, collapsed: boolean) => void;
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  onClose?: (name: string) => void;
}
```

### Widget 事件

```typescript
interface WidgetEvents {
  onCollapse?: (name: string, collapsed: boolean) => void;
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  onClose?: (name: string) => void;
  onClick?: (name: string) => void;
  onDoubleClick?: (name: string) => void;
}
```

### Panel 事件

```typescript
interface PanelEvents {
  onCollapse?: (name: string, collapsed: boolean) => void;
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  onClose?: (name: string) => void;
  onClick?: (name: string) => void;
  onDoubleClick?: (name: string) => void;
}
```

### SettingsPane 事件

```typescript
interface SettingsPaneEvents {
  onCollapse?: (name: string, collapsed: boolean) => void;
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  onClose?: (name: string) => void;
  onClick?: (name: string) => void;
  onDoubleClick?: (name: string) => void;
}
```

## 使用示例

### 完整示例

```typescript
import { Skeleton } from '@vue3-lowcode/editor-skeleton';
import { Designer } from '@vue3-lowcode/designer';
import ComponentTree from './components/ComponentTree.vue';
import Outline from './components/Outline.vue';
import Settings from './components/Settings.vue';
import PropsSettings from './components/PropsSettings.vue';
import StyleSettings from './components/StyleSettings.vue';

// 创建设计器
const designer = new Designer({
  // 设计器配置
});

// 创建骨架
const skeleton = new Skeleton({
  container: '#editor-container',
  designer,
  theme: 'light',
  width: '100%',
  height: '100vh',
  animated: true,
}, {
  onInit: () => {
    console.log('骨架已初始化');
  },
  onWidgetAdd: (widget) => {
    console.log('Widget 已添加:', widget.name);
  },
});

// 添加区域
const leftArea = skeleton.addArea({
  name: 'left',
  type: 'left',
  title: '组件面板',
  icon: 'el-icon-menu',
  width: 280,
  resizable: true,
  collapsible: true,
});

const rightArea = skeleton.addArea({
  name: 'right',
  type: 'right',
  title: '属性面板',
  icon: 'el-icon-setting',
  width: 320,
  resizable: true,
  collapsible: true,
});

// 添加 Widget
skeleton.addWidget({
  name: 'component-tree',
  title: '组件树',
  icon: 'el-icon-s-grid',
  component: ComponentTree,
  area: 'left',
  index: 0,
  collapsible: true,
  draggable: true,
});

skeleton.addWidget({
  name: 'outline',
  title: '大纲',
  icon: 'el-icon-document',
  component: Outline,
  area: 'left',
  index: 1,
  collapsible: true,
});

// 添加面板
skeleton.addPanel({
  name: 'settings',
  title: '设置',
  icon: 'el-icon-setting',
  component: Settings,
  area: 'right',
  index: 0,
  collapsible: true,
});

// 添加设置面板
skeleton.addSettingsPane({
  name: 'props',
  title: '属性',
  icon: 'el-icon-edit',
  component: PropsSettings,
  area: 'right',
  index: 0,
  collapsible: true,
});

skeleton.addSettingsPane({
  name: 'style',
  title: '样式',
  icon: 'el-icon-brush',
  component: StyleSettings,
  area: 'right',
  index: 1,
  collapsible: true,
});

// 初始化骨架
await skeleton.init();

// 销毁骨架
// skeleton.destroy();
```

## 最佳实践

### 1. 组件封装

建议将 Widget、Panel 和 SettingsPane 的组件进行封装，提高复用性。

```typescript
// components/ComponentTreeWidget.ts
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ComponentTreeWidget',
  props: {
    designer: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // 组件逻辑
    return {};
  },
});
```

### 2. 事件处理

合理使用事件系统，实现组件间的通信。

```typescript
const skeleton = new Skeleton(config, {
  onWidgetAdd: (widget) => {
    console.log('Widget 已添加:', widget.name);
    // 执行相关操作
  },
  onWidgetRemove: (name) => {
    console.log('Widget 已移除:', name);
    // 执行相关操作
  },
});
```

### 3. 状态管理

使用状态管理工具（如 Pinia）管理编辑器的全局状态。

```typescript
// stores/editor.ts
import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editor', {
  state: () => ({
    skeleton: null as Skeleton | null,
  }),
  actions: {
    setSkeleton(skeleton: Skeleton) {
      this.skeleton = skeleton;
    },
  },
});
```

### 4. 样式定制

使用 CSS 变量和类名进行样式定制。

```css
:root {
  --lc-skeleton-bg-color: #f5f5f5;
  --lc-area-bg-color: #ffffff;
  --lc-widget-bg-color: #ffffff;
  --lc-panel-bg-color: #ffffff;
}

.lc-skeleton {
  background-color: var(--lc-skeleton-bg-color);
}

.lc-area {
  background-color: var(--lc-area-bg-color);
}

.lc-widget {
  background-color: var(--lc-widget-bg-color);
}

.lc-panel {
  background-color: var(--lc-panel-bg-color);
}
```

## TypeScript 支持

本包提供了完整的 TypeScript 类型定义，支持类型检查和智能提示。

```typescript
import type {
  SkeletonConfig,
  AreaConfig,
  WidgetConfig,
  PanelConfig,
  SettingsPaneConfig,
  SkeletonEvents,
} from '@vue3-lowcode/editor-skeleton';

// 类型安全的配置
const config: SkeletonConfig = {
  container: '#editor-container',
  designer,
  theme: 'light',
  width: '100%',
  height: '100vh',
};
```

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 许可证

MIT

## 贡献

欢迎贡献！请查看 [贡献指南](../../CONTRIBUTING.md) 了解详情。

## 相关包

- [@vue3-lowcode/types](../types) - 类型定义包
- [@vue3-lowcode/utils](../utils) - 工具库包
- [@vue3-lowcode/designer](../designer) - 设计器包
- [@vue3-lowcode/renderer-core](../renderer-core) - 渲染器核心包
- [@vue3-lowcode/vue-renderer](../vue-renderer) - Vue3 渲染器包
- [@vue3-lowcode/vue-simulator-renderer](../vue-simulator-renderer) - Vue3 模拟器渲染器包
