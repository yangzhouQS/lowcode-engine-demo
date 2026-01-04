# DocumentModel - 文档模型

## 功能概述

[`DocumentModel`](packages/designer/src/document/document-model.ts:156) 是低代码引擎的文档模型类，负责管理单个文档的所有操作，包括节点树、选区、历史记录等。

## 主要功能

1. **节点树管理**：管理完整的节点树结构，支持节点的增删改查
2. **选区管理**：管理当前选中的节点，支持单选和多选
3. **历史记录**：支持撤销/重做操作
4. **模态节点管理**：管理模态框节点
5. **文档生命周期**：支持文档的打开、关闭、暂停、激活等
6. **节点 ID 生成**：生成唯一的节点 ID
7. **嵌套规则检查**：检查节点之间的嵌套关系是否合法
8. **组件元数据获取**：获取组件的元数据信息
9. **Schema 导入导出**：支持 schema 的导入和导出
10. **事件分发**：发送文档相关的事件

## 类定义

```typescript
export class DocumentModel implements IDocumentModel {
  rootNode: IRootNode | null;
  id: string;
  selection: ISelection;
  history: IHistory;
  modalNodesManager: IModalNodesManager;
  
  private _nodesMap = new Map<string, INode>();
  readonly project: IProject;
  readonly designer: IDesigner;
  
  @obx.shallow private nodes = new Set<INode>();
  private seqId = 0;
  private emitter: IEventBus;
  private rootNodeVisitorMap: { [visitorName: string]: any } = {};
  private _addons: Array<{ name: string; exportData: any }> = [];
  
  @obx.ref private _drillDownNode: INode | null = null;
  private _modalNode?: INode;
  private _blank?: boolean;
  private inited = false;
  @obx.shallow private willPurgeSpace: INode[] = [];
  
  @obx.shallow private activeNodes?: INode[];
  @obx.ref private _dropLocation: IDropLocation | null = null;
  @obx.ref private _opened = false;
  @obx.ref private _suspensed = false;
  
  get simulator(): ISimulatorHost | null;
  get nodesMap(): Map<string, INode>;
  get fileName(): string;
  set fileName(fileName: string);
  get focusNode(): INode | null;
  get modalNode(): INode;
  get currentRoot(): INode | null;
  get dropLocation(): IDropLocation | null;
  set dropLocation(loc: IDropLocation | null);
  get schema(): IPublicTypeRootSchema;
  get suspensed(): boolean;
  get active(): boolean;
  get actived(): boolean;
  get opened(): boolean;
  get root(): IRootNode | null;
  
  constructor(project: IProject, schema?: IPublicTypeRootSchema);
  drillDown(node: INode | null): void;
  onChangeNodeVisible(fn: (node: INode, visible: boolean) => void): IPublicTypeDisposable;
  onChangeNodeChildren(fn: (info: IPublicTypeOnChangeOptions<INode>) => void): IPublicTypeDisposable;
  addWillPurge(node: INode): void;
  removeWillPurge(node: INode): void;
  isBlank(): boolean;
  nextId(possibleId: string | undefined): string;
  getNode(id: string): INode | null;
  getNodeCount(): number;
  hasNode(id: string): boolean;
  onMountNode(fn: (payload: { node: INode }) => void);
  createNode<T extends INode = INode, C = undefined>(data: GetDataType<C, T>): T;
  destroyNode(node: INode): void;
  insertNode(parent: INode, thing: INode | IPublicTypeNodeData, at?: number | null, copy?: boolean): INode | null;
  insertNodes(parent: INode, thing: INode[] | IPublicTypeNodeData[], at?: number | null, copy?: boolean): INode[];
  removeNode(idOrNode: string | INode): void;
  internalRemoveAndPurgeNode(node: INode, useMutator = false): void;
  unlinkNode(node: INode): void;
  wrapWith(schema: IPublicTypeNodeSchema): INode | null;
  import(schema: IPublicTypeRootSchema, checkId = false): void;
  export(stage: IPublicEnumTransformStage): IPublicTypeRootSchema | undefined;
  getNodeSchema(id: string): IPublicTypeNodeData | null;
  isModified(): boolean;
  getComponent(componentName: string): any;
  getComponentMeta(componentName: string): IComponentMeta;
  setSuspense(flag: boolean): void;
  suspense(): void;
  activate(): void;
  open(): DocumentModel;
  close(): void;
  remove(): void;
  purge(): void;
  checkNesting(dropTarget: INode, dragObject: IPublicTypeDragNodeObject | IPublicTypeNodeSchema | INode | IPublicTypeDragNodeDataObject): boolean;
  checkDropTarget(dropTarget: INode, dragObject: IPublicTypeDragNodeObject | IPublicTypeDragNodeDataObject): boolean;
  checkNestingUp(parent: INode, obj: IPublicTypeNodeSchema | INode): boolean;
  checkNestingDown(parent: INode, obj: IPublicTypeNodeSchema | INode): boolean;
  getRoot(): IRootNode | null;
  toData(extraComps?: string[]): any;
  getHistory(): IHistory;
  getAddonData(name: string): any;
  exportAddonData(): any;
  registerAddon(name: string, exportData: any): void;
  acceptRootNodeVisitor(visitorName = 'default', visitorFn: (node: IRootNode) => any): any;
  getRootNodeVisitor(name: string): any;
  getComponentsMap(extraComps?: string[]): IPublicTypeComponentsMap;
  getUtilsMap(): any;
  onNodeCreate(func: (node: INode) => void): IPublicTypeDisposable;
  onNodeDestroy(func: (node: INode) => void): IPublicTypeDisposable;
  refresh(): void;
  onRefresh(func: () => void): void;
  onReady(fn: (...args: any[]) => void): IPublicTypeDisposable;
}
```

