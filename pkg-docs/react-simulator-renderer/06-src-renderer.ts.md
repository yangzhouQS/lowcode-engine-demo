# src/renderer.ts 文档

## 文件信息

- **文件路径**: [`packages/react-simulator-renderer/src/renderer.ts`](packages/react-simulator-renderer/src/renderer.ts)
- **文件类型**: TypeScript 核心实现文件
- **代码行数**: 637 行

## 功能概述

`src/renderer.ts` 是 React Simulator Renderer 模块的核心实现文件，包含了渲染器的所有主要逻辑。该文件定义了两个核心类：`DocumentInstance` 和 `SimulatorRendererContainer`，以及多个辅助函数。

## 主要类和函数

### 1. DocumentInstance 类

**职责**: 管理单个文档的渲染状态和组件实例

**核心属性**:
- `instancesMap`: 组件实例映射表
- `schema`: 文档的渲染 schema
- `components`: 组件集合
- `context`: 应用上下文
- `designMode`: 设计模式
- `device`: 设备类型
- `componentsMap`: 组件元数据映射

**核心方法**:
- `mountInstance()`: 挂载组件实例
- `unmountInstance()`: 卸载组件实例
- `getNode()`: 获取节点
- `dispose()`: 销毁实例

### 2. SimulatorRendererContainer 类

**职责**: 渲染器容器，管理整个模拟器的渲染逻辑

**核心属性**:
- `isSimulatorRenderer`: 标识符
- `history`: 内存路由
- `documentInstances`: 文档实例数组
- `layout`: 布局配置
- `components`: 组件映射表
- `context`: 应用上下文
- `designMode`: 设计模式
- `device`: 设备类型
- `locale`: 语言环境
- `autoRender`: 自动渲染标志
- `autoRepaintNode`: 自动重绘节点标志

**核心方法**:
- `load()`: 加载资源
- `getComponent()`: 获取组件
- `createComponent()`: 创建低代码组件
- `run()`: 启动渲染器
- `rerender()`: 刷新渲染器
- `dispose()`: 销毁渲染器

### 3. 辅助函数

- `getClosestNodeInstance()`: 获取最近的节点实例
- `getNodeInstance()`: 从 Fiber 节点获取实例
- `checkInstanceMounted()`: 检查实例是否已挂载
- `getLowCodeComponentProps()`: 获取低代码组件属性

## 代码结构分析

### 第 1-31 行：导入语句

```typescript
import React, { createElement, ReactInstance } from 'react';
import { render as reactRender } from 'react-dom';
import { host } from './host';
import SimulatorRendererView from './renderer-view';
import { computed, observable as obx, untracked, makeObservable, configure } from 'mobx';
import { getClientRects } from './utils/get-client-rects';
import { reactFindDOMNodes, getReactInternalFiber } from './utils/react-find-dom-nodes';
import {
  Asset,
  isElement,
  cursor,
  setNativeSelection,
  buildComponents,
  getSubComponent,
  compatibleLegaoSchema,
  isPlainObject,
  AssetLoader,
  getProjectUtils,
} from '@alilc/lowcode-utils';
import { IPublicTypeComponentSchema, IPublicEnumTransformStage, IPublicTypeNodeInstance, IPublicTypeProjectSchema } from '@alilc/lowcode-types';
import { BuiltinSimulatorRenderer, Component, IDocumentModel, INode } from '@alilc/lowcode-designer';
import LowCodeRenderer from '@alilc/lowcode-react-renderer';
import { createMemoryHistory, MemoryHistory } from 'history';
import Slot from './builtin-components/slot';
import Leaf from './builtin-components/leaf';
import { withQueryParams, parseQuery } from './utils/url';
import { merge } from 'lodash';
```

**说明**:
- 导入 React 相关模块
- 导入 MobX 状态管理
- 导入工具函数
- 导入类型定义
- 导入低代码核心模块

**设计考虑**:
- 清晰的依赖管理
- 类型安全
- 模块化设计

### 第 30-31 行：初始化

```typescript
const loader = new AssetLoader();
configure({ enforceActions: 'never' });
```

**说明**:
- 创建资源加载器实例
- 配置 MobX 不强制使用 action

**设计考虑**:
- 资源加载器单例
- 灵活的 MobX 配置

### 第 33-184 行：DocumentInstance 类

