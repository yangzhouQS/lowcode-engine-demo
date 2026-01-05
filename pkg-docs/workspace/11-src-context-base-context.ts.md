# src/context/base-context.ts 文档

## 文件路径

`packages/workspace/src/context/base-context.ts`

## 功能概述

基础上下文类，为插件提供核心能力，包括设计器、编辑器、骨架、项目、快捷键、设置器、物料、插件、画布等核心模块的集成。

## 主要功能

1. **核心模块集成**: 集成设计器、编辑器、骨架、项目等核心模块
2. **插件上下文组装**: 为插件组装上下文 API
3. **事件系统**: 提供事件总线
4. **快捷键系统**: 提供快捷键管理
5. **物料系统**: 提供物料管理
6. **插件管理**: 提供插件注册和管理

## 代码分析

### 导入

```typescript
import {
  Editor,
  engineConfig, Setters as InnerSetters,
  Hotkey as InnerHotkey,
  commonEvent,
  IEngineConfig,
  IHotKey,
  Command as InnerCommand,
} from '@alilc/lowcode-editor-core';
import {
  Designer,
  ILowCodePluginContextApiAssembler,
  LowCodePluginManager,
  ILowCodePluginContextPrivate,
  IProject,
  IDesigner,
  ILowCodePluginManager,
} from '@alilc/lowcode-designer';
import {
  ISkeleton,
  Skeleton as InnerSkeleton,
} from '@alilc/lowcode-editor-skeleton';
import {
  Hotkey,
  Plugins,
  Project,
  Skeleton,
  Setters,
  Material,
  Event,
  Common,
  Logger,
  Workspace,
  Window,
  Canvas,
  CommonUI,
  Command,
} from '@alilc/lowcode-shell';
import {
  IPluginPreferenceMananger,
  IPublicApiCanvas,
  IPublicApiCommon,
  IPublicApiEvent,
  IPublicApiHotkey,
  IPublicApiMaterial,
  IPublicApiPlugins,
  IPublicApiProject,
  IPublicApiSetters,
  IPublicApiSkeleton,
  IPublicEnumPluginRegisterLevel,
  IPublicModelPluginContext,
  IPublicTypePluginMeta,
} from '@alilc/lowcode-types';
import { getLogger, Logger as InnerLogger } from '@alilc/lowcode-utils';
import { IWorkspace } from '../workspace';
import { IEditorWindow } from '../window';
```

### 接口定义

#### IBasicContext

