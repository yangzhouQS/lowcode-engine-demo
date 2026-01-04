# ComponentRenderer - 组件渲染器

## 功能概述

[`renderer/component.tsx`](../../packages/renderer-core/src/renderer/component.tsx) 是组件渲染器（ComponentRenderer），专门用于渲染普通组件。它继承自 BaseRenderer，提供了组件级别的渲染能力，支持组件级别的配置和生命周期。

## 主要功能

1. **组件渲染**：渲染普通组件
2. **组件状态管理**：管理组件状态
3. **组件生命周期**：支持组件生命周期方法
4. **组件上下文**：提供组件上下文
5. **数据源管理**：支持组件级别的数据源管理
6. **容器控制**：支持 noContainer 属性控制是否渲染容器

## 核心类

### ComponentRenderer

组件渲染器类，继承自 BaseRenderer。

```typescript
export default function componentRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class CompRenderer extends BaseRenderer {
    static displayName = 'CompRenderer';

    __namespace = 'component';

    __afterInit(props: IBaseRendererProps) {
      this.__generateCtx({
        component: this,
      });
      const schema = props.__schema || {};
      this.state = this.__parseData(schema.state || {});
      this.__initDataSource(props);
      this.__executeLifeCycleMethod('constructor', arguments as any);
    }

    render() {
      const { __schema, __components } = this.props;
      if (this.__checkSchema(__schema)) {
        return '自定义组件 schema 结构异常！';
      }
      this.__debug(`${CompRenderer.displayName} render - ${__schema.fileName}`);

      this.__generateCtx({
        component: this,
      });
      this.__render();

      const noContainer = this.__parseData(__schema.props?.noContainer);

      this.__bindCustomMethods(this.props);

      if (noContainer) {
        return this.__renderContextProvider({ compContext: this });
      }

      const Component = __components?.[__schema?.componentName];

      if (!Component) {
        return this.__renderContent(this.__renderContextProvider({ compContext: this }));
      }

      return this.__renderComp(Component, this.__renderContextProvider({ compContext: this }));
    }
  };
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| __namespace | string | 命名空间，值为 'component' |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| __afterInit | props: IBaseRendererProps | void | 初始化后调用 |
| render | - | any | 渲染组件 |

**说明：**
- 继承自 BaseRenderer
- 专门用于渲染普通组件
- 支持组件级别的配置
- 支持组件级别的生命周期
- 支持 noContainer 属性控制是否渲染容器

## 使用示例

### 基础使用

```typescript
import { ComponentRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new ComponentRenderer({
  schema: {
    componentName: 'MyComponent',
    props: {},
    children: [],
    state: {
      title: 'My Component',
      count: 0,
    },
  },
  components: {
    MyComponent: MyComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 组件状态管理

```typescript
import { ComponentRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new ComponentRenderer({
  schema: {
    componentName: 'MyComponent',
    props: {},
    children: [],
    state: {
      title: 'My Component',
      count: 0,
    },
    methods: {
      increment: function() {
        this.setState({
          count: this.state.count + 1,
        });
      },
    },
  },
  components: {
    MyComponent: MyComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 组件生命周期

```typescript
import { ComponentRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new ComponentRenderer({
  schema: {
    componentName: 'MyComponent',
    props: {},
    children: [],
    lifeCycles: {
      constructor: function(props) {
        console.log('Component constructor');
      },
      componentDidMount: function() {
        console.log('Component componentDidMount');
      },
      componentDidUpdate: function(prevProps, prevState) {
        console.log('Component componentDidUpdate');
      },
      componentWillUnmount: function() {
        console.log('Component componentWillUnmount');
      },
    },
  },
  components: {
    MyComponent: MyComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 无容器渲染

```typescript
import { ComponentRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new ComponentRenderer({
  schema: {
    componentName: 'MyComponent',
    props: {
      noContainer: true,
    },
    children: [],
  },
  components: {
    MyComponent: MyComponent,
  },
  designMode: 'live',
});

renderer.render();
```

## 注意事项

1. **组件状态**：组件状态需要正确设置
2. **组件生命周期**：注意组件生命周期方法的执行顺序
3. **容器控制**：noContainer 属性会影响渲染结果
4. **数据源**：数据源配置需要正确设置
5. **组件上下文**：组件上下文会传递给子组件
6. **性能优化**：注意组件渲染的性能优化
7. **内存管理**：注意组件销毁时的内存清理
8. **错误处理**：提供友好的错误信息

## 相关文件

- [`renderer/base.tsx`](base.md) - 基础渲染器
- [`renderer/index.ts`](index.md) - 渲染器入口
- [`renderer/page.tsx`](page.md) - 页面渲染器
- [`renderer/block.tsx`](block.md) - 区块渲染器

## 外部依赖

- 无

## 典型使用场景

1. **组件渲染**：渲染普通组件
2. **组件预览**：预览普通组件
3. **组件发布**：发布普通组件
4. **组件编辑**：编辑普通组件
5. **组件调试**：调试普通组件
