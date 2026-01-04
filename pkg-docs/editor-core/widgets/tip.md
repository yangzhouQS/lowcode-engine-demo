# Tip Widget 模块文档

## 文件路径

`packages/editor-core/src/widgets/tip/index.ts`

## 功能概述

`Tip` 组件是编辑器的提示组件，用于显示提示信息。它支持自动隐藏、手动关闭等功能。

## 主要功能

### 1. 提示显示

- 显示提示信息
- 支持自定义内容
- 支持自动隐藏

### 2. 提示管理

- 单例模式
- 全局访问
- 手动关闭

## 类定义

```typescript
export class Tip {
  private static instance: Tip;
  private container: TipContainer | null = null;
  
  private constructor()
  
  static getInstance(): Tip
  
  show(content: React.ReactNode, duration?: number): void
  
  close(): void
}
```

## 属性

### `private static instance: Tip`

Tip 单例实例。

### `private container: TipContainer | null`

Tip 容器实例。

## 方法

### `private constructor()`

私有构造函数，确保单例模式。

### `static getInstance(): Tip`

获取 Tip 单例实例。

**返回值:** Tip 实例

**行为:**
- 如果实例不存在，创建新实例
- 返回实例

### `show(content: React.ReactNode, duration?: number): void`

显示提示。

**参数:**
- `content`: 提示内容（React 节点）
- `duration`: 显示时长（毫秒），可选，默认不自动隐藏

**行为:**
- 如果容器不存在，创建容器
- 显示提示
- 如果指定了 duration，自动隐藏

### `close(): void`

关闭提示。

**行为:**
- 如果容器存在，关闭提示

## 使用示例

### 基本使用

```typescript
import { Tip } from '@alilc/lowcode-editor-core';

// 获取 Tip 实例
const tip = Tip.getInstance();

// 显示提示
tip.show('This is a tip');
```

### 自动隐藏

```typescript
// 显示提示，3秒后自动隐藏
tip.show('This tip will auto hide', 3000);
```

### 自定义内容

```typescript
// 显示自定义内容
tip.show(<div>Custom tip content</div>);

// 显示带样式的提示
tip.show(
  <div style={{ padding: '10px', background: '#f0f0f0' }}>
    Styled tip
  </div>
);
```

### 手动关闭

```typescript
// 显示提示
tip.show('This tip will be closed manually');

// 手动关闭提示
tip.close();
```

### 链式调用

```typescript
// 链式调用
Tip.getInstance().show('Tip message');
```

## 注意事项

1. **单例模式**: Tip 使用单例模式，全局只有一个实例
2. **自动隐藏**: 如果指定了 duration，提示会在指定时间后自动隐藏
3. **手动关闭**: 可以通过 `close()` 方法手动关闭提示
4. **容器管理**: Tip 会自动管理容器的创建和销毁
5. **React 节点**: content 参数支持 React 节点，可以传入任意 React 组件

## 相关文件

- [`tip-container.tsx`](./tip-container.md) - Tip 容器组件

## 外部依赖

- `react` - 提供 React 组件支持

## 典型使用场景

1. **操作提示**: 用户操作后显示提示信息
2. **错误提示**: 显示错误信息
3. **成功提示**: 显示成功信息
4. **警告提示**: 显示警告信息
5. **临时通知**: 显示临时通知信息
