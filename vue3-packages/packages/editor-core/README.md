# @vue3-lowcode/editor-core

Vue3 低代码引擎编辑器核心包，提供编辑器的核心功能模块。

## 功能特性

- **EventBus**: 事件总线，用于模块间通信
- **Command**: 命令系统，用于管理编辑器命令
- **Config**: 配置管理，用于管理编辑器配置
- **Hotkey**: 快捷键系统，用于管理编辑器快捷键
- **DIContainer**: 依赖注入容器，用于管理编辑器依赖注入
- **Intl**: 国际化，用于管理编辑器国际化
- **SetterRegistry**: Setter 注册表，用于管理编辑器 Setter
- **Editor**: 编辑器核心类，集成所有编辑器模块

## 安装

```bash
pnpm add @vue3-lowcode/editor-core
```

## 使用

### 创建编辑器实例

```typescript
import { Editor } from '@vue3-lowcode/editor-core';

const editor = new Editor({
  debug: true,
  locale: 'zh-CN',
  messages: {
    common: {
      save: '保存',
      cancel: '取消',
    },
  },
  config: {
    theme: 'light',
  },
});

// 初始化编辑器
editor.init();

// 启动编辑器
editor.start();

// 停止编辑器
editor.stop();

// 销毁编辑器
editor.dispose();
```

### 使用 EventBus

```typescript
import { EventBus } from '@vue3-lowcode/editor-core';

const eventBus = new EventBus();

// 监听事件
const unsubscribe = eventBus.on('custom:event', (data) => {
  console.log('Event received:', data);
});

// 触发事件
eventBus.emit('custom:event', { message: 'Hello' });

// 取消监听
unsubscribe();
```

### 使用 Command

```typescript
import { Command } from '@vue3-lowcode/editor-core';

const command = new Command();

// 注册命令
command.register('save', () => {
  console.log('Saving...');
});

// 执行命令
command.execute('save');
```

### 使用 Config

```typescript
import { Config } from '@vue3-lowcode/editor-core';

const config = new Config();

// 设置配置
config.set('theme', 'dark');

// 获取配置
const theme = config.get('theme');
```

### 使用 Hotkey

```typescript
import { Hotkey } from '@vue3-lowcode/editor-core';

const hotkey = new Hotkey();

// 注册快捷键
hotkey.register('ctrl+s', (event) => {
  event.preventDefault();
  console.log('Save shortcut triggered');
});

// 触发快捷键
hotkey.trigger('ctrl+s', new KeyboardEvent('keydown'));
```

### 使用 DIContainer

```typescript
import { DIContainer } from '@vue3-lowcode/editor-core';

const container = new DIContainer();

// 注册依赖
container.register('service', new MyService());

// 解析依赖
const service = container.resolve<MyService>('service');
```

### 使用 Intl

```typescript
import { Intl } from '@vue3-lowcode/editor-core';

const intl = new Intl();

// 初始化国际化
intl.init('zh-CN', {
  common: {
    save: '保存',
  },
});

// 获取消息
const message = intl.get('common.save');
```

### 使用 SetterRegistry

```typescript
import { SetterRegistry } from '@vue3-lowcode/editor-core';

const registry = new SetterRegistry();

// 注册 Setter
registry.register({
  name: 'string-setter',
  component: StringSetter,
  title: '字符串 Setter',
  description: '用于编辑字符串类型的属性',
});

// 获取 Setter
const setter = registry.get('string-setter');
```

## API 文档

### Editor

#### 构造函数

```typescript
constructor(options?: EditorOptions)
```

#### 方法

- `init(): void` - 初始化编辑器
- `start(): void` - 启动编辑器
- `stop(): void` - 停止编辑器
- `dispose(): void` - 销毁编辑器
- `getState(): EditorState` - 获取编辑器状态
- `getEventBus(): EventBus` - 获取事件总线
- `getCommand(): Command` - 获取命令系统
- `getConfig(): Config` - 获取配置管理
- `getHotkey(): Hotkey` - 获取快捷键系统
- `getDI(): DIContainer` - 获取依赖注入容器
- `getIntl(): Intl` - 获取国际化
- `getSetters(): SetterRegistry` - 获取 Setter 注册表
- `resolve<T>(token: string): T` - 解析依赖

