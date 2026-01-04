# Node - 节点类

## 功能概述

[`Node`](packages/designer/src/document/node/node.ts:215) 是低代码引擎的节点类，表示文档树中的一个节点，可以是页面、组件、叶子节点等。

## 主要功能

1. **节点类型判断**：判断节点是否为根节点、页面、组件、容器、叶子节点等
2. **属性管理**：管理节点的属性，包括获取、设置、删除等操作
3. **子集管理**：管理节点的子节点，支持插入、删除、移动等操作
4. **父节点管理**：管理节点的父节点关系
5. **节点操作**：提供删除、选择、悬停、锁定等操作
6. **Schema 导入导出**：支持将节点导出为 schema 或从 schema 导入
7. **位置关系判断**：判断节点之间的包含、前后关系
8. **条件渲染**：支持条件渲染和条件组
9. **循环渲染**：支持循环渲染
10. **可见性控制**：控制节点的可见性

## 类定义

```typescript
export class Node<Schema extends IPublicTypeNodeSchema = IPublicTypeNodeSchema> implements IBaseNode {
  readonly isNode = true;
  readonly id: string;
  readonly componentName: string;
  props: IProps;
  protected _children?: INodeChildren;
  
  @obx.ref private _parent: INode | null = null;
  
  get parent(): INode | null;
  get children(): INodeChildren | null;
  @computed get zLevel(): number;
  @computed get title(): string | IPublicTypeI18nData | ReactElement;
  get icon(): any;
  isInited = false;
  _settingEntry: ISettingTopEntry;
  
  get settingEntry(): ISettingTopEntry;
  
  private _isRGLContainer = false;
  get isRGLContainer(): boolean;
  
  get isEmptyNode(): boolean;
  
  private _slotFor?: IProp | null | undefined = null;
  @obx.shallow _slots: INode[] = [];
  get slots(): INode[];
  
  @obx.ref private _conditionGroup: IExclusiveGroup | null = null;
  get conditionGroup(): IExclusiveGroup | null;
  
  private purged = false;
  get isPurged(): boolean;
  
  private purging: boolean = false;
  get isPurging(): boolean;
  
  @obx.shallow status: NodeStatus;
  
  get componentMeta(): IComponentMeta;
  @computed get propsData(): IPublicTypePropsMap | IPublicTypePropsList | null;
  
  hasSlots(): boolean;
  
  isContainer(): boolean;
  get isContainerNode(): boolean;
  
  isModal(): boolean;
  get isModalNode(): boolean;
  
  isRoot(): boolean;
  get isRootNode(): boolean;
  
  isPage(): boolean;
  get isPageNode(): boolean;
  
  isComponent(): boolean;
  get isComponentNode(): boolean;
  
  isSlot(): boolean;
  get isSlotNode(): boolean;
  
  isParental(): boolean;
  get isParentalNode(): boolean;
  
  isLeaf(): boolean;
  get isLeafNode(): boolean;
  
  internalSetWillPurge(): void;
  
  didDropIn(dragment: INode): void;
  didDropOut(dragment: INode): void;
  
  internalSetParent(parent: INode | null, useMutator = false): void;
  
  internalSetSlotFor(slotFor: Prop | null | undefined): void;
  
  internalToShellNode(): IPublicModelNode | null;
  
  get slotFor(): IProp | null | undefined;
  
  remove(useMutator = true, purge = true, options: NodeRemoveOptions = { suppressRemoveEvent: false }): void;
  
  lock(flag = true): void;
  get isLocked(): boolean;
  
  canSelect(): boolean;
  
  select(): void;
  
  hover(flag = true): void;
  
  @computed get componentMeta(): IComponentMeta;
  
  hasCondition(): boolean;
  
  hasLoop(): boolean;
  
  wrapWith(schema: Schema): any;
  
  replaceWith(schema: Schema, migrate = false): any;
  
  replaceChild(node: INode, data: any): INode | null;
  
  setVisible(flag: boolean): void;
  getVisible(): boolean;
  
  onVisibleChange(func: (flag: boolean) => any): () => void;
  
  getProp(path: string, createIfNone = true): IProp | null;
  getExtraProp(key: string, createIfNone = true): IProp | null;
  setExtraProp(key: string, value: IPublicTypeCompositeValue): void;
  
  getPropValue(path: string): any;
  setPropValue(path: string, value: any): void;
  clearPropValue(path: string): void;
  
  mergeProps(props: IPublicTypePropsMap): void;
  setProps(props?: IPublicTypePropsMap | IPublicTypePropsList | Props | null): void;
  
  @computed get index(): number | undefined;
  
  get nextSibling(): INode | null | undefined;
  get prevSibling(): INode | null | undefined;
  
  get schema(): Schema;
  set schema(data: Schema);
  
  import(data: Schema, checkId = false): void;
  
  toData(): any;
  
  export<T = IPublicTypeNodeSchema>(stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Save, options: any = {}): T;
  
  contains(node: INode): boolean;
  
  getZLevelTop(zLevel: number): INode | null;
  
  comparePosition(otherNode: INode): PositionNO;
  
  unlinkSlot(slotNode: INode): void;
  
  removeSlot(slotNode: INode): boolean;
  
  addSlot(slotNode: INode): void;
  
  isValidComponent(): boolean;
  
  removeChild(node: INode): void;
  
  purge(): void;
  
  internalPurgeStart(): void;
  
  canPerformAction(actionName: string): boolean;
  
  isEmpty(): boolean;
  
  getChildren(): INodeChildren | null;
  
  getComponentName(): string;
  
  insert(node: INode, ref?: INode, useMutator = true): void;
  
  insertBefore(node: INode, ref?: INode, useMutator = true): void;
  
  insertAfter(node: any, ref?: INode, useMutator = true): void;
  
  getParent(): INode | null;
  
  getId(): string;
  
  getIndex(): number;
  
  getNode(): INode;
  
  getRoot(): INode;
  
  getProps(): IProps;
  
  onChildrenChange(fn: (param?: { type: string; node: INode }) => void): IPublicTypeDisposable | undefined;
  
  mergeChildren(remover: (node: INode, idx: number) => any, adder: (children: INode[]) => IPublicTypeNodeData[] | null, sorter: (firstNode: INode, secondNode: INode) => any): void;
  
  getStatus(field?: keyof NodeStatus);
  setStatus(field: keyof NodeStatus, flag: boolean): void;
  
  getDOMNode(): any;
  
  getPage(): IDocumentModel;
  
  getRGL(): { isContainerNode: boolean; isEmptyNode: boolean; isRGLContainerNode: boolean; isRGLNode: boolean; isRGL: boolean; rglNode: Node | null };
  
  getSuitablePlace(node: INode, ref: any): any;
  
  getAddonData(key: string): any;
  
  registerAddon(key: string, exportData: () => any, isProp = false): void;
  
  getRect(): DOMRect | null;
  
  getPrototype(): any;
  
  setPrototype(proto: any): void;
  
  getIcon(): any;
  
  toString(): string;
  
  emitPropChange(val: IPublicTypePropChangeOptions): void;
  
  onPropChange(func: (info: IPublicTypePropChangeOptions) => void): IPublicTypeDisposable;
}
```

