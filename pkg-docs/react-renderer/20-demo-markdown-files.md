# Demo Markdown 文件功能说明

## 文件路径

- `packages/react-renderer/demo/list.md`
- `packages/react-renderer/demo/table.md`
- `packages/react-renderer/demo/compose.md`
- `packages/react-renderer/demo/dataSource.md`
- `packages/react-renderer/demo/i18n.md`

## 功能概述

Demo Markdown 文件是 React Renderer 模块的示例文档，展示了如何使用 React Renderer 渲染不同类型的低代码 Schema。每个文件都包含完整的示例代码和使用说明。

## 文件列表

### 1. list.md - 列表示例

**文件路径**: [`demo/list.md`](packages/react-renderer/demo/list.md)

**功能**: 展示如何使用 React Renderer 渲染列表类型的 Schema。

**元数据**:
```markdown
---
title: 列表
order: 1
---
```

**示例代码**:
```jsx
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import schema from './schemas/list';
import components from './config/components/index';
import utils from './config/utils';
import constants from './config/constants';

class Demo extends PureComponent {
  static displayName = 'renderer-demo';
  render() {
    return (
      <div className="demo">
        <ReactRenderer
          key={schema.fileName}
          schema={schema}
          components={components}
          appHelper={{
            utils,
            constants
          }}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <Demo />
), mountNode);
```

**代码结构说明**:

| 部分 | 说明 |
|------|------|
| 导入依赖 | 导入 React、ReactDOM、ReactRenderer、schema、components、utils、constants |
| Demo 组件 | 定义 Demo 组件，继承 PureComponent |
| ReactRenderer | 使用 ReactRenderer 渲染 Schema |
| appHelper | 传递 utils 和 constants 到 appHelper |
| ReactDOM.render | 渲染 Demo 组件到 DOM |

### 2. table.md - 表格示例

**文件路径**: [`demo/table.md`](packages/react-renderer/demo/table.md)

**功能**: 展示如何使用 React Renderer 渲染表格类型的 Schema。

**元数据**:
```markdown
---
title: 表格
order: 1
---
```

**示例代码**: 与 list.md 相同，只是导入的 schema 不同。

**代码结构**: 与 list.md 相同。

### 3. compose.md - 复杂组件示例

**文件路径**: [`demo/compose.md`](packages/react-renderer/demo/compose.md)

**功能**: 展示如何使用 React Renderer 渲染复杂组件类型的 Schema。

**元数据**:
```markdown
---
title: 复杂组件
order: 2
---
```

**示例代码**: 与 list.md 相同，只是导入的 schema 不同。

**代码结构**: 与 list.md 相同。

### 4. dataSource.md - 数据源使用示例

**文件路径**: [`demo/dataSource.md`](packages/react-renderer/demo/dataSource.md)

**功能**: 展示如何使用 React Renderer 渲染包含数据源的 Schema。

**元数据**:
```markdown
---
title: 数据源使用
order: 4
---
```

**示例代码**: 与 list.md 相同，只是导入的 schema 不同。

**代码结构**: 与 list.md 相同。

### 5. i18n.md - 国际化示例

**文件路径**: [`demo/i18n.md`](packages/react-renderer/demo/i18n.md)

**功能**: 展示如何使用 React Renderer 的国际化功能。

**元数据**:
```markdown
---
title: 国际化
order: 5
---
```

**示例代码**:
```jsx
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import schema from './schemas/i18n';
import components from './config/components/index';
import utils from './config/utils';
import constants from './config/constants';

class Demo extends PureComponent {
  static displayName = 'renderer-demo';
  render() {
    return (
      <div className="demo">
        <ReactRenderer
          key={schema.fileName}
          schema={schema}
          components={components}
          appHelper={{
            utils,
            constants
          }}
          locale="zh-CN"
          messages={{
            "hello": "你好",
            "china": "中国"
          }}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <Demo />
), mountNode);
```

**代码结构说明**:

| 部分 | 说明 |
|------|------|
| 导入依赖 | 导入 React、ReactDOM、ReactRenderer、schema、components、utils、constants |
| Demo 组件 | 定义 Demo 组件，继承 PureComponent |
| ReactRenderer | 使用 ReactRenderer 渲染 Schema |
| appHelper | 传递 utils 和 constants 到 appHelper |
| locale | 设置语言为 "zh-CN" |
| messages | 设置国际化消息 |
| ReactDOM.render | 渲染 Demo 组件到 DOM |

**国际化配置**:

| 属性 | 值 | 说明 |
|------|-----|------|
| `locale` | `"zh-CN"` | 语言代码 |
| `messages` | `{ "hello": "你好", "china": "中国" }` | 国际化消息映射 |

## 代码结构详解

### 1. 导入依赖

```jsx
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import schema from './schemas/list';
import components from './config/components/index';
import utils from './config/utils';
import constants from './config/constants';
```

**功能**: 导入所有必要的依赖。

**依赖说明**:

| 依赖 | 来源 | 用途 |
|------|------|------|
| `React` | `'react'` | React 核心库 |
| `PureComponent` | `'react'` | React 纯组件基类 |
| `ReactDOM` | `'react-dom'` | React DOM 渲染器 |
| `ReactRenderer` | `'@alilc/lowcode-react-renderer'` | React Renderer 组件 |
| `schema` | `'./schemas/list'` | 低代码 Schema |
| `components` | `'./config/components/index'` | 组件映射表 |
| `utils` | `'./config/utils'` | 工具函数 |
| `constants` | `'./config/constants'` | 常量定义 |

### 2. Demo 组件

