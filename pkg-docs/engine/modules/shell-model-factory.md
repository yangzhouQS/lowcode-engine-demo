# Shell Model Factory 模块文档

## 文件路径

`packages/engine/src/modules/shell-model-factory.ts`

## 功能概述

`shell-model-factory` 模块提供了 Shell 模型工厂，负责创建 Node 和 SettingField 的实例。它是设计器和 Shell 之间的桥梁。

## 主要功能

### 1. Node 创建

- 创建 Node 实例
- 从设计器 Node 创建 Shell Node

### 2. SettingField 创建

- 创建 SettingField 实例
- 从设计器 SettingField 创建 Shell SettingField

## 类定义

```typescript
class ShellModelFactory implements IShellModelFactory {
  createNode(node: INode | null | undefined): IPublicModelNode | null
  createSettingField(prop: ISettingField): IPublicModelSettingField
}
```

## 方法

### `createNode(node: INode | null | undefined): IPublicModelNode | null`

创建 Node 实例。

**参数:**
- `node`: 设计器 Node 实例

**返回值:** Shell Node 实例或 null

**行为:**
- 调用 `Node.create(node)` 创建 Node 实例
- 返回创建的实例

### `createSettingField(prop: ISettingField): IPublicModelSettingField`

创建 SettingField 实例。

**参数:**
- `prop`: 设计器 SettingField 实例

**返回值:** Shell SettingField 实例

**行为:**
- 调用 `SettingField.create(prop)` 创建 SettingField 实例
- 返回创建的实例

## 导出的实例

```typescript
export const shellModelFactory = new ShellModelFactory();
```

## 使用示例

### 创建 Node

```typescript
import { shellModelFactory } from '@alilc/lowcode-engine';

const designerNode = ...;
const node = shellModelFactory.createNode(designerNode);
```

### 创建 SettingField

```typescript
import { shellModelFactory } from '@alilc/lowcode-engine';

const designerProp = ...;
const settingField = shellModelFactory.createSettingField(designerProp);
```

## 注意事项

1. **桥梁作用**: Shell 模型工厂是设计器和 Shell 之间的桥梁
2. **实例创建**: 负责创建 Node 和 SettingField 的实例
3. **类型转换**: 将设计器类型转换为 Shell 类型

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`classes.md`](./classes.md) - 类定义

## 外部依赖

- `@alilc/lowcode-types` - 提供类型定义
- `@alilc/lowcode-designer` - 提供设计器类型
- `@alilc/lowcode-shell` - 提供 Shell 类型

## 典型使用场景

1. **Node 创建**: 在需要创建 Node 实例时使用
2. **SettingField 创建**: 在需要创建 SettingField 实例时使用
3. **类型转换**: 将设计器类型转换为 Shell 类型
