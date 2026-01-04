# ContextMenuActions - 右键菜单操作

## 功能概述

[`ContextMenuActions`](packages/designer/src/context-menu-actions.ts:19) 是低代码引擎的右键菜单操作管理器，负责管理右键菜单的操作项。

## 主要功能

1. **内置右键菜单操作**：提供复制、删除、锁定、隐藏等内置右键菜单操作
2. **操作条件判断**：根据组件状态和配置判断操作是否可用
3. **操作自定义**：支持添加、删除、修改内置右键菜单操作
4. **操作分组**：支持对操作进行分组

## 类定义

```typescript
export class ContextMenuActions {
  actions: IPublicTypeContextMenuItem[];
  
  constructor();
  
  removeBuiltinContextMenuItem(name: string): void;
  addBuiltinContextMenuItem(action: IPublicTypeContextMenuItem): void;
  modifyBuiltinContextMenuItem(actionName: string, handle: (action: IPublicTypeContextMenuItem) => void): void;
}
```

## 主要属性

### actions
右键菜单操作列表，包含所有可用的右键菜单操作。

类型：`IPublicTypeContextMenuItem[]`

## 内置右键菜单操作

### 复制操作
复制选中的组件。

```typescript
{
  name: 'copy',
  title: intlNode('copy'),
  condition(nodes) {
    return nodes.length === 1 && !nodes[0].isLocked();
  },
  action(nodes) {
    const node = nodes[0];
    const { document, parent, index } = node;
    if (parent) {
      const newNode = document?.insertNode(parent, node, (index ?? 0) + 1, true);
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
}
```

### 删除操作
删除选中的组件。

```typescript
{
  name: 'remove',
  title: intlNode('remove'),
  condition(nodes) {
    return nodes.length === 1 && !nodes[0].isLocked();
  },
  action(nodes) {
    nodes[0].remove();
  },
}
```

### 锁定操作
锁定容器组件。

```typescript
{
  name: 'lock',
  title: intlNode('lock'),
  condition(nodes) {
    return (
      nodes.length === 1 &&
      !nodes[0].isLocked() &&
      engineConfig.get('enableCanvasLock', false) &&
      nodes[0].isContainerNode
    );
  },
  action(nodes) {
    nodes[0].lock();
  },
}
```

### 解锁操作
解锁容器组件。

```typescript
{
  name: 'unlock',
  title: intlNode('unlock'),
  condition(nodes) {
    return (
      nodes.length === 1 &&
      nodes[0].isLocked() &&
      engineConfig.get('enableCanvasLock', false) &&
      nodes[0].isContainerNode
    );
  },
  action(nodes) {
    nodes[0].lock(false);
  },
}
```

### 隐藏操作
隐藏模态框组件。

```typescript
{
  name: 'hide',
  title: intlNode('hide'),
  condition(nodes) {
    return nodes.length === 1 && nodes[0].componentMeta?.isModal;
  },
  action(nodes) {
    nodes[0].visible = false;
  },
}
```

### 展示操作
展示模态框组件。

```typescript
{
  name: 'show',
  title: intlNode('show'),
  condition(nodes) {
    return nodes.length === 1 && nodes[0].componentMeta?.isModal;
  },
  action(nodes) {
    nodes[0].visible = true;
  },
}
```

## 主要方法

### constructor()
构造函数，初始化右键菜单操作管理器。

**功能：**
- 初始化内置右键菜单操作列表

### removeBuiltinContextMenuItem(name: string): void
移除内置右键菜单操作。

**参数：**
- `name`: 操作名称

**使用示例：**
```typescript
contextMenuActions.removeBuiltinContextMenuItem('remove');
```

### addBuiltinContextMenuItem(action: IPublicTypeContextMenuItem): void
添加内置右键菜单操作。

**参数：**
- `action`: 右键菜单操作对象

**使用示例：**
```typescript
contextMenuActions.addBuiltinContextMenuItem({
  name: 'export',
  title: '导出',
  condition(nodes) {
    return nodes.length === 1;
  },
  action(nodes) {
    const schema = nodes[0].export();
    console.log('Export schema:', schema);
  },
});
```

### modifyBuiltinContextMenuItem(actionName: string, handle: (action: IPublicTypeContextMenuItem) => void): void
修改内置右键菜单操作。

**参数：**
- `actionName`: 操作名称
- `handle`: 修改函数