### EventBus

#### 构造函数

```typescript
constructor(options?: EventBusOptions)
```

#### 方法

- `emit<T>(eventName: string, ...args: T[]): void` - 触发事件
- `on<T>(eventName: string, handler: EventHandler<T>): () => void` - 监听事件
- `off<T>(eventName: string, handler: EventHandler<T>): void` - 取消监听
- `once<T>(eventName: string, handler: EventHandler<T>): () => void` - 监听一次事件
- `clear(): void` - 清除所有事件监听
- `listenerCount(eventName: string): number` - 获取事件监听器数量
- `eventNames(): string[]` - 获取所有事件名称

### Command

#### 构造函数

```typescript
constructor(options?: CommandOptions)
```

#### 方法

- `execute<T>(name: string, ...args: T[]): any` - 执行命令
- `register<T>(name: string, handler: CommandHandler<T>): void` - 注册命令
- `unregister(name: string): void` - 注销命令
- `has(name: string): boolean` - 检查命令是否存在
- `clear(): void` - 清除所有命令
- `commandNames(): string[]` - 获取所有命令名称

### Config

#### 构造函数

```typescript
constructor(options?: ConfigOptions)
```

#### 方法

- `get<T>(key: string, defaultValue?: T): T` - 获取配置值
- `set<T>(key: string, value: T): void` - 设置配置值
- `has(key: string): boolean` - 检查配置是否存在
- `delete(key: string): void` - 删除配置
- `merge(config: Record<string, any>): void` - 合并配置
- `getAll(): Record<string, any>` - 获取所有配置
- `clear(): void` - 清除所有配置

### Hotkey

#### 构造函数

```typescript
constructor(options?: HotkeyOptions)
```

#### 方法

- `register(key: string, handler: HotkeyHandler): void` - 注册快捷键
- `unregister(key: string, handler: HotkeyHandler): void` - 注销快捷键
- `trigger(key: string, event: KeyboardEvent): void` - 触发快捷键
- `clear(): void` - 清除所有快捷键
- `keyNames(): string[]` - 获取所有快捷键组合

### DIContainer

#### 构造函数

```typescript
constructor(options?: DIOptions)
```

#### 方法

- `register<T>(token: string, instance: Instance<T>): void` - 注册依赖
- `resolve<T>(token: string): T` - 解析依赖
- `has(token: string): boolean` - 检查依赖是否存在
- `unregister(token: string): void` - 注销依赖
- `clear(): void` - 清除所有依赖
- `tokenNames(): string[]` - 获取所有依赖标识

### Intl

#### 构造函数

```typescript
constructor(options?: IntlOptions)
```

#### 方法

- `init(locale: string, messages: IntlMessages): void` - 初始化国际化
- `get(key: string, params?: Record<string, any>): string` - 获取消息
- `setLocale(locale: string): void` - 设置语言
- `add(locale: string, messages: IntlMessages): void` - 添加消息
- `remove(locale: string): void` - 移除消息
- `has(locale: string): boolean` - 检查语言是否存在
- `getLocale(): string` - 获取当前语言
- `getLocales(): string[]` - 获取所有语言
- `clear(): void` - 清除所有消息

### SetterRegistry

#### 构造函数

```typescript
constructor(options?: SetterRegistryOptions)
```

#### 方法

- `register(config: SetterConfig): void` - 注册 Setter
- `unregister(name: string): void` - 注销 Setter
- `get(name: string): SetterConfig | undefined` - 获取 Setter
- `has(name: string): boolean` - 检查 Setter 是否存在
- `getAll(): SetterConfig[]` - 获取所有 Setter
- `names(): string[]` - 获取所有 Setter 名称
- `clear(): void` - 清除所有 Setter

## 开发

### 构建

```bash
pnpm build
```

### 测试

```bash
pnpm test
```

### 类型检查

```bash
pnpm type-check
```

## 许可证

MIT
