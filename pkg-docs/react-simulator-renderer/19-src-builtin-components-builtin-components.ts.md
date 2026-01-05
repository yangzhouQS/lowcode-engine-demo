# builtin-components.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/builtin-components/builtin-components.ts`

## 功能概述

该文件定义了低代码引擎模拟器中的内置 HTML 元素组件系统。它为常见的 HTML 标签创建 React 组件包装器，并定义了组件的元数据、事件支持和嵌套规则。这些内置组件用于在设计器中模拟和渲染标准的 HTML 元素。

## 主要功能

1. **事件定义**: 定义了所有支持的 React 事件类型及其描述
2. **HTML 元素 Mock**: 为 HTML 块级元素和行内元素创建 React 组件包装器
3. **组件元数据**: 为每个 HTML 元素定义配置元数据，包括是否为容器、嵌套规则等
4. **嵌套规则**: 定义了 HTML 元素的嵌套约束，确保符合 HTML 规范
5. **样式支持**: 为组件添加 `lc-block-container` 类名，支持自定义样式

## 代码结构

### 1. 导入依赖

```typescript
import { ReactElement, createElement, ReactType } from 'react';
import classNames from 'classnames';
```

**说明**:
- `ReactElement`, `createElement`, `ReactType`: React 核心类型和函数
- `classNames`: 用于合并 CSS 类名的工具库

### 2. 支持的事件列表

```typescript
const supportedEvents = [
  // MouseEvents (鼠标事件)
  {
    name: 'onClick',
    description: '点击时',
  },
  {
    name: 'onDoubleClick',
    description: '双击时',
  },
  {
    name: 'onMouseDown',
    description: '鼠标按下',
  },
  {
    name: 'onMouseEnter',
    description: '鼠标进入',
  },
  {
    name: 'onMouseMove',
    description: '鼠标移动',
  },
  {
    name: 'onMouseOut',
    description: '鼠标移出',
  },
  {
    name: 'onMouseOver',
    description: '鼠标悬停',
  },
  {
    name: 'onMouseUp',
    description: '鼠标松开',
  },
  // Focus Events (焦点事件)
  {
    name: 'onFocus',
    description: '获得焦点',
    snippet: '',
  },
  {
    name: 'onBlur',
    description: '失去焦点',
    snippet: '',
  },
  // Form Events (表单事件)
  {
    name: 'onChange',
    description: '值改变时',
    snippet: '',
  },
  {
    name: 'onSelect',
    description: '选择',
  },
  {
    name: 'onInput',
    description: '输入',
    snippet: '',
  },
  {
    name: 'onReset',
    description: '重置',
    snippet: '',
  },
  {
    name: 'onSubmit',
    description: '提交',
    snippet: '',
  },
  // Clipboard Events (剪贴板事件)
  {
    name: 'onCopy',
    description: '复制',
    snippet: '',
  },
  {
    name: 'onCut',
    description: '剪切',
    snippet: '',
  },
  {
    name: 'onPaste',
    description: '粘贴',
    snippet: '',
  },
  // Keyboard Events (键盘事件)
  {
    name: 'onKeyDown',
    description: '键盘按下',
    snippet: '',
  },
  {
    name: 'onKeyPress',
    description: '键盘按下并释放',
    snippet: '',
  },
  {
    name: 'onKeyUp',
    description: '键盘松开',
    snippet: '',
  },
  // Touch Events (触摸事件)
  {
    name: 'onTouchCancel',
    description: '触摸退出',
    snippet: '',
  },
  {
    name: 'onTouchEnd',
    description: '触摸结束',
    snippet: '',
  },
  {
    name: 'onTouchMove',
    description: '触摸移动',
    snippet: '',
  },
  {
    name: 'onTouchStart',
    description: '触摸开始',
    snippet: '',
  },
  // UI Events (UI 事件)
  {
    name: 'onScroll',
    description: '滚动',
    snippet: '',
  },
  {
    name: 'onLoad',
    description: '加载完毕',
    snippet: '',
  },
  {
    name: 'onWheel',
    description: '滚轮事件',
    snippet: '',
  },
  // Animation Events (动画事件)
  {
    name: 'onAnimationStart',
    description: '动画开始',
  },
  {
    name: 'onAnimationEnd',
    description: '动画结束',
  },
];
```

