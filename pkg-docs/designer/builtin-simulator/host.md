# BuiltinSimulatorHost - 内置模拟器宿主

## 功能概述

[`BuiltinSimulatorHost`](packages/designer/src/builtin-simulator/host.ts:142) 是低代码引擎的内置模拟器宿主类，负责管理画布渲染、事件处理、组件加载等。

## 主要功能

1. **画布渲染**：管理画布的渲染和更新
2. **组件加载**：加载和管理业务组件
3. **事件处理**：处理画布上的鼠标、键盘等事件
4. **设备模拟**：支持多种设备尺寸模拟
5. **实时编辑**：支持在画布上直接编辑文本内容
6. **拖拽投放**：处理拖拽投放逻辑
7. **节点定位**：根据 DOM 节点定位到对应的节点
8. **坐标转换**：处理全局坐标和画布坐标的转换
9. **右键菜单**：处理右键菜单事件
10. **资源管理**：管理组件、主题等资源

## 类定义

```typescript
export class BuiltinSimulatorHost implements ISimulatorHost<BuiltinSimulatorProps> {
  readonly isSimulator = true;
  readonly project: IProject;
  readonly designer: IDesigner;
  readonly viewport = new Viewport();
  readonly scroller: IScroller;
  readonly emitter: IEventBus = createModuleEventBus('BuiltinSimulatorHost');
  readonly componentsConsumer: ResourceConsumer;
  readonly injectionConsumer: ResourceConsumer;
  readonly i18nConsumer: ResourceConsumer;
  
  autoRender = true;
  
  @computed get renderEnv(): string;
  @computed get device(): string;
  @computed get locale(): string;
  @computed get deviceClassName(): string | undefined;
  @computed get designMode(): 'live' | 'design' | 'preview';
  @computed get requestHandlersMap(): any;
  get thisRequiredInJSE(): boolean;
  get enableStrictNotFoundMode(): any;
  get notFoundComponent(): any;
  get faultComponent(): any;
  get faultComponentMap(): any;
  @computed get componentsAsset(): Asset | undefined;
  @computed get theme(): Asset | undefined;
  @computed get componentsMap();
  @computed get deviceStyle(): DeviceStyleProps | undefined;
  
  @obx.ref _props: BuiltinSimulatorProps = {};
  @obx.ref private _contentWindow?: Window;
  @obx.ref private _contentDocument?: Document;
  @obx.ref private _appHelper?: any;
  get contentWindow(): Window;
  get contentDocument(): Document;
  private _renderer?: BuiltinSimulatorRenderer;
  get renderer(): BuiltinSimulatorRenderer;
  readonly asyncLibraryMap: { [key: string]: {} } = {};
  readonly libraryMap: { [key: string]: string } = {};
  private _iframe?: HTMLIFrameElement;
  private disableHovering?: () => void;
  private disableDetecting?: () => void;
  readonly liveEditing = new LiveEditing();
  @obx private instancesMap: { [docId: string]: Map<string, IPublicTypeComponentInstance[]> } = {};
  private tryScrollAgain: number | null = null;
  private _sensorAvailable = true;
  get sensorAvailable(): boolean;
  private sensing = false;
  
  constructor(project: Project, designer: Designer);
  
  stopAutoRepaintNode(): void;
  enableAutoRepaintNode(): void;
  
  setProps(props: BuiltinSimulatorProps): void;
  set(key: string, value: any): void;
  get(key: string): any;
  
  connect(renderer: BuiltinSimulatorRenderer, effect: (reaction: IReactionPublic) => void, options?: IReactionOptions): IReactionDisposer;
  reaction(expression: (reaction: IReactionPublic) => unknown, effect: (value: unknown, prev: unknown, reaction: IReactionPublic) => void, opts?: IReactionOptions | undefined): IReactionDisposer;
  autorun(effect: (reaction: IReactionPublic) => void, options?: IReactionOptions): IReactionDisposer;
  purge(): void;
  
  mountViewport(viewport: HTMLElement | null): void;
  
  buildLibrary(library?: LibraryItem[]): AssetList;
  rerender(): void;
  mountContentFrame(iframe: HTMLIFrameElement | null): Promise<void>;
  setupComponents(library: LibraryItem[]): Promise<void>;
  setupEvents(): void;
  
  postEvent(eventName: string, ...data: any[]): void;
  
  setNativeSelection(enableFlag: boolean): void;
  setDraggingState(state: boolean): void;
  setCopyState(state: boolean): void;
  clearState(): void;
  
  fixEvent(e: ILocateEvent): ILocateEvent;
  isEnter(e: ILocateEvent): boolean;
  deactiveSensor(): void;
  locate(e: ILocateEvent): any;
  getDropContainer(e: ILocateEvent): DropContainer | null;
  isAcceptable(): boolean;
  handleAccept({ container }: DropContainer, e: ILocateEvent): boolean;
  getNearByContainer({ container, instance }: DropContainer, drillDownExcludes: Set<INode>);
  
  generateComponentMetadata(componentName: string): IPublicTypeComponentMetadata;
  getComponent(componentName: string): Component | null;
  createComponent(schema: IPublicTypeComponentSchema): Component | null;
  setInstance(docId: string, id: string, instances: IPublicTypeComponentInstance[] | null): void;
  getComponentInstances(node: INode, context?: IPublicTypeNodeInstance): IPublicTypeComponentInstance[] | null;
  getComponentContext(node: INode): any;
  getClosestNodeInstance(from: IPublicTypeComponentInstance, specId?: string): IPublicTypeNodeInstance | null;
  computeRect(node: INode): IPublicTypeRect | null;
  computeComponentInstanceRect(instance: IPublicTypeComponentInstance, selector?: string): IPublicTypeRect | null;
  findDOMNodes(instance: IPublicTypeComponentInstance, selector?: string): Array<Element | Text> | null;
  getNodeInstanceFromElement(target: Element | null): IPublicTypeNodeInstance<IPublicTypeComponentInstance, INode> | null;
  scrollToNode(node: Node, detail?: any): void;
}
```

