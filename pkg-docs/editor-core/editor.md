# Editor 模块文档

## 文件路径

`packages/editor-core/src/editor.ts`

## 功能概述

`Editor` 类是低代码编辑器的核心类，继承自 `EventEmitter`，实现了 `IEditor` 接口。它提供了编辑器的完整生命周期管理、配置管理、依赖注入、事件系统等核心功能。

## 主要功能

### 1. 编辑器生命周期管理

- 初始化编辑器（`init`）
- 销毁编辑器（`destroy`）
- 生命周期钩子管理
- 插件初始化

### 2. 配置和依赖管理

- 管理编辑器配置
- 管理插件组件集合
- 管理引擎配置
- IOC 容器管理

### 3. 资源管理

- 组件描述管理
- 远程组件加载
- 资源缓存
- 资产包转换

### 4. 等待机制

- 支持异步等待值设置
- 支持一次性等待
- 支持多次回调

### 5. 事件系统

- 继承自 `EventEmitter`
- 提供完整的事件发布订阅功能
- 最大监听器数量控制

## 类定义

```typescript
export declare interface Editor extends StrictEventEmitter<EventEmitter, GlobalEvent.EventConfig> {
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;
  once(event: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
  off(event: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  listeners(event: string | symbol): Function[];
  rawListeners(event: string | symbol): Function[];
  listenerCount(type: string | symbol): number;
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
  eventNames(): Array<string | symbol>;
}

export interface IEditor extends IPublicModelEditor {
  config?: EditorConfig;
  components?: PluginClassSet;
  eventBus: IEventBus;
  init(config?: EditorConfig, components?: PluginClassSet): Promise<any>;
}

export class Editor extends EventEmitter implements IEditor {
  constructor(readonly viewName: string = 'global', readonly workspaceMode: boolean = false)
}
```

## 属性

### `@obx.shallow private context = new Map<IPublicTypeEditorValueKey, any>()`

IOC 容器，用于存储编辑器的各种依赖和配置。

### `config?: EditorConfig`

编辑器配置对象。

### `components?: PluginClassSet`

插件组件集合。

### `eventBus: EventBus`

事件总线实例。

### `private hooks: HookConfig[] = []`

生命周期钩子数组。

### `private waits = new Map<IPublicTypeEditorValueKey, Array<{ once?: boolean; resolve: (data: any) => void }>>()`

等待器映射表，用于异步等待值设置。

### `get locale()`

获取当前语言设置。

```typescript
get locale() {
  return globalLocale.getLocale();
}
```

## 方法

### `get<T = undefined, KeyOrType = any>(keyOrType: KeyOrType): IPublicTypeEditorGetResult<T, KeyOrType> | undefined`

从上下文中获取值。

**参数:**
- `keyOrType`: 键或类型

**返回值:** 获取的值，如果不存在则返回 `undefined`

### `has(key: IPublicTypeEditorValueKey): boolean`

检查上下文中是否存在指定的键。

**参数:**
- `key`: 要检查的键

**返回值:** 如果存在则返回 `true`，否则返回 `false`

### `set(key: IPublicTypeEditorValueKey, data: any): void | Promise<void>`

设置上下文中的值。

**参数:**
- `key`: 键
- `data`: 要设置的值

**行为:**
- 如果键是 `'assets'`，调用 `setAssets` 方法
- 如果键不在黑名单中，存储到 `engineConfig`
- 存储到上下文
- 通知等待器

### `async setAssets(assets: IPublicTypeAssetsJson): Promise<void>`

设置资源。

**参数:**
- `assets`: 资源对象

**行为:**
1. 处理组件描述
2. 加载远程组件
3. 转换资源
4. 存储到上下文
5. 通知等待器

### `onceGot<T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(keyOrType: KeyOrType): Promise<IPublicTypeEditorGetResult<T, KeyOrType>>`

一次性获取值，如果值已存在则直接返回，否则等待值被设置。

**参数:**
- `keyOrType`: 键或类型

**返回值:** Promise，解析为获取的值

### `onGot<T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(keyOrType: KeyOrType, fn: (data: IPublicTypeEditorGetResult<T, KeyOrType>) => void): () => void`

监听值设置，当值被设置时调用回调。

**参数:**
- `keyOrType`: 键或类型
- `fn`: 回调函数

**返回值:** 取消监听的函数

**行为:**
- 如果值已存在，立即调用回调
- 否则，添加到等待器
- 返回取消监听的函数

### `onChange<T = undefined, KeyOrType extends IPublicTypeEditorValueKey = any>(keyOrType: KeyOrType, fn: (data: IPublicTypeEditorGetResult<T, KeyOrType>) => void): () => void`

监听值变化，每次值被设置时都会调用回调。

**参数:**
- `keyOrType`: 键或类型
- `fn`: 回调函数

**返回值:** 取消监听的函数

### `register(data: any, key?: IPublicTypeEditorValueKey): void`

注册数据到上下文。

**参数:**
- `data`: 要注册的数据
- `key`: 可选的键，如果未提供则使用数据本身作为键

**行为:**
- 设置上下文
- 通知等待器

### `async init(config?: EditorConfig, components?: PluginClassSet): Promise<any>`

初始化编辑器。

**参数:**
- `config`: 编辑器配置
- `components`: 插件组件集合

