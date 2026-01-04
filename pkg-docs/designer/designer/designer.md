# Designer - 设计器核心类

## 功能概述

[`Designer`](packages/designer/src/designer/designer.ts:123) 是低代码引擎的核心设计器类，负责协调所有设计器相关的功能，包括拖拽系统、文档管理、组件元数据、模拟器等。

## 主要功能

1. **拖拽系统管理**：管理 Dragon 拖拽引擎，处理拖拽开始、拖拽过程、拖拽结束事件
2. **文档管理**：通过 Project 管理多个文档，支持文档的创建、打开、关闭、切换
3. **组件元数据管理**：管理组件的元数据信息，包括组件配置、行为、嵌套规则等
4. **选区管理**：管理当前选中的节点，支持单选和多选
5. **悬停检测**：管理鼠标悬停的节点，提供视觉反馈
6. **位置管理**：管理拖拽投放位置
7. **属性转换**：提供属性转换器机制，支持在不同阶段转换属性
8. **设置面板**：创建和管理设置面板入口
9. **事件系统**：发送和接收设计器相关事件

## 类定义

```typescript
export class Designer implements IDesigner {
  dragon: IDragon;
  viewName: string | undefined;
  readonly componentActions = new ComponentActions();
  readonly contextMenuActions: IContextMenuActions;
  readonly activeTracker = new ActiveTracker();
  readonly detecting = new Detecting();
  readonly project: IProject;
  readonly editor: IPublicModelEditor;
  readonly bemToolsManager = new BemToolsManager(this);
  readonly shellModelFactory: IShellModelFactory;
  
  private _dropLocation?: DropLocation;
  private propsReducers = new Map<IPublicEnumTransformStage, IPublicTypePropsTransducer[]>();
  private _lostComponentMetasMap = new Map<string, ComponentMeta>();
  private props?: DesignerProps;
  private oobxList: OffsetObserver[] = [];
  private selectionDispose: undefined | (() => void);
  
  @obx.ref private _componentMetasMap = new Map<string, IComponentMeta>();
  @obx.ref private _simulatorComponent?: ComponentType<any>;
  @obx.ref private _simulatorProps?: Record<string, any> | ((project: IProject) => object);
  @obx.ref private _suspensed = false;
  
  get currentDocument(): IDocumentModel | undefined;
  get currentHistory(): IHistory | undefined;
  get currentSelection(): ISelection;
  get dropLocation(): DropLocation | undefined;
  get simulatorComponent(): ComponentType<any> | undefined;
  get simulatorProps(): Record<string, any>;
  get projectSimulatorProps(): any;
  get suspensed(): boolean;
  get schema(): IPublicTypeProjectSchema;
  get componentsMap(): { [key: string]: IPublicTypeNpmInfo | Component };
  
  constructor(props: DesignerProps);
  setupSelection(): void;
  postEvent(event: string, ...args: any[]): void;
  createLocation(locationData: IPublicTypeLocationData<INode>): DropLocation;
  clearLocation(): void;
  createScroller(scrollable: IPublicTypeScrollable): IPublicModelScroller;
  createOffsetObserver(nodeInstance: INodeSelector): OffsetObserver | null;
  createSettingEntry(nodes: INode[]): ISettingTopEntry;
  getSuitableInsertion(insertNode?: INode | IPublicTypeNodeSchema | IPublicTypeNodeSchema[]): { target: INode; index?: number } | null;
  setProps(nextProps: DesignerProps): void;
  loadIncrementalAssets(incrementalAssets: IPublicTypeAssetsJson): Promise<void>;
  refreshComponentMetasMap(): void;
  get(key: string): any;
  setSchema(schema?: IPublicTypeProjectSchema): void;
  buildComponentMetasMap(metas: IPublicTypeComponentMetadata[]): void;
  createComponentMeta(data: IPublicTypeComponentMetadata): IComponentMeta | null;
  getGlobalComponentActions(): IPublicTypeComponentAction[] | null;
  getComponentMeta(componentName: string, generateMetadata?: () => IPublicTypeComponentMetadata | null): IComponentMeta;
  getComponentMetasMap(): Map<string, IComponentMeta>;
  transformProps(props: IPublicTypeCompositeObject | IPublicTypePropsList, node: Node, stage: IPublicEnumTransformStage): IPublicTypeCompositeObject | IPublicTypePropsList;
  addPropsReducer(reducer: IPublicTypePropsTransducer, stage: IPublicEnumTransformStage): void;
  autorun(effect: (reaction: IReactionPublic) => void, options?: IReactionOptions<any, any>): IReactionDisposer;
  purge(): void;
}
```

## 主要属性

### dragon
拖拽引擎实例，负责处理所有的拖拽操作。