```jsx
class Demo extends PureComponent {
  static displayName = 'renderer-demo';
  render() {
    return (
      <div className="demo">
        <ReactRenderer
          key={schema.fileName}
          schema={schema}
          components={components}
          appHelper={{
            utils,
            constants
          }}
        />
      </div>
    );
  }
}
```

**功能**: 定义 Demo 组件。

**组件说明**:

| 属性 | 说明 |
|------|------|
| `displayName` | 组件显示名称 |
| `render` | 渲染方法 |

### 3. ReactRenderer 组件

```jsx
<ReactRenderer
  key={schema.fileName}
  schema={schema}
  components={components}
  appHelper={{
    utils,
    constants
  }}
/>
```

**功能**: 使用 ReactRenderer 渲染 Schema。

**Props 说明**:

| 属性 | 值 | 说明 |
|------|-----|------|
| `key` | `schema.fileName` | React key，用于优化渲染 |
| `schema` | `schema` | 低代码 Schema 定义 |
| `components` | `components` | 组件映射表 |
| `appHelper` | `{ utils, constants }` | 应用辅助对象 |

### 4. ReactDOM.render

```jsx
ReactDOM.render((
  <Demo />
), mountNode);
```

**功能**: 渲染 Demo 组件到 DOM。

**参数说明**:

| 参数 | 说明 |
|------|------|
| `<Demo />` | 要渲染的 React 元素 |
| `mountNode` | DOM 节点 |

## 国际化功能

### 1. locale 属性

```jsx
locale="zh-CN"
```

**功能**: 设置语言代码。

**常用语言代码**:

| 语言代码 | 语言 |
|---------|------|
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `en-US` | 英语（美国） |
| `en-GB` | 英语（英国） |
| `ja-JP` | 日语 |
| `ko-KR` | 韩语 |

### 2. messages 属性

```jsx
messages={{
  "hello": "你好",
  "china": "中国"
}}
```

**功能**: 设置国际化消息映射。

**消息格式**:

```javascript
{
  "key1": "value1",
  "key2": "value2",
  // ...
}
```

**使用方式**:

在 Schema 中使用国际化消息：

```javascript
{
  "componentName": "Text",
  "props": {
    "text": {
      "type": "i18n",
      "key": "hello"
    }
  }
}
```

## 使用场景

### 1. 列表渲染

```jsx
import schema from './schemas/list';

<ReactRenderer
  schema={schema}
  components={components}
  appHelper={{ utils, constants }}
/>
```

### 2. 表格渲染

```jsx
import schema from './schemas/table';

<ReactRenderer
  schema={schema}
  components={components}
  appHelper={{ utils, constants }}
/>
```

### 3. 复杂组件渲染

```jsx
import schema from './schemas/compose';

<ReactRenderer
  schema={schema}
  components={components}
  appHelper={{ utils, constants }}
/>
```

### 4. 数据源使用

```jsx
import schema from './schemas/dataSource';

<ReactRenderer
  schema={schema}
  components={components}
  appHelper={{ utils, constants }}
/>
```

### 5. 国际化使用

```jsx
import schema from './schemas/i18n';

<ReactRenderer
  schema={schema}
  components={components}
  appHelper={{ utils, constants }}
  locale="zh-CN"
  messages={{
    "hello": "你好",
    "china": "中国"
  }}
/>
```

## 设计模式

### 1. PureComponent 模式

```jsx
class Demo extends PureComponent
```

**优点**:
- 自动优化渲染
- 减少不必要的重新渲染
- 提高性能

### 2. 组件组合模式

```jsx
<div className="demo">
  <ReactRenderer ... />
</div>
```

**优点**:
- 灵活组合
- 便于布局
- 易于样式控制

### 3. 依赖注入模式

```jsx
appHelper={{
  utils,
  constants
}}
```

**优点**:
- 解耦依赖
- 便于测试
- 提高可维护性

## 最佳实践

### 1. 组件命名

- **清晰明确**: 使用清晰的组件名称
- **displayName**: 设置 displayName 便于调试
- **语义化**: 使用语义化的名称

### 2. 性能优化

- **PureComponent**: 使用 PureComponent 优化性能
- **key 属性**: 正确使用 key 属性
- **避免不必要的渲染**: 避免不必要的渲染

### 3. 国际化

- **语言代码**: 使用标准的语言代码
- **消息管理**: 集中管理国际化消息
- **默认值**: 提供默认值

### 4. 错误处理

- **错误边界**: 使用错误边界捕获错误
- **加载状态**: 显示加载状态
- **错误提示**: 显示错误提示

## 常见问题

### 1. Schema 不渲染

**问题**: Schema 不渲染

**解决方案**:
- 检查 Schema 格式是否正确
- 确认组件映射是否正确
- 验证组件是否正确导入

### 2. 国际化不生效

**问题**: 国际化不生效

**解决方案**:
- 检查 locale 属性是否正确
- 确认 messages 映射是否正确
- 验证 Schema 中是否使用国际化

### 3. 性能问题

**问题**: 渲染性能差

**解决方案**:
- 使用 PureComponent 优化
- 正确使用 key 属性
- 优化组件结构

## 相关文件

- [`demo/config/components/index.js`](packages/react-renderer/demo/config/components/index.js): 组件导出
- [`demo/config/utils.js`](packages/react-renderer/demo/config/utils.js): 工具函数
- [`demo/config/constants.js`](packages/react-renderer/demo/config/constants.js): 常量定义

## 总结

Demo Markdown 文件展示了如何使用 React Renderer 渲染不同类型的低代码 Schema，包括列表、表格、复杂组件、数据源和国际化等场景。这些示例提供了完整的代码结构和使用说明，为开发者提供了清晰的参考。
