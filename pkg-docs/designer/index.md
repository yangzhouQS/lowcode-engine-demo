# Designer 模块概览

## 功能概述

Designer 模块是低代码引擎的核心设计器模块，负责提供可视化的设计能力，包括组件拖拽、属性配置、文档管理、模拟器渲染等功能。

## 主要功能

### 1. 核心设计能力
- **拖拽系统**：提供完整的拖拽引擎（Dragon），支持节点拖拽、外部拖拽、复制拖拽等
- **选区管理**：支持单选、多选、批量操作
- **悬停检测**：实时检测鼠标悬停的节点，提供视觉反馈
- **位置计算**：精确计算拖拽投放位置，支持各种布局场景

### 2. 文档模型
- **文档管理**：支持多文档管理，可以打开、关闭、切换文档
- **节点树**：完整的节点树结构，支持节点的增删改查
- **属性系统**：灵活的属性管理系统，支持嵌套属性、表达式、列表等
- **历史记录**：支持撤销/重做操作

### 3. 模拟器
- **内置模拟器**：提供完整的画布模拟器，支持实时预览
- **设备模拟**：支持多种设备尺寸模拟
- **实时编辑**：支持在画布上直接编辑文本内容
- **事件处理**：处理画布上的鼠标、键盘等事件

### 4. 组件系统
- **组件元数据**：管理组件的元数据信息，包括属性配置、行为配置等
- **组件操作**：提供删除、复制、锁定、隐藏等组件操作
- **嵌套规则**：支持父子组件的嵌套规则配置

### 5. 设置面板
- **属性配置**：提供可视化的属性配置面板
- **Setter 机制**：灵活的 Setter 机制，支持自定义属性编辑器
- **多节点编辑**：支持同时编辑多个节点的公共属性

### 6. 插件系统
- **插件管理**：完整的插件生命周期管理
- **插件上下文**：提供丰富的插件 API
- **依赖管理**：支持插件间的依赖关系

## 模块结构

```
packages/designer/
├── src/
│   ├── index.ts                      # 模块入口
│   ├── component-actions.ts           # 组件操作管理
│   ├── component-meta.ts             # 组件元数据
│   ├── context-menu-actions.ts       # 右键菜单操作
│   ├── simulator.ts                  # 模拟器接口定义
│   ├── designer/                    # 设计器核心
│   │   ├── designer.ts              # 设计器核心类
│   │   ├── dragon.ts                # 拖拽引擎
│   │   ├── detecting.ts             # 悬停检测
│   │   ├── location.ts              # 位置管理
│   │   ├── clipboard.ts             # 剪贴板
│   │   ├── active-tracker.ts        # 活动追踪
│   │   ├── scroller.ts              # 滚动器
│   │   ├── offset-observer.ts       # 偏移观察器
│   │   └── setting/                # 设置面板
│   ├── document/                    # 文档模型
│   │   ├── document-model.ts        # 文档模型
│   │   ├── node/                    # 节点相关
│   │   │   ├── node.ts             # 节点类
│   │   │   ├── node-children.ts    # 节点子集
│   │   │   ├── props/              # 属性管理
│   │   │   ├── modal-nodes-manager.ts # 模态节点管理
│   │   │   ├── exclusive-group.ts   # 互斥组
│   │   │   └── transform-stage.ts  # 转换阶段
│   │   ├── selection.ts             # 选区管理
│   │   └── history.ts              # 历史记录
│   ├── project/                     # 项目管理
│   │   ├── project.ts              # 项目类
│   │   └── project-view.tsx        # 项目视图
│   ├── builtin-simulator/            # 内置模拟器
│   │   ├── host.ts                 # 模拟器宿主
│   │   ├── renderer.ts             # 渲染器接口
│   │   ├── viewport.ts             # 视口
│   │   ├── create-simulator.ts      # 模拟器创建
│   │   ├── bem-tools/              # 边界元素工具
│   │   ├── live-editing/           # 实时编辑
│   │   ├── node-selector/          # 节点选择器
│   │   └── utils/                 # 工具函数
│   ├── plugin/                      # 插件系统
│   │   ├── plugin-manager.ts        # 插件管理器
│   │   ├── plugin.ts               # 插件运行时
│   │   ├── plugin-context.ts       # 插件上下文
│   │   ├── plugin-types.ts         # 插件类型
│   │   ├── plugin-utils.ts         # 插件工具
│   │   └── sequencify.ts          # 插件排序
│   ├── transducers/                 # 数据转换器
│   ├── types/                       # 类型定义
│   ├── utils/                       # 工具函数
│   ├── icons/                       # 图标组件
│   └── locale/                      # 国际化
```

