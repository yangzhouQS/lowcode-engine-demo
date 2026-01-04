# WidgetContainer 模块文档

## 文件路径

`packages/editor-skeleton/src/widget/widget-container.ts`

## 功能概述

`WidgetContainer` 类是 Widget 的容器，负责管理一组 Widget 的集合。它提供了添加、删除、激活、取消激活等操作，并支持独占模式来控制同一时间只能有一个 Widget 处于激活状态。

## 主要功能

### 1. Widget 管理

- 添加 Widget 到容器
- 从容器中移除 Widget
- 根据名称或索引获取 Widget
- 检查 Widget 是否存在

### 2. 激活管理

- 支持激活 Widget
- 支持取消激活 Widget
- 支持取消激活所有 Widget
- 支持独占模式（同一时间只能有一个激活的 Widget）

### 3. 可见性控制

- 支持自定义可见性检查函数
- 根据可见性动态显示/隐藏 Widget

### 4. 默认激活

- 支持默认激活第一个 Widget
- 支持跳过初始隐藏的 Widget

## 接口定义

```typescript
export interface WidgetItem {
  name: string;
}

export interface Activeable {
  setActive(flag: boolean): void;
}
```

## 类定义

```typescript
export class WidgetContainer<T extends WidgetItem = any, G extends WidgetItem = any> {
  constructor(
    readonly name: string,
    private handle: (item: T | G) => T,
    private exclusive: boolean = false,
    private checkVisible: () => boolean = () => true,
    private defaultSetCurrent: boolean = false,
  )
}
```

## 泛型参数

- `T`: Widget 类型，默认为 `any`
- `G`: 配置类型，默认为 `any`

## 属性

### `@obx.shallow items: T[]`

Widget 数组，使用 `@obx.shallow` 装饰器实现浅层响应式。

### `private maps: { [name: string]: T }`

Widget 名称到 Widget 实例的映射表。

### `@obx.ref private _current: T & Activeable | null`

当前激活的 Widget。

### `get current()`

获取当前激活的 Widget。

**返回值:** 当前激活的 Widget，如果没有则返回 `null`

### `@computed get visible()`

计算属性，返回容器的可见性。

**返回值:** 通过 `checkVisible` 函数检查的结果

## 方法

### `constructor(readonly name: string, private handle: (item: T | G) => T, private exclusive: boolean = false, private checkVisible: () => boolean = () => true, private defaultSetCurrent: boolean = false)`

构造函数，创建 WidgetContainer 实例。

**参数:**
- `name`: 容器名称
- `handle`: 处理函数，用于将配置转换为 Widget
- `exclusive`: 是否为独占模式，默认为 `false`
- `checkVisible`: 可见性检查函数，默认为始终返回 `true`
- `defaultSetCurrent`: 是否默认设置当前项，默认为 `false`

### `active(nameOrItem?: T | string | null): void`

激活一个 Widget。

**参数:**
- `nameOrItem`: Widget 实例或 Widget 名称

**行为:**
- 如果传入字符串，通过名称获取 Widget
- 检查 Widget 是否可激活（有 `setActive` 方法）
- 在独占模式下：
  - 如果与当前 Widget 相同，不执行操作
  - 如果有当前 Widget，先取消激活
  - 设置新的当前 Widget
- 激活指定的 Widget

### `unactive(nameOrItem?: T | string | null): void`

取消激活一个 Widget。

**参数:**
- `nameOrItem`: Widget 实例或 Widget 名称

**行为:**
- 如果传入字符串，通过名称获取 Widget
- 检查 Widget 是否可激活
- 如果 Widget 是当前 Widget，清空当前 Widget
- 取消激活指定的 Widget

### `unactiveAll(): void`

取消激活所有 Widget。

**行为:**
- 遍历所有 Widget，逐个取消激活

### `add(item: T | G): T`

添加一个 Widget 到容器。

**参数:**
- `item`: Widget 实例或配置

**返回值:** 添加的 Widget 实例

