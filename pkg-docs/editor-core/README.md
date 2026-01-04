# Editor Core 模块文档

## 概述

`@alilc/lowcode-editor-core` 是低代码编辑器的核心模块，提供了编辑器的基础架构和核心功能。它是整个低代码引擎的基础，负责编辑器的初始化、配置管理、事件系统、命令系统、国际化等功能。

## 核心功能

### 1. 编辑器核心 (Editor Core)

- 编辑器实例管理
- 生命周期管理
- 配置初始化
- 资源管理

### 2. 事件系统 (Event Bus)

- 事件发布订阅
- 模块级事件总线
- 事件监听器管理

### 3. 命令系统 (Command)

- 命令注册
- 命令执行
- 批量命令执行

### 4. 配置管理 (Config)

- 引擎配置管理
- 严格模式控制
- 配置项验证

### 5. 依赖注入 (Dependency Injection)

- IOC 容器
- 全局上下文
- Setter 管理

### 6. 国际化 (Internationalization)

- 多语言支持
- 国际化消息格式化
- React 组件国际化

### 7. 快捷键系统 (Hotkey)

- 快捷键绑定
- 快捷键触发
- 序列快捷键支持

### 8. UI 组件 (Widgets)

- 标题组件
- 提示组件
- 提示容器

### 9. 工具函数 (Utils)

- 响应式工具 (MobX)
- 日志工具
- 偏好设置
- 焦点追踪

## 目录结构

```
packages/editor-core/
├── src/
│   ├── index.ts              # 模块入口
│   ├── editor.ts            # Editor 核心类
│   ├── event-bus.ts         # 事件总线
│   ├── command.ts            # 命令系统
│   ├── config.ts             # 配置管理
│   ├── hotkey.ts            # 快捷键系统
│   ├── di/                  # 依赖注入
│   │   ├── index.ts        # DI 入口
│   │   ├── ioc-context.ts  # IOC 上下文
│   │   └── setter.ts      # Setter 管理
│   ├── intl/                # 国际化
│   │   ├── index.ts        # 国际化入口
│   │   └── global-locale.ts # 全局语言设置
│   ├── utils/               # 工具函数
│   │   ├── index.ts        # 工具入口
│   │   ├── logger.ts       # 日志工具
│   │   ├── obx.ts          # MobX 响应式
│   │   └── preference.ts  # 偏好设置
│   └── widgets/             # UI 组件
│       ├── index.ts        # 组件入口
│       ├── tip/            # 提示组件
│       └── title/          # 标题组件
├── test/                   # 测试文件
└── package.json
```

## 主要模块

### 1. 核心模块 (Core)

- [`editor.ts`](./editor.md) - Editor 核心类，编辑器的主入口
- [`event-bus.ts`](./event-bus.md) - 事件总线，提供事件发布订阅功能
- [`command.ts`](./command.md) - 命令系统，管理编辑器命令
- [`config.ts`](./config.md) - 配置管理，管理引擎配置和偏好设置

### 2. 依赖注入模块 (Dependency Injection)

- [`di/index.ts`](./di/index.md) - 依赖注入入口
- [`di/ioc-context.ts`](./di/ioc-context.md) - IOC 上下文，全局依赖容器
- [`di/setter.ts`](./di/setter.md) - Setter 管理，管理属性设置器

### 3. 国际化模块 (Internationalization)

- [`intl/index.ts`](./intl/index.md) - 国际化入口，提供国际化功能
- [`intl/global-locale.ts`](./intl/global-locale.md) - 全局语言设置，管理当前语言

### 4. 工具函数模块 (Utils)

- [`utils/index.ts`](./utils/index.md) - 工具函数入口
- [`utils/logger.ts`](./utils/logger.md) - 日志工具，提供日志功能
- [`utils/obx.ts`](./utils/obx.md) - MobX 响应式工具
- [`utils/preference.ts`](./utils/preference.md) - 偏好设置，管理用户偏好

### 5. UI 组件模块 (Widgets)

- [`widgets/index.ts`](./widgets/index.md) - 组件入口
- [`widgets/tip/index.ts`](./widgets/tip/index.md) - 提示组件入口
- [`widgets/title/index.tsx`](./widgets/title/index.md) - 标题组件，支持国际化

## API 文档

### Editor 类

