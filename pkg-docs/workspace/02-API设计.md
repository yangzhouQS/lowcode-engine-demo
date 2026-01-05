# Workspace 模块 API 设计文档

## 文件路径

`packages/workspace/`

## API 概述

Workspace 模块提供了完整的 API 用于管理低代码引擎的工作空间，包括窗口管理、资源管理、插件上下文和布局系统。所有 API 都遵循 TypeScript 类型定义，提供完整的类型安全。

## 核心 API

### 1. Workspace 类

#### 类定义

```typescript
export class Workspace implements IWorkspace {
  context: BasicContext;
  enableAutoOpenFirstWindow: boolean;
  resourceTypeMap: Map<string, ResourceType>;
  @obx.ref windows: IEditorWindow[];
  editorWindowMap: Map<string, IEditorWindow>;
  @obx window: IEditorWindow;
  windowQueue: IWindowInfo[];
  resourceList: IResource[];
  shellModelFactory?: IPublicTypeShellModelFactory;
  emitter: IEventBus;
}
```

#### 构造函数

```typescript
constructor(
  registryInnerPlugin: (plugins: ILowCodePluginManager) => void,
  shellModelFactory?: IPublicTypeShellModelFactory
)
```

**参数**:
- `registryInnerPlugin`: 注册内部插件的函数
- `shellModelFactory`: 可选的 Shell 模型工厂

**说明**:
- 创建 Workspace 实例
- 初始化 BasicContext
- 初始化事件总线

**示例**:
```typescript
const workspace = new Workspace(
  (plugins) => {
    // 注册内部插件
  },
  shellModelFactory
);
```

#### 方法

##### initWindow()

```typescript
async initWindow(): Promise<void>
```

**功能**: 初始化默认窗口

**返回值**: `Promise<void>`

**说明**:
- 如果启用了自动打开第一个窗口（`enableAutoOpenFirstWindow`）
- 则会创建并打开第一个窗口

**示例**:
```typescript
await workspace.initWindow();
```

##### openEditorWindowByResource()

```typescript
async openEditorWindowByResource(
  resource: IResource,
  sleep: boolean = false
): Promise<void>
```

**功能**: 通过资源打开编辑器窗口

**参数**:
- `resource`: 要打开的资源对象
- `sleep`: 是否休眠窗口（默认 `false`）

**返回值**: `Promise<void>`

**说明**:
- 如果当前窗口正在初始化且未休眠，则将资源加入窗口队列
- 否则直接打开窗口
- 发射 `CHANGE_WINDOW` 和 `CHANGE_ACTIVE_WINDOW` 事件

**示例**:
```typescript
const resource = new Resource(
  { resourceName: 'myResource', options: {} },
  resourceType,
  workspace
);
await workspace.openEditorWindowByResource(resource);
```

##### openEditorWindow()

```typescript
async openEditorWindow(
  name: string,
  title?: string,
  options?: IPublicTypeEditorWindowOptions,
  viewName?: string
): Promise<void>
```

**功能**: 通过名称打开编辑器窗口

**参数**:
- `name`: 窗口名称
- `title`: 可选的窗口标题
- `options`: 可选的窗口选项
- `viewName`: 可选的视图名称

**返回值**: `Promise<void>`

**说明**:
- 根据窗口名称查找资源类型
- 创建资源并打开窗口
- 发射 `CHANGE_WINDOW` 和 `CHANGE_ACTIVE_WINDOW` 事件

**示例**:
```typescript
await workspace.openEditorWindow(
  'myWindow',
  'My Window',
  { width: 800, height: 600 },
  'editor'
);
```

##### removeEditorWindow()

```typescript
removeEditorWindow(id: string): void
```

**功能**: 移除编辑器窗口

**参数**:
- `id`: 窗口 ID

**返回值**: `void`

**说明**:
- 从窗口列表中移除窗口
- 从窗口映射中移除窗口
- 更新活动窗口
- 发射 `CHANGE_WINDOW` 事件

**示例**:
```typescript
workspace.removeEditorWindow('window-1');
```

##### checkWindowQueue()

```typescript
checkWindowQueue(): void
```

**功能**: 检查并处理窗口队列

