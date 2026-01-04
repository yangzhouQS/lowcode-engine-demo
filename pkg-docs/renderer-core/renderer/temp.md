# TempRenderer - 临时渲染器

## 功能概述

[`renderer/temp.tsx`](../../packages/renderer-core/src/renderer/temp.tsx) 是临时渲染器（TempRenderer），专门用于渲染临时组件。它继承自 BaseRenderer，提供了临时组件级别的渲染能力，支持临时组件级别的配置和生命周期。TempRenderer 主要用于下钻编辑等场景。

## 主要功能

1. **临时组件渲染**：渲染临时组件
2. **临时组件状态管理**：管理临时组件状态
3. **临时组件生命周期**：支持临时组件生命周期方法
4. **临时组件上下文**：提供临时组件上下文
5. **setState 拦截**：拦截 setState 方法，触发强制更新

## 核心类

### TempRenderer

临时渲染器类，继承自 BaseRenderer。

```typescript
export default function tempRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();

  return class TempRenderer extends BaseRenderer {
    static displayName = 'TempRenderer';

    __namespace = 'temp';

    cacheSetState?: Record<string, any>;

    __init() {
      this.state = {};
      this.cacheSetState = {};
    }

    async componentDidMount() {
      const ctx = this.props.__ctx;
      if (!ctx) return;
      const { setState } = ctx;
      this.cacheSetState = setState;
      ctx.setState = (...args: any) => {
        setState.call(ctx, ...args);
        setTimeout(() => this.forceUpdate(), 0);
      };
      this.__debug(`componentDidMount - ${this.props.__schema.fileName}`);
    }

    async componentDidUpdate() {
      this.__debug(`componentDidUpdate - ${this.props.__schema.fileName}`);
    }

    async componentWillUnmount() {
      const ctx = this.props.__ctx;
      if (!ctx || !this.cacheSetState) return;
      ctx.setState = this.cacheSetState;
      delete this.cacheSetState;
      this.__debug(`componentWillUnmount - ${this.props.__schema.fileName}`);
    }

    async componentDidCatch(e: any) {
      logger.warn(e);
      this.__debug(`componentDidCatch - ${this.props.__schema.fileName}`);
    }

    render() {
      const { __schema, __ctx } = this.props;
      if (this.__checkSchema(__schema)) {
        return '下钻编辑 schema 结构异常！';
      }

      this.__debug(`${TempRenderer.displayName} render - ${__schema?.fileName}`);

      return this.__renderContent(this.__renderContextProvider({ __ctx }));
    }
  };
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| __namespace | string | 命名空间，值为 'temp' |
| cacheSetState | Record<string, any> \| undefined | 缓存的 setState 方法 |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| __init | - | void | 初始化 |
| componentDidMount | - | Promise<void> | 组件挂载后调用 |
| componentDidUpdate | - | Promise<void> | 组件更新后调用 |
| componentWillUnmount | - | Promise<void> | 组件卸载前调用 |
| componentDidCatch | e: any | Promise<void> | 捕获组件错误 |
| render | - | any | 渲染组件 |

**说明：**
- 继承自 BaseRenderer
- 专门用于渲染临时组件
- 支持临时组件级别的配置
- 支持临时组件级别的生命周期
- 拦截 setState 方法，触发强制更新

## 使用示例

### 基础使用

```typescript
import { TempRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new TempRenderer({
  schema: {
    componentName: 'Temp',
    props: {},
    children: [],
  },
  components: {
    Temp: TempComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 下钻编辑

```typescript
import { TempRenderer } from '@alilc/lowcode-renderer-core';

const ctx = {
  setState: function(state) {
    console.log('setState called', state);
  },
};

const renderer = new TempRenderer({
  schema: {
    componentName: 'Temp',
    props: {},
    children: [],
  },
  __ctx: ctx,
  components: {
    Temp: TempComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 临时组件生命周期

```typescript
import { TempRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new TempRenderer({
  schema: {
    componentName: 'Temp',
    props: {},
    children: [],
    lifeCycles: {
      constructor: function(props) {
        console.log('Temp constructor');
      },
      componentDidMount: function() {
        console.log('Temp componentDidMount');
      },
      componentDidUpdate: function(prevProps, prevState) {
        console.log('Temp componentDidUpdate');
      },
      componentWillUnmount: function() {
        console.log('Temp componentWillUnmount');
      },
    },
  },
  components: {
    Temp: TempComponent,
  },
  designMode: 'live',
});

renderer.render();
```

## 注意事项

1. **临时组件**：临时组件主要用于下钻编辑等场景
2. **setState 拦截**：setState 方法会被拦截，触发强制更新
3. **临时组件生命周期**：注意临时组件生命周期方法的执行顺序
4. **临时组件上下文**：临时组件上下文会传递给子组件
5. **性能优化**：注意临时组件渲染的性能优化
6. **内存管理**：注意临时组件销毁时的内存清理
7. **错误处理**：提供友好的错误信息
8. **缓存恢复**：组件卸载时会恢复原始的 setState 方法

## 相关文件

- [`renderer/base.tsx`](base.md) - 基础渲染器
- [`renderer/index.ts`](index.md) - 渲染器入口
- [`renderer/page.tsx`](page.md) - 页面渲染器
- [`renderer/component.tsx`](component.md) - 组件渲染器

## 外部依赖

- `@alilc/lowcode-utils`: 工具函数

## 典型使用场景

1. **下钻编辑**：在下钻编辑场景中使用临时渲染器
2. **组件预览**：预览临时组件
3. **组件调试**：调试临时组件
4. **组件测试**：测试临时组件
5. **组件开发**：开发临时组件
