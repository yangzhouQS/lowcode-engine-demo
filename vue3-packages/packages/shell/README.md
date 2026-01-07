# @vue3-lowcode/shell

Vue3 LowCode Engine Shell API - 外部 API 层,用于低代码编辑器。

## 概述

`@vue3-lowcode/shell` 是 Vue3 低代码引擎的外部 API 层,提供了对低代码引擎核心功能的统一访问接口。它封装了编辑器、设计器、文档模型等核心模块,为上层应用提供简洁易用的 API。

## 特性

- 🎯 **统一接口**: 提供统一的 API 接口访问低代码引擎的所有核心功能
- 🔧 **生命周期管理**: 完整的初始化、启动、停止、销毁生命周期管理
- 📦 **状态持久化**: 支持导出和导入编辑器状态
- 🎨 **Vue3 响应式**: 基于 Vue3 响应式系统,提供更好的开发体验
- 📝 **TypeScript**: 完整的 TypeScript 类型定义

## 安装

```bash
pnpm add @vue3-lowcode/shell
```

## 快速开始

### 创建 Shell 实例

```typescript
import { Shell } from '@vue3-lowcode/shell';

// 创建 Shell 实例
const shell = new Shell({
  container: document.getElementById('app'),
  // 其他配置项
});

// 初始化 Shell
await shell.init();

// 启动 Shell
await shell.start();
```

### 访问核心功能

```typescript
// 获取文档模型
const documentModel = shell.getDocumentModel();

// 获取选区
const selection = shell.getSelection();

// 获取历史记录
const history = shell.getHistory();

// 获取项目
const project = shell.getProject();
```

### 导出和导入状态

```typescript
// 导出当前状态
const state = shell.export();

// 导入状态
await shell.import(state);
```

### 销毁 Shell

```typescript
// 停止 Shell
await shell.stop();

// 销毁 Shell
await shell.dispose();
```

## Shell API

### 构造函数

```typescript
constructor(config: IShellConfig)
```

创建 Shell 实例。

**参数:**
- `config`: Shell 配置对象

**示例:**
```typescript
const shell = new Shell({
  container: document.getElementById('app'),
  locale: 'zh-CN',
  // 其他配置项
});
```

### 生命周期方法

#### init

```typescript
async init(): Promise<void>
```

初始化 Shell,创建编辑器和设计器实例。

**示例:**
```typescript
await shell.init();
```

#### start

```typescript
async start(): Promise<void>
```

启动 Shell,开始渲染和交互。

**示例:**
```typescript
await shell.start();
```

#### stop

```typescript
async stop(): Promise<void>
```

停止 Shell,停止渲染和交互。

**示例:**
```typescript
await shell.stop();
```

#### dispose

```typescript
async dispose(): Promise<void>
```

销毁 Shell,释放所有资源。

**示例:**
```typescript
await shell.dispose();
```

### 状态管理方法

#### export

```typescript
export(): any
```

导出当前编辑器状态。

**返回值:** 当前编辑器状态对象

**示例:**
```typescript
const state = shell.export();
console.log('Current state:', state);
```

#### import

```typescript
async import(state: any): Promise<void>
```

导入编辑器状态。

**参数:**
- `state`: 要导入的状态对象

**示例:**
```typescript
await shell.import(savedState);
```

### 访问器方法

#### getDocumentModel

```typescript
getDocumentModel(): IDocumentModel | null
```

获取当前文档模型。

**返回值:** 文档模型实例,如果不存在则返回 null

**示例:**
```typescript
const documentModel = shell.getDocumentModel();
if (documentModel) {
  console.log('Document model:', documentModel);
}
```

#### getSelection

```typescript
getSelection(): any
```

获取当前选区。

**返回值:** 选区实例,如果不存在则返回 null

**示例:**
```typescript
const selection = shell.getSelection();
if (selection) {
  console.log('Selected nodes:', selection.getNodes());
}
```

#### getHistory

```typescript
getHistory(): any
```

获取历史记录。

**返回值:** 历史记录实例,如果不存在则返回 null

**示例:**
```typescript
const history = shell.getHistory();
if (history) {
  console.log('History state:', history.getState());
}
```

#### getProject

```typescript
getProject(): any
```

获取项目。

**返回值:** 项目实例,如果不存在则返回 null

**示例:**
```typescript
const project = shell.getProject();
if (project) {
  console.log('Project:', project);
}
```

#### getEditor

```typescript
getEditor(): IEditor | null
```

获取编辑器。

**返回值:** 编辑器实例,如果不存在则返回 null

**示例:**
```typescript
const editor = shell.getEditor();
if (editor) {
  console.log('Editor:', editor);
}
```

#### getDesigner

```typescript
getDesigner(): IDesigner | null
```

获取设计器。

**返回值:** 设计器实例,如果不存在则返回 null

**示例:**
```typescript
const designer = shell.getDesigner();
if (designer) {
  console.log('Designer:', designer);
}
```

#### getEngine

```typescript
getEngine(): any
```

获取引擎。

**返回值:** 引擎实例,如果不存在则返回 null

**示例:**
```typescript
const engine = shell.getEngine();
if (engine) {
  console.log('Engine:', engine);
}
```

#### getPluginManager

```typescript
getPluginManager(): any
```

获取插件管理器。

**返回值:** 插件管理器实例,如果不存在则返回 null

