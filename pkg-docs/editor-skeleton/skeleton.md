# Skeleton 模块文档

## 文件路径

`packages/editor-skeleton/src/skeleton.ts`

## 功能概述

`Skeleton` 类是低代码编辑器骨架的核心类，负责管理编辑器的所有 Widget、面板和布局区域。它提供了插件化的架构，支持动态添加、移除和控制各种 UI 组件。

## 主要功能

### 1. 布局区域管理

管理编辑器的各个布局区域：
- `leftArea` - 左侧工具栏区域
- `topArea` - 顶部区域
- `subTopArea` - 子顶部区域
- `toolbar` - 工具栏区域
- `leftFixedArea` - 左侧固定面板区域
- `leftFloatArea` - 左侧浮动面板区域
- `rightArea` - 右侧面板区域
- `mainArea` - 主区域
- `bottomArea` - 底部区域
- `stages` - Stage 区域

### 2. Widget 管理

- 创建和管理各种类型的 Widget（Widget、Panel、Dock、PanelDock、Stage）
- 支持动态添加、移除 Widget
- 提供 Widget 查询功能

### 3. 面板管理

- 管理所有 Panel 实例
- 支持面板的显示/隐藏控制
- 支持面板在固定和浮动区域之间切换

### 4. 配置转换器

- 支持注册自定义的配置转换器
- 在添加 Widget 时自动应用转换器对配置进行预处理

### 5. 事件系统

- 发布面板和 Widget 的状态变化事件
- 支持插件监听和响应这些事件

## 类定义

```typescript
export class Skeleton implements ISkeleton {
  constructor(readonly editor: IEditor, readonly viewName: string = 'global')
}
```

## 属性

### 区域属性

```typescript
readonly leftArea: Area<DockConfig | PanelDockConfig | DialogDockConfig>;
readonly topArea: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig>;
readonly subTopArea: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig>;
readonly toolbar: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig>;
readonly leftFixedArea: Area<IPublicTypePanelConfig, Panel>;
readonly leftFloatArea: Area<IPublicTypePanelConfig, Panel>;
readonly rightArea: Area<IPublicTypePanelConfig, Panel>;
@obx readonly mainArea: Area<WidgetConfig | IPublicTypePanelConfig, Widget | Panel>;
readonly bottomArea: Area<IPublicTypePanelConfig, Panel>;
readonly stages: Area<StageConfig, Stage>;
```

### 其他属性

```typescript
readonly widgets: IWidget[];              // 所有 Widget 的数组
readonly focusTracker: FocusTracker;       // 焦点追踪器
private panels: Map<string, Panel>;        // 面板映射
private containers: Map<string, WidgetContainer<any>>; // 容器映射
private configTransducers: IPublicTypeConfigTransducer[]; // 配置转换器
```

## 方法

### `buildFromConfig(config?: EditorConfig, components?: PluginClassSet): void`

从配置构建 Skeleton。

**参数:**
- `config`: 编辑器配置
- `components`: 插件组件集合

**行为:**
- 初始化编辑器
- 设置插件
- 解析配置中的插件并添加到相应区域

### `add(config: IPublicTypeSkeletonConfig, extraConfig?: Record<string, any>): IWidget | Widget | Panel | Stage | Dock | PanelDock | undefined`

添加一个 Widget 到 Skeleton。

**参数:**
- `config`: Widget 配置
- `extraConfig`: 额外配置，会合并到 config 中

**返回值:** 创建的 Widget 实例

**行为:**
1. 应用所有注册的配置转换器
2. 解析配置
3. 根据 `area` 属性将 Widget 添加到对应区域
4. 如果没有指定 `area`，根据 `type` 自动选择默认区域

### `createWidget(config: IPublicTypeWidgetBaseConfig | IWidget): IWidget`

创建一个 Widget 实例。

**参数:**
- `config`: Widget 配置或 Widget 实例

**返回值:** Widget 实例

**行为:**
- 如果已经是 Widget 实例，直接返回
- 根据配置类型创建对应的 Widget（Dock、PanelDock、Panel、Widget）

### `createPanel(config: IPublicTypePanelConfig): Panel`

