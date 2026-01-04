# PageRenderer - 页面渲染器

## 功能概述

[`renderer/page.tsx`](../../packages/renderer-core/src/renderer/page.tsx) 是页面渲染器（PageRenderer），专门用于渲染页面组件。它继承自 BaseRenderer，提供了页面级别的渲染能力，支持页面级别的配置和生命周期。

## 主要功能

1. **页面渲染**：渲染页面组件
2. **页面状态管理**：管理页面状态
3. **页面生命周期**：支持页面生命周期方法
4. **页面上下文**：提供页面上下文
5. **数据源管理**：支持页面级别的数据源管理
6. **Schema 变化监听**：监听 Schema 变化并更新状态

## 核心类

### PageRenderer

页面渲染器类，继承自 BaseRenderer。

```typescript
export default function pageRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class PageRenderer extends BaseRenderer {
    static displayName = 'PageRenderer';

    __namespace = 'page';

    __afterInit(props: IBaseRendererProps, ...rest: unknown[]) {
      this.__generateCtx({
        page: this,
      });
      const schema = props.__schema || {};
      this.state = this.__parseData(schema.state || {});
      this.__initDataSource(props);
      this.__executeLifeCycleMethod('constructor', [props, ...rest]);
    }

    async componentDidUpdate(prevProps: IBaseRendererProps, _prevState: {}, snapshot: unknown) {
      const { __ctx } = this.props;
      // 当编排的时候修改 schema.state 值，需要将最新 schema.state 值 setState
      if (JSON.stringify(prevProps.__schema.state) != JSON.stringify(this.props.__schema.state)) {
        const newState = this.__parseData(this.props.__schema.state, __ctx);
        this.setState(newState);
      }

      super.componentDidUpdate?.(prevProps, _prevState, snapshot);
    }

    setState(state: any, callback?: () => void) {
      logger.info('page set state', state);
      super.setState(state, callback);
    }

    render() {
      const { __schema, __components } = this.props;
      if (this.__checkSchema(__schema)) {
        return '页面schema结构异常！';
      }
      this.__debug(`${PageRenderer.displayName} render - ${__schema.fileName}`);

      this.__bindCustomMethods(this.props);
      this.__initDataSource(this.props);

      this.__generateCtx({
        page: this,
      });
      this.__render();

      const { Page } = __components;
      if (Page) {
        return this.__renderComp(Page, { pageContext: this });
      }

      return this.__renderContent(this.__renderContextProvider({ pageContext: this }));
    }
  };
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| __namespace | string | 命名空间，值为 'page' |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| __afterInit | props: IBaseRendererProps, ...rest: unknown[] | void | 初始化后调用 |
| componentDidUpdate | prevProps: IBaseRendererProps, _prevState: {}, snapshot: unknown | Promise<void> | 组件更新后调用 |
| setState | state: any, callback?: () => void | void | 设置组件状态 |
| render | - | any | 渲染组件 |

**说明：**
- 继承自 BaseRenderer
- 专门用于渲染页面组件
- 支持页面级别的配置
- 支持页面级别的生命周期
- 监听 Schema 变化并更新状态

## 使用示例

### 基础使用

```typescript
import { PageRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new PageRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
    state: {
      title: 'My Page',
      count: 0,
    },
  },
  components: {
    Button: ButtonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 页面状态管理

```typescript
import { PageRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new PageRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
    state: {
      title: 'My Page',
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
    Button: ButtonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 页面生命周期

```typescript
import { PageRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new PageRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
    lifeCycles: {
      constructor: function(props) {
        console.log('Page constructor');
      },
      componentDidMount: function() {
        console.log('Page componentDidMount');
      },
      componentDidUpdate: function(prevProps, prevState) {
        console.log('Page componentDidUpdate');
      },
      componentWillUnmount: function() {
        console.log('Page componentWillUnmount');
      },
    },
  },
  components: {
    Button: ButtonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 页面数据源

```typescript
import { PageRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new PageRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
    dataSource: {
      list: [{
        id: 'user',
        isInit: true,
        dataHandler: 'this.handleUserData',
      }],
    },
  },
  appHelper: {
    requestHandlersMap: {
      user: {
        isInit: true,
        dataHandler: 'this.handleUserData',
      },
    },
  },
  components: {
    Button: ButtonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

## 注意事项

1. **页面状态**：页面状态需要正确设置
2. **页面生命周期**：注意页面生命周期方法的执行顺序
3. **Schema 变化**：Schema 变化会自动更新状态
4. **数据源**：数据源配置需要正确设置
5. **页面上下文**：页面上下文会传递给子组件
6. **性能优化**：注意页面渲染的性能优化
7. **内存管理**：注意页面销毁时的内存清理
8. **错误处理**：提供友好的错误信息

## 相关文件

- [`renderer/base.tsx`](base.md) - 基础渲染器
- [`renderer/index.ts`](index.md) - 渲染器入口
- [`renderer/component.tsx`](component.md) - 组件渲染器
- [`renderer/block.tsx`](block.md) - 区块渲染器

## 外部依赖

- `@alilc/lowcode-utils`: 工具函数

## 典型使用场景

1. **页面渲染**：渲染页面组件
2. **页面预览**：预览页面组件
3. **页面发布**：发布页面组件
4. **页面编辑**：编辑页面组件
5. **页面调试**：调试页面组件
