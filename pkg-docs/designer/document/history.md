# History - 历史记录管理

## 功能概述

[`History`](packages/designer/src/document/history.ts:30) 是低代码引擎的历史记录管理器，负责管理文档的撤销和重做操作。

## 主要功能

1. **撤销操作**：撤销上一次操作
2. **重做操作**：重做上一次撤销的操作
3. **记录操作**：记录操作到历史记录
4. **状态查询**：查询是否可以撤销或重做
5. **历史记录管理**：管理历史记录的存储和清理
6. **日志记录**：记录操作的日志信息

## 类定义

```typescript
export class History implements IHistory {
  readonly document: DocumentModel;
  readonly emitter: IEventBus = createModuleEventBus('History');
  
  @obx.ref private _log: IHistoryLog[] = [];
  @obx.ref private _cursor: number = -1;
  
  private session: IHistorySession | null = null;
  private saving = false;
  private applying = false;
  private _hotData: any = {};
  
  constructor(document: DocumentModel);
  
  get log(): IHistoryLog[];
  get cursor(): number;
  get isSavePoint(): boolean;
  get state(): number;
  
  record(func: () => void): void;
  savePoint(): void;
  checkState(): void;
  
  redo(): void;
  undo(): void;
  
  private applyLog(log: IHistoryLog, isRedo: boolean): void;
  private applyAction(action: IPublicTypeActionOptions, isRedo: boolean): void;
  private logAction(action: IPublicTypeActionOptions): void;
  private applySession(session: IHistorySession, isRedo: boolean): void;
  private logSession(session: IHistorySession): void;
  
  dispose(): void;
}
```

## 主要属性

### document
文档模型实例。

类型：`DocumentModel`

### emitter
事件总线，用于发送历史记录事件。

类型：`IEventBus`

### log
历史记录日志列表。

类型：`IHistoryLog[]`

### cursor
当前历史记录的游标位置。

类型：`number`

### isSavePoint
是否在保存点。

类型：`boolean`

### state
历史记录状态。

类型：`number`

## 主要方法

### record(func: () => void): void
记录操作到历史记录。

**参数：**
- `func`: 操作函数

**功能：**
1. 检查是否正在应用历史记录
2. 检查是否在保存状态
3. 创建会话
4. 执行操作函数
5. 记录会话到历史记录

**使用示例：**
```typescript
history.record(() => {
  // 执行操作
  node.remove();
});
```

### savePoint(): void
设置保存点。

**功能：**
1. 清空历史记录
2. 重置游标
3. 触发状态变化事件

**使用示例：**
```typescript
history.savePoint();
```

### checkState(): void
检查历史记录状态。

**功能：**
1. 检查是否在保存点
2. 触发状态变化事件

**使用示例：**
```typescript
history.checkState();
```

### redo(): void
重做上一次撤销的操作。

**功能：**
1. 检查是否可以重做
2. 获取当前游标位置的日志
3. 应用日志（重做）
4. 移动游标

**使用示例：**
```typescript
history.redo();
```

### undo(): void
撤销上一次操作。

**功能：**
1. 检查是否可以撤销
2. 获取当前游标位置的日志
3. 应用日志（撤销）
4. 移动游标

**使用示例：**
```typescript
history.undo();
```

## 内部方法

### private applyLog(log: IHistoryLog, isRedo: boolean): void
应用历史记录日志。

**参数：**
- `log`: 历史记录日志
- `isRedo`: 是否重做

**功能：**
1. 标记正在应用历史记录
2. 遍历日志中的所有操作
3. 应用每个操作
4. 清除标记

### private applyAction(action: IPublicTypeActionOptions, isRedo: boolean): void
应用操作。

**参数：**
- `action`: 操作对象
- `isRedo`: 是否重做

**功能：**
1. 根据操作类型执行不同的操作
2. 如果是重做，执行重做逻辑
3. 如果是撤销，执行撤销逻辑

### private logAction(action: IPublicTypeActionOptions): void
记录操作到历史记录。

**参数：**
- `action`: 操作对象

**功能：**
1. 检查是否在会话中
2. 如果在会话中，添加到会话
3. 否则，创建新的日志

### private applySession(session: IHistorySession, isRedo: boolean): void
应用会话。

**参数：**
- `session`: 会话对象
- `isRedo`: 是否重做

**功能：**
1. 标记正在应用历史记录
2. 遍历会话中的所有操作
3. 应用每个操作
4. 清除标记

### private logSession(session: IHistorySession): void
记录会话到历史记录。

**参数：**
- `session`: 会话对象

**功能：**
1. 清除当前游标之后的所有日志
2. 添加会话到日志
3. 移动游标

## 事件

### onStateChange
状态变化事件。

```typescript
history.onStateChange(() => {
  console.log('History state changed');
});
```

## 使用示例

### 记录操作

```typescript
// 记录单个操作
history.record(() => {
  node.remove();
});

// 记录多个操作
history.record(() => {
  node1.remove();
  node2.remove();
  node3.remove();
});
```

### 撤销和重做

```typescript
// 撤销操作
history.undo();

// 重做操作
history.redo();
```

### 保存点

```typescript
// 设置保存点
history.savePoint();

// 检查是否在保存点
if (history.isSavePoint) {
  console.log('At save point');
}
```

### 检查状态

```typescript
// 检查状态
history.checkState();

// 获取状态
const state = history.state;
console.log('History state:', state);
```

### 监听状态变化

```typescript
// 监听状态变化
history.onStateChange(() => {
  console.log('History state changed');
  console.log('Can undo:', history.cursor >= 0);
  console.log('Can redo:', history.cursor < history.log.length - 1);
});
```

### 获取历史记录

```typescript
// 获取历史记录日志
const logs = history.log;
console.log('History logs:', logs);

// 获取当前游标
const cursor = history.cursor;
console.log('Current cursor:', cursor);
```

## 注意事项

1. **记录操作**：所有需要撤销/重做的操作都必须在 record 函数中执行
2. **保存点**：保存点会清空历史记录，通常在保存文档时调用
3. **游标管理**：游标指向当前操作的位置，撤销时向前移动，重做时向后移动
4. **会话管理**：record 函数会创建会话，会话中的所有操作作为一个整体
5. **应用标记**：正在应用历史记录时，不会记录新的操作
6. **状态检查**：每次操作后应该调用 checkState 检查状态
7. **性能优化**：使用 @obx.ref 装饰器优化性能

## 相关文件

- [`document-model.ts`](./document-model.md) - 文档模型
- [`node/node.ts`](./node/node.md) - 节点类

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-editor-core`: 编辑器核心库
