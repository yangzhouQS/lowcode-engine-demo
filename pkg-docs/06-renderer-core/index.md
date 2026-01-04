# @alilc/lowcode-renderer-core 模块文档

## 概述

`@alilc/lowcode-renderer-core` 是低代码引擎的核心渲染模块，负责将低代码协议的 Schema（模型结构）转换为实际的 React 组件并进行渲染。该模块提供了完整的渲染能力，包括组件渲染、数据源管理、生命周期管理、国际化支持等核心功能。

**版本**: 1.3.2  
**包名**: `@alilc/lowcode-renderer-core`  
**主要功能**: 低代码渲染核心引擎

---

## 目录结构

```
packages/renderer-core/
├── src/
│   ├── adapter/           # 运行时适配器
│   │   └── index.ts
│   ├── components/        # 基础组件
│   │   ├── Div.tsx
│   │   └── VisualDom/
│   │       ├── index.tsx
│   │       └── index.css
│   ├── context/           # 上下文管理
│   │   └── index.ts
│   ├── hoc/              # 高阶组件
│   │   ├── index.tsx
│   │   └── leaf.tsx
│   ├── renderer/          # 渲染器实现
│   │   ├── index.ts
│   │   ├── renderer.tsx
│   │   ├── base.tsx
│   │   ├── page.tsx
│   │   ├── component.tsx
│   │   ├── block.tsx
│   │   ├── addon.tsx
│   │   └── temp.tsx
│   ├── types/            # 类型定义
│   │   └── index.ts
│   └── utils/            # 工具函数
│       ├── index.ts
│       ├── common.ts
│       ├── data-helper.ts
│       ├── is-use-loop.ts
│       ├── logger.ts
│       └── request.ts
├── tests/                # 测试文件
└── package.json
```

---

## 核心模块详解

### 1. 运行时适配器 (adapter)

**文件**: [`src/adapter/index.ts`](packages/renderer-core/src/adapter/index.ts:1)

运行时适配器负责管理 React/Rax 运行时环境，提供统一的接口供渲染器使用。

#### 1.1 环境枚举

```typescript
export enum Env {
  React = 'react',
}
```

#### 1.2 Adapter 类

**单例模式**，通过 `export default new Adapter()` 导出。

##### 1.2.1 核心属性

```typescript
class Adapter {
  runtime: IRuntime;                    // 运行时环境
  builtinModules = [                    // 内置模块列表
    'Component', 'PureComponent', 'createElement', 
    'createContext', 'forwardRef', 'findDOMNode'
  ];
  env: Env;                            // 当前环境
  renderers: IRendererModules;          // 渲染器模块
  configProvider: any;                  // 配置提供者
}
```

##### 1.2.2 初始化方法

**`initRuntime()`** (第 22-53 行)

初始化默认运行时环境，提供空实现的模块：

```typescript
initRuntime() {
  const Component: IGeneralConstructor = class <T = any, S = any> {
    state: Readonly<S>;
    props: Readonly<T> & Readonly<{ children?: any | undefined }>;
    refs: Record<string, unknown>;
    context: Record<string, unknown>;
    setState() {}
    forceUpdate() {}
    render() {}
  };
  const PureComponent = class <T = any, S = any> {
    // 类似 Component 的空实现
  };
  const createElement = () => {};
  const createContext = () => {};
  const forwardRef = () => {};
  const findDOMNode = () => {};
  
  this.runtime = {
    Component, PureComponent, createElement, 
    createContext, forwardRef, findDOMNode
  };
}
```

##### 1.2.3 运行时验证

**`isValidRuntime(runtime)`** (第 61-73 行)

验证传入的运行时对象是否包含所有必需的内置模块：

```typescript
isValidRuntime(runtime: IRuntime) {
  if (typeof runtime !== 'object' || Array.isArray(runtime)) {
    return false;
  }
  return this.builtinModules.every((m) => {
    const flag = !!runtime[m];
    if (!flag) {
      throw new Error(`runtime is invalid, module '${m}' does not exist`);
    }
    return flag;
  });
}
```

##### 1.2.4 运行时管理方法

- **`setRuntime(runtime)`** (第 55-59 行): 设置运行时，先验证有效性
- **`getRuntime()`** (第 75-77 行): 获取当前运行时
- **`setEnv(env)`** (第 79-81 行): 设置环境类型
- **`isReact()`** (第 83-85 行): 判断是否为 React 环境

##### 1.2.5 渲染器管理

- **`setRenderers(renderers)`** (第 87-89 行): 设置渲染器模块集合
- **`getRenderers()`** (第 91-93 行): 获取渲染器模块集合

```typescript
setRenderers(renderers: IRendererModules) {
  this.renderers = renderers;
}

getRenderers() {
  return this.renderers || {};
}
```

##### 1.2.6 配置提供者管理

- **`setConfigProvider(Comp)`** (第 95-97 行): 设置全局配置提供者组件
- **`getConfigProvider()`** (第 99-101 行): 获取配置提供者组件

---

### 2. 上下文管理 (context)

**文件**: [`src/context/index.ts`](packages/renderer-core/src/context/index.ts:1)

提供全局应用上下文，用于在组件树中共享数据。

#### 2.1 contextFactory 函数

```typescript
export default function contextFactory() {
  const { createContext } = adapter.getRuntime();
  
  // 从全局 window 对象获取缓存的 context
  let context = (window as any).__appContext;
  if (!context) {
    context = createContext({});
    (window as any).__appContext = context;
  }
  return context;
}
```

**设计要点**:
- 使用单例模式，全局只创建一个 Context
- 缓存在 `window.__appContext` 中，避免重复创建
- 通过 `adapter.getRuntime()` 获取 `createContext` 方法

---

### 3. 渲染器实现 (renderer)

渲染器是模块的核心，负责将 Schema 转换为 React 组件树。

#### 3.1 主渲染器 (renderer.tsx)

**文件**: [`src/renderer/renderer.tsx`](packages/renderer-core/src/renderer/renderer.tsx:1)

主渲染器是渲染流程的入口点，负责协调整个渲染过程。

##### 3.1.1 rendererFactory 工厂函数

```typescript
export default function rendererFactory(): IRenderComponent {
  const { PureComponent, Component, createElement, findDOMNode } = adapter.getRuntime();
  const RENDERER_COMPS: any = adapter.getRenderers();
  const BaseRenderer = baseRendererFactory();
  const AppContext = contextFactory();
  const Div = divFactory();
  const ConfigProvider = adapter.getConfigProvider() || Div;
  const debug = Debug('renderer:entry');
```

**初始化步骤**:
1. 获取运行时 API
2. 获取已注册的渲染器模块
3. 创建基础渲染器实例
4. 获取应用上下文
5. 创建 Div 组件和配置提供者

##### 3.1.2 FaultComponent 错误组件 (第 22-37 行)

```typescript
class FaultComponent extends PureComponent<IPublicTypeNodeSchema | any> {
  render() {
    logger.error(
      `%c${this.props.componentName || ''} 组件渲染异常, 异常原因: ${this.props.error?.message || this.props.error || '未知'}`, 
      'color: #ff0000;'
    );
    return createElement(Div, {
      style: {
        width: '100%', height: '50px', lineHeight: '50px',
        textAlign: 'center', fontSize: '15px', color: '#ff0000',
        border: '2px solid #ff0000',
      },
    }, `${this.props.componentName || ''} 组件渲染异常，请查看控制台日志`);
  }
}
```

**功能**: 当组件渲染出错时显示友好的错误提示

##### 3.1.3 NotFoundComponent 未找到组件 (第 39-48 行)

```typescript
class NotFoundComponent extends PureComponent<{
  componentName: string;
} & IRendererProps> {
  render() {
    if (this.props.enableStrictNotFoundMode) {
      return `${this.props.componentName || ''} Component Not Found`;
    }
    return createElement(Div, this.props, 
      this.props.children || `${this.props.componentName || ''} Component Not Found`
    );
  }
}
```

**功能**: 当找不到组件时显示提示信息

##### 3.1.4 Renderer 主类 (第 50-182 行)

**静态属性**:

```typescript
static displayName = 'Renderer';

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
```

**生命周期方法**:

- **`componentDidMount()`** (第 76-78 行): 调试日志记录
- **`componentDidUpdate()`** (第 80-82 行): 调试日志记录
- **`componentWillUnmount()`** (第 84-86 行): 调试日志记录
- **`componentDidCatch(error)`** (第 88-91 行): 捕获渲染错误，设置错误状态

```typescript
componentDidCatch(error: Error) {
  this.state.engineRenderError = true;
  this.state.error = error;
}
```

- **`shouldComponentUpdate(nextProps)`** (第 93-95 行): 当 suspended 为 true 时阻止更新

```typescript
shouldComponentUpdate(nextProps: IRendererProps) {
  return !nextProps.suspended;
}
```

**核心方法**:

1. **`__getRef(ref)`** (第 97-102 行): 收集组件引用

```typescript
__getRef = (ref: any) => {
  this.__ref = ref;
  if (ref) {
    this.props.onCompGetRef?.(this.props.schema, ref);
  }
};
```

2. **`isValidComponent(SetComponent)`** (第 104-106 行): 验证组件有效性

```typescript
isValidComponent(SetComponent: any) {
  return SetComponent;
}
```

3. **`createElement(SetComponent, props, children)`** (第 108-110 行): 创建元素，支持自定义创建函数

```typescript
createElement(SetComponent: any, props: any, children?: any) {
  return (this.props.customCreateElement || createElement)(SetComponent, props, children);
}
```

4. **`getNotFoundComponent()`** (第 112-114 行): 获取未找到组件

```typescript
getNotFoundComponent() {
  return this.props.notFoundComponent || NotFoundComponent;
}
```

5. **`getFaultComponent()`** (第 116-123 行): 获取错误组件，支持按组件名映射

```typescript
getFaultComponent() {
  const { faultComponent, faultComponentMap, schema } = this.props;
  if (faultComponentMap) {
    const { componentName } = schema;
    return faultComponentMap[componentName] || faultComponent || FaultComponent;
  }
  return faultComponent || FaultComponent;
}
```

6. **`getComp()`** (第 125-136 行): 获取要渲染的组件

```typescript
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
```

**逻辑**:
- 优先从传入的 components 中查找
- 其次从已注册的渲染器中查找
- 验证组件是否继承自 BaseRenderer

7. **`render()`** (第 138-180 行): 主渲染方法

```typescript
render() {
  const { schema, designMode, appHelper, components } = this.props;
  
  // 验证 schema
  if (isEmpty(schema)) {
    return null;
  }
  
  // 兼容乐高区块模板，根组件必须是 Page、Block、Component 或 Div
  if (schema.componentName !== 'Div' && !isFileSchema(schema)) {
    logger.error('The root component name needs to be one of Page、Block、Component, please check the schema: ', schema);
    return '模型结构异常';
  }
  
  debug('entry.render');
  const allComponents = { ...RENDERER_COMPS, ...components };
  let Comp = this.getComp();

  // 处理错误状态
  if (this.state && this.state.engineRenderError) {
    return createElement(this.getFaultComponent(), {
      ...this.props,
      error: this.state.error,
    });
  }

  // 正常渲染
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
```

**渲染流程**:
1. 验证 schema 有效性
2. 检查根组件名称
3. 获取要渲染的组件
4. 处理错误状态
5. 创建 AppContext.Provider 包裹
6. 使用 ConfigProvider 包裹（支持 device 和 locale）
7. 渲染目标组件

---

#### 3.2 基础渲染器 (base.tsx)

**文件**: [`src/renderer/base.tsx`](packages/renderer-core/src/renderer/base.tsx:1)

基础渲染器提供了所有渲染器的通用能力，是其他渲染器的基类。这是整个模块最核心的文件，包含了 1050 行代码。

##### 3.2.1 生命周期辅助函数

**`executeLifeCycleMethod()`** (第 41-67 行)

执行 Schema 中定义的生命周期方法：

