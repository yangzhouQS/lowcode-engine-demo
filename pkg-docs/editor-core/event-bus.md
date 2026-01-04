```# Event Bus 模块文档

## 文件路径

`packages/editor-core/src/event-bus.ts`

## 功能概述

`EventBus` 类是编辑器的事件总线，基于 Node.js 的 `EventEmitter` 实现，提供了事件的发布、订阅、取消订阅等功能。它支持模块级事件总线，每个模块可以有自己独立的事件命名空间。

## 主要功能

### 1. 事件发布订阅

- 发布事件（`emit`）
- 订阅事件（`on`）
- 取消订阅（`off`）
- 添加监听器（`addListener`）
- 移除监听器（`removeListener`）

### 2. 模块级事件总线

- 支持模块级事件命名空间
- 每个模块可以创建独立的事件总线
- 自动在事件名前添加模块名称前缀

### 3. 日志集成

- 内置日志记录
- 调试模式支持
- 模块级日志

### 4. 最大监听器控制

- 支持设置最大监听器数量
- 防止内存泄漏

## 类定义

```typescript
export interface IEventBus extends IPublicApiEvent {
  removeListener(event: string | symbol, listener: (...args: any[]) => void): any;
  addListener(event: string | symbol, listener: (...args: any[]) => void): any;
  setMaxListeners(n: number): any;
  removeAllListeners(event?: string | symbol): any;
}

export class EventBus implements IEventBus {
  private readonly eventEmitter: EventEmitter;
  private readonly name?: string;
  readonly names = [];
  
  constructor(emitter: EventEmitter, name?: string)
}
```

## 属性

### `private readonly eventEmitter: EventEmitter`

Node.js EventEmitter 实例。

### `private readonly name?: string`

模块名称，用于创建模块级事件命名空间。

### `readonly names = []`

内部触发的事件名列表。

## 方法

### `constructor(emitter: EventEmitter, name?: string)`

构造函数，创建事件总线实例。

**参数:**
- `emitter`: EventEmitter 实例
- `name`: 模块名称（可选）

**行为:**
- 保存 EventEmitter 引用
- 保存模块名称

### `private getMsgPrefix(type: string): string`

获取事件消息前缀。

**参数:**
- `type`: 事件类型

**返回值:** 事件消息前缀

**逻辑:**
- 如果有模块名称，返回 `[${name}][event-${type}]`
- 否则返回 `[*][event-${type}]`

### `private getLogger(): Logger`

获取日志记录器。

**返回值:** Logger 实例

**逻辑:**
- 如果有模块名称，返回模块级日志记录器
- 否则返回全局日志记录器

### `on(event: string, listener: (...args: any[]) => void): () => void`

订阅事件。

**参数:**
- `event`: 事件名称
- `listener`: 事件回调函数

**返回值:** 取消订阅的函数

**行为:**
- 添加事件监听器
- 记录调试日志
- 返回取消订阅函数

### `prependListener(event: string, listener: (...args: any[]) => void): () => void`

在监听器列表开头添加事件监听器。

**参数:**
- `event`: 事件名称
- `listener`: 事件回调函数

**返回值:** 取消订阅的函数

**行为:**
- 在监听器列表开头添加监听器
- 记录调试日志
- 返回取消订阅函数

### `off(event: string, listener: (...args: any[]) => void`

取消订阅事件。

**参数:**
- `event`: 事件名称
- `listener`: 事件回调函数

**行为:**
- 移除事件监听器
- 记录调试日志

### `emit(event: string, ...args: any[]): void`

发布事件。

**参数:**
- `event`: 事件名称
- `args`: 事件参数

**行为:**
- 触发事件
- 记录调试日志

### `removeListener(event: string | symbol, listener: (...args: any[]) => any`

移除事件监听器。

**参数:**
- `event`: 事件名称或 symbol
- `listener`: 事件回调函数

**返回值:** 移除的结果

### `addListener(event: string | symbol, listener: (...args: any[]) => void`

添加事件监听器。

**参数:**
- `event`: 事件名称或 symbol
- `listener`: 事件回调函数

**返回值:** 添加的结果

### `setMaxListeners(n: number): any`

设置最大监听器数量。

**参数:**
- `n`: 最大监听器数量

**返回值:** 设置的结果

### `removeAllListeners(event?: string | symbol): any`

移除所有事件监听器。

**参数:**
- `event`: 可选，指定要移除的事件

**返回值:** 移除的结果

## 工具函数

### `createModuleEventBus(moduleName: string, maxListeners?: number): IEventBus`

创建模块级事件总线。

**参数:**
- `moduleName`: 模块名称
- `maxListeners`: 最大监听器数量（可选）

**返回值:** EventBus 实例

**行为:**
- 创建新的 EventEmitter 实例
- 如果指定了最大监听器数量，设置该值
- 返回新的 EventBus 实例

## 使用示例

### 创建事件总线

```typescript
import { EventBus, createModuleEventBus } from '@alilc/lowcode-editor-core';

// 创建全局事件总线
const globalEventBus = new EventBus(new EventEmitter());

// 创建模块级事件总线
const moduleEventBus = createModuleEventBus('myModule', 200);
```

### 订阅事件

```typescript
// 订阅事件
const unsubscribe = eventBus.on('my-event', (data) => {
  console.log('Event triggered:', data);
});

// 在监听器列表开头添加
const unsubscribe2 = eventBus.prependListener('my-event', (data) => {
  console.log('Prepend listener triggered:', data);
});
```

### 发布事件

```typescript
// 发布事件
eventBus.emit('my-event', { param1: 'value1', param2: 'value2' });
```

### 取消订阅

```typescript
// 取消订阅
unsubscribe();

// 使用 off 方法
eventBus.off('my-event', listener);
```

### 移除监听器

```typescript
// 移除特定监听器
eventBus.removeListener('my-event', listener);

// 移除所有监听器
eventBus.removeAllListeners('my-event');
```

### 设置最大监听器

```typescript
// 设置最大监听器数量
eventBus.setMaxListeners(100);
```

## 模块级事件

模块级事件总线会在事件名前添加模块名称前缀：

```typescript
// 全局事件：[*][event-my-event]
globalEventBus.emit('my-event', data);

// 模块级事件：[myModule][event-my-event]
moduleEventBus.emit('my-event', data);
```

## 日志输出

EventBus 会在操作时输出调试日志：

```
[myModule][event-on] my-event
[myModule][event-emit] name: my-event, args: [data]
```

## 注意事项

1. **事件命名空间**: 模块级事件总线会自动添加模块名称前缀
2. **最大监听器**: 默认 EventEmitter 最大监听器为 10，建议根据需要调整
3. **内存泄漏**: 记得在组件卸载时取消订阅
4. **Symbol 事件**: 支持使用 Symbol 作为事件名，避免命名冲突
5. **调试日志**: 日志级别为 'warn'，只输出警告和错误信息

## 相关文件

- [`editor.ts`](./editor.md) - Editor 核心类，使用 EventBus
- [`../utils/logger.ts`](../utils/logger.md) - 日志工具

## 外部依赖

- `events` - Node.js 事件模块
- `@alilc/lowcode-types` - 提供类型定义
- `@alilc/lowcode-utils` - 提供日志工具

## 典型使用场景

1. **插件通信**: 不同插件之间通过事件总线进行通信
2. **状态同步**: 当某个状态变化时，通过事件通知其他模块
3. **解耦设计**: 通过事件总线实现模块间的解耦
4. **模块级隔离**: 每个模块可以有独立的事件命名空间，避免事件冲突
