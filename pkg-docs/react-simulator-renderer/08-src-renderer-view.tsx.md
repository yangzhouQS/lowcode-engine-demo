# src/renderer-view.tsx 文档

## 文件路径

`packages/react-simulator-renderer/src/renderer-view.tsx`

## 功能概述

该文件定义了模拟器渲染器的 React 视图组件，负责在模拟器环境中渲染低代码组件。它包含多个组件：`SimulatorRendererView`（主视图）、`Routes`（路由管理）、`Layout`（布局容器）、`Renderer`（渲染器）。

## 主要功能

1. **React.cloneElement 补丁**: 修复 React cloneElement 导致的 ref 丢失问题
2. **路由管理**: 使用 react-router 管理多页面路由
3. **布局容器**: 支持自定义布局组件
4. **组件渲染**: 渲染低代码 Schema 为 React 组件
5. **设备适配**: 支持不同设备和设计模式的适配
6. **占位容器**: 为空容器提供占位符
7. **性能监控**: 记录渲染时间和节点数量
8. **国际化支持**: 支持多语言切换

## 代码分析

### 导入部分（第 1-13 行）

```typescript
import { ReactInstance, Fragment, Component, createElement } from 'react';
import { Router, Route, Switch } from 'react-router';
import cn from 'classnames';
import { Node } from '@alilc/lowcode-designer';
import LowCodeRenderer from '@alilc/lowcode-react-renderer';
import { observer } from 'mobx-react';
import { getClosestNode, isFromVC, isReactComponent } from '@alilc/lowcode-utils';
import { GlobalEvent } from '@alilc/lowcode-types';
import { SimulatorRendererContainer, DocumentInstance } from './renderer';
import { host } from './host';
import { isRendererDetached } from './utils/misc';
import './renderer.less';
import { createIntl } from './locale';
```

**导入说明**:
- `ReactInstance, Fragment, Component, createElement`: React 核心类型和组件
- `Router, Route, Switch`: React Router 路由组件
- `cn`: classnames 工具，用于条件类名
- `Node`: 节点类型
- `LowCodeRenderer`: 低代码渲染器
- `observer`: MobX 观察者装饰器
- `getClosestNode, isFromVC, isReactComponent`: 工具函数
- `GlobalEvent`: 全局事件类型
- `SimulatorRendererContainer, DocumentInstance`: 核心类
- `host`: 模拟器宿主
- `isRendererDetached`: 检查渲染器是否分离
- `./renderer.less`: 样式文件
- `createIntl`: 国际化工具

### React.cloneElement 补丁（第 15-47 行）

```typescript
// patch cloneElement avoid lost keyProps
const originCloneElement = window.React.cloneElement;
(window as any).React.cloneElement = (child: any, { _leaf, ...props }: any = {}, ...rest: any[]) => {
  if (child.ref && props.ref) {
    const dRef = props.ref;
    const cRef = child.ref;
    props.ref = (x: any) => {
      if (cRef) {
        if (typeof cRef === 'function') {
          cRef(x);
        } else {
          try {
            cRef.current = x;
          } catch (e) {
            console.error(e);
          }
        }
      }
      if (dRef) {
        if (typeof dRef === 'function') {
          dRef(x);
        } else {
          try {
            dRef.current = x;
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
  }
  return originCloneElement(child, props, ...rest);
};
```

**功能说明**:
- 修复 React cloneElement 导致的 ref 丢失问题
- 当子元素和 props 都有 ref 时，合并两个 ref
- 支持函数 ref 和对象 ref 两种形式
- 过滤掉 `_leaf` 属性，不传递给子元素

**实现细节**:
1. 保存原始的 `cloneElement` 方法
2. 重写 `window.React.cloneElement`
3. 检查 child 和 props 是否都有 ref
4. 创建合并的 ref 函数，依次调用两个 ref
5. 过滤掉 `_leaf` 属性
6. 调用原始的 `cloneElement` 方法

### SimulatorRendererView 组件（第 49-60 行）