```typescript
export function executeLifeCycleMethod(
  context: any, 
  schema: IPublicTypeNodeSchema, 
  method: string, 
  args: any, 
  thisRequiredInJSE: boolean | undefined
): any {
  if (!context || !isSchema(schema) || !method) {
    return;
  }
  const lifeCycleMethods = getValue(schema, 'lifeCycles', {});
  let fn = lifeCycleMethods[method];

  if (!fn) {
    return;
  }

  // 解析 JSExpression 或 JSFunction
  if (isJSExpression(fn) || isJSFunction(fn)) {
    fn = thisRequiredInJSE 
      ? parseThisRequiredExpression(fn, context) 
      : parseExpression(fn, context);
  }

  if (typeof fn !== 'function') {
    logger.error(`生命周期${method}类型不符`, fn);
    return;
  }

  try {
    return fn.apply(context, args);
  } catch (e) {
    logger.error(`[${schema.componentName}]生命周期${method}出错`, e);
  }
}
```

**功能**:
- 从 schema.lifeCycles 中获取生命周期方法
- 支持解析 JSExpression 和 JSFunction
- 执行方法并捕获错误

##### 3.2.2 getSchemaChildren 函数

**`getSchemaChildren()`** (第 73-97 行)

获取 Schema 的子节点：

```typescript
export function getSchemaChildren(schema: IPublicTypeNodeSchema | undefined) {
  if (!schema) {
    return;
  }

  if (!schema.props) {
    return schema.children;
  }

  if (!schema.children) {
    return schema.props.children;
  }

  if (!schema.props.children) {
    return schema.children;
  }

  // 合并 schema.children 和 schema.props.children
  let result = ([] as IPublicTypeNodeData[]).concat(schema.children);
  if (Array.isArray(schema.props.children)) {
    result = result.concat(schema.props.children);
  } else {
    result.push(schema.props.children);
  }
  return result;
}
```

**逻辑**:
- 优先返回 schema.children
- 如果没有，返回 schema.props.children
- 如果都有，合并两者

##### 3.2.3 baseRendererFactory 工厂函数

**`baseRendererFactory()`** (第 99-1050 行)

创建基础渲染器类。

**初始化常量** (第 111-119 行):

```typescript
const DESIGN_MODE = {
  EXTEND: 'extend',
  BORDER: 'border',
  PREVIEW: 'preview',
};
const OVERLAY_LIST = ['Dialog', 'Overlay', 'Animate', 'ConfigProvider'];
const DEFAULT_LOOP_ARG_ITEM = 'item';
const DEFAULT_LOOP_ARG_INDEX = 'index';
let scopeIdx = 0;
```

##### 3.2.4 BaseRenderer 类

**静态属性** (第 124-130 行):

```typescript
static displayName = 'BaseRenderer';

static defaultProps = {
  __schema: {},
};

static contextType = AppContext;
```

**实例属性** (第 132-156 行):

```typescript
i18n: any;
getLocale: any;
setLocale: any;
dataSourceMap: Record<string, any> = {};

__namespace = 'base';
__compScopes: Record<string, any> = {};      // 组件作用域缓存
__instanceMap: Record<string, any> = {};     // 实例映射
__dataHelper: any;                           // 数据源辅助类

__customMethodsList: any[] = [];             // 自定义方法列表
__parseExpression: any;                      // 表达式解析函数
__ref: any;                                 // 组件引用
__styleElement: any;                        // 样式元素
```

##### 3.2.5 构造函数 (第 158-168 行)

```typescript
constructor(props: IBaseRendererProps, context: IBaseRendererContext) {
  super(props, context);
  this.context = context;
  
  // 创建表达式解析函数
  this.__parseExpression = (str: string, self: any) => {
    return parseExpression({ 
      str, 
      self, 
      thisRequired: props?.thisRequiredInJSE, 
      logScope: props.componentName 
    });
  };
  
  this.__beforeInit(props);
  this.__init(props);
  this.__afterInit(props);
  this.__debug(`constructor - ${props?.__schema?.fileName}`);
}
```

**初始化流程**:
1. 设置 context
2. 创建表达式解析函数
3. 调用 `__beforeInit` 钩子
4. 调用 `__init` 初始化
5. 调用 `__afterInit` 钩子

##### 3.2.6 初始化方法

**`__beforeInit(_props)`** (第 171 行): 空实现，供子类覆盖

**`__init(props)`** (第 173-178 行): 初始化核心功能

```typescript
__init(props: IBaseRendererProps) {
  this.__compScopes = {};
  this.__instanceMap = {};
  this.__bindCustomMethods(props);
  this.__initI18nAPIs();
}
```

**`__afterInit(_props)`** (第 181 行): 空实现，供子类覆盖

##### 3.2.7 生命周期方法

**`getDerivedStateFromProps`** (第 183-186 行): 静态方法，从 props 派生状态

```typescript
static getDerivedStateFromProps(props: IBaseRendererProps, state: any) {
  const result = executeLifeCycleMethod(
    this, 
    props?.__schema, 
    'getDerivedStateFromProps', 
    [props, state], 
    props.thisRequiredInJSE
  );
  return result === undefined ? null : result;
}
```

**`componentDidMount`** (第 193-197 行):

```typescript
async componentDidMount(...args: any[]) {
  this.reloadDataSource();
  this.__executeLifeCycleMethod('componentDidMount', args);
  this.__debug(`componentDidMount - ${this.props?.__schema?.fileName}`);
}
```

**`componentDidUpdate`** (第 199-202 行):

```typescript
async componentDidUpdate(...args: any[]) {
  this.__executeLifeCycleMethod('componentDidUpdate', args);
  this.__debug(`componentDidUpdate - ${this.props.__schema.fileName}`);
}
```

**`componentWillUnmount`** (第 204-207 行):

```typescript
async componentWillUnmount(...args: any[]) {
  this.__executeLifeCycleMethod('componentWillUnmount', args);
  this.__debug(`componentWillUnmount - ${this.props?.__schema?.fileName}`);
}
```

**`componentDidCatch`** (第 209-212 行):

```typescript
async componentDidCatch(...args: any[]) {
  this.__executeLifeCycleMethod('componentDidCatch', args);
  logger.warn(args);
}
```

##### 3.2.8 数据源管理

**`reloadDataSource`** (第 214-230 行): 重新加载数据源

```typescript
reloadDataSource = () => new Promise((resolve, reject) => {
  this.__debug('reload data source');
  if (!this.__dataHelper) {
    return resolve({});
  }
  this.__dataHelper.getInitData()
    .then((res: any) => {
      if (isEmpty(res)) {
        this.forceUpdate();
        return resolve({});
      }
      this.setState(res, resolve as () => void);
    })
    .catch((err: Error) => {
      reject(err);
    });
});
```

**`__initDataSource`** (第 305-357 行): 初始化数据源

```typescript
__initDataSource = (props: IBaseRendererProps) => {
  if (!props) {
    return;
  }
  const schema = props.__schema || {};
  const defaultDataSource: DataSource = {
    list: [],
  };
  const dataSource = schema.dataSource || defaultDataSource;
  
  // 判断是否使用数据源引擎
  const useDataSourceEngine = !!(props.__appHelper?.requestHandlersMap);
  
  if (useDataSourceEngine) {
    // 使用数据源引擎方案
    this.__dataHelper = {
      updateConfig: (updateDataSource: any) => {
        const { dataSourceMap, reloadDataSource } = createDataSourceEngine(
          updateDataSource ?? {},
          this,
          props.__appHelper.requestHandlersMap 
            ? { requestHandlersMap: props.__appHelper.requestHandlersMap } 
            : undefined,
        );

        this.reloadDataSource = () => new Promise((resolve) => {
          this.__debug('reload data source');
          reloadDataSource().then(() => {
            resolve({});
          });
        });
        return dataSourceMap;
      },
    };
    this.dataSourceMap = this.__dataHelper.updateConfig(dataSource);
  } else {
    // 使用传统 DataHelper 方案
    const appHelper = props.__appHelper;
    this.__dataHelper = new DataHelper(
      this, 
      dataSource, 
      appHelper, 
      (config: any) => this.__parseData(config)
    );
    this.dataSourceMap = this.__dataHelper.dataSourceMap;
    this.reloadDataSource = () => new Promise((resolve, reject) => {
      this.__debug('reload data source');
      if (!this.__dataHelper) {
        return resolve({});
      }
      this.__dataHelper.getInitData()
        .then((res: any) => {
          if (isEmpty(res)) {
            return resolve({});
          }
          this.setState(res, resolve as () => void);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
};
```

**两种方案**:
1. **数据源引擎方案**: 使用 `@alilc/lowcode-datasource-engine`
2. **传统方案**: 使用 `DataHelper` 类

##### 3.2.9 国际化支持

**`__initI18nAPIs`** (第 363-377 行): 初始化国际化 API

```typescript
__initI18nAPIs = () => {
  this.i18n = (key: string, values = {}) => {
    const { locale, messages } = this.props;
    return getI18n(key, values, locale, messages);
  };
  this.getLocale = () => this.props.locale;
  this.setLocale = (loc: string) => {
    const setLocaleFn = this.appHelper?.utils?.i18n?.setLocale;
    if (!setLocaleFn || typeof setLocaleFn !== 'function') {
      logger.warn('initI18nAPIs Failed, i18n only works when appHelper.utils.i18n.setLocale() exists');
      return undefined;
    }
    return setLocaleFn(loc);
  };
};
```

**提供的 API**:
- `this.i18n(key, values)`: 获取国际化文本
- `this.getLocale()`: 获取当前语言
- `this.setLocale(loc)`: 设置当前语言

##### 3.2.10 自定义方法绑定

**`__bindCustomMethods`** (第 266-286 行): 绑定 Schema 中定义的自定义方法

```typescript
__bindCustomMethods = (props: IBaseRendererProps) => {
  const { __schema } = props;
  const customMethodsList = Object.keys(__schema.methods || {}) || [];
  
  // 清理已删除的方法
  (this.__customMethodsList || []).forEach((item: any) => {
    if (!customMethodsList.includes(item)) {
      delete this[item];
    }
  });
  
  this.__customMethodsList = customMethodsList;
  
  // 绑定新方法
  forEach(__schema.methods, (val: any, key: string) => {
    let value = val;
    if (isJSExpression(value) || isJSFunction(value)) {
      value = this.__parseExpression(value, this);
    }
    if (typeof value !== 'function') {
      logger.error(`custom method ${key} can not be parsed to a valid function`, value);
      return;
    }
    this[key] = value.bind(this);
  });
};
```

**功能**:
- 从 schema.methods 中获取方法列表
- 解析 JSExpression 和 JSFunction
- 将方法绑定到 this 上
- 清理已删除的方法

##### 3.2.11 上下文生成

**`__generateCtx`** (第 288-298 行): 生成组件上下文

```typescript
__generateCtx = (ctx: Record<string, any>) => {
  const { pageContext, compContext } = this.context;
  const obj = {
    page: pageContext,
    component: compContext,
    ...ctx,
  };
  forEach(obj, (val: any, key: string) => {
    this[key] = val;
  });
};
```

**功能**:
- 合并 pageContext、compContext 和传入的 ctx
- 将所有属性挂载到 this 上

##### 3.2.12 数据解析

**`__parseData`** (第 300-303 行): 解析数据

```typescript
__parseData = (data: any, ctx?: Record<string, any>) => {
  const { __ctx, thisRequiredInJSE, componentName } = this.props;
  return parseData(data, ctx || __ctx || this, { 
    thisRequiredInJSE, 
    logScope: componentName 
  });
};
```

##### 3.2.13 CSS 样式注入

**`__writeCss`** (第 384-404 行): 将 Schema 中的 CSS 注入到页面

```typescript
__writeCss = (props: IBaseRendererProps) => {
  const css = getValue(props.__schema, 'css', '');
  this.__debug('create this.styleElement with css', css);
  let style = this.__styleElement;
  
  if (!this.__styleElement) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('from', 'style-sheet');

    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
    this.__styleElement = style;
    this.__debug('this.styleElement is created', this.__styleElement);
  }

  if (style.innerHTML === css) {
    return;
  }

  style.innerHTML = css;
};
```

**功能**:
- 创建 style 元素并添加到 head
- 只在 CSS 内容变化时更新

##### 3.2.14 虚拟 DOM 创建

**`__createVirtualDom`** (第 461-698 行): 核心方法，将 Schema 转换为虚拟 DOM

