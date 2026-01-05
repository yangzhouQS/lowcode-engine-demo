# React Simulator Renderer API 设计文档

## 1. API 概述

### 1.1 模块导出

```typescript
// 默认导出：SimulatorRendererContainer 单例
export default new SimulatorRendererContainer();

// 类型导出
export class DocumentInstance { }
export class SimulatorRendererContainer implements BuiltinSimulatorRenderer { }
```

### 1.2 全局对象

```typescript
// 挂载到 window 的全局对象
(window as any).SimulatorRenderer = renderer;
(window as any).LCSimulatorHost = host;
```

## 2. SimulatorRendererContainer API

### 2.1 属性 (Properties)

#### 2.1.1 isSimulatorRenderer

**类型**: `boolean`

**描述**: 标识符，用于标识该对象是模拟器渲染器

**示例**:
```typescript
const isSimulator = renderer.isSimulatorRenderer; // true
```

#### 2.1.2 history

**类型**: `MemoryHistory`

**描述**: 内存路由历史对象，用于模拟页面导航

**示例**:
```typescript
renderer.history.push('/page1');
renderer.history.replace('/page2');
```

#### 2.1.3 documentInstances

**类型**: `DocumentInstance[]`

**描述**: 文档实例数组，包含所有已加载的文档实例

**示例**:
```typescript
const docs = renderer.documentInstances;
docs.forEach(doc => {
  console.log(doc.id, doc.path);
});
```

#### 2.1.4 layout

**类型**: `any`

**描述**: 布局配置，包含布局组件和属性

**示例**:
```typescript
const layout = renderer.layout;
// { Component: LayoutComponent, props: {...}, componentName: 'Layout' }
```

#### 2.1.5 components

**类型**: `Record<string, React.FC | React.ComponentClass>`

**描述**: 组件映射表，包含所有可用的组件

**示例**:
```typescript
const Button = renderer.components['Button'];
const Div = renderer.components['div'];
```

#### 2.1.6 context

**类型**: `any`

**描述**: 应用上下文，包含 utils、constants、i18n 等

**示例**:
```typescript
const utils = renderer.context.utils;
const router = utils.router;
router.push('/page1');
```

#### 2.1.7 designMode

**类型**: `string`

**描述**: 设计模式，通常为 'design' 或 'preview'

**示例**:
```typescript
const mode = renderer.designMode; // 'design'
```

#### 2.1.8 device

**类型**: `string`

**描述**: 设备类型，如 'default', 'mobile', 'tablet' 等

**示例**:
```typescript
const device = renderer.device; // 'default'
```

#### 2.1.9 locale

**类型**: `string | undefined`

**描述**: 语言环境，如 'zh-CN', 'en-US'

**示例**:
```typescript
const locale = renderer.locale; // 'zh-CN'
```

#### 2.1.10 componentsMap

**类型**: `any`

**描述**: 组件元数据映射，包含组件的配置信息

**示例**:
```typescript
const meta = renderer.componentsMap['Button'];
```

#### 2.1.11 autoRender

**类型**: `boolean`

**描述**: 是否自动渲染画布

**示例**:
```typescript
renderer.autoRender = true;  // 启用自动渲染
renderer.autoRender = false; // 禁用自动渲染
```

#### 2.1.12 autoRepaintNode

**类型**: `boolean`

**描述**: 是否自动监听事件来重绘节点

**示例**:
```typescript
renderer.autoRepaintNode = true;  // 启用自动重绘
renderer.autoRepaintNode = false; // 禁用自动重绘
```

#### 2.1.13 suspended

**类型**: `any`

**描述**: 挂起状态，用于控制渲染器是否挂起

**示例**:
```typescript
const suspended = renderer.suspended; // false
```

#### 2.1.14 scope

**类型**: `any`

**描述**: 作用域，用于组件渲染时的上下文

**示例**:
```typescript
const scope = renderer.scope; // null
```

### 2.2 方法 (Methods)

#### 2.2.1 load

**签名**:
```typescript
load(asset: Asset): Promise<any>
```

**描述**: 加载资源（组件库、样式等）

**参数**:
- `asset`: 资源对象，包含组件库的配置信息

**返回值**: `Promise<any>` - 加载完成后的结果