类型：[`IDragon`](./dragon.md)

### project
项目实例，管理所有文档和模拟器。

类型：[`IProject`](../project/project.md)

### componentActions
组件操作管理器，提供组件的删除、复制、锁定、隐藏等操作。

类型：[`ComponentActions`](../component-actions.md)

### contextMenuActions
右键菜单操作管理器，管理右键菜单的添加、删除、布局调整。

类型：[`ContextMenuActions`](../context-menu-actions.md)

### activeTracker
活动追踪器，追踪最近操作的节点，用于自动滚动等功能。

类型：[`ActiveTracker`](./active-tracker.md)

### detecting
悬停检测器，检测鼠标悬停的节点。

类型：[`Detecting`](./detecting.md)

### editor
编辑器实例，提供全局的编辑器能力。

类型：`IPublicModelEditor`

### shellModelFactory
Shell 模型工厂，用于创建 Shell 层的模型对象。

类型：`IShellModelFactory`

### _dropLocation
当前的投放位置，表示拖拽将要投放的位置。

类型：`DropLocation | undefined`

### _componentMetasMap
组件元数据映射，存储所有已注册组件的元数据。

类型：`Map<string, IComponentMeta>`

## 主要方法

### constructor(props: DesignerProps)
构造函数，初始化设计器实例。

**参数：**
- `props`: 设计器配置属性

**属性说明：**
```typescript
interface DesignerProps {
  editor: IPublicModelEditor;                    // 编辑器实例（必需）
  shellModelFactory: IShellModelFactory;         // Shell 模型工厂（必需）
  className?: string;                            // CSS 类名
  style?: object;                                // 样式对象
  defaultSchema?: IPublicTypeProjectSchema;      // 默认项目 schema
  hotkeys?: object;                              // 快捷键配置
  viewName?: string;                             // 视图名称
  simulatorProps?: Record<string, any> | ((document: DocumentModel) => object);  // 模拟器属性
  simulatorComponent?: ComponentType<any>;       // 模拟器组件
  dragGhostComponent?: ComponentType<any>;         // 拖拽幽灵组件
  suspensed?: boolean;                            // 是否暂停
  componentMetadatas?: IPublicTypeComponentMetadata[];  // 组件元数据列表
  globalComponentActions?: IPublicTypeComponentAction[];  // 全局组件操作
  onMount?: (designer: Designer) => void;       // 挂载回调
  onDragstart?: (e: IPublicModelLocateEvent) => void;    // 拖拽开始回调
  onDrag?: (e: IPublicModelLocateEvent) => void;        // 拖拽过程回调
  onDragend?: (e: { dragObject: IPublicModelDragObject; copy: boolean }, loc?: DropLocation) => void;  // 拖拽结束回调
}
```

