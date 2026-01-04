# BlockRenderer - 区块渲染器

## 功能概述

[`renderer/block.tsx`](../../packages/renderer-core/src/renderer/block.tsx) 是区块渲染器（BlockRenderer），专门用于渲染区块组件。它继承自 BaseRenderer，提供了区块级别的渲染能力，支持区块级别的配置和生命周期。

## 主要功能

1. **区块渲染**：渲染区块组件
2. **区块状态管理**：管理区块状态
3. **区块生命周期**：支持区块生命周期方法
4. **区块上下文**：提供区块上下文
5. **数据源管理**：支持区块级别的数据源管理

## 核心类

### BlockRenderer

区块渲染器类，继承自 BaseRenderer。

```typescript
export default function blockRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class BlockRenderer extends BaseRenderer {
    static displayName = 'BlockRenderer';

    __namespace = 'block';

    __afterInit(props: IBaseRendererProps) {
      this.__generateCtx({});
      const schema = props.__schema || {};
      this.state = this.__parseData(schema.state || {});
      this.__initDataSource(props);
      this.__executeLifeCycleMethod('constructor', [...arguments]);
    }

    render() {
      const { __schema, __components } = this.props;

      if (this.__checkSchema(__schema, 'Div')) {
        return '区块 schema 结构异常！';
      }

      this.__debug(`${BlockRenderer.displayName} render - ${__schema?.fileName}`);
      this.__generateCtx({});
      this.__render();

      const { Block } = __components;
      if (Block) {
        return this.__renderComp(Block, {});
      }

      return this.__renderContent(this.__renderContextProvider());
    }
  };
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| __namespace | string | 命名空间，值为 'block' |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| __afterInit | props: IBaseRendererProps | void | 初始化后调用 |
| render | - | any | 渲染组件 |

**说明：**
- 继承自 BaseRenderer
- 专门用于渲染区块组件
- 支持区块级别的配置
- 支持区块级别的生命周期

## 使用示例

### 基础使用

```typescript
import { BlockRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new BlockRenderer({
  schema: {
    componentName: 'Block',
    props: {},
    children: [],
    state: {
      title: 'My Block',
      count: 0,
    },
  },
  components: {
    Block: BlockComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 区块状态管理

```typescript
import { BlockRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new BlockRenderer({
  schema: {
    componentName: 'Block',
    props: {},
    children: [],
    state: {
      title: 'My Block',
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
    Block: BlockComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 区块生命周期

```typescript
import { BlockRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new BlockRenderer({
  schema: {
    componentName: 'Block',
    props: {},
    children: [],
    lifeCycles: {
      constructor: function(props) {
        console.log('Block constructor');
      },
      componentDidMount: function() {
        console.log('Block componentDidMount');
      },
      componentDidUpdate: function(prevProps, prevState) {
        console.log('Block componentDidUpdate');
      },
      componentWillUnmount: function() {
        console.log('Block componentWillUnmount');
      },
    },
  },
  components: {
    Block: BlockComponent,
  },
  designMode: 'live',
});

renderer.render();
```

## 注意事项

1. **区块状态**：区块状态需要正确设置
2. **区块生命周期**：注意区块生命周期方法的执行顺序
3. **数据源**：数据源配置需要正确设置
4. **区块上下文**：区块上下文会传递给子组件
5. **性能优化**：注意区块渲染的性能优化
6. **内存管理**：注意区块销毁时的内存清理
7. **错误处理**：提供友好的错误信息

## 相关文件

- [`renderer/base.tsx`](base.md) - 基础渲染器
- [`renderer/index.ts`](index.md) - 渲染器入口
- [`renderer/page.tsx`](page.md) - 页面渲染器
- [`renderer/component.tsx`](component.md) - 组件渲染器

## 外部依赖

- 无

## 典型使用场景

1. **区块渲染**：渲染区块组件
2. **区块预览**：预览区块组件
3. **区块发布**：发布区块组件
4. **区块编辑**：编辑区块组件
5. **区块调试**：调试区块组件
