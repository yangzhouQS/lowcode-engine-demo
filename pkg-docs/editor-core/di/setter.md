# Setter 模块文档

## 文件路径

`packages/editor-core/src/di/setter.ts`

## 功能概述

`SetterManager` 类是编辑器的 Setter 管理器，负责管理 Setter（属性编辑器）的注册、获取、创建等功能。Setter 是用于编辑组件属性的自定义视图组件。

## 主要功能

### 1. Setter 注册

- 注册 Setter（`registerSetter`）
- 支持多种注册方式（函数、组件、对象）

### 2. Setter 获取

- 获取 Setter（`getSetter`）
- 获取所有 Setter 映射（`getSettersMap`）

### 3. Setter 创建

- 创建 Setter 内容（`createSetterContent`）
- 支持自定义视图和初始值

## 类定义

```typescript
export interface ISetterManager {
  registerSetter(type: string, setter: IPublicTypeSetterType | IPublicTypeRegisteredSetter): void;
  getSetter(type: string): IPublicTypeRegisteredSetter | undefined;
  getSettersMap(): Map<string, IPublicTypeRegisteredSetter>;
  createSetterContent(type: string, props: IPublicTypePropsTransducer): any;
}

export class SetterManager implements ISetterManager {
  private setters: Map<string, IPublicTypeRegisteredSetter> = new Map();
  private editor: Editor;
  
  constructor(editor: Editor)
}
```

## 属性

### `private setters: Map<string, IPublicTypeRegisteredSetter>`

Setter 映射表，存储所有已注册的 Setter。

### `private editor: Editor`

编辑器实例。

## 方法

### `constructor(editor: Editor)`

构造函数，创建 Setter 管理器实例。

**参数:**
- `editor`: 编辑器实例

### `registerSetter(type: string, setter: IPublicTypeSetterType | IPublicTypeRegisteredSetter): void`

注册 Setter。

**参数:**
- `type`: Setter 类型
- `setter`: Setter 定义

**Setter 定义类型:**
- 函数：`(props: IPublicTypePropsTransducer) => any`
- 组件：React 组件
- 对象：包含 `Component`、`initValue`、`onInit` 等属性

**行为:**
- 如果传入的是函数，转换为对象格式
- 如果传入的是组件，转换为对象格式
- 存储到映射表

### `getSetter(type: string): IPublicTypeRegisteredSetter | undefined`

获取 Setter。

**参数:**
- `type`: Setter 类型

**返回值:** Setter 定义或 undefined

### `getSettersMap(): Map<string, IPublicTypeRegisteredSetter>`

获取所有 Setter 映射。

**返回值:** Setter 映射表

### `createSetterContent(type: string, props: IPublicTypePropsTransducer): any`

创建 Setter 内容。

**参数:**
- `type`: Setter 类型
- `props`: 属性转换器

**返回值:** Setter 内容

**行为:**
- 获取 Setter 定义
- 如果有 `initValue`，调用 `initValue` 获取初始值
- 如果有 `onInit`，调用 `onInit` 初始化
- 返回 Setter 组件或函数

## 接口定义

### IPublicTypeSetterType

来自 `@alilc/lowcode-types`，定义 Setter 类型。

### IPublicTypeRegisteredSetter

来自 `@alilc/lowcode-types`，定义已注册的 Setter 结构。

### IPublicTypePropsTransducer

来自 `@alilc/lowcode-types`，定义属性转换器结构。

## 使用示例

### 注册 Setter

```typescript
import { SetterManager } from '@alilc/lowcode-editor-core';

const setterManager = new SetterManager(editor);

// 注册函数类型的 Setter
setterManager.registerSetter('mySetter', (props) => {
  return <div>My Setter</div>;
});

// 注册组件类型的 Setter
const MySetterComponent = (props) => {
  return <div>My Setter Component</div>;
};
setterManager.registerSetter('myComponentSetter', MySetterComponent);

// 注册对象类型的 Setter
setterManager.registerSetter('myObjectSetter', {
  Component: MySetterComponent,
  initValue: (field) => {
    return 'default value';
  },
  onInit: (field) => {
    console.log('Setter initialized:', field);
  },
});
```

### 获取 Setter

```typescript
// 获取 Setter
const setter = setterManager.getSetter('mySetter');
console.log('Setter:', setter);

// 获取所有 Setter
const settersMap = setterManager.getSettersMap();
console.log('All setters:', settersMap);
```

### 创建 Setter 内容

```typescript
// 创建 Setter 内容
const content = setterManager.createSetterContent('mySetter', {
  value: 'test value',
  onChange: (value) => {
    console.log('Value changed:', value);
  },
});
console.log('Setter content:', content);
```

## Setter 定义格式

### 函数格式

```typescript
(props: IPublicTypePropsTransducer) => any
```

### 组件格式

```typescript
React.ComponentType<IPublicTypePropsTransducer>
```

### 对象格式

```typescript
{
  Component: React.ComponentType<IPublicTypePropsTransducer>;
  initValue?: (field: IPublicModelSettingField) => any;
  onInit?: (field: IPublicModelSettingField) => void;
  [key: string]: any;
}
```

### 对象格式属性

- `Component`: Setter 组件
- `initValue`: 初始值函数，接收 SettingField，返回初始值
- `onInit`: 初始化函数，接收 SettingField
- 其他自定义属性

## 使用场景

### 1. 简单文本输入

```typescript
setterManager.registerSetter('text-input', (props) => {
  return <input value={props.value} onChange={(e) => props.onChange(e.target.value)} />;
});
```

### 2. 下拉选择

```typescript
setterManager.registerSetter('select', {
  Component: (props) => {
    return (
      <select value={props.value} onChange={(e) => props.onChange(e.target.value)}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    );
  },
  initValue: () => 'option1',
});
```

### 3. 颜色选择器

```typescript
setterManager.registerSetter('color-picker', {
  Component: ColorPicker,
  initValue: () => '#000000',
  onInit: (field) => {
    console.log('Color picker initialized:', field);
  },
});
```

### 4. 复杂表单

```typescript
setterManager.registerSetter('complex-form', {
  Component: ComplexForm,
  initValue: (field) => {
    return {
      name: '',
      age: 0,
      email: '',
    };
  },
  onInit: (field) => {
    // 初始化逻辑
  },
});
```

## 注意事项

1. **类型唯一性**: Setter 类型必须唯一，后注册的会覆盖先注册的
2. **组件要求**: 组件类型的 Setter 必须是 React 组件
3. **初始化**: `initValue` 和 `onInit` 是可选的，只在对象格式中有效
4. **属性传递**: Setter 会接收 `props`，包含 `value`、`onChange` 等属性
5. **性能**: Setter 组件会被频繁渲染，注意性能优化

## 相关文件

- [`editor.ts`](./editor.md) - Editor 核心类，使用 SetterManager
- [`ioc-context.ts`](./ioc-context.md) - IOC 上下文

## 外部依赖

- `@alilc/lowcode-types` - 提供 Setter 相关类型定义
- `@alilc/lowcode-utils` - 提供工具函数

## 典型使用场景

1. **文本编辑**: 文本输入、文本域、富文本编辑器
2. **数值编辑**: 数字输入、滑块、步进器
3. **选择编辑**: 下拉选择、单选、多选、标签选择
4. **颜色编辑**: 颜色选择器、颜色预设
5. **日期编辑**: 日期选择器、时间选择器、日期范围选择器
6. **复杂表单**: 多字段表单、动态表单、嵌套表单
7. **自定义编辑**: 任何自定义的属性编辑器
