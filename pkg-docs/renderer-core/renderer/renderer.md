# Renderer - 渲染器入口组件

## 功能概述

[`renderer/renderer.tsx`](../../packages/renderer-core/src/renderer/renderer.tsx) 是渲染器入口组件（Renderer），是低代码渲染器的入口点。它负责根据 Schema 选择合适的渲染器，并提供错误处理、组件查找、元素创建等功能。

## 主要功能

1. **渲染器选择**：根据 Schema 选择合适的渲染器
2. **错误处理**：提供错误组件，处理渲染异常
3. **组件查找**：查找并获取组件
4. **元素创建**：创建 React 元素
5. **上下文提供**：提供应用上下文
6. **配置提供**：提供配置上下文
7. **引用管理**：管理组件引用
8. **生命周期管理**：支持组件生命周期方法

## 核心类

### Renderer

渲染器入口组件类。

```typescript
export default function rendererFactory(): IRenderComponent {
  const { PureComponent, Component, createElement, findDOMNode } = adapter.getRuntime();
  const RENDERER_COMPS: any = adapter.getRenderers();
  const BaseRenderer = baseRendererFactory();
  const AppContext = contextFactory();
  const Div = divFactory();

  const ConfigProvider = adapter.getConfigProvider() || Div;

  const debug = Debug('renderer:entry');

  class FaultComponent extends PureComponent<IPublicTypeNodeSchema | any> {
    render() {
      logger.error(`%c${this.props.componentName || ''} 组件渲染异常, 异常原因: ${this.props.error?.message || this.props.error || '未知'}`, 'color: #ff0000;');
      return createElement(Div, {
        style: {
          width: '100%',
          height: '50px',
          lineHeight: '50px',
          textAlign: 'center',
          fontSize: '15px',
          color: '#ff0000',
          border: '2px solid #ff0000',
        },
      }, `${this.props.componentName || ''} 组件渲染异常，请查看控制台日志`);
    }
  }

  class NotFoundComponent extends PureComponent<{
    componentName: string;
  } & IRendererProps> {
    render() {
      if (this.props.enableStrictNotFoundMode) {
        return `${this.props.componentName || ''} Component Not Found`;
      }
      return createElement(Div, this.props, this.props.children || `${this.props.componentName || ''} Component Not Found`);
    }
  }

  return class Renderer extends Component<IRendererProps> {
    static displayName = 'Renderer';

    state: Partial<IRendererState> = {};

    __ref: any;

    static defaultProps: IRendererProps = {
      appHelper: undefined,
      components: {},
      designMode: '',
      suspended: false,
      schema: {} as IPublicTypeRootSchema,
      onCompGetRef: () => { },
      onCompGetCtx: () => { },
      thisRequiredInJSE: true,
    };

    static findDOMNode = findDOMNode;

    constructor(props: IRendererProps, context: any) {
      super(props, context);
      this.state = {};
      debug(`entry.constructor - ${props?.schema?.componentName}`);
    }

    async componentDidMount() {
      debug(`entry.componentDidMount - ${this.props.schema && this.props.schema.componentName}`);
    }

    async componentDidUpdate() {
      debug(`entry.componentDidUpdate - ${this.props?.schema?.componentName}`);
    }

    async componentWillUnmount() {
      debug(`entry.componentWillUnmount - ${this.props?.schema?.componentName}`);
    }

    componentDidCatch(error: Error) {
      this.state.engineRenderError = true;
      this.state.error = error;
    }

    shouldComponentUpdate(nextProps: IRendererProps) {
      return !nextProps.suspended;
    }

    __getRef = (ref: any) => {
      this.__ref = ref;
      if (ref) {
        this.props.onCompGetRef?.(this.props.schema, ref);
      }
    };

    isValidComponent(SetComponent: any) {
      return SetComponent;
    }

    createElement(SetComponent: any, props: any, children?: any) {
      return (this.props.customCreateElement || createElement)(SetComponent, props, children);
    }

    getNotFoundComponent() {
      return this.props.notFoundComponent || NotFoundComponent;
    }

    getFaultComponent() {
      const { faultComponent, faultComponentMap, schema } = this.props;
      if (faultComponentMap) {
        const { componentName } = schema;
        return faultComponentMap[componentName] || faultComponent || FaultComponent;
      }
      return faultComponent || FaultComponent;
    }

    getComp() {
      const { schema, components } = this.props;
      const { componentName } = schema;
      const allComponents = { ...RENDERER_COMPS, ...components };
      let Comp = allComponents[componentName] || RENDERER_COMPS[`${componentName}Renderer`];
      if (Comp && Comp.prototype) {
        if (!(Comp.prototype instanceof BaseRenderer)) {
          Comp = RENDERER_COMPS[`${componentName}Renderer`];
        }
      }
      return Comp;
    }

    render() {
      const { schema, designMode, appHelper, components } = this.props;
      if (isEmpty(schema)) {
        return null;
      }
      // 兼容乐高区块模板
      if (schema.componentName !== 'Div' && !isFileSchema(schema)) {
        logger.error('The root component name needs to be one of Page、Block、Component, please check schema: ', schema);
        return '模型结构异常';
      }
      debug('entry.render');
      const allComponents = { ...RENDERER_COMPS, ...components };
      let Comp = this.getComp();

      if (this.state && this.state.engineRenderError) {
        return createElement(this.getFaultComponent(), {
          ...this.props,
          error: this.state.error,
        });
      }

      if (Comp) {
        return createElement(AppContext.Provider, {
          value: {
            appHelper,
            components: allComponents,
            engine: this,
          },
        }, createElement(ConfigProvider, {
          device: this.props.device,
          locale: this.props.locale,
        }, createElement(Comp, {
          key: schema.__ctx && `${schema.__ctx.lceKey}_${schema.__ctx.idx || '0'}`,
          ref: this.__getRef,
          __appHelper: appHelper,
          __components: allComponents,
          __schema: schema,
          __designMode: designMode,
          ...this.props,
        })));
      }
      return null;
    }
  };
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| state | Partial<IRendererState> | 组件状态 |
| __ref | any | 组件引用 |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| constructor | props: IRendererProps, context: any | void | 构造函数 |
| componentDidMount | - | Promise<void> | 组件挂载后调用 |
| componentDidUpdate | - | Promise<void> | 组件更新后调用 |
| componentWillUnmount | - | Promise<void> | 组件卸载前调用 |
| componentDidCatch | error: Error | void | 捕获组件错误 |
| shouldComponentUpdate | nextProps: IRendererProps | boolean | 判断组件是否需要更新 |
| __getRef | ref: any | void | 获取引用 |
| isValidComponent | SetComponent: any | any | 验证组件 |
| createElement | SetComponent: any, props: any, children? | any | 创建元素 |
| getNotFoundComponent | - | IGeneralComponent | 获取未找到组件 |
| getFaultComponent | - | IGeneralComponent | 获取错误组件 |
| getComp | - | any | 获取组件 |
| render | - | any | 渲染组件 |

**说明：**
- 是低代码渲染器的入口点
- 根据 Schema 选择合适的渲染器
- 提供错误处理功能
- 提供组件查找功能
- 提供元素创建功能
- 提供应用上下文
- 提供配置上下文

## 使用示例

### 基础使用

```typescript
import { Renderer } from '@alilc/lowcode-renderer-core';

