# src/resource-type.ts 文档

## 文件路径

`packages/workspace/src/resource-type.ts`

## 功能概述

资源类型类，定义资源类型（editor 或 webview），提供资源名称和类型访问器。

## 主要功能

1. **资源类型定义**: 定义 editor 和 webview 两种资源类型
2. **资源名称访问**: 提供资源名称访问器
3. **资源类型访问**: 提供资源类型访问器

## 代码分析

### 类定义

```typescript
export class ResourceType implements IResourceType {
  constructor(readonly resourceTypeModel: IPublicTypeResourceType) {}
}
```

### 属性

#### name

```typescript
get name(): string
```

**功能**: 获取资源名称

**返回值**: `string`

**说明**:
- 从资源类型模型中获取资源名称

**使用示例**:
```typescript
const name = resourceType.name;
console.log(name); // 'myResource'
```

#### type

```typescript
get type(): 'editor' | 'webview'
```

**功能**: 获取资源类型

**返回值**: `'editor' | 'webview'`

**说明**:
- 从资源类型模型中获取资源类型
- 返回 'editor' 或 'webview'

**使用示例**:
```typescript
const type = resourceType.type;
console.log(type); // 'editor' 或 'webview'
```

## 使用示例

### 创建资源类型

```typescript
import { ResourceType } from '@alilc/lowcode-workspace';

const resourceType = new ResourceType({
  resourceName: 'page',
  resourceType: 'editor',
  resourceTypeModel: {
    editorViews: [
      {
        viewName: 'editor-view',
        type: 'editor',
      }
    ],
  }
});
```

### 获取资源名称

```typescript
const name = resourceType.name;
console.log(name);
```

### 获取资源类型

```typescript
const type = resourceType.type;
console.log(type);
```

## 注意事项

1. **资源类型**: 资源类型只能是 'editor' 或 'webview'
2. **资源名称**: 资源名称应该唯一，用于标识资源类型
3. **资源类型模型**: 资源类型模型包含完整的配置信息

## 最佳实践

1. **命名规范**: 使用有意义的资源名称
2. **类型选择**: 根据实际需求选择合适的资源类型
3. **类型安全**: 充分利用 TypeScript 类型系统

## 相关文件

- [`resource.ts`](./06-src-resource.ts.md) - 资源类
- [`workspace.ts`](./05-src-workspace.ts.md) - 工作空间核心类

## 总结

`src/resource-type.ts` 是资源类型类，负责定义资源类型。它提供了资源名称和类型访问器，为资源管理提供了类型安全的接口。