**示例**:
```typescript
const asset = {
  type: 'npm',
  package: '@alifd/next',
  version: '1.23.0',
  exportName: 'Button',
};
await renderer.load(asset);
```

**使用场景**:
- 动态加载组件库
- 加载第三方资源
- 更新组件依赖

#### 2.2.2 loadAsyncLibrary

**签名**:
```typescript
loadAsyncLibrary(asyncLibraryMap: Record<string, any>): Promise<void>
```

**描述**: 异步加载组件库

**参数**:
- `asyncLibraryMap`: 异步组件库映射表

**返回值**: `Promise<void>`

**示例**:
```typescript
const asyncLibs = {
  'MyComponent': {
    type: 'npm',
    package: 'my-component-lib',
    version: '1.0.0',
  },
};
await renderer.loadAsyncLibrary(asyncLibs);
```

**使用场景**:
- 按需加载组件
- 延迟加载大型组件库
- 优化初始加载性能

#### 2.2.3 getComponent

**签名**:
```typescript
getComponent(componentName: string): React.FC | React.ComponentClass | null
```

**描述**: 根据组件名称获取组件

**参数**:
- `componentName`: 组件名称，支持点号分隔的子组件路径

**返回值**: `React.FC | React.ComponentClass | null` - 组件类或函数组件，未找到返回 null

**示例**:
```typescript
const Button = renderer.getComponent('Button');
const FormItem = renderer.getComponent('Form.Item');
const MyComponent = renderer.getComponent('my-lib.MyComponent');
```

**使用场景**:
- 动态获取组件
- 组件实例化
- 组件测试

#### 2.2.4 getClosestNodeInstance

**签名**:
```typescript
getClosestNodeInstance(
  from: ReactInstance,
  nodeId?: string
): IPublicTypeNodeInstance<ReactInstance> | null
```

**描述**: 获取最近的节点实例

**参数**:
- `from`: React 实例或 DOM 元素
- `nodeId`: 可选，指定节点 ID

**返回值**: `IPublicTypeNodeInstance<ReactInstance> | null` - 节点实例对象

**示例**:
```typescript
const instance = renderer.getClosestNodeInstance(domElement);
const specificInstance = renderer.getClosestNodeInstance(domElement, 'node_123');
```

**使用场景**:
- 查找组件实例
- 节点定位
- 事件处理

#### 2.2.5 findDOMNodes

**签名**:
```typescript
findDOMNodes(instance: ReactInstance): Array<Element | Text> | null
```

**描述**: 查找 React 实例对应的 DOM 节点

**参数**:
- `instance`: React 实例

**返回值**: `Array<Element | Text> | null` - DOM 节点数组

**示例**:
```typescript
const domNodes = renderer.findDOMNodes(componentInstance);
if (domNodes) {
  domNodes.forEach(node => {
    console.log(node.tagName);
  });
}
```

**使用场景**:
- 获取组件 DOM
- 样式操作
- 事件绑定

#### 2.2.6 getClientRects

**签名**:
```typescript
getClientRects(element: Element | Text): DOMRect[]
```

**描述**: 获取元素的矩形区域信息

**参数**:
- `element`: DOM 元素或文本节点

**返回值**: `DOMRect[]` - 矩形区域数组

**示例**:
```typescript
const rects = renderer.getClientRects(domElement);
rects.forEach(rect => {
  console.log(rect.left, rect.top, rect.width, rect.height);
});
```

**使用场景**:
- 组件定位
- 拖拽计算
- 视觉反馈

#### 2.2.7 setNativeSelection

**签名**:
```typescript
setNativeSelection(enableFlag: boolean): void
```

**描述**: 设置原生选择状态

**参数**:
- `enableFlag`: 是否启用原生选择

**返回值**: `void`

**示例**:
```typescript
renderer.setNativeSelection(true);  // 启用原生选择
renderer.setNativeSelection(false); // 禁用原生选择
```

**使用场景**:
- 文本选择控制
- 编辑模式切换
- 用户体验优化

#### 2.2.8 setDraggingState

**签名**:
```typescript
setDraggingState(state: boolean): void
```

**描述**: 设置拖拽状态

**参数**:
- `state`: 是否正在拖拽

**返回值**: `void`

**示例**:
```typescript
renderer.setDraggingState(true);  // 开始拖拽
renderer.setDraggingState(false); // 结束拖拽
```