**返回值**: `void`

**说明**:
- 检查窗口队列是否为空
- 如果不为空，则取出队列中的第一个窗口信息
- 递归处理队列中的所有窗口

**示例**:
```typescript
workspace.checkWindowQueue();
```

##### setActive()

```typescript
setActive(): void
```

**功能**: 设置工作空间为激活状态

**返回值**: `void`

**说明**:
- 设置 BasicContext 的激活状态

**示例**:
```typescript
workspace.setActive();
```

##### registerResourceType()

```typescript
async registerResourceType(
  resourceTypeModel: IPublicTypeResourceType
): Promise<void>
```

**功能**: 注册资源类型

**参数**:
- `resourceTypeModel`: 资源类型模型

**返回值**: `Promise<void>`

**说明**:
- 创建 ResourceType 实例
- 存储到资源类型映射中
- 如果启用了自动打开第一个窗口，则初始化窗口

**示例**:
```typescript
await workspace.registerResourceType({
  resourceName: 'myResource',
  resourceType: 'editor',
  resourceTypeModel: {
    // 资源类型模型配置
  }
});
```

##### onChangeWindows()

```typescript
onChangeWindows(fn: () => void): () => void
```

**功能**: 监听窗口列表变化

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `CHANGE_WINDOW` 事件
- 返回取消监听的函数

**示例**:
```typescript
const cancel = workspace.onChangeWindows(() => {
  console.log('Windows changed');
});
// 取消监听
cancel();
```

##### onChangeActiveWindow()

```typescript
onChangeActiveWindow(fn: () => void): () => void
```

**功能**: 监听活动窗口变化

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `CHANGE_ACTIVE_WINDOW` 事件
- 返回取消监听的函数

**示例**:
```typescript
const cancel = workspace.onChangeActiveWindow(() => {
  console.log('Active window changed');
});
// 取消监听
cancel();
```

##### onWindowRendererReady()

```typescript
onWindowRendererReady(fn: () => void): () => void
```

**功能**: 监听窗口渲染就绪

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `WINDOW_RENDER_READY` 事件
- 返回取消监听的函数

**示例**:
```typescript
const cancel = workspace.onWindowRendererReady(() => {
  console.log('Window renderer ready');
});
// 取消监听
cancel();
```

##### emitWindowRendererReady()

```typescript
emitWindowRendererReady(): void
```

**功能**: 发射窗口渲染就绪事件

**返回值**: `void`

**说明**:
- 发射 `WINDOW_RENDER_READY` 事件

**示例**:
```typescript
workspace.emitWindowRendererReady();
```

---

### 2. Resource 类

#### 类定义

```typescript
export class Resource implements IResource {
  readonly resourceData: IPublicResourceData;
  readonly resourceType: IResourceType;
  readonly workspace: IWorkspace;
  readonly options: any;
  private context: BasicContext;
  resourceTypeInstance: IPublicTypeResourceTypeConfig;
  editorViewMap: Map<string, IPublicTypeEditorView>;
  emitter: IEventBus;
}
```

#### 构造函数

```typescript
constructor(
  readonly resourceData: IPublicResourceData,
  readonly resourceType: IResourceType,
  readonly workspace: IWorkspace
)
```

**参数**:
- `resourceData`: 资源数据
- `resourceType`: 资源类型
- `workspace`: 工作空间实例

**说明**:
- 创建 Resource 实例
- 初始化 BasicContext
- 创建资源类型实例
- 初始化编辑器视图映射
- 调用初始化方法

**示例**:
```typescript
const resource = new Resource(
  { resourceName: 'myResource', options: {} },
  resourceType,
  workspace
);
```

#### 方法

##### init()

```typescript
private init(): void
```

**功能**: 初始化资源

**返回值**: `void`

**说明**:
- 遍历编辑器视图
- 为每个视图创建 Context 实例
- 存储到编辑器视图映射中

##### import()

```typescript
async import(schema: any): Promise<any>
```

**功能**: 导入资源 Schema

**参数**:
- `schema`: Schema 数据

**返回值**: `Promise<any>`

**说明**:
- 调用资源类型实例的 import 方法
- 返回导入结果