**说明**:
- 定义了 28 个支持的事件，覆盖了鼠标、焦点、表单、剪贴板、键盘、触摸、UI 和动画事件
- 每个事件都有 `name` 和 `description` 属性
- 部分事件包含 `snippet` 属性（虽然当前为空字符串）
- 这些事件会在组件的元数据中注册，供设计器使用

### 3. 内置组件缓存

```typescript
// eslint-disable-next-line func-call-spacing
const builtinComponents = new Map<string, (props: any) => ReactElement>();
```

**说明**:
- 使用 `Map` 缓存已创建的组件
- 键为 HTML 标签名，值为 React 组件函数
- 避免重复创建相同的组件

### 4. 获取块级元素组件

```typescript
function getBlockElement(tag: string): (props: any) => ReactElement {
  if (builtinComponents.has(tag)) {
    return builtinComponents.get(tag)!;
  }
  const mock = ({ className, children, ...rest }: any = {}) => {
    const props = {
      ...rest,
      className: classNames('lc-block-container', className),
    };
    return createElement(tag, props, children);
  };

  mock.metadata = {
    componentName: tag,
    // selfControlled: true,
    configure: {
      props: [],
      events: {
        supportedEvents,
      },
      styles: {
        supportClassName: true,
        supportInlineStyle: true,
      },
      component: {
        ...metasMap[tag],
      },
    },
  };

  builtinComponents.set(tag, mock);
  return mock;
}
```

**参数**:
- `tag`: HTML 标签名（如 'div', 'p', 'h1' 等）

**返回值**:
- React 组件函数，接受 props 并返回 ReactElement

**功能说明**:
1. **缓存检查**: 首先检查缓存中是否已存在该标签的组件
2. **创建 Mock 组件**: 如果不存在，创建一个新的 React 组件
   - 接收 `className`, `children` 和其他 props
   - 使用 `classNames` 合并 `lc-block-container` 类和自定义类名
   - 使用 `createElement` 创建对应的 HTML 元素
3. **添加元数据**: 为组件添加 `metadata` 属性，包含:
   - `componentName`: 组件名称（标签名）
   - `configure`: 配置对象
     - `props`: 属性配置（空数组）
     - `events`: 事件配置，包含支持的事件列表
     - `styles`: 样式配置，支持类名和内联样式
     - `component`: 组件元数据，从 `metasMap` 获取
4. **缓存组件**: 将创建的组件存入缓存
5. **返回组件**: 返回创建的组件函数

**注意事项**:
- 所有块级元素都会添加 `lc-block-container` 类名
- 组件的元数据会被设计器用于生成属性配置面板
- `metasMap[tag]` 必须存在，否则元数据为空对象

### 5. HTML 块级元素列表

```typescript
const HTMLBlock = [
  'div',
  'p',
  'article',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'aside',
  'blockquote',
  'footer',
  'form',
  'header',
  'table',
  'tbody',
  'section',
  'ul',
  'li',
];
```

**说明**:
- 定义了 19 个 HTML 块级元素
- 这些元素会被包装为 React 组件
- 使用 `getBlockElement` 函数创建组件

### 6. HTML 行内元素列表

```typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HTMLInlineBlock = ['a', 'b', 'span', 'em'];
```

**说明**:
- 定义了 4 个 HTML 行内元素
- 当前未被使用（被 eslint 标记为未使用）
- 可能用于未来的扩展

### 7. 获取固有组件

```typescript
export function getIntrinsicMock(tag: string): ReactType {
  if (HTMLBlock.indexOf(tag) > -1) {
    return getBlockElement(tag);
  }

  return tag as any;
}
```

