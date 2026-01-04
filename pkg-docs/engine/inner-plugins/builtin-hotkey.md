# Builtin Hotkey 插件文档

## 文件路径

`packages/engine/src/inner-plugins/builtin-hotkey.ts`

## 功能概述

`builtin-hotkey` 是内置的快捷键插件，提供了一系列常用的快捷键操作，包括删除、复制、粘贴、撤销、重做、节点选择和移动等功能。

## 主要功能

### 1. 删除操作

- Backspace/Delete 键删除选中节点
- 检查节点是否可删除
- 清空选择

### 2. 复制粘贴操作

- Ctrl/Cmd + C 复制选中节点
- Ctrl/Cmd + X 剪切选中节点
- Ctrl/Cmd + V 粘贴节点
- 支持剪贴板数据管理

### 3. 撤销重做操作

- Ctrl/Cmd + Z 撤销
- Ctrl/Cmd + Y 或 Ctrl/Cmd + Shift + Z 重做
- 保持选择状态

### 4. 节点选择

- 左右方向键选择兄弟节点
- 上下方向键选择父子节点
- 支持深度优先遍历

### 5. 节点移动

- Option + 左右方向键移动节点到兄弟位置
- Option + 上下方向键移动节点到父子位置
- 检查嵌套规则

## 工具函数

### `insertChild(container: IPublicModelNode, originalChild: IPublicModelNode | IPublicTypeNodeData, at?: number | null): IPublicModelNode | null`

插入子节点到容器。

**参数:**
- `container`: 容器节点
- `originalChild`: 要插入的子节点
- `at`: 插入位置（可选）

**返回值:** 插入的节点或 null

**行为:**
- 如果子节点是插槽节点，导出其 schema
- 如果子节点是 Node 实例，直接插入
- 如果子节点是数据，创建节点后插入

### `insertChildren(container: IPublicModelNode, nodes: IPublicModelNode[] | IPublicTypeNodeData[], at?: number | null): IPublicModelNode[]`

批量插入子节点。

**参数:**
- `container`: 容器节点
- `nodes`: 要插入的节点数组
- `at`: 插入位置（可选）

**返回值:** 插入的节点数组

### `getSuitableInsertion(pluginContext: IPublicModelPluginContext, insertNode?: IPublicModelNode | IPublicTypeNodeSchema | IPublicTypeNodeSchema[]): { target: IPublicModelNode; index?: number } | null`

获得合适的插入位置。

**参数:**
- `pluginContext`: 插件上下文
- `insertNode`: 要插入的节点

**返回值:** 包含目标节点和索引的对象或 null

**行为:**
- 如果插入的是模态框组件，插入到根节点
- 否则根据焦点节点和选择节点确定插入位置
- 检查嵌套规则

### `getNextForSelect(next: IPublicModelNode | null, head?: any, parent?: IPublicModelNode | null): any`

获取下一个可选择的节点。

**参数:**
- `next`: 下一个节点
- `head`: 是否是头部（可选）
- `parent`: 父节点（可选）

**返回值:** 下一个可选择的节点

**行为:**
- 如果节点是容器节点，返回第一个子节点
- 否则返回下一个兄弟节点
- 如果没有下一个兄弟节点，递归查找父节点的下一个兄弟节点

### `getPrevForSelect(prev: IPublicModelNode | null, head?: any, parent?: IPublicModelNode | null): any`

获取上一个可选择的节点。

**参数:**
- `prev`: 上一个节点
- `head`: 是否是头部（可选）
- `parent`: 父节点（可选）

**返回值:** 上一个可选择的节点

**行为:**
- 如果节点是容器节点，返回最后一个子节点
- 否则返回上一个兄弟节点
- 如果没有上一个兄弟节点，返回父节点

### `getSuitablePlaceForNode(targetNode: IPublicModelNode, node: IPublicModelNode, ref: any): any`

获得节点合适的放置位置。

**参数:**
- `targetNode`: 目标节点
- `node`: 要放置的节点
- `ref`: 引用位置

**返回值:** 包含容器和引用的对象或 null

