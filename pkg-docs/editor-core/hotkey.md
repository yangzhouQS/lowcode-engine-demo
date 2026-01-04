# Hotkey 模块文档

## 文件路径

`packages/editor-core/src/hotkey.ts`

## 功能概述

`Hotkey` 类是编辑器的快捷键系统，负责管理快捷键的绑定、激活、取消绑定等功能。它支持单个快捷键、快捷键组合、快捷键序列等多种形式，提供了灵活的快捷键管理能力。

## 主要功能

### 1. 快捷键绑定

- 绑定快捷键（`bind`）
- 支持单个快捷键、组合键、序列
- 支持修饰键（Ctrl、Shift、Alt、Meta）

### 2. 快捷键激活

- 激活快捷键（`activate`）
- 挂载快捷键（`mount`）
- 卸载快捷键（`unmount`）

### 3. 快捷键取消绑定

- 取消绑定快捷键（`unbind`）
- 支持精确匹配和模糊匹配

### 4. 快捷键状态管理

- 获取所有已绑定的快捷键（`getKeys`）
- 检查快捷键是否已绑定（`has`）

## 类定义

```typescript
export class Hotkey {
  private editor: Editor;
  private keys: Map<string, IPublicTypeHotkeyCallback> = new Map();
  private keysMap: Map<string, string[]> = new Map();
  private active: boolean = false;
  private container?: HTMLElement;
  private eventBus: IEventBus;
  private logger: Logger;
  
  // 特殊键映射
  private specialKeys: Record<string, string>;
  private shiftKeys: Record<string, string>;
  private fKeys: Record<string, string>;
  
  constructor(editor: Editor)
}
```

## 属性

### `private keys: Map<string, IPublicTypeHotkeyCallback>`

快捷键映射表，存储快捷键和回调函数。

### `private keysMap: Map<string, string[]>`

快捷键映射表，存储快捷键和对应的键值数组。

### `private active: boolean`

快捷键是否激活。

### `private container?: HTMLElement`

快捷键绑定的容器元素。

### `private eventBus: IEventBus`

事件总线实例。

### `private logger: Logger`

日志记录器。

### `private specialKeys: Record<string, string>`

特殊键映射表。

### `private shiftKeys: Record<string, string>`

Shift 键映射表。

### `private fKeys: Record<string, string>`

F 键映射表（F1-F19）。

## 方法

### `constructor(editor: Editor)`

构造函数，创建快捷键管理器实例。

**参数:**
- `editor`: 编辑器实例

**行为:**
- 初始化特殊键映射表
- 初始化 Shift 键映射表
- 初始化 F 键映射表
- 监听编辑器事件

### `bind(hotkey: string, callback: IPublicTypeHotkeyCallback): void`

绑定快捷键。

**参数:**
- `hotkey`: 快捷键字符串（如 `'ctrl+s'`、`'cmd+s'`、`'ctrl+shift+s'`）
- `callback`: 快捷键回调函数

**行为:**
- 解析快捷键字符串
- 存储快捷键和回调函数
- 记录日志

**快捷键格式:**
- 单个键：`'s'`
- 组合键：`'ctrl+s'`、`'cmd+s'`、`'shift+s'`、`'alt+s'`、`'meta+s'`
- 多个组合：`'ctrl+shift+s'`、`'ctrl+alt+s'`
- 序列：`'ctrl+k,ctrl+c'`（先按 Ctrl+K，再按 Ctrl+C）

### `unbind(hotkey: string): void`

取消绑定快捷键。

**参数:**
- `hotkey`: 快捷键字符串

**行为:**
- 从映射表中删除快捷键
- 记录日志

### `activate(): void`

激活快捷键系统。

**行为:**
- 设置激活状态为 true
- 绑定键盘事件监听器

### `mount(container: HTMLElement): void`

挂载快捷键系统到容器。

**参数:**
- `container`: 容器元素

**行为:**
- 保存容器引用
- 绑定键盘事件监听器到容器

### `unmount(): void`

卸载快捷键系统。

**行为:**
- 移除键盘事件监听器
- 清空容器引用

### `getKeys(): string[]`

获取所有已绑定的快捷键。

**返回值:** 快捷键数组

### `has(hotkey: string): boolean`

检查快捷键是否已绑定。

**参数:**
- `hotkey`: 快捷键字符串

**返回值:** 快捷键是否已绑定

## 私有方法

### `private bindKeydown(): void`

绑定键盘按下事件。

**行为:**
- 监听 `keydown` 事件
- 解析按键事件
- 匹配快捷键
- 执行回调函数

### `private bindKeyup(): void`

绑定键盘抬起事件。

**行为:**
- 监听 `keyup` 事件
- 重置按键状态

### `private parseHotkey(hotkey: string): string[]`

解析快捷键字符串。

**参数:**
- `hotkey`: 快捷键字符串

**返回值:** 键值数组

**行为:**
- 转换为小写
- 分割快捷键
- 映射特殊键
- 返回键值数组

### `private matchKey(event: KeyboardEvent, keys: string[]): boolean`

匹配按键事件。

**参数:**
- `event`: 键盘事件
- `keys`: 键值数组

**返回值:** 是否匹配

**行为:**
- 检查修饰键（Ctrl、Shift、Alt、Meta）
- 检查主键
- 返回匹配结果