**行为:**
- 通过 `handle` 函数将配置转换为 Widget
- 如果已存在同名 Widget，替换它
- 否则，添加到数组末尾
- 更新映射表
- 如果 Widget 是 Panel，设置其父容器
- 如果启用了 `defaultSetCurrent` 且没有当前 Widget，激活新 Widget

### `get(name: string): T | null`

根据名称获取 Widget。

**参数:**
- `name`: Widget 名称

**返回值:** Widget 实例，如果不存在则返回 `null`

### `getAt(index: number): T | null`

根据索引获取 Widget。

**参数:**
- `index`: Widget 索引

**返回值:** Widget 实例，如果索引越界则返回 `null`

### `has(name: string): boolean`

检查是否存在指定名称的 Widget。

**参数:**
- `name`: Widget 名称

**返回值:** 如果存在则返回 `true`，否则返回 `false`

### `indexOf(item: T): number`

获取 Widget 的索引。

**参数:**
- `item`: Widget 实例

**返回值:** Widget 的索引，如果不存在则返回 `-1`

### `remove(item: string | T): number`

从容器中移除一个 Widget。

**参数:**
- `item`: Widget 实例或 Widget 名称

**返回值:** 被移除 Widget 的索引，如果未找到则返回 `-1`

**行为:**
- 根据参数获取 Widget 实例
- 从数组中移除 Widget
- 从映射表中删除 Widget
- 如果 Widget 是当前 Widget，清空当前 Widget

## 工具函数

### `isActiveable(obj: any): obj is Activeable`

判断对象是否具有可激活的能力。

```typescript
function isActiveable(obj: any): obj is Activeable {
  return obj && obj.setActive;
}
```

## 使用示例

### 创建容器

```typescript
import { WidgetContainer } from '@alilc/lowcode-editor-skeleton';

// 创建非独占模式容器
const container = new WidgetContainer(
  'myContainer',
  (config) => {
    // 处理配置，转换为 Widget
    return createWidget(config);
  },
  false, // 非独占模式
  () => true, // 始终可见
  false, // 不默认激活
);

// 创建独占模式容器
const exclusiveContainer = new WidgetContainer(
  'exclusiveContainer',
  (config) => {
    return createWidget(config);
  },
  true, // 独占模式
  () => true,
  true, // 默认激活第一个
);
```

### 添加 Widget

```typescript
// 添加 Widget
const widget1 = container.add({
  name: 'widget1',
  type: 'Widget',
  content: Widget1Component,
});

const widget2 = container.add({
  name: 'widget2',
  type: 'Widget',
  content: Widget2Component,
});
```

### 激活 Widget

```typescript
// 通过名称激活
container.active('widget1');

// 通过实例激活
container.active(widget1);

// 取消激活
container.unactive('widget1');

// 取消激活所有
container.unactiveAll();
```

### 获取 Widget

```typescript
// 通过名称获取
const widget = container.get('widget1');

// 通过索引获取
const widget = container.getAt(0);

// 检查是否存在
if (container.has('widget1')) {
  console.log('Widget exists');
}

// 获取索引
const index = container.indexOf(widget1);
console.log('Widget index:', index);
```

### 移除 Widget

```typescript
// 通过名称移除
const index = container.remove('widget1');

// 通过实例移除
const index = container.remove(widget1);

console.log('Removed widget at index:', index);
```

### 使用可见性检查

```typescript
const container = new WidgetContainer(
  'myContainer',
  (config) => createWidget(config),
  false,
  () => {
    // 自定义可见性检查
    return someCondition;
  },
  false,
);

// 检查容器是否可见
if (container.visible) {
  console.log('Container is visible');
}
```

### 独占模式示例