**参数**:
- `tag`: HTML 标签名

**返回值**:
- `ReactType`: React 组件类型

**功能说明**:
1. **检查是否为块级元素**: 如果标签在 `HTMLBlock` 列表中
2. **返回块级元素组件**: 调用 `getBlockElement` 创建并返回组件
3. **返回标签本身**: 如果不是块级元素，直接返回标签字符串

**使用示例**:
```typescript
// 获取 div 组件
const DivComponent = getIntrinsicMock('div');
// DivComponent 是一个 React 组件函数

// 获取 span 组件
const SpanComponent = getIntrinsicMock('span');
// SpanComponent 是字符串 'span'
```

### 8. 组件元数据映射表

```typescript
const metasMap: any = {
  div: {
    isContainer: true,
    nesting: {
      ancestorBlacklist: 'p',
    },
  },
  ul: {
    isContainer: true,
    nesting: {
      childWhitelist: 'li',
    },
  },
  p: {
    isContainer: true,
    nesting: {
      ancestorBlacklist: 'button,p',
    },
  },
  li: {
    isContainer: true,
    nesting: {
      parentWhitelist: 'ui,ol',
    },
  },
  span: {
    isContainer: true,
    selfControlled: true,
  },
  a: {
    isContainer: true,
    nesting: {
      ancestorBlacklist: 'a',
    },
  },
  b: {
    isContainer: true,
  },
  strong: {
    isContainer: true,
  },
  em: {
    isContainer: true,
  },
  i: {
    isContainer: true,
  },
  form: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'form,button',
    },
  },
  table: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  caption: {
    isContainer: true,
    selfControlled: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  select: {
    isContainer: true,
    selfControlled: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  button: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  input: {
    isContainer: false,
    nestingRule: {
      ancestorBlacklist: 'button,h1,h2,h3,h4,h5,h6',
    },
  },
  textarea: {
    isContainer: false,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  image: {
    isContainer: false,
  },
  canvas: {
    isContainer: false,
  },
  br: {
    isContainer: false,
  },
  h1: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h2: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h3: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h4: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h5: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  h6: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  article: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  aside: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  footer: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  header: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  blockquote: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  address: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  section: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'p,h1,h2,h3,h4,h5,h6,button',
    },
  },
  summary: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
  nav: {
    isContainer: true,
    nestingRule: {
      ancestorBlacklist: 'button',
    },
  },
};
```

**元数据属性说明**:

1. **isContainer**: 布尔值
   - `true`: 该元素可以作为容器，包含子元素
   - `false`: 该元素不能包含子元素（如 `img`, `br` 等）

2. **selfControlled**: 布尔值
   - `true`: 该元素自控制，不需要额外的控制逻辑
   - 未设置: 使用默认行为

3. **nesting** / **nestingRule**: 嵌套规则对象
   - `ancestorBlacklist`: 祖先黑名单，该元素不能作为这些元素的子元素
   - `childWhitelist`: 子元素白名单，该元素只能包含这些子元素
   - `parentWhitelist`: 父元素白名单，该元素只能作为这些元素的子元素

**嵌套规则示例**:

1. **div**:
   ```typescript
   {
     isContainer: true,
     nesting: {
       ancestorBlacklist: 'p',
     },
   }
   ```
   - div 是容器
   - 不能作为 p 元素的子元素（HTML 规范不允许 p 包含块级元素）

2. **ul**:
   ```typescript
   {
     isContainer: true,
     nesting: {
       childWhitelist: 'li',
     },
   }
   ```
   - ul 是容器
   - 只能包含 li 元素

3. **p**:
   ```typescript
   {
     isContainer: true,
     nesting: {
       ancestorBlacklist: 'button,p',
     },
   }
   ```
   - p 是容器
   - 不能作为 button 或另一个 p 的子元素

4. **input**:
   ```typescript
   {
     isContainer: false,
     nestingRule: {
       ancestorBlacklist: 'button,h1,h2,h3,h4,h5,h6',
     },
   }
   ```
   - input 不是容器
   - 不能作为 button 或标题元素的子元素