## 主要属性

### rootNode
根节点，文档的根容器节点。

类型：`IRootNode | null`

### id
文档唯一标识。

类型：`string`

### selection
选区管理器，管理当前选中的节点。

类型：[`Selection`](./selection.md)

### history
历史记录管理器，支持撤销/重做。

类型：[`History`](./history.md)

### modalNodesManager
模态节点管理器，管理模态框节点。

类型：`IModalNodesManager`

### nodesMap
节点映射，存储所有节点，通过 ID 快速查找。

类型：`Map<string, INode>`

### fileName
文件名，用于标识文档。

类型：`string`

### focusNode
焦点节点，当前操作的焦点节点。

类型：`INode | null`

### modalNode
模态节点，当前激活的模态节点。

类型：`INode`

### currentRoot
当前根节点，可能是根节点或模态节点。

类型：`INode | null`

### dropLocation
投放位置，拖拽投放的目标位置。

类型：`IDropLocation | null`

### suspensed
是否暂停状态。

类型：`boolean`

### active
是否激活状态。

类型：`boolean`

### opened
是否已打开。

类型：`boolean`

## 主要方法

### constructor(project: IProject, schema?: IPublicTypeRootSchema)
构造函数，初始化文档模型实例。

**参数：**
- `project`: 项目实例
- `schema`: 文档 schema（可选）

**初始化流程：**
1. 设置 project 和 designer
2. 创建事件总线
3. 如果没有 schema，标记为空白文档
4. 创建根节点
5. 创建历史记录管理器
6. 设置选区监听
7. 创建模态节点管理器

### createNode<T extends INode = INode, C = undefined>(data: GetDataType<C, T>): T
创建节点实例。

**参数：**
- `data`: 节点数据

**返回值：** 节点实例

**功能：**
- 根据 schema 创建节点
- 如果是 DOM 文本或表达式，创建 Leaf 节点
- 如果节点已存在，更新节点
- 否则创建新节点
- 将节点添加到 nodesMap 和 nodes
- 发送节点创建事件

**使用示例：**
```typescript
// 创建普通节点
const buttonNode = document.createNode({
  componentName: 'Button',
  props: {
    type: 'primary',
    children: 'Click me',
  },
});

// 创建文本节点
const textNode = document.createNode('Hello World');

// 创建表达式节点
const exprNode = document.createNode({
  type: 'JSExpression',
  value: 'this.state.text',
});
```

### insertNode(parent: INode, thing: INode | IPublicTypeNodeData, at?: number | null, copy?: boolean): INode | null
插入单个节点。

**参数：**
- `parent`: 父节点
- `thing`: 要插入的节点或节点数据
- `at`: 插入位置索引（可选）
- `copy`: 是否复制（可选）

**返回值：** 插入的节点