## API 设计

### 核心接口

#### IDesigner
设计器核心接口，提供设计器的所有核心能力：

```typescript
interface IDesigner {
  readonly project: IProject;
  get dragon(): IDragon;
  get activeTracker(): IActiveTracker;
  get componentActions(): ComponentActions;
  get contextMenuActions(): ContextMenuActions;
  get editor(): IPublicModelEditor;
  get detecting(): Detecting;
  get currentSelection(): ISelection;
  
  createScroller(scrollable: IPublicTypeScrollable): IPublicModelScroller;
  refreshComponentMetasMap(): void;
  createOffsetObserver(nodeInstance: INodeSelector): OffsetObserver | null;
  createLocation(locationData: IPublicTypeLocationData<INode>): DropLocation;
  get componentsMap(): { [key: string]: IPublicTypeNpmInfo | Component };
  loadIncrementalAssets(incrementalAssets: IPublicTypeAssetsJson): Promise<void>;
  getComponentMeta(componentName: string, generateMetadata?: () => IPublicTypeComponentMetadata | null): IComponentMeta;
  clearLocation(): void;
  createComponentMeta(data: IPublicTypeComponentMetadata): IComponentMeta | null;
  getComponentMetasMap(): Map<string, IComponentMeta>;
  addPropsReducer(reducer: IPublicTypePropsTransducer, stage: IPublicEnumTransformStage): void;
  postEvent(event: string, ...args: any[]): void;
  transformProps(props: IPublicTypeCompositeObject | IPublicTypePropsList, node: Node, stage: IPublicEnumTransformStage): IPublicTypeCompositeObject | IPublicTypePropsList;
  createSettingEntry(nodes: INode[]): ISettingTopEntry;
  autorun(effect: (reaction: IReactionPublic) => void, options?: IReactionOptions<any, any>): IReactionDisposer;
}
```

#### IDocumentModel
文档模型接口，管理单个文档的所有操作：

```typescript
interface IDocumentModel {
  readonly designer: IDesigner;
  selection: ISelection;
  get rootNode(): INode | null;
  get simulator(): ISimulatorHost | null;
  get active(): boolean;
  get nodesMap(): Map<string, INode>;
  get suspensed(): boolean;
  get fileName(): string;
  get currentRoot(): INode | null;
  
  isBlank(): boolean;
  getNode(id: string): INode | null;
  getRoot(): INode | null;
  getHistory(): IHistory;
  checkNesting(dropTarget: INode, dragObject: IPublicTypeDragNodeObject | IPublicTypeNodeSchema | INode | IPublicTypeDragNodeDataObject): boolean;
  getNodeCount(): number;
  nextId(possibleId: string | undefined): string;
  import(schema: IPublicTypeRootSchema, checkId?: boolean): void;
  export(stage: IPublicEnumTransformStage): IPublicTypeRootSchema | undefined;
  onNodeCreate(func: (node: INode) => void): IPublicTypeDisposable;
  onNodeDestroy(func: (node: INode) => void): IPublicTypeDisposable;
  onChangeNodeVisible(fn: (node: INode, visible: boolean) => void): IPublicTypeDisposable;
  addWillPurge(node: INode): void;
  removeWillPurge(node: INode): void;
  getComponentMeta(componentName: string): IComponentMeta;
  insertNodes(parent: INode, thing: INode[] | IPublicTypeNodeData[], at?: number | null, copy?: boolean): INode[];
  open(): IDocumentModel;
  remove(): void;
  suspense(): void;
  close(): void;
  unlinkNode(node: INode): void;
  destroyNode(node: INode): void;
}
```

#### INode
节点接口，表示树结构中的一个节点：