**行为:**
- 如果节点是模态框，返回焦点节点作为容器
- 检查嵌套规则
- 递归查找合适的容器

## 快捷键绑定

### 删除操作

```typescript
hotkey.bind(['backspace', 'del'], (e: KeyboardEvent, action) => {
  logger.info(`action ${action} is triggered`);

  if (canvas.isInLiveEditing) {
    return;
  }
  const doc = project.currentDocument;
  if (isFormEvent(e) || !doc) {
    return;
  }
  e.preventDefault();

  const sel = doc.selection;
  const topItems = sel.getTopNodes();
  topItems.forEach((node) => {
    if (node?.canPerformAction('remove')) {
      node && doc.removeNode(node);
    }
  });
  sel.clear();
});
```

### 复制粘贴操作

```typescript
// 复制
hotkey.bind(['command+c', 'ctrl+c', 'command+x', 'ctrl+x'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const doc = project.currentDocument;
  if (isFormEvent(e) || !doc) {
    return;
  }
  const anchorValue = document.getSelection()?.anchorNode?.nodeValue;
  if (anchorValue && typeof anchorValue === 'string') {
    return;
  }
  e.preventDefault();

  let selected = doc.selection.getTopNodes(true);
  selected = selected.filter((node) => {
    return node?.canPerformAction('copy');
  });
  if (!selected || selected.length < 1) {
    return;
  }

  const componentsMap = {};
  const componentsTree = selected.map((item) => item?.exportSchema(IPublicEnumTransformStage.Clone));

  const data = { type: 'nodeSchema', componentsMap, componentsTree };

  clipboard.setData(data);

  const cutMode = action && action.indexOf('x') > 0;
  if (cutMode) {
    selected.forEach((node) => {
      const parentNode = node?.parent;
      parentNode?.select();
      node?.remove();
    });
  }
});

// 粘贴
hotkey.bind(['command+v', 'ctrl+v'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const doc = project?.currentDocument;
  if (isFormEvent(e) || !doc) {
    return;
  }
  clipboard.waitPasteData(e, ({ componentsTree }) => {
    if (componentsTree) {
      const { target, index } = getSuitableInsertion(ctx, componentsTree) || {};
      if (!target) {
        return;
      }
      let canAddComponentsTree = componentsTree.filter((node: IPublicModelNode) => {
        const dragNodeObject: IPublicTypeDragNodeObject = {
          type: IPublicEnumDragObjectType.Node,
          nodes: [node],
        };
        return doc.checkNesting(target, dragNodeObject);
      });
      if (canAddComponentsTree.length === 0) {
        return;
      }
      const nodes = insertChildren(target, canAddComponentsTree, index);
      if (nodes) {
        doc.selection.selectAll(nodes.map((o) => o.id));
        setTimeout(() => canvas.activeTracker?.track(nodes[0]), 10);
      }
    }
  });
});
```

### 撤销重做操作

```typescript
// 撤销
hotkey.bind(['command+z', 'ctrl+z'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const history = project.currentDocument?.history;
  if (isFormEvent(e) || !history) {
    return;
  }

  e.preventDefault();
  const selection = project.currentDocument?.selection;
  const curSelected = selection?.selected && Array.from(selection?.selected);
  history.back();
  selection?.selectAll(curSelected);
});

// 重做
hotkey.bind(['command+y', 'ctrl+y', 'command+shift+z'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const history = project.currentDocument?.history;
  if (isFormEvent(e) || !history) {
    return;
  }
  e.preventDefault();
  const selection = project.currentDocument?.selection;
  const curSelected = selection?.selected && Array.from(selection?.selected);
  history.forward();
  selection?.selectAll(curSelected);
});
```

### 节点选择