```typescript
export interface IEditor extends IPublicModelEditor {
  config?: EditorConfig;
  components?: PluginClassSet;
  eventBus: IEventBus;
  init(config?: EditorConfig, components?: PluginClassSet): Promise<any>;
}

export class Editor extends EventEmitter implements IEditor {
  constructor(readonly viewName: string = 'global', readonly workspaceMode: boolean = false)
  
  get<T = undefined, KeyOrType = any>(keyOrType: KeyOrType): IPublicTypeEditorGetResult<T, KeyOrType> | undefined
  has(key: IPublicTypeEditorValueKey): boolean
  set(key: IPublicTypeEditorValueKey, data: any): void | Promise<void>
  onceGot<T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(keyOrType: KeyOrType): Promise<IPublicTypeEditorGetResult<T, KeyOrType>>
  onGot<T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(keyOrType: KeyOrType, fn: (data: IPublicTypeEditorGetResult<T, KeyOrType>) => void): () => void
  onChange<T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(keyOrType: KeyOrType, fn: (data: IPublicTypeEditorGetResult<T, KeyOrType>) => void): () => void
  register(data: any, key?: IPublicTypeEditorValueKey): void
  async init(config?: EditorConfig, components?: PluginClassSet): Promise<any>
  destroy(): void
}
```

### EventBus 类

```typescript
export interface IEventBus extends IPublicApiEvent {
  removeListener(event: string | symbol, listener: (...args: any[]) => void): any;
  addListener(event: string | symbol, listener: (...args: any[]) => void): any;
  setMaxListeners(n: number): any;
  removeAllListeners(event?: string | symbol): any;
}

export class EventBus implements IEventBus {
  constructor(emitter: EventEmitter, name?: string)
  on(event: string, listener: (...args: any[]) => void): () => void
  prependListener(event: string, listener: (...args: any[]) => void): () => void
  off(event: string, listener: (...args: any[]) => void
  emit(event: string, ...args: any[]): void
  removeListener(event: string | symbol, listener: (...args: any[]) => void
  addListener(event: string | symbol, listener: (...args: any[]) => void: any
  setMaxListeners(n: number): any
  removeAllListeners(event?: string | symbol): any
}
```

### Command 类

```typescript
export interface ICommand extends Omit<IPublicApiCommand, 'registerCommand' | 'batchExecuteCommand'> {
  registerCommand(command: IPublicTypeCommand, options?: { commandScope?: string }): void
  batchExecuteCommand(commands: { name: string; args: IPublicTypeCommandHandlerArgs }[], pluginContext?: IPublicModelPluginContext): void
}

export class Command implements ICommand {
  registerCommand(command: IPublicTypeCommand, options?: ICommandOptions): void
  unregisterCommand(name: string): void
  executeCommand(name: string, args: IPublicTypeCommandHandlerArgs): void
  batchExecuteCommand(commands: { name: string; args: IPublicTypeCommandHandlerArgs }[], pluginContext?: IPublicModelPluginContext): void
  listCommands(): IPublicTypeListCommand[]
  onCommandError(callback: (name: string, error: Error) => void): void
}
```

### EngineConfig 类

```typescript
export interface IEngineConfig extends IPublicModelEngineConfig {
  setEngineOptions(engineOptions: IPublicTypeEngineOptions): void
  notifyGot(key: string): void
  setWait(key: string, resolve: (data: any) => void, once?: boolean): void
  delWait(key: string, fn: any): void
}

export class EngineConfig implements IEngineConfig {
  constructor(config?: { [key: string]: any })
  has(key: string): boolean
  get(key: string, defaultValue?: any): any
  set(key: string, value: any): void
  setConfig(config: { [key: string]: any }): void
  setEngineOptions(engineOptions: IPublicTypeEngineOptions): void
  onceGot(key: string): Promise<any>
  onGot(key: string, fn: (data: any) => void): () => void
  getPreference(): IPublicModelPreference
}
```

### Hotkey 类

```typescript
export interface IHotKey extends Omit<IPublicApiHotkey, 'bind' | 'callbacks'> {
  activate(activate: boolean): void
}

export class Hotkey implements IHotKey {
  constructor(readonly viewName: string = 'global')
  activate(activate: boolean): void
  bind(combos: string[] | string, callback: IPublicTypeHotkeyCallback, action?: string): Hotkey
  unbind(combos: string[] | string, callback: IPublicTypeHotkeyCallback, action?: string): void
}
```

### Setters 类