## 使用示例

### 基本使用

```typescript
import { getIntrinsicMock } from './builtin-components';

// 获取 div 组件
const Div = getIntrinsicMock('div');

// 使用组件
<Div className="my-class">
  <p>Hello World</p>
</Div>
```

### 在设计器中使用

```typescript
// 在模拟器中注册内置组件
import { getIntrinsicMock } from '@alilc/lowcode-react-simulator-renderer';

// 为常见的 HTML 标签注册组件
const components = {
  div: getIntrinsicMock('div'),
  p: getIntrinsicMock('p'),
  h1: getIntrinsicMock('h1'),
  h2: getIntrinsicMock('h2'),
  span: getIntrinsicMock('span'),
  a: getIntrinsicMock('a'),
  // ... 其他 HTML 元素
};

// 在渲染器中使用
<LowCodeRenderer
  components={components}
  schema={schema}
/>
```

### 访问组件元数据

```typescript
import { getIntrinsicMock } from './builtin-components';

const DivComponent = getIntrinsicMock('div');

// 访问组件元数据
console.log(DivComponent.metadata);
// 输出:
// {
//   componentName: 'div',
//   configure: {
//     props: [],
//     events: {
//       supportedEvents: [...]
//     },
//     styles: {
//       supportClassName: true,
//       supportInlineStyle: true
//     },
//     component: {
//       isContainer: true,
//       nesting: {
//         ancestorBlacklist: 'p'
//       }
//     }
//   }
// }
```

## 注意事项

1. **缓存机制**: 组件创建后会缓存，重复获取同一标签会返回缓存的组件
2. **类名添加**: 所有块级元素都会自动添加 `lc-block-container` 类名
3. **元数据完整性**: `metasMap` 中必须包含对应标签的元数据，否则组件元数据为空
4. **嵌套规则**: 设计器会根据嵌套规则限制组件的拖拽和放置
5. **事件支持**: 所有组件都支持 28 个预定义的事件
6. **样式支持**: 所有组件都支持类名和内联样式
7. **行内元素**: 当前 `HTMLInlineBlock` 列表未被使用，行内元素直接返回标签字符串

## 相关文件

- [`src/builtin-components/leaf.tsx`](../packages/react-simulator-renderer/src/builtin-components/leaf.tsx) - Leaf 组件
- [`src/builtin-components/slot.tsx`](../packages/react-simulator-renderer/src/builtin-components/slot.tsx) - Slot 组件
- [`src/renderer.ts`](../packages/react-simulator-renderer/src/renderer.ts) - 核心渲染器
- [`src/renderer-view.tsx`](../packages/react-simulator-renderer/src/renderer-view.tsx) - React 视图组件

## 最佳实践

1. **使用内置组件**: 在设计器中使用内置组件而不是直接使用 HTML 标签，以确保元数据和嵌套规则正确应用
2. **自定义组件**: 如果需要自定义组件，可以参考内置组件的元数据结构
3. **扩展事件列表**: 如需支持更多事件，可以在 `supportedEvents` 数组中添加
4. **添加新元素**: 如需支持更多 HTML 元素，在 `HTMLBlock` 和 `metasMap` 中添加相应配置
5. **嵌套规则**: 添加新元素时，务必定义正确的嵌套规则，避免违反 HTML 规范

## 总结

`builtin-components.ts` 文件是低代码引擎模拟器的核心组件之一，它为 HTML 元素提供了 React 组件包装器，并定义了完整的元数据和嵌套规则。通过这个文件，设计器能够：

1. 正确渲染 HTML 元素
2. 应用适当的样式和类名
3. 支持所有标准 React 事件
4. 强制执行 HTML 嵌套规则
5. 提供组件元数据供属性配置面板使用

这个文件的设计体现了低代码引擎的核心理念：通过元数据和规则驱动，提供可视化设计能力，同时保持与标准 Web 技术的兼容性。