```typescript
// 兄弟节点选择
hotkey.bind(['left', 'right'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const doc = project.currentDocument;
  if (isFormEvent(e) || !doc) {
    return;
  }
  e.preventDefault();
  const selected = doc.selection.getTopNodes(true);
  if (!selected || selected.length < 1) {
    return;
  }
  const firstNode = selected[0];
  const silbing = action === 'left' ? firstNode?.prevSibling : firstNode?.nextSibling;
  silbing?.select();
});

// 父子节点选择
hotkey.bind(['up', 'down'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const doc = project.currentDocument;
  if (isFormEvent(e) || !doc) {
    return;
  }
  e.preventDefault();
  const selected = doc.selection.getTopNodes(true);
  if (!selected || selected.length < 1) {
    return;
  }
  const firstNode = selected[0];

  if (action === 'down') {
    const next = getNextForSelect(firstNode, true, firstNode?.parent);
    next?.select();
  } else if (action === 'up') {
    const prev = getPrevForSelect(firstNode, true, firstNode?.parent);
    prev?.select();
  }
});
```

### 节点移动

```typescript
// 兄弟节点间移动
hotkey.bind(['option+left', 'option+right'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const doc = project.currentDocument;
  if (isFormEvent(e) || !doc) {
    return;
  }
  e.preventDefault();
  const selected = doc.selection.getTopNodes(true);
  if (!selected || selected.length < 1) {
    return;
  }

  const firstNode = selected[0];
  const parent = firstNode?.parent;
  if (!parent) return;

  const isPrev = action && /(left)$/.test(action);

  const silbing = isPrev ? firstNode.prevSibling : firstNode.nextSibling;
  if (silbing) {
    if (isPrev) {
      parent.insertBefore(firstNode, silbing, true);
    } else {
      parent.insertAfter(firstNode, silbing, true);
    }
    firstNode?.select();
  }
});

// 父子节点间移动
hotkey.bind(['option+up'], (e, action) => {
  logger.info(`action ${action} is triggered`);
  if (canvas.isInLiveEditing) {
    return;
  }
  const doc = project.currentDocument;
  if (isFormEvent(e) || !doc) {
    return;
  }
  e.preventDefault();
  const selected = doc.selection.getTopNodes(true);
  if (!selected || selected.length < 1) {
    return;
  }

  const firstNode = selected[0];
  const parent = firstNode?.parent;
  if (!parent) {
    return;
  }

  const silbing = firstNode.prevSibling;
  if (silbing) {
    if (silbing.isContainerNode) {
      const place = getSuitablePlaceForNode(silbing, firstNode, null);
      silbing.insertAfter(firstNode, place.ref, true);
    } else {
      parent.insertBefore(firstNode, silbing, true);
    }
    firstNode?.select();
  } else {
    const place = getSuitablePlaceForNode(parent, firstNode, null);
    if (place) {
      const container = place.container.internalToShellNode();
      container.insertBefore(firstNode, place.ref);
      firstNode?.select();
    }
  }
});
```

## 插件定义

```typescript
export const builtinHotkey = (ctx: IPublicModelPluginContext) => {
  return {
    init() {
      // 注册所有快捷键
    },
  };
};

builtinHotkey.pluginName = '___builtin_hotkey___';
```

## 注意事项

1. **实时编辑**: 在实时编辑模式下，所有快捷键都会被禁用
2. **表单事件**: 在表单元素中，快捷键不会触发
3. **嵌套规则**: 节点移动和插入时会检查嵌套规则
4. **剪贴板**: 复制粘贴操作使用剪贴板 API
5. **模态框**: 模态框组件会特殊处理，插入到根节点
6. **选择状态**: 撤销重做操作会保持选择状态

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`component-meta-parser.md`](./component-meta-parser.md) - 组件元数据解析
- [`default-context-menu.md`](./default-context-menu.md) - 默认右键菜单

## 外部依赖

- `@alilc/lowcode-types` - 提供类型定义
- `@alilc/lowcode-utils` - 提供工具函数

## 典型使用场景

1. **快速删除**: 使用 Delete/Backspace 键快速删除节点
2. **复制粘贴**: 使用 Ctrl+C/V 快速复制粘贴节点
3. **撤销重做**: 使用 Ctrl+Z/Y 撤销重做操作
4. **节点导航**: 使用方向键快速选择节点
5. **节点调整**: 使用 Option+方向键快速调整节点位置