```typescript
__createVirtualDom = (
  originalSchema: IPublicTypeNodeData | IPublicTypeNodeData[] | undefined, 
  originalScope: any, 
  parentInfo: INodeInfo, 
  idx: string | number = ''
): any => {
  // 1. 处理空值
  if (originalSchema === null || originalSchema === undefined) {
    return null;
  }
  
  let scope = originalScope;
  let schema = originalSchema;
  const { engine } = this.context || {};
  
  if (!engine) {
    this.__debug('this.context.engine is invalid!');
    return null;
  }
  
  try {
    const { __appHelper: appHelper, __components: components = {} } = this.props || {};

    // 2. 处理 JSExpression
    if (isJSExpression(schema)) {
      return this.__parseExpression(schema, scope);
    }
    
    // 3. 处理 I18n 数据
    if (isI18nData(schema)) {
      return parseI18n(schema, scope);
    }
    
    // 4. 处理 JSSlot
    if (isJSSlot(schema)) {
      return this.__createVirtualDom(schema.value, scope, parentInfo);
    }

    // 5. 处理字符串
    if (typeof schema === 'string') {
      return schema;
    }

    // 6. 处理数字和布尔值
    if (typeof schema === 'number' || typeof schema === 'boolean') {
      return String(schema);
    }

    // 7. 处理数组
    if (Array.isArray(schema)) {
      if (schema.length === 1) {
        return this.__createVirtualDom(schema[0], scope, parentInfo);
      }
      return schema.map((item, idy) => 
        this.__createVirtualDom(
          item, 
          scope, 
          parentInfo, 
          (item as IPublicTypeNodeSchema)?.__ctx?.lceKey ? '' : String(idy)
        )
      );
    }

    // 8. 处理已转换的 React 元素
    if (schema.$$typeof) {
      return schema;
    }

    // 9. 获取子节点
    const _children = getSchemaChildren(schema);
    
    // 10. 验证组件名称
    if (!schema.componentName) {
      logger.error('The componentName in the schema is invalid, please check the schema: ', schema);
      return;
    }
    
    // 11. 处理 Fragment
    if (schema.componentName === 'Fragment' && _children) {
      const tarChildren = isJSExpression(_children) 
        ? this.__parseExpression(_children, scope) 
        : _children;
      return this.__createVirtualDom(tarChildren, scope, parentInfo);
    }

    // 12. 处理 Text 组件
    if (schema.componentName === 'Text' && typeof schema.props?.text === 'string') {
      const text: string = schema.props?.text;
      schema = { ...schema };
      schema.children = [text];
    }

    // 13. 验证 Schema
    if (!isSchema(schema)) {
      return null;
    }
    
    // 14. 获取组件
    let Comp = components[schema.componentName] 
      || this.props.__container?.components?.[schema.componentName];

    // 15. 构建容器类组件的 props
    const otherProps: any = isFileSchema(schema)
      ? {
          __schema: schema,
          __appHelper: appHelper,
          __components: components,
        }
      : {};

    // 16. 处理组件未找到的情况
    if (!Comp) {
      logger.error(
        `${schema.componentName} component is not found in components list! component list is:`, 
        components || this.props.__container?.components
      );
      return engine.createElement(
        engine.getNotFoundComponent(),
        {
          componentName: schema.componentName,
          componentId: schema.id,
          enableStrictNotFoundMode: engine.props.enableStrictNotFoundMode,
          ref: (ref: any) => {
            ref && engine.props?.onCompGetRef(schema, ref);
          },
        },
        this.__getSchemaChildrenVirtualDom(schema, scope, Comp),
      );
    }

    // 17. 处理循环渲染
    if (schema.loop != null) {
      const loop = this.__parseData(schema.loop, scope);
      if (Array.isArray(loop) && loop.length === 0) return null;
      const useLoop = isUseLoop(loop, this.__designModeIsDesign);
      if (useLoop) {
        return this.__createLoopVirtualDom(
          { ...schema, loop },
          scope,
          parentInfo,
          idx,
        );
      }
    }
    
    // 18. 处理条件渲染
    const condition = schema.condition == null 
      ? true 
      : this.__parseData(schema.condition, scope);

    const displayInHook = this.__designModeIsDesign;
    if (!condition && !displayInHook) {
      return null;
    }

    // 19. 生成组件作用域
    let scopeKey = '';
    if (Comp.generateScope) {
      const key = this.__parseExpression(schema.props?.key, scope);
      if (key) {
        scopeKey = key;
      } else if (!schema.__ctx) {
        schema.__ctx = {
          lceKey: `lce${++scopeIdx}`,
        };
        scopeKey = schema.__ctx.lceKey;
      } else {
        scopeKey = schema.__ctx.lceKey + (idx !== undefined ? `_${idx}` : '');
      }
      if (!this.__compScopes[scopeKey]) {
        this.__compScopes[scopeKey] = Comp.generateScope(this, schema);
      }
    }
    
    // 20. 设置新的 scope
    if (scopeKey && this.__compScopes[scopeKey]) {
      const compSelf = { ...this.__compScopes[scopeKey] };
      compSelf.__proto__ = scope;
      scope = compSelf;
    }

    // 21. 设置设计模式
    if (engine.props?.designMode) {
      otherProps.__designMode = engine.props.designMode;
    }
    if (this.__designModeIsDesign) {
      otherProps.__tag = Math.random();
    }
    
    // 22. 解析组件属性
    const componentInfo: any = {};
    const props: any = this.__getComponentProps(schema, scope, Comp, {
      ...componentInfo,
      props: transformArrayToMap(componentInfo.props, 'name'),
    }) || {};

    // 23. 应用 HOC
    this.__componentHOCs.forEach((ComponentConstruct: IComponentConstruct) => {
      Comp = ComponentConstruct(Comp, {
        schema,
        componentInfo,
        baseRenderer: this,
        scope,
      });
    });

    // 24. 设置 ref
    otherProps.ref = (ref: any) => {
      this.$(props.fieldId || props.ref, ref);
      const refProps = props.ref;
      if (refProps && typeof refProps === 'string') {
        this[refProps] = ref;
      }
      ref && engine.props?.onCompGetRef(schema, ref);
    };

    // 25. 传递 scope 到组件
    if (scopeKey && this.__compScopes[scopeKey]) {
      props.__scope = this.__compScopes[scopeKey];
    }
    
    // 26. 设置 key
    if (schema?.__ctx?.lceKey) {
      if (!isFileSchema(schema)) {
        engine.props?.onCompGetCtx(schema, scope);
      }
      props.key = props.key || `${schema.__ctx.lceKey}_${schema.__ctx.idx || 0}_${idx !== undefined ? idx : ''}`;
    } else if ((typeof idx === 'number' || typeof idx === 'string') && !props.key) {
      props.key = idx;
    }

    props.__id = schema.id;
    if (!props.key) {
      props.key = props.__id;
    }

    // 27. 获取子节点
    let child = this.__getSchemaChildrenVirtualDom(schema, scope, Comp, condition);
    const renderComp = (innerProps: any) => engine.createElement(Comp, innerProps, child);
    
    // 28. 设计模式特殊处理
    if (engine && [DESIGN_MODE.EXTEND, DESIGN_MODE.BORDER].includes(engine.props.designMode)) {
      // 处理 Overlay 类组件
      if (OVERLAY_LIST.includes(schema.componentName)) {
        const { ref, ...overlayProps } = otherProps;
        return createElement(Div, {
          ref,
          __designMode: engine.props.designMode,
        }, renderComp({ ...props, ...overlayProps }));
      }
      // 处理虚拟 DOM
      if (componentInfo?.parentRule) {
        const parentList = componentInfo.parentRule.split(',');
        const { schema: parentSchema = { componentName: '' }, Comp: parentComp } = parentInfo;
        if (
          !parentList.includes(parentSchema.componentName) ||
          parentComp !== components[parentSchema.componentName]
        ) {
          props.__componentName = schema.componentName;
          Comp = VisualDom;
        } else {
          props.__disableDesignMode = true;
        }
      }
    }
    
    // 29. 渲染组件
    return renderComp({
      ...props,
      ...otherProps,
      __inner__: {
        hidden: schema.hidden,
        condition,
      },
    });
  } catch (e) {
    return engine.createElement(engine.getFaultComponent(), {
      error: e,
      schema,
      self: scope,
      parentInfo,
      idx,
    });
  }
};
```

**处理流程**:
1. 处理各种特殊类型（null、JSExpression、I18n、JSSlot、字符串、数字、布尔值、数组）
2. 获取组件
3. 处理循环渲染
4. 处理条件渲染
5. 生成组件作用域
6. 解析组件属性
7. 应用 HOC
8. 设置 ref 和 key
9. 处理设计模式特殊情况
10. 渲染组件

##### 3.2.15 循环渲染

**`__createLoopVirtualDom`** (第 757-789 行): 创建循环渲染的虚拟 DOM

```typescript
__createLoopVirtualDom = (
  schema: IPublicTypeNodeSchema, 
  scope: any, 
  parentInfo: INodeInfo, 
  idx: number | string
) => {
  if (isFileSchema(schema)) {
    logger.warn('file type not support Loop');
    return null;
  }
  if (!Array.isArray(schema.loop)) {
    return null;
  }
  const itemArg = (schema.loopArgs && schema.loopArgs[0]) || DEFAULT_LOOP_ARG_ITEM;
  const indexArg = (schema.loopArgs && schema.loopArgs[1]) || DEFAULT_LOOP_ARG_INDEX;
  const { loop } = schema;
  
  return loop.map((item: IPublicTypeJSONValue | IPublicTypeCompositeValue, i: number) => {
    const loopSelf: any = {
      [itemArg]: item,
      [indexArg]: i,
    };
    loopSelf.__proto__ = scope;
    return this.__createVirtualDom(
      {
        ...schema,
        loop: undefined,
        props: {
          ...schema.props,
          // 循环下 key 不能为常量
          key: isJSExpression(schema.props?.key) ? schema.props?.key : null,
        },
      },
      loopSelf,
      parentInfo,
      idx ? `${idx}_${i}` : i,
    );
  });
};
```

**功能**:
- 为每个循环项创建独立的 scope
- 支持 item 和 index 参数自定义
- 处理 key 避免重复

##### 3.2.16 属性解析

**`__parseProps`** (第 796-912 行): 解析组件属性

```typescript
__parseProps = (originalProps: any, scope: any, path: string, info: INodeInfo): any => {
  let props = originalProps;
  const { schema, Comp, componentInfo = {} } = info;
  const propInfo = getValue(componentInfo.props, path);
  const propType = propInfo?.extra?.propType;

  const checkProps = (value: any) => {
    if (!propType) {
      return value;
    }
    return checkPropTypes(value, path, propType, componentInfo.name) ? value : undefined;
  };

  const parseReactNode = (data: any, params: any) => {
    if (isEmpty(params)) {
      const virtualDom = this.__createVirtualDom(data, scope, ({ schema, Comp } as INodeInfo));
      return checkProps(virtualDom);
    }
    return checkProps((...argValues: any[]) => {
      const args: any = {};
      if (Array.isArray(params) && params.length) {
        params.forEach((item, idx) => {
          if (typeof item === 'string') {
            args[item] = argValues[idx];
          } else if (item && typeof item === 'object') {
            args[item.name] = argValues[idx];
          }
        });
      }
      args.__proto__ = scope;
      return scope.__createVirtualDom(data, args, ({ schema, Comp } as INodeInfo));
    });
  };

  // 1. 处理 JSExpression
  if (isJSExpression(props)) {
    props = this.__parseExpression(props, scope);
    if (!isSchema(props) && !isJSSlot(props)) {
      return checkProps(props);
    }
  }

  // 2. 处理 I18n 数据
  const handleI18nData = (innerProps: any) => 
    innerProps[innerProps.use || (this.getLocale && this.getLocale()) || 'zh-CN'];

  if (isI18nData(props)) {
    const i18nProp = handleI18nData(props);
    if (i18nProp) {
      props = i18nProp;
    } else {
      return parseI18n(props, scope);
    }
  }

  // 3. 处理变量绑定
  if (isVariable(props)) {
    props = props.value;
    if (isI18nData(props)) {
      props = handleI18nData(props);
    }
  }

  // 4. 处理 JSFunction
  if (isJSFunction(props)) {
    props = transformStringToFunction(props.value);
  }
  
  // 5. 处理 JSSlot
  if (isJSSlot(props)) {
    const { params, value } = props;
    if (!isSchema(value) || isEmpty(value)) {
      return undefined;
    }
    return parseReactNode(value, params);
  }

  // 6. 处理 Schema 类型
  if (isSchema(props)) {
    const isReactNodeFunction = !!(propInfo?.type === 'ReactNode' && propInfo?.props?.type === 'function');
    const isMixinReactNodeFunction = !!(
      propInfo?.type === 'Mixin'
      && propInfo?.props?.types?.indexOf('ReactNode') > -1
      && propInfo?.props?.reactNodeProps?.type === 'function'
    );

    let params = null;
    if (isReactNodeFunction) {
      params = propInfo?.props?.params;
    } else if (isMixinReactNodeFunction) {
      params = propInfo?.props?.reactNodeProps?.params;
    }
    return parseReactNode(props, params);
  }
  
  // 7. 处理数组
  if (Array.isArray(props)) {
    return checkProps(props.map((item, idx) => 
      this.__parseProps(item, scope, path ? `${path}.${idx}` : `${idx}`, info)
    ));
  }
  
  // 8. 处理函数
  if (typeof props === 'function') {
    return checkProps(props.bind(scope));
  }
  
  // 9. 处理对象
  if (props && typeof props === 'object') {
    if (props.$$typeof) {
      return checkProps(props);
    }
    const res: any = {};
    forEach(props, (val: any, key: string) => {
      if (key.startsWith('__')) {
        res[key] = val;
        return;
      }
      res[key] = this.__parseProps(val, scope, path ? `${path}.${key}` : key, info);
    });
    return checkProps(res);
  }
  
  return checkProps(props);
};
```

