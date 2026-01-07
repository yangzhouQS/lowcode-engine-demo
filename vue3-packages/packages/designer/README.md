# @vue3-lowcode/designer

设计器包,提供设计器核心功能,包括文档模型、节点管理、拖拽系统、选区管理、历史记录和模拟器等。

## 安装

```bash
pnpm add @vue3-lowcode/designer
```

## 核心功能

### Designer

设计器核心类,整合所有设计器模块。

```typescript
import { Designer } from '@vue3-lowcode/designer';

const designer = new Designer({
  simulator: {
    device: 'desktop',
    width: 1200,
    height: 800,
    scale: 1,
    locale: 'zh-CN',
  },
  maxHistorySize: 50,
});

// 初始化设计器
await designer.init();

// 启动设计器
await designer.start();

// 获取文档模型
const documentModel = designer.getDocumentModel();

// 获取拖拽系统
const dragon = designer.getDragon();

// 获取选区
const selection = designer.getSelection();

// 获取历史记录
const history = designer.getHistory();

// 获取模拟器
const simulator = designer.getSimulator();

// 停止设计器
await designer.stop();

// 销毁设计器
await designer.dispose();
```

### DocumentModel

文档模型类,管理多个文档。

```typescript
import { DocumentModel } from '@vue3-lowcode/designer';

const documentModel = new DocumentModel();

// 创建文档
const document = documentModel.createDocument('doc-1', {
  componentName: 'Page',
  props: {},
  children: [],
});

// 删除文档
documentModel.deleteDocument('doc-1');

// 设置当前文档
documentModel.setCurrentDocument('doc-1');

// 获取当前文档
const currentDocument = documentModel.getCurrentDocument();

// 获取所有文档
const documents = documentModel.getDocuments();

// 导出文档模型
const state = documentModel.export();

// 导入文档模型
await documentModel.import(state);
```

### Document

文档类,管理单个文档的节点树。

```typescript
import { Document } from '@vue3-lowcode/designer';

const document = new Document('doc-1', {
  componentName: 'Page',
  props: {},
  children: [],
});

// 获取根节点
const rootNode = document.getRootNode();

// 获取节点
const node = document.getNode('node-1');

// 添加节点
document.addNode({
  id: 'node-1',
  componentName: 'Div',
  props: {},
  children: [],
});

// 删除节点
document.removeNode('node-1');

// 导出文档
const state = document.export();

// 导入文档
await document.import(state);
```

### Node

节点类,管理节点树结构。

```typescript
import { Node } from '@vue3-lowcode/designer';

const node = new Node({
  id: 'node-1',
  componentName: 'Div',
  props: {},
  children: [],
});

// 添加子节点
const childNode = new Node({
  id: 'child-1',
  componentName: 'Div',
  props: {},
  children: [],
});
node.addChild(childNode);

// 删除子节点
node.removeChild('child-1');

// 获取子节点
const children = node.getChildren();

// 获取父节点
const parent = node.getParent();

// 导出节点
const state = node.export();
```

### Props

属性类,管理节点属性。

```typescript
import { Props } from '@vue3-lowcode/designer';

const props = new Props({
  className: 'container',
  style: { color: 'red' },
});

// 获取属性
const className = props.getProp('className');
const style = props.getProp('style.color');

// 设置属性
props.setProp('className', 'container-new');
props.setProp('style.color', 'blue');

// 获取所有属性
const allProps = props.getProps();

// 设置多个属性
props.setProps({
  className: 'container-new',
  style: { color: 'blue' },
});

// 导出属性
const state = props.export();

// 导入属性
await props.import(state);
```

### Dragon

拖拽系统类,管理拖拽操作。

```typescript
import { Dragon } from '@vue3-lowcode/designer';

const dragon = new Dragon();

// 开始拖拽
dragon.startDrag({
  type: 'node',
  data: { nodeId: 'node-1' },
});

// 拖拽中
dragon.onDrag({
  x: 100,
  y: 200,
});

// 结束拖拽
dragon.endDrag();

// 取消拖拽
dragon.cancelDrag();

// 设置放置目标
dragon.setDropTarget({
  nodeId: 'node-2',
  position: 'before',
});

// 导出拖拽状态
const state = dragon.export();

// 导入拖拽状态
await dragon.import(state);
```

### Selection

选区类,管理选中的节点。

