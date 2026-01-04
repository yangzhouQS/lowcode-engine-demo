# AddonRenderer - 插件渲染器

## 功能概述

[`renderer/addon.tsx`](../../packages/renderer-core/src/renderer/addon.tsx) 是插件渲染器（AddonRenderer），专门用于渲染插件组件。它继承自 BaseRenderer，提供了插件级别的渲染能力，支持插件级别的配置和生命周期。AddonRenderer 还提供了插件注册和注销功能。

## 主要功能

1. **插件渲染**：渲染插件组件
2. **插件状态管理**：管理插件状态
3. **插件生命周期**：支持插件生命周期方法
4. **插件上下文**：提供插件上下文
5. **数据源管理**：支持插件级别的数据源管理
6. **插件注册**：支持插件注册
7. **插件注销**：支持插件注销
8. **插件方法**：提供 open 和 close 方法

## 核心类

### AddonRenderer

插件渲染器类，继承自 BaseRenderer。

```typescript
export default function addonRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class AddonRenderer extends BaseRenderer {
    static displayName = 'AddonRenderer';

    __namespace = 'addon';

    static propTypes = {
      config: PropTypes.object,
      __schema: PropTypes.object,
    };

    static defaultProps = {
      config: {},
      __schema: {},
    };

    addonKey: any;
    appHelper: IRendererAppHelper;
    open: () => any;
    close: () => any;

    __afterInit(props: IBaseRendererProps) {
      this.__generateCtx({
        component: this,
      });
      const schema = props.__schema || {};
      this.state = this.__parseData(schema.state || {});
      if (isEmpty(props.config) || !props.config?.addonKey) {
        logger.warn('lce addon has wrong config');
        this.setState({
          __hasError: true,
        });
        return;
      }
      // 注册插件
      this.addonKey = props.config.addonKey;
      this.appHelper.addons = this.appHelper.addons || {};
      this.appHelper.addons[this.addonKey] = this;
      this.__initDataSource(props);
      this.open = this.open || (() => { });
      this.close = this.close || (() => { });
      this.__executeLifeCycleMethod('constructor', [...arguments]);
    }

    async componentWillUnmount() {
      super.componentWillUnmount?.apply(this, [...arguments] as any);
      // 注销插件
      const config = this.props.config || {};
      if (config && this.appHelper.addons) {
        delete this.appHelper.addons[config.addonKey];
      }
    }

    get utils() {
      const { utils = {} } = this.context.config || {};
      return { ...this.appHelper.utils, ...utils };
    }

    render() {
      const { __schema } = this.props;

      if (this.__checkSchema(__schema)) {
        return '插件 schema 结构异常！';
      }

      this.__debug(`${AddonRenderer.displayName} render - ${__schema.fileName}`);
      this.__generateCtx({
        component: this,
      });
      this.__render();

      return this.__renderContent(this.__renderContextProvider({ compContext: this }));
    }
  };
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| __namespace | string | 命名空间，值为 'addon' |
| addonKey | any | 插件键 |
| appHelper | IRendererAppHelper | 应用助手 |
| open | () => any | 打开插件方法 |
| close | () => any | 关闭插件方法 |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| __afterInit | props: IBaseRendererProps | void | 初始化后调用 |
| componentWillUnmount | - | Promise<void> | 组件卸载前调用 |
| get utils | - | Record<string, any> | 获取工具函数 |
| render | - | any | 渲染组件 |

**说明：**
- 继承自 BaseRenderer
- 专门用于渲染插件组件
- 支持插件级别的配置
- 支持插件级别的生命周期
- 支持插件注册和注销
- 提供 open 和 close 方法

## 使用示例

### 基础使用

```typescript
import { AddonRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new AddonRenderer({
  schema: {
    componentName: 'Addon',
    props: {},
    children: [],
    state: {
      title: 'My Addon',
      count: 0,
    },
  },
  config: {
    addonKey: 'my-addon',
  },
  appHelper: {
    addons: {},
  },
  components: {
    Addon: AddonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 插件注册

```typescript
import { AddonRenderer } from '@alilc/lowcode-renderer-core';

const appHelper = {
  addons: {},
};

const renderer = new AddonRenderer({
  schema: {
    componentName: 'Addon',
    props: {},
    children: [],
  },
  config: {
    addonKey: 'my-addon',
  },
  appHelper: appHelper,
  components: {
    Addon: AddonComponent,
  },
  designMode: 'live',
});

renderer.render();

// 访问插件
const addon = appHelper.addons['my-addon'];
console.log(addon);
```

### 插件方法

```typescript
import { AddonRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new AddonRenderer({
  schema: {
    componentName: 'Addon',
    props: {},
    children: [],
    methods: {
      open: function() {
        console.log('Addon opened');
      },
      close: function() {
        console.log('Addon closed');
      },
    },
  },
  config: {
    addonKey: 'my-addon',
  },
  appHelper: {
    addons: {},
  },
  components: {
    Addon: AddonComponent,
  },
  designMode: 'live',
});

renderer.render();

// 调用插件方法
const addon = appHelper.addons['my-addon'];
addon.open();
addon.close();
```

### 插件生命周期

```typescript
import { AddonRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new AddonRenderer({
  schema: {
    componentName: 'Addon',
    props: {},
    children: [],
    lifeCycles: {
      constructor: function(props) {
        console.log('Addon constructor');
      },
      componentDidMount: function() {
        console.log('Addon componentDidMount');
      },
      componentDidUpdate: function(prevProps, prevState) {
        console.log('Addon componentDidUpdate');
      },
      componentWillUnmount: function() {
        console.log('Addon componentWillUnmount');
      },
    },
  },
  config: {
    addonKey: 'my-addon',
  },
  appHelper: {
    addons: {},
  },
  components: {
    Addon: AddonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

## 注意事项

1. **插件配置**：插件配置需要正确设置，特别是 addonKey
2. **插件注册**：插件会自动注册到 appHelper.addons
3. **插件注销**：插件卸载时会自动注销
4. **插件状态**：插件状态需要正确设置
5. **插件生命周期**：注意插件生命周期方法的执行顺序
6. **数据源**：数据源配置需要正确设置
7. **插件上下文**：插件上下文会传递给子组件
8. **性能优化**：注意插件渲染的性能优化
9. **内存管理**：注意插件销毁时的内存清理
10. **错误处理**：提供友好的错误信息

## 相关文件

- [`renderer/base.tsx`](base.md) - 基础渲染器
- [`renderer/index.ts`](index.md) - 渲染器入口
- [`renderer/page.tsx`](page.md) - 页面渲染器
- [`renderer/component.tsx`](component.md) - 组件渲染器

## 外部依赖

- `prop-types`: React PropTypes
- `@alilc/lowcode-utils`: 工具函数

## 典型使用场景

1. **插件渲染**：渲染插件组件
2. **插件预览**：预览插件组件
3. **插件发布**：发布插件组件
4. **插件编辑**：编辑插件组件
5. **插件调试**：调试插件组件
