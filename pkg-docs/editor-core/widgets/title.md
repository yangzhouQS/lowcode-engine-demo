# Title Widget 模块文档

## 文件路径

`packages/editor-core/src/widgets/title/index.tsx`

## 功能概述

`Title` 组件是编辑器的标题组件，用于显示标题文本。它是一个简单的 React 组件，接收 title 属性并渲染标题。

## 主要功能

### 1. 标题显示

- 显示标题文本
- 支持自定义标题

## 组件定义

```typescript
export interface TitleProps {
  title?: string;
}

export class Title extends React.Component<TitleProps> {
  render(): React.ReactNode
}
```

## 属性

### TitleProps

- `title?: string`: 标题文本

## 方法

### `render(): React.ReactNode`

渲染组件。

**返回值:** React 节点

**行为:**
- 如果有 title 属性，渲染 title
- 否则渲染空字符串

## 使用示例

### 基本使用

```typescript
import { Title } from '@alilc/lowcode-editor-core';

// 显示标题
<Title title="My Title" />
```

### 不显示标题

```typescript
// 不显示标题
<Title />
```

### 动态标题

```typescript
// 动态标题
const [title, setTitle] = useState('Initial Title');

<Title title={title} />
```

## 注意事项

1. **可选属性**: title 属性是可选的
2. **简单组件**: Title 是一个简单的展示组件
3. **无状态**: Title 组件没有内部状态

## 相关文件

- [`tip.tsx`](./tip.md) - Tip 组件
- [`tip-container.tsx`](./tip-container.md) - Tip 容器组件

## 外部依赖

- `react` - 提供 React 组件支持

## 典型使用场景

1. **页面标题**: 显示页面标题
2. **模块标题**: 显示模块标题
3. **面板标题**: 显示面板标题
4. **动态标题**: 根据状态动态显示标题
