# Editor Core 模块总览

## 目录

- [模块简介](#模块简介)
- [核心职责](#核心职责)
- [模块结构](#模块结构)
- [Editor 类详解](#editor-类详解)
- [事件系统](#事件系统)
- [配置系统](#配置系统)
- [依赖注入](#依赖注入)
- [国际化](#国际化)
- [使用场景](#使用场景)
- [相关文档](#相关文档)

## 模块简介

Editor Core 模块是编辑器的核心基础设施，提供编辑器级别的功能，包括事件总线管理、配置管理、依赖注入容器、国际化支持、快捷键管理等。

**包路径**: `packages/editor-core`

**主要导出**:
```typescript
export { Editor, IEditor };
export { EventBus, IEventBus };
export { engineConfig };
export { globalLocale };
export { obx };
export { commonEvent };
```

## 核心职责

### 1. 编辑器实例管理
- 创建编辑器实例
- 管理编辑器生命周期
- 提供编辑器级别的 API

### 2. 事件总线
- 提供模块间通信机制
- 支持事件监听和触发
- 管理事件订阅

### 3. 配置管理
- 存储和管理配置
- 提供配置访问接口
- 支持配置变更通知

### 4. 依赖注入容器
- 管理依赖关系
- 提供依赖解析
- 支持单例模式

### 5. 国际化支持
- 管理多语言资源
- 提供语言切换
- 支持动态加载语言包

### 6. 快捷键管理
- 注册快捷键
- 处理快捷键事件
- 提供快捷键查询

## 模块结构

```
packages/editor-core/
├── src/
│   ├── editor.ts                # Editor 主类
│   ├── event-bus.ts             # 事件总线
│   ├── config.ts                # 配置管理
│   ├── hotkey.ts               # 快捷键管理
│   ├── intl/                   # 国际化
│   │   ├── global-locale.ts
│   │   └── index.ts
│   ├── di/                     # 依赖注入
│   │   ├── index.ts
│   │   ├── ioc-context.ts
│   │   └── setter.ts
│   ├── utils/                  # 工具函数
│   │   ├── index.ts
│   │   ├── app-preset.ts
│   │   ├── assets-transform.ts
│   │   ├── control.ts
│   │   ├── focus-tracker.ts
│   │   ├── get-public-path.ts
│   │   ├── logger.ts
│   │   ├── obx.ts
│   │   ├── preference.ts
│   │   └── request.ts
│   └── widgets/                # 组件
│       ├── index.ts
│       └── tip/
│           ├── index.ts
│           ├── tip-container.tsx
│           ├── tip-handler.ts
│           ├── tip-item.tsx
│           ├── tip.tsx
│           ├── help-tips.tsx
│           ├── utils.ts
│           └── style.less
├── test/
│   └── command.test.ts
├── package.json
├── tsconfig.json
└── build.json
```

## Editor 类详解

### 类定义

[`Editor`](../../packages/editor-core/src/editor.ts:70) 是编辑器的主类，继承自 EventEmitter。

```typescript
export class Editor extends EventEmitter implements IEditor {
  // IoC 容器
  @obx.shallow private context = new Map<EditorValueKey, any>();

  // 配置
  config?: EditorConfig;
  components?: PluginClassSet;

  // 事件总线
  eventBus: EventBus;

  // Hooks
  private hooks: HookConfig[] = [];

  // 等待队列
  private waits = new Map<EditorValueKey, Array<{ once?: boolean; resolve: (data: any) => void }>>();

  // 构造函数
  constructor(readonly viewName: string = 'global', readonly workspaceMode: boolean = false);

  // 核心方法
  get<T = undefined, KeyOrType = any>(keyOrType: KeyOrType): EditorGetResult<T, KeyOrType> | undefined;
  has(keyOrType: EditorValueKey): boolean;
  set(key: EditorValueKey, data: any): void | Promise<void>;
  onceGot<T = undefined, KeyOrType = any>(keyOrType: KeyOrType): Promise<EditorGetResult<T, KeyOrType>>;
  onGot<T = undefined, KeyOrType = any>(keyOrType: KeyOrType, fn: (data: EditorGetResult<T, KeyOrType>) => void): () => void;
  onChange<T = undefined, KeyOrType = any>(keyOrType: KeyOrType, fn: (data: EditorGetResult<T, KeyOrType>) => void): () => void;
  register(data: any, key?: EditorValueKey): void;

  // 生命周期
  init(config?: EditorConfig, components?: PluginClassSet): Promise<any>;
  destroy(): void;

  // Hooks 管理
  registerHooks(hooks: HookConfig[]): void;
  unregisterHooks(): void;
}
```

### 核心属性

#### 1. context: Map<EditorValueKey, any>
IoC 容器，存储编辑器的所有依赖和配置。

```typescript
@obx.shallow private context = new Map<EditorValueKey, any>();
```

**说明**:
- 使用 Map 存储键值对
- 响应式容器，支持自动追踪
- 用于依赖注入

#### 2. config: EditorConfig
编辑器配置。

```typescript
config?: EditorConfig;
```

**配置结构**:
```typescript
interface EditorConfig {
  // 设计模式
  designMode?: 'live' | 'design' | 'preview' | 'extend' | 'border';

  // 设备
  device?: 'mobile' | 'iphone' | string;

  // 语言
  locale?: string;

  // Hooks
  hooks?: HookConfig[];

  // 生命周期
  lifeCycles?: {
    init?: (editor: Editor) => void | Promise<void>;
    destroy?: (editor: Editor) => void;
  };

  // 其他配置
  [key: string]: any;
}
```

#### 3. eventBus: EventBus
事件总线实例。

```typescript
eventBus: EventBus;
```

**说明**:
- 用于模块间通信
- 支持事件监听和触发
- 基于 EventEmitter

### 核心方法

#### 1. get()

获取配置或依赖。

```typescript
get<T = undefined, KeyOrType = any>(
  keyOrType: KeyOrType
): EditorGetResult<T, KeyOrType> | undefined
```

**参数**:
- `keyOrType`: 键或类型

**返回值**: 配置值或依赖实例

**实现逻辑**:
```typescript
get<T = undefined, KeyOrType = any>(
  keyOrType: KeyOrType
): EditorGetResult<T, KeyOrType> | undefined {
  return this.context.get(keyOrType as any);
}
```

**使用示例**:
```typescript
// 获取配置
const designMode = editor.get('designMode');
const device = editor.get('device');

// 获取依赖
const designer = editor.get('designer');
const project = editor.get('project');
```

#### 2. has()

检查是否存在配置或依赖。

```typescript
has(keyOrType: EditorValueKey): boolean
```

**参数**:
- `keyOrType`: 键或类型

**返回值**: 是否存在

**实现逻辑**:
```typescript
has(keyOrType: EditorValueKey): boolean {
  return this.context.has(keyOrType);
}
```

#### 3. set()

设置配置或依赖。

```typescript
set(key: EditorValueKey, data: any): void | Promise<void>
```

**参数**:
- `key`: 键
- `data`: 数据

**返回值**: Promise（如果是设置 assets）

**实现逻辑**:
```typescript
async set(key: EditorValueKey, data: any): Promise<void> {
  // 1. 特殊处理 assets
  if (key === 'assets') {
    return this.setAssets(data);
  }

  // 2. 存储到 engineConfig
  if (!keyBlacklist.includes(key as string)) {
    engineConfig.set(key as any, data);
  }

  // 3. 存储到 context
  this.context.set(key, data);

  // 4. 通知等待者
  this.notifyGot(key);
}
```

**使用示例**:
```typescript
// 设置配置
editor.set('designMode', 'design');
editor.set('device', 'mobile');

// 设置依赖
editor.set('designer', designer);
editor.set('project', project);

// 设置 assets
await editor.set('assets', {
  components: [...],
  packages: [...]
});
```

#### 4. onceGot()

等待配置或依赖就绪一次。

```typescript
onceGot<T = undefined, KeyOrType extends EditorValueKey = any>(
  keyOrType: KeyOrType
): Promise<EditorGetResult<T, KeyOrType>>
```

**参数**:
- `keyOrType`: 键或类型

**返回值**: Promise，解析为配置值或依赖实例

**实现逻辑**:
```typescript
onceGot<T = undefined, KeyOrType extends EditorValueKey = any>(
  keyOrType: KeyOrType
): Promise<EditorGetResult<T, KeyOrType>> {
  const x = this.context.get(keyOrType);
  if (x !== undefined) {
    return Promise.resolve(x);
  }
  return new Promise((resolve) => {
    this.setWait(keyOrType, resolve, true);
  });
}
```

**使用示例**:
```typescript
// 等待 designer 就绪
const designer = await editor.onceGot('designer');

// 等待 project 就绪
const project = await editor.onceGot('project');

// 等待 assets 就绪
const assets = await editor.onceGot('assets');
```

#### 5. onGot()

监听配置或依赖就绪。

```typescript
onGot<T = undefined, KeyOrType extends EditorValueKey = any>(
  keyOrType: KeyOrType,
  fn: (data: EditorGetResult<T, KeyOrType>) => void
): () => void
```

**参数**:
- `keyOrType`: 键或类型
- `fn`: 回调函数

**返回值**: 取消监听的函数

**实现逻辑**:
```typescript
onGot<T = undefined, KeyOrType extends EditorValueKey = any>(
  keyOrType: KeyOrType,
  fn: (data: EditorGetResult<T, KeyOrType>) => void
): () => void {
  const x = this.context.get(keyOrType);
  if (x !== undefined) {
    fn(x);
  }
  this.setWait(keyOrType, fn);
  return () => {
    this.delWait(keyOrType, fn);
  };
}
```

**使用示例**:
```typescript
// 监听 designer 就绪
const unsubscribe = editor.onGot('designer', (designer) => {
  console.log('Designer ready', designer);
});

// 取消监听
unsubscribe();
```

#### 6. onChange()

监听配置或依赖变更。

```typescript
onChange<T = undefined, KeyOrType extends EditorValueKey = any>(
  keyOrType: KeyOrType,
  fn: (data: EditorGetResult<T, KeyOrType>) => void
): () => void
```

**参数**:
- `keyOrType`: 键或类型
- `fn`: 回调函数

**返回值**: 取消监听的函数

**使用示例**:
```typescript
// 监听设计模式变更
const unsubscribe = editor.onChange('designMode', (designMode) => {
  console.log('Design mode changed', designMode);
});

// 取消监听
unsubscribe();
```

#### 7. register()

注册数据。

```typescript
register(data: any, key?: EditorValueKey): void
```

**参数**:
- `data`: 数据
- `key`: 可选的键

**使用示例**:
```typescript
// 注册组件
editor.register(MyComponent, 'MyComponent');

// 注册插件
editor.register(MyPlugin);
```

#### 8. init()

初始化编辑器。

```typescript
init(config?: EditorConfig, components?: PluginClassSet): Promise<any>
```

**参数**:
- `config`: 配置
- `components`: 组件集合

**返回值**: Promise

**实现逻辑**:
```typescript
async init(config?: EditorConfig, components?: PluginClassSet): Promise<any> {
  this.config = config || {};
  this.components = components || {};

  const { hooks = [], lifeCycles } = this.config;

  // 1. 触发 beforeInit 事件
  this.emit('editor.beforeInit');

  // 2. 执行初始化钩子
  const init = (lifeCycles && lifeCycles.init) || ((): void => {});

  try {
    await init(this);

    // 3. 注册 Hooks
    this.registerHooks(hooks);

    // 4. 触发 afterInit 事件
    this.emit('editor.afterInit');

    return true;
  } catch (err) {
    console.error(err);
  }
}
```

#### 9. destroy()

销毁编辑器。

```typescript
destroy(): void
```

**实现逻辑**:
```typescript
destroy(): void {
  if (!this.config) {
    return;
  }

  try {
    const { lifeCycles = {} } = this.config;

    // 1. 注销 Hooks
    this.unregisterHooks();

    // 2. 执行销毁钩子
    if (lifeCycles.destroy) {
      lifeCycles.destroy(this);
    }
  } catch (err) {
    console.warn(err);
  }
}
```

## 事件系统

### EventBus

[`EventBus`](../../packages/editor-core/src/event-bus.ts:1) 是事件总线类，提供模块间通信机制。

```typescript
export class EventBus extends EventEmitter implements IEventBus {
  constructor(emitter: EventEmitter);

  on(event: string, listener: Function): () => void;
  once(event: string, listener: Function): () => void;
  off(event: string, listener: Function): void;
  emit(event: string, ...args: any[]): void;
}
```

### 事件类型

```typescript
interface GlobalEvent {
  EventConfig: {
    'editor.beforeInit': [editor: Editor];
    'editor.afterInit': [editor: Editor];
    'document.open': [document: DocumentModel];
    'document.remove': { id: string };
    'selection.change': [selection: Selection];
    'history.change': [history: History];
    'node.add': [node: Node];
    'node.remove': [node: Node];
    // ... 更多事件
  };
}
```

### 使用示例

```typescript
// 监听事件
editor.eventBus.on('document.open', (doc) => {
  console.log('Document opened', doc);
});

// 触发事件
editor.eventBus.emit('document.open', documentModel);

// 取消监听
const unsubscribe = editor.eventBus.on('document.open', handler);
unsubscribe();

// 一次性监听
editor.eventBus.once('document.open', (doc) => {
  console.log('Document opened once', doc);
});
```

## 配置系统

### Engine Config

[`engineConfig`](../../packages/editor-core/src/config.ts:1) 是引擎配置管理器。

```typescript
export const engineConfig = {
  get<T>(key: string): T | undefined;
  set(key: string, value: any): void;
  has(key: string): boolean;
  setEngineOptions(options: EngineOptions): void;
};
```

### 常用配置

```typescript
// 获取配置
const version = engineConfig.get('ENGINE_VERSION');
const isOpenSource = engineConfig.get('isOpenSource');
const disableAutoRender = engineConfig.get('disableAutoRender');

// 设置配置
engineConfig.set('thisRequiredInJSE', false);
engineConfig.set('enableStrictNotFoundMode', true);
engineConfig.set('notFoundComponent', MyNotFoundComponent);
```

## 依赖注入

### IoC Context

依赖注入容器，管理编辑器的依赖关系。

```typescript
export const globalContext = {
  register<T>(key: string, value: T): void;
  get<T>(key: string): T | undefined;
  has(key: string): boolean;
};
```

### 使用示例

```typescript
// 注册依赖
globalContext.register('designer', designer);
globalContext.register('editor', editor);

// 获取依赖
const designer = globalContext.get('designer');
const editor = globalContext.get('editor');
```

## 国际化

### Global Locale

国际化管理器，支持多语言切换。

```typescript
export const globalLocale = {
  getLocale(): string;
  setLocale(locale: string): void;
  getMessage(key: string, ...args: any[]): string;
};
```

### 使用示例

```typescript
// 获取当前语言
const locale = globalLocale.getLocale();

// 设置语言
globalLocale.setLocale('zh-CN');

// 获取消息
const message = globalLocale.getMessage('editor.save');
```

## 使用场景

### 场景 1: 创建编辑器实例

```typescript
import { Editor } from '@alilc/lowcode-editor-core';

const editor = new Editor('global', false);

// 初始化编辑器
await editor.init({
  designMode: 'design',
  device: 'desktop',
  locale: 'zh-CN'
});
```

### 场景 2: 设置和获取配置

```typescript
// 设置配置
editor.set('designMode', 'design');
editor.set('device', 'mobile');

// 获取配置
const designMode = editor.get('designMode');
const device = editor.get('device');
```

### 场景 3: 等待依赖就绪

```typescript
// 等待 designer 就绪
const designer = await editor.onceGot('designer');

// 等待 project 就绪
const project = await editor.onceGot('project');

// 使用依赖
const currentDoc = project.currentDocument;
```

### 场景 4: 监听配置变更

```typescript
// 监听设计模式变更
const unsubscribe = editor.onChange('designMode', (designMode) => {
  console.log('Design mode changed to:', designMode);
});

// 取消监听
unsubscribe();
```

### 场景 5: 使用事件总线

```typescript
// 监听事件
editor.eventBus.on('document.open', (doc) => {
  console.log('Document opened:', doc.id);
});

// 触发事件
editor.eventBus.emit('document.open', documentModel);
```

### 场景 6: 设置 assets

```typescript
// 设置 assets
await editor.set('assets', {
  components: [
    {
      componentName: 'Button',
      title: '按钮',
      npm: {
        package: '@alilc/lowcode-materials',
        version: '1.0.0',
        exportName: 'Button'
      }
    }
  ],
  packages: [
    {
      package: '@alilc/lowcode-materials',
      version: '1.0.0',
      library: 'LowcodeMaterials',
      urls: ['https://cdn.example.com/materials.js']
    }
  ]
});
```

### 场景 7: 销毁编辑器

```typescript
// 销毁编辑器
editor.destroy();
```

## 相关文档

- [系统架构总览](../00-overview/architecture-overview.md)
- [Engine 模块](../03-engine/index.md)
- [Designer 模块](../01-designer/index.md)
- [依赖注入容器](./di-container.md)
- [配置系统](./config-system.md)
- [事件系统](./event-system.md)