**示例:**
```typescript
const pluginManager = shell.getPluginManager();
if (pluginManager) {
  console.log('Plugin manager:', pluginManager);
}
```

#### getEventBus

```typescript
getEventBus(): any
```

获取事件总线。

**返回值:** 事件总线实例,如果不存在则返回 null

**示例:**
```typescript
const eventBus = shell.getEventBus();
if (eventBus) {
  eventBus.on('some-event', (data) => {
    console.log('Event received:', data);
  });
}
```

#### getCommand

```typescript
getCommand(): any
```

获取命令。

**返回值:** 命令实例,如果不存在则 return null

**示例:**
```typescript
const command = shell.getCommand();
if (command) {
  command.execute('some-command', { data: 'value' });
}
```

#### getConfig

```typescript
getConfig(): any
```

获取配置。

**返回值:** 配置对象,如果不存在则返回 null

**示例:**
```typescript
const config = shell.getConfig();
if (config) {
  console.log('Config:', config);
}
```

#### getHotkey

```typescript
getHotkey(): any
```

获取快捷键。

**返回值:** 快捷键实例,如果不存在则返回 null

**示例:**
```typescript
const hotkey = shell.getHotkey();
if (hotkey) {
  hotkey.bind('ctrl+s', () => {
    console.log('Save shortcut triggered');
  });
}
```

#### getIntl

```typescript
getIntl(): any
```

获取国际化。

**返回值:** 国际化实例,如果不存在则返回 null

**示例:**
```typescript
const intl = shell.getIntl();
if (intl) {
  const message = intl.getMessage('some.key');
  console.log('Message:', message);
}
```

#### getContainer

```typescript
getContainer(): any
```

获取容器。

**返回值:** 容器实例,如果不存在则返回 null

**示例:**
```typescript
const container = shell.getContainer();
if (container) {
  console.log('Container:', container);
}
```

## ShellModel API

ShellModel 是 Shell 的模型类,提供对低代码引擎核心模型的访问。

### 构造函数

```typescript
constructor(editor?: IEditor, designer?: IDesigner)
```

创建 ShellModel 实例。

**参数:**
- `editor`: 编辑器实例(可选)
- `designer`: 设计器实例(可选)

**示例:**
```typescript
const shellModel = new ShellModel(editor, designer);
```

### 设置方法

#### setEditor

```typescript
setEditor(editor: IEditor): void
```

设置编辑器实例。

**参数:**
- `editor`: 编辑器实例

**示例:**
```typescript
shellModel.setEditor(editor);
```

#### setDesigner

```typescript
setDesigner(designer: IDesigner): void
```

设置设计器实例。

**参数:**
- `designer`: 设计器实例

**示例:**
```typescript
shellModel.setDesigner(designer);
```

### 访问器方法

ShellModel 提供了与 Shell 相同的访问器方法:
- `getDocumentModel()`
- `getSelection()`
- `getHistory()`
- `getProject()`
- `getEditor()`
- `getDesigner()`
- `getEngine()`
- `getPluginManager()`
- `getEventBus()`
- `getCommand()`
- `getConfig()`
- `getHotkey()`
- `getIntl()`
- `getContainer()`

## 事件

Shell 在生命周期关键节点会触发以下事件:

### shell:init

Shell 初始化完成时触发。

```typescript
shell.getEventBus().on('shell:init', () => {
  console.log('Shell initialized');
});
```

### shell:start

Shell 启动完成时触发。

```typescript
shell.getEventBus().on('shell:start', () => {
  console.log('Shell started');
});
```

### shell:stop

Shell 停止完成时触发。

```typescript
shell.getEventBus().on('shell:stop', () => {
  console.log('Shell stopped');
});
```

### shell:dispose

Shell 销毁完成时触发。

```typescript
shell.getEventBus().on('shell:dispose', () => {
  console.log('Shell disposed');
});
```

## 完整示例

```typescript
import { Shell } from '@vue3-lowcode/shell';

// 创建 Shell 实例
const shell = new Shell({
  container: document.getElementById('app'),
  locale: 'zh-CN',
});

// 监听事件
shell.getEventBus().on('shell:init', () => {
  console.log('Shell initialized');
});

shell.getEventBus().on('shell:start', () => {
  console.log('Shell started');
});

// 初始化并启动 Shell
try {
  await shell.init();
  await shell.start();
  
  // 获取文档模型
  const documentModel = shell.getDocumentModel();
  if (documentModel) {
    console.log('Document model loaded');
  }
  
  // 导出状态
  const state = shell.export();
  console.log('Current state:', state);
  
} catch (error) {
  console.error('Failed to start shell:', error);
}

// 停止并销毁 Shell
try {
  await shell.stop();
  await shell.dispose();
} catch (error) {
  console.error('Failed to stop shell:', error);
}
```

## 类型定义

```typescript
import type { IShell } from '@vue3-lowcode/types';
import type { IShellModel } from '@vue3-lowcode/types';
import type { IShellConfig } from '@vue3-lowcode/types';
```

## 相关包

- [@vue3-lowcode/types](../types/README.md) - 类型定义
- [@vue3-lowcode/editor-core](../editor-core/README.md) - 编辑器核心
- [@vue3-lowcode/designer](../designer/README.md) - 设计器

## 许可证

MIT
