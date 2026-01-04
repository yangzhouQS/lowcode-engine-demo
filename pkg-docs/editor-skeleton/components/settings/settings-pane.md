# SettingsPane 模块文档

## 文件路径

`packages/editor-skeleton/src/components/settings/settings-pane.tsx`

## 功能概述

`SettingsPane` 组件是设置面板的主组件，负责渲染组件的属性配置界面。它支持多种显示模式（accordion、inline、block、plain、popup、entry），并集成了 StageBox 用于多级页面导航。

## 主要功能

### 1. 设置字段渲染

渲染组件的所有设置字段，包括：
- 普通字段
- 分组字段
- 自定义视图

### 2. 多种显示模式

支持多种字段显示模式：
- `accordion` - 手风琴式折叠
- `inline` - 内联显示
- `block` - 块级显示
- `plain` - 纯文本显示
- `popup` - 弹窗显示
- `entry` - 入口式显示

### 3. Stage 集成

集成 StageBox，支持多级页面导航：
- 点击入口字段打开新的 Stage
- 支持返回上一级
- 支持返回根级

### 4. 值状态管理

管理字段的值状态：
- 多值状态（多个组件选中）
- 无值状态
- 单值状态

### 5. 初始值处理

自动处理字段的初始值：
- 在组件挂载时设置初始值
- 支持函数形式的初始值

## 组件定义

```typescript
export type SettingsPaneProps = {
  target: ISettingTopEntry | ISettingField;
  usePopup?: boolean;
};

@observer
export class SettingsPane extends Component<SettingsPaneProps>
```

## 属性

### `target: ISettingTopEntry | ISettingField`

设置目标，必需属性。可以是：
- `ISettingTopEntry` - 顶级设置入口
- `ISettingField` - 设置字段

### `usePopup?: boolean`

是否使用弹窗模式，默认为 `true`。

## 内部组件

### SettingFieldView

设置字段视图组件，负责渲染单个设置字段。

**主要功能:**
- 计算字段的可见性
- 获取字段的信息（setter、初始值等）
- 处理值的初始化
- 渲染字段内容

**关键方法:**
```typescript
get visible(): boolean {
  const { extraProps } = this.field;
  const { condition } = extraProps;
  try {
    return typeof condition === 'function' ? condition(this.field.internalToShellField()) !== false : true;
  } catch (error) {
    console.error('exception when condition (hidden) is excuted', error);
  }
  return true;
}

get setterInfo(): {
  setterProps: any;
  initialValue: any;
  setterType: any;
}
```

### SettingGroupView

设置分组视图组件，负责渲染分组字段。

**主要功能:**
- 计算分组的可见性
- 渲染分组内的所有字段
- 支持折叠/展开

## 方法

### `createSettingFieldView(field: ISettingField | IPublicTypeCustomView, fieldEntry: ISettingEntry, index?: number): ReactNode`

创建设置字段视图。

**参数:**
- `field`: 设置字段或自定义视图
- `fieldEntry`: 设置入口
- `index`: 索引

**返回值:** React 元素

**行为:**
- 如果是设置字段且是分组，返回 `SettingGroupView`
- 如果是设置字段，返回 `SettingFieldView`
- 否则，返回自定义视图内容

### `handleClick(e: MouseEvent): void`

处理点击事件，用于 Stage 导航。

**参数:**
- `e`: 鼠标事件

**行为:**
- 查找点击目标的 `data-stage-target` 属性
- 如果找到，导航到对应的 Stage

### `popStage(): void`

返回上一个 Stage。

### `render(): JSX.Element`

渲染设置面板。

**返回值:** 设置面板的 JSX 元素

## 使用示例

### 基本使用

```typescript
import { SettingsPane } from '@alilc/lowcode-editor-skeleton';

<SettingsPane
  target={settingEntry}
  usePopup={true}
/>
```

### 不使用弹窗

```typescript
<SettingsPane
  target={settingEntry}
  usePopup={false}
/>
```

### 自定义字段视图

```typescript
const customView = {
  type: 'CustomView',
  render: (props) => {
    return <div>自定义内容</div>;
  },
};

const field = {
  name: 'customField',
  type: 'CustomView',
  ...customView,
};

<SettingsPane target={field} />
```

## 字段配置

### 普通字段

```typescript
{
  name: 'title',
  title: '标题',
  type: 'string',
  setter: 'StringSetter',
}
```