**示例**:
```typescript
const schema = {
  componentName: 'Page',
  props: {},
  children: []
};
const result = await resource.import(schema);
```

##### save()

```typescript
async save(value: any): Promise<any>
```

**功能**: 保存资源数据

**参数**:
- `value`: 要保存的数据

**返回值**: `Promise<any>`

**说明**:
- 调用资源类型实例的 save 方法
- 返回保存结果

**示例**:
```typescript
const value = { data: 'some data' };
const result = await resource.save(value);
```

##### url()

```typescript
async url(): Promise<string>
```

**功能**: 获取资源 URL

**返回值**: `Promise<string>`

**说明**:
- 调用资源类型实例的 url 方法
- 返回 URL 字符串

**示例**:
```typescript
const url = await resource.url();
console.log(url);
```

##### getEditorView()

```typescript
getEditorView(viewName: string): IPublicTypeEditorView | undefined
```

**功能**: 获取编辑器视图

**参数**:
- `viewName`: 视图名称

**返回值**: `IPublicTypeEditorView | undefined`

**说明**:
- 从编辑器视图映射中查找视图
- 返回视图配置或 undefined

**示例**:
```typescript
const view = resource.getEditorView('editor-view');
```

---

### 3. EditorWindow 类

#### 类定义

```typescript
export class EditorWindow implements IEditorWindow {
  id: string;
  icon: React.ReactElement | undefined;
  @obx.ref _editorView: Context;
  @obx editorViews: Map<string, Context>;
  @obx initReady: boolean;
  sleep: boolean | undefined;
  emitter: IEventBus;
  resource: IResource;
  workspace: IWorkspace;
  url: string;
}
```

#### 构造函数

```typescript
constructor(
  resource: IResource,
  workspace: IWorkspace,
  options?: IWindowOptions
)
```

**参数**:
- `resource`: 资源对象
- `workspace`: 工作空间实例
- `options`: 可选的窗口选项

**说明**:
- 创建 EditorWindow 实例
- 生成唯一窗口 ID
- 初始化事件总线

**示例**:
```typescript
const window = new EditorWindow(resource, workspace, {
  title: 'My Window'
});
```

#### 方法

##### updateState()

```typescript
updateState(state: WINDOW_STATE): void
```

**功能**: 更新窗口状态

**参数**:
- `state`: 窗口状态（`sleep`、`active`、`inactive`、`destroyed`）

**返回值**: `void`

**说明**:
- 根据状态更新窗口
- 激活或非激活编辑器视图

**示例**:
```typescript
window.updateState(WINDOW_STATE.active);
```

##### importSchema()

```typescript
async importSchema(schema: any): Promise<void>
```

**功能**: 导入 Schema

**参数**:
- `schema`: Schema 数据

**返回值**: `Promise<void>`

**说明**:
- 遍历所有编辑器视图
- 调用每个视图的 import 方法

**示例**:
```typescript
await window.importSchema({
  componentName: 'Page',
  props: {},
  children: []
});
```

##### save()

```typescript
async save(): Promise<any>
```

**功能**: 保存窗口数据

**返回值**: `Promise<any>`

**说明**:
- 遍历所有编辑器视图
- 调用每个视图的 save 方法
- 调用资源的 save 方法
- 发射 `handle.save` 事件

**示例**:
```typescript
const result = await window.save();
```

##### init()

```typescript
async init(): Promise<void>
```

**功能**: 初始化窗口

**返回值**: `Promise<void>`

**说明**:
- 初始化视图类型
- 执行视图类型初始化
- 等待所有视图的模拟器渲染就绪
- 获取资源 URL
- 设置默认视图名称
- 标记初始化完成
- 检查窗口队列
- 更新窗口状态为激活

**示例**:
```typescript
await window.init();
```

##### changeViewName()

```typescript
async changeViewName(viewName: string): Promise<void>
```

**功能**: 切换视图名称

**参数**:
- `viewName`: 视图名称

**返回值**: `Promise<void>`

**说明**:
- 切换到指定的视图
- 发射 `CHANGE_ACTIVE_EDITOR_VIEW` 事件

**示例**:
```typescript
await window.changeViewName('editor-view');
```

##### onChangeView()