**使用场景**:
- 拖拽操作
- 视觉反馈
- 交互控制

#### 2.2.9 setCopyState

**签名**:
```typescript
setCopyState(state: boolean): void
```

**描述**: 设置复制状态

**参数**:
- `state`: 是否正在复制

**返回值**: `void`

**示例**:
```typescript
renderer.setCopyState(true);  // 开始复制
renderer.setCopyState(false); // 结束复制
```

**使用场景**:
- 复制操作
- 视觉反馈
- 状态管理

#### 2.2.10 clearState

**签名**:
```typescript
clearState(): void
```

**描述**: 清除所有状态（拖拽、复制等）

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
renderer.clearState();
```

**使用场景**:
- 操作完成后的清理
- 状态重置
- 异常处理

#### 2.2.11 createComponent

**签名**:
```typescript
createComponent(
  schema: IPublicTypeProjectSchema<IPublicTypeComponentSchema>
): Component | null
```

**描述**: 根据低代码 schema 创建组件

**参数**:
- `schema`: 低代码组件 schema

**返回值**: `Component | null` - React 组件类

**示例**:
```typescript
const schema = {
  componentName: 'Component',
  componentsTree: [{
    componentName: 'div',
    props: {
      className: 'my-div',
    },
    children: ['Hello World'],
  }],
};
const Component = renderer.createComponent(schema);
```

**使用场景**:
- 动态组件创建
- 低代码组件渲染
- 组件实例化

#### 2.2.12 run

**签名**:
```typescript
run(): void
```

**描述**: 启动渲染器

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
renderer.run();
```

**使用场景**:
- 初始化渲染器
- 启动应用
- 首次渲染

#### 2.2.13 rerender

**签名**:
```typescript
rerender(): void
```

**描述**: 刷新渲染器

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
renderer.rerender();
```

**使用场景**:
- 强制刷新
- 配置更新后重渲染
- 调试和测试

#### 2.2.14 stopAutoRepaintNode

**签名**:
```typescript
stopAutoRepaintNode(): void
```

**描述**: 停止自动重绘节点

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
renderer.stopAutoRepaintNode();
```

**使用场景**:
- 性能优化
- 批量操作
- 避免频繁重绘

#### 2.2.15 enableAutoRepaintNode

**签名**:
```typescript
enableAutoRepaintNode(): void
```

**描述**: 启用自动重绘节点

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
renderer.enableAutoRepaintNode();
```

**使用场景**:
- 恢复自动重绘
- 操作完成后启用
- 正常模式切换

#### 2.2.16 dispose

**签名**:
```typescript
dispose(): void
```

**描述**: 销毁渲染器，清理所有资源

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
renderer.dispose();
```

**使用场景**:
- 应用卸载
- 资源清理
- 内存释放

## 3. DocumentInstance API

### 3.1 属性 (Properties)

#### 3.1.1 instancesMap

**类型**: `Map<string, ReactInstance[]>`

**描述**: 实例映射表，键为节点 ID，值为 React 实例数组

**示例**:
```typescript
const instances = docInst.instancesMap.get('node_123');
```

#### 3.1.2 schema

**类型**: `any`

**描述**: 文档的渲染 schema

**示例**:
```typescript
const schema = docInst.schema;
console.log(schema.componentName);
```

#### 3.1.3 components

**类型**: `object`

**描述**: 组件集合

**示例**:
```typescript
const components = docInst.components;
```

#### 3.1.4 context

**类型**: `any`

**描述**: 应用上下文

**示例**:
```typescript
const context = docInst.context;
```

#### 3.1.5 designMode

**类型**: `any`

**描述**: 设计模式

**示例**:
```typescript
const mode = docInst.designMode;
```

#### 3.1.6 requestHandlersMap

**类型**: `any`

**描述**: 请求处理器映射

**示例**:
```typescript
const handlers = docInst.requestHandlersMap;
```

#### 3.1.7 device

**类型**: `any`

**描述**: 设备类型

**示例**:
```typescript
const device = docInst.device;
```

#### 3.1.8 componentsMap

**类型**: `any`

**描述**: 组件元数据映射

**示例**:
```typescript
const map = docInst.componentsMap;
```

#### 3.1.9 suspended

**类型**: `any`

**描述**: 挂起状态

