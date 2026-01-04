# Intl 模块文档

## 文件路径

`packages/editor-core/src/intl/index.ts`

## 功能概述

`Intl` 模块是编辑器的国际化（i18n）模块，提供多语言支持功能。它支持消息格式化、语言切换、回退机制等功能。

## 主要功能

### 1. 消息格式化

- 格式化国际化消息（`intl`）
- 支持变量替换
- 支持复数形式

### 2. 浅层格式化

- 浅层格式化消息（`shallowIntl`）
- 不进行深度格式化

### 3. 节点格式化

- 格式化节点消息（`intlNode`）
- 返回 React 节点

### 4. 国际化创建

- 创建国际化实例（`createIntl`）
- 支持自定义配置

## 函数定义

```typescript
export function intl(
  message: string,
  values?: Record<string, string | number>,
  locale?: string,
): string;

export function shallowIntl(
  message: string,
  values?: Record<string, string | number>,
  locale?: string,
): string;

export function intlNode(
  message: string,
  values?: Record<string, string | number>,
  locale?: string,
): React.ReactNode;

export function createIntl(config?: IPublicTypeIntlConfig): IPublicModelIntl;
```

## 函数

### `intl(message: string, values?: Record<string, string | number>, locale?: string): string`

格式化国际化消息。

**参数:**
- `message`: 消息字符串，支持 ICU MessageFormat 语法
- `values`: 变量值对象（可选）
- `locale`: 语言代码（可选），默认使用当前语言

**返回值:** 格式化后的消息字符串

**行为:**
- 获取当前语言或指定语言
- 获取语言包
- 使用 IntlMessageFormat 格式化消息
- 返回格式化后的消息

**示例:**
```typescript
// 简单消息
intl('Hello, world!');
// 输出: Hello, world!

// 带变量的消息
intl('Hello, {name}!', { name: 'John' });
// 输出: Hello, John!

// 复数形式
intl('You have {count, plural, =0{no messages} one{1 message} other{# messages}}.', { count: 5 });
// 输出: You have 5 messages.
```

### `shallowIntl(message: string, values?: Record<string, string | number>, locale?: string): string`

浅层格式化国际化消息。

**参数:**
- `message`: 消息字符串
- `values`: 变量值对象（可选）
- `locale`: 语言代码（可选）

**返回值:** 格式化后的消息字符串

**行为:**
- 与 `intl` 类似，但不进行深度格式化
- 适用于简单变量替换

**示例:**
```typescript
shallowIntl('Hello, {name}!', { name: 'John' });
// 输出: Hello, John!
```

### `intlNode(message: string, values?: Record<string, string | number>, locale?: string): React.ReactNode`

格式化国际化消息并返回 React 节点。

**参数:**
- `message`: 消息字符串
- `values`: 变量值对象（可选）
- `locale`: 语言代码（可选）

**返回值:** React 节点

**行为:**
- 格式化消息
- 返回 React 节点

**示例:**
```typescript
intlNode('Hello, {name}!', { name: 'John' });
// 返回: <span>Hello, John!</span>
```

### `createIntl(config?: IPublicTypeIntlConfig): IPublicModelIntl`

创建国际化实例。

**参数:**
- `config`: 国际化配置（可选）
  - `locale`: 默认语言
  - `messages`: 语言包对象
  - `fallbackLocale`: 回退语言

**返回值:** 国际化实例

**行为:**
- 创建新的国际化实例
- 支持自定义配置

**示例:**
```typescript
const intl = createIntl({
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      'hello': '你好，{name}！',
    },
    'en-US': {
      'hello': 'Hello, {name}!',
    },
  },
  fallbackLocale: 'en-US',
});

intl('hello', { name: 'John' }, 'zh-CN');
// 输出: 你好，John！
```

## 接口定义

### IPublicTypeIntlConfig

来自 `@alilc/lowcode-types`，定义国际化配置结构。

