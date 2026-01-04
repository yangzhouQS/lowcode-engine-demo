# Editor Skeleton 模块文档

## 概述

`@alilc/lowcode-editor-skeleton` 是低代码编辑器的骨架模块，负责编辑器界面的布局、面板管理和组件渲染。它提供了灵活的插件化架构，支持自定义面板、工具栏和布局区域。

## 核心功能

- **布局管理**: 提供多个预定义区域（左侧、顶部、底部、右侧、主区域等）用于放置插件
- **面板系统**: 支持固定面板和浮动面板，可动态切换显示状态
- **Widget 系统**: 提供可复用的 Widget 组件，支持 Dock、Panel、Stage 等类型
- **设置面板**: 提供属性配置界面，支持多种 Setter 类型
- **国际化**: 内置中英文支持
- **事件系统**: 完整的事件发布订阅机制

## 目录结构

```
packages/editor-skeleton/
├── src/
│   ├── area.ts              # 区域管理
│   ├── skeleton.ts          # 核心骨架类
│   ├── types.ts            # 类型定义
│   ├── context.ts          # React Context
│   ├── register-defaults.ts # 默认配置注册
│   ├── transducers/        # 数据转换器
│   ├── widget/             # Widget 组件
│   ├── components/         # UI 组件
│   ├── layouts/            # 布局组件
│   ├── icons/             # 图标组件
│   └── locale/            # 国际化文件
├── tests/                 # 测试文件
└── package.json
```

## 主要模块

### 1. 核心模块 (Core)

- [`area.ts`](./area.md) - 区域管理，定义编辑器的各个布局区域
- [`skeleton.ts`](./skeleton.md) - 骨架核心类，管理所有 Widget 和面板
- [`types.ts`](./types.md) - 类型定义，包括 Widget、Dock、Panel 等配置类型
- [`context.ts`](./context.md) - React Context，提供 Skeleton 实例
- [`register-defaults.ts`](./register-defaults.md) - 注册默认的配置转换器

### 2. Widget 模块 (Widget)

- [`widget/widget.ts`](./widget/widget.md) - Widget 基类
- [`widget/panel.ts`](./widget/panel.md) - 面板 Widget
- [`widget/dock.ts`](./widget/dock.md) - Dock Widget
- [`widget/panel-dock.ts`](./widget/panel-dock.md) - 面板 Dock Widget
- [`widget/stage.ts`](./widget/stage.md) - Stage Widget
- [`widget/widget-container.ts`](./widget/widget-container.md) - Widget 容器
- [`widget/utils.ts`](./widget/utils.md) - 工具函数

### 3. 组件模块 (Components)

#### 设置面板 (Settings)
- [`components/settings/settings-pane.tsx`](./components/settings/settings-pane.md) - 设置面板组件
- [`components/settings/settings-primary-pane.tsx`](./components/settings/settings-primary-pane.md) - 主设置面板
- [`components/settings/main.ts`](./components/settings/main.md) - 设置面板主逻辑
- [`components/settings/utils.ts`](./components/settings/utils.md) - 设置工具函数

#### 字段组件 (Field)
- [`components/field/index.ts`](./components/field/index.md) - 字段组件入口
- [`components/field/fields.tsx`](./components/field/fields.md) - 字段组件实现
- [`components/field/inlinetip.tsx`](./components/field/inlinetip.md) - 内联提示组件

#### 其他组件
- [`components/widget-views/index.tsx`](./components/widget-views/index.md) - Widget 视图组件
- [`components/widget-views/panel-operation-row.tsx`](./components/widget-views/panel-operation-row.md) - 面板操作行
- [`components/popup/index.tsx`](./components/popup/index.md) - 弹窗组件
- [`components/draggable-line/index.tsx`](./components/draggable-line/index.md) - 可拖拽分割线
- [`components/stage-box/`](./components/stage-box/index.md) - Stage 盒子组件

### 4. 布局模块 (Layouts)

- [`layouts/workbench.tsx`](./layouts/workbench.md) - 工作台主布局
- [`layouts/left-area.tsx`](./layouts/left-area.md) - 左侧区域
- [`layouts/left-float-pane.tsx`](./layouts/left-float-pane.md) - 左侧浮动面板
- [`layouts/left-fixed-pane.tsx`](./layouts/left-fixed-pane.md) - 左侧固定面板
- [`layouts/right-area.tsx`](./layouts/right-area.md) - 右侧区域
- [`layouts/top-area.tsx`](./layouts/top-area.md) - 顶部区域
- [`layouts/sub-top-area.tsx`](./layouts/sub-top-area.md) - 子顶部区域
- [`layouts/bottom-area.tsx`](./layouts/bottom-area.md) - 底部区域
- [`layouts/main-area.tsx`](./layouts/main-area.md) - 主区域
- [`layouts/toolbar.tsx`](./layouts/toolbar.md) - 工具栏