## 主要属性

### viewport
视口实例，管理画布的视口信息。

类型：`Viewport`

### scroller
滚动器实例，管理画布的滚动。

类型：`IScroller`

### renderer
渲染器实例，负责实际的渲染工作。

类型：`BuiltinSimulatorRenderer`

### contentWindow
画布的 window 对象。

类型：`Window`

### contentDocument
画布的 document 对象。

类型：`Document`

### componentsConsumer
组件资源消费者，监听组件资源变化。

类型：`ResourceConsumer<Asset | undefined>`

### injectionConsumer
注入资源消费者，监听注入资源变化。

类型：`ResourceConsumer`

### i18nConsumer
国际化资源消费者，监听国际化资源变化。

类型：`ResourceConsumer`

### instancesMap
组件实例映射，存储文档 ID 到组件实例映射的映射。

类型：`{ [docId: string]: Map<string, IPublicTypeComponentInstance[]> }`

### libraryMap
库映射，存储包名到库名的映射。

类型：`{ [key: string]: string }`

### sensorAvailable
感应器是否可用。

类型：`boolean`

## 主要方法

### mountContentFrame(iframe: HTMLIFrameElement | null): Promise<void>
挂载内容 iframe。

**参数：**
- `iframe`: iframe 元素

**功能：**
1. 保存 iframe 引用
2. 获取 contentWindow 和 contentDocument
3. 构建库资源
4. 加载环境、库、主题、运行时等资源
5. 创建模拟器渲染器
6. 等待组件资源加载
7. 等待注入资源加载
8. 加载异步库
9. 运行渲染器
10. 设置滚动目标
11. 设置事件处理
12. 绑定快捷键
13. 注入剪贴板

**使用示例：**
```typescript
await simulatorHost.mountContentFrame(iframeElement);
```

### setupEvents()
设置事件监听。

**功能：**
- 设置拖拽和点击事件
- 设置悬停检测
- 设置实时编辑
- 设置右键菜单

### setupDragAndClick()
设置拖拽和点击事件处理。

**功能：**
- 监听 mousedown 事件
- 处理多选（Ctrl/Cmd + 点击）
- 处理拖拽启动
- 处理点击选择
- 处理磁贴布局拖拽

### setupDetecting()
设置悬停检测。

**功能：**
- 监听 mouseover 事件
- 监听 mouseleave 事件
- 监听 mousemove 事件
- 捕获悬停节点

### setupLiveEditing()
设置实时编辑。

**功能：**
- 监听 dblclick 事件
- 启动实时编辑

### setupContextMenu()
设置右键菜单。

**功能：**
- 监听 contextmenu 事件
- 发送右键菜单事件

### locate(e: ILocateEvent): any
定位拖拽投放位置。

**参数：**
- `e`: 定位事件

**返回值：** 投放位置对象

**功能：**
1. 过滤可操作的节点
2. 获取投放容器
3. 检查锁定节点
4. 计算投放位置
5. 处理模态节点投放
6. 计算子节点投放位置
7. 计算边缘投放位置

### getDropContainer(e: ILocateEvent): DropContainer | null
获取投放容器。

**参数：**
- `e`: 定位事件

**返回值：** 投放容器对象

**功能：**
1. 从事件目标获取节点实例
2. 确定容器节点
3. 检查嵌套规则
4. 处理特殊拖拽对象

### generateComponentMetadata(componentName: string): IPublicTypeComponentMetadata
生成组件元数据。

**参数：**
- `componentName`: 组件名称

**返回值：** 组件元数据

**功能：**
- 如果是 HTML 标签，返回基础元数据
- 如果组件未注册，返回基础元数据
- 否则从组件解析元数据

**使用示例：**
```typescript
const metadata = simulatorHost.generateComponentMetadata('Button');
console.log('Component metadata:', metadata);
```

### getComponent(componentName: string): Component | null
获取组件类。