```typescript
interface INode {
  readonly document: IDocumentModel;
  readonly id: string;
  readonly componentName: string;
  readonly props: IProps;
  get parent(): INode | null;
  get children(): INodeChildren | null;
  get zLevel(): number;
  get title(): string | IPublicTypeI18nData | ReactElement;
  get icon(): any;
  get isPurged(): boolean;
  get isPurging(): boolean;
  get status(): NodeStatus;
  get componentMeta(): IComponentMeta;
  get settingEntry(): ISettingTopEntry;
  get index(): number | undefined;
  get nextSibling(): INode | null | undefined;
  get prevSibling(): INode | null | undefined;
  get schema(): IPublicTypeNodeSchema;
  
  isContainer(): boolean;
  isModal(): boolean;
  isRoot(): boolean;
  isPage(): boolean;
  isComponent(): boolean;
  isSlot(): boolean;
  isParental(): boolean;
  isLeaf(): boolean;
  isEmpty(): boolean;
  canSelect(): boolean;
  
  remove(useMutator?: boolean, purge?: boolean, options?: NodeRemoveOptions): void;
  lock(flag?: boolean): void;
  get isLocked(): boolean;
  select(): void;
  hover(flag?: boolean): void;
  
  getProp(path: string, createIfNone?: boolean): IProp | null;
  getExtraProp(key: string, createIfNone?: boolean): IProp | null;
  setExtraProp(key: string, value: IPublicTypeCompositeValue): void;
  getPropValue(path: string): any;
  setPropValue(path: string, value: any): void;
  clearPropValue(path: string): void;
  mergeProps(props: IPublicTypePropsMap): void;
  setProps(props?: IPublicTypePropsMap | IPublicTypePropsList | Props | null): void;
  
  contains(node: INode): boolean;
  getZLevelTop(zLevel: number): INode | null;
  comparePosition(otherNode: INode): PositionNO;
  
  setVisible(flag: boolean): void;
  getVisible(): boolean;
  
  export<T = IPublicTypeNodeSchema>(stage?: IPublicEnumTransformStage, options?: any): T;
  import(data: IPublicTypeNodeSchema, checkId?: boolean): void;
  
  canPerformAction(actionName: string): boolean;
  purge(): void;
}
```

#### ISimulatorHost
模拟器宿主接口，提供画布渲染能力：

```typescript
interface ISimulatorHost<P = object> {
  readonly isSimulator: true;
  readonly viewport: IViewport;
  readonly contentWindow?: Window;
  readonly contentDocument?: Document;
  readonly renderer?: BuiltinSimulatorRenderer;
  readonly project: IProject;
  readonly designer: IDesigner;
  
  setProps(props: P): void;
  set(key: string, value: any): void;
  setSuspense(suspensed: boolean): void;
  
  setNativeSelection(enableFlag: boolean): void;
  setDraggingState(state: boolean): void;
  setCopyState(state: boolean): void;
  clearState(): void;
  
  scrollToNode(node: INode, detail?: any): void;
  generateComponentMetadata(componentName: string): IPublicTypeComponentMetadata;
  getComponent(componentName: string): Component | any;
  getComponentInstances(node: INode): IPublicTypeComponentInstance[] | null;
  createComponent(schema: IPublicTypeNodeSchema): Component | null;
  getComponentContext(node: INode): object | null;
  getClosestNodeInstance(from: IPublicTypeComponentInstance, specId?: string): IPublicTypeNodeInstance | null;
  computeRect(node: INode): DOMRect | null;
  computeComponentInstanceRect(instance: IPublicTypeComponentInstance, selector?: string): DOMRect | null;
  findDOMNodes(instance: IPublicTypeComponentInstance, selector?: string): Array<Element | Text> | null;
  getDropContainer(e: ILocateEvent): DropContainer | null;
  postEvent(evtName: string, evtData: any): void;
  rerender(): void;
  purge(): void;
  setupComponents(library: IPublicTypePackage[]): Promise<void>;
}
```

## 架构模式

### 1. 分层架构

Designer 模块采用清晰的分层架构：