```typescript
export class DocumentInstance {
  instancesMap = new Map<string, ReactInstance[]>();

  get schema(): any {
    return this.document.export(IPublicEnumTransformStage.Render);
  }

  private disposeFunctions: Array<() => void> = [];

  @obx.ref private _components: any = {};

  @computed get components(): object {
    return this._components;
  }

  @obx.ref private _appContext = {};

  @computed get context(): any {
    return this._appContext;
  }

  @obx.ref private _designMode = 'design';

  @computed get designMode(): any {
    return this._designMode;
  }

  @obx.ref private _requestHandlersMap = null;

  @computed get requestHandlersMap(): any {
    return this._requestHandlersMap;
  }

  @obx.ref private _device = 'default';

  @computed get device() {
    return this._device;
  }

  @obx.ref private _componentsMap = {};

  @computed get componentsMap(): any {
    return this._componentsMap;
  }

  @computed get suspended(): any {
    return false;
  }

  @computed get scope(): any {
    return null;
  }

  get path(): string {
    return `/${this.document.fileName}`;
  }

  get id() {
    return this.document.id;
  }

  constructor(readonly container: SimulatorRendererContainer, readonly document: IDocumentModel) {
    makeObservable(this);
  }

  private unmountInstance(id: string, instance: ReactInstance) {
    const instances = this.instancesMap.get(id);
    if (instances) {
      const i = instances.indexOf(instance);
      if (i > -1) {
        instances.splice(i, 1);
        host.setInstance(this.document.id, id, instances);
      }
    }
  }

  mountInstance(id: string, instance: ReactInstance | null) {
    const docId = this.document.id;
    const { instancesMap } = this;
    if (instance == null) {
      let instances = this.instancesMap.get(id);
      if (instances) {
        instances = instances.filter(checkInstanceMounted);
        if (instances.length > 0) {
          instancesMap.set(id, instances);
          host.setInstance(this.document.id, id, instances);
        } else {
          instancesMap.delete(id);
          host.setInstance(this.document.id, id, null);
        }
      }
      return;
    }
    const unmountInstance = this.unmountInstance.bind(this);
    const origId = (instance as any)[SYMBOL_VNID];
    if (origId && origId !== id) {
      unmountInstance(origId, instance);
    }
    if (isElement(instance)) {
      cacheReactKey(instance);
    } else if (origId !== id) {
      let origUnmount: any = instance.componentWillUnmount;
      if (origUnmount && origUnmount.origUnmount) {
        origUnmount = origUnmount.origUnmount;
      }
      const newUnmount = function (this: any) {
        unmountInstance(id, instance);
        origUnmount && origUnmount.call(this);
      };
      (newUnmount as any).origUnmount = origUnmount;
      instance.componentWillUnmount = newUnmount;
    }

    (instance as any)[SYMBOL_VNID] = id;
    (instance as any)[SYMBOL_VDID] = docId;
    let instances = this.instancesMap.get(id);
    if (instances) {
      const l = instances.length;
      instances = instances.filter(checkInstanceMounted);
      let updated = instances.length !== l;
      if (!instances.includes(instance)) {
        instances.push(instance);
        updated = true;
      }
      if (!updated) {
        return;
      }
    } else {
      instances = [instance];
    }
    instancesMap.set(id, instances);
    host.setInstance(this.document.id, id, instances);
  }

  mountContext() {
  }

  getNode(id: string): INode | null {
    return this.document.getNode(id);
  }

  dispose() {
    this.disposeFunctions.forEach(fn => fn());
    this.instancesMap = new Map();
  }
}
```

**说明**:
- 管理单个文档的渲染状态
- 维护组件实例映射表
- 处理组件的挂载和卸载
- 提供节点查询功能

**关键方法**:
- `mountInstance()`: 挂载组件实例，处理实例复用和生命周期
- `unmountInstance()`: 卸载组件实例
- `getNode()`: 根据节点 ID 获取节点

**设计考虑**:
- 使用 MobX 的响应式属性
- 使用 Symbol 标记节点 ID，避免冲突
- Hook 生命周期方法，确保实例正确清理

### 第 186-538 行：SimulatorRendererContainer 类