**参数：**
- `componentName`: 组件名称

**返回值：** 组件类或 null

**使用示例：**
```typescript
const ButtonComponent = simulatorHost.getComponent('Button');
```

### getComponentInstances(node: INode, context?: IPublicTypeNodeInstance): IPublicTypeComponentInstance[] | null
获取节点的组件实例。

**参数：**
- `node`: 节点实例
- `context`: 节点上下文（可选）

**返回值：** 组件实例列表或 null

**功能：**
- 从 instancesMap 中获取组件实例
- 如果有上下文，过滤匹配的实例

**使用示例：**
```typescript
const instances = simulatorHost.getComponentInstances(node);
if (instances) {
  console.log('Found', instances.length, 'instances');
}
```

### computeRect(node: INode): IPublicTypeRect | null
计算节点的位置和大小。

**参数：**
- `node`: 节点实例

**返回值：** DOMRect 对象或 null

**功能：**
- 获取节点的组件实例
- 计算组件实例的位置和大小

**使用示例：**
```typescript
const rect = simulatorHost.computeRect(node);
if (rect) {
  console.log('Node rect:', rect.left, rect.top, rect.width, rect.height);
}
```

### findDOMNodes(instance: IPublicTypeComponentInstance, selector?: string): Array<Element | Text> | null
查找组件实例的 DOM 节点。

**参数：**
- `instance`: 组件实例
- `selector`: CSS 选择器（可选）

**返回值：** DOM 节点数组或 null

**使用示例：**
```typescript
const domNodes = simulatorHost.findDOMNodes(componentInstance);
if (domNodes) {
  console.log('Found', domNodes.length, 'DOM nodes');
}
```

### getNodeInstanceFromElement(target: Element | null): IPublicTypeNodeInstance<IPublicTypeComponentInstance, INode> | null
从 DOM 节点获取节点实例。

**参数：**
- `target`: DOM 节点

**返回值：** 节点实例对象或 null

**功能：**
1. 从 DOM 节点获取最近的节点实例
2. 获取对应的文档
3. 获取对应的节点

**使用示例：**
```typescript
const nodeInstance = simulatorHost.getNodeInstanceFromElement(domElement);
if (nodeInstance) {
  console.log('Node:', nodeInstance.node.componentName);
}
```

### scrollToNode(node: Node, detail?: any)
滚动到指定节点。

**参数：**
- `node`: 节点实例
- `detail`: 详情信息（可选）

**功能：**
1. 获取节点的组件实例
2. 获取组件实例的 DOM 节点
3. 检查节点是否可见
4. 计算滚动位置
5. 执行滚动

**使用示例：**
```typescript
simulatorHost.scrollToNode(node);
```

### setNativeSelection(enableFlag: boolean)
设置原生选区。

**参数：**
- `enableFlag`: 是否启用

**功能：**
- 调用渲染器的 setNativeSelection 方法

### setDraggingState(state: boolean)
设置拖拽态。

**参数：**
- `state`: 是否拖拽中

**功能：**
- 调用渲染器的 setDraggingState 方法

### setCopyState(state: boolean)
设置拷贝态。

**参数：**
- `state`: 是否拷贝中

**功能：**
- 调用渲染器的 setCopyState 方法

### clearState()
清除所有状态。

**功能：**
- 调用渲染器的 clearState 方法

### rerender()
重新渲染。

**功能：**
- 刷新组件元数据映射
- 调用渲染器的 rerender 方法

## 设计模式

### designMode
设计模式，影响画布的行为。

```typescript
type DesignMode = 'live' | 'design' | 'preview' | 'extend' | 'border';
```

- `live`: 实时模式，组件可以交互
- `design`: 设计模式，支持拖拽、选择等操作
- `preview`: 预览模式，只读
- `extend`: 扩展模式
- `border`: 边框模式

### device
设备类型，影响画布的尺寸和样式。

```typescript
type Device = 'mobile' | 'iphone' | string;
```

## 注意事项

1. **iframe 隔离**：画布运行在独立的 iframe 中，需要注意跨域限制
2. **事件传播**：设计模式下会阻止某些事件传播
3. **组件实例映射**：组件实例映射需要及时更新
4. **性能优化**：大量节点时需要注意性能
5. **资源加载**：组件资源加载是异步的，需要等待加载完成
6. **坐标转换**：全局坐标和画布坐标需要正确转换
7. **拖拽投放**：拖拽投放逻辑比较复杂，需要仔细处理

## 相关文件

- [`../designer/designer.ts`](../designer/designer.md) - 设计器核心
- [`../document/node/node.ts`](../document/node/node.md) - 节点类
- [`renderer.ts`](./renderer.md) - 渲染器接口
- [`viewport.ts`](./viewport.md) - 视口管理
- [`create-simulator.ts`](./create-simulator.md) - 模拟器创建

## 外部依赖

- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
- `@alifd/next`: Fusion UI 组件库
- `lodash`: 工具函数库