```typescript
onChangeView(fn: () => void): () => void
```

**功能**: 监听视图变化

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `CHANGE_ACTIVE_EDITOR_VIEW` 事件
- 返回取消监听的函数

**示例**:
```typescript
const cancel = window.onChangeView(() => {
  console.log('View changed');
});
// 取消监听
cancel();
```

##### onHandleSave()

```typescript
onHandleSave(fn: () => void): () => void
```

**功能**: 监听保存操作

**参数**:
- `fn`: 回调函数

**返回值**: `() => void` - 取消监听的函数

**说明**:
- 监听 `handle.save` 事件
- 返回取消监听的函数

**示例**:
```typescript
const cancel = window.onHandleSave(() => {
  console.log('Saved');
});
// 取消监听
cancel();
```

---

### 4. ResourceType 类

#### 类定义

```typescript
export class ResourceType implements IResourceType {
  constructor(readonly resourceTypeModel: IPublicTypeResourceType) {}
}
```

#### 属性

##### name

```typescript
get name(): string
```

**功能**: 获取资源类型名称

**返回值**: `string`

**说明**:
- 从资源类型模型中获取资源名称

**示例**:
```typescript
const name = resourceType.name;
console.log(name); // 'myResource'
```

##### type

```typescript
get type(): 'editor' | 'webview'
```

**功能**: 获取资源类型

**返回值**: `'editor' | 'webview'`

**说明**:
- 从资源类型模型中获取资源类型

**示例**:
```typescript
const type = resourceType.type;
console.log(type); // 'editor' 或 'webview'
```

---

### 5. BasicContext 类

#### 类定义

```typescript
export class BasicContext implements IBasicContext {
  skeleton: IPublicApiSkeleton;
  plugins: IPublicApiPlugins;
  project: IPublicApiProject;
  setters: IPublicApiSetters;
  material: IPublicApiMaterial;
  common: IPublicApiCommon;
  config: IEngineConfig;
  event: IPublicApiEvent;
  logger: InnerLogger;
  hotkey: IPublicApiHotkey;
  innerProject: IProject;
  editor: Editor;
  designer: Designer;
  registerInnerPlugins: () => Promise<void>;
  innerSetters: InnerSetters;
  innerSkeleton: ISkeleton;
  innerHotkey: IHotKey;
  innerPlugins: ILowCodePluginManager;
  canvas: IPublicApiCanvas;
  pluginEvent: IPublicApiEvent;
  preference: IPluginPreferenceMananger;
  workspace: IWorkspace;
}
```

#### 构造函数

```typescript
constructor(
  innerWorkspace: IWorkspace,
  viewName: string,
  readonly registerLevel: IPublicEnumPluginRegisterLevel,
  public editorWindow?: IEditorWindow
)
```

**参数**:
- `innerWorkspace`: 内部工作空间实例
- `viewName`: 视图名称
- `registerLevel`: 插件注册级别
- `editorWindow`: 可选的编辑器窗口

**说明**:
- 创建 Editor 实例
- 创建 Designer 实例
- 创建 InnerSkeleton 实例
- 创建 Workspace 实例
- 创建 InnerHotkey 实例
- 创建 InnerSetters 实例
- 创建 Setters 实例
- 创建 Material 实例
- 创建 Project 实例
- 创建 Event 实例
- 创建 Logger 实例
- 创建 Canvas 实例
- 创建 LowCodePluginManager 实例
- 创建 Plugins 代理

**示例**:
```typescript
const context = new BasicContext(
  workspace,
  'editor-view',
  IPublicEnumPluginRegisterLevel.Resource
);
```

#### 属性

所有属性都是公共的，可以直接访问：

```typescript
// 访问骨架
context.skeleton.addPanel({ ... });

// 访问插件
context.plugins.register(...);

// 访问项目
context.project.get('documentId');

// 访问设置器
context.setters.get('mySetter');

// 访问物料
context.material.getComponentMeta('Div');

// 访问通用工具
context.common.utils.toJS(...);

// 访问配置
context.config.get('designMode');

// 访问事件
context.event.on('some.event', () => {});

// 访问日志
context.logger.log('Some message');

// 访问快捷键
context.hotkey.bind('cmd+s', () => {});

// 访问画布
context.canvas.get('documentId');

// 访问工作空间
context.workspace.openEditorWindow(...);
```