```typescript
export interface IBasicContext extends Omit<IPublicModelPluginContext, 'workspace'> {
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
  designer: IDesigner;
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

**说明**: 基础上下文接口，定义了插件可访问的所有核心能力

### 类定义

```typescript
export class BasicContext implements IBasicContext
```

### 构造函数

```typescript
constructor(
  innerWorkspace: IWorkspace,
  viewName: string,
  readonly registerLevel: IPublicEnumPluginRegisterLevel,
  public editorWindow?: IEditorWindow
)
```

**参数**:
- `innerWorkspace: IWorkspace` - 内部工作空间实例
- `viewName: string` - 视图名称
- `registerLevel: IPublicEnumPluginRegisterLevel` - 插件注册级别
- `editorWindow?: IEditorWindow` - 编辑器窗口（可选）

**说明**:
- 创建 Editor 实例
- 创建 Skeleton 实例并设置到 Editor
- 创建 Designer 实例并设置到 Editor
- 创建 Hotkey、Setters、Material、Project、Config、Event、Logger、Canvas、CommonUI 等实例
- 创建插件上下文 API 组装器
- 创建插件管理器
- 创建 registerInnerPlugins 方法

### 属性

#### skeleton

```typescript
skeleton: IPublicApiSkeleton
```

**功能**: 骨架 API，用于布局管理

#### plugins

```typescript
plugins: IPublicApiPlugins
```

**功能**: 插件 API，用于插件管理

#### project

```typescript
project: IPublicApiProject
```

**功能**: 项目 API，用于项目管理

#### setters

```typescript
setters: IPublicApiSetters
```

**功能**: 设置器 API，用于属性设置

#### material

```typescript
material: IPublicApiMaterial
```

**功能**: 物料 API，用于物料管理

#### common

```typescript
common: IPublicApiCommon
```

**功能**: 通用 API，提供通用功能

#### config

```typescript
config: IEngineConfig
```

**功能**: 引擎配置

#### event

```typescript
event: IPublicApiEvent
```

**功能**: 事件 API，用于事件管理

#### logger

```typescript
logger: InnerLogger
```

**功能**: 日志记录器

#### hotkey

```typescript
hotkey: IPublicApiHotkey
```

**功能**: 快捷键 API，用于快捷键管理

#### innerProject

```typescript
innerProject: IProject
```

**功能**: 内部项目实例

#### editor

```typescript
editor: Editor
```

**功能**: 编辑器实例

#### designer

```typescript
designer: IDesigner
```

**功能**: 设计器实例

#### registerInnerPlugins

```typescript
registerInnerPlugins: () => Promise<void>
```

**功能**: 注册内置插件

**说明**: 调用工作空间的 registryInnerPlugin 方法

#### innerSetters

```typescript
innerSetters: InnerSetters
```

**功能**: 内部设置器实例

#### innerSkeleton

```typescript
innerSkeleton: ISkeleton
```

**功能**: 内部骨架实例

#### innerHotkey

```typescript
innerHotkey: IHotKey
```

**功能**: 内部快捷键实例

#### innerPlugins

```typescript
innerPlugins: ILowCodePluginManager
```

**功能**: 内部插件管理器

#### canvas

```typescript
canvas: IPublicApiCanvas
```

**功能**: 画布 API，用于画布操作

#### pluginEvent

```typescript
pluginEvent: IPublicApiEvent
```

**功能**: 插件事件 API

#### preference

```typescript
preference: IPluginPreferenceMananger
```

**功能**: 插件偏好设置管理器

#### workspace

```typescript
workspace: IWorkspace
```

**功能**: 工作空间实例

### 插件上下文 API 组装器

```typescript
const pluginContextApiAssembler: ILowCodePluginContextApiAssembler = {
  assembleApis: (context: ILowCodePluginContextPrivate, pluginName: string, meta: IPublicTypePluginMeta) => {
    context.workspace = workspace;
    context.hotkey = hotkey;
    context.project = project;
    context.skeleton = new Skeleton(innerSkeleton, pluginName, true);
    context.setters = setters;
    context.material = material;
    const eventPrefix = meta?.eventPrefix || 'common';
    const commandScope = meta?.commandScope;
    context.event = new Event(commonEvent, { prefix: eventPrefix });
    context.config = config;
    context.common = common;
    context.plugins = plugins;
    context.logger = new Logger({ level: 'warn', bizName: `plugin:${pluginName}` });
    context.canvas = canvas;
    context.commonUI = commonUI;
    if (editorWindow) {
      context.editorWindow = new Window(editorWindow);
    }
    context.command = new Command(innerCommand, context as IPublicModelPluginContext, {
      commandScope,
    });
    context.registerLevel = registerLevel;
    context.isPluginRegisteredInWorkspace = registerLevel === IPublicEnumPluginRegisterLevel.Workspace;
    editor.set('pluginContext', context);
  },
};
```

**说明**: 为每个插件组装上下文 API，包括：
- workspace: 工作空间
- hotkey: 快捷键
- project: 项目
- skeleton: 骨架（每个插件独立的实例）
- setters: 设置器
- material: 物料
- event: 事件（支持自定义前缀）
- config: 配置
- common: 通用功能
- plugins: 插件
- logger: 日志（每个插件独立的实例）
- canvas: 画布
- commonUI: 通用 UI
- editorWindow: 编辑器窗口（如果存在）
- command: 命令
- registerLevel: 注册级别
- isPluginRegisteredInWorkspace: 是否在工作空间注册

## 使用示例

### 创建基础上下文

```typescript
import { BasicContext } from '@alilc/lowcode-workspace';

const context = new BasicContext(
  workspace,
  'my-view',
  IPublicEnumPluginRegisterLevel.Workspace,
  editorWindow
);
```

### 访问核心模块

```typescript
// 访问骨架
const skeleton = context.skeleton;

// 访问插件
const plugins = context.plugins;

// 访问项目
const project = context.project;

// 访问设置器
const setters = context.setters;

// 访问物料
const material = context.material;

// 访问事件
const event = context.event;

// 访问快捷键
const hotkey = context.hotkey;

// 访问画布
const canvas = context.canvas;

// 访问工作空间
const workspace = context.workspace;
```

### 注册内置插件

```typescript
await context.registerInnerPlugins();
```

## 注意事项

1. **上下文隔离**: 每个插件都有独立的 skeleton 和 logger 实例
2. **事件前缀**: 插件可以自定义事件前缀，默认为 'common'
3. **命令作用域**: 插件可以自定义命令作用域
4. **注册级别**: 插件可以在工作空间或编辑器视图级别注册
5. **编辑器窗口**: 编辑器窗口是可选的，只有在编辑器视图级别才需要

## 最佳实践

1. **上下文复用**: 在同一个视图中复用同一个上下文实例
2. **插件隔离**: 利用上下文隔离机制，避免插件间相互干扰
3. **事件管理**: 使用事件前缀区分不同插件的事件
4. **命令管理**: 使用命令作用域区分不同插件的命令
5. **日志管理**: 使用插件级别的日志记录器，便于调试

## 相关文件

- [`context/view-context.ts`](./12-src-context-view-context.ts.md) - 视图上下文类，继承自 BasicContext
- [`workspace.ts`](./05-src-workspace.ts.md) - 工作空间核心类
- [`window.ts`](./09-src-window.ts.md) - 编辑器窗口类

## 总结

`src/context/base-context.ts` 是基础上下文类，负责为插件提供核心能力。它集成了设计器、编辑器、骨架、项目、快捷键、设置器、物料、插件、画布等核心模块，并提供了插件上下文 API 组装器，为每个插件组装独立的上下文 API。
