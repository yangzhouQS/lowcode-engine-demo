# Locale 模块文档

## 文件路径

`packages/engine/src/locale/index.ts`

## 功能概述

`locale/index.ts` 是引擎的国际化模块，提供多语言支持。它使用 `createIntl` 创建国际化实例，并导出中英文语言包。

## 主要功能

### 1. 国际化创建

- 使用 `createIntl` 创建国际化实例
- 支持多语言切换
- 提供国际化函数

### 2. 语言包管理

- 导出中文语言包
- 导出英文语言包
- 支持语言包扩展

## 导出的 API

```typescript
export { intl, enUS, zhCN, getLocale };
```

### `intl(id: string): string`

国际化函数，用于格式化消息。

**参数:**
- `id`: 消息 ID

**返回值:** 格式化后的消息字符串

**行为:**
- 根据当前语言获取对应的消息
- 支持变量替换
- 支持复数形式

### `enUS`

英文语言包对象。

### `zhCN`

中文语言包对象。

### `getLocale()`

获取当前语言。

**返回值:** 当前语言代码

## 语言包

### 英文语言包 (en-US.json)

```json
{
  "NotValidNodeData": "Not valid node data",
  "SelectComponents": "Select components",
  "CopyAndPaste": "Copy and Paste",
  "Copy": "Copy",
  "PasteToTheBottom": "Paste to bottom",
  "PasteToTheInside": "Paste to inside",
  "Delete": "Delete"
}
```

### 中文语言包 (zh-CN.json)

```json
{
  "NotValidNodeData": "不是有效的节点数据",
  "SelectComponents": "选择组件",
  "CopyAndPaste": "复制",
  "Copy": "拷贝",
  "PasteToTheBottom": "粘贴至下方",
  "PasteToTheInside": "粘贴至内部",
  "Delete": "删除"
}
```

## 使用示例

### 基本使用

```typescript
import { intl } from '@alilc/lowcode-engine';

// 简单消息
const message = intl('SelectComponents');
console.log(message); // "选择组件"

// 带变量的消息
const message2 = intl('NotValidNodeData');
console.log(message2); // "不是有效的节点数据"
```

### 获取当前语言

```typescript
import { getLocale } from '@alilc/lowcode-engine';

const locale = getLocale();
console.log(locale); // "zh-CN" 或 "en-US"
```

### 使用语言包

```typescript
import { enUS, zhCN } from '@alilc/lowcode-engine';

console.log(enUS); // 英文语言包对象
console.log(zhCN); // 中文语言包对象
```

## 注意事项

1. **默认语言**: 如果 `createIntl` 不可用，默认使用中文
2. **消息 ID**: 消息 ID 必须在语言包中定义
3. **语言切换**: 语言切换需要重新加载语言包
4. **变量替换**: 支持变量替换和复数形式

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`en-US.json`](./en-US.md) - 英文语言包
- [`zh-CN.json`](./zh-CN.json) - 中文语言包

## 外部依赖

- `@alilc/lowcode-editor-core` - 提供 `createIntl` 函数

## 典型使用场景

1. **界面文本**: 所有界面文本都使用国际化
2. **错误消息**: 错误消息使用国际化
3. **提示信息**: 提示信息使用国际化
4. **动态语言**: 支持用户切换语言
