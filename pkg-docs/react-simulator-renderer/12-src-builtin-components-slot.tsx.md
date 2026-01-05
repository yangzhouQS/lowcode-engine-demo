# src/builtin-components/slot.tsx 文档

## 文件路径

`packages/react-simulator-renderer/src/builtin-components/slot.tsx`

## 功能概述

该文件定义了 Slot 组件，这是一个插槽组件，用于内容分发。Slot 组件允许父组件向子组件传递内容，类似于 Vue 的插槽功能。

## 主要功能

1. **内容分发**: 允许父组件向子组件传递内容
2. **插槽标题**: 支持配置插槽标题
3. **插槽参数**: 支持配置插槽参数
4. **容器特性**: 标记为容器组件
5. **国际化支持**: 插槽标题支持国际化

## 代码分析

### 完整代码

```typescript
import { Component } from 'react';

class Slot extends Component {
  static displayName = 'Slot';

  static componentMetadata = {
    componentName: 'Slot',
    configure: {
      props: [
        {
          name: '___title',
          title: {
            type: 'i18n',
            'en-US': 'Slot Title',
            'zh-CN': '插槽标题',
          },
          setter: 'StringSetter',
          defaultValue: '插槽容器',
        },
        {
          name: '___params',
          title: {
            type: 'i18n',
            'en-US': 'Slot Params',
            'zh-CN': '插槽入参',
          },
          setter: {
            componentName: 'ArraySetter',
            props: {
              itemSetter: {
                componentName: 'StringSetter',
                props: {
                  placeholder: {
                    type: 'i18n',
                    'zh-CN': '参数名称',
                    'en-US': 'Argument Name',
                  },
                },
              },
            },
          },
        },
      ],
      component: {
        isContainer: true,
      },
      // events/className/style/general/directives
      supports: false,
    },
  };

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default Slot;
```

### 逐行解释

**第 1 行**:
```typescript
import { Component } from 'react';
```
- 从 React 导入 Component 基类
- 用于创建类组件

**第 3 行**:
```typescript
class Slot extends Component {
```
- 定义 Slot 类组件
- 继承自 React.Component
- 使用类组件语法

**第 4 行**:
```typescript
static displayName = 'Slot';
```
- 设置组件的显示名称
- 用于调试和错误信息
- 在 React DevTools 中显示

**第 6-50 行**:
```typescript
static componentMetadata = {
  componentName: 'Slot',
  configure: {
    props: [
      {
        name: '___title',
        title: {
          type: 'i18n',
          'en-US': 'Slot Title',
          'zh-CN': '插槽标题',
        },
        setter: 'StringSetter',
        defaultValue: '插槽容器',
      },
      {
        name: '___params',
        title: {
          type: 'i18n',
          'en-US': 'Slot Params',
          'zh-CN': '插槽入参',
        },
        setter: {
          componentName: 'ArraySetter',
          props: {
            itemSetter: {
              componentName: 'StringSetter',
              props: {
                placeholder: {
                  type: 'i18n',
                  'zh-CN': '参数名称',
                  'en-US': 'Argument Name',
                },
              },
            },
          },
        },
      },
    ],
    component: {
      isContainer: true,
    },
    // events/className/style/general/directives
    supports: false,
  },
};
```
- 定义组件的元数据
- `componentName`: 组件名称为 'Slot'
- `configure.props`: 配置属性
  - `___title`: 插槽标题
    - `title`: 属性标题，支持国际化
    - `setter`: 使用 StringSetter 作为属性编辑器
    - `defaultValue`: 默认值为 '插槽容器'
  - `___params`: 插槽参数
    - `title`: 属性标题，支持国际化
    - `setter`: 使用 ArraySetter 作为属性编辑器
    - `itemSetter`: 数组项使用 StringSetter
    - `placeholder`: 占位符，支持国际化
- `configure.component.isContainer`: 标记为容器组件
- `supports`: 设置为 false，表示不支持某些功能

**第 52-55 行**:
```typescript
render() {
  const { children } = this.props;
  return <>{children}</>;
}
```
- 实现 render 方法
- 从 props 中解构 children
- 使用 React Fragment 包裹 children
- Fragment 不会在 DOM 中添加额外的节点

**第 58 行**:
```typescript
export default Slot;
```
- 导出 Slot 组件作为默认导出

## 使用示例

### 基本使用

```typescript
import Slot from './slot';

ReactDOM.render(
  <Slot ___title="我的插槽">
    <div>这是插槽内容</div>
  </Slot>,
  document.getElementById('app')
);
```

### 在低代码中使用

```json
{
  "componentName": "Slot",
  "props": {
    "___title": "我的插槽",
    "___params": ["param1", "param2"]
  },
  "children": [
    {
      "componentName": "Div",
      "children": "这是插槽内容"
    }
  ]
}
```

### 国际化示例

```typescript
// 英文环境
<Slot ___title="Slot Title" />

// 中文环境
<Slot ___title="插槽标题" />
```

## 注意事项

1. **Fragment 使用**: 使用 Fragment 包裹 children，不会添加额外的 DOM 节点
2. **属性命名**: 插槽属性使用 `___` 前缀，避免与普通属性冲突
3. **容器标记**: 标记为容器组件，可以在其中放置其他组件
4. **国际化**: 插槽标题支持国际化
5. **参数配置**: 插槽参数使用数组配置

## 相关文件

- **[`leaf.tsx`](11-src-builtin-components-leaf.tsx.md)**: Leaf 叶子组件
- **[`builtin-components.ts`](14-src-builtin-components-builtin-components.ts.md)**: 内置组件定义

## 设计模式

### 插槽模式

Slot 组件实现了插槽模式，允许内容分发：

```typescript
render() {
  return <>{children}</>;
}
```

### 元数据模式

使用静态属性定义组件元数据：

```typescript
static componentMetadata = {
  componentName: 'Slot',
  configure: { ... }
};
```

### 国际化模式

使用 i18n 类型支持国际化：

```typescript
title: {
  type: 'i18n',
  'en-US': 'Slot Title',
  'zh-CN': '插槽标题',
}
```

## 最佳实践

1. **Fragment 使用**: 使用 Fragment 包裹 children，避免添加额外的 DOM 节点
2. **属性命名**: 使用 `___` 前缀避免属性冲突
3. **国际化**: 所有用户可见的文本都应该支持国际化
4. **元数据**: 为组件提供完整的元数据
5. **文档**: 为组件添加文档说明

## 总结

`slot.tsx` 定义了一个 Slot 插槽组件，用于内容分发。该组件允许父组件向子组件传递内容，类似于 Vue 的插槽功能。组件提供了完整的元数据配置，支持国际化和参数配置。

主要特点：
- **内容分发**: 允许父组件向子组件传递内容
- **Fragment 使用**: 使用 Fragment 包裹 children，不添加额外的 DOM 节点
- **元数据**: 提供完整的组件元数据
- **国际化**: 插槽标题支持国际化
- **参数配置**: 支持配置插槽参数
- **容器标记**: 标记为容器组件
