# Types 模块文档

## 文件路径

`packages/editor-skeleton/src/types.ts`

## 功能概述

`types.ts` 文件定义了编辑器骨架中使用的各种配置类型和类型判断函数。这些类型用于描述 Widget、Dock、Panel 等组件的配置结构。

## 主要类型定义

### WidgetConfig

Widget 配置类型，用于描述一个基本的 Widget。

```typescript
export interface WidgetConfig extends IPublicTypeWidgetBaseConfig {
  type: 'Widget';
  props?: {
    align?: 'left' | 'right' | 'bottom' | 'center' | 'top';
    onInit?: (widget: IWidget) => void;
    title?: IPublicTypeTitleContent | null;
  };
  content?: string | ReactElement | ComponentType<any>;
}
```

**属性说明:**
- `type`: 固定为 `'Widget'`
- `props.align`: 对齐方式，可选值：`'left'`、`'right'`、`'bottom'`、`'center'`、`'top'`
- `props.onInit`: 初始化回调函数
- `props.title`: 标题
- `content`: Widget 内容，可以是字符串、React 元素或组件

### DockProps

Dock 属性类型，继承自 `IPublicTypePanelDockProps`。

```typescript
export interface DockProps extends IPublicTypePanelDockProps {
}
```

### DividerConfig

分割线配置类型。

```typescript
export interface DividerConfig extends IPublicTypeWidgetBaseConfig {
  type: 'Divider';
  props?: {
    align?: 'left' | 'right' | 'center';
  };
}
```

**属性说明:**
- `type`: 固定为 `'Divider'`
- `props.align`: 对齐方式，可选值：`'left'`、`'right'`、`'center'`

### IDockBaseConfig

Dock 基础配置类型。

```typescript
export interface IDockBaseConfig extends IPublicTypeWidgetBaseConfig {
  props?: DockProps & {
    align?: 'left' | 'right' | 'bottom' | 'center' | 'top';
    onInit?: (widget: IWidget) => void;
  };
}
```

### DockConfig

Dock 配置类型。

```typescript
export interface DockConfig extends IDockBaseConfig {
  type: 'Dock';
  content?: string | ReactElement | ComponentType<any>;
}
```

**属性说明:**
- `type`: 固定为 `'Dock'`
- `content`: Dock 内容，可以是字符串、React 元素或组件

### DialogDockConfig

DialogDock 配置类型，用于按钮弹窗扩展。

```typescript
export interface DialogDockConfig extends IDockBaseConfig {
  type: 'DialogDock';
  dialogProps?: {
    [key: string]: any;
    title?: IPublicTypeTitleContent;
  };
}
```

**属性说明:**
- `type`: 固定为 `'DialogDock'`
- `dialogProps`: 弹窗属性
- `dialogProps.title`: 弹窗标题

### PanelDockConfig

PanelDock 配置类型，用于控制 Panel 的 Dock。

```typescript
export interface PanelDockConfig extends IDockBaseConfig {
  type: 'PanelDock';
  panelName?: string;
  panelProps?: IPublicTypePanelConfigProps & {
    area?: IPublicTypeWidgetConfigArea;
  };
  content?: string | ReactElement | ComponentType<any> | IPublicTypePanelConfig[];
}
```

**属性说明:**
- `type`: 固定为 `'PanelDock'`
- `panelName`: 关联的 Panel 名称
- `panelProps`: Panel 属性
- `panelProps.area`: Panel 所在区域
- `content`: Dock 内容或 Panel 配置数组

## 类型判断函数

### isWidgetConfig(obj: any): obj is WidgetConfig

判断对象是否为 WidgetConfig。

```typescript
export function isWidgetConfig(obj: any): obj is WidgetConfig {
  return obj && obj.type === 'Widget';
}
```

### isDividerConfig(obj: any): obj is DividerConfig

判断对象是否为 DividerConfig。

```typescript
export function isDividerConfig(obj: any): obj is DividerConfig {
  return obj && obj.type === 'Divider';
}
```

### isDockConfig(obj: any): obj is DockConfig

判断对象是否为 DockConfig。

```typescript
export function isDockConfig(obj: any): obj is DockConfig {
  return obj && /Dock$/.test(obj.type);
}
```

**说明:** 匹配所有以 `'Dock'` 结尾的类型，包括 `'Dock'`、`'PanelDock'`、`'DialogDock'` 等。

### isDialogDockConfig(obj: any): obj is DialogDockConfig

判断对象是否为 DialogDockConfig。

```typescript
export function isDialogDockConfig(obj: any): obj is DialogDockConfig {
  return obj && obj.type === 'DialogDock';
}
```

### isPanelConfig(obj: any): obj is IPublicTypePanelConfig

判断对象是否为 PanelConfig。

```typescript
export function isPanelConfig(obj: any): obj is IPublicTypePanelConfig {
  return obj && obj.type === 'Panel';
}
```