```typescript
export class SimulatorRendererContainer implements BuiltinSimulatorRenderer {
  readonly isSimulatorRenderer = true;
  private disposeFunctions: Array<() => void> = [];
  readonly history: MemoryHistory;

  @obx.ref private _documentInstances: DocumentInstance[] = [];
  private _requestHandlersMap: any;
  get documentInstances() {
    return this._documentInstances;
  }

  @obx private _layout: any = null;

  @computed get layout(): any {
    return this._layout;
  }

  set layout(value: any) {
    this._layout = value;
  }

  private _libraryMap: { [key: string]: string } = {};

  private _components: Record<string, React.FC | React.ComponentClass> | null = {};

  get components(): Record<string, React.FC | React.ComponentClass> {
    return this._components || {};
  }

  @obx.ref private _appContext: any = {};
  @computed get context(): any {
    return this._appContext;
  }
  @obx.ref private _designMode: string = 'design';
  @computed get designMode(): any {
    return this._designMode;
  }
  @obx.ref private _device: string = 'default';
  @computed get device() {
    return this._device;
  }
  @obx.ref private _locale: string | undefined = undefined;
  @computed get locale() {
    return this._locale;
  }
  @obx.ref private _componentsMap = {};
  @computed get componentsMap(): any {
    return this._componentsMap;
  }

  autoRender = true;

  autoRepaintNode = true;

  private _running = false;

  constructor() {
    makeObservable(this);
    this.autoRender = host.autoRender;

    this.disposeFunctions.push(host.connect(this, () => {
      this._layout = host.project.get('config').layout;

      if (this._libraryMap !== host.libraryMap
        || this._componentsMap !== host.designer.componentsMap) {
        this._libraryMap = host.libraryMap || {};
        this._componentsMap = host.designer.componentsMap;
        this.buildComponents();
      }

      this._designMode = host.designMode;

      this._locale = host.locale;

      this._requestHandlersMap = host.requestHandlersMap;

      this._device = host.device;
    }));
    const documentInstanceMap = new Map<string, DocumentInstance>();
    let initialEntry = '/';
    let firstRun = true;
    this.disposeFunctions.push(host.autorun(() => {
      this._documentInstances = host.project.documents.map((doc) => {
        let inst = documentInstanceMap.get(doc.id);
        if (!inst) {
          inst = new DocumentInstance(this, doc);
          documentInstanceMap.set(doc.id, inst);
        }
        return inst;
      });
      const path = host.project.currentDocument
        ? documentInstanceMap.get(host.project.currentDocument.id)!.path
        : '/';
      if (firstRun) {
        initialEntry = path;
        firstRun = false;
      } else if (this.history.location.pathname !== path) {
        this.history.replace(path);
      }
    }));
    const history = createMemoryHistory({
      initialEntries: [initialEntry],
    });
    this.history = history;
    history.listen((location) => {
      const docId = location.pathname.slice(1);
      docId && host.project.open(docId);
    });
    host.componentsConsumer.consume(async (componentsAsset) => {
      if (componentsAsset) {
        await this.load(componentsAsset);
        this.buildComponents();
      }
    });
    this._appContext = {
      utils: {
        router: {
          push(path: string, params?: object) {
            history.push(withQueryParams(path, params));
          },
          replace(path: string, params?: object) {
            history.replace(withQueryParams(path, params));
          },
        },
        legaoBuiltins: {
          getUrlParams() {
            const { search } = history.location;
            return parseQuery(search);
          },
        },
        i18n: {
          setLocale: (loc: string) => {
            this._appContext.utils.i18n.currentLocale = loc;
            this._locale = loc;
          },
          currentLocale: this.locale,
          messages: {},
        },
        ...getProjectUtils(this._libraryMap, host.get('utilsMetadata')),
      },
      constants: {},
      requestHandlersMap: this._requestHandlersMap,
    };

    host.injectionConsumer.consume((data) => {
      const newCtx = {
        ...this._appContext,
      };
      merge(newCtx, data.appHelper || {});
      this._appContext = newCtx;
    });

    host.i18nConsumer.consume((data) => {
      const newCtx = {
        ...this._appContext,
      };
      newCtx.utils.i18n.messages = data || {};
      this._appContext = newCtx;
    });
  }

  private buildComponents() {
    this._components = buildComponents(
        this._libraryMap,
        this._componentsMap,
        this.createComponent.bind(this),
      );
    this._components = {
      ...builtinComponents,
      ...this._components,
    };
  }

  load(asset: Asset): Promise<any> {
    return loader.load(asset);
  }

  async loadAsyncLibrary(asyncLibraryMap: Record<string, any>) {
    await loader.loadAsyncLibrary(asyncLibraryMap);
    this.buildComponents();
  }

  getComponent(componentName: string) {
    const paths = componentName.split('.');
    const subs: string[] = [];

    while (true) {
      const component = this._components?.[componentName];
      if (component) {
        return getSubComponent(component, subs);
      }

      const sub = paths.pop();
      if (!sub) {
        return null;
      }
      subs.unshift(sub);
      componentName = paths.join('.');
    }
  }

  getClosestNodeInstance(from: ReactInstance, nodeId?: string): IPublicTypeNodeInstance<ReactInstance> | null {
    return getClosestNodeInstance(from, nodeId);
  }

  findDOMNodes(instance: ReactInstance): Array<Element | Text> | null {
    return reactFindDOMNodes(instance);
  }

  getClientRects(element: Element | Text) {
    return getClientRects(element);
  }

  setNativeSelection(enableFlag: boolean) {
    setNativeSelection(enableFlag);
  }

  setDraggingState(state: boolean) {
    cursor.setDragging(state);
  }

  setCopyState(state: boolean) {
    cursor.setCopy(state);
  }

  clearState() {
    cursor.release();
  }

  createComponent(schema: IPublicTypeProjectSchema<IPublicTypeComponentSchema>): Component | null {
    const _schema: IPublicTypeProjectSchema<IPublicTypeComponentSchema> = {
      ...schema,
      componentsTree: schema.componentsTree.map(compatibleLegaoSchema),
    };

    const componentsTreeSchema = _schema.componentsTree[0];

    if (componentsTreeSchema.componentName === 'Component' && componentsTreeSchema.css) {
      const doc = window.document;
      const s = doc.createElement('style');
      s.setAttribute('type', 'text/css');
      s.setAttribute('id', `Component-${componentsTreeSchema.id || ''}`);
      s.appendChild(doc.createTextNode(componentsTreeSchema.css || ''));
      doc.getElementsByTagName('head')[0].appendChild(s);
    }

    const renderer = this;

    class LowCodeComp extends React.Component<any, any> {
      render() {
        const extraProps = getLowCodeComponentProps(this.props);
        return createElement(LowCodeRenderer, {
          ...extraProps,
          schema: componentsTreeSchema,
          components: renderer.components,
          designMode: '',
          locale: renderer.locale,
          messages: _schema.i18n || {},
          device: renderer.device,
          appHelper: renderer.context,
          rendererName: 'LowCodeRenderer',
          thisRequiredInJSE: host.thisRequiredInJSE,
          faultComponent: host.faultComponent,
          faultComponentMap: host.faultComponentMap,
          customCreateElement: (Comp: any, props: any, children: any) => {
            const componentMeta = host.currentDocument?.getComponentMeta(Comp.displayName);
            if (componentMeta?.isModal) {
              return null;
            }

            const { __id, __designMode, ...viewProps } = props;
            const _leaf = {
              isEmpty: () => false,
              isMock: true,
            };
            viewProps._leaf = _leaf;
            return createElement(Comp, viewProps, children);
          },
        });
      }
    }

    return LowCodeComp;
  }

  run() {
    if (this._running) {
      return;
    }
    this._running = true;
    const containerId = 'app';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
      container.id = containerId;
    }

    document.documentElement.classList.add('engine-page');
    document.body.classList.add('engine-document');

    reactRender(createElement(SimulatorRendererView, { rendererContainer: this }), container);
    host.project.setRendererReady(this);
  }

  rerender() {
    this.autoRender = true;
    this._appContext = { ...this._appContext };
  }

  stopAutoRepaintNode() {
    this.autoRepaintNode = false;
  }

  enableAutoRepaintNode() {
    this.autoRepaintNode = true;
  }

  dispose() {
    this.disposeFunctions.forEach((fn) => fn());
    this.documentInstances.forEach((docInst) => docInst.dispose());
    untracked(() => {
      this._componentsMap = {};
      this._components = null;
      this._appContext = null;
    });
  }
}
```