**使用示例：**
```typescript
contextMenuActions.modifyBuiltinContextMenuItem('remove', (action) => {
  action.action = (nodes) => {
    if (confirm('确定要删除此组件吗？')) {
      nodes[0].remove();
    }
  };
});
```

## 工具函数

### deduplicateRef(node: IPublicModelNode | null | undefined)
去重节点的 ref 属性。

**功能：**
- 递归遍历节点及其子节点
- 如果有 ref 属性，生成新的唯一值
- 格式：`{componentName.toLowerCase()}-{随机字符串}`

## 类型定义

### IPublicTypeContextMenuItem
右键菜单操作项类型定义。

```typescript
export interface IPublicTypeContextMenuItem {
  name: string;
  title: string;
  condition?: (nodes: IPublicModelNode[]) => boolean;
  action: (nodes: IPublicModelNode[]) => void;
}
```

## 使用示例

### 获取可用操作

```typescript
const actions = designer.contextMenuActions.actions;
console.log('Available context menu actions:', actions);
```

### 添加自定义右键菜单操作

```typescript
// 添加导出操作
designer.contextMenuActions.addBuiltinContextMenuItem({
  name: 'export',
  title: '导出',
  condition(nodes) {
    return nodes.length === 1;
  },
  action(nodes) {
    const schema = nodes[0].export();
    const json = JSON.stringify(schema, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nodes[0].componentName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
});

// 添加复制 ID 操作
designer.contextMenuActions.addBuiltinContextMenuItem({
  name: 'copyId',
  title: '复制 ID',
  condition(nodes) {
    return nodes.length === 1;
  },
  action(nodes) {
    const id = nodes[0].id;
    navigator.clipboard.writeText(id);
    console.log('Copied ID:', id);
  },
});
```

### 修改内置右键菜单操作

```typescript
// 修改删除操作，添加确认对话框
designer.contextMenuActions.modifyBuiltinContextMenuItem('remove', (action) => {
  action.action = (nodes) => {
    const componentName = nodes[0].componentName;
    if (confirm(`确定要删除 ${componentName} 组件吗？`)) {
      nodes[0].remove();
    }
  };
});

// 修改复制操作，添加成功提示
designer.contextMenuActions.modifyBuiltinContextMenuItem('copy', (action) => {
  const originalAction = action.action;
  action.action = (nodes) => {
    originalAction(nodes);
    console.log('复制成功');
  };
});
```

### 移除内置右键菜单操作

```typescript
// 移除隐藏操作
designer.contextMenuActions.removeBuiltinContextMenuItem('hide');

// 移除展示操作
designer.contextMenuActions.removeBuiltinContextMenuItem('show');
```

### 条件判断

```typescript
// 只对特定组件显示操作
designer.contextMenuActions.addBuiltinContextMenuItem({
  name: 'specialAction',
  title: '特殊操作',
  condition(nodes) {
    // 只对 Button 组件显示
    return nodes.length === 1 && nodes[0].componentName === 'Button';
  },
  action(nodes) {
    console.log('Special action for Button');
  },
});

// 只对容器组件显示操作
designer.contextMenuActions.addBuiltinContextMenuItem({
  name: 'containerAction',
  title: '容器操作',
  condition(nodes) {
    return nodes.length === 1 && nodes[0].isContainerNode;
  },
  action(nodes) {
    console.log('Container action');
  },
});
```

## 注意事项

1. **操作条件**：每个操作可以设置条件函数，控制操作是否显示
2. **节点选择**：右键菜单操作可以访问选中的节点列表
3. **锁定检查**：删除和复制操作需要检查节点是否锁定
4. **容器检查**：锁定和解锁操作需要检查节点是否是容器
5. **模态框检查**：隐藏和展示操作需要检查节点是否是模态框
6. **ref 去重**：复制节点时需要去重 ref 属性，避免冲突
7. **磁贴布局**：复制磁贴布局节点时需要特殊处理 layout 属性
8. **国际化**：操作标题应该使用国际化函数

## 与组件操作的区别

### ComponentActions
- 用于组件面板中的组件操作
- 操作对象是单个节点
- 显示在组件面板中

### ContextMenuActions
- 用于右键菜单操作
- 操作对象是节点列表（支持多选）
- 显示在右键菜单中

## 相关文件

- [`component-actions.ts`](./component-actions.md) - 组件操作管理
- [`designer/designer.ts`](./designer/designer.md) - 设计器核心
- [`document/node/node.ts`](./document/node/node.md) - 节点类
- [`document/selection.ts`](./document/selection.md) - 选择管理

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-utils`: 工具函数
