# @vue3-lowcode/designer

设计器核心包,提供低代码设计器的核心功能。

## 简介

`@vue3-lowcode/designer` 是 Vue3 低代码框架的设计器核心包,提供了完整的低代码设计器功能,包括文档管理、节点操作、拖拽系统、选区管理、历史记录和模拟器等功能。

## 特性

- 📦 **文档管理** - 支持多文档管理,包括创建、删除、获取和切换文档
- 🌳 **节点树结构** - 完整的节点树管理,支持父子关系、兄弟关系等
- 🎯 **拖拽系统** - 强大的拖拽功能,支持组件拖放和位置计算
- ✅ **选区管理** - 灵活的选区管理,支持单选、多选、全选等
- ⏪ **历史记录** - 完整的撤销/重做功能
- 🎨 **模拟器** - 内置模拟器,支持组件渲染和预览
- 🎭 **事件驱动** - 完整的事件系统,支持自定义事件监听
- 💾 **状态持久化** - 支持导出和导入设计器状态

## 安装

```bash
pnpm add @vue3-lowcode/designer
```

## 使用方法

### 基本使用

```typescript
import { Designer } from '@vue3-lowcode/designer';

// 创建设计器实例
const designer = new Designer({
  // 可选配置
});

// 初始化设计器
await designer.init();

// 启动设计器
await designer.start();

// 使用设计器
const documentModel = designer.getDocumentModel();
const selection = designer.getSelection();
const history = designer.getHistory();
const dragon = designer.getDragon();
const simulator = designer.getSimulator();
```

### 文档管理

```typescript
import { DocumentModel, Document } from '@vue3-lowcode/designer';

// 创建文档模型
const documentModel = new DocumentModel();

// 创建文档
const document = new Document({
  id: 'doc-1',
  title: '我的页面',
  componentName: 'Page',
});

// 添加文档到模型
documentModel.addDocument(document);

// 设置当前文档
documentModel.setCurrentDocument('doc-1');

// 获取当前文档
const currentDoc = documentModel.getCurrentDocument();
```

### 节点操作

```typescript
import { Node, Props } from '@vue3-lowcode/designer';

// 创建节点
const node = new Node({
  id: 'node-1',
  type: 'Node',
  componentName: 'Button',
  props: {
    text: '点击我',
    type: 'primary',
  },
});

// 获取属性
const text = node.getProp('text');

// 设置属性
node.setProp('text', '新的文本');

// 获取所有属性
const allProps = node.getProps();

// 添加子节点
const childNode = new Node({
  id: 'node-2',
  type: 'Node',
  componentName: 'Icon',
});
node.addChild(childNode);

// 获取子节点
const children = node.getChildren();

// 导出节点
const schema = node.export();
```

### 拖拽系统

```typescript
import { Dragon } from '@vue3-lowcode/designer';

// 创建拖拽系统
const dragon = new Dragon();

// 开始拖拽
dragon.startDrag({
  type: 'node',
  data: {
    nodeId: 'node-1',
  },
});

// 监听拖拽事件
dragon.on('start', (data) => {
  console.log('拖拽开始', data);
});

dragon.on('drag', (data) => {
  console.log('拖拽中', data);
});

dragon.on('end', (data) => {
  console.log('拖拽结束', data);
});

// 结束拖拽
dragon.endDrag();
```

### 选区管理

```typescript
import { Selection } from '@vue3-lowcode/designer';

// 创建选区
const selection = new Selection();

// 选中节点
const node = new Node({ /* ... */ });
selection.select(node);

// 选中多个节点
const node1 = new Node({ /* ... */ });
const node2 = new Node({ /* ... */ });
selection.select([node1, node2]);

// 取消选中
selection.deselect(node);

// 清空选区
selection.clear();

// 获取选中的节点
const selectedNodes = selection.getSelected();

// 判断节点是否被选中
const isSelected = selection.isSelected(node);
```

### 历史记录

```typescript
import { History } from '@vue3-lowcode/designer';

// 创建历史记录
const history = new History();

// 添加历史记录
history.push({
  type: 'add-node',
  data: {
    nodeId: 'node-1',
    parentId: 'root',
  },
});

// 撤销
if (history.canUndo()) {
  history.undo();
}

// 重做
if (history.canRedo()) {
  history.redo();
}

// 清空历史记录
history.clear();

// 获取所有历史记录
const allRecords = history.getAll();
```

### 模拟器

```typescript
import { BuiltinSimulatorHost } from '@vue3-lowcode/designer';

// 创建模拟器
const simulator = new BuiltinSimulatorHost({
  container: document.getElementById('simulator-container'),
});

// 初始化模拟器
await simulator.init();

// 启动模拟器
await simulator.start();

// 渲染组件
simulator.render({
  componentName: 'Page',
  props: {
    title: '我的页面',
  },
  children: [
    {
      componentName: 'Button',
      props: {
        text: '点击我',
      },
    },
  ],
});

// 停止模拟器
await simulator.stop();

// 销毁模拟器
await simulator.dispose();
```

## API 文档

### Designer

设计器核心类,整合所有设计器模块。

#### 方法

