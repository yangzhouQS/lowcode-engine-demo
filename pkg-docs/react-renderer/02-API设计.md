# React Renderer API 设计文档

## 概述

本文档详细描述 `@alilc/lowcode-react-renderer` 模块的 API 接口设计，包括组件 Props、实例方法、类型定义等。

## ReactRenderer 组件

### 导入方式

```typescript
import ReactRenderer from '@alilc/lowcode-react-renderer';
```

### Props 接口

ReactRenderer 组件接受以下属性：

#### schema

- **类型**: `types.ISchema`
- **必需**: 是
- **描述**: 低代码描述的组件树结构，定义了要渲染的页面或组件的完整结构
- **示例**:

```typescript
const schema = {
  componentName: 'Page',
  id: 'node_dockcviv8fo1',
  props: {
    style: {
      padding: '0 5px 0 5px',
    },
  },
  fileName: 'test',
  dataSource: {
    list: [],
  },
  state: {
    text: 'outter',
    isShowDialog: false,
  },
  css: 'body {font-size: 12px;}',
  lifeCycles: {
    componentDidMount: {
      type: 'JSFunction',
      value: "function() { console.log('did mount'); }",
    },
  },
  methods: {
    testFunc: {
      type: 'JSFunction',
      value: "function() { console.log('test func'); }",
    },
  },
  children: [
    // 子组件定义
  ],
};

<ReactRenderer schema={schema} components={components} />
```

#### components

- **类型**: `Record<string, React.ComponentType>`
- **必需**: 是
- **描述**: 组件映射表，将 Schema 中的组件名映射到实际的 React 组件
- **示例**:

```typescript
import { Box, Breadcrumb, Form, Select, Input, Button, Table } from '@alifd/next';

const components = {
  Box,
  Breadcrumb,
  'Breadcrumb.Item': Breadcrumb.Item,
  Form,
  'Form.Item': Form.Item,
  Select,
  Input,
  Button,
  'Button.Group': Button.Group,
  Table,
};

<ReactRenderer schema={schema} components={components} />
```

#### appHelper

- **类型**: `{ utils?: any, constants?: any, [key: string]: any }`
- **必需**: 否
- **描述**: 应用辅助对象，提供工具函数、常量等辅助功能
- **示例**:

```typescript
import { Message } from '@alifd/next';
import moment from 'moment';

const utils = {
  Message,
  moment,
  test(msg) {
    this.Message.notice(msg);
  },
};

const constants = {
  name: 'renderer-demo',
};

<ReactRenderer
  schema={schema}
  components={components}
  appHelper={{
    utils,
    constants
  }}
/>
```

#### locale

- **类型**: `string`
- **必需**: 否
- **默认值**: 无
- **描述**: 国际化语言代码，如 'zh-CN'、'en-US' 等
- **示例**:

```typescript
<ReactRenderer
  schema={schema}
  components={components}
  locale="zh-CN"
/>
```

#### messages

- **类型**: `Record<string, string>`
- **必需**: 否
- **默认值**: `{}`
- **描述**: 国际化消息映射表，键为消息 ID，值为对应语言的文本
- **示例**:

```typescript
<ReactRenderer
  schema={schema}
  components={components}
  locale="zh-CN"
  messages={{
    "hello": "你好",
    "china": "中国",
    "welcome": "欢迎"
  }}
/>
```

### 实例方法

ReactRenderer 组件实例提供以下方法：

#### setState

- **签名**: `setState(state: types.IRendererState, callback?: () => void) => void`
- **描述**: 更新组件状态，触发重新渲染
- **参数**:
  - `state`: 要更新的状态对象
  - `callback`: 状态更新后的回调函数（可选）
- **示例**:

```typescript
// 在 Schema 的 methods 中使用
methods: {
  onClick: {
    type: 'JSFunction',
    value: 'function() { this.setState({ isShowDialog: true }) }',
  },
  closeDialog: {
    type: 'JSFunction',
    value: 'function() { this.setState({ isShowDialog: false }) }',
  },
}
```

#### forceUpdate

- **签名**: `forceUpdate(callback?: () => void) => void`
- **描述**: 强制组件重新渲染，不更新状态
- **参数**:
  - `callback`: 渲染完成后的回调函数（可选）
- **示例**:

```typescript
// 在 Schema 的 methods 中使用
methods: {
  refresh: {
    type: 'JSFunction',
    value: 'function() { this.forceUpdate() }',
  },
}
```

#### isValidComponent