**行为:**
1. 设置配置和组件
2. 触发 `'editor.beforeInit'` 事件
3. 执行初始化钩子
4. 注册快捷键
5. 注册生命周期钩子
6. 触发 `'editor.afterInit'` 事件

### `destroy(): void`

销毁编辑器。

**行为:**
1. 检查配置是否存在
2. 取消注册所有钩子
3. 执行销毁钩子
4. 捕获错误并警告

### `initHooks = (hooks: HookConfig[]) => HookConfig[]`

初始化生命周期钩子。

**参数:**
- `hooks`: 钩子配置数组

**返回值:** 处理后的钩子数组

### `registerHooks = (hooks: HookConfig[]) => void`

注册生命周期钩子。

**参数:**
- `hooks`: 钩子配置数组

**行为:**
- 遍历钩子，根据类型注册到事件系统
- 支持的类型：`'on'`、`'once'`

### `unregisterHooks = () => void`

取消注册所有生命周期钩子。

### `private notifyGot(key: IPublicTypeEditorValueKey): void`

通知等待器值已设置。

**参数:**
- `key`: 键

**行为:**
- 获取等待器
- 依次解析等待器
- 移除一次性等待器
- 更新等待器

### `private setWait(key: IPublicTypeEditorValueKey, resolve: (data: any) => void, once?: boolean): void`

添加等待器。

**参数:**
- `key`: 键
- `resolve`: 解析函数
- `once`: 是否为一次性

### `private delWait(key: IPublicTypeEditorValueKey, fn: any): void`

删除等待器。

**参数:**
- `key`: 键
- `fn`: 要删除的解析函数

## 内部常量

### `keyBlacklist`

不应存储在配置中的键列表：

```typescript
const keyBlacklist = [
  'designer',
  'skeleton',
  'currentDocument',
  'simulator',
  'plugins',
  'setters',
  'material',
  'innerHotkey',
  'innerPlugins',
];
```

### `AssetsCache`

资源缓存，用于缓存已加载的远程组件：

```typescript
const AssetsCache: {
  [key: string]: IPublicTypeRemoteComponentDescription;
} = {};
```

## 使用示例

### 创建编辑器实例

```typescript
import { Editor } from '@alilc/lowcode-editor-core';

const editor = new Editor();
```

### 初始化编辑器

```typescript
await editor.init({
  designMode: 'design',
  locale: 'zh-CN',
}, {
  myPlugin: MyPluginComponent,
});
```

### 使用上下文

```typescript
// 设置值
editor.set('myKey', 'myValue');

// 获取值
const value = editor.get('myKey');

// 检查是否存在
if (editor.has('myKey')) {
  console.log('Key exists');
}

// 监听值变化
const unsubscribe = editor.onChange('myKey', (value) => {
  console.log('Value changed:', value);
});

// 取消监听
unsubscribe();
```

### 使用事件系统

```typescript
// 监听事件
editor.on('designer.selection.change', (nodes) => {
  console.log('Selection changed:', nodes);
});

// 触发事件
editor.emit('my-custom-event', data);

// 移除事件监听
editor.off('designer.selection.change', listener);
```

### 使用等待机制

```typescript
// 一次性等待
const value = await editor.onceGot('myKey');
console.log('Got value:', value);

// 监听值设置
const unsubscribe = editor.onGot('myKey', (value) => {
  console.log('Value set:', value);
});

// 设置值，会触发监听器
editor.set('myKey', 'newValue');
```

## 资源管理

Editor 提供了完整的资源管理功能：

### 组件描述处理

```typescript
const assets = {
  components: [
    {
      componentName: 'MyComponent',
      title: '我的组件',
      // ...其他属性
    },
  ],
};

await editor.setAssets(assets);
```

### 远程组件加载

```typescript
const remoteComponent = {
  componentName: 'RemoteComponent',
  exportName: 'remoteComp',
  url: 'https://example.com/component.js',
  npm: {
    package: '@example/package',
    version: '1.0.0',
  },
};

const assets = {
  components: [remoteComponent],
};

await editor.setAssets(assets);
```

## 注意事项

1. **黑名单键**: 某些键不会存储到 `engineConfig`，而是只存储在上下文中
2. **资源缓存**: 远程组件会被缓存，避免重复加载
3. **等待机制**: `onceGot` 只会等待一次，`onGot` 会持续监听
4. **生命周期**: 钩子会在初始化时注册，销毁时取消注册
5. **事件系统**: 继承自 `EventEmitter`，支持所有 EventEmitter 方法
6. **最大监听器**: 默认设置为 200，可根据需要调整

## 相关文件

- [`event-bus.ts`](./event-bus.md) - 事件总线
- [`config.ts`](./config.md) - 配置管理
- [`hotkey.ts`](./hotkey.md) - 快捷键系统
- [`di/index.ts`](./di/index.md) - 依赖注入
- [`intl/index.ts`](./intl/index.md) - 国际化
- [`utils/index.ts`](./utils/index.md) - 工具函数

## 外部依赖

- `@alilc/lowcode-types` - 提供类型定义
- `@alilc/lowcode-utils` - 提供工具函数
- `events` - Node.js 事件模块
- `mobx` - 响应式状态管理
- `mobx-react` - MobX React 集成