## 主要属性

### id
节点唯一标识。

类型：`string`

### componentName
组件名称，如 Page、Button、Div 等。

类型：`string`

### props
节点属性管理器。

类型：[`IProps`](./props/props.md)

### parent
父节点。

类型：`INode | null`

### children
子节点集合。

类型：`INodeChildren | null`

### zLevel
节点深度，根节点为 0，每下一层加 1。

类型：`number`

### title
节点标题，用于显示。

类型：`string | IPublicTypeI18nData | ReactElement`

### icon
节点图标。

类型：`any`

### componentMeta
组件元数据。

类型：[`IComponentMeta`](../../component-meta.md)

### status
节点状态，包括锁定、伪类、就地编辑等。

类型：`NodeStatus`

```typescript
interface NodeStatus {
  locking: boolean;
  pseudo: boolean;
  inPlaceEditing: boolean;
}
```

## 主要方法

### remove(useMutator = true, purge = true, options: NodeRemoveOptions = { suppressRemoveEvent: false }): void
移除节点。

**参数：**
- `useMutator`: 是否触发联动逻辑（默认 true）
- `purge`: 是否销毁节点（默认 true）
- `options`: 删除选项

**功能：**
- 如果节点有父节点，从父节点的子集中移除
- 如果是 Slot 节点，从父节点的 slots 中移除
- 触发节点删除事件