**支持的属性类型**:
- JSExpression: JavaScript 表达式
- I18n: 国际化数据
- Variable: 变量绑定
- JSFunction: JavaScript 函数
- JSSlot: JavaScript 插槽
- Schema: 模型结构（ReactNode 类型）
- 数组、函数、对象等基本类型

##### 3.2.17 HOC 管理

**`__componentHOCs`** (第 706-711 行): 获取要应用的 HOC 列表

```typescript
get __componentHOCs(): IComponentConstruct[] {
  if (this.__designModeIsDesign) {
    return [leafWrapper, compWrapper];
  }
  return [compWrapper];
}
```

**设计模式**: 应用 leafWrapper 和 compWrapper  
**预览模式**: 只应用 compWrapper

##### 3.2.18 实例管理

**`$`** (第 914-923 行): 管理组件实例

```typescript
$(filedId: string, instance?: any) {
  this.__instanceMap = this.__instanceMap || {};
  if (!filedId || typeof filedId !== 'string') {
    return this.__instanceMap;
  }
  if (instance) {
    this.__instanceMap[filedId] = instance;
  }
  return this.__instanceMap[filedId];
}
```

**功能**:
- 通过 fieldId 获取或设置组件实例
- 支持获取所有实例映射

##### 3.2.19 上下文渲染

**`__renderContextProvider`** (第 927-936 行): 渲染上下文提供者

```typescript
__renderContextProvider = (customProps?: object, children?: any) => {
  return createElement(AppContext.Provider, {
    value: {
      ...this.context,
      blockContext: this,
      ...(customProps || {}),
    },
    children: children || this.__createDom(),
  });
};
```

**`__renderContextConsumer`** (第 938-940 行): 渲染上下文消费者

```typescript
__renderContextConsumer = (children: any) => {
  return createElement(AppContext.Consumer, {}, children);
};
```

##### 3.2.20 内容渲染

**`__renderContent`** (第 993-1005 行): 渲染内容

```typescript
__renderContent(children: any) {
  const { __schema } = this.props;
  const parsedProps = this.__parseData(__schema.props);
  const className = classnames(
    `lce-${this.__namespace}`, 
    getFileCssName(__schema.fileName), 
    parsedProps.className, 
    this.props.className
  );
  const style = { 
    ...(parsedProps.style || {}), 
    ...(typeof this.props.style === 'object' ? this.props.style : {}) 
  };
  const id = this.props.id || parsedProps.id;
  return createElement('div', {
    ref: this.__getRef,
    className,
    id,
    style,
  }, children);
}
```

##### 3.2.21 Schema 验证

**`__checkSchema`** (第 1007-1016 行): 验证 Schema 结构

```typescript
__checkSchema = (schema: IPublicTypeNodeSchema | undefined, originalExtraComponents: string | string[] = []) => {
  let extraComponents = originalExtraComponents;
  if (typeof extraComponents === 'string') {
    extraComponents = [extraComponents];
  }

  const builtin = capitalizeFirstLetter(this.__namespace);
  const componentNames = [builtin, ...extraComponents];
  return !isSchema(schema) || !componentNames.includes(schema?.componentName ?? '');
};
```

##### 3.2.22 Getter 方法

```typescript
get appHelper(): IRendererAppHelper {
  return this.props.__appHelper;
}

get requestHandlersMap() {
  return this.appHelper?.requestHandlersMap;
}

get utils() {
  return this.appHelper?.utils;
}

get constants() {
  return this.appHelper?.constants;
}

get history() {
  return this.appHelper?.history;
}

get location() {
  return this.appHelper?.location;
}

get match() {
  return this.appHelper?.match;
}
```

---

#### 3.3 页面渲染器 (page.tsx)

**文件**: [`src/renderer/page.tsx`](packages/renderer-core/src/renderer/page.tsx:1)

##### 3.3.1 pageRendererFactory 工厂函数

```typescript
export default function pageRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class PageRenderer extends BaseRenderer {
    static displayName = 'PageRenderer';
    __namespace = 'page';
```

##### 3.3.2 __afterInit 方法 (第 14-22 行)

```typescript
__afterInit(props: IBaseRendererProps, ...rest: unknown[]) {
  this.__generateCtx({
    page: this,
  });
  const schema = props.__schema || {};
  this.state = this.__parseData(schema.state || {});
  this.__initDataSource(props);
  this.__executeLifeCycleMethod('constructor', [props, ...rest]);
}
```

**功能**:
- 生成页面上下文（pageContext）
- 解析页面状态
- 初始化数据源
- 执行构造函数生命周期

##### 3.3.3 componentDidUpdate 方法 (第 24-33 行)

```typescript
async componentDidUpdate(prevProps: IBaseRendererProps, _prevState: {}, snapshot: unknown) {
  const { __ctx } = this.props;
  // 当编排的时候修改 schema.state 值，需要将最新 schema.state 值 setState
  if (JSON.stringify(prevProps.__schema.state) != JSON.stringify(this.props.__schema.state)) {
    const newState = this.__parseData(this.props.__schema.state, __ctx);
    this.setState(newState);
  }

  super.componentDidUpdate?.(prevProps, _prevState, snapshot);
}
```

**功能**:
- 监听 schema.state 变化
- 当状态变化时更新组件状态

##### 3.3.4 setState 方法 (第 35-38 行)

```typescript
setState(state: any, callback?: () => void) {
  logger.info('page set state', state);
  super.setState(state, callback);
}
```

##### 3.3.5 render 方法 (第 40-61 行)

```typescript
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
```

**功能**:
- 验证 Schema
- 绑定自定义方法
- 初始化数据源
- 生成页面上下文
- 执行渲染
- 优先使用 Page 组件，否则使用 div 容器

---

#### 3.4 组件渲染器 (component.tsx)

**文件**: [`src/renderer/component.tsx`](packages/renderer-core/src/renderer/component.tsx:1)

##### 3.4.1 componentRendererFactory 工厂函数

```typescript
export default function componentRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class CompRenderer extends BaseRenderer {
    static displayName = 'CompRenderer';
    __namespace = 'component';
```

##### 3.4.2 __afterInit 方法 (第 11-19 行)

```typescript
__afterInit(props: IBaseRendererProps) {
  this.__generateCtx({
    component: this,
  });
  const schema = props.__schema || {};
  this.state = this.__parseData(schema.state || {});
  this.__initDataSource(props);
  this.__executeLifeCycleMethod('constructor', arguments as any);
}
```

**功能**:
- 生成组件上下文（compContext）
- 解析组件状态
- 初始化数据源
- 执行构造函数生命周期

##### 3.4.3 render 方法 (第 21-49 行)

```typescript
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
```

**功能**:
- 验证 Schema
- 生成组件上下文
- 支持 noContainer 模式（不使用容器）
- 优先使用自定义组件，否则使用 div 容器

---

#### 3.5 区块渲染器 (block.tsx)

**文件**: [`src/renderer/block.tsx`](packages/renderer-core/src/renderer/block.tsx:1)

##### 3.5.1 blockRendererFactory 工厂函数

```typescript
export default function blockRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class BlockRenderer extends BaseRenderer {
    static displayName = 'BlockRenderer';
    __namespace = 'block';
```

##### 3.5.2 __afterInit 方法 (第 11-17 行)

```typescript
__afterInit(props: IBaseRendererProps) {
  this.__generateCtx({});
  const schema = props.__schema || {};
  this.state = this.__parseData(schema.state || {});
  this.__initDataSource(props);
  this.__executeLifeCycleMethod('constructor', [...arguments]);
}
```

**功能**:
- 生成区块上下文（不包含特定上下文）
- 解析区块状态
- 初始化数据源
- 执行构造函数生命周期

##### 3.5.3 render 方法 (第 19-37 行)

```typescript
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
```

**功能**:
- 验证 Schema（支持 Div 作为根组件）
- 生成区块上下文
- 优先使用 Block 组件，否则使用 div 容器

---

#### 3.6 插件渲染器 (addon.tsx)

**文件**: [`src/renderer/addon.tsx`](packages/renderer-core/src/renderer/addon.tsx:1)

##### 3.6.1 addonRendererFactory 工厂函数

```typescript
export default function addonRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();
  return class AddonRenderer extends BaseRenderer {
    static displayName = 'AddonRenderer';
    __namespace = 'addon';
```

##### 3.6.2 静态属性 (第 14-22 行)

```typescript
static propTypes = {
  config: PropTypes.object,
  __schema: PropTypes.object,
};

static defaultProps = {
  config: {},
  __schema: {},
};
```

##### 3.6.3 实例属性

```typescript
addonKey: any;
appHelper: IRendererAppHelper;
open: () => any;
close: () => any;
```

##### 3.6.4 __afterInit 方法 (第 29-50 行)

```typescript
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
```

**功能**:
- 验证配置
- 注册插件到 appHelper.addons
- 提供 open/close 方法

##### 3.6.5 componentWillUnmount 方法 (第 52-59 行)

```typescript
async componentWillUnmount() {
  super.componentWillUnmount?.apply(this, [...arguments] as any);
  // 注销插件
  const config = this.props.config || {};
  if (config && this.appHelper.addons) {
    delete this.appHelper.addons[config.addonKey];
  }
}
```

**功能**: 从 appHelper.addons 中注销插件

##### 3.6.6 utils getter (第 61-64 行)

```typescript
get utils() {
  const { utils = {} } = this.context.config || {};
  return { ...this.appHelper.utils, ...utils };
}
```

##### 3.6.7 render 方法 (第 66-81 行)

```typescript
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
```

---

#### 3.7 临时渲染器 (temp.tsx)

**文件**: [`src/renderer/temp.tsx`](packages/renderer-core/src/renderer/temp.tsx:1)

##### 3.7.1 tempRendererFactory 工厂函数

```typescript
export default function tempRendererFactory(): IBaseRenderComponent {
  const BaseRenderer = baseRendererFactory();

  return class TempRenderer extends BaseRenderer {
    static displayName = 'TempRenderer';
    __namespace = 'temp';
```

##### 3.7.2 实例属性

```typescript
cacheSetState?: Record<string, any>;
```

##### 3.7.3 __init 方法 (第 15-18 行)

```typescript
__init() {
  this.state = {};
  this.cacheSetState = {};
}
```

##### 3.7.4 componentDidMount 方法 (第 20-30 行)

```typescript
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
```

**功能**: 拦截外部 setState，强制更新临时渲染器

##### 3.7.5 componentWillUnmount 方法 (第 36-42 行)

```typescript
async componentWillUnmount() {
  const ctx = this.props.__ctx;
  if (!ctx || !this.cacheSetState) return;
  ctx.setState = this.cacheSetState;
  delete this.cacheSetState;
  this.__debug(`componentWillUnmount - ${this.props.__schema.fileName}`);
}
```