```typescript
export interface ISetters extends IPublicApiSetters {
}

export class Setters implements ISetters {
  constructor(readonly viewName: string = 'global')
  getSetter(type: string): IPublicTypeRegisteredSetter | null
  registerSetter(typeOrMaps: string | { [key: string]: IPublicTypeCustomView | IPublicTypeRegisteredSetter }, setter?: IPublicTypeCustomView | IPublicTypeRegisteredSetter): void
  getSettersMap(): Map<string, IPublicTypeRegisteredSetter & { type: string }>
  createSetterContent(setter: any, props: Record<string, any>): ReactNode
}
```

## 使用示例

### 创建编辑器实例

```typescript
import { Editor } from '@alilc/lowcode-editor-core';

const editor = new Editor();

// 初始化编辑器
await editor.init({
  designMode: 'design',
  locale: 'zh-CN',
}, {
  myPlugin: MyPluginComponent,
});
```

### 使用事件系统

```typescript
// 监听事件
editor.eventBus.on('designer.selection.change', (nodes) => {
  console.log('Selection changed:', nodes);
});

// 触发事件
editor.eventBus.emit('my-custom-event', data);
```

### 使用命令系统

```typescript
// 注册命令
editor.registerCommand({
  name: 'myCommand',
  description: '我的命令',
  handler: (args) => {
    console.log('Command executed:', args);
  },
}, { commandScope: 'myScope' });

// 执行命令
editor.executeCommand('myCommand:myScope', { param1: 'value1' });
```

### 使用配置管理

```typescript
// 获取配置
const designMode = editor.get('designMode');
console.log('Design mode:', designMode);

// 设置配置
editor.set('customKey', 'customValue');

// 监听配置变化
editor.onGot('designMode', (value) => {
  console.log('Design mode changed:', value);
});
```

### 使用快捷键

```typescript
// 绑定快捷键
editor.hotkey.bind('command+s', (e, combo) => {
  console.log('Save shortcut triggered');
}, 'keypress');

// 激活/禁用快捷键
editor.hotkey.activate(true);
editor.hotkey.activate(false);
```

### 使用国际化

```typescript
import { intl, intlNode } from '@alilc/lowcode-editor-core';

// 获取国际化文本
const text = intl('my.key', { param1: 'value1' });

// 使用国际化组件
<IntlElement id="my.key" params={{ param1: 'value1' }} />
```

## 事件类型

### 全局事件

```typescript
// 编辑器事件
'editor.beforeInit'  // 编辑器初始化前
'editor.afterInit'   // 编辑器初始化后

// 设计器事件
'designer.selection.change'  // 选择变化
'designer.drag'           // 拖拽事件

// 快捷键事件
'hotkey.callback.call'  // 快捷键回调调用
```

## 配置选项

### 引擎选项 (Engine Options)

```typescript
interface IPublicTypeEngineOptions {
  enableCondition?: boolean;              // 是否开启 condition 能力
  designMode?: 'design' | 'live';       // 设计模式
  device?: 'default' | 'mobile' | string; // 设备类型
  locale?: string;                        // 语言
  renderEnv?: 'react' | string;         // 渲染器类型
  enableStrictPluginMode?: boolean;       // 严格插件模式
  disableAutoRender?: boolean;            // 禁用自动渲染
  disableDetecting?: boolean;             // 禁用拖拽检测
  enableCanvasLock?: boolean;            // 启用画布锁定
  supportVariableGlobally?: boolean;      // 全局支持变量配置
  enableWorkspaceMode?: boolean;         // 启用工作区模式
  enableContextMenu?: boolean;           // 启用右键菜单
  hideComponentAction?: boolean;          // 隐藏设计器辅助层
}
```

## 依赖关系

```json
{
  "dependencies": {
    "@alilc/lowcode-types": "1.3.2",
    "@alilc/lowcode-utils": "1.3.2",
    "events": "^3.0.0",
    "mobx": "^4.0.0",
    "mobx-react": "^6.0.0",
    "power-di": "^3.0.0",
    "react": "^16.8.1",
    "react-dom": "^16.8.1",
    "intl-messageformat": "^1.0.0"
  }
}
```

## 版本信息

- **版本**: 1.3.2
- **维护者**: Alibaba LowCode Team
- **仓库**: https://github.com/alibaba/lowcode-engine/tree/main/packages/editor-core

## 相关链接

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub Issues](https://github.com/alibaba/lowcode-engine/issues)
- [API 文档](https://lowcode-engine.cn/doc/api)