---

### 6. Context 类（视图上下文）

#### 类定义

```typescript
export class Context extends BasicContext implements IViewContext {
  viewName: string;
  viewType: 'editor' | 'webview';
  instance: IPublicEditorViewConfig;
  @obx _activate: boolean;
  @obx isInit: boolean;
}
```

#### 构造函数

```typescript
constructor(
  innerWorkspace: IWorkspace,
  viewName: string,
  viewType: 'editor' | 'webview',
  instance: IPublicEditorViewConfig,
  registerLevel: IPublicEnumPluginRegisterLevel,
  editorWindow?: IEditorWindow
)
```

**参数**:
- `innerWorkspace`: 内部工作空间实例
- `viewName`: 视图名称
- `viewType`: 视图类型（`editor` 或 `webview`）
- `instance`: 编辑器视图配置
- `registerLevel`: 插件注册级别
- `editorWindow`: 可选的编辑器窗口

**说明**:
- 调用父类 BasicContext 的构造函数
- 初始化视图类型和实例

**示例**:
```typescript
const context = new Context(
  workspace,
  'editor-view',
  'editor',
  viewConfig,
  IPublicEnumPluginRegisterLevel.Resource
);
```

#### 方法

##### init()

```typescript
init(): void
```

**功能**: 初始化视图

**返回值**: `void`

**说明**:
- 如果是 webview 类型，注册 webview 插件
- 否则注册内部插件
- 调用视图实例的 init 方法
- 初始化插件管理器
- 标记初始化完成

**示例**:
```typescript
context.init();
```

##### setActivate()

```typescript
setActivate(_activate: boolean): void
```

**功能**: 设置激活状态

**参数**:
- `_activate`: 是否激活

**返回值**: `void`

**说明**:
- 设置视图的激活状态

**示例**:
```typescript
context.setActivate(true);
```

##### onSimulatorRendererReady()

```typescript
onSimulatorRendererReady(): Promise<void>
```

**功能**: 监听模拟器渲染就绪

**返回值**: `Promise<void>`

**说明**:
- 等待模拟器渲染器就绪事件

**示例**:
```typescript
await context.onSimulatorRendererReady();
```

##### save()

```typescript
async save(): Promise<any>
```

**功能**: 保存数据

**返回值**: `Promise<any>`

**说明**:
- 调用视图实例的 save 方法
- 返回保存结果

**示例**:
```typescript
const result = await context.save();
```

---

### 7. Workbench 组件

#### 组件定义

```typescript
@observer
export class Workbench extends Component<
  {
    workspace: Workspace;
    config?: EditorConfig;
    components?: PluginClassSet;
    className?: string;
    topAreaItemClassName?: string;
  },
  {
    workspaceEmptyComponent: any;
    theme?: string;
  }
>
```

#### Props

```typescript
interface WorkbenchProps {
  workspace: Workspace;           // 工作空间实例
  config?: EditorConfig;          // 编辑器配置
  components?: PluginClassSet;    // 插件组件集合
  className?: string;             // 自定义类名
  topAreaItemClassName?: string;  // 顶部区域项类名
}
```

#### State

```typescript
interface WorkbenchState {
  workspaceEmptyComponent: any;   // 工作空间空状态组件
  theme?: string;                  // 主题
}
```

#### 使用示例

```typescript
import { Workbench } from '@alilc/lowcode-workspace';

<Workbench
  workspace={workspace}
  config={editorConfig}
  components={pluginComponents}
  className="my-workbench"
  topAreaItemClassName="my-top-item"
/>
```

---

## 类型定义

### IWorkspace