**功能**: 恢复原始 setState 方法

##### 3.7.6 render 方法 (第 49-59 行)

```typescript
render() {
  const { __schema, __ctx } = this.props;
  if (this.__checkSchema(__schema)) {
    return '下钻编辑 schema 结构异常！';
  }

  this.__debug(`${TempRenderer.displayName} render - ${__schema?.fileName}`);

  return this.__renderContent(this.__renderContextProvider({ __ctx }));
}
```

---

### 4. 高阶组件 (hoc)

#### 4.1 组件包装器 (compWrapper)

**文件**: [`src/hoc/index.tsx`](packages/renderer-core/src/hoc/index.tsx:1)

##### 4.1.1 patchDidCatch 函数 (第 10-50 行)

为组件添加错误边界和错误处理：

```typescript
function patchDidCatch(Comp: any, { baseRenderer }: Options) {
  if (Comp.patchedCatch) {
    return;
  }
  Comp.patchedCatch = true;
  const { PureComponent } = adapter.getRuntime();
  
  const originalDidCatch = Comp.prototype.componentDidCatch;
  Comp.prototype.componentDidCatch = function didCatch(this: any, error: Error, errorInfo: any) {
    this.setState({ engineRenderError: true, error });
    if (originalDidCatch && typeof originalDidCatch === 'function') {
      originalDidCatch.call(this, error, errorInfo);
    }
  };

  const { engine } = baseRenderer.context;
  const originRender = Comp.prototype.render;
  Comp.prototype.render = function () {
    if (this.state && this.state.engineRenderError) {
      this.state.engineRenderError = false;
      return engine.createElement(engine.getFaultComponent(), {
        ...this.props,
        error: this.state.error,
        componentName: this.props._componentName,
      });
    }
    return originRender.call(this);
  };
  
  if (!(Comp.prototype instanceof PureComponent)) {
    const originShouldComponentUpdate = Comp.prototype.shouldComponentUpdate;
    Comp.prototype.shouldComponentUpdate = function (nextProps: IRendererProps, nextState: any) {
      if (nextState && nextState.engineRenderError) {
        return true;
      }
      return originShouldComponentUpdate
        ? originShouldComponentUpdate.call(this, nextProps, nextState)
        : true;
    };
  }
}
```

**功能**:
- 添加 componentDidCatch 错误捕获
- 渲染错误时显示错误组件
- 修改 shouldComponentUpdate 确保错误状态更新

##### 4.1.2 compWrapper 函数 (第 54-88 行)

为组件添加 ref 转发和错误边界：

```typescript
const cache = new Map<string, { Comp: any; WrapperComponent: any }>();

export function compWrapper(Comp: any, options: Options) {
  const { createElement, Component, forwardRef } = adapter.getRuntime();
  
  // 如果已经是 React 组件，直接添加错误边界
  if (
    Comp?.prototype?.isReactComponent || // react
    Comp?.prototype?.setState || // rax
    Comp?.prototype instanceof Component
  ) {
    patchDidCatch(Comp, options);
    return Comp;
  }

  // 使用缓存避免重复包装
  if (cache.has(options.schema.id) && cache.get(options.schema.id)?.Comp === Comp) {
    return cache.get(options.schema.id)?.WrapperComponent;
  }

  // 创建包装组件
  class Wrapper extends Component {
    render() {
      return createElement(Comp, { ...this.props, ref: this.props.forwardRef });
    }
  }
  (Wrapper as any).displayName = Comp.displayName;

  patchDidCatch(Wrapper, options);

  const WrapperComponent = cloneEnumerableProperty(
    forwardRef((props: any, ref: any) => {
      return createElement(Wrapper, { ...props, forwardRef: ref });
    }),
    Comp,
  );

  cache.set(options.schema.id, { WrapperComponent, Comp });

  return WrapperComponent;
}
```

**功能**:
- 识别 React/Rax 组件
- 使用 forwardRef 转发 ref
- 添加错误边界
- 缓存包装后的组件

---

#### 4.2 叶子节点包装器 (leafWrapper)

**文件**: [`src/hoc/leaf.tsx`](packages/renderer-core/src/hoc/leaf.tsx:1)

叶子节点包装器为每个组件添加响应式渲染能力，支持属性变化自动重新渲染。这是整个模块最复杂的 HOC，包含 600 行代码。

##### 4.2.1 类型定义

```typescript
export interface IComponentHocInfo {
  schema: any;
  baseRenderer: types.IBaseRendererInstance;
  componentInfo: any;
  scope: any;
}

export interface IComponentHocProps {
  __tag: any;
  componentId: any;
  _leaf: any;
  forwardedRef?: any;
}

export interface IComponentHocState {
  childrenInState: boolean;
  nodeChildren: any;
  nodeCacheProps: any;
  visible: boolean;
  condition: boolean;
  nodeProps: any;
}

type DesignMode = Pick<IPublicTypeEngineOptions, 'designMode'>['designMode'];
```

##### 4.2.2 RerenderType 枚举

```typescript
enum RerenderType {
  All = 'All',
  ChildChanged = 'ChildChanged',
  PropsChanged = 'PropsChanged',
  VisibleChanged = 'VisibleChanged',
  MinimalRenderUnit = 'MinimalRenderUnit',
}
```

##### 4.2.3 LeafCache 类 (第 68-87 行)

缓存 Leaf 层组件，防止重新渲染问题：

```typescript
class LeafCache {
  component = new Map();    // 组件缓存
  state = new Map();        // 状态缓存
  event = new Map();        // 订阅事件缓存
  ref = new Map();         // ref 缓存

  constructor(public documentId: string, public device: string) {
  }
}
```

##### 4.2.4 initRerenderEvent 函数 (第 92-136 行)

为部分没有渲染的 node 节点进行兜底处理：