```
┌─────────────────────────────────────────┐
│         Plugin Layer (插件层)          │
│  提供扩展能力，支持自定义功能        │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│       Designer Layer (设计器层)        │
│  核心设计逻辑：拖拽、选区、检测等    │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│      Document Layer (文档层)           │
│  文档模型、节点树、属性、历史记录     │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│    Simulator Layer (模拟器层)          │
│  画布渲染、事件处理、实时编辑         │
└─────────────────────────────────────────┘
```

### 2. 观察者模式

大量使用 MobX 的响应式特性，实现数据驱动的 UI 更新：

```typescript
// 使用 @obx 装饰器标记可观察属性
@obx.ref private _dragging = false;
@obx.shallow readonly documents: IDocumentModel[] = [];

// 使用 @computed 装饰器标记计算属性
@computed get currentDocument(): IDocumentModel | null | undefined {
  return this.documents.find((doc) => doc.active);
}

// 使用 @action 装饰器标记修改操作
@action
import(schema: IPublicTypeRootSchema, checkId = false) {
  // 导入 schema
}
```

### 3. 事件驱动

使用事件总线进行模块间通信：

```typescript
// 创建事件总线
private emitter: IEventBus = createModuleEventBus('DocumentModel');

// 发送事件
this.emitter.emit('nodecreate', node);

// 监听事件
this.emitter.on('nodecreate', (node) => {
  // 处理节点创建
});

// 移除监听
this.emitter.removeListener('nodecreate', handler);
```

### 4. 工厂模式

使用工厂模式创建各种对象：

```typescript
// 创建节点
createNode<T extends INode = INode, C = undefined>(data: GetDataType<C, T>): T;

// 创建属性
new Prop(this, value, key, spread, options);

// 创建设置入口
new SettingTopEntry(this.editor, nodes);
```

### 5. 策略模式

使用策略模式处理不同的拖拽场景：

```typescript
// 不同的拖拽对象类型
type IPublicTypeDragNodeObject = {
  type: IPublicEnumDragObjectType.Node;
  nodes: INode[];
};

type IPublicTypeDragNodeDataObject = {
  type: IPublicEnumDragObjectType.NodeData;
  data: IPublicTypeNodeData | IPublicTypeNodeData[];
};

type IPublicTypeDragAnyObject = {
  type: string;
  data: any;
};
```

### 6. 命令模式

使用命令模式封装操作，支持撤销/重做：

```typescript
// 历史记录管理
class History {
  back() {
    // 撤销
  }
  
  forward() {
    // 重做
  }
  
  savePoint() {
    // 保存当前状态
  }
}
```

### 7. 组合模式

节点树采用组合模式：

```typescript
// 节点可以是容器节点（有子节点）或叶子节点
class Node {
  get children(): INodeChildren | null;
  
  isParental(): boolean {
    return this.isParentalNode;
  }
  
  isLeaf(): boolean {
    return this.componentName === 'Leaf';
  }
}
```

### 8. 代理模式

使用 Proxy 提供插件访问的便捷方式：

```typescript
toProxy() {
  return new Proxy(this, {
    get(target, prop, receiver) {
      if (target.pluginsMap.has(prop as string)) {
        return target.pluginsMap.get(prop as string)?.toProxy();
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}
```

## 核心流程

### 拖拽流程

```
用户按下鼠标
    ↓
Dragon.boost() - 启动拖拽
    ↓
检测拖拽对象类型（节点/节点数据/其他）
    ↓
mousemove 事件触发
    ↓
Dragon.drag() - 处理拖拽移动
    ↓
Sensor.locate() - 计算投放位置
    ↓
Designer.createLocation() - 创建位置对象
    ↓
mouseup 事件触发
    ↓
Dragon.over() - 结束拖拽
    ↓
Document.insertNodes() - 插入节点
    ↓
触发相关事件和渲染更新
```

### 节点操作流程

```
用户操作（如删除节点）
    ↓
Node.remove() - 调用节点删除
    ↓
NodeChildren.internalDelete() - 从子集中删除
    ↓
Node.internalSetParent() - 设置父节点为 null
    ↓
Document.removeWillPurge() - 添加到待销毁列表
    ↓
触发 onNodeDestroy 事件
    ↓
触发 NODE_VISIBLE_CHANGE 事件
    ↓
触发 NODE_CHILDREN_CHANGE 事件
    ↓
模拟器重新渲染
```

### 属性修改流程

