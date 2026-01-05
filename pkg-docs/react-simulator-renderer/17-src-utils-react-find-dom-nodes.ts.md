# src/utils/react-find-dom-nodes.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/utils/react-find-dom-nodes.ts`

## 功能概述

该文件提供了从 React 实例查找 DOM 节点的工具函数。通过遍历 React Fiber 树，找到对应的 DOM 节点。

## 主要功能

1. **获取 Fiber 节点**: 获取 React 实例的内部 Fiber 节点
2. **遍历 Fiber 树**: 遍历 Fiber 树查找 DOM 节点
3. **查找 DOM 节点**: 从 React 实例查找对应的 DOM 节点

## 代码分析

### 完整代码

```typescript
export function getReactInternalFiber(inst: any) {
  return inst._reactInternalFiber || inst._reactInternals || inst;
}

export function elementsFromFiber(fiber: any) {
  const elements: Element[] = [];
  let currentFiber = fiber;
  while (currentFiber) {
    if (currentFiber.stateNode instanceof Element) {
      elements.push(currentFiber.stateNode);
    }
    currentFiber = currentFiber.return;
  }
  return elements;
}

export function reactFindDOMNodes(inst: any) {
  const fiber = getReactInternalFiber(inst);
  return elementsFromFiber(fiber);
}
```

### 逐行解释

**getReactInternalFiber 函数（第 1-3 行）**:

```typescript
export function getReactInternalFiber(inst: any) {
  return inst._reactInternalFiber || inst._reactInternals || inst;
}
```
- 导出 `getReactInternalFiber` 函数
- 参数 `inst`: React 实例
- 尝试从不同的属性获取 Fiber 节点：
  - `_reactInternalFiber`: React 16+ 的内部属性
  - `_reactInternals`: 旧版本的内部属性
  - 如果都不存在，返回实例本身
- 返回 Fiber 节点或实例本身

**elementsFromFiber 函数（第 5-16 行）**:

```typescript
export function elementsFromFiber(fiber: any) {
  const elements: Element[] = [];
  let currentFiber = fiber;
  while (currentFiber) {
    if (currentFiber.stateNode instanceof Element) {
      elements.push(currentFiber.stateNode);
    }
    currentFiber = currentFiber.return;
  }
  return elements;
}
```
- 导出 `elementsFromFiber` 函数
- 参数 `fiber`: Fiber 节点
- 创建空数组存储 DOM 元素
- 使用 while 循环遍历 Fiber 树：
  - 检查 `stateNode` 是否为 Element 实例
  - 如果是，添加到数组中
  - 移动到父 Fiber 节点（`currentFiber.return`）
- 返回 DOM 元素数组

**reactFindDOMNodes 函数（第 18-21 行）**:

```typescript
export function reactFindDOMNodes(inst: any) {
  const fiber = getReactInternalFiber(inst);
  return elementsFromFiber(fiber);
}
```
- 导出 `reactFindDOMNodes` 函数
- 参数 `inst`: React 实例
- 调用 `getReactInternalFiber` 获取 Fiber 节点
- 调用 `elementsFromFiber` 获取 DOM 元素
- 返回 DOM 元素数组

## 使用示例

### 查找 DOM 节点

```typescript
import { reactFindDOMNodes } from './utils/react-find-dom-nodes';

const componentRef = getComponentRef();
const domNodes = reactFindDOMNodes(componentRef);
console.log(domNodes);
// 输出: [Element, Element, ...]
```

### 在拖拽中使用

```typescript
import { reactFindDOMNodes } from './utils/react-find-dom-nodes';

function handleDrop(componentRef) {
  const domNodes = reactFindDOMNodes(componentRef);
  // 使用 DOM 节点进行拖拽操作
  return domNodes;
}
```

### 在选择中使用

```typescript
import { reactFindDOMNodes } from './utils/react-find-dom-nodes';

function selectComponent(componentRef) {
  const domNodes = reactFindDOMNodes(componentRef);
  domNodes.forEach(node => {
    node.classList.add('selected');
  });
}
```

## 注意事项

1. **内部 API**: 使用 React 内部 API，可能不稳定
2. **版本兼容**: 支持不同版本的 React
3. **性能考虑**: 遍历 Fiber 树可能比较耗时
4. **返回数组**: 始终返回数组，可能包含多个元素

## 相关文件

- **[`get-client-rects.ts`](14-src-utils-get-client-rects.ts.md)**: 获取客户端矩形
- **[`is-dom-node.ts`](15-src-utils-is-dom-node.ts.md)**: DOM 节点类型判断

## 设计模式

### 遍历模式

遍历 Fiber 树查找 DOM 节点：

```typescript
while (currentFiber) {
  if (currentFiber.stateNode instanceof Element) {
    elements.push(currentFiber.stateNode);
  }
  currentFiber = currentFiber.return;
}
```

### 适配器模式

适配不同版本的 React：

```typescript
return inst._reactInternalFiber || inst._reactInternals || inst;
```

## 最佳实践

1. **版本兼容**: 支持不同版本的 React
2. **错误处理**: 处理可能的错误情况
3. **性能优化**: 避免频繁遍历 Fiber 树
4. **文档说明**: 为工具函数添加文档说明

## 总结

`react-find-dom-nodes.ts` 提供了从 React 实例查找 DOM 节点的工具函数。该函数通过遍历 React Fiber 树，找到对应的 DOM 节点。

主要特点：
- **版本兼容**: 支持不同版本的 React
- **遍历算法**: 使用 while 循环遍历 Fiber 树
- **返回数组**: 始终返回数组
- **内部 API**: 使用 React 内部 API