**说明**:
- 渲染器容器，管理整个模拟器
- 连接主机，同步状态
- 管理文档实例
- 提供组件创建和查询
- 处理路由和导航

**关键方法**:
- `constructor()`: 初始化渲染器，连接主机，设置路由
- `buildComponents()`: 构建组件映射表
- `getComponent()`: 获取组件
- `createComponent()`: 创建低代码组件
- `run()`: 启动渲染器
- `rerender()`: 刷新渲染器
- `dispose()`: 销毁渲染器

**设计考虑**:
- 使用 MobX 的响应式属性
- 连接主机，自动同步状态
- 使用内存路由模拟页面导航
- 提供完整的生命周期管理

### 第 540-545 行：内置组件

```typescript
const builtinComponents = {
  Slot,
  Leaf,
};
```

**说明**:
- 定义内置组件
- Slot：插槽组件
- Leaf：叶子组件

### 第 547-560 行：React Key 缓存

```typescript
let REACT_KEY = '';
function cacheReactKey(el: Element): Element {
  if (REACT_KEY !== '') {
    return el;
  }
  REACT_KEY = Object.keys(el).find(
    (key) => key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber$'),
  ) || '';
  if (!REACT_KEY && (el as HTMLElement).parentElement) {
    return cacheReactKey((el as HTMLElement).parentElement!);
  }
  return el;
}
```