**使用示例：**
```typescript
// 默认删除
node.remove();

// 不销毁，只从树中移除
node.remove(true, false);

// 不触发删除事件
node.remove(true, true, { suppressRemoveEvent: true });
```

### lock(flag = true): void
锁定或解锁节点。

**参数：**
- `flag`: 是否锁定（默认 true）

**功能：**
- 设置 isLocked 属性
- 锁定后节点不能被选中、悬停、拖拽

**使用示例：**
```typescript
// 锁定节点
node.lock();

// 解锁节点
node.lock(false);
```

### select(): void
选中节点。

**功能：**
- 将节点添加到文档的选区中

**使用示例：**
```typescript
node.select();
```

### hover(flag = true): void
悬停高亮节点。

**参数：**
- `flag`: 是否悬停（默认 true）

**功能：**
- 将节点添加到设计器的悬停检测器中

**使用示例：**
```typescript
// 悬停高亮
node.hover();

// 取消悬停
node.hover(false);
```

### getProp(path: string, createIfNone = true): IProp | null
获取属性。

**参数：**
- `path`: 属性路径
- `createIfNone`: 不存在时是否创建（默认 true）

**返回值：** 属性对象或 null

**使用示例：**
```typescript
// 获取属性
const prop = node.getProp('type');
console.log('Prop value:', prop?.value);

// 不创建
const prop = node.getProp('nonexistent', false);
console.log('Prop:', prop); // null
```

### setPropValue(path: string, value: any): void
设置属性值。

**参数：**
- `path`: 属性路径
- `value`: 属性值

**使用示例：**
```typescript
node.setPropValue('type', 'primary');
```

### clearPropValue(path: string): void
清除属性值。

**参数：**
- `path`: 属性路径

**使用示例：**
```typescript
node.clearPropValue('type');
```

### mergeProps(props: IPublicTypePropsMap): void
合并属性。

**参数：**
- `props`: 要合并的属性对象

**功能：**
- 将新属性合并到现有属性中

**使用示例：**
```typescript
node.mergeProps({
  type: 'primary',
  size: 'large',
});
```

### setProps(props?: IPublicTypePropsMap | IPublicTypePropsList | Props | null): void
设置属性。

**参数：**
- `props`: 属性对象或列表

**功能：**
- 替换现有属性

**使用示例：**
```typescript
node.setProps({
  type: 'primary',
  children: 'Click me',
});
```

### insertBefore(node: INode, ref?: INode, useMutator = true): void
在指定节点之前插入。

**参数：**
- `node`: 要插入的节点
- `ref`: 参考节点
- `useMutator`: 是否触发联动逻辑

**使用示例：**
```typescript
// 在 refNode 之前插入
node.insertBefore(newNode, refNode);

// 插入到最前面
node.insertBefore(newNode);
```

### insertAfter(node: any, ref?: INode, useMutator = true): void
在指定节点之后插入。

**参数：**
- `node`: 要插入的节点
- `ref`: 参考节点
- `useMutator`: 是否触发联动逻辑

**使用示例：**
```typescript
// 在 refNode 之后插入
node.insertAfter(newNode, refNode);

// 插入到最后面
node.insertAfter(newNode);
```

### setVisible(flag: boolean): void
设置节点可见性。

**参数：**
- `flag`: 是否可见

**功能：**
- 设置 hidden 属性
- 触发可见性变化事件

**使用示例：**
```typescript
// 隐藏节点
node.setVisible(false);

// 显示节点
node.setVisible(true);
```

### contains(node: INode): boolean
判断是否包含指定节点。

**参数：**
- `node`: 要检查的节点

**返回值：** 是否包含

**使用示例：**
```typescript
if (parentNode.contains(childNode)) {
  console.log('childNode 是 parentNode 的子节点');
}
```

### comparePosition(otherNode: INode): PositionNO
比较两个节点的位置关系。

**参数：**
- `otherNode`: 要比较的节点

**返回值：** 位置关系

```typescript
enum PositionNO {
  Contains = 16,      // thisNode 包含 otherNode
  ContainedBy = 8,    // thisNode 被 otherNode 包含
  BeforeOrAfter = 2,   // thisNode 在 otherNode 之前或之后
  TheSame = 0,        // thisNode 与 otherNode 相同
}
```

**使用示例：**
```typescript
const pos = node1.comparePosition(node2);
if (pos === PositionNO.Contains) {
  console.log('node1 包含 node2');
}
```