**初始化流程：**
1. 设置 editor、viewName、shellModelFactory
2. 调用 [`setProps`](#setpropsnextprops-designerprops) 设置初始属性
3. 创建 Project 实例
4. 创建 Dragon 拖拽引擎
5. 创建 ContextMenuActions 右键菜单管理器
6. 设置拖拽事件监听
7. 设置选区监听
8. 发送初始化完成事件

### setupSelection()
设置选区监听，处理选区变化事件。

**功能：**
- 在 Live 模式下，如果当前没有选中节点，默认选中第一个子节点
- 监听选区变化并发送事件

### postEvent(event: string, ...args: any[])
发送设计器事件。

**参数：**
- `event`: 事件名称
- `...args`: 事件参数

**示例：**
```typescript
designer.postEvent('dragstart', locateEvent);
designer.postEvent('current-document.change', currentDocument);
```

### createLocation(locationData: IPublicTypeLocationData<INode>): DropLocation
创建投放位置对象。

**参数：**
- `locationData`: 位置数据

**位置数据结构：**
```typescript
interface IPublicTypeLocationData<T> {
  target: T;              // 目标节点
  detail: IPublicTypeLocationDetail;  // 位置详情
  source: string;          // 来源标识
  event: ILocateEvent;    // 定位事件
}
```

**返回值：** [`DropLocation`](./location.md) 对象

**功能：**
- 创建 DropLocation 实例
- 如果位置所属文档与当前不同，清除旧文档的投放位置
- 设置当前投放位置
- 发送投放位置变化事件
- 活动追踪器追踪目标节点

### clearLocation()
清除当前的投放位置。

**功能：**
- 清除文档中的投放位置
- 发送投放位置变化事件
- 将 _dropLocation 设置为 undefined

### createScroller(scrollable: IPublicTypeScrollable): IPublicModelScroller
创建滚动器实例。

**参数：**
- `scrollable`: 可滚动对象

**返回值：** [`Scroller`](./scroller.md) 实例

### createOffsetObserver(nodeInstance: INodeSelector): OffsetObserver | null
创建偏移观察器实例。

**参数：**
- `nodeInstance`: 节点实例选择器

**返回值：** [`OffsetObserver`](./offset-observer.ts) 实例

**功能：**
- 创建偏移观察器
- 清理已销毁的观察器（超过 20 个时）
- 将新观察器添加到列表中

### createSettingEntry(nodes: INode[]): ISettingTopEntry
创建设置面板入口。

**参数：**
- `nodes`: 节点列表

**返回值：** [`SettingTopEntry`](./setting/setting-top-entry.md) 实例

**功能：**
- 为选中的节点创建设置面板入口
- 用于在设置面板中显示和编辑节点属性

### getSuitableInsertion(insertNode?: INode | IPublicTypeNodeSchema | IPublicTypeNodeSchema[]): { target: INode; index?: number } | null
获取合适的插入位置（已弃用）。

**参数：**
- `insertNode`: 要插入的节点

**返回值：** 插入位置对象，包含 target（目标节点）和 index（插入索引）

**注意：** 此方法已标记为废弃

### setProps(nextProps: DesignerProps)
设置设计器属性。

**参数：**
- `nextProps`: 新的属性对象

**功能：**
- 合并新旧属性
- 检查并更新 simulatorComponent
- 检查并更新 simulatorProps
- 检查并更新 suspensed 状态
- 检查并更新 componentMetadatas
- 如果 designMode 变化，重新设置选区

### loadIncrementalAssets(incrementalAssets: IPublicTypeAssetsJson): Promise<void>
加载增量资源。

**参数：**
- `incrementalAssets`: 增量资源对象

**资源对象结构：**
```typescript
interface IPublicTypeAssetsJson {
  components?: IPublicTypeComponentMetadata[];  // 组件列表
  packages?: IPublicTypePackage[];            // 包列表
}
```

**功能：**
- 构建组件元数据映射
- 如果有 packages，在模拟器中设置组件
- 合并资源到编辑器的 assets 中
- 刷新组件元数据映射
- 发送增量资源就绪事件

### refreshComponentMetasMap()
刷新组件元数据映射。

**功能：**
- 创建新的 Map 实例
- 触发模拟器中的 buildComponents
- 用于组件元数据更新后刷新

### get(key: string): any
获取设计器属性。

**参数：**
- `key`: 属性键名

**返回值：** 属性值

### setSchema(schema?: IPublicTypeProjectSchema)
设置项目 schema。

**参数：**
- `schema`: 项目 schema

**功能：**
- 调用 project.load(schema) 加载 schema
- 触发模拟器重新渲染

### buildComponentMetasMap(metas: IPublicTypeComponentMetadata[])
构建组件元数据映射。

**参数：**
- `metas`: 组件元数据列表

**功能：**
- 遍历元数据列表
- 为每个元数据调用 [`createComponentMeta`](#createcomponentmetadata-ipublictypecomponentmetadata-icomponentmeta--null)
- 将结果存入 _componentMetasMap

### createComponentMeta(data: IPublicTypeComponentMetadata): IComponentMeta | null
创建或更新组件元数据。

**参数：**
- `data`: 组件元数据

**返回值：** [`ComponentMeta`](../component-meta.md) 实例

**功能：**
- 如果组件已存在，更新其元数据
- 如果组件在 _lostComponentMetasMap 中，从 lost map 中移除并更新
- 否则创建新的 ComponentMeta 实例
- 将结果存入 _componentMetasMap

### getGlobalComponentActions(): IPublicTypeComponentAction[] | null
获取全局组件操作。

**返回值：** 全局组件操作列表

### getComponentMeta(componentName: string, generateMetadata?: () => IPublicTypeComponentMetadata | null): IComponentMeta
获取组件元数据。

**参数：**
- `componentName`: 组件名称
- `generateMetadata`: 生成元数据的函数

**返回值：** [`ComponentMeta`](../component-meta.md) 实例

**功能：**
- 如果组件已存在于 _componentMetasMap，直接返回
- 如果组件存在于 _lostComponentMetasMap，直接返回
- 否则创建新的 ComponentMeta 实例并存入 _lostComponentMetasMap

### getComponentMetasMap(): Map<string, IComponentMeta>
获取组件元数据映射。

**返回值：** 组件元数据映射 Map

### transformProps(props: IPublicTypeCompositeObject | IPublicTypePropsList, node: Node, stage: IPublicEnumTransformStage): IPublicTypeCompositeObject | IPublicTypePropsList
转换属性。

**参数：**
- `props`: 属性对象或列表
- `node`: 节点实例
- `stage`: 转换阶段

**转换阶段：**
- `Init`: 初始化阶段
- `Upgrade`: 升级阶段
- `Render`: 渲染阶段
- `Serilize`: 序列化阶段
- `Save`: 保存阶段

**功能：**
- 获取指定阶段的属性转换器
- 使用转换器依次转换属性
- 返回转换后的属性

### addPropsReducer(reducer: IPublicTypePropsTransducer, stage: IPublicEnumTransformStage): void
添加属性转换器。

**参数：**
- `reducer`: 转换器函数
- `stage`: 转换阶段

**功能：**
- 将转换器添加到指定阶段的转换器列表中
- 如果该阶段还没有转换器列表，创建新列表

### autorun(effect: (reaction: IReactionPublic) => void, options?: IReactionOptions<any, any>): IReactionDisposer
创建自动运行响应式函数。

**参数：**
- `effect`: 自动运行的函数
- `options`: 选项

**返回值：** 清理函数

### purge()
销毁设计器。

**功能：**
- 清理资源
- 移除事件监听
- 释放内存

## 使用示例

### 创建设计器实例

```typescript
import { Designer } from '@alilc/lowcode-designer';

const designer = new Designer({
  editor: editor,
  shellModelFactory: shellModelFactory,
  defaultSchema: {
    version: '1.0.0',
    componentsMap: [],
    componentsTree: [{
      componentName: 'Page',
      props: {},
      children: [],
    }],
  },
  componentMetadatas: [
    {
      componentName: 'Button',
      title: '按钮',
      props: [
        {
          name: 'type',
          title: '类型',
          setter: 'RadioGroupSetter',
          defaultValue: 'primary',
        },
      ],
    },
  ],
  simulatorProps: {
    designMode: 'design',
    device: 'mobile',
  },
});
```

### 创建投放位置

```typescript
const locationData = {
  target: containerNode,
  detail: {
    type: 'Children',
    index: 0,
    edge: containerRect,
  },
  source: 'simulator',
  event: locateEvent,
};

const dropLocation = designer.createLocation(locationData);
```

### 加载增量资源

```typescript
await designer.loadIncrementalAssets({
  components: [
    {
      componentName: 'Input',
      title: '输入框',
      props: [
        {
          name: 'placeholder',
          title: '占位符',
          setter: 'StringSetter',
        },
      ],
    },
  ],
  packages: [
    {
      package: '@alifd/next',
      version: '1.23.0',
      library: 'Next',
      urls: [
        'https://g.alicdn.com/code/lib/alifd/next/1.23.0/next.min.js',
      ],
    },
  ],
});
```

### 添加属性转换器

```typescript
designer.addPropsReducer((props, node, { stage }) => {
  // 在序列化阶段，移除内部属性
  if (stage === 'Serilize') {
    const { __internal__, ...rest } = props;
    return rest;
  }
  return props;
}, 'Serilize');
```

### 创建设置面板入口

```typescript
const selectedNodes = designer.currentSelection.getNodes();
const settingEntry = designer.createSettingEntry(selectedNodes);

// 获取属性值
const value = settingEntry.getPropValue('type');

// 设置属性值
settingEntry.setPropValue('type', 'secondary');
```

## 注意事项

1. **属性转换器顺序**：属性转换器按照添加顺序依次执行，需要注意顺序
2. **组件元数据缓存**：组件元数据会被缓存，更新后需要调用 `refreshComponentMetasMap` 刷新
3. **事件监听清理**：设计器销毁时需要手动清理事件监听
4. **拖拽状态管理**：拖拽过程中会禁用悬停检测，拖拽结束后会重新启用
5. **选区管理**：Live 模式下会自动选中第一个子节点，避免选中 Page 组件
6. **增量资源加载**：加载增量资源后会自动触发模拟器重新渲染
7. **文档切换**：切换文档时会自动清理旧文档的投放位置

## 相关文件

- [`dragon.ts`](./dragon.md) - 拖拽引擎
- [`detecting.ts`](./detecting.md) - 悬停检测
- [`location.ts`](./location.md) - 位置管理
- [`active-tracker.ts`](./active-tracker.md) - 活动追踪
- [`scroller.ts`](./scroller.md) - 滚动器
- [`offset-observer.ts`](./offset-observer.ts) - 偏移观察器
- [`setting/setting-top-entry.ts`](./setting/setting-top-entry.md) - 设置面板入口
- [`../project/project.ts`](../project/project.md) - 项目管理
- [`../component-actions.ts`](../component-actions.md) - 组件操作
- [`../context-menu-actions.ts`](../context-menu-actions.md) - 右键菜单操作

## 外部依赖

- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
- `@alilc/lowcode-designer`: 设计器类型定义