**示例**:
```typescript
const suspended = docInst.suspended;
```

#### 3.1.10 scope

**类型**: `any`

**描述**: 作用域

**示例**:
```typescript
const scope = docInst.scope;
```

#### 3.1.11 path

**类型**: `string`

**描述**: 文档路径

**示例**:
```typescript
const path = docInst.path; // '/page1'
```

#### 3.1.12 id

**类型**: `string`

**描述**: 文档 ID

**示例**:
```typescript
const id = docInst.id; // 'doc_123'
```

#### 3.1.13 container

**类型**: `SimulatorRendererContainer`

**描述**: 渲染器容器引用

**示例**:
```typescript
const container = docInst.container;
```

#### 3.1.14 document

**类型**: `IDocumentModel`

**描述**: 文档模型

**示例**:
```typescript
const doc = docInst.document;
```

### 3.2 方法 (Methods)

#### 3.2.1 mountInstance

**签名**:
```typescript
mountInstance(id: string, instance: ReactInstance | null): void
```

**描述**: 挂载组件实例

**参数**:
- `id`: 节点 ID
- `instance`: React 实例，为 null 时表示卸载

**返回值**: `void`

**示例**:
```typescript
// 挂载实例
docInst.mountInstance('node_123', componentInstance);

// 卸载实例
docInst.mountInstance('node_123', null);
```

**使用场景**:
- 组件生命周期管理
- 实例更新
- 资源清理

#### 3.2.2 unmountInstance

**签名**:
```typescript
unmountInstance(id: string, instance: ReactInstance): void
```

**描述**: 卸载组件实例（内部方法）

**参数**:
- `id`: 节点 ID
- `instance`: React 实例

**返回值**: `void`

**示例**:
```typescript
docInst.unmountInstance('node_123', componentInstance);
```

**使用场景**:
- 内部实例管理
- 生命周期清理

#### 3.2.3 mountContext

**签名**:
```typescript
mountContext(): void
```

**描述**: 挂载上下文（预留方法）

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
docInst.mountContext();
```

**使用场景**:
- 上下文初始化
- 预留扩展

#### 3.2.4 getNode

**签名**:
```typescript
getNode(id: string): INode | null
```

**描述**: 根据节点 ID 获取节点

**参数**:
- `id`: 节点 ID

**返回值**: `INode | null` - 节点对象

**示例**:
```typescript
const node = docInst.getNode('node_123');
if (node) {
  console.log(node.componentName);
}
```

**使用场景**:
- 节点查询
- 节点操作
- 节点遍历

#### 3.2.5 dispose

**签名**:
```typescript
dispose(): void
```

**描述**: 销毁文档实例

**参数**: 无

**返回值**: `void`

**示例**:
```typescript
docInst.dispose();
```

**使用场景**:
- 文档卸载
- 资源清理
- 内存释放

## 4. 工具函数 API

### 4.1 getClosestNodeInstance

**签名**:
```typescript
function getClosestNodeInstance(
  from: ReactInstance,
  specId?: string
): IPublicTypeNodeInstance<ReactInstance> | null
```

**描述**: 获取最近的节点实例（独立函数）

**参数**:
- `from`: React 实例或 DOM 元素
- `specId`: 可选，指定节点 ID

**返回值**: `IPublicTypeNodeInstance<ReactInstance> | null`

**示例**:
```typescript
import { getClosestNodeInstance } from './renderer';

const instance = getClosestNodeInstance(domElement);
```

### 4.2 reactFindDOMNodes

**签名**:
```typescript
function reactFindDOMNodes(
  elem: ReactInstance | null
): Array<Element | Text> | null
```

**描述**: 查找 React 实例对应的 DOM 节点

**参数**:
- `elem`: React 实例

**返回值**: `Array<Element | Text> | null`

**示例**:
```typescript
import { reactFindDOMNodes } from './utils/react-find-dom-nodes';

const domNodes = reactFindDOMNodes(componentInstance);
```

### 4.3 getClientRects

**签名**:
```typescript
function getClientRects(node: Element | Text): DOMRect[]
```

**描述**: 获取元素的矩形区域信息

**参数**:
- `node`: DOM 元素或文本节点

**返回值**: `DOMRect[]`

**示例**:
```typescript
import { getClientRects } from './utils/get-client-rects';