### export<T = IPublicTypeNodeSchema>(stage?: IPublicEnumTransformStage, options?: any): T
导出节点为 schema。

**参数：**
- `stage`: 转换阶段
- `options`: 选项

**返回值：** 节点 schema

**使用示例：**
```typescript
// 导出保存用的 schema
const saveSchema = node.export('Save');

// 导出渲染用的 schema
const renderSchema = node.export('Render');
```

### import(data: Schema, checkId = false): void
从 schema 导入节点数据。

**参数：**
- `data`: 节点 schema
- `checkId`: 是否检查 ID

**使用示例：**
```typescript
node.import({
  componentName: 'Button',
  props: {
    type: 'primary',
  },
});
```

### wrapWith(schema: Schema): any
用指定 schema 包裹当前节点。

**参数：**
- `schema`: 包裹节点的 schema

**返回值：** 包裹后的子节点

**使用示例：**
```typescript
// 用 Div 包裹当前节点
const child = node.wrapWith({
  componentName: 'Div',
  props: { className: 'wrapper' },
});
```

### replaceWith(schema: Schema, migrate = false): any
用指定 schema 替换当前节点。

**参数：**
- `schema`: 新的节点 schema
- `migrate`: 是否迁移旧数据

**返回值：** 新节点

**使用示例：**
```typescript
// 替换节点
const newNode = node.replaceWith({
  componentName: 'Button',
  props: { type: 'secondary' },
});
```

## 节点类型判断

### isRoot()
是否为根节点。

```typescript
isRoot(): boolean {
  return this.isRootNode;
}

get isRootNode(): boolean {
  return this.document.rootNode === (this as any);
}
```

### isPage()
是否为页面节点。

```typescript
isPage(): boolean {
  return this.isPageNode;
}

get isPageNode(): boolean {
  return this.isRootNode && this.componentName === 'Page';
}
```

### isComponent()
是否为组件节点。

```typescript
isComponent(): boolean {
  return this.isComponentNode;
}

get isComponentNode(): boolean {
  return this.isRootNode && this.componentName === 'Component';
}
```

### isContainer()
是否为容器节点。

```typescript
isContainer(): boolean {
  return this.isContainerNode;
}

get isContainerNode(): boolean {
  return this.isParentalNode && this.componentMeta.isContainer;
}
```

### isLeaf()
是否为叶子节点（文本或表达式）。

```typescript
isLeaf(): boolean {
  return this.isLeafNode;
}

get isLeafNode(): boolean {
  return this.componentName === 'Leaf';
}
```

### isSlot()
是否为插槽节点。

```typescript
isSlot(): boolean {
  return this.isSlotNode;
}

get isSlotNode(): boolean {
  return this._slotFor != null && this.componentName === 'Slot';
}
```

### isModal()
是否为模态节点。

```typescript
isModal(): boolean {
  return this.isModalNode;
}

get isModalNode(): boolean {
  return this.componentMeta.isModal;
}
```

## 条件渲染和循环渲染

### hasCondition()
是否有条件渲染。

```typescript
hasCondition() {
  const v = this.getExtraProp('condition', false)?.getValue();
  return v != null && v !== '' && v !== true;
}
```

### hasLoop()
是否有循环渲染。

```typescript
hasLoop() {
  const value = this.getExtraProp('loop', false)?.getValue();
  if (value === undefined || value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return true;
  }
  if (isJSExpression(value)) {
    return true;
  }
  return false;
}
```

## 注意事项

1. **节点 ID 唯一性**：节点 ID 在文档中必须唯一
2. **属性修改**：修改属性应该通过 `setPropValue` 方法
3. **父节点关系**：不要直接修改 `_parent` 属性
4. **子节点操作**：子节点操作应该通过 `children` 对象进行
5. **事件监听**：监听事件后记得清理
6. **节点销毁**：节点销毁后不能再使用
7. **Slot 节点**：Slot 节点有特殊的处理逻辑
8. **条件渲染**：条件渲染和循环渲染会影响节点的可见性

## 相关文件

- [`node-children.ts`](./node-children.md) - 节点子集
- [`props/props.ts`](./props/props.md) - 属性管理
- [`../document-model.ts`](../document-model.md) - 文档模型
- [`../../component-meta.ts`](../../component-meta.md) - 组件元数据

## 外部依赖

- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