**说明**:
- 缓存 React 的内部属性名
- 支持 React 16 和 React 17
- 递归查找父元素

**设计考虑**:
- React 16 使用 `__reactInternalInstance$`
- React 17 使用 `__reactFiber$`
- 缓存结果避免重复查找

### 第 562-563 行：Symbol 定义

```typescript
const SYMBOL_VNID = Symbol('_LCNodeId');
const SYMBOL_VDID = Symbol('_LCDocId');
```

**说明**:
- 定义两个 Symbol
- `SYMBOL_VNID`: 标记节点 ID
- `SYMBOL_VDID`: 标记文档 ID

**设计考虑**:
- 使用 Symbol 避免属性冲突
- 确保标识符的唯一性

### 第 565-596 行：获取最近节点实例

```typescript
function getClosestNodeInstance(
    from: ReactInstance,
    specId?: string,
  ): IPublicTypeNodeInstance<ReactInstance> | null {
  let el: any = from;
  if (el) {
    if (isElement(el)) {
      el = cacheReactKey(el);
    } else {
      return getNodeInstance(getReactInternalFiber(el), specId);
    }
  }
  while (el) {
    if (SYMBOL_VNID in el) {
      const nodeId = el[SYMBOL_VNID];
      const docId = el[SYMBOL_VDID];
      if (!specId || specId === nodeId) {
        return {
          docId,
          nodeId,
          instance: el,
        };
      }
    }
    if (el[REACT_KEY]) {
      return getNodeInstance(el[REACT_KEY], specId);
    }
    el = el.parentElement;
  }
  return null;
}
```

**说明**:
- 从 React 实例或 DOM 元素查找最近的节点实例
- 支持指定节点 ID
- 遍历 DOM 树查找标记的节点

**设计考虑**:
- 支持 React 实例和 DOM 元素
- 使用 Symbol 标记识别节点
- 向上遍历 DOM 树

### 第 598-613 行：从 Fiber 获取实例

```typescript
function getNodeInstance(fiberNode: any, specId?: string): IPublicTypeNodeInstance<ReactInstance> | null {
  const instance = fiberNode?.stateNode;
  if (instance && SYMBOL_VNID in instance) {
    const nodeId = instance[SYMBOL_VNID];
    const docId = instance[SYMBOL_VDID];
    if (!specId || specId === nodeId) {
      return {
        docId,
        nodeId,
        instance,
      };
    }
  }
  if (!instance && !fiberNode?.return) return null;
  return getNodeInstance(fiberNode?.return);
}
```

**说明**:
- 从 Fiber 节点获取组件实例
- 递归遍历 Fiber 树
- 检查实例是否被标记

**设计考虑**:
- 遍历 Fiber 树查找标记的实例
- 递归向上查找
- 检查节点 ID 是否匹配

### 第 615-620 行：检查实例是否已挂载

```typescript
function checkInstanceMounted(instance: any): boolean {
  if (isElement(instance)) {
    return instance.parentElement != null && window.document.contains(instance);
  }
  return true;
}
```

**说明**:
- 检查实例是否已挂载到 DOM
- DOM 元素检查父元素和文档包含
- React 组件实例默认返回 true

**设计考虑**:
- 过滤已卸载的实例
- 避免内存泄漏
- 确保实例的有效性

### 第 622-635 行：获取低代码组件属性