```typescript
export interface IWorkspace {
  context: BasicContext;
  enableAutoOpenFirstWindow: boolean;
  resourceTypeMap: Map<string, ResourceType>;
  windows: IEditorWindow[];
  editorWindowMap: Map<string, IEditorWindow>;
  window: IEditorWindow;
  windowQueue: IWindowInfo[];
  resourceList: IResource[];
  shellModelFactory?: IPublicTypeShellModelFactory;
  
  initWindow(): Promise<void>;
  openEditorWindowByResource(resource: IResource, sleep?: boolean): Promise<void>;
  openEditorWindow(name: string, title?: string, options?: IPublicTypeEditorWindowOptions, viewName?: string): Promise<void>;
  removeEditorWindow(id: string): void;
  checkWindowQueue(): void;
  setActive(): void;
  registerResourceType(resourceTypeModel: IPublicTypeResourceType): Promise<void>;
  onChangeWindows(fn: () => void): () => void;
  onChangeActiveWindow(fn: () => void): () => void;
  onWindowRendererReady(fn: () => void): () => void;
  emitWindowRendererReady(): void;
}
```

### IResource

```typescript
export interface IResource {
  readonly resourceData: IPublicResourceData;
  readonly resourceType: IResourceType;
  readonly workspace: IWorkspace;
  readonly options: any;
  
  import(schema: any): Promise<any>;
  save(value: any): Promise<any>;
  url(): Promise<string>;
  getEditorView(viewName: string): IPublicTypeEditorView | undefined;
}
```

### IEditorWindow

```typescript
export interface IEditorWindow {
  id: string;
  icon: React.ReactElement | undefined;
  _editorView: Context;
  editorViews: Map<string, Context>;
  initReady: boolean;
  sleep: boolean | undefined;
  resource: IResource;
  workspace: IWorkspace;
  url: string;
  
  updateState(state: WINDOW_STATE): void;
  importSchema(schema: any): Promise<void>;
  save(): Promise<any>;
  init(): Promise<void>;
  changeViewName(viewName: string): Promise<void>;
  onChangeView(fn: () => void): () => void;
  onHandleSave(fn: () => void): () => void;
}
```

### IResourceType

```typescript
export interface IResourceType extends Omit<IPublicTypeResourceType, 'resourceName' | 'resourceType'> {
  name: string;
  type: 'editor' | 'webview';
  resourceTypeModel: IPublicTypeResourceType;
}
```

### IBasicContext

```typescript
export interface IBasicContext {
  skeleton: IPublicApiSkeleton;
  plugins: IPublicApiPlugins;
  project: IPublicApiProject;
  setters: IPublicApiSetters;
  material: IPublicApiMaterial;
  common: IPublicApiCommon;
  config: IEngineConfig;
  event: IPublicApiEvent;
  logger: InnerLogger;
  hotkey: IPublicApiHotkey;
  innerProject: IProject;
  editor: Editor;
  designer: Designer;
  registerInnerPlugins: () => Promise<void>;
  innerSetters: InnerSetters;
  innerSkeleton: ISkeleton;
  innerHotkey: IHotKey;
  innerPlugins: ILowCodePluginManager;
  canvas: IPublicApiCanvas;
  pluginEvent: IPublicApiEvent;
  preference: IPluginPreferenceMananger;
  workspace: IWorkspace;
}
```

### IViewContext

```typescript
export interface IViewContext extends IBasicContext {
  viewName: string;
  viewType: 'editor' | 'webview';
  instance: IPublicEditorViewConfig;
  _activate: boolean;
  isInit: boolean;
  
  init(): void;
  setActivate(_activate: boolean): void;
  onSimulatorRendererReady(): Promise<void>;
  save(): Promise<any>;
}
```

### WINDOW_STATE

```typescript
export enum WINDOW_STATE {
  sleep = 'sleep',
  active = 'active',
  inactive = 'inactive',
  destroyed = 'destroyed'
}
```

### IWindowInfo

```typescript
export type IWindowInfo = IResource | {
  name: string;
  title?: string;
  options?: IPublicTypeEditorWindowOptions;
  viewName?: string;
};
```

---

## 使用示例

### 基本使用

```typescript
import { Workspace } from '@alilc/lowcode-workspace';

// 创建工作空间
const workspace = new Workspace(
  (plugins) => {
    // 注册内部插件
  },
  shellModelFactory
);

// 注册资源类型
await workspace.registerResourceType({
  resourceName: 'page',
  resourceType: 'editor',
  resourceTypeModel: {
    editorViews: [
      {
        viewName: 'editor-view',
        type: 'editor',
        // ... 其他配置
      }
    ],
    // ... 其他配置
  }
});

// 初始化窗口
await workspace.initWindow();

// 监听窗口变化
workspace.onChangeWindows(() => {
  console.log('Windows changed');
});
```

