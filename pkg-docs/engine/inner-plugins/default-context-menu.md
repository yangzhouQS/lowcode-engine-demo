# Default Context Menu 插件文档

## 文件路径

`packages/engine/src/inner-plugins/default-context-menu.ts`

## 功能概述

`default-context-menu` 是默认的右键菜单插件，提供了一系列常用的右键菜单操作，包括选择组件、复制、粘贴、删除等功能。

## 主要功能

### 1. 选择组件

- 显示组件树
- 仅在选中单个节点时可用

### 2. 复制粘贴

- 复制选中节点到剪贴板
- 粘贴剪贴板内容到指定位置
- 支持复制并粘贴（复制后立即粘贴）

### 3. 粘贴到底部

- 粘贴剪贴板内容到目标节点下方
- 检查嵌套规则
- 显示错误提示

### 4. 粘贴到内部

- 粘贴剪贴板内容到目标节点内部
- 仅在目标节点是容器节点时可用
- 检查嵌套规则

### 5. 删除

- 删除选中的节点
- 检查节点是否可删除

## 工具函数

### `getNodesSchema(nodes: IPublicModelNode[]): { type: string; componentsMap: any; componentsTree: any }`

获取节点的 Schema 数据。

**参数:**
- `nodes`: 节点数组

**返回值:** 包含类型、组件映射和组件树的对象

**行为:**
- 导出每个节点的 Schema
- 返回剪贴板数据格式

### `getClipboardText(): Promise<IPublicTypeNodeSchema[]>`

从剪贴板读取文本。

**返回值:** Promise，解析为节点 Schema 数组

**行为:**
- 使用 Clipboard API 读取剪贴板内容
- 解析 JSON 数据
- 验证是否是有效的项目 Schema
- 如果无效，显示错误提示

## 菜单项

### 选择组件

```typescript
material.addContextMenuOption({
  name: 'selectComponent',
  title: intl('SelectComponents'),
  condition: (nodes = []) => {
    return nodes.length === 1;
  },
  items: [
    {
      name: 'nodeTree',
      type: IPublicEnumContextMenuType.NODE_TREE,
    },
  ],
});
```

### 复制并粘贴

```typescript
material.addContextMenuOption({
  name: 'copyAndPaste',
  title: intl('CopyAndPaste'),
  disabled: (nodes = []) => {
    return nodes?.filter((node) => !node?.canPerformAction('copy')).length > 0;
  },
  condition: (nodes) => {
    return nodes?.length === 1;
  },
  action(nodes) {
    const node = nodes?.[0];
    if (!node) {
      return;
    }
    const { document: doc, parent, index } = node;
    const data = getNodesSchema(nodes);
    clipboard.setData(data);

    if (parent) {
      const newNode = doc?.insertNode(parent, node, (index ?? 0) + 1, true);
      newNode?.select();
    }
  },
});
```

### 复制

```typescript
material.addContextMenuOption({
  name: 'copy',
  title: intl('Copy'),
  disabled: (nodes = []) => {
    return nodes?.filter((node) => !node?.canPerformAction('copy')).length > 0;
  },
  condition(nodes = []) {
    return nodes?.length > 0;
  },
  action(nodes) {
    if (!nodes || nodes.length < 1) {
      return;
    }

    const data = getNodesSchema(nodes);
    clipboard.setData(data);
  },
});
```

### 粘贴到底部

```typescript
material.addContextMenuOption({
  name: 'pasteToBottom',
  title: intl('PasteToTheBottom'),
  condition: (nodes) => {
    return nodes?.length === 1;
  },
  async action(nodes) {
    if (!nodes || nodes.length < 1) {
      return;
    }

    const node = nodes[0];
    const { document: doc, parent, index } = node;

    try {
      const nodeSchema = await getClipboardText();
      if (nodeSchema.length === 0) {
        return;
      }
      if (parent) {
        let canAddNodes = nodeSchema.filter((nodeSchema: IPublicTypeNodeSchema) => {
          const dragNodeObject: IPublicTypeDragNodeDataObject = {
            type: IPublicEnumDragObjectType.NodeData,
            data: nodeSchema,
          };
          return doc?.checkNesting(parent, dragNodeObject);
        });
        if (canAddNodes.length === 0) {
          Message.error(`${nodeSchema.map(d => utilsIntl(d.title || d.componentName)).join(',')}等组件无法放置到${utilsIntl(parent.title || parent.componentName as any)}内`);
          return;
        }
        const nodes: IPublicModelNode[] = [];
        canAddNodes.forEach((schema, schemaIndex) => {
          const node = doc?.insertNode(parent, schema, (index ?? 0) + 1 + schemaIndex, true);
          node && nodes.push(node);
        });
        doc?.selection.selectAll(nodes.map((node) => node?.id));
      }
    } catch (error) {
      console.error(error);
    }
  },
});
```

