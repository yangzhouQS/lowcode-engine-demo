# ComponentActions - 组件操作管理

## 功能概述

[`ComponentActions`](packages/designer/src/component-actions.ts:21) 是低代码引擎的组件操作管理器，负责管理组件的内置操作，如删除、复制、锁定、隐藏等。

## 主要功能

1. **内置组件操作**：提供删除、复制、锁定、解锁、隐藏等内置操作
2. **操作条件判断**：根据组件状态和配置判断操作是否可用
3. **元数据转换器管理**：管理组件元数据的转换器
4. **操作自定义**：支持添加、删除、修改内置组件操作
5. **元数据转换**：支持注册自定义的元数据转换器

## 类定义

```typescript
export class ComponentActions {
  private metadataTransducers: IPublicTypeMetadataTransducer[] = [];
  
  actions: IPublicTypeComponentAction[];
  
  constructor();
  
  removeBuiltinComponentAction(name: string): void;
  addBuiltinComponentAction(action: IPublicTypeComponentAction): void;
  modifyBuiltinComponentAction(actionName: string, handle: (action: IPublicTypeComponentAction) => void): void;
  
  registerMetadataTransducer(transducer: IPublicTypeMetadataTransducer, level = 100, id?: string): void;
  getRegisteredMetadataTransducers(): IPublicTypeMetadataTransducer[];
}
```

## 主要属性

### actions
组件操作列表，包含所有可用的组件操作。

类型：`IPublicTypeComponentAction[]`

### metadataTransducers
元数据转换器列表，用于转换组件元数据。

类型：`IPublicTypeMetadataTransducer[]`

## 内置组件操作

### remove - 删除操作
删除选中的组件。

```typescript
{
  name: 'remove',
  content: {
    icon: IconRemove,
    title: intlNode('remove'),
    action(node: IPublicModelNode) {
      node.remove();
    },
  },
  important: true,
}
```

### hide - 隐藏操作
隐藏模态框组件。

```typescript
{
  name: 'hide',
  content: {
    icon: IconHidden,
    title: intlNode('hide'),
    action(node: IPublicModelNode) {
      node.visible = false;
    },
  },
  condition: (node: IPublicModelNode) => {
    return node.componentMeta?.isModal;
  },
  important: true,
}
```

### copy - 复制操作
复制选中的组件。

```typescript
{
  name: 'copy',
  content: {
    icon: IconClone,
    title: intlNode('copy'),
    action(node: IPublicModelNode) {
      const { document: doc, parent, index } = node;
      if (parent) {
        const newNode = doc?.insertNode(parent, node, (index ?? 0) + 1, true);
        deduplicateRef(newNode);
        newNode?.select();
        // 处理磁贴布局
        const { isRGL, rglNode } = node?.getRGL();
        if (isRGL) {
          const layout: any = rglNode?.getPropValue('layout') || [];
          const curLayout = layout.filter((item: any) => item.i === node.getPropValue('fieldId'));
          if (curLayout && curLayout[0]) {
            layout.push({
              ...curLayout[0],
              i: newNode?.getPropValue('fieldId'),
            });
            rglNode?.setPropValue('layout', layout);
            setTimeout(() => newNode?.document?.project?.simulatorHost?.scrollToNode(newNode), 10);
          }
        }
      }
    },
  },
  important: true,
}
```

### lock - 锁定操作
锁定容器组件。

```typescript
{
  name: 'lock',
  content: {
    icon: IconLock,
    title: intlNode('lock'),
    action(node: IPublicModelNode) {
      node.lock();
    },
  },
  condition: (node: IPublicModelNode) => {
    return engineConfig.get('enableCanvasLock', false) && node.isContainerNode && !node.isLocked;
  },
  important: true,
}
```

### unlock - 解锁操作
解锁容器组件。

```typescript
{
  name: 'unlock',
  content: {
    icon: IconUnlock,
    title: intlNode('unlock'),
    action(node: IPublicModelNode) {
      node.lock(false);
    },
  },
  condition: (node: IPublicModelNode) => {
    return engineConfig.get('enableCanvasLock', false) && node.isContainerNode && node.isLocked;
  },
  important: true,
}
```

## 主要方法

### constructor()
构造函数，初始化组件操作管理器。

**功能：**
- 注册内置的元数据转换器
  - `legacyIssues`: 处理遗留问题（优先级 2）
  - `componentDefaults`: 处理组件默认值（优先级 100）

### removeBuiltinComponentAction(name: string): void
移除内置组件操作。