### 5. 转换器模块 (Transducers)

- [`transducers/parse-func.ts`](./transducers/parse-func.md) - 函数解析器
- [`transducers/parse-props.ts`](./transducers/parse-props.md) - 属性解析器
- [`transducers/addon-combine.ts`](./transducers/addon-combine.md) - 插件组合器

### 6. 图标模块 (Icons)

- [`icons/arrow.tsx`](./icons/arrow.md) - 箭头图标
- [`icons/fix.tsx`](./icons/fix.md) - 固定图标
- [`icons/float.tsx`](./icons/float.md) - 浮动图标
- [`icons/exit.tsx`](./icons/exit.md) - 退出图标
- [`icons/clear.tsx`](./icons/clear.md) - 清除图标
- [`icons/convert.tsx`](./icons/convert.md) - 转换图标
- [`icons/slot.tsx`](./icons/slot.md) - 插槽图标
- [`icons/variable.tsx`](./icons/variable.md) - 变量图标

### 7. 国际化模块 (Locale)

- [`locale/index.ts`](./locale/index.md) - 国际化入口
- [`locale/zh-CN.json`](./locale/zh-CN.md) - 中文语言包
- [`locale/en-US.json`](./locale/en-US.md) - 英文语言包

## API 文档

### Skeleton 类

Skeleton 是编辑器骨架的核心类，负责管理所有的 Widget 和面板。

```typescript
class Skeleton {
  // 区域
  readonly leftArea: Area<DockConfig | PanelDockConfig | DialogDockConfig>;
  readonly topArea: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig>;
  readonly subTopArea: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig>;
  readonly toolbar: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig>;
  readonly leftFixedArea: Area<IPublicTypePanelConfig, Panel>;
  readonly leftFloatArea: Area<IPublicTypePanelConfig, Panel>;
  readonly rightArea: Area<IPublicTypePanelConfig, Panel>;
  readonly mainArea: Area<WidgetConfig | IPublicTypePanelConfig, Widget | Panel>;
  readonly bottomArea: Area<IPublicTypePanelConfig, Panel>;
  readonly stages: Area<StageConfig, Stage>;
  
  // 方法
  add(config: IPublicTypeSkeletonConfig): IWidget | Widget | Panel | Stage | Dock | PanelDock;
  getPanel(name: string): Panel | undefined;
  getWidget(name: string): IWidget | undefined;
  createStage(config: any): string | undefined;
  getStage(name: string): Stage | null;
  createContainer(name: string, handle: (item: any) => any, ...): WidgetContainer;
  createPanel(config: IPublicTypePanelConfig): Panel;
  buildFromConfig(config?: EditorConfig, components?: PluginClassSet): void;
}
```

### Widget 配置

```typescript
interface WidgetConfig {
  type: 'Widget';
  name: string;
  area?: IPublicTypeWidgetConfigArea;
  content?: string | ReactElement | ComponentType<any>;
  props?: {
    align?: 'left' | 'right' | 'bottom' | 'center' | 'top';
    onInit?: (widget: IWidget) => void;
    title?: IPublicTypeTitleContent | null;
  };
}
```

### Panel 配置

```typescript
interface IPublicTypePanelConfig {
  type: 'Panel';
  name: string;
  area?: IPublicTypeWidgetConfigArea;
  content?: string | ReactElement | ComponentType<any> | IPublicTypePanelConfig[];
  props?: {
    title?: IPublicTypeTitleContent;
    icon?: IPublicTypeIconType;
    description?: string;
    hideTitleBar?: boolean;
    width?: number;
    enableDrag?: boolean;
    canSetFixed?: boolean;
    condition?: (panel: Panel) => boolean;
    onInit?: (panel: Panel) => void;
  };
}
```

### Dock 配置

```typescript
interface DockConfig {
  type: 'Dock';
  name: string;
  area?: IPublicTypeWidgetConfigArea;
  content?: string | ReactElement | ComponentType<any>;
  props?: {
    align?: 'left' | 'right' | 'bottom' | 'center' | 'top';
    onInit?: (widget: IWidget) => void;
    title?: IPublicTypeTitleContent | null;
  };
}
```

