# Tip Container 模块文档

## 文件路径

`packages/editor-core/src/widgets/tip/tip-container.tsx`

## 功能概述

`TipContainer` 组件是提示的容器组件，负责渲染提示内容。它使用 React Portal 将提示渲染到 document.body 下，确保提示在最上层显示。

## 主要功能

### 1. 提示渲染

- 渲染提示内容
- 使用 React Portal

### 2. 提示显示控制

- 控制提示的显示和隐藏
- 支持自动隐藏

## 组件定义

```typescript
export class TipContainer extends React.Component<{}, TipContainerState> {
  private timer: number | null = null;
  
  show(content: React.ReactNode, duration?: number): void
  
  close(): void
  
  render(): React.ReactNode
}
```

## 属性

### `private timer: number | null`

定时器 ID，用于自动隐藏提示。

## 方法

### `show(content: React.ReactNode, duration?: number): void`

显示提示。

**参数:**
- `content`: 提示内容（React 节点）
- `duration`: 显示时长（毫秒），可选

**行为:**
- 清除之前的定时器
- 更新状态，显示提示
- 如果指定了 duration，设置定时器自动隐藏

### `close(): void`

关闭提示。

**行为:**
- 清除定时器
- 更新状态，隐藏提示

### `render(): React.ReactNode`

渲染组件。

**返回值:** React 节点

**行为:**
- 如果提示可见，使用 React Portal 渲染提示内容
- 提示渲染到 document.body 下

## 状态

### TipContainerState

```typescript
interface TipContainerState {
  visible: boolean;
  content: React.ReactNode | null;
}
```

- `visible`: 提示是否可见
- `content`: 提示内容

## 使用示例

### 基本使用

```typescript
import { TipContainer } from '@alilc/lowcode-editor-core';

// 创建容器实例
const container = new TipContainer();

// 显示提示
container.show('This is a tip');

// 关闭提示
container.close();
```

### 自动隐藏

```typescript
// 显示提示，3秒后自动隐藏
container.show('This tip will auto hide', 3000);
```

### 自定义内容

```typescript
// 显示自定义内容
container.show(<div>Custom tip content</div>);

// 显示带样式的提示
container.show(
  <div style={{ padding: '10px', background: '#f0f0f0' }}>
    Styled tip
  </div>
);
```

## 注意事项

1. **React Portal**: 使用 React Portal 将提示渲染到 document.body 下
2. **定时器管理**: 使用 `setTimeout` 实现自动隐藏，记得清除定时器
3. **状态管理**: 使用 React 状态管理提示的显示和隐藏
4. **层级**: 提示渲染在最上层，不会被其他元素遮挡

## 相关文件

- [`tip.tsx`](./tip.md) - Tip 组件

## 外部依赖

- `react` - 提供 React 组件支持
- `react-dom` - 提供 ReactDOM 支持

## 典型使用场景

1. **提示渲染**: 渲染提示内容到页面
2. **自动隐藏**: 实现提示的自动隐藏功能
3. **提示管理**: 管理提示的显示和隐藏状态
