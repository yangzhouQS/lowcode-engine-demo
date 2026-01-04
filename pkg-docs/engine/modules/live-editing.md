# Live Editing 模块文档

## 文件路径

`packages/engine/src/modules/live-editing.ts`

## 功能概述

`live-editing` 模块提供了实时编辑功能，支持在画布上直接编辑文本内容。它定义了实时编辑规则和保存处理器。

## 主要功能

### 1. 实时编辑规则

- 定义哪些元素可以实时编辑
- 确定编辑目标属性
- 验证编辑内容

### 2. 保存处理器

- 处理实时编辑的保存
- 支持表达式类型
- 处理 mock 值

## 工具函数

### `getText(node: DocNode, prop: string): string | null`

获取节点的属性文本值。

**参数:**
- `node`: 节点实例
- `prop`: 属性名

**返回值:** 属性文本值或 null

**行为:**
- 获取属性实例
- 如果属性未设置，返回 null
- 获取属性值
- 如果是 JS 表达式，使用 mock 值
- 如果值为 null，返回 null
- 如果是字面量类型，返回原值
- 否则返回 Symbol('not-literal')

### `equalText(v: any, innerText: string): boolean`

比较两个文本值是否相等。

**参数:**
- `v`: 要比较的值
- `innerText`: 内部文本

**返回值:** 是否相等

**行为:**
- 如果值不是字符串类型，返回 false
- 比较去除空格后的值

### `liveEditingRule(target: EditingTarget): { propElement: HTMLElement; propTarget: string } | null`

实时编辑规则，确定编辑目标。

**参数:**
- `target`: 编辑目标

**返回值:** 包含属性元素和属性名的对象或 null

**行为:**
- 获取节点和事件
- 获取目标元素
- 检查目标元素是否只包含文本节点
- 如果不是，返回 null
- 获取内部文本
- 在预定义属性列表中查找匹配的属性
- 如果找到匹配，返回属性元素和属性名

**支持的属性:**
```typescript
['title', 'label', 'text', 'content', 'children']
```

## 保存处理器

### `liveEditingSaveHandler`

实时编辑保存处理器。

```typescript
export const liveEditingSaveHandler: SaveHandler = {
  condition: (prop) => {
    return prop.type === 'expression';
  },
  onSaveContent: (content, prop) => {
    const v = prop.getValue();
    let data = v;
    if (isJSExpression(v)) {
      data = v.mock;
    }
    data = content;
    if (isJSExpression(v)) {
      prop.setValue({
        type: 'JSExpression',
        value: v.value,
        mock: data,
      });
    } else {
      prop.setValue(data);
    }
  },
};
```

**condition:**
- 只处理表达式类型的属性

**onSaveContent:**
- 获取当前属性值
- 如果是 JS 表达式，使用 mock 值
- 更新数据为编辑内容
- 如果原值是 JS 表达式，设置新的 JS 表达式（保留原值，更新 mock）
- 否则直接设置新值

## 注册规则和处理器

```typescript
LiveEditing.addLiveEditingSpecificRule(liveEditingRule);
LiveEditing.addLiveEditingSaveHandler(liveEditingSaveHandler);
```

## 使用示例

### 实时编辑规则

当用户在画布上双击文本元素时，会触发实时编辑：

```typescript
// 系统自动调用
const result = liveEditingRule({
  node: targetNode,
  event: clickEvent,
});

// 返回 { propElement: targetElement, propTarget: 'text' }
```

### 保存处理

当用户完成实时编辑时，会触发保存：

```typescript
// 系统自动调用
liveEditingSaveHandler.onSaveContent('新的文本内容', property);
```

## 注意事项

1. **文本节点**: 目标元素必须只包含文本节点
2. **属性匹配**: 只在预定义的属性列表中查找匹配
3. **表达式处理**: 表达式类型需要特殊处理 mock 值
4. **非文本编辑**: TODO 中提到需要支持非文本编辑、国际化数据、JS 表达式编辑

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`../inner-plugins/builtin-hotkey.md`](../inner-plugins/builtin-hotkey.md) - 内置快捷键

## 外部依赖

- `@alilc/lowcode-designer` - 提供设计器类型
- `@alilc/lowcode-utils` - 提供工具函数

## 典型使用场景

1. **文本编辑**: 在画布上直接编辑文本内容
2. **表达式编辑**: 编辑表达式类型的属性
3. **实时保存**: 编辑完成后立即保存