const rects = getClientRects(domElement);
```

### 4.4 parseQuery

**签名**:
```typescript
function parseQuery(str: string): object
```

**描述**: 解析 URL 查询字符串

**参数**:
- `str`: 查询字符串，如 '?q=query&b=test'

**返回值**: `object` - 解析后的对象

**示例**:
```typescript
import { parseQuery } from './utils/url';

const params = parseQuery('?q=query&b=test');
// { q: 'query', b: 'test' }
```

### 4.5 stringifyQuery

**签名**:
```typescript
function stringifyQuery(obj: any): string
```

**描述**: 将对象序列化为查询字符串

**参数**:
- `obj`: 要序列化的对象

**返回值**: `string` - 查询字符串

**示例**:
```typescript
import { stringifyQuery } from './utils/url';

const query = stringifyQuery({ q: 'query', b: 'test' });
// 'q=query&b=test'
```

### 4.6 withQueryParams

**签名**:
```typescript
function withQueryParams(url: string, params?: object): string
```

**描述**: 为 URL 添加查询参数

**参数**:
- `url`: 原始 URL
- `params`: 查询参数对象

**返回值**: `string` - 带查询参数的 URL

**示例**:
```typescript
import { withQueryParams } from './utils/url';

const url = withQueryParams('/page1', { id: 123, name: 'test' });
// '/page1?id=123&name=test'
```

### 4.7 createIntl

**签名**:
```typescript
function createIntl(locale: string = 'zh-CN'): {
  intl: (id: string) => string;
  intlNode: (id: string) => React.ReactElement;
}
```

**描述**: 创建国际化工具函数

**参数**:
- `locale`: 语言环境，默认 'zh-CN'

**返回值**: 包含 intl 和 intlNode 函数的对象

**示例**:
```typescript
import { createIntl } from './locale';

const { intl, intlNode } = createIntl('zh-CN');
const text = intl('Drag and drop components or templates here');
const node = intlNode('Drag and drop components or templates here');
```

### 4.8 getIntrinsicMock

**签名**:
```typescript
function getIntrinsicMock(tag: string): ReactType
```

**描述**: 获取内置 HTML 元素的 mock 组件

**参数**:
- `tag`: HTML 标签名

**返回值**: `ReactType` - React 组件类型

**示例**:
```typescript
import { getIntrinsicMock } from './builtin-components/builtin-components';

const Div = getIntrinsicMock('div');
const Span = getIntrinsicMock('span');
```

### 4.9 isDOMNode

**签名**:
```typescript
function isDOMNode(node: any): node is Element | Text
```

**描述**: 判断是否为 DOM 节点

**参数**:
- `node`: 要检查的对象

**返回值**: `boolean` - 是否为 DOM 节点

**示例**:
```typescript
import { isDOMNode } from './utils/is-dom-node';

if (isDOMNode(node)) {
  console.log(node.tagName);
}
```

### 4.10 isRendererDetached

**签名**:
```typescript
function isRendererDetached(): boolean
```

**描述**: 判断渲染器是否已分离（iframe 脱离）

**参数**: 无

**返回值**: `boolean` - 是否已分离

**示例**:
```typescript
import { isRendererDetached } from './utils/misc';

if (isRendererDetached()) {
  console.log('Renderer is detached');
}
```

## 5. 内置组件 API

### 5.1 Slot

**描述**: 插槽组件，用于占位和内容分发

**Props**:
- `___title`: 插槽标题
- `___params`: 插槽参数数组

**示例**:
```typescript
<Slot ___title="插槽容器" ___params={['param1', 'param2']}>
  {children}
</Slot>
```

### 5.2 Leaf

**描述**: 叶子组件，用于渲染叶子节点

**Props**:
- `children`: 子元素

**示例**:
```typescript
<Leaf>
  {content}