```
用户修改属性值
    ↓
SettingField.setValue() - 设置属性值
    ↓
Prop.setValue() - 设置属性值
    ↓
触发 propChange 事件
    ↓
Node.emitPropChange() - 发送属性变更事件
    ↓
触发 GlobalEvent.Node.Prop.Change 事件
    ↓
History 记录状态
    ↓
模拟器重新渲染
```

## 使用示例

### 创建设计器

```typescript
import { Designer } from '@alilc/lowcode-designer';

const designer = new Designer({
  editor: editor,
  shellModelFactory: shellModelFactory,
  defaultSchema: projectSchema,
  componentMetadatas: componentMetas,
  simulatorProps: {
    designMode: 'design',
    device: 'mobile',
  },
});
```

### 操作节点

```typescript
// 获取当前文档
const document = designer.project.currentDocument;

// 获取根节点
const rootNode = document.rootNode;

// 创建节点
const newNode = document.createNode({
  componentName: 'Button',
  props: {
    type: 'primary',
    children: 'Click me',
  },
});

// 插入节点
document.insertNode(rootNode, newNode, 0);

// 选择节点
newNode.select();

// 设置属性
newNode.setPropValue('type', 'secondary');

// 删除节点
newNode.remove();
```

### 监听事件

```typescript
// 监听节点创建
document.onNodeCreate((node) => {
  console.log('Node created:', node.id);
});

// 监听节点销毁
document.onNodeDestroy((node) => {
  console.log('Node destroyed:', node.id);
});

// 监听选区变化
document.selection.onSelectionChange((ids) => {
  console.log('Selection changed:', ids);
});

// 监听属性变更
node.onPropChange((info) => {
  console.log('Prop changed:', info);
});
```

### 使用模拟器

```typescript
// 获取模拟器
const simulator = document.simulator;

// 滚动到节点
simulator.scrollToNode(node);

// 获取组件实例
const instances = simulator.getComponentInstances(node);

// 计算节点位置
const rect = simulator.computeRect(node);

// 查找 DOM 节点
const domNodes = simulator.findDOMNodes(instances[0]);
```

## 注意事项

1. **节点 ID 唯一性**：节点 ID 在文档中必须唯一，建议使用 `document.nextId()` 生成
2. **属性修改**：修改属性应该通过 `setPropValue` 方法，不要直接修改 `props` 对象
3. **事件监听**：监听事件后记得在适当的时候移除监听，避免内存泄漏
4. **历史记录**：批量操作时可以使用 `transactionManager` 来避免产生过多历史记录
5. **嵌套规则**：在插入节点前应该检查嵌套规则，使用 `checkNesting` 方法
6. **性能优化**：大量节点操作时建议使用批量操作方法，如 `insertNodes` 而不是多次调用 `insertNode`
7. **插件开发**：插件应该通过插件管理器注册，不要直接访问内部 API
8. **模拟器隔离**：模拟器运行在独立的 iframe 中，注意跨域限制和通信方式

## 相关文档

- [index.ts](./index.md) - 模块入口
- [component-actions.ts](./component-actions.md) - 组件操作管理
- [component-meta.ts](./component-meta.md) - 组件元数据
- [context-menu-actions.ts](./context-menu-actions.md) - 右键菜单操作
- [simulator.ts](./simulator.md) - 模拟器接口
- [designer/designer.ts](./designer/designer.md) - 设计器核心
- [designer/dragon.ts](./designer/dragon.md) - 拖拽引擎
- [designer/detecting.ts](./designer/detecting.md) - 悬停检测
- [designer/location.ts](./designer/location.md) - 位置管理
- [document/document-model.ts](./document/document-model.md) - 文档模型
- [document/node/node.ts](./document/node/node.md) - 节点类
- [document/node/props/props.ts](./document/node/props/props.md) - 属性管理
- [document/selection.ts](./document/selection.md) - 选区管理
- [document/history.ts](./document/history.md) - 历史记录
- [project/project.ts](./project/project.md) - 项目管理
- [builtin-simulator/host.ts](./builtin-simulator/host.md) - 模拟器宿主
- [plugin/plugin-manager.ts](./plugin/plugin-manager.md) - 插件管理器