创建一个 Panel 实例。

**参数:**
- `config`: Panel 配置

**返回值:** Panel 实例

### `getPanel(name: string): Panel | undefined`

根据名称获取 Panel。

**参数:**
- `name`: Panel 名称

**返回值:** Panel 实例，如果不存在则返回 `undefined`

### `getWidget(name: string): IWidget | undefined`

根据名称获取 Widget。

**参数:**
- `name`: Widget 名称

**返回值:** Widget 实例，如果不存在则返回 `undefined`

### `createStage(config: any): string | undefined`

创建一个 Stage。

**参数:**
- `config`: Stage 配置

**返回值:** Stage 名称

### `getStage(name: string): Stage | null`

根据名称获取 Stage。

**参数:**
- `name`: Stage 名称

**返回值:** Stage 实例，如果不存在则返回 `null`

### `createContainer(name: string, handle: (item: any) => any, exclusive?: boolean, checkVisible?: () => boolean, defaultSetCurrent?: boolean): WidgetContainer`

创建一个 Widget 容器。

**参数:**
- `name`: 容器名称
- `handle`: 处理函数，用于将配置转换为 Widget
- `exclusive`: 是否为独占模式
- `checkVisible`: 可见性检查函数
- `defaultSetCurrent`: 是否默认设置当前项

**返回值:** WidgetContainer 实例

### `registerConfigTransducer(transducer: IPublicTypeConfigTransducer, level?: number, id?: string): void`

注册一个配置转换器。

**参数:**
- `transducer`: 转换器函数
- `level`: 转换器优先级，默认为 100
- `id`: 转换器 ID

**行为:**
- 根据 `level` 对转换器进行排序
- 优先级高的转换器先执行

### `getRegisteredConfigTransducers(): IPublicTypeConfigTransducer[]`

获取所有已注册的配置转换器。

**返回值:** 配置转换器数组

### `toggleFloatStatus(panel: Panel): void`

切换 Panel 的浮动/固定状态。

**参数:**
- `panel`: Panel 实例

**行为:**
- 如果 Panel 当前在浮动区域，移动到固定区域
- 如果 Panel 当前在固定区域，移动到浮动区域
- 保存状态到偏好设置

### `postEvent(event: SkeletonEvents, ...args: any[]): void`

发布一个 Skeleton 事件。

**参数:**
- `event`: 事件类型
- `args`: 事件参数

## 事件类型

```typescript
export enum SkeletonEvents {
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

## 使用示例

### 创建 Skeleton 实例

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);
```

### 添加一个 Panel

```typescript
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

### 注册配置转换器

```typescript
skeleton.registerConfigTransducer(
  (config) => {
    // 修改配置
    config.props = { ...config.props, customProp: 'value' };
    return config;
  },
  50, // 优先级
  'my-transducer'
);
```

### 从配置构建

```typescript
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

