# HOC - 高阶组件入口

## 功能概述

[`hoc/index.tsx`](../../packages/renderer-core/src/hoc/index.tsx) 是高阶组件入口模块，负责导出所有高阶组件。它提供了一个组件包装器，为组件添加错误处理能力。

## 主要功能

1. **组件包装**：包装组件，添加错误处理能力
2. **错误捕获**：捕获组件渲染错误
3. **错误展示**：展示错误信息
4. **导出管理**：导出所有高阶组件

## 核心类型和接口

### IComponentProps

组件属性接口，定义了组件的所有属性。

```typescript
export interface IComponentProps {
  component: IGeneralComponent;
  __tag?: string;
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| component | IGeneralComponent | 要包装的组件 |
| __tag | string | 组件标签 |

## 核心组件

### ComponentWrapper

组件包装器，为组件添加错误处理能力。

```typescript
export function ComponentWrapper(props: IComponentProps) {
  const { component: Comp, __tag } = props;
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setError(null);
  }, [Comp]);

  if (error) {
    return (
      <div className="lowcode-component-error">
        <h3>Component Error: {__tag}</h3>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  try {
    return <Comp {...props} />;
  } catch (err) {
    setError(err as Error);
    return null;
  }
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| component | IGeneralComponent | 要包装的组件 |
| __tag | string | 组件标签 |

**说明：**
- 使用 React Hooks 管理错误状态
- 捕获组件渲染错误
- 展示错误信息
- 自动重置错误状态

**使用示例：**

```typescript
import { ComponentWrapper } from '@alilc/lowcode-renderer-core';

const MyComponent = () => {
  return <div>Hello World</div>;
};

const WrappedComponent = () => {
  return (
    <ComponentWrapper component={MyComponent} __tag="MyComponent" />
  );
};
```

## 使用示例

### 基础使用

```typescript
import { ComponentWrapper } from '@alilc/lowcode-renderer-core';

const MyComponent = () => {
  return <div>Hello World</div>;
};

const WrappedComponent = () => {
  return (
    <ComponentWrapper component={MyComponent} __tag="MyComponent" />
  );
};
```

### 错误处理

```typescript
import { ComponentWrapper } from '@alilc/lowcode-renderer-core';

const ErrorComponent = () => {
  throw new Error('Component Error');
};

const WrappedComponent = () => {
  return (
    <ComponentWrapper component={ErrorComponent} __tag="ErrorComponent" />
  );
};
```

### 在渲染器中使用

```typescript
import { ComponentWrapper } from '@alilc/lowcode-renderer-core';

class BaseRenderer extends React.Component<IRendererProps, IBaseRendererState> {
  render() {
    const { schema, components } = this.props;
    const Comp = components[schema.componentName];

    return (
      <ComponentWrapper component={Comp} __tag={schema.componentName} />
    );
  }
}
```

## 注意事项

1. **错误捕获**：确保正确捕获组件错误
2. **错误展示**：提供友好的错误信息
3. **性能优化**：避免不必要的重新渲染
4. **类型安全**：使用 TypeScript 类型确保类型安全
5. **错误重置**：及时重置错误状态
6. **内存管理**：注意组件卸载时的内存清理
7. **错误边界**：可以与 React Error Boundary 配合使用
8. **开发调试**：在开发模式下提供详细的错误信息

## 相关文件

- [`hoc/leaf.tsx`](leaf.md) - Leaf HOC
- [`renderer/base.tsx`](../renderer/base.md) - 基础渲染器
- [`adapter/index.ts`](../adapter/index.md) - 运行时适配器

## 外部依赖

- `react`: React 运行时

## 典型使用场景

1. **错误处理**：为组件添加错误处理能力
2. **错误展示**：展示组件渲染错误
3. **开发调试**：在开发模式下展示详细错误信息
4. **组件包装**：包装组件，添加额外功能
5. **渲染器集成**：在渲染器中使用组件包装器