```typescript
import { Selection } from '@vue3-lowcode/designer';

const selection = new Selection();

// 选中节点
selection.select(node);
selection.select([node1, node2]);

// 取消选中
selection.deselect(node);
selection.deselect([node1, node2]);

// 清空选区
selection.clear();

// 获取选中的节点
const selected = selection.getSelected();

// 是否有选中
const hasSelection = selection.hasSelection();

// 判断节点是否被选中
const isSelected = selection.isSelected(node);

// 全选
selection.selectAll(nodes);

// 反选
selection.invertSelection(nodes);

// 导出选区
const state = selection.export();

// 导入选区
await selection.import(state);
```

### History

历史记录类,管理撤销/重做功能。

```typescript
import { History, HistoryRecord } from '@vue3-lowcode/designer';

const history = new History();

// 添加历史记录
history.push({
  type: 'node:add',
  data: { nodeId: 'node-1' },
});

// 撤销
history.undo();

// 重做
history.redo();

// 是否可以撤销
const canUndo = history.canUndo();

// 是否可以重做
const canRedo = history.canRedo();

// 清空历史记录
history.clear();

// 获取当前记录
const current = history.getCurrent();

// 获取所有历史记录
const all = history.getAll();

// 导出历史记录
const state = history.export();

// 导入历史记录
await history.import(state);
```

### BuiltinSimulatorHost

内置模拟器宿主类,管理模拟器的生命周期、配置和渲染。

```typescript
import { BuiltinSimulatorHost } from '@vue3-lowcode/designer';

const simulator = new BuiltinSimulatorHost({
  device: 'desktop',
  width: 1200,
  height: 800,
  scale: 1,
  locale: 'zh-CN',
});

// 初始化模拟器
await simulator.init(documentModel);

// 启动模拟器
await simulator.start();

// 停止模拟器
await simulator.stop();

// 重新渲染模拟器
await simulator.render();

// 更新配置
simulator.updateConfig({
  device: 'mobile',
  width: 375,
  height: 667,
});

// 设置设备类型
simulator.setDevice('mobile');

// 设置尺寸
simulator.setSize(375, 667);

// 设置缩放比例
simulator.setScale(1.5);

// 设置语言
simulator.setLocale('en-US');

// 获取配置
const config = simulator.getConfig();

// 是否已准备就绪
const isReady = simulator.isReady();

// 销毁模拟器
await simulator.dispose();

// 导出模拟器状态
const state = simulator.export();

// 导入模拟器状态
await simulator.import(state);
```

## 事件监听

所有模块都支持事件监听。

```typescript
// Designer 事件
designer.on('designer:ready', () => {
  console.log('Designer is ready');
});

designer.on('designer:document-create', ({ document }) => {
  console.log('Document created:', document.id);
});

designer.on('designer:selection-change', ({ selected }) => {
  console.log('Selection changed:', selected);
});

// DocumentModel 事件
documentModel.on('document:create', ({ document }) => {
  console.log('Document created:', document.id);
});

documentModel.on('document:change', ({ document }) => {
  console.log('Document changed:', document.id);
});

// Selection 事件
selection.on('selection:change', ({ selected }) => {
  console.log('Selection changed:', selected);
});

selection.on('selection:clear', () => {
  console.log('Selection cleared');
});

// History 事件
history.on('history:push', ({ record }) => {
  console.log('History pushed:', record);
});

history.on('history:undo', ({ record }) => {
  console.log('History undone:', record);
});

// Simulator 事件
simulator.on('simulator:ready', ({ config }) => {
  console.log('Simulator ready:', config);
});

simulator.on('simulator:device-change', ({ device, config }) => {
  console.log('Device changed:', device);
});
```

## 响应式引用

所有模块都提供响应式引用,可以在 Vue3 组件中使用。

```typescript
import { ref } from 'vue';
import { Designer } from '@vue3-lowcode/designer';

const designer = new Designer();

// 获取准备就绪状态的响应式引用
const isReady = designer.getReadyRef();

// 在 Vue3 组件中使用
const { isReadyRef } = designer;

// 监听状态变化
watch(isReadyRef, (value) => {
  console.log('Designer ready:', value);
});
```

## TypeScript 支持

所有模块都提供完整的 TypeScript 类型定义。

```typescript
import type {
  DesignerConfig,
  SimulatorConfig,
  HistoryRecord,
} from '@vue3-lowcode/designer';

import type {
  IDocumentModel,
  IDocument,
  INode,
  IProps,
} from '@vue3-lowcode/types';
```

## License

MIT
