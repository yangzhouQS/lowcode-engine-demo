# src/context/view-context.ts 文档

## 文件路径

`packages/workspace/src/context/view-context.ts`

## 功能概述

视图上下文类，继承自 BasicContext，为编辑器视图和 webview 视图提供上下文支持，支持视图激活状态管理和初始化。

## 主要功能

1. **视图类型支持**: 支持 editor 和 webview 两种视图类型
2. **视图初始化**: 提供视图初始化流程
3. **激活状态管理**: 管理视图的激活状态
4. **快捷键激活**: 根据激活状态管理快捷键
5. **资源保存**: 提供资源保存功能

## 代码分析

### 导入

```typescript
import { computed, makeObservable, obx } from '@alilc/lowcode-editor-core';
import { IPublicEditorViewConfig, IPublicEnumPluginRegisterLevel, IPublicTypeEditorView } from '@alilc/lowcode-types';
import { flow } from 'mobx';
import { IWorkspace } from '../workspace';
import { BasicContext, IBasicContext } from './base-context';
import { IEditorWindow } from '../window';
import { getWebviewPlugin } from '../inner-plugins/webview';
```

### 接口定义

#### IViewContext

```typescript
export interface IViewContext extends IBasicContext {
  editorWindow: IEditorWindow;
  viewName: string;
  viewType: 'editor' | 'webview';
}
```

**说明**: 视图上下文接口，扩展了基础上下文，增加了编辑器窗口、视图名称和视图类型

### 类定义

```typescript
export class Context extends BasicContext implements IViewContext
```

### 构造函数

```typescript
constructor(
  public workspace: IWorkspace,
  public editorWindow: IEditorWindow,
  public editorView: IPublicTypeEditorView,
  options: Object | undefined
)
```

**参数**:
- `workspace: IWorkspace` - 工作空间实例
- `editorWindow: IEditorWindow` - 编辑器窗口实例
- `editorView: IPublicTypeEditorView` - 编辑器视图配置
- `options: Object | undefined` - 视图选项

**说明**:
- 调用父类构造函数，注册级别为 EditorView
- 设置视图类型（editor 或 webview）
- 设置视图名称
- 创建视图实例
- 使类可观察

### 属性

#### editorWindow

```typescript
public editorWindow: IEditorWindow
```

**功能**: 编辑器窗口实例

#### workspace

```typescript
public workspace: IWorkspace
```

**功能**: 工作空间实例

#### editorView

```typescript
public editorView: IPublicTypeEditorView
```

**功能**: 编辑器视图配置

#### viewName

```typescript
viewName = 'editor-view'
```

**功能**: 视图名称

**说明**: 默认值为 'editor-view'，构造函数中会更新为实际的视图名称

#### instance

```typescript
instance: IPublicEditorViewConfig
```

**功能**: 视图实例

**说明**: 通过调用 editorView 函数创建

#### viewType

```typescript
viewType: 'editor' | 'webview'
```

**功能**: 视图类型

**说明**: 'editor' 或 'webview'

#### _activate

```typescript
@obx _activate = false
```

**功能**: 内部激活状态

**说明**: 使用 MobX 的 obx 装饰器，初始值为 false

#### isInit

```typescript
@obx isInit: boolean = false
```

**功能**: 初始化状态

**说明**: 使用 MobX 的 obx 装饰器，初始值为 false

### 方法

#### init

```typescript
init = flow(function* (this: Context) {
  if (this.viewType === 'webview') {
    const url = yield this.instance?.url?.();
    yield this.plugins.register(getWebviewPlugin(url, this.viewName));
  } else {
    yield this.registerInnerPlugins();
  }
  yield this.instance?.init?.();
  yield this.innerPlugins.init();
  this.isInit = true;
});
```

**功能**: 初始化视图

**说明**:
- 如果是 webview 类型：
  - 获取 URL
  - 注册 webview 插件
- 如果是 editor 类型：
  - 注册内置插件
- 调用视图实例的 init 方法
- 初始化内部插件
- 设置初始化状态为 true