</Leaf>
```

## 6. 事件系统

### 6.1 支持的事件类型

模块支持以下标准 React 事件：

**鼠标事件**:
- `onClick` - 点击时
- `onDoubleClick` - 双击时
- `onMouseDown` - 鼠标按下
- `onMouseEnter` - 鼠标进入
- `onMouseMove` - 鼠标移动
- `onMouseOut` - 鼠标移出
- `onMouseOver` - 鼠标悬停
- `onMouseUp` - 鼠标松开

**焦点事件**:
- `onFocus` - 获得焦点
- `onBlur` - 失去焦点

**表单事件**:
- `onChange` - 值改变时
- `onSelect` - 选择
- `onInput` - 输入
- `onReset` - 重置
- `onSubmit` - 提交

**剪贴板事件**:
- `onCopy` - 复制
- `onCut` - 剪切
- `onPaste` - 粘贴

**键盘事件**:
- `onKeyDown` - 键盘按下
- `onKeyPress` - 键盘按下并释放
- `onKeyUp` - 键盘松开

**触摸事件**:
- `onTouchStart` - 触摸开始
- `onTouchMove` - 触摸移动
- `onTouchEnd` - 触摸结束
- `onTouchCancel` - 触摸退出

**UI 事件**:
- `onScroll` - 滚动
- `onLoad` - 加载完毕
- `onWheel` - 滚轮事件

**动画事件**:
- `onAnimationStart` - 动画开始
- `onAnimationEnd` - 动画结束

## 7. 类型定义

### 7.1 IPublicTypeNodeInstance

```typescript
interface IPublicTypeNodeInstance<T> {
  docId: string;
  nodeId: string;
  instance: T;
}
```

### 7.2 Asset

```typescript
interface Asset {
  type: string;
  package: string;
  version?: string;
  exportName?: string;
  subName?: string;
  main?: string;
}
```

### 7.3 IPublicTypeComponentSchema

```typescript
interface IPublicTypeComponentSchema {
  componentName: string;
  props?: any;
  children?: any[];
  condition?: boolean;
  id?: string;
  [key: string]: any;
}
```

### 7.4 IPublicTypeProjectSchema

```typescript
interface IPublicTypeProjectSchema<T> {
  componentName: string;
  componentsTree: T[];
  [key: string]: any;
}
```

## 8. 使用示例

### 8.1 基本使用

```typescript
import renderer from '@alilc/lowcode-react-simulator-renderer';

// 启动渲染器
renderer.run();

// 获取组件
const Button = renderer.getComponent('Button');

// 刷新渲染器
renderer.rerender();

// 销毁渲染器
renderer.dispose();
```

### 8.2 动态加载组件

```typescript
// 加载组件库
await renderer.load({
  type: 'npm',
  package: '@alifd/next',
  version: '1.23.0',
});

// 使用组件
const Button = renderer.getComponent('Button');
```

### 8.3 节点操作

```typescript
// 查找节点实例
const instance = renderer.getClosestNodeInstance(domElement);

// 获取 DOM 节点
const domNodes = renderer.findDOMNodes(instance);

// 获取位置信息
const rects = renderer.getClientRects(domNodes[0]);
```

### 8.4 状态控制

```typescript
// 设置拖拽状态
renderer.setDraggingState(true);

// 清除状态
renderer.clearState();

// 控制自动渲染
renderer.autoRender = false;
renderer.autoRepaintNode = false;
```

## 9. 最佳实践

### 9.1 性能优化

1. **合理使用自动渲染**: 在批量操作时禁用自动渲染
```typescript
renderer.autoRender = false;
// 批量操作
renderer.autoRender = true;
```

2. **避免频繁重绘**: 在需要时停止自动重绘
```typescript
renderer.stopAutoRepaintNode();
// 执行操作
renderer.enableAutoRepaintNode();
```

### 9.2 资源管理

1. **及时清理**: 使用完毕后调用 dispose
```typescript
renderer.dispose();
```

2. **按需加载**: 使用异步加载优化性能
```typescript
await renderer.loadAsyncLibrary(asyncLibs);
```

### 9.3 错误处理

1. **检查返回值**: 注意 API 返回 null 的情况
```typescript
const component = renderer.getComponent('Button');
if (!component) {
  console.error('Component not found');
}
```

2. **异常捕获**: 使用 try-catch 处理异步操作
```typescript
try {
  await renderer.load(asset);
} catch (error) {
  console.error('Load failed:', error);
}
```

## 10. 注意事项

1. **单例模式**: renderer 是单例，不要创建多个实例
2. **生命周期**: 注意组件的挂载和卸载时机
3. **内存管理**: 及时调用 dispose 清理资源
4. **线程安全**: 避免在多个地方同时修改状态
5. **类型检查**: 使用 TypeScript 确保类型安全