**参数：**
- `name`: 操作名称

**使用示例：**
```typescript
componentActions.removeBuiltinComponentAction('remove');
```

### addBuiltinComponentAction(action: IPublicTypeComponentAction): void
添加内置组件操作。

**参数：**
- `action`: 组件操作对象

**使用示例：**
```typescript
componentActions.addBuiltinComponentAction({
  name: 'customAction',
  content: {
    icon: CustomIcon,
    title: '自定义操作',
    action(node: IPublicModelNode) {
      // 自定义操作逻辑
    },
  },
  important: false,
});
```

### modifyBuiltinComponentAction(actionName: string, handle: (action: IPublicTypeComponentAction) => void): void
修改内置组件操作。

**参数：**
- `actionName`: 操作名称
- `handle`: 修改函数

**使用示例：**
```typescript
componentActions.modifyBuiltinComponentAction('remove', (action) => {
  action.content.action = (node) => {
    // 自定义删除逻辑
    console.log('Custom remove action');
  };
});
```

### registerMetadataTransducer(transducer: IPublicTypeMetadataTransducer, level = 100, id?: string): void
注册元数据转换器。

**参数：**
- `transducer`: 转换器函数
- `level`: 优先级（默认 100）
- `id`: 转换器 ID（可选）

**功能：**
- 设置转换器的优先级和 ID
- 根据优先级插入到转换器列表中
- 优先级越高，越先执行

**使用示例：**
```typescript
componentActions.registerMetadataTransducer((metadata) => {
  // 转换元数据
  return {
    ...metadata,
    // 修改后的元数据
  };
}, 50, 'custom-transducer');
```

### getRegisteredMetadataTransducers(): IPublicTypeMetadataTransducer[]
获取已注册的元数据转换器。

**返回值：** 元数据转换器列表

## 工具函数

### deduplicateRef(node: IPublicModelNode | null | undefined)
去重节点的 ref 属性。

**功能：**
- 递归遍历节点及其子节点
- 如果有 ref 属性，生成新的唯一值
- 格式：`{componentName.toLowerCase()}-{随机字符串}`

## 使用示例

### 获取可用操作

```typescript
const node = document.getNode('node_id');
const availableActions = node.componentMeta.availableActions;
console.log('Available actions:', availableActions);
```

### 执行组件操作

```typescript
// 删除节点
node.remove();

// 复制节点
const { document, parent, index } = node;
const newNode = document.insertNode(parent, node, (index ?? 0) + 1, true);
newNode.select();

// 锁定节点
node.lock();

// 解锁节点
node.lock(false);

// 隐藏节点
node.visible = false;
```

### 自定义组件操作

```typescript
// 添加自定义操作
designer.componentActions.addBuiltinComponentAction({
  name: 'export',
  content: {
    icon: ExportIcon,
    title: '导出',
    action(node: IPublicModelNode) {
      const schema = node.export();
      console.log('Export schema:', schema);
    },
  },
  important: false,
});

// 修改内置操作
designer.componentActions.modifyBuiltinComponentAction('remove', (action) => {
  action.content.action = (node) => {
    if (confirm('确定要删除此组件吗？')) {
      node.remove();
    }
  };
});

// 移除内置操作
designer.componentActions.removeBuiltinComponentAction('hide');
```

### 注册元数据转换器

```typescript
designer.componentActions.registerMetadataTransducer((metadata) => {
  // 添加默认属性
  if (!metadata.props) {
    metadata.props = [];
  }
  if (!metadata.props.find(p => p.name === 'className')) {
    metadata.props.push({
      name: 'className',
      title: '类名',
      setter: 'StringSetter',
    });
  }
  return metadata;
}, 50, 'add-default-props');
```

## 注意事项

1. **操作条件**：每个操作可以设置条件函数，控制操作是否显示
2. **重要操作**：标记为 `important: true` 的操作会优先显示
3. **操作执行**：操作函数中可以访问节点的所有方法和属性
4. **元数据转换**：转换器按照优先级从高到低依次执行
5. **ref 去重**：复制节点时需要去重 ref 属性，避免冲突
6. **磁贴布局**：复制磁贴布局节点时需要特殊处理 layout 属性
7. **国际化**：操作标题应该使用国际化函数

## 相关文件

- [`component-meta.ts`](./component-meta.md) - 组件元数据
- [`designer/designer.ts`](./designer/designer.md) - 设计器核心
- [`../icons/index.ts`](./icons/index.md) - 图标组件

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-utils`: 工具函数