```typescript
function getLowCodeComponentProps(props: any) {
  if (!props || !isPlainObject(props)) {
    return props;
  }
  const newProps: any = {};
  Object.keys(props).forEach((k) => {
    if (['children', 'componentId', '__designMode', '_componentName', '_leaf'].includes(k)) {
      return;
    }
    newProps[k] = props[k];
  });
  newProps['componentName'] = props['_componentName'];
  return newProps;
}
```

**说明**:
- 过滤低代码组件的内部属性
- 保留用户定义的属性
- 重命名 `_componentName` 为 `componentName`

**设计考虑**:
- 隐藏内部实现细节
- 提供干净的属性接口
- 避免属性冲突

### 第 637 行：默认导出

```typescript
export default new SimulatorRendererContainer();
```

**说明**:
- 导出渲染器容器的单例
- 整个应用只有一个渲染器实例

**设计考虑**:
- 单例模式确保全局唯一
- 简化模块间引用
- 统一管理状态

## 主要功能

### 1. 组件实例管理

- 挂载组件实例到映射表
- 卸载组件实例
- 过滤未挂载的实例
- Hook 生命周期方法

### 2. 文档管理

- 管理多个文档实例
- 同步文档列表
- 处理文档切换

### 3. 路由管理

- 使用内存路由
- 监听路由变化
- 同步到设计器项目

### 4. 组件创建

- 根据 schema 创建低代码组件
- 处理组件样式
- 支持组件嵌套

### 5. 状态管理

- 使用 MobX 响应式状态
- 自动同步主机状态
- 批量更新优化性能

### 6. DOM 操作

- 查找 DOM 节点
- 获取矩形区域
- 设置选择状态

### 7. 交互状态

- 拖拽状态
- 复制状态
- 清除状态

## 设计模式

### 1. 单例模式

```typescript
export default new SimulatorRendererContainer();
```

### 2. 观察者模式

```typescript
@obx.ref private _components: any = {};
@computed get components(): object {
  return this._components;
}
```

### 3. 工厂模式

```typescript
createComponent(schema: IPublicTypeProjectSchema<IPublicTypeComponentSchema>): Component | null {
  // 创建组件
}
```

### 4. 适配器模式

```typescript
function getClosestNodeInstance(from: ReactInstance, specId?: string): IPublicTypeNodeInstance<ReactInstance> | null {
  // 适配 React 实例到低代码节点
}
```

## 使用示例

### 1. 启动渲染器

```typescript
import renderer from '@alilc/lowcode-react-simulator-renderer';

renderer.run();
```

### 2. 加载组件库

```typescript
await renderer.load({
  type: 'npm',
  package: '@alifd/next',
  version: '1.23.0',
});
```

### 3. 获取组件

```typescript
const Button = renderer.getComponent('Button');
```

### 4. 查找节点实例

```typescript
const instance = renderer.getClosestNodeInstance(domElement);
```

### 5. 刷新渲染器

```typescript
renderer.rerender();
```

### 6. 销毁渲染器

```typescript
renderer.dispose();
```

## 注意事项

### 1. 实例生命周期

组件实例的挂载和卸载需要正确处理，避免内存泄漏。

### 2. Symbol 标记

使用 Symbol 标记节点 ID，确保标识符的唯一性。

### 3. MobX 响应式

使用 MobX 的响应式属性，确保状态变化时自动更新。

### 4. 路由同步

路由变化需要同步到设计器项目，保持状态一致。

## 相关文件

- [`src/host.ts`](packages/react-simulator-renderer/src/host.ts) - 主机引用
- [`src/renderer-view.tsx`](packages/react-simulator-renderer/src/renderer-view.tsx) - 视图组件
- [`src/utils/react-find-dom-nodes.ts`](packages/react-simulator-renderer/src/utils/react-find-dom-nodes.ts) - DOM 查找
- [`src/utils/get-client-rects.ts`](packages/react-simulator-renderer/src/utils/get-client-rects.ts) - 矩形计算

## 总结

`src/renderer.ts` 是 React Simulator Renderer 模块的核心实现文件，包含了渲染器的所有主要逻辑。该文件定义了两个核心类和多个辅助函数，实现了完整的渲染器功能。

**核心特性**:
1. 完整的组件实例管理
2. 多文档支持
3. 内存路由实现
4. 响应式状态管理
5. 完善的生命周期管理

**设计优势**:
- 清晰的职责划分
- 完善的类型安全
- 灵活的扩展性
- 高性能的响应式更新