### 分组字段

```typescript
{
  name: 'advanced',
  title: '高级设置',
  type: 'group',
  items: [
    {
      name: 'prop1',
      title: '属性 1',
      setter: 'StringSetter',
    },
    {
      name: 'prop2',
      title: '属性 2',
      setter: 'NumberSetter',
    },
  ],
}
```

### 入口字段

```typescript
{
  name: 'nested',
  title: '嵌套设置',
  display: 'entry',
  items: [
    {
      name: 'nestedProp',
      title: '嵌套属性',
      setter: 'StringSetter',
    },
  ],
}
```

## Setter 配置

### 基本 Setter

```typescript
{
  name: 'myProp',
  setter: 'StringSetter',
}
```

### 带 Props 的 Setter

```typescript
{
  name: 'myProp',
  setter: {
    componentName: 'StringSetter',
    props: {
      placeholder: '请输入',
      multiline: true,
    },
  },
}
```

### 带 InitialValue 的 Setter

```typescript
{
  name: 'myProp',
  setter: {
    componentName: 'NumberSetter',
    initialValue: 10,
  },
}
```

### MixedSetter

```typescript
{
  name: 'myProp',
  setter: {
    componentName: 'MixedSetter',
    props: {
      setters: [
        'StringSetter',
        'NumberSetter',
        'VariableSetter',
      ],
    },
  },
}
```

## 值状态

字段的值状态用于表示当前值的类型：

- `-1` - 多值（多个组件选中，值不同）
- `0` - 无值
- `1` - 类似值（多个组件选中，值类型相同）
- `2` - 单值
- `10` - 必填

## 初始值处理

### 静态初始值

```typescript
{
  name: 'myProp',
  setter: {
    componentName: 'StringSetter',
    initialValue: 'default value',
  },
}
```

### 函数形式的初始值

```typescript
{
  name: 'myProp',
  setter: {
    componentName: 'ObjectSetter',
    initialValue: (field) => {
      return {
        prop1: 'value1',
        prop2: 'value2',
      };
    },
  },
}
```

## 条件显示

可以通过 `condition` 函数控制字段的显示：

```typescript
{
  name: 'conditionalProp',
  title: '条件属性',
  condition: (field) => {
    // 根据其他字段的值决定是否显示
    return field.parent.getPropValue('showConditional');
  },
  setter: 'StringSetter',
}
```

## Stage 导航

SettingsPane 支持 Stage 导航，用于多级页面：

### 入口字段

```typescript
{
  name: 'nestedSettings',
  title: '嵌套设置',
  display: 'entry',
  items: [
    // 子字段
  ],
}
```

点击入口字段会打开新的 Stage。

### Stage 目标

字段可以通过 `data-stage-target` 属性指定 Stage 目标：

```typescript
<div data-stage-target="myStage">
  点击打开 Stage
</div>
```

## 弹窗集成

SettingsPane 集成了 PopupService，支持弹窗模式：

```typescript
<SettingsPane
  target={settingEntry}
  usePopup={true}
/>
```

在 `usePopup` 模式下，某些字段（如 `popup` 类型）会以弹窗形式显示。

## 注意事项

1. **目标类型**: `target` 可以是 `ISettingTopEntry` 或 `ISettingField`
2. **弹窗模式**: `usePopup` 控制是否使用弹窗模式
3. **Stage 导航**: 点击入口字段会打开新的 Stage
4. **初始值**: 初始值在组件挂载时自动设置
5. **条件显示**: 通过 `condition` 函数控制字段显示
6. **值状态**: 字段的值状态影响渲染样式

## 相关文件

- [`settings-primary-pane.tsx`](./settings-primary-pane.md) - 主设置面板
- [`main.ts`](./main.md) - 设置面板主逻辑
- [`../field/index.ts`](../field/index.md) - 字段组件
- [`../popup/index.tsx`](../popup/index.md) - 弹窗组件
- [`../stage-box/index.ts`](../stage-box/index.md) - Stage 盒子组件

## 外部依赖

- `@alilc/lowcode-designer` - 提供 `ISettingEntry`、`ISettingField` 等类型
- `@alilc/lowcode-types` - 提供 `IPublicApiSetters`、`IPublicTypeCustomView` 等类型
- `@alilc/lowcode-utils` - 提供 `createContent`、`isJSSlot`、`isSetterConfig` 等工具函数
