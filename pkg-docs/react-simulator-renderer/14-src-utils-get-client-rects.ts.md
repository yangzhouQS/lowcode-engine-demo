# src/utils/get-client-rects.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/utils/get-client-rects.ts`

## 功能概述

该文件提供了获取元素或文本节点的客户端矩形（ClientRects）的工具函数。对于元素节点，使用 `getBoundingClientRect()`；对于文本节点，使用 Range API 获取。

## 主要功能

1. **元素矩形**: 获取元素节点的客户端矩形
2. **文本矩形**: 获取文本节点的客户端矩形
3. **类型判断**: 自动判断节点类型并使用相应的方法

## 代码分析

### 完整代码

```typescript
import { isElement } from '@alilc/lowcode-utils';

// a range for test TextNode clientRect
const cycleRange = document.createRange();

export function getClientRects(node: Element | Text) {
  if (isElement(node)) {
    return [node.getBoundingClientRect()];
  }

  cycleRange.selectNode(node);
  return Array.from(cycleRange.getClientRects());
}
```

### 逐行解释

**第 1 行**:
```typescript
import { isElement } from '@alilc/lowcode-utils';
```
- 从 `@alilc/lowcode-utils` 导入 `isElement` 函数
- 用于判断节点是否为元素节点

**第 3 行**:
```typescript
// a range for test TextNode clientRect
const cycleRange = document.createRange();
```
- 创建一个 Range 对象
- 用于获取文本节点的客户端矩形
- 使用注释说明用途

**第 5-13 行**:
```typescript
export function getClientRects(node: Element | Text) {
  if (isElement(node)) {
    return [node.getBoundingClientRect()];
  }

  cycleRange.selectNode(node);
  return Array.from(cycleRange.getClientRects());
}
```
- 导出 `getClientRects` 函数
- 参数 `node`: 可以是 Element 或 Text 类型
- 如果是元素节点：
  - 调用 `getBoundingClientRect()` 获取矩形
  - 返回包含一个矩形的数组
- 如果是文本节点：
  - 使用 Range 的 `selectNode()` 方法选择节点
  - 调用 `getClientRects()` 获取所有矩形
  - 使用 `Array.from()` 转换为数组

## 使用示例

### 获取元素矩形

```typescript
import { getClientRects } from './utils/get-client-rects';

const element = document.getElementById('my-element');
const rects = getClientRects(element);
console.log(rects);
// 输出: [DOMRect { x: 0, y: 0, width: 100, height: 100, ... }]
```

### 获取文本矩形

```typescript
import { getClientRects } from './utils/get-client-rects';

const textNode = document.getElementById('my-text').firstChild;
const rects = getClientRects(textNode);
console.log(rects);
// 输出: [DOMRect { x: 0, y: 0, width: 50, height: 20, ... }]
```

### 在拖拽中使用

```typescript
import { getClientRects } from './utils/get-client-rects';

function getDropTarget(node) {
  const rects = getClientRects(node);
  // 使用矩形信息判断拖拽目标
  return rects;
}
```

## 注意事项

1. **类型判断**: 自动判断节点类型，使用相应的方法
2. **Range 复用**: 使用全局的 Range 对象，避免重复创建
3. **返回数组**: 始终返回数组，保持一致的返回类型
4. **性能考虑**: 对于文本节点，Range 操作可能比较耗时

## 相关文件

- **[`is-dom-node.ts`](15-src-utils-is-dom-node.ts.md)**: DOM 节点类型判断
- **[`react-find-dom-nodes.ts`](16-src-utils-react-find-dom-nodes.ts.md)**: React DOM 节点查找

## 设计模式

### 策略模式

根据不同的节点类型使用不同的策略：

```typescript
if (isElement(node)) {
  return [node.getBoundingClientRect()];
}
cycleRange.selectNode(node);
return Array.from(cycleRange.getClientRects());
```

### 单例模式

使用全局的 Range 对象，避免重复创建：

```typescript
const cycleRange = document.createRange();
```

## 最佳实践

1. **类型判断**: 使用工具函数判断节点类型
2. **对象复用**: 复用 Range 对象，提高性能
3. **返回一致性**: 始终返回数组，保持一致的返回类型
4. **错误处理**: 在使用前检查节点是否存在

## 总结

`get-client-rects.ts` 提供了获取元素或文本节点的客户端矩形的工具函数。该函数自动判断节点类型，对于元素节点使用 `getBoundingClientRect()`，对于文本节点使用 Range API。

主要特点：
- **智能判断**: 自动判断节点类型
- **统一接口**: 提供统一的接口获取矩形
- **性能优化**: 复用 Range 对象
- **类型安全**: 使用 TypeScript 类型定义