### isPanelDockConfig(obj: any): obj is PanelDockConfig

判断对象是否为 PanelDockConfig。

```typescript
export function isPanelDockConfig(obj: any): obj is PanelDockConfig {
  return obj && obj.type === 'PanelDock';
}
```

## 使用示例

### 创建 Widget 配置

```typescript
const widgetConfig: WidgetConfig = {
  type: 'Widget',
  name: 'myWidget',
  area: 'mainArea',
  props: {
    align: 'center',
    title: '我的组件',
    onInit: (widget) => {
      console.log('Widget initialized:', widget.name);
    },
  },
  content: MyWidgetComponent,
};
```

### 创建 Dock 配置

```typescript
const dockConfig: DockConfig = {
  type: 'Dock',
  name: 'myDock',
  area: 'leftArea',
  props: {
    align: 'top',
    title: '我的工具',
  },
  content: MyDockComponent,
};
```

### 创建 PanelDock 配置

```typescript
const panelDockConfig: PanelDockConfig = {
  type: 'PanelDock',
  name: 'myPanelDock',
  area: 'leftArea',
  props: {
    align: 'top',
    title: '打开面板',
  },
  panelName: 'myPanel',
  panelProps: {
    title: '面板内容',
    area: 'leftFloatArea',
    width: 300,
  },
  content: MyPanelContent,
};
```

### 创建 Divider 配置

```typescript
const dividerConfig: DividerConfig = {
  type: 'Divider',
  name: 'divider1',
  props: {
    align: 'center',
  },
};
```

### 使用类型判断函数

```typescript
import { isWidgetConfig, isDockConfig, isPanelDockConfig } from '@alilc/lowcode-editor-skeleton';

function processConfig(config: any) {
  if (isWidgetConfig(config)) {
    console.log('这是一个 Widget 配置');
    // 处理 Widget 配置
  } else if (isDockConfig(config)) {
    console.log('这是一个 Dock 配置');
    // 处理 Dock 配置
  } else if (isPanelDockConfig(config)) {
    console.log('这是一个 PanelDock 配置');
    // 处理 PanelDock 配置
  }
}
```

## 类型继承关系

```
IPublicTypeWidgetBaseConfig
├── WidgetConfig
├── DividerConfig
└── IDockBaseConfig
    ├── DockConfig
    ├── DialogDockConfig
    └── PanelDockConfig
```

## 与其他模块的集成

### 在 Skeleton 中使用

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

// 添加 Widget
skeleton.add({
  type: 'Widget',
  name: 'myWidget',
  content: MyWidgetComponent,
});

// 添加 Dock
skeleton.add({
  type: 'Dock',
  name: 'myDock',
  content: MyDockComponent,
});

// 添加 PanelDock
skeleton.add({
  type: 'PanelDock',
  name: 'myPanelDock',
  panelProps: {
    title: '我的面板',
  },
  content: MyPanelContent,
});
```

### 在 Area 中使用

```typescript
import { Area } from '@alilc/lowcode-editor-skeleton';

const leftArea = new Area(
  skeleton,
  'leftArea',
  (config) => {
    if (isWidget(config)) {
      return config;
    }
    return skeleton.createWidget(config);
  },
  false,
);

// 添加 Dock
leftArea.add({
  type: 'Dock',
  name: 'myDock',
  content: MyDockComponent,
});
```

## 注意事项

1. **类型安全**: 使用 TypeScript 类型判断函数可以在运行时确保类型安全
2. **类型匹配**: `isDockConfig` 使用正则表达式匹配，会匹配所有以 `'Dock'` 结尾的类型
3. **配置验证**: 在使用配置前，建议使用类型判断函数进行验证
4. **属性继承**: 所有配置类型都继承自 `IPublicTypeWidgetBaseConfig`，包含基础属性

## 相关文件

- [`skeleton.ts`](./skeleton.md) - Skeleton 核心类
- [`widget/widget.ts`](./widget/widget.md) - Widget 类
- [`widget/dock.ts`](./widget/dock.md) - Dock 类
- [`widget/panel-dock.ts`](./widget/panel-dock.md) - PanelDock 类
- [`area.ts`](./area.md) - 区域管理类

## 外部类型引用

本文件引用了以下外部类型：

- `IPublicTypeWidgetBaseConfig` - 基础 Widget 配置类型
- `IPublicTypeWidgetConfigArea` - Widget 配置区域类型
- `IPublicTypePanelDockProps` - PanelDock 属性类型
- `IPublicTypePanelConfigProps` - Panel 配置属性类型
- `IPublicTypePanelConfig` - Panel 配置类型
- `IPublicTypeTitleContent` - 标题内容类型
- `IPublicTypeIconType` - 图标类型

这些类型定义在 `@alilc/lowcode-types` 包中。