```typescript
function initRerenderEvent({
  schema,
  __debug,
  container,
  getNode,
}: any) {
  const leaf = getNode?.(schema.id);
  if (!leaf
    || cache.event.get(schema.id)?.clear
    || leaf === cache.event.get(schema.id)
  ) {
    return;
  }
  
  // 清理旧的事件
  cache.event.get(schema.id)?.dispose.forEach((disposeFn: any) => disposeFn && disposeFn());
  
  const debounceRerender = debounce(() => {
    container.rerender();
  }, 20);
  
  cache.event.set(schema.id, {
    clear: false,
    leaf,
    dispose: [
      leaf?.onPropChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onPropsChange make rerender`);
        debounceRerender();
      }),
      leaf?.onChildrenChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onChildrenChange make rerender`);
        debounceRerender();
      }) as Function,
      leaf?.onVisibleChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onVisibleChange make rerender`);
        debounceRerender();
      }),
    ],
  });
}
```

**功能**:
- 为未渲染的 leaf 节点注册事件监听
- 监听属性、子元素、可见性变化
- 使用防抖触发重新渲染

##### 4.2.5 clearRerenderEvent 函数 (第 139-148 行)

清除渲染的 node 节点全局注册事件：

```typescript
function clearRerenderEvent(id: string): void {
  if (cache.event.get(id)?.clear) {
    return;
  }
  cache.event.get(id)?.dispose?.forEach((disposeFn: any) => disposeFn && disposeFn());
  cache.event.set(id, {
    clear: true,
    dispose: [],
  });
}
```

##### 4.2.6 leafWrapper 函数 (第 151-600 行)

为每个组件包裹一个 HOC Leaf，支持组件内部属性变化，自响应渲染：

```typescript
export function leafWrapper(Comp: types.IBaseRenderComponent, {
  schema,
  baseRenderer,
  componentInfo,
  scope,
}: IComponentHocInfo) {
  const {
    __debug,
    __getComponentProps: getProps,
    __getSchemaChildrenVirtualDom: getChildren,
    __parseData,
  } = baseRenderer;
  
  const { engine } = baseRenderer.context;
  const host = baseRenderer.props?.__host;
  const curDocumentId = baseRenderer.props?.documentId ?? '';
  const curDevice = baseRenderer.props?.device ?? '';
  const getNode = baseRenderer.props?.getNode;
  const container = baseRenderer.props?.__container;
  const setSchemaChangedSymbol = baseRenderer.props?.setSchemaChangedSymbol;
  const editor = host?.designer?.editor;
  const runtime = adapter.getRuntime();
  const { forwardRef, createElement } = runtime;
  const Component = runtime.Component as types.IGeneralConstructor<
    IComponentHocProps, IComponentHocState
  >;

  const componentCacheId = schema.id;

  // 初始化或更新缓存
  if (!cache || (curDocumentId && curDocumentId !== cache.documentId) || (curDevice && curDevice !== cache.device)) {
    cache?.event.forEach(event => {
      event.dispose?.forEach((disposeFn: any) => disposeFn && disposeFn());
    });
    cache = new LeafCache(curDocumentId, curDevice);
  }

  // 验证组件
  if (!isReactComponent(Comp)) {
    logger.error(`${schema.componentName} component may be has errors: `, Comp);
  }

  // 初始化重渲染事件
  initRerenderEvent({
    schema,
    __debug,
    container,
    getNode,
  });

  // 使用缓存
  if (curDocumentId && cache.component.has(componentCacheId) && (cache.component.get(componentCacheId).Comp === Comp)) {
    return cache.component.get(componentCacheId).LeafWrapper;
  }

  // 创建 LeafHoc 类
  class LeafHoc extends Component {
    recordInfo: {
      startTime?: number | null;
      type?: string;
      node?: INode;
    } = {};

    private curEventLeaf: INode | undefined;

    static displayName = schema.componentName;

    disposeFunctions: Array<((() => void) | Function)> = [];

    __component_tag = 'leafWrapper';

    renderUnitInfo: {
      minimalUnitId?: string;
      minimalUnitName?: string;
      singleRender?: boolean;
    };

    // 最小渲染单元做防抖处理
    makeUnitRenderDebounced = debounce(() => {
      this.beforeRender(RerenderType.MinimalRenderUnit);
      const schema = this.leaf?.export?.(IPublicEnumTransformStage.Render);
      if (!schema) {
        return;
      }
      const nextProps = getProps(schema, scope, Comp, componentInfo);
      const children = getChildren(schema, scope, Comp);
      const nextState = {
        nodeProps: nextProps,
        nodeChildren: children,
        childrenInState: true,
      };
      if ('children' in nextProps) {
        nextState.nodeChildren = nextProps.children;
      }

      __debug(`${this.leaf?.componentName}(${this.props.componentId}) MinimalRenderUnit Render!`);
      this.setState(nextState);
    }, 20);

    constructor(props: IProps, context: any) {
      super(props, context);
      __debug(`${schema.componentName}[${this.props.componentId}] leaf render in SimulatorRendererView`);
      clearRerenderEvent(componentCacheId);
      this.curEventLeaf = this.leaf;

      cache.ref.set(componentCacheId, {
        makeUnitRender: this.makeUnitRender,
      });

      let cacheState = cache.state.get(componentCacheId);
      if (!cacheState || cacheState.__tag !== props.__tag) {
        cacheState = this.getDefaultState(props);
      }

      this.state = cacheState;
    }

    recordTime = () => {
      if (!this.recordInfo.startTime) {
        return;
      }
      const endTime = Date.now();
      const nodeCount = host?.designer?.currentDocument?.getNodeCount?.();
      const componentName = this.recordInfo.node?.componentName || this.leaf?.componentName || 'UnknownComponent';
      editor?.eventBus.emit(GlobalEvent.Node.Rerender, {
        componentName,
        time: endTime - this.recordInfo.startTime,
        type: this.recordInfo.type,
        nodeCount,
      });
      this.recordInfo.startTime = null;
    };

    makeUnitRender = () => {
      this.makeUnitRenderDebounced();
    };

    get autoRepaintNode() {
      return container?.autoRepaintNode;
    }

    componentDidUpdate() {
      this.recordTime();
    }

    componentDidMount() {
      const _leaf = this.leaf;
      this.initOnPropsChangeEvent(_leaf);
      this.initOnChildrenChangeEvent(_leaf);
      this.initOnVisibleChangeEvent(_leaf);
      this.recordTime();
    }

    getDefaultState(nextProps: any) {
      const {
        hidden = false,
        condition = true,
      } = nextProps.__inner__ || this.leaf?.export?.(IPublicEnumTransformStage.Render) || {};
      return {
        nodeChildren: null,
        childrenInState: false,
        visible: !hidden,
        condition: __parseData?.(condition, scope),
        nodeCacheProps: {},
        nodeProps: {},
      };
    }

    setState(state: any) {
      cache.state.set(componentCacheId, {
        ...this.state,
        ...state,
        __tag: this.props.__tag,
      });
      super.setState(state);
    }

    beforeRender(type: string, node?: INode): void {
      this.recordInfo.startTime = Date.now();
      this.recordInfo.type = type;
      this.recordInfo.node = node;
      setSchemaChangedSymbol?.(true);
    }

    judgeMiniUnitRender() {
      if (!this.renderUnitInfo) {
        this.getRenderUnitInfo();
      }

      const renderUnitInfo = this.renderUnitInfo || {
        singleRender: true,
      };

      if (renderUnitInfo.singleRender) {
        return;
      }

      const ref = cache.ref.get(renderUnitInfo.minimalUnitId);

      if (!ref) {
        __debug('Cant find minimalRenderUnit ref! This make rerender!');
        container?.rerender();
        return;
      }
      __debug(`${this.leaf?.componentName}(${this.props.componentId}) need render, make its minimalRenderUnit ${renderUnitInfo.minimalUnitName}(${renderUnitInfo.minimalUnitId})`);
      ref.makeUnitRender();
    }

    getRenderUnitInfo(leaf = this.leaf) {
      if (!leaf || typeof leaf.isRoot !== 'function') {
        return;
      }

      if (leaf.isRootNode) {
        this.renderUnitInfo = {
          singleRender: true,
          ...(this.renderUnitInfo || {}),
        };
      }
      if (leaf.componentMeta.isMinimalRenderUnit) {
        this.renderUnitInfo = {
          minimalUnitId: leaf.id,
          minimalUnitName: leaf.componentName,
          singleRender: false,
        };
      }
      if (leaf.hasLoop()) {
        this.renderUnitInfo = {
          minimalUnitId: leaf?.parent?.id,
          minimalUnitName: leaf?.parent?.componentName,
          singleRender: false,
        };
      }
      if (leaf.parent) {
        this.getRenderUnitInfo(leaf.parent);
      }
    }

    componentWillReceiveProps(nextProps: any) {
      let { componentId } = nextProps;
      if (nextProps.__tag === this.props.__tag) {
        return null;
      }

      const _leaf = getNode?.(componentId);
      if (_leaf && this.curEventLeaf && _leaf !== this.curEventLeaf) {
        this.disposeFunctions.forEach((fn) => fn());
        this.disposeFunctions = [];
        this.initOnChildrenChangeEvent(_leaf);
        this.initOnPropsChangeEvent(_leaf);
        this.initOnVisibleChangeEvent(_leaf);
        this.curEventLeaf = _leaf;
      }

      const {
        visible,
        ...resetState
      } = this.getDefaultState(nextProps);
      this.setState(resetState);
    }

    initOnPropsChangeEvent(leaf = this.leaf): void {
      const handlePropsChange = debounce((propChangeInfo: IPublicTypePropChangeOptions) => {
        const {
          key,
          newValue = null,
        } = propChangeInfo;
        const node = leaf;

        if (key === '___condition___') {
          const { condition = true } = this.leaf?.export(IPublicEnumTransformStage.Render) || {};
          const conditionValue = __parseData?.(condition, scope);
          __debug(`key is ___condition___, change condition value to [${condition}]`);
          this.setState({
            condition: conditionValue,
          });
          return;
        }

        if (key === '___loop___') {
          __debug('key is ___loop___, render a page!');
          container?.rerender();
          cache.component.delete(componentCacheId);
          return;
        }
        
        this.beforeRender(RerenderType.PropsChanged);
        const { state } = this;
        const { nodeCacheProps } = state;
        const nodeProps = getProps(node?.export?.(IPublicEnumTransformStage.Render) as IPublicTypeNodeSchema, scope, Comp, componentInfo);
        if (key && !(key in nodeProps) && (key in this.props)) {
          nodeCacheProps[key] = newValue;
        }
        __debug(`${leaf?.componentName}[${this.props.componentId}] component trigger onPropsChange!`, nodeProps, nodeCacheProps, key, newValue);
        this.setState('children' in nodeProps ? {
          nodeChildren: nodeProps.children,
          nodeProps,
          childrenInState: true,
          nodeCacheProps,
        } : {
          nodeProps,
          nodeCacheProps,
        });

        this.judgeMiniUnitRender();
      });
      
      const dispose = leaf?.onPropChange?.((propChangeInfo: IPublicTypePropChangeOptions) => {
        if (!this.autoRepaintNode) {
          return;
        }
        handlePropsChange(propChangeInfo);
      });

      dispose && this.disposeFunctions.push(dispose);
    }

    initOnVisibleChangeEvent(leaf = this.leaf) {
      const dispose = leaf?.onVisibleChange?.((flag: boolean) => {
        if (!this.autoRepaintNode) {
          return;
        }
        if (this.state.visible === flag) {
          return;
        }

        __debug(`${leaf?.componentName}[${this.props.componentId}] component trigger onVisibleChange(${flag}) event`);
        this.beforeRender(RerenderType.VisibleChanged);
        this.setState({
          visible: flag,
        });
        this.judgeMiniUnitRender();
      });

      dispose && this.disposeFunctions.push(dispose);
    }

    initOnChildrenChangeEvent(leaf = this.leaf) {
      const dispose = leaf?.onChildrenChange?.((param): void => {
        if (!this.autoRepaintNode) {
          return;
        }
        const {
          type,
          node,
        } = param || {};
        this.beforeRender(`${RerenderType.ChildChanged}-${type}`, node);
        const nextChild = getChildren(leaf?.export?.(IPublicEnumTransformStage.Render) as types.ISchema, scope, Comp);
        __debug(`${schema.componentName}[${this.props.componentId}] component trigger onChildrenChange event`, nextChild);
        this.setState({
          nodeChildren: nextChild,
          childrenInState: true,
        });
        this.judgeMiniUnitRender();
      });
      dispose && this.disposeFunctions.push(dispose);
    }

    componentWillUnmount() {
      this.disposeFunctions.forEach(fn => fn());
    }

    get hasChildren(): boolean {
      if (!this.state.childrenInState) {
        return 'children' in this.props;
      }

      return true;
    }

    get children(): any {
      if (this.state.childrenInState) {
        return this.state.nodeChildren;
      }
      if (this.props.children && !Array.isArray(this.props.children)) {
        return [this.props.children];
      }
      if (this.props.children && this.props.children.length) {
        return this.props.children;
      }
      return this.props.children;
    }

    get leaf(): INode | undefined {
      if (this.props._leaf?.isMock) {
        return undefined;
      }

      return getNode?.(componentCacheId);
    }

    render() {
      if (!this.state.visible || !this.state.condition) {
        return null;
      }

      const {
        forwardedRef,
        ...rest
      } = this.props;

      const compProps = {
        ...rest,
        ...(this.state.nodeCacheProps || {}),
        ...(this.state.nodeProps || {}),
        children: [],
        __id: this.props.componentId,
        ref: forwardedRef,
      };

      delete compProps.__inner__;

      if (this.hasChildren) {
        return engine.createElement(Comp, compProps, this.children);
      }

      return engine.createElement(Comp, compProps);
    }
  }

  let LeafWrapper = forwardRef((props: any, ref: any) => {
    return createElement(LeafHoc, {
      ...props,
      forwardedRef: ref,
    });
  });

  LeafWrapper = cloneEnumerableProperty(LeafWrapper, Comp);

  LeafWrapper.displayName = (Comp as any).displayName;

  cache.component.set(componentCacheId, {
    LeafWrapper,
    Comp,
  });

  return LeafWrapper;
}
```

**核心功能**:

1. **事件监听**:
   - `initOnPropsChangeEvent`: 监听属性变化
   - `initOnChildrenChangeEvent`: 监听子元素变化
   - `initOnVisibleChangeEvent`: 监听可见性变化

2. **最小渲染单元优化**:
   - `judgeMiniUnitRender`: 判断是否需要最小渲染单元渲染
   - `getRenderUnitInfo`: 获取渲染单元信息
   - `makeUnitRender`: 触发最小渲染单元渲染

3. **缓存管理**:
   - 组件缓存
   - 状态缓存
   - 事件缓存
   - ref 缓存

4. **防抖处理**:
   - 属性变化防抖
   - 最小渲染单元防抖

5. **性能监控**:
   - `recordTime`: 记录渲染时间
   - 发送渲染事件到编辑器

---

### 5. 基础组件 (components)

#### 5.1 Div 组件

**文件**: [`src/components/Div.tsx`](packages/renderer-core/src/components/Div.tsx:1)

简单的 div 容器组件：

```typescript
export default function divFactory(): IGeneralConstructor {
  const { PureComponent, createElement } = adapter.getRuntime();
  return class Div extends PureComponent {
    static displayName = 'Div';
    static version = '0.0.0';

    render() {
      return createElement('div', this.props);
    }
  };
}
```

**功能**: 提供基础的 div 容器，支持所有标准 HTML div 属性

---

#### 5.2 VisualDom 组件

**文件**: [`src/components/VisualDom/index.tsx`](packages/renderer-core/src/components/VisualDom/index.tsx:1)

虚拟 DOM 组件，用于设计模式下显示组件占位符：

```typescript
export default function visualDomFactory(): IGeneralConstructor {
  const { PureComponent, createElement } = adapter.getRuntime();
  return class VisualDom extends PureComponent {
    static displayName = 'VisualDom';

    static propTypes = {
      children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    };

    static defaultProps = {
      children: null,
    };

    render() {
      const { children, cell, title, label, text, __componentName } = this.props;
      let mainContent = children;
      if (cell && typeof cell === 'function') {
        mainContent = cell();
      }
      return createElement('div', { className: 'visual-dom' },
        createElement('div', { className: 'panel-container' },
          [
            createElement('span', { className: 'title' }, title || label || text || __componentName),
            createElement('div', { className: 'content' }, mainContent),
          ]));
    }
  };
}
```

**功能**:
- 显示组件标题和内容
- 提供可视化的组件占位
- 支持自定义单元格渲染

---

### 6. 工具函数 (utils)

#### 6.1 通用工具 (common.ts)

**文件**: [`src/utils/common.ts`](packages/renderer-core/src/utils/common.ts:1)

##### 6.1.1 isSchema 函数 (第 27-49 行)

检查是否为有效的 Schema：

```typescript
export function isSchema(schema: any): schema is IPublicTypeNodeSchema {
  if (isEmpty(schema)) {
    return false;
  }
  // Leaf and Slot should be valid
  if (schema.componentName === 'Leaf' || schema.componentName === 'Slot') {
    return true;
  }
  if (Array.isArray(schema)) {
    return schema.every((item) => isSchema(item));
  }
  const isValidProps = (props: any) => {
    if (!props) {
      return false;
    }
    if (isJSExpression(props)) {
      return true;
    }
    return (typeof schema.props === 'object' && !Array.isArray(props));
  };
  return !!(schema.componentName && isValidProps(schema.props));
}
```

**验证规则**:
- 必须有 componentName
- 必须有有效的 props
- 支持 Leaf 和 Slot 特殊组件

##### 6.1.2 isFileSchema 函数 (第 56-61 行)

检查是否为容器类型 Schema：

```typescript
export function isFileSchema(schema: IPublicTypeNodeSchema): schema is IPublicTypeRootSchema {
  if (!isSchema(schema)) {
    return false;
  }
  return ['Page', 'Block', 'Component'].includes(schema.componentName);
}
```

##### 6.1.3 getFileCssName 函数 (第 80-89 行)

从文件名生成 CSS 类名：

```typescript
export function getFileCssName(fileName: string) {
  if (!fileName) {
    return;
  }
  const name = fileName.replace(/([A-Z])/g, '-$1').toLowerCase();
  return (`lce-${name}`)
    .split('-')
    .filter((p) => !!p)
    .join('-');
}
```

**示例**: `MyComponent` → `lce-my-component`

##### 6.1.4 isJSSlot 函数 (第 95-105 行)

检查是否为 JSSlot 类型：

```typescript
export function isJSSlot(obj: any): obj is IPublicTypeJSSlot {
  if (!obj) {
    return false;
  }
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }

  // Compatible with the old protocol JSBlock
  return [EXPRESSION_TYPE.JSSLOT, EXPRESSION_TYPE.JSBLOCK].includes(obj.type);
}
```

##### 6.1.5 getValue 函数 (第 111-128 行)

从对象获取值：

```typescript
export function getValue(obj: any, path: string, defaultValue = {}) {
  if (Array.isArray(obj)) {
    return defaultValue;
  }

  if (isEmpty(obj) || typeof obj !== 'object') {
    return defaultValue;
  }

  const res = path.split('.').reduce((pre, cur) => {
    return pre && pre[cur];
  }, obj);
  if (res === undefined) {
    return defaultValue;
  }
  return res;
}
```

##### 6.1.6 getI18n 函数 (第 137-143 行)

获取国际化文本：

```typescript
export function getI18n(key: string, values = {}, locale = 'zh-CN', messages: Record<string, any> = {}) {
  if (!messages || !messages[locale] || !messages[locale][key]) {
    return '';
  }
  const formater = new IntlMessageFormat(messages[locale][key], locale);
  return formater.format(values);
}
```

##### 6.1.7 canAcceptsRef 函数 (第 149-154 行)

判断组件是否可以接受 ref：

```typescript
export function canAcceptsRef(Comp: any) {
  const hasSymbol = typeof Symbol === 'function' && Symbol.for;
  const REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  return Comp?.$$typeof === REACT_FORWARD_REF_TYPE 
    || Comp?.prototype?.isReactComponent 
    || Comp?.prototype?.setState 
    || Comp._forwardRef;
}
```

##### 6.1.8 transformArrayToMap 函数 (第 163-179 行)

将数组转换为 Map：

```typescript
export function transformArrayToMap(arr: any[], key: string, overwrite = true) {
  if (isEmpty(arr) || !Array.isArray(arr)) {
    return {};
  }
  const res: any = {};
  arr.forEach((item) => {
    const curKey = item[key];
    if (item[key] === undefined) {
      return;
    }
    if (res[curKey] && !overwrite) {
      return;
    }
    res[curKey] = item;
  });
  return res;
}
```

##### 6.1.9 transformStringToFunction 函数 (第 186-195 行)

将字符串转换为函数：

```typescript
export function transformStringToFunction(str: string) {
  if (typeof str !== 'string') {
    return str;
  }
  if (inSameDomain() && (window.parent as any).__newFunc) {
    return (window.parent as any).__newFunc(`"use strict"; return ${str}`)();
  } else {
    return new Function(`"use strict"; return ${str}`)();
  }
}
```

##### 6.1.10 parseExpression 函数 (第 204-249 行)

解析 JSExpression：

```typescript
function parseExpression(options: {
  str: any; self: any; thisRequired?: boolean; logScope?: string;
}): any;
function parseExpression(str: any, self: any, thisRequired?: boolean): any;
function parseExpression(a: any, b?: any, c = false) {
  let str;
  let self;
  let thisRequired;
  let logScope;
  
  if (typeof a === 'object' && b === undefined) {
    str = a.str;
    self = a.self;
    thisRequired = a.thisRequired;
    logScope = a.logScope;
  } else {
    str = a;
    self = b;
    thisRequired = c;
  }
  
  try {
    const contextArr = ['"use strict";', 'var __self = arguments[0];'];
    contextArr.push('return ');
    let tarStr: string;

    tarStr = (str.value || '').trim();

    // NOTE: use __self replace 'this' in the original function str
    tarStr = tarStr.replace(/this(\W|$)/g, (_a: any, b: any) => `__self${b}`);
    tarStr = contextArr.join('\n') + tarStr;

    if (inSameDomain() && (window.parent as any).__newFunc) {
      return (window.parent as any).__newFunc(tarStr)(self);
    }
    const code = `with(${thisRequired ? '{}' : '$scope || {}'}) { ${tarStr} }`;
    return new Function('$scope', code)(self);
  } catch (err) {
    logger.error(`${logScope || ''} parseExpression.error`, err, str, self?.__self ?? self);
    return undefined;
  }
}
```

**功能**:
- 将 JSExpression 字符串转换为可执行函数
- 支持省略 this 的写法
- 使用 with 语句提供作用域

##### 6.1.11 parseData 函数 (第 319-350 行)

解析数据（支持多种类型）：

```typescript
export function parseData(schema: unknown, self: any, options: IParseOptions = {}): any {
  if (isJSExpression(schema)) {
    return parseExpression({
      str: schema,
      self,
      thisRequired: options.thisRequiredInJSE,
      logScope: options.logScope,
    });
  } else if (isI18nData(schema)) {
    return parseI18n(schema, self);
  } else if (typeof schema === 'string') {
    return schema.trim();
  } else if (Array.isArray(schema)) {
    return schema.map((item) => parseData(item, self, options));
  } else if (typeof schema === 'function') {
    return schema.bind(self);
  } else if (typeof schema === 'object') {
    if (!schema) {
      return schema;
    }
    const res: any = {};
    forEach(schema, (val: any, key: string) => {
      if (key.startsWith('__')) {
        return;
      }
      res[key] = parseData(val, self, options);
    });
    return res;
  }
  return schema;
}
```

**支持的类型**:
- JSExpression: JavaScript 表达式
- I18n: 国际化数据
- 字符串: 去除首尾空格
- 数组: 递归解析每个元素
- 函数: 绑定 this
- 对象: 递归解析每个属性（跳过 __ 开头的属性）

##### 6.1.12 serializeParams 函数 (第 357-370 行)

序列化 URL 参数：

```typescript
export function serializeParams(obj: any) {
  let result: any = [];
  forEach(obj, (val: any, key: any) => {
    if (val === null || val === undefined || val === '') {
      return;
    }
    if (typeof val === 'object') {
      result.push(`${key}=${encodeURIComponent(JSON.stringify(val))}`);
    } else {
      result.push(`${key}=${encodeURIComponent(val)}`);
    }
  });
  return result.join('&');
}
```

---

#### 6.2 数据源辅助类 (data-helper.ts)

**文件**: [`src/utils/data-helper.ts`](packages/renderer-core/src/utils/data-helper.ts:1)

##### 6.2.1 doRequest 函数 (第 24-44 行)

执行标准数据源请求：

```typescript
export function doRequest(type: DataSourceType, options: any) {
  let { uri, url, method = 'GET', headers, params, ...otherProps } = options;
  otherProps = otherProps || {};
  
  if (type === 'jsonp') {
    return jsonp(uri, params, otherProps);
  }

  if (type === 'fetch') {
    switch (method.toUpperCase()) {
      case 'GET':
        return get(uri, params, headers, otherProps);
      case 'POST':
        return post(uri, params, headers, otherProps);
      default:
        return request(uri, method, params, headers, otherProps);
    }
  }

  logger.log(`Engine default dataSource does not support type:[${type}] dataSource request!`, options);
}
```

##### 6.2.2 DataHelper 类 (第 47-309 行)

**构造函数** (第 87-95 行):

```typescript
constructor(comp: any, config: DataSource, appHelper: IRendererAppHelper, parser: any) {
  this.host = comp;
  this.config = config || {};
  this.parser = parser;
  this.ajaxList = config?.list || [];
  this.ajaxMap = transformArrayToMap(this.ajaxList, 'id');
  this.dataSourceMap = this.generateDataSourceMap();
  this.appHelper = appHelper;
}
```

**updateConfig 方法** (第 98-122 行):

```typescript
updateConfig(config = {}) {
  this.config = config as DataSource;
  this.ajaxList = (config as DataSource)?.list || [];
  const ajaxMap: any = transformArrayToMap(this.ajaxList, 'id');
  
  // 删除已经移除的接口
  Object.keys(this.ajaxMap).forEach((key) => {
    if (!ajaxMap[key]) {
      delete this.dataSourceMap[key];
    }
  });
  
  this.ajaxMap = ajaxMap;
  
  // 添加未加入到dataSourceMap中的接口
  this.ajaxList.forEach((item) => {
    if (!this.dataSourceMap[item.id]) {
      this.dataSourceMap[item.id] = {
        status: DS_STATUS.INIT,
        load: (...args: any) => {
          return this.getDataSource(item.id, ...args);
        },
      };
    }
  });
  
  return this.dataSourceMap;
}
```

**generateDataSourceMap 方法** (第 124-137 行):

```typescript
generateDataSourceMap() {
  const res: any = {};
  this.ajaxList.forEach((item) => {
    res[item.id] = {
      status: DS_STATUS.INIT,
      load: (...args: any) => {
        return this.getDataSource(item.id, ...args);
      },
    };
  });
  return res;
}
```

**getInitData 方法** (第 169-176 行):

```typescript
getInitData() {
  const initSyncData = this.getInitDataSourseConfigs();
  return this.asyncDataHandler(initSyncData).then((res) => {
    const { dataHandler } = this.config;
    return this.handleData(null, dataHandler, res, null);
  });
}
```

**getDataSource 方法** (第 178-230 行):

```typescript
getDataSource(id: string, params: any, otherOptions: any, callback: any) {
  const req = this.parser(this.ajaxMap[id]);
  const options = req.options || {};
  let callbackFn = callback;
  let otherOptionsObj = otherOptions;
  
  if (typeof otherOptions === 'function') {
    callbackFn = otherOptions;
    otherOptionsObj = {};
  }
  
  const { headers, ...otherProps } = otherOptionsObj || {};
  
  if (!req) {
    logger.warn(`getDataSource API named ${id} not exist`);
    return;
  }

  return this.asyncDataHandler([
    {
      ...req,
      options: {
        ...options,
        params:
          Array.isArray(options.params) || Array.isArray(params)
            ? params || options.params
            : {
              ...options.params,
              ...params,
            },
        headers: {
          ...options.headers,
          ...headers,
        },
        ...otherProps,
      },
    },
  ])
  .then((res: any) => {
    try {
      callbackFn && callbackFn(res && res[id]);
    } catch (e) {
      logger.error('load请求回调函数报错', e);
    }
    return res && res[id];
  })
  .catch((err) => {
    try {
      callbackFn && callbackFn(null, err);
    } catch (e) {
      logger.error('load请求回调函数报错', e);
    }
    return err;
  });
}
```

**asyncDataHandler 方法** (第 232-279 行):

```typescript
asyncDataHandler(asyncDataList: any[]) {
  return new Promise((resolve, reject) => {
    const allReq: any[] = [];
    asyncDataList.forEach((req) => {
      const { id, type } = req;
      if (!id || !type || type === 'legao') {
        return;
      }
      allReq.push(req);
    });

    if (allReq.length === 0) {
      resolve({});
    }
    
    const res: any = {};
    Promise.all(
      allReq.map((item: any) => {
        return new Promise((innerResolve) => {
          const { type, id, dataHandler, options } = item;

          const fetchHandler = (data: any, error: any) => {
            res[id] = this.handleData(id, dataHandler, data, error);
            this.updateDataSourceMap(id, res[id], error);
            innerResolve({});
          };

          const doFetch = (innerType: string, innerOptions: any) => {
            doRequest(innerType as any, innerOptions)
              ?.then((data: any) => {
                fetchHandler(data, undefined);
              })
              .catch((err: Error) => {
                fetchHandler(undefined, err);
              });
          };

          this.dataSourceMap[id].status = DS_STATUS.LOADING;
          doFetch(type, options);
        });
      }),
    ).then(() => {
      resolve(res);
    }).catch((e) => {
      reject(e);
    });
  });
}
```

**handleData 方法** (第 291-308 行):

```typescript
handleData(id: string | null, dataHandler: any, data: any, error: any) {
  let dataHandlerFun = dataHandler;
  if (isJSFunction(dataHandler)) {
    dataHandlerFun = transformStringToFunction(dataHandler.value);
  }
  if (!dataHandlerFun || typeof dataHandlerFun !== 'function') {
    return data;
  }
  try {
    return dataHandlerFun.call(this.host, data, error);
  } catch (e) {
    if (id) {
      logger.error(`[${id}]单个请求数据处理函数运行出错`, e);
    } else {
      logger.error('请求数据处理函数运行出错', e);
    }
  }
}
```

---

#### 6.3 循环判断工具 (is-use-loop.ts)

**文件**: [`src/utils/is-use-loop.ts`](packages/renderer-core/src/utils/is-use-loop.ts:1)

判断是否应该使用循环渲染：

```typescript
export default function isUseLoop(
  loop: null | any[] | IPublicTypeJSExpression, 
  isDesignMode: boolean
): boolean {
  if (isJSExpression(loop)) {
    return true;
  }

  if (!isDesignMode) {
    return true;
  }

  if (!Array.isArray(loop)) {
    return false;
  }

  return loop.length > 0;
}
```

**规则**:
- 如果 loop 是 JSExpression，始终使用循环
- 如果是渲染模式，始终使用循环
- 如果是设计模式，只有当 loop 是数组且长度大于 0 时才使用循环

---

#### 6.4 请求工具 (request.ts)

**文件**: [`src/utils/request.ts`](packages/renderer-core/src/utils/request.ts:1)

提供 HTTP 请求功能（具体实现略）。

**主要函数**:
- `request(url, method, data, headers, options)`: 通用请求
- `get(url, params, headers, options)`: GET 请求
- `post(url, params, headers, options)`: POST 请求
- `jsonp(url, params, options)`: JSONP 请求

---

### 7. 类型定义 (types)

**文件**: [`src/types/index.ts`](packages/renderer-core/src/types/index.ts:1)

提供完整的 TypeScript 类型定义。

#### 7.1 渲染器相关

**IRendererProps** (第 96-182 行): 渲染器属性

```typescript
export interface IRendererProps {
  schema: IPublicTypeRootSchema | IPublicTypeNodeSchema;
  components: Record<string, IGeneralComponent>;
  className?: string;
  style?: CSSProperties;
  id?: string | number;
  locale?: string;
  messages?: Record<string, any>;
  appHelper?: IRendererAppHelper;
  componentsMap?: { [key: string]: any };
  designMode?: string;
  suspended?: boolean;
  onCompGetRef?: (schema: IPublicTypeNodeSchema, ref: any) => void;
  onCompGetCtx?: (schema: IPublicTypeNodeSchema, ref: any) => void;
  getSchemaChangedSymbol?: () => boolean;
  setSchemaChangedSymbol?: (symbol: boolean) => void;
  customCreateElement?: (Component: any, props: any, children: any) => any;
  rendererName?: 'LowCodeRenderer' | 'PageRenderer' | string;
  notFoundComponent?: IGeneralComponent;
  faultComponent?: IGeneralComponent;
  faultComponentMap?: {
    [prop: string]: IGeneralComponent;
  };
  device?: string;
  thisRequiredInJSE?: boolean;
  enableStrictNotFoundMode?: boolean;
}
```

**IBaseRendererProps** (第 192-217 行): 基础渲染器属性

**IBaseRendererInstance** (第 280-315 行): 基础渲染器实例接口

**IBaseRenderComponent** (第 317-322 行): 基础渲染器组件接口

**IRenderComponent** (第 324-342 行): 渲染器组件接口

#### 7.2 运行时相关

**IRuntime** (第 252-260 行): 运行时接口

```typescript
export interface IRuntime {
  [key: string]: any;
  Component: IGeneralConstructor;
  PureComponent: IGeneralConstructor;
  createElement: (...args: any) => any;
  createContext: (...args: any) => any;
  forwardRef: (...args: any) => any;
  findDOMNode: (...args: any) => any;
}
```

**IRendererModules** (第 262-270 行): 渲染器模块集合

#### 7.3 应用辅助

**IRendererAppHelper** (第 62-89 行): 应用辅助工具

```typescript
export type IRendererAppHelper = Partial<{
  utils: Record<string, any>;
  constants: Record<string, any>;
  location: ILocationLike;
  history: IHistoryLike;
  match: any;
  logParams: Record<string, any>;
  addons: Record<string, any>;
  requestHandlersMap: Record<string, RequestHandler<{
    data: unknown;
  }>>;
}>;
```

#### 7.4 数据源相关

**DataSource** (第 247-250 行): 数据源配置

**DataSourceItem** (第 231-245 行): 数据源项配置

#### 7.5 其他

**ISchema** (第 5 行): Schema 类型

**INodeInfo** (第 219-224 行): 节点信息

---

## 核心概念

### 1. Schema（模型结构）

Schema 是低代码协议的核心数据结构，描述了组件的完整信息：

```typescript
{
  componentName: 'Page',      // 组件名称
  props: { ... },             // 组件属性
  children: [ ... ],           // 子组件
  state: { ... },             // 组件状态
  lifeCycles: { ... },        // 生命周期
  dataSource: { ... },         // 数据源配置
  css: '...',                 // CSS 样式
  fileName: '...',            // 文件名
  id: '...',                  // 组件 ID
  condition: true,             // 条件渲染
  hidden: false,              // 隐藏状态
  loop: [ ... ],              // 循环渲染
  loopArgs: ['item', 'index'] // 循环参数
}
```

### 2. 设计模式

渲染器支持三种设计模式：

- **preview**: 预览模式，正常渲染
- **design**: 设计模式，支持可视化编辑
- **live**: 实时模式

### 3. 上下文

渲染器提供多层次的上下文：

- **pageContext**: 页面级上下文
- **compContext**: 组件级上下文
- **blockContext**: 区块级上下文

### 4. 生命周期

支持完整的 React 生命周期：

- `constructor`: 构造函数
- `getDerivedStateFromProps`: 从 props 派生状态
- `componentDidMount`: 组件挂载
- `getSnapshotBeforeUpdate`: 更新前快照
- `componentDidUpdate`: 组件更新
- `componentWillUnmount`: 组件卸载
- `componentDidCatch`: 错误捕获

### 5. 数据源

支持完整的数据源管理：

```typescript
{
  list: [
    {
      id: 'user',
      isInit: true,
      type: 'fetch',
      options: {
        uri: '/api/user',
        method: 'GET',
        params: { ... },
        willFetch: 'this.willFetch',
        didFetch: 'this.didFetch'
      },
      dataHandler: 'this.handleData'
    }
  ]
}
```

---

## 使用示例

### 基本使用

```typescript
import { rendererFactory } from '@alilc/lowcode-renderer-core';
import React from 'react';
import ReactDOM from 'react-dom';

