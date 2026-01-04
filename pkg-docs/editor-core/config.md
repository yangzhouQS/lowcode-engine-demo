# Config 模块文档

## 文件路径

`packages/editor-core/src/config.ts`

## 功能概述

`EngineConfig` 类是编辑器的配置管理器，负责管理引擎配置、设计器配置、偏好设置等。它提供了配置的读取、设置、监听等功能，支持严格模式验证。

## 主要功能

### 1. 配置管理

- 获取配置值（`get`）
- 设置配置值（`set`）
- 检查配置是否存在（`has`）
- 批量设置配置（`setConfig`）

### 2. 引擎选项管理

- 获取引擎选项（`getEngineOptions`）
- 设置引擎选项（`setEngineOptions`）
- 严格模式验证

### 3. 配置监听

- 等待配置值（`onceGot`）
- 监听配置变化（`onGot`）
- 配置变化通知

### 4. 偏好设置管理

- 获取偏好设置（`getPreference`）
- 支持本地存储

### 5. 设计器配置

- 获取设计器配置（`getDesignMode`）
- 设置设计器配置（`setDesignMode`）

## 类定义

```typescript
export interface IEngineConfig extends Omit<IPublicApiConfig, 'getPreference' | 'setEngineOptions'> {
  getPreference(): IPublicModelPreference;
  setEngineOptions(engineOptions: IPublicTypeEngineOptions): void;
  getEngineOptions(): IPublicTypeEngineOptions;
  getDesignMode(): IPublicTypeDesignMode;
  setDesignMode(designMode: IPublicTypeDesignMode): void;
}

export class EngineConfig implements IEngineConfig {
  private config: IPublicTypeEngineConfig;
  private engineOptions: IPublicTypeEngineOptions;
  private preference: IPublicModelPreference;
  private waits: Map<string, IPublicTypeWaitFunction[]>;
  private editor: Editor;
  
  constructor(editor: Editor)
}
```

## 属性

### `private config: IPublicTypeEngineConfig`

引擎配置对象，存储所有配置值。

### `private engineOptions: IPublicTypeEngineOptions`

引擎选项，包含引擎相关的配置。

### `private preference: IPublicModelPreference`

偏好设置对象。

### `private waits: Map<string, IPublicTypeWaitFunction[]>`

等待队列，存储等待配置值的回调函数。

### `private editor: Editor`

编辑器实例。

## 方法

### `constructor(editor: Editor)`

构造函数，创建配置管理器实例。

**参数:**
- `editor`: 编辑器实例

**行为:**
- 初始化配置对象
- 初始化等待队列
- 创建偏好设置实例

### `has(key: string): boolean`

检查配置是否存在。

**参数:**
- `key`: 配置键名

**返回值:** 配置是否存在

### `get(key: string): any`

获取配置值。

**参数:**
- `key`: 配置键名

**返回值:** 配置值

**行为:**
- 支持嵌套路径（如 `'designer.locale'`）
- 返回配置值或 undefined

### `set(key: string, value: any): void`

设置配置值。

**参数:**
- `key`: 配置键名
- `value`: 配置值

**行为:**
- 支持嵌套路径
- 更新配置值
- 触发等待队列中的回调

### `setConfig(config: IPublicTypeEngineConfig): void`

批量设置配置。

**参数:**
- `config`: 配置对象

**行为:**
- 合并配置到现有配置
- 触发等待队列中的回调

### `getEngineOptions(): IPublicTypeEngineOptions`

获取引擎选项。

**返回值:** 引擎选项对象

### `setEngineOptions(engineOptions: IPublicTypeEngineOptions): void`

设置引擎选项。

**参数:**
- `engineOptions`: 引擎选项对象

**行为:**
- 验证引擎选项
- 更新引擎选项
- 触发等待队列中的回调

**严格模式验证:**
在严格模式下，会验证以下字段：
- `designMode`: 必须是 `'design'` 或 `'live'`
- `locale`: 必须是有效的语言代码
- `device`: 必须是有效的设备类型
- `designer`: 必须是有效的设计器配置
- `deviceMapper`: 必须是函数
- `enableCondition`: 必须是布尔值
- `simulatorUrl`: 必须是字符串或函数
- `localeMessages`: 必须是对象
- `extraEnvironment`: 必须是对象

### `onceGot(key: string): Promise<any>`

等待配置值，返回 Promise。

**参数:**
- `key`: 配置键名

**返回值:** Promise，解析为配置值

**行为:**
- 如果配置已存在，立即返回
- 如果配置不存在，等待配置设置后返回

### `onGot(key: string, fn: IPublicTypeWaitFunction): void`

监听配置值变化。

**参数:**
- `key`: 配置键名
- `fn`: 回调函数

**行为:**
- 如果配置已存在，立即调用回调
- 如果配置不存在，等待配置设置后调用回调

### `getPreference(): IPublicModelPreference`

获取偏好设置对象。

**返回值:** 偏好设置实例

### `getDesignMode(): IPublicTypeDesignMode`

获取设计器模式。

**返回值:** 设计器模式（`'design'` 或 `'live'`）

### `setDesignMode(designMode: IPublicTypeDesignMode): void`

设置设计器模式。

**参数:**
- `designMode`: 设计器模式

**行为:**
- 更新设计器模式
- 触发等待队列中的回调

## 私有方法

### `private setConfigValue(key: string, value: any): void`

