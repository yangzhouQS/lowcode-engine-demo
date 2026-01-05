# src/utils/is-dom-node.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/utils/is-dom-node.ts`

## 功能概述

该文件提供了判断节点是否为 DOM 节点的类型守卫函数。使用 TypeScript 的类型守卫（Type Guard）确保类型安全。

## 主要功能

1. **类型守卫**: 判断节点是否为 DOM 节点
2. **类型安全**: 使用 TypeScript 类型守卫确保类型安全
3. **节点类型**: 支持 Element 和 Text 两种节点类型

## 代码分析

### 完整代码

```typescript
export function isDOMNode(node: any): node is Element | Text {
  return node.nodeType && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);
}
```

### 逐行解释

**第 1 行**:
```typescript
export function isDOMNode(node: any): node is Element | Text {
```
- 导出 `isDOMNode` 函数
- 参数 `node`: 任意类型
- 返回类型 `node is Element | Text`: TypeScript 类型守卫
- 如果函数返回 true，TypeScript 会将 `node` 的类型缩小为 `Element | Text`

**第 2 行**:
```typescript
  return node.nodeType && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);
```
- 检查 `node.nodeType` 是否存在
- 检查节点类型是否为 ELEMENT_NODE（元素节点）或 TEXT_NODE（文本节点）
- 使用逻辑或（`||`）判断是否为元素节点或文本节点
- 返回布尔值

## 使用示例

### 基本使用

```typescript
import { isDOMNode } from './utils/is-dom-node';

const element = document.getElementById('my-element');
if (isDOMNode(element)) {
  // TypeScript 知道 element 是 Element | Text 类型
  console.log(element.nodeType);
}
```

### 在函数中使用

```typescript
function processNode(node: any) {
  if (isDOMNode(node)) {
    // node 的类型被缩小为 Element | Text
    if (node.nodeType === Node.ELEMENT_NODE) {
      console.log('Element node');
    } else if (node.nodeType === Node.TEXT_NODE) {
      console.log('Text node');
    }
  }
}
```

### 在 React 中使用

```typescript
import { isDOMNode } from './utils/is-dom-node';

function handleRef(ref: any) {
  if (isDOMNode(ref)) {
    // ref 的类型被缩小为 Element | Text
    const rects = ref.getBoundingClientRect();
  }
}
```

## 注意事项

1. **类型守卫**: 使用 TypeScript 类型守卫确保类型安全
2. **节点类型**: 只支持 Element 和 Text 两种节点类型
3. **空值检查**: 检查 `node.nodeType` 是否存在，避免空值错误

## 相关文件

- **[`get-client-rects.ts`](14-src-utils-get-client-rects.ts.md)**: 获取客户端矩形
- **[`react-find-dom-nodes.ts`](16-src-utils-react-find-dom-nodes.ts.md)**: React DOM 节点查找

## 设计模式

### 类型守卫模式

使用 TypeScript 类型守卫确保类型安全：

```typescript
export function isDOMNode(node: any): node is Element | Text {
  return node.nodeType && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);
}
```

## 最佳实践

1. **类型安全**: 使用类型守卫确保类型安全
2. **空值检查**: 检查属性是否存在，避免空值错误
3. **明确类型**: 明确支持的节点类型
4. **文档说明**: 为类型守卫添加文档说明

## 总结

`is-dom-node.ts` 提供了判断节点是否为 DOM 节点的类型守卫函数。该函数使用 TypeScript 的类型守卫特性，确保类型安全。

主要特点：
- **类型安全**: 使用 TypeScript 类型守卫
- **简洁性**: 函数实现简洁
- **明确性**: 明确支持的节点类型
- **空值检查**: 检查属性是否存在
