# src/skeleton-context.ts 文档

## 文件路径

`packages/workspace/src/skeleton-context.ts`

## 功能概述

骨架上下文文件，创建 React Context 用于在工作台中传递骨架实例。

## 主要功能

1. **Context 创建**: 创建 SkeletonContext
2. **骨架传递**: 为子组件提供骨架实例

## 代码分析

```typescript
import { createContext } from 'react';

export const SkeletonContext = createContext<any>({} as any);
```

### 代码说明

1. **导入**: 从 'react' 导入 `createContext`
2. **创建 Context**: 创建 SkeletonContext，初始值为空对象
3. **导出**: 导出 SkeletonContext 供其他模块使用

## 使用示例

### 在工作台中使用

```typescript
import { SkeletonContext } from '@alilc/lowcode-workspace';

<SkeletonContext.Provider value={skeleton}>
  {/* 子组件 */}
</SkeletonContext.Provider>
```

### 在子组件中使用

```typescript
import { SkeletonContext } from '@alilc/lowcode-workspace';

const MyComponent = () => {
  const skeleton = useContext(SkeletonContext);
  
  return <div>{/* 使用 skeleton */}</div>;
};
```

## 注意事项

1. **Context 值**: 初始值为空对象，实际使用时需要提供真实的骨架实例
2. **类型安全**: 当前使用 `any` 类型，可以考虑定义更具体的类型
3. **Provider 包裹**: 使用骨架的组件需要被 SkeletonContext.Provider 包裹

## 最佳实践

1. **类型定义**: 定义 SkeletonContext 的具体类型，而不是使用 `any`
2. **默认值**: 提供合理的默认值或使用 undefined
3. **文档说明**: 在 Context 附近添加 JSDoc 注释说明用途

## 相关文件

- [`layouts/workbench.tsx`](./14-src-layouts-workbench.tsx.md) - 工作台布局组件，使用 SkeletonContext

## 总结

`src/skeleton-context.ts` 是骨架上下文文件，负责创建 React Context。它为工作台组件提供了传递骨架实例的能力，使子组件可以访问骨架系统。