skeleton.buildFromConfig(config, { myPlugin: MyPluginComponent });
```

### 监听事件

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

## 区域说明

### leftArea

左侧工具栏区域，放置 Dock 和 PanelDock。

**支持的 Widget 类型:**
- `Dock`
- `PanelDock`
- `DialogDock`

**布局特点:**
- 非独占模式
- 支持顶部/底部对齐

### topArea

顶部区域，放置 Dock 和 PanelDock。

**支持的 Widget 类型:**
- `Dock`
- `Divider`
- `PanelDock`
- `DialogDock`

**布局特点:**
- 非独占模式
- 支持左/中/右对齐

### subTopArea

子顶部区域，放置 Dock 和 PanelDock。

**支持的 Widget 类型:**
- `Dock`
- `Divider`
- `PanelDock`
- `DialogDock`

**布局特点:**
- 非独占模式
- 支持左/中/右对齐

### toolbar

工具栏区域，放置 Dock 和 PanelDock。

**支持的 Widget 类型:**
- `Dock`
- `Divider`
- `PanelDock`
- `DialogDock`

**布局特点:**
- 非独占模式
- 支持左/中/右对齐

### leftFixedArea

左侧固定面板区域，放置 Panel。

**支持的 Widget 类型:**
- `Panel`

**布局特点:**
- 独占模式
- 同一时间只能显示一个 Panel

### leftFloatArea

左侧浮动面板区域，放置 Panel。

**支持的 Widget 类型:**
- `Panel`

**布局特点:**
- 独占模式
- 同一时间只能显示一个 Panel
- 点击外部区域自动关闭

### rightArea

右侧面板区域，放置 Panel。

**支持的 Widget 类型:**
- `Panel`

**布局特点:**
- 独占模式
- 同一时间只能显示一个 Panel

### mainArea

主区域，放置 Widget 和 Panel。

**支持的 Widget 类型:**
- `Widget`
- `Panel`

**布局特点:**
- 独占模式
- 通常用于放置画布等主要内容

### bottomArea

底部区域，放置 Panel。

**支持的 Widget 类型:**
- `Panel`

**布局特点:**
- 独占模式
- 同一时间只能显示一个 Panel

### stages

Stage 区域，放置 Stage。

**支持的 Widget 类型:**
- `Stage`

**布局特点:**
- 用于管理多级页面导航

## 配置解析

Skeleton 在添加 Widget 时会对配置进行解析和转换：

### 1. 应用配置转换器

```typescript
const registeredTransducers = this.getRegisteredConfigTransducers();
const parsedConfig = registeredTransducers.reduce((prevConfig, current) => {
  return current(prevConfig);
}, config);
```

### 2. 解析配置

```typescript
private parseConfig(config: IPublicTypeWidgetBaseConfig) {
  const { content, ...restConfig } = config;
  if (content) {
    if (isPlainObject(content) && !isValidElement(content)) {
      Object.keys(content).forEach((key) => {
        if (/props$/i.test(key) && restConfig[key]) {
          restConfig[key] = { ...restConfig[key], ...content[key] };
        } else {
          restConfig[key] = content[key];
        }
      });
    } else {
      restConfig.content = content;
    }
  }
  restConfig.pluginKey = restConfig.name;
  restConfig.parsed = true;
  return restConfig;
}
```

### 3. 自动选择区域

如果没有指定 `area`，根据 `type` 自动选择：

```typescript
let { area } = parsedConfig;
if (!area) {
  if (parsedConfig.type === 'Panel') {
    area = 'leftFloatArea';
  } else if (parsedConfig.type === 'Widget') {
    area = 'mainArea';
  } else {
    area = 'leftArea';
  }
}
```

## 面板浮动/固定切换

Skeleton 支持在固定和浮动区域之间切换 Panel：

### 触发条件

1. 用户点击面板的固定/浮动按钮
2. Panel 显示时，检查偏好设置中的状态

### 实现逻辑

```typescript
@action
toggleFloatStatus(panel: Panel) {
  const isFloat = panel?.parent?.name === 'leftFloatArea';
  if (isFloat) {
    this.leftFloatArea.remove(panel);
    this.leftFixedArea.add(panel);
    this.leftFixedArea.container.active(panel);
  } else {
    this.leftFixedArea.remove(panel);
    this.leftFloatArea.add(panel);
    this.leftFloatArea.container.active(panel);
  }
  engineConfig.getPreference().set(`${panel.name}-pinned-status-isFloat`, !isFloat, 'skeleton');
}
```

## 注意事项

1. **Widget 名称唯一性**: 同一区域内的 Widget 名称必须唯一
2. **配置转换器顺序**: 优先级高的转换器先执行
3. **面板状态持久化**: 面板的浮动/固定状态会保存到偏好设置
4. **事件发布时机**: 事件在 Widget 或 Panel 状态变化时自动发布
5. **焦点追踪**: Skeleton 内置焦点追踪器，用于处理浮动面板的自动关闭

## 相关文件

- [`area.ts`](./area.md) - 区域管理类
- [`widget/widget.ts`](./widget/widget.md) - Widget 基类
- [`widget/panel.ts`](./widget/panel.md) - Panel 类
- [`widget/dock.ts`](./widget/dock.md) - Dock 类
- [`widget/panel-dock.ts`](./widget/panel-dock.md) - PanelDock 类
- [`types.ts`](./types.md) - 类型定义
- [`context.ts`](./context.md) - React Context