### 粘贴到内部

```typescript
material.addContextMenuOption({
  name: 'pasteToInner',
  title: intl('PasteToTheInside'),
  condition: (nodes) => {
    return nodes?.length === 1;
  },
  disabled: (nodes = []) => {
    const node = nodes?.[0];
    return !node.isContainerNode;
  },
  async action(nodes) {
    const node = nodes?.[0];
    if (!node) {
      return;
    }
    const { document: doc } = node;

    try {
      const nodeSchema = await getClipboardText();
      const index = node.children?.size || 0;
      if (nodeSchema.length === 0) {
        return;
      }
      let canAddNodes = nodeSchema.filter((nodeSchema: IPublicTypeNodeSchema) => {
        const dragNodeObject: IPublicTypeDragNodeDataObject = {
          type: IPublicEnumDragObjectType.NodeData,
          data: nodeSchema,
        };
        return doc?.checkNesting(node, dragNodeObject);
      });
      if (canAddNodes.length === 0) {
        Message.error(`${nodeSchema.map(d => utilsIntl(d.title || d.componentName)).join(',')}等组件无法放置到${utilsIntl(node.title || node.componentName as any)}内`);
        return;
      }

      const nodes: IPublicModelNode[] = [];
      nodeSchema.forEach((schema, schemaIndex) => {
        const newNode = doc?.insertNode(node, schema, (index ?? 0) + 1 + schemaIndex, true);
        newNode && nodes.push(newNode);
      });
      doc?.selection.selectAll(nodes.map((node) => node?.id));
    } catch (error) {
      console.error(error);
    }
  },
});
```

### 删除

```typescript
material.addContextMenuOption({
  name: 'delete',
  title: intl('Delete'),
  disabled(nodes = []) {
    return nodes?.filter((node) => !node?.canPerformAction('remove')).length > 0;
  },
  condition(nodes = []) {
    return nodes.length > 0;
  },
  action(nodes) {
    nodes?.forEach((node) => {
      node.remove();
    });
  },
});
```

## 插件定义

```typescript
export const defaultContextMenu = (ctx: IPublicModelPluginContext) => {
  const { material, canvas, common } = ctx;
  const { clipboard } = canvas;
  const { intl: utilsIntl } = common.utils;

  return {
    init() {
      // 注册所有菜单项
    },
  };
};

defaultContextMenu.pluginName = '___default_context_menu___';
```

## 注意事项

1. **剪贴板 API**: 使用 Clipboard API 读取剪贴板内容
2. **嵌套检查**: 粘贴时会检查嵌套规则，确保节点可以放置
3. **错误提示**: 如果节点无法放置，会显示错误提示
4. **国际化**: 所有菜单项都支持国际化
5. **条件判断**: 每个菜单项都有条件判断，控制显示和禁用状态

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`builtin-hotkey.md`](./builtin-hotkey.md) - 内置快捷键
- [`component-meta-parser.md`](./component-meta-parser.md) - 组件元数据解析

## 外部依赖

- `@alilc/lowcode-types` - 提供类型定义
- `@alilc/lowcode-utils` - 提供工具函数
- `@alifd/next` - 提供 Message 组件

## 典型使用场景

1. **快速复制**: 右键菜单快速复制节点
2. **快速粘贴**: 右键菜单快速粘贴节点
3. **快速删除**: 右键菜单快速删除节点
4. **组件导航**: 右键菜单查看组件树