- **签名**: `isValidComponent(obj: any) => boolean`
- **描述**: 验证对象是否为有效的 React 组件
- **参数**:
  - `obj`: 要验证的对象
- **返回值**: 如果是有效的 React 组件返回 `true`，否则返回 `false`
- **实现逻辑**:

```typescript
isValidComponent(obj: any) {
  return obj?.prototype?.isReactComponent || obj?.prototype instanceof Component;
}
```

### Context 支持

ReactRenderer 支持 React Context：

- **类型**: `ContextType<any>`
- **描述**: 组件的上下文对象，用于跨层级传递数据
- **示例**:

```typescript
// 在 ReactRenderer 内部
context: ContextType<any>;
```

### Refs 支持

ReactRenderer 支持 Refs 引用：

- **类型**: `{ [key: string]: ReactInstance }`
- **描述**: 组件的引用映射表，键为 ref 名称，值为对应的 React 实例
- **示例**:

```typescript
// 在 Schema 中定义 ref
props: {
  ref: 'outterView',
  autoLoading: true,
}

// 通过 ref 访问组件实例
this.refs.outterView
```

## 类型定义

### IRendererProps

渲染器组件的 Props 接口：

```typescript
interface IRendererProps {
  schema: ISchema;
  components: Record<string, React.ComponentType>;
  appHelper?: {
    utils?: any;
    constants?: any;
    [key: string]: any;
  };
  locale?: string;
  messages?: Record<string, string>;
}
```

### IRendererState

渲染器组件的 State 接口：

```typescript
interface IRendererState {
  [key: string]: any;
}
```

### IRenderComponent

渲染器组件的接口定义：

```typescript
interface IRenderComponent {
  new (props: IRendererProps, context: ContextType<any>): Component;
}
```

### ISchema

Schema 结构的基本接口（来自 renderer-core）：

```typescript
interface ISchema {
  componentName: string;
  id?: string;
  props?: Record<string, any>;
  fileName?: string;
  dataSource?: {
    list?: any[];
    [key: string]: any;
  };
  state?: Record<string, any>;
  css?: string;
  lifeCycles?: {
    componentDidMount?: JSFunction;
    componentWillUnmount?: JSFunction;
    [key: string]: JSFunction;
  };
  methods?: {
    [key: string]: JSFunction;
  };
  children?: ISchema | ISchema[];
}
```

### JSFunction

JavaScript 函数的描述对象：

```typescript
interface JSFunction {
  type: 'JSFunction';
  value: string;
}
```

## 使用示例

### 基础用法

```typescript
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import schema from './schema';
import components from './components';

class App extends PureComponent {
  render() {
    return (
      <ReactRenderer
        schema={schema}
        components={components}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 完整用法（带工具函数和国际化）

```typescript
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import schema from './schema';
import components from './components';
import utils from './utils';
import constants from './constants';

class App extends PureComponent {
  render() {
    return (
      <div className="app">
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

ReactDOM.render(<App />, document.getElementById('root'));
```

### 动态更新 Schema

```typescript
import React, { PureComponent } from 'react';
import ReactRenderer from '@alilc/lowcode-react-renderer';

class App extends PureComponent {
  state = {
    schema: initialSchema,
  };

  updateSchema = () => {
    this.setState({
      schema: updatedSchema,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.updateSchema}>更新 Schema</button>
        <ReactRenderer
          schema={this.state.schema}
          components={components}
        />
      </div>
    );
  }
}
```

## API 设计原则

1. **声明式**: 通过 Schema 声明式地描述组件结构
2. **组件化**: 将组件映射表作为参数传入，支持灵活的组件组合
3. **可扩展**: 通过 appHelper 提供扩展点，支持自定义工具函数和常量
4. **国际化**: 内置国际化支持，方便多语言应用开发
5. **类型安全**: 使用 TypeScript 提供完整的类型定义

## 注意事项

1. **components 参数必需**: 必须提供 components 参数，否则无法渲染任何组件
2. **Schema 格式**: Schema 必须符合低代码规范，包含 componentName 等必要字段
3. **组件验证**: 使用 isValidComponent 方法可以验证组件是否有效
4. **性能优化**: 使用 key 属性可以帮助 React 识别组件，提高渲染性能
5. **Ref 使用**: 在 Schema 中定义的 ref 可以通过 this.refs 访问对应的组件实例

## 相关文档

- [架构设计文档](./01-架构设计.md)
- [文件功能说明](./03-文件功能说明.md)