**使用示例：**
```typescript
// 在指定位置插入
const newNode = document.insertNode(containerNode, {
  componentName: 'Button',
}, 0);

// 复制节点
const copiedNode = document.insertNode(containerNode, existingNode, null, true);
```

### insertNodes(parent: INode, thing: INode[] | IPublicTypeNodeData[], at?: number | null, copy?: boolean): INode[]
插入多个节点。

**参数：**
- `parent`: 父节点
- `thing`: 要插入的节点列表或节点数据列表
- `at`: 插入位置索引（可选）
- `copy`: 是否复制（可选）

**返回值：** 插入的节点列表

**使用示例：**
```typescript
// 批量插入节点
const newNodes = document.insertNodes(containerNode, [
  { componentName: 'Button', props: { type: 'primary' } },
  { componentName: 'Button', props: { type: 'secondary' } },
]);
```

### removeNode(idOrNode: string | INode)
移除节点。

**参数：**
- `idOrNode`: 节点 ID 或节点实例

**功能：**
- 触发节点删除事件
- 调用 internalRemoveAndPurgeNode

**使用示例：**
```typescript
// 通过 ID 删除
document.removeNode('node_id');

// 通过节点实例删除
document.removeNode(node);
```

### import(schema: IPublicTypeRootSchema, checkId = false): void
导入 schema，替换当前文档内容。

**参数：**
- `schema`: 文档 schema
- `checkId`: 是否检查 ID（默认 false）

**功能：**
- 保存当前 drill-down 节点 ID
- 关闭全局事件
- 删除所有非根节点
- 导入新的 schema
- 重新创建模态节点管理器
- 恢复 drill-down 节点

**使用示例：**
```typescript
document.import({
  componentName: 'Page',
  props: {},
  children: [
    {
      componentName: 'Button',
      props: { type: 'primary' },
    },
  ],
});
```

### export(stage: IPublicEnumTransformStage): IPublicTypeRootSchema | undefined
导出文档为 schema。

**参数：**
- `stage`: 转换阶段

**转换阶段：**
- `Init`: 初始化阶段
- `Upgrade`: 升级阶段
- `Render`: 渲染阶段
- `Serilize`: 序列化阶段
- `Save`: 保存阶段

**返回值：** 文档 schema

**功能：**
- 导出根节点 schema
- 处理置顶节点（__isTopFixed__）
- 返回完整的文档 schema

**使用示例：**
```typescript
// 导出保存用的 schema
const saveSchema = document.export('Save');

// 导出渲染用的 schema
const renderSchema = document.export('Render');
```

### getNode(id: string): INode | null
根据 ID 获取节点。

**参数：**
- `id`: 节点 ID

**返回值：** 节点实例或 null

**使用示例：**
```typescript
const node = document.getNode('node_id');
if (node) {
  console.log('Node found:', node.componentName);
}
```

### nextId(possibleId: string | undefined): string
生成唯一的节点 ID。

**参数：**
- `possibleId`: 可能的 ID（可选）

**返回值：** 唯一的节点 ID

**功能：**
- 如果提供的 ID 已存在，生成新的 ID
- ID 格式：`node_{docId后10位}{seqId的36进制}`

**使用示例：**
```typescript
const id1 = document.nextId(); // 生成新 ID
const id2 = document.nextId('custom_id'); // 尝试使用指定 ID
```

### checkNesting(dropTarget: INode, dragObject: IPublicTypeDragNodeObject | IPublicTypeNodeSchema | INode | IPublicTypeDragNodeDataObject): boolean
检查嵌套关系是否合法。

**参数：**
- `dropTarget`: 投放目标节点
- `dragObject`: 拖拽对象

**返回值：** 是否可以嵌套

**功能：**
- 检查父节点对子节点的要求（parentWhitelist）
- 检查子节点对父节点的要求（childWhitelist）
- 两者都必须满足才能嵌套

**使用示例：**
```typescript
const canDrop = document.checkNesting(containerNode, {
  type: IPublicEnumDragObjectType.Node,
  nodes: [buttonNode],
});
```

### open(): DocumentModel
打开文档。

**返回值：** 文档实例

**功能：**
- 设置 opened 为 true
- 如果之前未打开，发送文档打开事件
- 如果处于暂停状态，激活文档
- 检查并设置当前文档

**使用示例：**
```typescript
document.open();
```

### close(): void
关闭文档。

**功能：**
- 设置文档为暂停状态
- 设置 opened 为 false

