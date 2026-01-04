# Renderer Core 模块总览

## 目录

- [模块简介](#模块简介)
- [核心职责](#核心职责)
- [模块结构](#模块结构)
- [渲染器工厂](#渲染器工厂)
- [渲染器类型](#渲染器类型)
- [适配器系统](#适配器系统)
- [高阶组件](#高阶组件)
- [使用场景](#使用场景)
- [相关文档](#相关文档)

## 模块简介

Renderer Core 模块是渲染器的核心抽象层，提供跨框架的渲染器接口，支持多种渲染框架适配，包括 React、Vue 等。

**包路径**: `packages/renderer-core`

**主要导出**:
```typescript
export * from './adapter';
export * from './context';
export * from './components';
export * from './hoc';
export * from './renderer';
export * from './types';
export * from './utils';
export { default as rendererFactory } from './renderer/renderer';
```

## 核心职责

### 1. 渲染器抽象
- 提供统一的渲染器接口
- 支持多种渲染框架
- 隐藏框架差异

### 2. 组件渲染
- 处理组件的渲染逻辑
- 管理组件生命周期
- 处理组件属性和子节点

### 3. 上下文管理
- 提供渲染上下文
- 管理全局状态
- 支持上下文传递

### 4. 高阶组件
- 提供高阶组件支持
- 支持组件包装
- 处理组件增强

### 5. 适配器系统
- 提供框架适配接口
- 支持多框架切换
- 统一 API 调用

## 模块结构

```
packages/renderer-core/
├── src/
│   ├── adapter/                # 适配器
│   │   └── index.ts
│   ├── components/            # 组件
│   │   ├── Div.tsx
│   │   └── VisualDom/
│   │       ├── index.tsx
│   │       └── index.css
│   ├── context/               # 上下文
│   │   └── index.ts
│   ├── hoc/                   # 高阶组件
│   │   └── index.tsx
│   ├── renderer/              # 渲染器
│   │   ├── renderer.tsx
│   │   ├── base.tsx
│   │   ├── component.tsx
│   │   ├── page.tsx
│   │   ├── block.tsx
│   │   └── temp.tsx
│   ├── types/                 # 类型定义
│   │   └── index.ts
│   ├── utils/                 # 工具函数
│   │   ├── common.ts
│   │   ├── data-helper.ts
│   │   ├── index.ts
│   │   ├── is-use-loop.ts
│   │   ├── logger.ts
│   │   └── request.ts
│   └── index.ts
├── es/                       # 编译输出
├── tests/                    # 测试文件
│   ├── setup.ts
│   ├── adapter/
│   ├── hoc/
│   ├── renderer/
│   └── utils/
├── package.json
├── tsconfig.json
├── babel.config.js
├── build.json
└── build.test.json
```

## 渲染器工厂

### rendererFactory()

[`rendererFactory()`](../../packages/renderer-core/src/renderer/renderer.tsx:11) 是渲染器工厂函数，创建渲染器组件。

```typescript
export default function rendererFactory(): IRenderComponent {
  const { PureComponent, Component, createElement, findDOMNode } = adapter.getRuntime();
  const RENDERER_COMPS: any = adapter.getRenderers();
  const BaseRenderer = baseRendererFactory();
  const AppContext = contextFactory();
  const Div = divFactory();

  const ConfigProvider = adapter.getConfigProvider() || Div;

  // 错误组件
  class FaultComponent extends PureComponent<NodeSchema | any> {
    render() {
      logger.error(`${this.props.componentName || ''} 组件渲染异常`);
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
      }, `${this.props.componentName || ''} 组件渲染异常`);
    }
  }

  // 未找到组件
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

  // 渲染器主类
  return class Renderer extends Component<IRendererProps> {
    static displayName = 'Renderer';
    state: Partial<IRendererState> = {};
    __ref: any;

    static defaultProps: IRendererProps = {
      appHelper: undefined,
      components: {},
      designMode: '',
      suspended: false,
      schema: {} as RootSchema,
      onCompGetRef: () => {},
      onCompGetCtx: () => {},
      thisRequiredInJSE: true,
    };

    static findDOMNode = findDOMNode;

    constructor(props: IRendererProps, context: any) {
      super(props, context);
      this.state = {};
    }

    async componentDidMount() {
      debug(`entry.componentDidMount - ${this.props.schema?.componentName}`);
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
        logger.error('The root component name needs to be one of Page、Block、Component');
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

## 渲染器类型

### 1. BaseRenderer

基础渲染器，所有渲染器的基类。

**职责**:
- 提供基础渲染逻辑
- 处理通用属性
- 管理生命周期

### 2. ComponentRenderer

组件渲染器，用于渲染普通组件。

**职责**:
- 渲染组件节点
- 处理组件属性
- 管理子节点

### 3. PageRenderer

页面渲染器，用于渲染页面根节点。

**职责**:
- 渲染页面节点
- 管理页面状态
- 处理页面级属性

### 4. BlockRenderer

区块渲染器，用于渲染区块节点。

**职责**:
- 渲染区块节点
- 管理区块状态
- 处理区块级属性

### 5. TempRenderer

临时渲染器，用于特殊场景。

**职责**:
- 临时渲染节点
- 处理临时状态
- 支持快速切换

## 适配器系统

### Adapter

适配器提供框架适配接口，统一不同框架的 API。

**核心接口**:
```typescript
interface IAdapter {
  getRuntime(): {
    Component: any;
    PureComponent: any;
    createElement: any;
    findDOMNode: any;
  };
  getRenderers(): any;
  getConfigProvider(): any;
}
```

### React 适配器

React 适配器的实现。

```typescript
import React from 'react';
import ReactDOM from 'react-dom';

export default {
  getRuntime() {
    return {
      Component: React.Component,
      PureComponent: React.PureComponent,
      createElement: React.createElement,
      findDOMNode: ReactDOM.findDOMNode,
    };
  },
  getRenderers() {
    return {};
  },
  getConfigProvider() {
    return undefined;
  },
};
```

## 高阶组件

### HOC 系统

高阶组件系统提供组件包装和增强能力。

**核心接口**:
```typescript
interface IHOC {
  (component: any): any;
}
```

### 使用示例

```typescript
// 创建高阶组件
const withLogger = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component mounted');
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

// 使用高阶组件
const EnhancedComponent = withLogger(MyComponent);
```

## 使用场景

### 场景 1: 创建渲染器

```typescript
import rendererFactory from '@alilc/lowcode-renderer-core';

const Renderer = rendererFactory();

// 使用渲染器
<Renderer
  schema={schema}
  components={components}
  designMode="design"
  appHelper={appHelper}
  onCompGetRef={handleRef}
  onCompGetCtx={handleCtx}
/>
```

### 场景 2: 自定义错误组件

```typescript
const MyFaultComponent = (props) => {
  return (
    <div style={{ padding: '20px', border: '2px solid red' }}>
      组件渲染异常: {props.componentName}
      <pre>{props.error?.message}</pre>
    </div>
  );
};

<Renderer
  schema={schema}
  faultComponent={MyFaultComponent}
/>
```

### 场景 3: 自定义未找到组件

```typescript
const MyNotFoundComponent = (props) => {
  return (
    <div style={{ padding: '20px', border: '2px solid orange' }}>
      组件未找到: {props.componentName}
    </div>
  );
};

<Renderer
  schema={schema}
  notFoundComponent={MyNotFoundComponent}
/>
```

### 场景 4: 使用自定义创建元素函数

```typescript
const customCreateElement = (type, props, children) => {
  console.log('Creating element:', type, props);
  return React.createElement(type, props, children);
};

<Renderer
  schema={schema}
  customCreateElement={customCreateElement}
/>
```

## 相关文档

- [系统架构总览](../00-overview/architecture-overview.md)
- [React Renderer 模块](../05-react-renderer/index.md)
- [React Simulator Renderer 模块](../06-react-simulator-renderer/index.md)