```typescript
export default class SimulatorRendererView extends Component<{ rendererContainer: SimulatorRendererContainer }> {
  render() {
    const { rendererContainer } = this.props;
    return (
      <Router history={rendererContainer.history}>
        <Layout rendererContainer={rendererContainer}>
          <Routes rendererContainer={rendererContainer} />
        </Layout>
      </Router>
    );
  }
}
```

**功能说明**:
- 模拟器渲染器的主视图组件
- 使用 Router 包裹整个应用
- 使用 Layout 作为布局容器
- 使用 Routes 管理路由

**Props**:
- `rendererContainer: SimulatorRendererContainer`: 渲染器容器实例

### Routes 组件（第 62-80 行）

```typescript
@observer
export class Routes extends Component<{ rendererContainer: SimulatorRendererContainer }> {
  render() {
    const { rendererContainer } = this.props;
    return (
      <Switch>
        {rendererContainer.documentInstances.map((instance) => {
          return (
            <Route
              path={instance.path}
              key={instance.id}
              render={(routeProps) => <Renderer documentInstance={instance} rendererContainer={rendererContainer} {...routeProps} />}
            />
          );
        })}
      </Switch>
    );
  }
}
```

**功能说明**:
- 使用 @observer 装饰器，响应式渲染
- 遍历所有文档实例，为每个文档创建一个路由
- 使用 Switch 确保只匹配一个路由
- 将路由 props 传递给 Renderer 组件

**Props**:
- `rendererContainer: SimulatorRendererContainer`: 渲染器容器实例

### 辅助函数（第 81-99 行）

```typescript
function ucfirst(s: string) {
  return s.charAt(0).toUpperCase() + s.substring(1);
}
function getDeviceView(view: any, device: string, mode: string) {
  if (!view || typeof view === 'string') {
    return view;
  }

  // compatible vision Mobile | Preview
  device = ucfirst(device);
  if (device === 'Mobile' && view.hasOwnProperty(device)) {
    view = view[device];
  }
  mode = ucfirst(mode);
  if (mode === 'Preview' && view.hasOwnProperty(mode)) {
    view = view[mode];
  }
  return view;
}
```

**功能说明**:
- `ucfirst`: 将字符串首字母大写
- `getDeviceView`: 获取设备适配的视图
  - 支持 Mobile 和 Preview 两种适配模式
  - 兼容旧的视觉设计

### Layout 组件（第 101-126 行）

```typescript
@observer
class Layout extends Component<{ rendererContainer: SimulatorRendererContainer }> {
  render() {
    const { rendererContainer, children } = this.props;
    const { layout } = rendererContainer;
    if (layout) {
      const { Component, props, componentName } = layout;
      if (Component) {
        return <Component key="layout" props={props}>{children}</Component>;
      }
      if (componentName && rendererContainer.getComponent(componentName)) {
        return createElement(
          rendererContainer.getComponent(componentName),
          {
            ...props,
            rendererContainer,
            key: 'layout',
          },
          [children],
        );
      }
    }

    return <Fragment>{children}</Fragment>;
  }
}
```

**功能说明**:
- 使用 @observer 装饰器，响应式渲染
- 支持自定义布局组件
- 可以通过 Component 或 componentName 指定布局
- 如果没有布局，直接渲染子元素

**Props**:
- `rendererContainer: SimulatorRendererContainer`: 渲染器容器实例
- `children`: 子元素

### Renderer 组件（第 128-270 行）