- `init()` - 初始化设计器
- `start()` - 启动设计器
- `stop()` - 停止设计器
- `dispose()` - 销毁设计器
- `getDocumentModel()` - 获取文档模型
- `getCurrentDocument()` - 获取当前文档
- `getSelection()` - 获取选区
- `getHistory()` - 获取历史记录
- `getDragon()` - 获取拖拽系统
- `getSimulator()` - 获取模拟器
- `getConfig()` - 获取配置
- `setConfig(config)` - 设置配置
- `isReady()` - 是否已初始化
- `isActive()` - 是否已启动
- `on(event, listener)` - 注册事件监听器
- `off(event, listener)` - 移除事件监听器
- `export()` - 导出设计器状态
- `import(state)` - 导入设计器状态

### DocumentModel

文档模型类,管理多个文档。

#### 方法

- `init()` - 初始化文档模型
- `addDocument(document)` - 添加文档
- `removeDocument(id)` - 删除文档
- `getDocument(id)` - 获取文档
- `hasDocument(id)` - 判断文档是否存在
- `setCurrentDocument(id)` - 设置当前文档
- `getCurrentDocument()` - 获取当前文档
- `getDocuments()` - 获取所有文档
- `export()` - 导出文档模型状态
- `import(state)` - 导入文档模型状态

### Document

文档类,表示一个低代码文档。

#### 方法

- `getRootNode()` - 获取根节点
- `getNode(id)` - 获取节点
- `getNodes()` - 获取所有节点
- `hasNode(id)` - 判断节点是否存在
- `export()` - 导出文档
- `import(schema)` - 导入文档

### Node

节点类,表示低代码组件节点。

#### 方法

- `getProp(key)` - 获取属性
- `setProp(key, value)` - 设置属性
- `getProps()` - 获取所有属性
- `setProps(props)` - 设置多个属性
- `addChild(node)` - 添加子节点
- `removeChild(node)` - 移除子节点
- `getChildren()` - 获取子节点
- `getParent()` - 获取父节点
- `getSibling()` - 获取兄弟节点
- `getIndex()` - 获取索引
- `export()` - 导出节点

### Props

属性类,管理节点属性。

#### 方法

- `getProp(key)` - 获取属性
- `setProp(key, value)` - 设置属性
- `getProps()` - 获取所有属性
- `setProps(props)` - 设置多个属性
- `hasProp(key)` - 判断属性是否存在
- `deleteProp(key)` - 删除属性
- `getSchema()` - 获取属性 Schema
- `setSchema(schema)` - 设置属性 Schema
- `export()` - 导出属性
- `import(schema)` - 导入属性

### Dragon

拖拽系统类,管理拖拽操作。

#### 方法

- `startDrag(data)` - 开始拖拽
- `onDrag(data)` - 拖拽中
- `endDrag()` - 结束拖拽
- `cancelDrag()` - 取消拖拽
- `isDragActive()` - 是否正在拖拽
- `getDragData()` - 获取拖拽数据
- `getDragTarget()` - 获取拖拽目标
- `getDragPosition()` - 获取拖拽位置
- `getDropTarget()` - 获取放置目标
- `setDropTarget(target)` - 设置放置目标
- `on(event, listener)` - 注册事件监听器
- `off(event, listener)` - 移除事件监听器
- `clearListeners()` - 清除所有监听器

### Selection

选区类,管理选中的节点。

#### 方法

- `select(nodes)` - 选中节点
- `deselect(nodes)` - 取消选中
- `clear()` - 清空选区
- `getSelected()` - 获取选中的节点
- `hasSelection()` - 是否有选中
- `isSelected(node)` - 判断节点是否被选中
- `size()` - 获取选中数量
- `getFirst()` - 获取第一个选中的节点
- `getLast()` - 获取最后一个选中的节点
- `selectAll(nodes)` - 全选
- `invertSelection(nodes)` - 反选
- `on(event, listener)` - 注册事件监听器
- `off(event, listener)` - 移除事件监听器
- `clearListeners()` - 清除所有监听器
- `export()` - 导出选区状态
- `import(state)` - 导入选区状态

### History

历史记录类,管理撤销/重做功能。

#### 方法

- `push(record)` - 添加历史记录
- `undo()` - 撤销
- `redo()` - 重做
- `canUndo()` - 是否可以撤销
- `canRedo()` - 是否可以重做
- `clear()` - 清空历史记录
- `getIndex()` - 获取当前索引
- `size()` - 获取历史记录数量
- `getAll()` - 获取所有历史记录
- `getCurrent()` - 获取当前记录
- `getPrevious()` - 获取上一条记录
- `getNext()` - 获取下一条记录
- `on(event, listener)` - 注册事件监听器
- `off(event, listener)` - 移除事件监听器
- `clearListeners()` - 清除所有监听器
- `export()` - 导出历史记录
- `import(state)` - 导入历史记录

### BuiltinSimulatorHost

模拟器类,用于渲染和预览组件。

#### 方法

- `init()` - 初始化模拟器
- `start()` - 启动模拟器
- `stop()` - 停止模拟器
- `dispose()` - 销毁模拟器
- `getConfig()` - 获取配置
- `setConfig(config)` - 设置配置
- `getContainer()` - 获取容器
- `setContainer(container)` - 设置容器
- `isReady()` - 是否已初始化
- `isActive()` - 是否已启动
- `render(schema)` - 渲染组件
- `update(schema)` - 更新组件
- `on(event, listener)` - 注册事件监听器
- `off(event, listener)` - 移除事件监听器
- `clearListeners()` - 清除所有监听器
- `getState()` - 获取模拟器状态

## 开发

### 构建

```bash
pnpm build
```

### 测试

```bash
pnpm test
```

### 测试覆盖率

```bash
pnpm test:coverage
```

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

MIT
