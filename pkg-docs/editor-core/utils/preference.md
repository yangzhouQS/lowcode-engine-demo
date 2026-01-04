# Preference 模块文档

## 文件路径

`packages/editor-core/src/utils/preference.ts`

## 功能概述

`Preference` 类是编辑器的偏好设置管理器，负责管理用户的偏好设置。它使用 localStorage 进行持久化存储，支持设置、获取、检查等功能。

## 主要功能

### 1. 偏好设置管理

- 获取偏好设置（`get`）
- 设置偏好设置（`set`）
- 检查偏好设置是否存在（`contains`）

### 2. 持久化存储

- 使用 localStorage 进行持久化
- 支持自动保存

### 3. 存储键管理

- 获取存储键（`getStorageKey`）
- 支持自定义前缀

## 类定义

```typescript
export class Preference implements IPublicModelPreference {
  private storage: Storage;
  private prefix: string;
  
  constructor(prefix?: string, storage?: Storage)
}
```

## 属性

### `private storage: Storage`

存储对象，默认为 `localStorage`。

### `private prefix: string`

存储键前缀，默认为 `'ale'`。

## 方法

### `constructor(prefix?: string, storage?: Storage)`

构造函数，创建偏好设置管理器实例。

**参数:**
- `prefix`: 存储键前缀（可选），默认为 `'ale'`
- `storage`: 存储对象（可选），默认为 `localStorage`

**行为:**
- 保存存储键前缀
- 保存存储对象

### `get(key: string, defaultValue?: any): any`

获取偏好设置。

**参数:**
- `key`: 偏好设置键
- `defaultValue`: 默认值（可选）

**返回值:** 偏好设置值或默认值

**行为:**
- 从存储中获取值
- 如果值不存在，返回默认值
- 如果值是 JSON 字符串，解析为对象

### `set(key: string, value: any): void`

设置偏好设置。

**参数:**
- `key`: 偏好设置键
- `value`: 偏好设置值

**行为:**
- 如果值是对象，转换为 JSON 字符串
- 存储到 localStorage

### `contains(key: string): boolean`

检查偏好设置是否存在。

**参数:**
- `key`: 偏好设置键

**返回值:** 偏好设置是否存在

### `getStorageKey(key: string): string`

获取存储键。

**参数:**
- `key`: 偏好设置键

**返回值:** 完整的存储键（带前缀）

**行为:**
- 拼接前缀和键
- 返回完整的存储键

## 接口定义

### IPublicModelPreference

来自 `@alilc/lowcode-types`，定义偏好设置接口。

## 使用示例

### 基本使用

```typescript
import { Preference } from '@alilc/lowcode-editor-core';

// 创建偏好设置管理器
const preference = new Preference();

// 设置偏好设置
preference.set('theme', 'dark');
preference.set('language', 'zh-CN');
preference.set('fontSize', 14);

// 获取偏好设置
const theme = preference.get('theme');
console.log('Theme:', theme); // dark

const language = preference.get('language');
console.log('Language:', language); // zh-CN

const fontSize = preference.get('fontSize');
console.log('Font size:', fontSize); // 14
```

### 使用默认值

```typescript
// 获取不存在的偏好设置，使用默认值
const theme = preference.get('theme', 'light');
console.log('Theme:', theme); // light（如果 theme 不存在）
```

### 检查偏好设置是否存在

```typescript
// 检查偏好设置是否存在
const hasTheme = preference.contains('theme');
console.log('Has theme:', hasTheme); // true

const hasColor = preference.contains('color');
console.log('Has color:', hasColor); // false
```

### 存储对象

```typescript
// 存储对象
preference.set('editor', {
  theme: 'dark',
  language: 'zh-CN',
  fontSize: 14,
});

// 获取对象
const editor = preference.get('editor');
console.log('Editor:', editor);
// 输出: { theme: 'dark', language: 'zh-CN', fontSize: 14 }
```

### 自定义前缀

```typescript
// 创建带自定义前缀的偏好设置管理器
const preference = new Preference('myapp');

// 设置偏好设置
preference.set('theme', 'dark');

// 存储键为: myapp-theme
```

### 自定义存储

```typescript
// 创建使用自定义存储的偏好设置管理器
const customStorage = {
  getItem: (key) => { /* 自定义实现 */ },
  setItem: (key, value) => { /* 自定义实现 */ },
  removeItem: (key) => { /* 自定义实现 */ },
};

const preference = new Preference('myapp', customStorage);
```

## 存储键格式

存储键的格式为：`{prefix}-{key}`

### 示例

```typescript
const preference = new Preference('ale');

preference.set('theme', 'dark');
// 存储键: ale-theme

preference.set('language', 'zh-CN');
// 存储键: ale-language
```

## 数据类型

### 支持的数据类型

- 字符串（`string`）
- 数字（`number`）
- 布尔值（`boolean`）
- 对象（`object`）
- 数组（`array`）
- null

### 对象和数组

对象和数组会被序列化为 JSON 字符串存储：

```typescript
preference.set('user', {
  name: 'John',
  age: 30,
});
// 存储: {"name":"John","age":30}

const user = preference.get('user');
// 返回: { name: 'John', age: 30 }
```

## 注意事项

1. **存储限制**: localStorage 有大小限制（通常为 5MB）
2. **同步操作**: localStorage 操作是同步的，大量数据可能阻塞主线程
3. **浏览器兼容性**: localStorage 在某些浏览器中可能被禁用
4. **隐私模式**: 在隐私模式下，localStorage 可能不可用
5. **数据持久化**: localStorage 数据会持久化，除非手动清除
6. **JSON 解析**: 对象和数组会被序列化为 JSON 字符串

## 相关文件

- [`../config.ts`](../config.ts) - 配置管理，使用 Preference

## 外部依赖

- `@alilc/lowcode-types` - 提供偏好设置相关类型定义

## 典型使用场景

1. **主题设置**: 存储用户选择的主题（亮色/暗色）
2. **语言设置**: 存储用户选择的语言
3. **界面布局**: 存储用户的界面布局偏好
4. **编辑器设置**: 存储编辑器的各种设置（字体大小、行号等）
5. **用户偏好**: 存储用户的各种偏好设置
6. **功能开关**: 存储功能开关状态