### IPublicModelIntl

来自 `@alilc/lowcode-types`，定义国际化实例接口。

## ICU MessageFormat 语法

### 变量替换

```
Hello, {name}!
```

### 复数形式

```
You have {count, plural, 
  =0 {no messages} 
  one {1 message} 
  other {# messages}
}.
```

### 选择形式

```
{gender, select, 
  male {He} 
  female {She} 
  other {They}
} is online.
```

### 数字格式化

```
Price: {price, number, USD}
```

### 日期格式化

```
Date: {date, date, long}
```

## 使用示例

### 基本使用

```typescript
import { intl } from '@alilc/lowcode-editor-core';

// 简单消息
const message = intl('Hello, world!');
console.log(message);

// 带变量的消息
const message2 = intl('Hello, {name}!', { name: 'John' });
console.log(message2);
```

### 复数形式

```typescript
const message = intl(
  'You have {count, plural, =0{no messages} one{1 message} other{# messages}}.',
  { count: 5 }
);
console.log(message);
// 输出: You have 5 messages.
```

### 选择形式

```typescript
const message = intl(
  '{gender, select, male{He} female{She} other{They}} is online.',
  { gender: 'male' }
);
console.log(message);
// 输出: He is online.
```

### 数字格式化

```typescript
const message = intl('Price: {price, number, USD}', { price: 1234.56 });
console.log(message);
// 输出: Price: $1,234.56
```

### 日期格式化

```typescript
const message = intl('Date: {date, date, long}', { date: new Date() });
console.log(message);
// 输出: Date: January 4, 2026
```

### 创建国际化实例

```typescript
import { createIntl } from '@alilc/lowcode-editor-core';

const intl = createIntl({
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      'hello': '你好，{name}！',
      'welcome': '欢迎来到 {app}！',
    },
    'en-US': {
      'hello': 'Hello, {name}!',
      'welcome': 'Welcome to {app}!',
    },
  },
  fallbackLocale: 'en-US',
});

// 使用中文
const message1 = intl('hello', { name: 'John' }, 'zh-CN');
console.log(message1);
// 输出: 你好，John！

// 使用英文
const message2 = intl('hello', { name: 'John' }, 'en-US');
console.log(message2);
// 输出: Hello, John!
```

### 节点格式化

```typescript
import { intlNode } from '@alilc/lowcode-editor-core';

const node = intlNode('Hello, {name}!', { name: 'John' });
console.log(node);
// 返回: <span>Hello, John!</span>
```

## 语言包结构

```typescript
{
  'zh-CN': {
    'common.save': '保存',
    'common.cancel': '取消',
    'editor.title': '编辑器',
    // ...更多消息
  },
  'en-US': {
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'editor.title': 'Editor',
    // ...更多消息
  },
}
```

## 注意事项

1. **语言代码**: 使用标准的语言代码（如 `zh-CN`、`en-US`）
2. **回退机制**: 当指定语言不存在时，会使用回退语言
3. **消息格式**: 使用 ICU MessageFormat 语法
4. **变量类型**: 变量值可以是字符串或数字
5. **性能**: 频繁格式化消息时，建议缓存结果
6. **React 节点**: `intlNode` 返回 React 节点，需要在 React 环境中使用

## 相关文件

- [`editor.ts`](./editor.md) - Editor 核心类，使用 Intl
- [`../config.ts`](./config.md) - 配置管理，包含语言配置

## 外部依赖

- `@alilc/lowcode-types` - 提供国际化相关类型定义
- `intl-messageformat` - 提供 ICU MessageFormat 支持

## 典型使用场景

1. **界面文本**: 所有界面文本都使用国际化
2. **错误消息**: 错误消息使用国际化
3. **提示信息**: 提示信息使用国际化
4. **动态消息**: 带变量的消息使用国际化
5. **多语言切换**: 支持用户切换语言
6. **插件国际化**: 插件也可以使用国际化