**使用示例：**
```typescript
document.close();
```

### remove(): void
从项目中移除文档。

**功能：**
- 发送文档移除事件
- 清理文档
- 从项目中移除文档

**使用示例：**
```typescript
document.remove();
```

### purge(): void
清理文档。

**功能：**
- 清理根节点
- 清理所有节点
- 清空 nodesMap

**使用示例：**
```typescript
document.purge();
```

### getComponentMeta(componentName: string): IComponentMeta
获取组件元数据。

**参数：**
- `componentName`: 组件名称

**返回值：** 组件元数据实例

**功能：**
- 从 designer 获取组件元数据
- 如果组件未注册，使用模拟器生成元数据

**使用示例：**
```typescript
const meta = document.getComponentMeta('Button');
console.log('Component title:', meta.title);
console.log('Available actions:', meta.availableActions);
```

### getComponentsMap(extraComps?: string[]): IPublicTypeComponentsMap
获取组件映射。

**参数：**
- `extraComps`: 额外的组件名称列表（可选）

**返回值：** 组件映射列表

**功能：**
- 遍历所有节点，收集使用的组件
- 去重组件
- 合并额外的组件

**使用示例：**
```typescript
const componentsMap = document.getComponentsMap();
console.log('Used components:', componentsMap);
```

### onNodeCreate(func: (node: INode) => void): IPublicTypeDisposable
监听节点创建事件。

**参数：**
- `func`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = document.onNodeCreate((node) => {
  console.log('Node created:', node.id, node.componentName);
});

// 清理
dispose();
```

### onNodeDestroy(func: (node: INode) => void): IPublicTypeDisposable
监听节点销毁事件。

**参数：**
- `func`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = document.onNodeDestroy((node) => {
  console.log('Node destroyed:', node.id);
});

// 清理
dispose();
```

### onChangeNodeVisible(fn: (node: INode, visible: boolean) => void): IPublicTypeDisposable
监听节点可见性变化事件。

**参数：**
- `func`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = document.onChangeNodeVisible((node, visible) => {
  console.log('Node visibility changed:', node.id, visible);
});

// 清理
dispose();
```

### onChangeNodeChildren(fn: (info: IPublicTypeOnChangeOptions<INode>) => void): IPublicTypeDisposable
监听节点子集变化事件。

**参数：**
- `func`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = document.onChangeNodeChildren((info) => {
  console.log('Node children changed:', info.type, info.node.id);
});

// 清理
dispose();
```

### drillDown(node: INode | null): void
钻取到指定节点。

**参数：**
- `node`: 目标节点或 null

**功能：**
- 设置 drill-down 节点
- 用于在组件内部编辑

**使用示例：**
```typescript
// 钻取到组件内部
document.drillDown(componentNode);

// 退出钻取
document.drillDown(null);
```

### wrapWith(schema: IPublicTypeNodeSchema): INode | null
用指定 schema 包裹当前选区中的节点。

**参数：**
- `schema`: 包裹节点的 schema

**返回值：** 包裹节点

**功能：**
- 获取当前选中的顶层节点
- 创建包裹节点
- 将选中的节点移动到包裹节点下
- 选中包裹节点

**使用示例：**
```typescript
// 用 Div 包裹选中的节点
const wrapper = document.wrapWith({
  componentName: 'Div',
  props: { className: 'wrapper' },
});
```

## 注意事项

1. **节点 ID 唯一性**：节点 ID 在文档中必须唯一，建议使用 `nextId` 生成
2. **历史记录**：所有修改操作都会被记录到历史记录中
3. **事件监听清理**：监听事件后记得在适当的时候清理，避免内存泄漏
4. **嵌套规则**：在插入节点前应该检查嵌套规则
5. **模态节点**：模态节点有特殊的处理逻辑，需要注意
6. **文档生命周期**：文档有打开、关闭、暂停、激活等状态，需要正确管理
7. **Schema 导入导出**：导入导出时需要注意转换阶段的选择

## 相关文件

- [`node/node.ts`](./node/node.md) - 节点类
- [`selection.ts`](./selection.md) - 选区管理
- [`history.ts`](./history.md) - 历史记录
- [`../designer/designer.md`](../designer/designer.md) - 设计器核心
- [`../project/project.md`](../project/project.md) - 项目管理

## 外部依赖

- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