**使用示例**:
```typescript
await context.init();
```

#### active

```typescript
@computed get active() {
  return this._activate;
}
```

**功能**: 获取激活状态

**返回值**: `boolean`

**说明**: 使用 MobX 的 computed 装饰器

**使用示例**:
```typescript
if (context.active) {
  // 视图已激活
}
```

#### onSimulatorRendererReady

```typescript
onSimulatorRendererReady = (): Promise<void> => {
  return new Promise((resolve) => {
    this.project.onSimulatorRendererReady(() => {
      resolve();
    });
  });
};
```

**功能**: 等待模拟器渲染器就绪

**返回值**: `Promise<void>`

**说明**: 返回一个 Promise，在模拟器渲染器就绪时 resolve

**使用示例**:
```typescript
await context.onSimulatorRendererReady();
```

#### setActivate

```typescript
setActivate = (_activate: boolean) => {
  this._activate = _activate;
  this.innerHotkey.activate(this._activate);
};
```

**功能**: 设置激活状态

**参数**:
- `_activate: boolean` - 激活状态

**说明**:
- 更新内部激活状态
- 根据激活状态激活或停用快捷键

**使用示例**:
```typescript
context.setActivate(true);
```

#### save

```typescript
async save() {
  return await this.instance?.save?.();
}
```

**功能**: 保存资源

**返回值**: `Promise<void>`

**说明**: 调用视图实例的 save 方法

**使用示例**:
```typescript
await context.save();
```

## 使用示例

### 创建视图上下文

```typescript
import { Context } from '@alilc/lowcode-workspace';

const context = new Context(
  workspace,
  editorWindow,
  editorView,
  options
);
```

### 初始化视图

```typescript
await context.init();
```

### 激活视图

```typescript
context.setActivate(true);
```

### 停用视图

```typescript
context.setActivate(false);
```

### 检查激活状态

```typescript
if (context.active) {
  // 视图已激活
}
```

### 等待模拟器渲染器就绪

```typescript
await context.onSimulatorRendererReady();
```

### 保存资源

```typescript
await context.save();
```

## 视图类型

### editor

**说明**: 编辑器视图类型

**特点**:
- 使用内置插件
- 支持低代码编辑功能
- 支持拖拽、配置等操作

**初始化流程**:
1. 注册内置插件
2. 调用视图实例的 init 方法
3. 初始化内部插件

### webview

**说明**: Webview 视图类型

**特点**:
- 使用 iframe 渲染
- 支持自定义 URL
- 支持外部页面嵌入

**初始化流程**:
1. 获取 URL
2. 注册 webview 插件
3. 调用视图实例的 init 方法
4. 初始化内部插件

## 注意事项

1. **视图类型**: 视图类型必须在构造函数中正确设置
2. **初始化顺序**: 必须先调用 init 方法，再使用其他功能
3. **激活状态**: 激活状态会影响快捷键的可用性
4. **异步操作**: init、save 都是异步方法，需要使用 async/await
5. **视图实例**: 视图实例是通过调用 editorView 函数创建的

## 最佳实践

1. **初始化检查**: 使用 isInit 属性检查视图是否已初始化
2. **激活管理**: 根据需要激活或停用视图
3. **异步处理**: 使用 async/await 处理异步操作
4. **错误处理**: 在初始化和保存时添加错误处理
5. **资源清理**: 视图销毁时清理相关资源

## 相关文件

- [`context/base-context.ts`](./11-src-context-base-context.ts.md) - 基础上下文类
- [`workspace.ts`](./05-src-workspace.ts.md) - 工作空间核心类
- [`window.ts`](./09-src-window.ts.md) - 编辑器窗口类
- [`inner-plugins/webview.tsx`](./13-src-inner-plugins-webview.tsx.md) - Webview 插件

## 总结

`src/context/view-context.ts` 是视图上下文类，继承自 BasicContext，为编辑器视图和 webview 视图提供上下文支持。它支持视图初始化、激活状态管理、快捷键管理和资源保存等功能，是视图层的核心实现。