设置配置值并触发等待队列。

**参数:**
- `key`: 配置键名
- `value`: 配置值

**行为:**
- 设置配置值
- 触发等待队列中的回调
- 清空等待队列

### `private triggerWaits(key: string, value: any): void`

触发等待队列中的回调。

**参数:**
- `key`: 配置键名
- `value`: 配置值

**行为:**
- 获取等待队列中的回调
- 依次执行回调
- 清空等待队列

### `private getEngineOption(key: string): any`

获取引擎选项值。

**参数:**
- `key`: 配置键名

**返回值:** 引擎选项值

## 接口定义

### IPublicTypeEngineConfig

来自 `@alilc/lowcode-types`，定义引擎配置结构。

### IPublicTypeEngineOptions

来自 `@alilc/lowcode-types`，定义引擎选项结构。

### IPublicModelPreference

来自 `@alilc/lowcode-types`，定义偏好设置接口。

### IPublicTypeDesignMode

来自 `@alilc/lowcode-types`，定义设计器模式类型。

### IPublicTypeWaitFunction

来自 `@alilc/lowcode-types`，定义等待回调函数类型。

## 使用示例

### 基本配置操作

```typescript
import { EngineConfig } from '@alilc/lowcode-editor-core';

const config = new EngineConfig(editor);

// 检查配置是否存在
const hasConfig = config.has('designer.locale');
console.log('Has locale:', hasConfig);

// 获取配置值
const locale = config.get('designer.locale');
console.log('Locale:', locale);

// 设置配置值
config.set('designer.locale', 'zh-CN');

// 批量设置配置
config.setConfig({
  designer: {
    locale: 'zh-CN',
    theme: 'light',
  },
  enableCondition: true,
});
```

### 等待配置值

```typescript
// 等待配置值（Promise 方式）
config.onceGot('designer.locale').then((locale) => {
  console.log('Locale:', locale);
});

// 监听配置变化
config.onGot('designer.locale', (locale) => {
  console.log('Locale changed:', locale);
});
```

### 引擎选项管理

```typescript
// 获取引擎选项
const engineOptions = config.getEngineOptions();
console.log('Engine options:', engineOptions);

// 设置引擎选项
config.setEngineOptions({
  designMode: 'design',
  locale: 'zh-CN',
  device: 'mobile',
  enableCondition: true,
});
```

### 偏好设置

```typescript
// 获取偏好设置
const preference = config.getPreference();

// 使用偏好设置
const theme = preference.get('theme', 'light');
preference.set('theme', 'dark');
```

### 设计器模式

```typescript
// 获取设计器模式
const designMode = config.getDesignMode();
console.log('Design mode:', designMode);

// 设置设计器模式
config.setDesignMode('live');
```

## 配置结构

### 引擎配置结构

```typescript
interface IPublicTypeEngineConfig {
  // 设计器配置
  designer?: {
    locale?: string;
    theme?: string;
    // ...其他设计器配置
  };
  
  // 引擎选项
  engineOptions?: IPublicTypeEngineOptions;
  
  // 其他配置
  [key: string]: any;
}
```

### 引擎选项结构

```typescript
interface IPublicTypeEngineOptions {
  // 设计器模式
  designMode?: 'design' | 'live';
  
  // 语言
  locale?: string;
  
  // 设备类型
  device?: string;
  
  // 设计器配置
  designer?: any;
  
  // 设备映射函数
  deviceMapper?: (device: string) => any;
  
  // 是否启用条件
  enableCondition?: boolean;
  
  // 模拟器 URL
  simulatorUrl?: string | (() => string);
  
  // 语言包
  localeMessages?: Record<string, any>;
  
  // 额外环境变量
  extraEnvironment?: Record<string, any>;
}
```

## 严格模式验证

在严格模式下，引擎选项会进行类型验证：

### designMode

必须是 `'design'` 或 `'live'`。

### locale

必须是有效的语言代码（如 `'zh-CN'`、`'en-US'`）。

### device

必须是有效的设备类型。

### designer

必须是有效的设计器配置对象。

### deviceMapper

必须是函数。

### enableCondition

必须是布尔值。

### simulatorUrl

必须是字符串或函数。

### localeMessages

必须是对象。

### extraEnvironment

必须是对象。

## 注意事项

1. **配置路径**: 支持嵌套路径（如 `'designer.locale'`）
2. **严格模式**: 建议在严格模式下运行，确保配置正确
3. **等待队列**: `onceGot` 和 `onGot` 会创建等待队列，记得清理
4. **偏好设置**: 偏好设置使用 localStorage，注意浏览器兼容性
5. **设计器模式**: 设计器模式会影响编辑器的行为
6. **引擎选项**: 引擎选项设置后不能随意更改

## 相关文件

- [`editor.ts`](./editor.md) - Editor 核心类，使用 EngineConfig
- [`../utils/preference.ts`](../utils/preference.md) - 偏好设置实现

## 外部依赖

- `@alilc/lowcode-types` - 提供配置相关类型定义
- `@alilc/lowcode-utils` - 提供工具函数

## 典型使用场景

1. **初始化配置**: 在编辑器初始化时设置配置
2. **插件配置**: 插件通过配置获取引擎选项
3. **主题切换**: 通过配置切换主题
4. **语言切换**: 通过配置切换语言
5. **设备切换**: 通过配置切换设备类型