```typescript
@observer
class Renderer extends Component<{
  rendererContainer: SimulatorRendererContainer;
  documentInstance: DocumentInstance;
}> {
  startTime: number | null = null;
  schemaChangedSymbol = false;

  componentDidUpdate() {
    this.recordTime();
  }

  recordTime() {
    if (this.startTime) {
      const time = Date.now() - this.startTime;
      const nodeCount = host.designer.currentDocument?.getNodeCount?.();
      host.designer.editor?.eventBus.emit(GlobalEvent.Node.Rerender, {
        componentName: 'Renderer',
        type: 'All',
        time,
        nodeCount,
      });
    }
  }

  componentDidMount() {
    this.recordTime();
  }

  getSchemaChangedSymbol = () => {
    return this.schemaChangedSymbol;
  };

  setSchemaChangedSymbol = (symbol: boolean) => {
    this.schemaChangedSymbol = symbol;
  };

  render() {
    const { documentInstance, rendererContainer: renderer } = this.props;
    const { container, document } = documentInstance;
    const { designMode, device, locale } = container;
    const messages = container.context?.utils?.i18n?.messages || {};
    this.startTime = Date.now();
    this.schemaChangedSymbol = false;

    if (!container.autoRender || isRendererDetached()) {
      return null;
    }

    const { intl } = createIntl(locale);

    return (
      <LowCodeRenderer
        locale={locale}
        messages={messages}
        schema={documentInstance.schema}
        components={container.components}
        appHelper={container.context}
        designMode={designMode}
        device={device}
        documentId={document.id}
        suspended={renderer.suspended}
        self={renderer.scope}
        getSchemaChangedSymbol={this.getSchemaChangedSymbol}
        setSchemaChangedSymbol={this.setSchemaChangedSymbol}
        getNode={(id: string) => documentInstance.getNode(id) as Node}
        rendererName="PageRenderer"
        thisRequiredInJSE={host.thisRequiredInJSE}
        notFoundComponent={host.notFoundComponent}
        faultComponent={host.faultComponent}
        faultComponentMap={host.faultComponentMap}
        customCreateElement={(Component: any, props: any, children: any) => {
          const { __id, ...viewProps } = props;
          viewProps.componentId = __id;
          const leaf = documentInstance.getNode(__id) as Node;
          if (isFromVC(leaf?.componentMeta)) {
            viewProps._leaf = leaf.internalToShellNode();
          }
          viewProps._componentName = leaf?.componentName;
          // 如果是容器 && 无children && 高宽为空 增加一个占位容器，方便拖动
          if (
            !viewProps.dataSource &&
            leaf?.isContainer() &&
            (children == null || (Array.isArray(children) && !children.length)) &&
            (!viewProps.style || Object.keys(viewProps.style).length === 0)
          ) {
            let defaultPlaceholder = intl('Drag and drop components or templates here');
            const lockedNode = getClosestNode(leaf, (node) => {
              return node?.getExtraProp('isLocked')?.getValue() === true;
            });
            if (lockedNode) {
              defaultPlaceholder = intl('Locked elements and child elements cannot be edited');
            }
            children = (
              <div className={cn('lc-container-placeholder', { 'lc-container-locked': !!lockedNode })} style={viewProps.placeholderStyle}>
                {viewProps.placeholder || defaultPlaceholder}
              </div>
            );
          }
          if (viewProps._componentName === 'a') {
            delete viewProps.href;
          }
          // FIXME: 渲染仍有问题
          if (viewProps._componentName === 'Menu') {
            Object.assign(viewProps, {
              _componentName: 'Menu',
              className: '_css_pesudo_menu_kbrzyh0f',
              context: { VE: (window as any).VisualEngine },
              direction: undefined,
              events: { ignored: true },
              fieldId: 'menu_kbrzyh0f',
              footer: '',
              header: '',
              mode: 'inline',
              onItemClick: { ignored: true },
              onSelect: { ignored: true },
              popupAlign: 'follow',
              selectMode: false,
              triggerType: 'click',
            });
          }

          if (!isReactComponent(Component)) {
            console.error(`${viewProps._componentName} is not a react component!`);
            return null;
          }

          return createElement(
            getDeviceView(Component, device, designMode),
            viewProps,
            leaf?.isContainer() ? (children == null ? [] : Array.isArray(children) ? children : [children]) : children,
          );
        }}
        __host={host}
        __container={container}
        onCompGetRef={(schema: any, ref: ReactInstance | null) => {
          documentInstance.mountInstance(schema.id, ref);
        }}
        enableStrictNotFoundMode={host.enableStrictNotFoundMode}
      />
    );
  }
}
```

