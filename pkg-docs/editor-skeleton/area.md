# Area 模块文档

## 文件路径

`packages/editor-skeleton/src/area.ts`

## 功能概述

`Area` 类是编辑器骨架中的区域管理类，负责管理编辑器界面的各个布局区域（如左侧、顶部、右侧、底部等）。每个区域可以包含多个 Widget 或 Panel，并支持显示/隐藏控制。

## 主要功能

### 1. 区域管理

- 管理特定区域的 Widget 集合
- 支持添加、删除 Widget
- 控制区域的可见性

### 2. 容器管理

- 使用 `WidgetContainer` 来管理区域内的所有 Widget
- 支持独占模式（exclusive），同一时间只能激活一个 Widget

### 3. 可见性控制

- 控制整个区域的显示/隐藏
- 在独占模式下，通过激活/取消激活 Widget 来控制可见性

## 类定义

```typescript
export class Area<C extends IPublicTypeWidgetBaseConfig = any, T extends IWidget = IWidget> 
  implements IArea<C, T>
```

### 泛型参数

- `C`: 配置类型，默认为 `IPublicTypeWidgetBaseConfig`
- `T`: Widget 类型，默认为 `IWidget`

## 属性

### `@obx private _visible = true`

区域的内部可见性状态。

### `@computed get visible()`

计算属性，返回区域的实际可见性。

- 在独占模式下，只有当有当前激活的 Widget 时才返回 `true`
- 在非独占模式下，返回 `_visible` 的值

### `get current()`

获取当前激活的 Widget。

- 在独占模式下，返回容器当前激活的 Widget
- 在非独占模式下，返回 `null`

### `readonly container: WidgetContainer<T, C>`

Widget 容器，用于管理区域内的所有 Widget。

### `readonly name: string`

区域名称，如 `'leftArea'`、`'topArea'` 等。

## 方法

### `constructor(readonly skeleton: ISkeleton, readonly name: string, handle: (item: T | C) => T, private exclusive?: boolean, defaultSetCurrent = false)`

构造函数，创建一个新的 Area 实例。

**参数:**
- `skeleton`: Skeleton 实例
- `name`: 区域名称
- `handle`: 处理函数，用于将配置转换为 Widget
- `exclusive`: 是否为独占模式，默认为 `false`
- `defaultSetCurrent`: 是否默认设置当前项，默认为 `false`

### `isEmpty(): boolean`

检查区域是否为空。

**返回值:** 如果区域内没有 Widget，返回 `true`，否则返回 `false`

### `add(config: T | C): T`

向区域添加一个 Widget。

**参数:**
- `config`: Widget 配置或 Widget 实例

**返回值:** 添加的 Widget 实例

**行为:**
- 如果已存在同名 Widget，发出警告并返回已存在的 Widget
- 否则，将配置转换为 Widget 并添加到容器中

### `remove(config: T | string): number`

从区域中移除一个 Widget。

**参数:**
- `config`: Widget 实例或 Widget 名称

**返回值:** 被移除 Widget 的索引，如果未找到则返回 `-1`

### `setVisible(flag: boolean): void`

设置区域的可见性。

**参数:**
- `flag`: 是否可见

**行为:**
- 在独占模式下：
  - 如果设置为可见且没有当前 Widget，激活上一个或第一个 Widget
  - 如果设置为不可见且有当前 Widget，取消激活当前 Widget
- 在非独占模式下，直接设置 `_visible` 属性

### `hide(): void`

隐藏区域。

### `show(): void`

显示区域。

### `removeAction(config: string): number`

**已废弃** - 使用 `remove` 方法代替。

## 使用示例

### 创建一个区域

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
  false, // 非独占模式
);
```

### 添加 Widget 到区域

```typescript
// 添加一个 Dock
leftArea.add({
  type: 'Dock',
  name: 'myDock',
  area: 'leftArea',
  props: {
    title: '我的工具',
  },
  content: MyDockComponent,
});
```

### 控制区域可见性

```typescript
// 显示区域
leftArea.show();

// 隐藏区域
leftArea.hide();

// 直接设置可见性
leftArea.setVisible(true);
```

### 检查区域状态

```typescript
// 检查是否为空
if (leftArea.isEmpty()) {
  console.log('左侧区域为空');
}

// 获取当前激活的 Widget（仅独占模式）
const currentWidget = leftArea.current;
```

## 独占模式 vs 非独占模式

### 独占模式 (exclusive = true)

- 同一时间只能有一个 Widget 处于激活状态
- 通过 `container.active()` 和 `container.unactive()` 来控制
- 适用于 Panel 区域，如 `leftFixedArea`、`leftFloatArea`、`rightArea`

### 非独占模式 (exclusive = false)

- 可以同时显示多个 Widget
- 通过 `setVisible()` 控制整个区域的可见性
- 适用于工具栏区域，如 `leftArea`、`topArea`、`toolbar`

## 与 Skeleton 的集成

Area 通常由 Skeleton 类创建和管理：

```typescript
class Skeleton {
  readonly leftArea: Area<DockConfig | PanelDockConfig | DialogDockConfig>;
  readonly topArea: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig>;
  readonly leftFixedArea: Area<IPublicTypePanelConfig, Panel>;
  readonly rightArea: Area<IPublicTypePanelConfig, Panel>;
  
  constructor(readonly editor: IEditor) {
    this.leftArea = new Area(this, 'leftArea', (config) => {
      if (isWidget(config)) return config;
      return this.createWidget(config);
    }, false);
    
    this.leftFixedArea = new Area(this, 'leftFixedArea', (config) => {
      if (isPanel(config)) return config;
      return this.createPanel(config);
    }, true);
  }
}
```

## 注意事项

1. **独占模式的可见性**: 在独占模式下，区域的可见性由是否有激活的 Widget 决定，而不是 `_visible` 属性
2. **Widget 重复添加**: 尝试添加同名 Widget 时会发出警告并返回已存在的 Widget
3. **容器管理**: Area 通过 `WidgetContainer` 管理所有 Widget，不直接操作 Widget 数组
4. **响应式更新**: 使用 `@obx` 装饰器，使属性变化能够触发视图更新

## 相关文件

- [`skeleton.ts`](./skeleton.md) - Skeleton 核心类
- [`widget/widget-container.ts`](./widget/widget-container.md) - Widget 容器
- [`types.ts`](./types.md) - 类型定义