### 打开窗口

```typescript
// 通过资源打开窗口
const resource = new Resource(
  { resourceName: 'myPage', options: {} },
  resourceType,
  workspace
);
await workspace.openEditorWindowByResource(resource);

// 通过名称打开窗口
await workspace.openEditorWindow(
  'myWindow',
  'My Window',
  { width: 800, height: 600 },
  'editor'
);
```

### 窗口操作

```typescript
// 获取活动窗口
const activeWindow = workspace.window;

// 保存窗口数据
await activeWindow.save();

// 切换视图
await activeWindow.changeViewName('editor-view');

// 关闭窗口
workspace.removeEditorWindow(activeWindow.id);
```

### 插件开发

```typescript
// 插件通过上下文访问所有能力
const context = plugins._getLowCodePluginContext({
  pluginName: 'myPlugin',
});

// 访问项目
const document = context.project.get('documentId');

// 访问骨架
context.skeleton.addPanel({
  type: 'Panel',
  name: 'myPanel',
  title: 'My Panel',
  area: 'leftArea',
});

// 访问设置器
const setter = context.setters.get('mySetter');

// 访问物料
const meta = context.material.getComponentMeta('Div');

// 访问事件
context.event.on('some.event', () => {
  console.log('Event triggered');
});

// 访问快捷键
context.hotkey.bind('cmd+s', () => {
  console.log('Save shortcut');
});
```

---

## 最佳实践

### 1. 窗口管理

```typescript
// 推荐使用资源打开窗口
await workspace.openEditorWindowByResource(resource);

// 避免直接操作窗口列表
// 不推荐: workspace.windows.push(window);
```

### 2. 事件监听

```typescript
// 总是保存取消监听的函数
const cancel = workspace.onChangeWindows(() => {
  console.log('Windows changed');
});

// 在组件卸载时取消监听
useEffect(() => {
  return () => {
    cancel();
  };
}, []);
```

### 3. 插件开发

```typescript
// 使用插件上下文访问能力
// 推荐使用 context.skeleton 而不是直接访问 innerSkeleton
context.skeleton.addPanel({ ... });

// 避免直接访问内部实例
// 不推荐: context.innerSkeleton.addPanel({ ... });
```

### 4. 错误处理

```typescript
// 使用 try-catch 处理异步操作
try {
  await workspace.openEditorWindowByResource(resource);
} catch (error) {
  console.error('Failed to open window:', error);
}
```

### 5. 性能优化

```typescript
// 使用窗口休眠机制减少资源消耗
await workspace.openEditorWindowByResource(resource, true);

// 避免频繁创建和销毁窗口
// 推荐复用窗口
```

---

## 注意事项

1. **窗口状态管理**: 窗口状态转换有明确的逻辑，不要手动修改状态
2. **事件监听**: 总是在组件卸载时取消事件监听
3. **插件上下文**: 插件上下文是隔离的，不要跨插件访问上下文
4. **资源类型**: 资源类型需要在打开窗口前注册
5. **异步操作**: 所有涉及窗口和资源的操作都是异步的，需要使用 await

---

## API 变更历史

### v1.3.2

- 新增 `emitWindowRendererReady()` 方法
- 新增 `onWindowRendererReady()` 方法
- 新增 `onChangeView()` 方法
- 新增 `onHandleSave()` 方法
- 优化窗口队列处理逻辑

### v1.3.0

- 新增 `enableAutoOpenFirstWindow` 配置
- 新增窗口休眠机制
- 优化窗口状态管理
- 新增 `setActive()` 方法

### v1.2.0

- 新增 `shellModelFactory` 参数
- 新增 `checkWindowQueue()` 方法
- 优化资源类型注册逻辑
- 新增 `removeEditorWindow()` 方法

---

## 相关文档

- [架构设计文档](./01-架构设计.md)
- [文件功能说明](./03-文件功能说明.md)
- [源文件文档](./04-src-index.ts.md)