**功能说明**:
- 使用 @observer 装饰器，响应式渲染
- 记录渲染时间和节点数量
- 渲染 LowCodeRenderer 组件
- 提供自定义 createElement 方法
- 为空容器添加占位符
- 处理特殊组件（如 Menu）
- 检查组件是否为 React 组件

**Props**:
- `rendererContainer: SimulatorRendererContainer`: 渲染器容器实例
- `documentInstance: DocumentInstance`: 文档实例

**属性**:
- `startTime: number | null`: 渲染开始时间
- `schemaChangedSymbol: boolean`: Schema 变化标志

**方法**:
- `recordTime()`: 记录渲染时间并触发事件
- `getSchemaChangedSymbol()`: 获取 Schema 变化标志
- `setSchemaChangedSymbol(symbol: boolean)`: 设置 Schema 变化标志

**customCreateElement 实现细节**:
1. 提取 `__id` 属性，设置 `componentId`
2. 获取节点信息，设置 `_leaf` 和 `_componentName`
3. 为空容器添加占位符
4. 检查是否为锁定节点
5. 处理特殊组件（如 Menu、a 标签）
6. 检查组件是否为 React 组件
7. 使用设备适配的视图进行渲染

## 使用示例

### 基本使用

```typescript
import SimulatorRendererView from './renderer-view';
import renderer from './renderer';

ReactDOM.render(
  <SimulatorRendererView rendererContainer={renderer} />,
  document.getElementById('app')
);
```

### 自定义布局

```typescript
const CustomLayout = ({ children }) => (
  <div className="custom-layout">
    <header>Header</header>
    <main>{children}</main>
    <footer>Footer</footer>
  </div>
);

renderer.layout = {
  Component: CustomLayout,
  props: {},
};
```

## 注意事项

1. **React.cloneElement 补丁**: 该补丁是全局的，会影响所有使用 cloneElement 的代码
2. **性能监控**: 每次渲染都会记录时间和节点数量，可能影响性能
3. **占位容器**: 空容器会自动添加占位符，可能影响布局
4. **特殊组件**: Menu 组件有特殊处理，可能不适用于所有场景
5. **设备适配**: 设备适配依赖于组件的特定属性，需要组件支持
6. **国际化**: 占位符文本支持国际化，需要配置语言包

## 相关文件

- **[`renderer.ts`](06-src-renderer.ts.md)**: 核心渲染器实现
- **[`host.ts`](07-src-host.ts.md)**: 模拟器宿主
- **[`renderer.less`](09-src-renderer.less.md)**: 样式文件
- **[`locale/index.ts`](17-src-locale-index.ts.md)**: 国际化工具

## 设计模式

### 观察者模式

使用 @observer 装饰器，使组件响应式渲染：

```typescript
@observer
class Renderer extends Component {
  // ...
}
```

### 工厂模式

使用 customCreateElement 作为组件创建工厂：

```typescript
customCreateElement={(Component, props, children) => {
  // 自定义创建逻辑
  return createElement(Component, props, children);
}}
```

### 策略模式

根据设备和设计模式选择不同的视图：

```typescript
function getDeviceView(view, device, mode) {
  // 根据设备和模式返回不同的视图
  return view[device] || view[mode] || view;
}
```

## 最佳实践

1. **性能优化**: 避免在 render 方法中进行复杂的计算
2. **错误处理**: 在 customCreateElement 中检查组件是否为 React 组件
3. **国际化**: 所有用户可见的文本都应该支持国际化
4. **占位符**: 为空容器提供有意义的占位符
5. **设备适配**: 确保组件在不同设备上都能正常显示

## 总结

`renderer-view.tsx` 是模拟器渲染器的 React 视图组件，它提供了完整的渲染能力，包括路由管理、布局容器、组件渲染、设备适配、占位容器、性能监控等功能。该文件使用了多种设计模式，代码结构清晰，功能完整。

主要特点：
- **完整性**: 提供了完整的渲染能力
- **灵活性**: 支持自定义布局和组件创建
- **响应式**: 使用 MobX 实现响应式渲染
- **性能监控**: 记录渲染时间和节点数量
- **国际化**: 支持多语言切换
- **设备适配**: 支持不同设备的适配