const Renderer = rendererFactory();

const schema = {
  componentName: 'Page',
  props: {
    title: 'My Page'
  },
  children: [
    {
      componentName: 'Div',
      props: {
        style: { color: 'red' }
      },
      children: 'Hello World'
    }
  ]
};

const components = {
  Page: ({ children, title }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
  Div: ({ children, style }) => <div style={style}>{children}</div>
};

ReactDOM.render(
  <Renderer
    schema={schema}
    components={components}
  />,
  document.getElementById('root')
);
```

### 使用数据源

```typescript
const schema = {
  componentName: 'Page',
  dataSource: {
    list: [
      {
        id: 'user',
        isInit: true,
        type: 'fetch',
        options: {
          uri: '/api/user',
          method: 'GET'
        }
      }
    ]
  },
  state: {
    userInfo: {}
  },
  lifeCycles: {
    componentDidMount: {
      type: 'JSFunction',
      value: 'async function componentDidMount() { const data = await this.dataSourceMap.user.load(); this.setState({ userInfo: data }); }'
    }
  }
};
```

### 使用国际化

```typescript
const schema = {
  componentName: 'Page',
  props: {
    title: {
      type: 'i18n',
      key: 'page.title',
      use: 'zh-CN'
    }
  }
};

const messages = {
  'zh-CN': {
    'page.title': '我的页面'
  },
  'en-US': {
    'page.title': 'My Page'
  }
};

ReactDOM.render(
  <Renderer
    schema={schema}
    components={components}
    locale="zh-CN"
    messages={messages}
  />,
  document.getElementById('root')
);
```

### 使用 JSExpression

```typescript
const schema = {
  componentName: 'Page',
  state: {
    count: 0
  },
  children: [
    {
      componentName: 'Div',
      props: {
        text: {
          type: 'JSExpression',
          value: 'this.state.count'
        }
      },
      children: {
        type: 'JSExpression',
        value: '`Count: ${this.state.count}`'
      }
    }
  ]
};
```

### 使用循环渲染

```typescript
const schema = {
  componentName: 'Page',
  state: {
    items: ['Apple', 'Banana', 'Orange']
  },
  children: [
    {
      componentName: 'Div',
      loop: {
        type: 'JSExpression',
        value: 'this.state.items'
      },
      loopArgs: ['item', 'index'],
      children: {
        type: 'JSExpression',
        value: '${index + 1}. ${item}'
      }
    }
  ]
};
```

---

## API 参考

### Renderer 组件属性

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| schema | `IPublicTypeRootSchema` | 是 | - | 低代码协议的 Schema |
| components | `Record<string, IGeneralComponent>` | 是 | {} | 组件依赖映射 |
| designMode | `string` | 否 | '' | 设计模式 |
| locale | `string` | 否 | - | 语言 |
| messages | `Record<string, any>` | 否 | - | 国际化语料 |
| appHelper | `IRendererAppHelper` | 否 | - | 应用辅助工具 |
| className | `string` | 否 | - | CSS 类名 |
| style | `CSSProperties` | 否 | - | 样式 |
| suspended | `boolean` | 否 | false | 是否挂起渲染 |
| onCompGetRef | `(schema, ref) => void` | 否 | - | 组件获取 ref 回调 |
| onCompGetCtx | `(schema, ctx) => void` | 否 | - | 组件获取 ctx 回调 |
| notFoundComponent | `IGeneralComponent` | 否 | - | 未找到组件 |
| faultComponent | `IGeneralComponent` | 否 | - | 错误组件 |
| device | `string` | 否 | - | 设备类型 |
| thisRequiredInJSE | `boolean` | 否 | true | JSExpression 是否必须使用 this |
| enableStrictNotFoundMode | `boolean` | 否 | false | 是否启用严格未找到模式 |

### 应用辅助工具 (appHelper)

```typescript
{
  utils: Record<string, any>,      // 全局工具函数
  constants: Record<string, any>,  // 全局常量
  location: ILocationLike,         // 路由 location
  history: IHistoryLike,           // 路由 history
  match: any,                      // 路由 match
  requestHandlersMap: Record<string, RequestHandler>  // 请求处理器映射
}
```

---

## 高级特性

### 1. 最小渲染单元优化

渲染器支持最小渲染单元优化，当组件属性变化时，只重新渲染受影响的最小单元，而不是整个组件树。

**配置方式**:
在组件元数据中设置 `isMinimalRenderUnit: true`

### 2. 组件缓存

渲染器会缓存组件实例和状态，避免不必要的重新创建和渲染。

### 3. 错误边界

渲染器内置错误边界，能够捕获组件渲染错误并显示友好的错误提示。

### 4. 设计模式支持

在设计模式下，渲染器会：
- 为每个组件添加 leaf HOC
- 监听组件变化事件
- 提供可视化编辑支持
- 显示虚拟 DOM 占位符

### 5. 数据源引擎

支持使用 `@alilc/lowcode-datasource-engine` 进行高级数据源管理。

---

## 依赖关系

### 核心依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
- `@alilc/lowcode-datasource-engine`: 数据源引擎

### 其他依赖

- `react`: React 框架
- `classnames`: CSS 类名工具
- `lodash`: 工具库
- `intl-messageformat`: 国际化支持
- `prop-types`: 属性类型检查
- `debug`: 调试工具

---

## 注意事项

1. **Schema 验证**: 渲染器会验证 Schema 的有效性，确保组件名称和属性正确
2. **生命周期**: 自定义生命周期方法必须在 Schema 的 `lifeCycles` 中定义
3. **数据源**: 数据源配置必须符合低代码协议规范
4. **设计模式**: 设计模式下会自动添加额外的 HOC，可能影响性能
5. **错误处理**: 建议在生产环境中配置自定义的错误组件
6. **性能优化**: 对于大型应用，建议启用最小渲染单元优化
7. **国际化**: 国际化语料必须符合 `IntlMessageFormat` 规范

---

## 相关文档

- [低代码搭建协议](https://lowcode-engine.cn/lowcode)
- [低代码引擎文档](https://lowcode-engine.cn/)
- [React 文档](https://reactjs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

---

## 更新日志

### 1.3.2
- 优化渲染性能
- 增强错误处理
- 改进国际化支持

---

## 许可证

MIT