### `private getKey(event: KeyboardEvent): string`

获取按键值。

**参数:**
- `event`: 键盘事件

**返回值:** 按键值

**行为:**
- 获取按键代码
- 映射特殊键
- 返回按键值

### `private isModifierKey(key: string): boolean`

检查是否是修饰键。

**参数:**
- `key`: 按键值

**返回值:** 是否是修饰键

### `private handleKeydown(event: KeyboardEvent): void`

处理键盘按下事件。

**参数:**
- `event`: 键盘事件

**行为:**
- 获取按键值
- 匹配快捷键
- 执行回调函数

### `private handleKeyup(event: KeyboardEvent): void`

处理键盘抬起事件。

**参数:**
- `event`: 键盘事件

**行为:**
- 重置按键状态

## 特殊键映射

### specialKeys

```typescript
{
  'backspace': 'Backspace',
  'tab': 'Tab',
  'enter': 'Enter',
  'shift': 'Shift',
  'control': 'Control',
  'alt': 'Alt',
  'meta': 'Meta',
  'escape': 'Escape',
  ' ': 'Space',
  'arrowup': 'ArrowUp',
  'arrowdown': 'ArrowDown',
  'arrowleft': 'ArrowLeft',
  'arrowright': 'ArrowRight',
  // ...更多特殊键
}
```

### shiftKeys

```typescript
{
  '~': '`',
  '_': '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
}
```

### fKeys

```typescript
{
  'f1': 'F1',
  'f2': 'F2',
  // ...
  'f19': 'F19',
}
```

## 使用示例

### 基本快捷键绑定

```typescript
import { Hotkey } from '@alilc/lowcode-editor-core';

const hotkey = new Hotkey(editor);

// 绑定单个快捷键
hotkey.bind('s', () => {
  console.log('S key pressed');
});

// 绑定组合键
hotkey.bind('ctrl+s', () => {
  console.log('Ctrl+S pressed');
});

// 绑定多个组合键
hotkey.bind('ctrl+shift+s', () => {
  console.log('Ctrl+Shift+S pressed');
});
```

### 快捷键序列

```typescript
// 绑定快捷键序列（先按 Ctrl+K，再按 Ctrl+C）
hotkey.bind('ctrl+k,ctrl+c', () => {
  console.log('Ctrl+K, Ctrl+C sequence pressed');
});
```

### 激活和挂载

```typescript
// 激活快捷键系统
hotkey.activate();

// 挂载到容器
hotkey.mount(document.body);

// 卸载快捷键系统
hotkey.unmount();
```

### 取消绑定

```typescript
// 取消绑定快捷键
hotkey.unbind('ctrl+s');

// 检查快捷键是否已绑定
const hasHotkey = hotkey.has('ctrl+s');
console.log('Has hotkey:', hasHotkey);
```

### 获取所有快捷键

```typescript
// 获取所有已绑定的快捷键
const keys = hotkey.getKeys();
console.log('All hotkeys:', keys);
```

## 快捷键格式

### 基本格式

```
[modifier1+][modifier2+][...][key]
```

### 修饰键

- `ctrl` 或 `control`: Control 键
- `cmd` 或 `meta`: Meta 键（Command 键）
- `shift`: Shift 键
- `alt`: Alt 键

### 主键

- 字母：`a`-`z`
- 数字：`0`-`9`
- 特殊键：`backspace`、`tab`、`enter`、`escape`、`space` 等
- 方向键：`arrowup`、`arrowdown`、`arrowleft`、`arrowright`
- 功能键：`f1`-`f19`

### 组合示例

```
ctrl+s          # Ctrl + S
cmd+s           # Command + S
ctrl+shift+s    # Ctrl + Shift + S
ctrl+alt+s      # Ctrl + Alt + S
ctrl+k,ctrl+c   # Ctrl + K, Ctrl + C (序列)
```

## 注意事项

1. **大小写**: 快捷键不区分大小写，会自动转换为小写
2. **修饰键顺序**: 修饰键的顺序不影响匹配（`ctrl+s` 和 `s+ctrl` 等效）
3. **序列快捷键**: 序列快捷键需要依次按下，中间不能有其他按键
4. **冲突处理**: 如果多个快捷键匹配同一个按键，后绑定的会覆盖先绑定的
5. **激活状态**: 快捷键系统需要激活才能工作
6. **容器绑定**: 可以绑定到特定容器，避免全局冲突

## 相关文件

- [`editor.ts`](./editor.md) - Editor 核心类，使用 Hotkey
- [`event-bus.ts`](./event-bus.md) - 事件总线

## 外部依赖

- `@alilc/lowcode-types` - 提供快捷键相关类型定义
- `@alilc/lowcode-utils` - 提供日志工具

## 典型使用场景

1. **保存操作**: `ctrl+s` 或 `cmd+s` 保存当前文档
2. **复制粘贴**: `ctrl+c`、`ctrl+v`、`ctrl+x` 复制、粘贴、剪切
3. **撤销重做**: `ctrl+z`、`ctrl+y` 撤销、重做
4. **全选**: `ctrl+a` 全选
5. **查找替换**: `ctrl+f`、`ctrl+h` 查找、替换
6. **快捷键序列**: `ctrl+k,ctrl+c` 打开命令面板