### PanelDock 配置

```typescript
interface PanelDockConfig {
  type: 'PanelDock';
  name: string;
  panelName?: string;
  area?: IPublicTypeWidgetConfigArea;
  content?: string | ReactElement | ComponentType<any> | IPublicTypePanelConfig[];
  panelProps?: IPublicTypePanelConfigProps & {
    area?: IPublicTypeWidgetConfigArea;
  };
  props?: {
    align?: 'left' | 'right' | 'bottom' | 'center' | 'top';
    onInit?: (widget: IWidget) => void;
    title?: IPublicTypeTitleContent | null;
  };
}
```

## 事件系统

Skeleton 提供了完整的事件系统，用于监听面板和 Widget 的状态变化。

### Skeleton 事件

```typescript
enum SkeletonEvents {
  PANEL_DOCK_ACTIVE = 'skeleton.panel-dock.active',
  PANEL_DOCK_UNACTIVE = 'skeleton.panel-dock.unactive',
  PANEL_SHOW = 'skeleton.panel.show',
  PANEL_HIDE = 'skeleton.panel.hide',
  WIDGET_SHOW = 'skeleton.widget.show',
  WIDGET_HIDE = 'skeleton.widget.hide',
  WIDGET_DISABLE = 'skeleton.widget.disable',
  WIDGET_ENABLE = 'skeleton.widget.enable',
}
```

### 事件监听示例

```typescript
// 监听面板显示事件
skeleton.editor.eventBus.on(SkeletonEvents.PANEL_SHOW, (panelName, panel) => {
  console.log('Panel shown:', panelName);
});

// 监听 Widget 显示事件
skeleton.editor.eventBus.on(SkeletonEvents.WIDGET_SHOW, (widgetName, widget) => {
  console.log('Widget shown:', widgetName);
});
```

## 使用示例

### 添加一个 Panel

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

// 添加一个左侧浮动面板
skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
    icon: 'my-icon',
    width: 300,
  },
  content: MyPanelComponent,
});
```

### 添加一个 Dock

```typescript
// 添加一个左侧 Dock
skeleton.add({
  type: 'Dock',
  name: 'myDock',
  area: 'leftArea',
  props: {
    title: '我的工具',
    align: 'top',
  },
  content: MyDockComponent,
});
```

### 添加一个 PanelDock

```typescript
// 添加一个 PanelDock，点击后显示关联的 Panel
skeleton.add({
  type: 'PanelDock',
  name: 'myPanelDock',
  area: 'leftArea',
  props: {
    title: '打开面板',
  },
  panelProps: {
    title: '面板内容',
    area: 'leftFloatArea',
  },
  content: MyPanelContent,
});
```

## 配置转换器 (Config Transducers)

配置转换器用于在添加 Widget 时对配置进行预处理。

### 注册转换器

```typescript
import { registerDefaults } from '@alilc/lowcode-editor-skeleton';

registerDefaults(ctx);
```

### 内置转换器

1. **parse-func** - 解析函数字符串为实际函数
2. **parse-props** - 解析组件属性配置
3. **addon-combine** - 组合插件配置

## 样式定制

Skeleton 模块使用 Less 编写样式，支持通过 CSS 变量进行主题定制。

### 主要样式文件

- `layouts/workbench.less` - 工作台样式
- `layouts/theme.less` - 主题变量
- `components/widget-views/index.less` - Widget 视图样式
- `components/settings/style.less` - 设置面板样式
- `components/field/index.less` - 字段组件样式
- `components/popup/style.less` - 弹窗样式

## 依赖关系

```json
{
  "dependencies": {
    "@alifd/next": "^1.20.12",
    "@alilc/lowcode-designer": "1.3.2",
    "@alilc/lowcode-editor-core": "1.3.2",
    "@alilc/lowcode-types": "1.3.2",
    "@alilc/lowcode-utils": "1.3.2",
    "classnames": "^2.2.6",
    "react": "^16.8.1",
    "react-dom": "^16.8.1"
  }
}
```

## 版本信息

- **版本**: 1.3.2
- **维护者**: Alibaba LowCode Team
- **仓库**: https://github.com/alibaba/lowcode-engine/tree/main/packages/editor-skeleton

## 相关链接

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub Issues](https://github.com/alibaba/lowcode-engine/issues)