```typescript
const exclusiveContainer = new WidgetContainer(
  'exclusiveContainer',
  (config) => createWidget(config),
  true, // 独占模式
);

// 添加多个 Widget
exclusiveContainer.add({ name: 'widget1', type: 'Widget', content: Widget1 });
exclusiveContainer.add({ name: 'widget2', type: 'Widget', content: Widget2 });
exclusiveContainer.add({ name: 'widget3', type: 'Widget', content: Widget3 });

// 激活 widget1
exclusiveContainer.active('widget1');
console.log('Current:', exclusiveContainer.current?.name); // 'widget1'

// 激活 widget2（会自动取消 widget1 的激活）
exclusiveContainer.active('widget2');
console.log('Current:', exclusiveContainer.current?.name); // 'widget2'
console.log('widget1 active:', widget1.actived); // false
```

## 独占模式 vs 非独占模式

### 独占模式 (exclusive = true)

- 同一时间只能有一个 Widget 处于激活状态
- 激活新 Widget 时自动取消旧 Widget 的激活
- 适用于 Panel 区域

**激活逻辑:**
```typescript
active(nameOrItem?: T | string | null) {
  let item: any = nameOrItem;
  if (nameOrItem && typeof nameOrItem === 'string') {
    item = this.get(nameOrItem);
  }
  if (!isActiveable(item)) {
    item = null;
  }

  if (this.exclusive) {
    if (this._current === item) {
      return;
    }
    if (this._current) {
      this._current.setActive(false);
    }
    this._current = item;
  }

  if (item) {
    item.setActive(true);
  }
}
```

### 非独占模式 (exclusive = false)

- 可以同时激活多个 Widget
- 激活新 Widget 不会影响其他 Widget
- 适用于工具栏区域

**激活逻辑:**
```typescript
active(nameOrItem?: T | string | null) {
  let item: any = nameOrItem;
  if (nameOrItem && typeof nameOrItem === 'string') {
    item = this.get(nameOrItem);
  }
  if (!isActiveable(item)) {
    item = null;
  }

  if (this.exclusive) {
    // 独占模式逻辑
  }

  if (item) {
    item.setActive(true);
  }
}
```

## 默认激活机制

当启用 `defaultSetCurrent` 时，容器会自动激活第一个 Widget：

```typescript
add(item: T | G): T {
  item = this.handle(item);
  const origin = this.get(item.name);
  if (origin === item) {
    return origin;
  }
  const i = origin ? this.items.indexOf(origin) : -1;
  if (i > -1) {
    this.items[i] = item;
  } else {
    this.items.push(item);
  }
  this.maps[item.name] = item;
  if (isPanel(item)) {
    item.setParent(this);
  }
  if (this.defaultSetCurrent) {
    const shouldHiddenWhenInit = (item as any).config?.props?.hiddenWhenInit;
    if (!this._current && !shouldHiddenWhenInit) {
      this.active(item);
    }
  }
  return item;
}
```

**特点:**
- 只在添加第一个 Widget 时激活
- 可以通过 `props.hiddenWhenInit` 跳过激活

## 响应式更新

WidgetContainer 使用 `@obx` 装饰器实现响应式更新：

```typescript
@obx.shallow items: T[] = [];
@obx.ref private _current: T & Activeable | null = null;
@computed get visible() {
  return this.checkVisible();
}
```

当这些属性变化时，会自动触发相关组件的重新渲染。

## 与 Panel 的集成

WidgetContainer 与 Panel 紧密集成：

```typescript
if (isPanel(item)) {
  item.setParent(this);
}
```

当添加 Panel 到容器时，会自动设置其父容器。

## 注意事项

1. **名称唯一性**: 同一容器内的 Widget 名称必须唯一
2. **独占模式**: 在独占模式下，同一时间只能有一个激活的 Widget
3. **可见性检查**: `checkVisible` 函数应该返回布尔值
4. **响应式更新**: 使用 `@obx` 装饰器的属性会自动触发视图更新
5. **默认激活**: 只在添加第一个 Widget 时激活，后续添加不会自动激活

## 相关文件

- [`widget.ts`](./widget.md) - Widget 基类
- [`panel.ts`](./panel.md) - Panel 类
- [`area.ts`](../area.md) - 区域管理类
- [`skeleton.ts`](../skeleton.md) - Skeleton 核心类