<Renderer
  schema={{
    componentName: 'Page',
    props: {},
    children: [],
  }}
  components={{
    Button: ButtonComponent,
  }}
  designMode="live"
/>
```

### 自定义组件

```typescript
import { Renderer } from '@alilc/lowcode-renderer-core';

<Renderer
  schema={{
    componentName: 'Page',
    props: {},
    children: [{
      componentName: 'MyComponent',
      props: {
        title: 'Hello World',
      },
    }],
  }}
  components={{
    MyComponent: MyComponent,
  }}
  designMode="live"
/>
```

### 错误处理

```typescript
import { Renderer } from '@alilc/lowcode-renderer-core';

const FaultComponent = (props: any) => {
  return (
    <div className="error">
      Component Error: {props.componentName}
      <p>{props.error?.message}</p>
    </div>
  );
};

<Renderer
  schema={{
    componentName: 'Page',
    props: {},
    children: [],
  }}
  components={{}}
  faultComponent={FaultComponent}
  designMode="live"
/>
```

### 未找到组件

```typescript
import { Renderer } from '@alilc/lowcode-renderer-core';

const NotFoundComponent = (props: any) => {
  return (
    <div className="not-found">
      Component Not Found: {props.componentName}
    </div>
  );
};

<Renderer
  schema={{
    componentName: 'Page',
    props: {},
    children: [],
  }}
  components={{}}
  notFoundComponent={NotFoundComponent}
  designMode="live"
/>
```

### 自定义创建元素

```typescript
import { Renderer } from '@alilc/lowcode-renderer-core';

const customCreateElement = (Component: any, props: any, children: any) => {
  console.log('createElement:', Component, props, children);
  return React.createElement(Component, props, children);
};

<Renderer
  schema={{
    componentName: 'Page',
    props: {},
    children: [],
  }}
  components={{
    Button: ButtonComponent,
  }}
  customCreateElement={customCreateElement}
  designMode="live"
/>
```

## 注意事项

1. **Schema 格式**：确保 Schema 格式正确
2. **组件注册**：正确注册所有需要的组件
3. **错误处理**：提供友好的错误信息
4. **未找到组件**：提供友好的未找到组件提示
5. **性能优化**：注意组件渲染的性能优化
6. **内存管理**：注意组件销毁时的内存清理
7. **类型安全**：使用 TypeScript 类型确保类型安全
8. **上下文传递**：确保上下文正确传递

## 相关文件

- [`renderer/base.tsx`](base.md) - 基础渲染器
- [`renderer/index.ts`](index.md) - 渲染器入口
- [`adapter/index.ts`](../adapter/index.md) - 运行时适配器
- [`context/index.ts`](../context/index.md) - 上下文工厂

## 外部依赖

- `debug`: 调试工具
- `@alilc/lowcode-utils`: 工具函数
- `@alilc/lowcode-types`: 类型定义

## 典型使用场景

1. **低代码平台**：在低代码平台中使用渲染器
2. **可视化编辑器**：在可视化编辑器中使用渲染器
3. **动态表单**：在动态表单中使用渲染器
4. **页面构建器**：在页面构建器中使用渲染器
5. **组件预览**：在组件预览中使用渲染器
