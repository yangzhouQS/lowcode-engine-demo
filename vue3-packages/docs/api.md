# Vue3 低代码引擎 - API 文档

## 文档信息

- **文档版本**: v1.0.0
- **创建日期**: 2026-01-08
- **文档类型**: API 文档
- **适用范围**: Vue3 低代码引擎

---

## 目录

- [1. Shell API](#1-shell-api)
- [2. Editor API](#2-editor-api)
- [3. Designer API](#3-designer-api)
- [4. Renderer API](#4-renderer-api)
- [5. Plugin API](#5-plugin-api)
- [6. Utils API](#6-utils-api)
- [7. Types API](#7-types-api)

---

## 1. Shell API

### 1.1 Shell 类

Shell 是低代码引擎的统一入口，提供完整的编辑器功能。

#### 构造函数

```typescript
constructor(config?: IShellConfig)
```

**参数**:
- `config`: Shell 配置对象

**示例**:

```typescript
import { Shell } from '@vue3-lowcode/shell';

const shell = new Shell({
  designMode: 'design',
  locale: 'zh-CN'
});
```

#### 方法

##### init()

初始化 Shell。

```typescript
async init(): Promise<void>
```

**示例**:

```typescript
await shell.init();
```

##### start()

启动 Shell。

```typescript
async start(): Promise<void>
```

**示例**:

```typescript
await shell.start();
```

##### stop()

停止 Shell。

```typescript
async stop(): Promise<void>
```

**示例**:

```typescript
await shell.stop();
```

##### getEditor()

获取编辑器实例。

```typescript
getEditor(): IEditor | null
```

**返回值**: 编辑器实例或 null

**示例**:

```typescript
const editor = shell.getEditor();
```

##### getDesigner()

获取设计器实例。

```typescript
getDesigner(): IDesigner | null
```

**返回值**: 设计器实例或 null

**示例**:

```typescript
const designer = shell.getDesigner();
```

---

### 1.2 IShellConfig 接口

Shell 配置接口。

```typescript
interface IShellConfig {
  designMode?: 'design' | 'live';
  locale?: string;
  theme?: string;
  plugins?: IPlugin[];
}
```

**属性**:
- `designMode`: 设计模式，默认为 'design'
- `locale`: 语言环境，默认为 'zh-CN'
- `theme`: 主题，默认为 'light'
- `plugins`: 插件列表

---

## 2. Editor API

### 2.1 Editor 类

Editor 是编辑器的核心类，管理编辑器的生命周期和状态。

#### 构造函数

```typescript
constructor(config?: IEditorConfig)
```

**参数**:
- `config`: 编辑器配置对象

**示例**:

```typescript
import { Editor } from '@vue3-lowcode/editor-core';

const editor = new Editor({
  hotkeys: {
    'ctrl+s': 'save',
    'ctrl+z': 'undo'
  }
});
```

#### 方法

##### init()

初始化编辑器。

```typescript
async init(): Promise<void>
```

**示例**:

```typescript
await editor.init();
```

##### start()

启动编辑器。

```typescript
async start(): Promise<void>
```

**示例**:

```typescript
await editor.start();
```

##### stop()

停止编辑器。

```typescript
async stop(): Promise<void>
```

**示例**:

```typescript
await editor.stop();
```

##### dispose()

销毁编辑器。

```typescript
async dispose(): Promise<void>
```

**示例**:

```typescript
await editor.dispose();
```

##### emit()

发送事件。

```typescript
emit(event: string, data?: any): void
```

**参数**:
- `event`: 事件名称
- `data`: 事件数据

**示例**:

```typescript
editor.emit('custom-event', { message: 'Hello' });
```

##### on()

监听事件。

```typescript
on(event: string, handler: Function): Function
```

**参数**:
- `event`: 事件名称
- `handler`: 事件处理函数

**返回值**: 取消监听的函数

**示例**:

```typescript
const unsubscribe = editor.on('custom-event', (data) => {
  console.log('Received:', data);
});

// 取消监听
unsubscribe();
```

##### off()

取消监听事件。

```typescript
off(event: string, handler?: Function): void
```

**参数**:
- `event`: 事件名称
- `handler`: 事件处理函数（可选）

**示例**:

```typescript
editor.off('custom-event');
```

---

## 3. Designer API

### 3.1 Designer 类

Designer 是设计器的核心类，提供可视化设计功能。

#### 构造函数

```typescript
constructor(config?: IDesignerConfig)
```

**参数**:
- `config`: 设计器配置对象

**示例**:

```typescript
import { Designer } from '@vue3-lowcode/designer';

const designer = new Designer({
  documentModel: documentModel,
  simulator: simulator
});
```

#### 方法

##### init()

初始化设计器。

```typescript
async init(): Promise<void>
```

**示例**:

```typescript
await designer.init();
```

##### getDocumentModel()

获取文档模型。

```typescript
getDocumentModel(): IDocumentModel
```

**返回值**: 文档模型实例

**示例**:

```typescript
const documentModel = designer.getDocumentModel();
```

##### getCurrentDocument()

获取当前文档。

```typescript
getCurrentDocument(): IDocument | null
```

**返回值**: 当前文档实例或 null

**示例**:

```typescript
const document = designer.getCurrentDocument();
```

##### getSelection()

获取选区。

```typescript
getSelection(): ISelection
```

**返回值**: 选区实例

**示例**:

```typescript
const selection = designer.getSelection();
```

##### getHistory()

获取历史记录。

```typescript
getHistory(): IHistory
```

**返回值**: 历史记录实例

**示例**:

```typescript
const history = designer.getHistory();
```

---

### 3.2 Document 类

Document 表示一个文档实例。

#### 方法

##### getRootNode()

获取根节点。

```typescript
getRootNode(): INode
```

**返回值**: 根节点实例

**示例**:

```typescript
const rootNode = document.getRootNode();
```

##### getNode()

获取指定节点。

```typescript
getNode(id: string): INode | null
```

**参数**:
- `id`: 节点 ID

**返回值**: 节点实例或 null

**示例**:

```typescript
const node = document.getNode('node-id');
```

##### export()

导出文档。

```typescript
export(): ISchema
```

**返回值**: Schema 对象

**示例**:

```typescript
const schema = document.export();
```

##### import()

导入文档。

```typescript
import(schema: ISchema): void
```

**参数**:
- `schema`: Schema 对象

**示例**:

```typescript
document.import(schema);
```

---

### 3.3 Node 类

Node 表示一个节点。

#### 方法

##### getProp()

获取属性。

```typescript
getProp(path: string): IProp | null
```

**参数**:
- `path`: 属性路径

**返回值**: 属性实例或 null

**示例**:

```typescript
const prop = node.getProp('props.title');
```

##### setProp()

设置属性。

```typescript
setProp(path: string, value: any): void
```

**参数**:
- `path`: 属性路径
- `value`: 属性值

**示例**:

```typescript
node.setProp('props.title', 'New Title');
```

##### addChild()

添加子节点。

```typescript
addChild(node: INode, index?: number): void
```

**参数**:
- `node`: 子节点
- `index`: 插入位置（可选）

**示例**:

```typescript
node.addChild(childNode, 0);
```

##### removeChild()

移除子节点。

```typescript
removeChild(node: INode): void
```

**参数**:
- `node`: 子节点

**示例**:

```typescript
node.removeChild(childNode);
```

##### getChildren()

获取子节点列表。

```typescript
getChildren(): INode[]
```

**返回值**: 子节点数组

**示例**:

```typescript
const children = node.getChildren();
```

##### getParent()

获取父节点。

```typescript
getParent(): INode | null
```

**返回值**: 父节点或 null

**示例**:

```typescript
const parent = node.getParent();
```

---

## 4. Renderer API

### 4.1 VueRenderer 类

VueRenderer 是 Vue3 的渲染器实现。

#### 构造函数

```typescript
constructor(config?: IRendererConfig)
```

**参数**:
- `config`: 渲染器配置对象

**示例**:

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';

const renderer = new VueRenderer({
  componentMap: {
    'Page': PageComponent,
    'Div': DivComponent
  }
});
```

#### 方法

##### renderComponent()

渲染组件。

```typescript
renderComponent(schema: ISchema, container: HTMLElement): void
```

**参数**:
- `schema`: Schema 对象
- `container`: 容器元素

**示例**:

```typescript
renderer.renderComponent(schema, document.getElementById('app'));
```

##### unmountComponent()

卸载组件。

```typescript
unmountComponent(container: HTMLElement): void
```

**参数**:
- `container`: 容器元素

**示例**:

```typescript
renderer.unmountComponent(document.getElementById('app'));
```

---

## 5. Plugin API

### 5.1 VuePlugin 类

VuePlugin 是 Vue3 插件的基类。

#### 构造函数

```typescript
constructor(config: IPluginConfig)
```

**参数**:
- `config`: 插件配置对象

**示例**:

```typescript
import { VuePlugin } from '@vue3-lowcode/plugin';

class MyPlugin extends VuePlugin {
  async onStart() {
    console.log('Plugin started');
  }
}

const plugin = new MyPlugin({
  name: 'my-plugin',
  version: '1.0.0'
});
```

#### 方法

##### onStart()

插件启动时调用。

```typescript
async onStart(): Promise<void>
```

**示例**:

```typescript
async onStart() {
  console.log('Plugin started');
}
```

##### onStop()

插件停止时调用。

```typescript
async onStop(): Promise<void>
```

**示例**:

```typescript
async onStop() {
  console.log('Plugin stopped');
}
```

##### onDestroy()

插件销毁时调用。

```typescript
async onDestroy(): Promise<void>
```

**示例**:

```typescript
async onDestroy() {
  console.log('Plugin destroyed');
}
```

---

### 5.2 PluginManager 类

PluginManager 管理插件的注册、启动、停止等。

#### 方法

##### register()

注册插件。

```typescript
register(plugin: IPlugin): void
```

**参数**:
- `plugin`: 插件实例

**示例**:

```typescript
pluginManager.register(myPlugin);
```

##### unregister()

注销插件。

```typescript
unregister(pluginName: string): void
```

**参数**:
- `pluginName`: 插件名称

**示例**:

```typescript
pluginManager.unregister('my-plugin');
```

##### start()

启动插件。

```typescript
start(pluginName: string): Promise<void>
```

**参数**:
- `pluginName`: 插件名称

**示例**:

```typescript
await pluginManager.start('my-plugin');
```

##### stop()

停止插件。

```typescript
stop(pluginName: string): Promise<void>
```

**参数**:
- `pluginName`: 插件名称

**示例**:

```typescript
await pluginManager.stop('my-plugin');
```

##### getPlugin()

获取插件。

```typescript
getPlugin(pluginName: string): IPlugin | null
```

**参数**:
- `pluginName`: 插件名称

**返回值**: 插件实例或 null

**示例**:

```typescript
const plugin = pluginManager.getPlugin('my-plugin');
```

---

## 6. Utils API

### 6.1 类型守卫函数

#### isString()

检查是否为字符串。

```typescript
function isString(value: any): value is string
```

**示例**:

```typescript
import { isString } from '@vue3-lowcode/utils';

if (isString(value)) {
  console.log('Is string');
}
```

#### isNumber()

检查是否为数字。

```typescript
function isNumber(value: any): value is number
```

**示例**:

```typescript
import { isNumber } from '@vue3-lowcode/utils';

if (isNumber(value)) {
  console.log('Is number');
}
```

#### isObject()

检查是否为对象。

```typescript
function isObject(value: any): value is object
```

**示例**:

```typescript
import { isObject } from '@vue3-lowcode/utils';

if (isObject(value)) {
  console.log('Is object');
}
```

#### isArray()

检查是否为数组。

```typescript
function isArray(value: any): value is any[]
```

**示例**:

```typescript
import { isArray } from '@vue3-lowcode/utils';

if (isArray(value)) {
  console.log('Is array');
}
```

---

### 6.2 对象操作函数

#### get()

获取对象属性。

```typescript
function get(obj: object, path: string, defaultValue?: any): any
```

**参数**:
- `obj`: 对象
- `path`: 属性路径
- `defaultValue`: 默认值（可选）

**返回值**: 属性值

**示例**:

```typescript
import { get } from '@vue3-lowcode/utils';

const value = get(obj, 'a.b.c', 'default');
```

#### set()

设置对象属性。

```typescript
function set(obj: object, path: string, value: any): void
```

**参数**:
- `obj`: 对象
- `path`: 属性路径
- `value`: 属性值

**示例**:

```typescript
import { set } from '@vue3-lowcode/utils';

set(obj, 'a.b.c', 'value');
```

#### merge()

合并对象。

```typescript
function merge(target: object, source: object): object
```

**参数**:
- `target`: 目标对象
- `source`: 源对象

**返回值**: 合并后的对象

**示例**:

```typescript
import { merge } from '@vue3-lowcode/utils';

const merged = merge(obj1, obj2);
```

#### clone()

克隆对象。

```typescript
function clone(obj: object): object
```

**参数**:
- `obj`: 对象

**返回值**: 克隆后的对象

**示例**:

```typescript
import { clone } from '@vue3-lowcode/utils';

const cloned = clone(obj);
```

---

### 6.3 数组操作函数

#### first()

获取数组第一个元素。

```typescript
function first<T>(arr: T[]): T | undefined
```

**示例**:

```typescript
import { first } from '@vue3-lowcode/utils';

const firstItem = first([1, 2, 3]); // 1
```

#### last()

获取数组最后一个元素。

```typescript
function last<T>(arr: T[]): T | undefined
```

**示例**:

```typescript
import { last } from '@vue3-lowcode/utils';

const lastItem = last([1, 2, 3]); // 3
```

#### uniq()

数组去重。

```typescript
function uniq<T>(arr: T[]): T[]
```

**示例**:

```typescript
import { uniq } from '@vue3-lowcode/utils';

const unique = uniq([1, 2, 2, 3]); // [1, 2, 3]
```

---

### 6.4 Vue3 特定工具函数

#### useRef()

创建响应式引用。

```typescript
function useRef<T>(initialValue: T): Ref<T>
```

**示例**:

```typescript
import { useRef } from '@vue3-lowcode/utils';

const count = useRef(0);
```

#### useReactive()

创建响应式对象。

```typescript
function useReactive<T extends object>(obj: T): T
```

**示例**:

```typescript
import { useReactive } from '@vue3-lowcode/utils';

const state = useReactive({ count: 0 });
```

#### useComputed()

创建计算属性。

```typescript
function useComputed<T>(getter: () => T): ComputedRef<T>
```

**示例**:

```typescript
import { useComputed } from '@vue3-lowcode/utils';

const doubleCount = useComputed(() => count.value * 2);
```

---

## 7. Types API

### 7.1 核心类型

#### ISchema

Schema 类型定义。

```typescript
interface ISchema {
  componentName: string;
  id?: string;
  props?: Record<string, any>;
  children?: ISchema[];
  [key: string]: any;
}
```

#### IComponentMeta

组件元数据类型。

```typescript
interface IComponentMeta {
  componentName: string;
  title: string;
  docUrl?: string;
  screenshot?: string;
  devMode?: string;
  npm?: INpmInfo;
}
```

#### INpmInfo

NPM 包信息类型。

```typescript
interface INpmInfo {
  package: string;
  version: string;
  exportName: string;
  main?: string;
  destructuring?: boolean;
  subName?: string;
}
```

---

### 7.2 节点类型

#### INode

节点类型。

```typescript
interface INode {
  id: string;
  componentName: string;
  props: IProps;
  children: INode[];
  [key: string]: any;
}
```

#### IProps

属性类型。

```typescript
interface IProps {
  getProp(path: string): IProp | null;
  setProp(path: string, value: any): void;
  getProps(): Record<string, IProp>;
  setProps(props: Record<string, any>): void;
}
```

#### IProp

属性类型。

```typescript
interface IProp {
  path: string;
  value: any;
  getValue(): any;
  setValue(value: any): void;
}
```

---

### 7.3 插件类型

#### IPlugin

插件类型。

```typescript
interface IPlugin {
  name: string;
  version: string;
  config?: IPluginConfig;
  onStart(): Promise<void>;
  onStop(): Promise<void>;
  onDestroy(): Promise<void>;
}
```

#### IPluginConfig

插件配置类型。

```typescript
interface IPluginConfig {
  name: string;
  version: string;
  description?: string;
  dependencies?: string[];
}
```

---

## 总结

Vue3 低代码引擎提供了完整的 API，包括 Shell API、Editor API、Designer API、Renderer API、Plugin API、Utils API 和 Types API。所有 API 都经过精心设计，提供良好的类型支持和开发体验。

更多详细信息，请参考各包的 README 文档。
