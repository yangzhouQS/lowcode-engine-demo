# Selection - 选择管理

## 功能概述

[`Selection`](packages/designer/src/document/selection.ts:25) 是低代码引擎的选择管理器，负责管理文档中的节点选择状态。

## 主要功能

1. **单选管理**：管理单个节点的选择状态
2. **多选管理**：管理多个节点的选择状态
3. **选择事件**：处理选择变化事件
4. **选择清除**：清除所有选择
5. **选择状态查询**：查询节点是否被选中
6. **选择列表查询**：获取所有选中的节点

## 类定义

```typescript
export class Selection implements ISelection {
  readonly document: DocumentModel;
  readonly emitter: IEventBus = createModuleEventBus('Selection');
  
  @obx.shallow private _selected: string[] = [];
  
  constructor(document: DocumentModel);
  
  get selected(): string[];
  get length(): number;
  has(id: string): boolean;
  getTopNodes(includeRoot?: boolean): Node[];
  getNodes(): Node[];
  select(id: string): void;
  add(id: string): void;
  remove(id: string): void;
  clear(): void;
  dispose(): void;
  
  private emitSelectionChange(): void;
}
```

## 主要属性

### document
文档模型实例。

类型：`DocumentModel`

### emitter
事件总线，用于发送选择事件。

类型：`IEventBus`

### selected
选中的节点 ID 列表。

类型：`string[]`

### length
选中的节点数量。

类型：`number`

## 主要方法

### has(id: string): boolean
检查节点是否被选中。

**参数：**
- `id`: 节点 ID

**返回值：** 是否被选中

**使用示例：**
```typescript
const isSelected = selection.has('node_id');
if (isSelected) {
  console.log('Node is selected');
}
```

### getTopNodes(includeRoot?: boolean): Node[]
获取顶层选中的节点。

**参数：**
- `includeRoot`: 是否包含根节点（默认 false）

**返回值：** 节点列表

**功能：**
1. 获取所有选中的节点
2. 过滤出顶层节点（没有被其他选中节点包含的节点）
3. 如果不包含根节点，过滤掉根节点

**使用示例：**
```typescript
const topNodes = selection.getTopNodes();
console.log('Top selected nodes:', topNodes);
```

### getNodes(): Node[]
获取所有选中的节点。

**返回值：** 节点列表

**使用示例：**
```typescript
const nodes = selection.getNodes();
console.log('Selected nodes:', nodes);
```

### select(id: string): void
选择单个节点。

**参数：**
- `id`: 节点 ID

**功能：**
1. 清除所有选择
2. 添加指定节点到选择列表
3. 触发选择变化事件

**使用示例：**
```typescript
selection.select('node_id');
```

### add(id: string): void
添加节点到选择列表。

**参数：**
- `id`: 节点 ID

**功能：**
1. 检查节点是否已选中
2. 如果未选中，添加到选择列表
3. 触发选择变化事件

**使用示例：**
```typescript
// 多选
selection.select('node_id_1');
selection.add('node_id_2');
selection.add('node_id_3');
```

### remove(id: string): void
从选择列表中移除节点。

**参数：**
- `id`: 节点 ID

**功能：**
1. 检查节点是否被选中
2. 如果被选中，从选择列表中移除
3. 触发选择变化事件

**使用示例：**
```typescript
selection.remove('node_id');
```

### clear(): void
清除所有选择。

**功能：**
1. 清空选择列表
2. 触发选择变化事件

**使用示例：**
```typescript
selection.clear();
```

### dispose(): void
销毁选择管理器。

**功能：**
1. 清除所有选择
2. 清空事件总线

**使用示例：**
```typescript
selection.dispose();
```

## 事件

### onSelectionChange
选择变化事件。

```typescript
selection.onSelectionChange(() => {
  console.log('Selection changed');
});
```

## 使用示例

### 单选

```typescript
// 选择单个节点
selection.select('node_id');

// 检查是否选中
if (selection.has('node_id')) {
  console.log('Node is selected');
}

// 获取选中的节点
const nodes = selection.getNodes();
console.log('Selected nodes:', nodes);
```

### 多选

```typescript
// 多选
selection.select('node_id_1');
selection.add('node_id_2');
selection.add('node_id_3');

// 获取选中的节点数量
console.log('Selected count:', selection.length);

// 获取顶层选中的节点
const topNodes = selection.getTopNodes();
console.log('Top selected nodes:', topNodes);
```

### 清除选择

```typescript
// 清除单个节点
selection.remove('node_id');

// 清除所有选择
selection.clear();
```

### 监听选择变化

```typescript
// 监听选择变化
selection.onSelectionChange(() => {
  const nodes = selection.getNodes();
  console.log('Selection changed:', nodes);
});

// 监听选择变化（带节点列表）
selection.onSelectionChange((nodes) => {
  console.log('Selection changed:', nodes);
});
```

### 过滤选择

```typescript
// 获取顶层选中的节点（不包含根节点）
const topNodes = selection.getTopNodes(false);

// 获取顶层选中的节点（包含根节点）
const topNodesWithRoot = selection.getTopNodes(true);
```

## 注意事项

1. **选择唯一性**：同一个节点只能被选中一次
2. **选择顺序**：选择列表的顺序与添加顺序一致
3. **顶层节点**：getTopNodes 返回的节点不包含在其他选中节点中的节点
4. **根节点**：默认情况下，getTopNodes 不包含根节点
5. **事件触发**：每次选择变化都会触发事件
6. **性能优化**：使用 @obx.shallow 装饰器优化性能

## 相关文件

- [`document-model.ts`](./document-model.md) - 文档模型
- [`node/node.ts`](./node/node.md) - 节点类

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-editor-core`: 编辑器核心库
