# tests/fixtures/schema/basic.ts 文件功能说明

## 文件路径

`packages/react-renderer/tests/fixtures/schema/basic.ts`

## 功能概述

[`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts) 是 React Renderer 模块的测试 Schema 文件，定义了一个完整的低代码页面结构，用于测试 React Renderer 的渲染能力。该 Schema 包含了页面、组件、状态、方法、生命周期等完整的低代码元素。

## 主要功能

1. **页面定义**: 定义完整的页面结构和组件树
2. **状态管理**: 定义页面状态和初始值
3. **方法定义**: 定义页面方法和事件处理函数
4. **生命周期**: 定义组件生命周期钩子
5. **样式定义**: 定义页面样式和组件样式
6. **数据源**: 定义页面数据源

## Schema 结构

```typescript
export default {
  componentName: 'Page',
  id: 'node_dockcviv8fo1',
  props: { /* 页面属性 */ },
  fileName: 'test',
  dataSource: { /* 数据源 */ },
  state: { /* 页面状态 */ },
  css: '/* CSS 样式 */',
  lifeCycles: { /* 生命周期钩子 */ },
  methods: { /* 页面方法 */ },
  children: [ /* 子组件 */ ],
};
```

## 详细说明

### 1. 根节点配置

#### 1.1 componentName

```typescript
componentName: 'Page',
```

**功能**: 定义根组件类型。

**说明**:
- `Page` 表示这是一个页面组件
- 对应 [`src/index.ts`](packages/react-renderer/src/index.ts:10) 中注册的 `PageRenderer`

#### 1.2 id

```typescript
id: 'node_dockcviv8fo1',
```

**功能**: 定义组件的唯一标识符。

**说明**:
- 用于在编辑器中标识组件
- 用于组件引用和查找
- 在运行时可用于调试

#### 1.3 props

```typescript
props: {
  ref: 'outterView',
  autoLoading: true,
  style: {
    padding: '0 5px 0 5px',
  },
},
```

**功能**: 定义组件属性。

**属性说明**:

| 属性 | 值 | 说明 |
|------|-----|------|
| `ref` | `'outterView'` | 组件引用名称 |
| `autoLoading` | `true` | 自动加载 |
| `style` | `{ padding: '0 5px 0 5px' }` | 组件样式 |

#### 1.4 fileName

```typescript
fileName: 'test',
```

**功能**: 定义文件名。

**说明**:
- 用于代码生成时的文件名
- 在编辑器中显示的文件名

### 2. 数据源配置

```typescript
dataSource: {
  list: [],
},
```

**功能**: 定义页面数据源。

**说明**:
- `list` 是一个空数组
- 可用于存储页面数据
- 可与数据源引擎集成

### 3. 状态管理

```typescript
state: {
  text: 'outter',
  isShowDialog: false,
},
```

**功能**: 定义页面状态。

**状态说明**:

| 状态 | 初始值 | 用途 |
|------|--------|------|
| `text` | `'outter'` | 文本状态 |
| `isShowDialog` | `false` | 对话框显示状态 |

**使用方式**:
```javascript
// 在方法中访问和修改状态
this.state.text // 访问状态
this.setState({ isShowDialog: true }) // 修改状态
```

### 4. 样式定义

```typescript
css: 'body {font-size: 12px;} .botton{width:100px;color:#ff00ff}',
```

**功能**: 定义页面 CSS 样式。

**样式说明**:

| 选择器 | 样式 | 说明 |
|-------|------|------|
| `body` | `font-size: 12px;` | 全局字体大小 |
| `.botton` | `width:100px;color:#ff00ff` | 按钮样式（注意拼写错误） |

**注意**: `.botton` 是拼写错误，应该是 `.button`。

### 5. 生命周期钩子

```typescript
lifeCycles: {
  componentDidMount: {
    type: 'JSFunction',
    value: "function() {\n    console.log('did mount');\n  }",
  },
  componentWillUnmount: {
    type: 'JSFunction',
    value: "function() {\n    console.log('will umount');\n  }",
  },
},
```

**功能**: 定义组件生命周期钩子。

#### 5.1 componentDidMount

```typescript
componentDidMount: {
  type: 'JSFunction',
  value: "function() {\n    console.log('did mount');\n  }",
},
```

**功能**: 组件挂载后执行。

**说明**:
- 在组件首次渲染到 DOM 后执行
- 适合执行初始化操作
- 例如: 发起网络请求、设置定时器等

#### 5.2 componentWillUnmount

```typescript
componentWillUnmount: {
  type: 'JSFunction',
  value: "function() {\n    console.log('will umount');\n  }",
},
```

**功能**: 组件卸载前执行。

**说明**:
- 在组件从 DOM 中移除前执行
- 适合执行清理操作
- 例如: 清除定时器、取消网络请求等

### 6. 方法定义

```typescript
methods: {
  testFunc: {
    type: 'JSFunction',
    value: "function() {\n    console.log('test func');\n  }",
  },
  onClick: {
    type: 'JSFunction',
    value: 'function() {\n      this.setState({\n        isShowDialog: true\n      })\n  }',
  },
  closeDialog: {
    type: 'JSFunction',
    value: 'function() {\n      this.setState({\n        isShowDialog: false\n      })\n  }',
  },
},
```

**功能**: 定义页面方法。

#### 6.1 testFunc

```typescript
testFunc: {
  type: 'JSFunction',
  value: "function() {\n    console.log('test func');\n  }",
},
```

**功能**: 测试方法。

**说明**:
- 简单的日志输出
- 用于测试方法调用

#### 6.2 onClick

```typescript
onClick: {
  type: 'JSFunction',
  value: 'function() {\n      this.setState({\n        isShowDialog: true\n      })\n  }',
},
```

**功能**: 点击事件处理。

**说明**:
- 设置 `isShowDialog` 为 `true`
- 显示对话框

#### 6.3 closeDialog

```typescript
closeDialog: {
  type: 'JSFunction',
  value: 'function() {\n      this.setState({\n        isShowDialog: false\n      })\n  }',
},
```

**功能**: 关闭对话框。

**说明**:
- 设置 `isShowDialog` 为 `false`
- 隐藏对话框

### 7. 子组件树

#### 7.1 主容器 Box

```typescript
{
  componentName: 'Box',
  id: 'node_dockcy8n9xed',
  props: {
    style: {
      backgroundColor: 'rgba(31,56,88,0.1)',
      padding: '12px 12px 12px 12px',
    },
  },
  children: [ /* 子组件 */ ],
}
```

**功能**: 主容器组件。

**属性说明**:

| 属性 | 值 | 说明 |
|------|-----|------|
| `backgroundColor` | `'rgba(31,56,88,0.1)'` | 背景颜色 |
| `padding` | `'12px 12px 12px 12px'` | 内边距 |

#### 7.2 面包屑导航 Box

```typescript
{
  componentName: 'Box',
  id: 'node_dockcy8n9xee',
  props: {
    style: {
      padding: '12px 12px 12px 12px',
      backgroundColor: '#ffffff',
    },
  },
  children: [
    {
      componentName: 'Breadcrumb',
      id: 'node_dockcy8n9xef',
      props: {
        prefix: 'next-',
        maxNode: 100,
        component: 'nav',
      },
      children: [
        {
          componentName: 'Breadcrumb.Item',
          id: 'node_dockcy8n9xeg',
          props: {
            prefix: 'next-',
            children: '首页',
          },
        },
        // ... 更多 Breadcrumb.Item
      ],
    },
  ],
}
```

**功能**: 面包屑导航容器。

**组件说明**:

| 组件 | 用途 |
|------|------|
| `Box` | 容器 |
| `Breadcrumb` | 面包屑导航 |
| `Breadcrumb.Item` | 面包屑项 |

**面包屑项**:

| 项 | 文本 |
|----|------|
| 1 | 首页 |
| 2 | 品质中台 |
| 3 | 商家品质页面管理 |
| 4 | 质检知识条配置 |

#### 7.3 表单查询 Box

```typescript
{
  componentName: 'Box',
  id: 'node_dockcy8n9xeo',
  props: {
    style: {
      marginTop: '12px',
      backgroundColor: '#ffffff',
    },
  },
  children: [
    {
      componentName: 'Form',
      id: 'node_dockcy8n9xep',
      props: {
        inline: true,
        style: {
          marginTop: '12px',
          marginRight: '12px',
          marginLeft: '12px',
        },
        __events: [],
      },
      children: [
        // Form.Item - 类目名
        // Form.Item - 项目类型
        // Form.Item - 项目 ID
        // Button.Group - 搜索和清空按钮
      ],
    },
  ],
}
```

**功能**: 表单查询区域。

**表单项**:

| 项 | 组件 | 标签 |
|----|------|------|
| 1 | Select | 类目名 |
| 2 | Select | 项目类型 |
| 3 | Input | 项目 ID |

**按钮**:

| 按钮 | 类型 | 文本 |
|------|------|------|
| 1 | primary | 搜索 |
| 2 | normal | 清空 |

#### 7.4 操作按钮 Box

```typescript
{
  componentName: 'Box',
  id: 'node_dockcy8n9xe1f',
  props: {
    style: {
      backgroundColor: '#ffffff',
      paddingBottom: '24px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
  children: [
    {
      componentName: 'Button',
      id: 'node_dockd5nrh9p4',
      props: {
        type: 'primary',
        size: 'medium',
        htmlType: 'button',
        component: 'button',
        children: '新建配置',
        style: {},
        __events: [
          {
            type: 'componentEvent',
            name: 'onClick',
            relatedEventName: 'onClick',
          },
        ],
        onClick: {
          type: 'JSFunction',
          value: 'function(){ this.onClick() }',
        },
      },
    },
  ],
}
```

**功能**: 操作按钮区域。

**按钮说明**:

| 属性 | 值 | 说明 |
|------|-----|------|
| `type` | `'primary'` | 主按钮 |
| `size` | `'medium'` | 中等大小 |
| `htmlType` | `'button'` | 按钮类型 |
| `children` | `'新建配置'` | 按钮文本 |
| `onClick` | `function(){ this.onClick() }` | 点击事件 |

#### 7.5 表格和分页 Box

```typescript
{
  componentName: 'Box',
  id: 'node_dockd5nrh9p5',
  props: {},
  children: [
    {
      componentName: 'Table',
      id: 'node_dockjielosj1',
      props: {
        showMiniPager: true,
        showActionBar: true,
        actionBar: [
          {
            title: '新增',
            type: 'primary',
          },
          {
            title: '编辑',
          },
        ],
        columns: [
          {
            dataKey: 'name',
            width: 200,
            align: 'center',
            title: '姓名',
            editType: 'text',
          },
          {
            dataKey: 'age',
            width: 200,
            align: 'center',
            title: '年龄',
          },
          {
            dataKey: 'email',
            width: 200,
            align: 'center',
            title: '邮箱',
          },
        ],
        data: [
          {
            name: '王小',
            id: '1',
            age: 15000,
            email: 'aaa@abc.com',
          },
          {
            name: '王中',
            id: '2',
            age: 25000,
            email: 'bbb@abc.com',
          },
          {
            name: '王大',
            id: '3',
            age: 35000,
            email: 'ccc@abc.com',
          },
        ],
        actionTitle: '操作',
        actionWidth: 180,
        actionType: 'link',
        actionFixed: 'right',
        actionHidden: false,
        maxWebShownActionCount: 2,
        actionColumn: [
          {
            title: '编辑',
            callback: {
              type: 'JSFunction',
              value: '(rowData, action, table) => {\n return table.editRow(rowData).then((row) => {\n console.log(row);\n });\n }',
            },
            device: [
              'desktop',
            ],
          },
          {
            title: '保存',
            callback: {
              type: 'JSFunction',
              value: '(rowData, action, table) => { \nreturn table.saveRow(rowData).then((row) => { \nconsole.log(row); \n}); \n}',
            },
            mode: 'EDIT',
          },
        ],
      },
    },
    {
      componentName: 'Box',
      id: 'node_dockd5nrh9pg',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
      },
      children: [
        {
          componentName: 'Pagination',
          id: 'node_dockd5nrh9pf',
          props: {
            prefix: 'next-',
            type: 'normal',
            shape: 'normal',
            size: 'medium',
            defaultCurrent: 1,
            total: 100,
            pageShowCount: 5,
            pageSize: 10,
            pageSizePosition: 'start',
            showJump: true,
            style: {},
          },
        },
      ],
    },
  ],
}
```

**功能**: 表格和分页区域。

**表格列**:

| 列名 | 数据键 | 宽度 | 对齐 |
|------|--------|------|------|
| 姓名 | `name` | 200 | center |
| 年龄 | `age` | 200 | center |
| 邮箱 | `email` | 200 | center |

**表格数据**:

| 姓名 | ID | 年龄 | 邮箱 |
|------|-----|------|------|
| 王小 | 1 | 15000 | aaa@abc.com |
| 王中 | 2 | 25000 | bbb@abc.com |
| 王大 | 3 | 35000 | ccc@abc.com |

**分页配置**:

| 属性 | 值 | 说明 |
|------|-----|------|
| `defaultCurrent` | 1 | 默认当前页 |
| `total` | 100 | 总条数 |
| `pageSize` | 10 | 每页条数 |
| `pageShowCount` | 5 | 显示页码数 |
| `showJump` | true | 显示跳转 |

#### 7.6 对话框 Dialog

```typescript
{
  componentName: 'Dialog',
  id: 'node_dockcy8n9xe1h',
  props: {
    prefix: 'next-',
    footerAlign: 'right',
    footerActions: [
      'ok',
      'cancel',
    ],
    closeable: 'esc,close',
    hasMask: true,
    align: 'cc cc',
    minMargin: 40,
    visible: {
      type: 'JSExpression',
      value: 'this.state.isShowDialog',
    },
    title: '标题',
    events: [],
    __events: [
      {
        type: 'componentEvent',
        name: 'onCancel',
        relatedEventName: 'closeDialog',
      },
      {
        type: 'componentEvent',
        name: 'onClose',
        relatedEventName: 'closeDialog',
      },
      {
        type: 'componentEvent',
        name: 'onOk',
        relatedEventName: 'testFunc',
      },
    ],
    onCancel: {
      type: 'JSFunction',
      value: 'function(){ this.closeDialog() }',
    },
    onClose: {
      type: 'JSFunction',
      value: 'function(){ this.closeDialog() }',
    },
    onOk: {
      type: 'JSFunction',
      value: 'function(){ this.testFunc() }',
    },
  },
  children: [
    {
      componentName: 'Form',
      id: 'node_dockd5nrh9pi',
      props: {
        inline: false,
        labelAlign: 'top',
        labelTextAlign: 'right',
        size: 'medium',
      },
      children: [
        // Form.Item - 商品类目 (Select)
        // Form.Item - 商品类目 (Select)
        // Form.Item - 商品类目 (Select, asterisk: true)
        // Form.Item - 商品类目 (Input)
      ],
    },
  ],
}
```

**功能**: 对话框组件。

**对话框配置**:

| 属性 | 值 | 说明 |
|------|-----|------|
| `visible` | `this.state.isShowDialog` | 显示状态绑定 |
| `title` | `'标题'` | 对话框标题 |
| `footerActions` | `['ok', 'cancel']` | 底部操作按钮 |
| `hasMask` | `true` | 显示遮罩 |

**事件处理**:

| 事件 | 处理函数 |
|------|---------|
| `onCancel` | `this.closeDialog()` |
| `onClose` | `this.closeDialog()` |
| `onOk` | `this.testFunc()` |

#### 7.7 错误组件 ErrorComponent

```typescript
{
  componentName: 'ErrorComponent',
  id: 'node_dockd5nrh9pr',
  props: {
    name: 'error',
  },
}
```

**功能**: 错误组件。

**说明**:
- 用于测试错误处理
- 当组件找不到时显示

## Schema 特性

### 1. 组件树结构

```
Page
├── Box (主容器)
│   ├── Box (面包屑容器)
│   │   └── Breadcrumb
│   │       ├── Breadcrumb.Item (首页)
│   │       ├── Breadcrumb.Item (品质中台)
│   │       ├── Breadcrumb.Item (商家品质页面管理)
│   │       └── Breadcrumb.Item (质检知识条配置)
│   ├── Box (表单查询容器)
│   │   └── Form
│   │       ├── Form.Item (类目名 - Select)
│   │       ├── Form.Item (项目类型 - Select)
│   │       ├── Form.Item (项目 ID - Input)
│   │       └── Button.Group
│   │           ├── Button (搜索)
│   │           └── Button (清空)
│   ├── Box (操作按钮容器)
│   │   └── Button (新建配置)
│   └── Box (表格和分页容器)
│       ├── Table
│       └── Box (分页容器)
│           └── Pagination
├── Dialog
│   └── Form
│       ├── Form.Item (商品类别 - Select)
│       ├── Form.Item (商品类别 - Select)
│       ├── Form.Item (商品类别 - Select, asterisk: true)
│       └── Form.Item (商品类别 - Input)
└── ErrorComponent
```

### 2. 状态绑定

```typescript
// 对话框显示状态绑定
visible: {
  type: 'JSExpression',
  value: 'this.state.isShowDialog',
}
```

**说明**:
- 使用 `JSExpression` 类型绑定状态
- 支持动态表达式
- 状态变化时自动更新视图

### 3. 事件处理

```typescript
// 按钮点击事件
onClick: {
  type: 'JSFunction',
  value: 'function(){ this.onClick() }',
}

// 对话框事件
onCancel: {
  type: 'JSFunction',
  value: 'function(){ this.closeDialog() }',
}
```

**说明**:
- 使用 `JSFunction` 类型定义事件处理函数
- 支持调用页面方法
- 支持修改状态

### 4. 生命周期

```typescript
// 组件挂载
componentDidMount: {
  type: 'JSFunction',
  value: "function() {\n    console.log('did mount');\n  }",
}

// 组件卸载
componentWillUnmount: {
  type: 'JSFunction',
  value: "function() {\n    console.log('will umount');\n  }",
}
```

**说明**:
- 支持完整的 React 生命周期
- 使用 `JSFunction` 类型定义
- 在适当的时候自动调用

## 使用场景

### 1. 测试渲染

```typescript
import ReactRenderer from '../src';
import schema from './fixtures/schema/basic';

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
  Pagination,
  Dialog,
};

<ReactRenderer
  schema={schema}
  components={components}
/>
```

### 2. 测试状态管理

```javascript
// 测试状态修改
this.setState({ isShowDialog: true })

// 测试状态访问
this.state.text
```

### 3. 测试方法调用

```javascript
// 测试方法调用
this.testFunc()
this.onClick()
this.closeDialog()
```

### 4. 测试生命周期

```javascript
// 测试组件挂载
// componentDidMount 自动调用

// 测试组件卸载
// componentWillUnmount 自动调用
```

## 与其他文件的关系

### 与 tests/index.test.tsx 的关系

| 文件 | 用途 |
|------|------|
| [`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts) | 测试数据 |
| [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) | 测试文件 |

**协作方式**:
1. [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) 导入 [`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts)
2. 使用 Schema 渲染组件
3. 验证渲染结果

## 最佳实践

### 1. Schema 设计

- **结构清晰**: 保持组件树结构清晰
- **命名规范**: 使用有意义的组件名称
- **属性完整**: 提供完整的组件属性

### 2. 状态管理

- **状态最小化**: 只保留必要的状态
- **状态命名**: 使用有意义的变量名
- **状态初始化**: 提供合理的初始值

### 3. 方法设计

- **职责单一**: 每个方法只做一件事
- **命名清晰**: 使用有意义的函数名
- **错误处理**: 添加必要的错误处理

### 4. 生命周期

- **合理使用**: 只在必要时使用生命周期
- **清理资源**: 在 componentWillUnmount 中清理资源
- **避免副作用**: 避免在生命周期中引入副作用

## 常见问题

### 1. 组件找不到

**问题**: 渲染时组件找不到

**解决方案**:
- 检查组件映射表是否正确
- 确认组件是否正确导入
- 验证组件名称是否匹配

### 2. 状态不更新

**问题**: 状态修改后视图不更新

**解决方案**:
- 检查状态绑定是否正确
- 确认使用 `this.setState` 修改状态
- 验证表达式语法是否正确

### 3. 事件不触发

**问题**: 事件处理函数不执行

**解决方案**:
- 检查事件绑定是否正确
- 确认方法是否正确定义
- 验证函数语法是否正确

## 相关文件

- [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx): 测试文件
- [`src/index.ts`](packages/react-renderer/src/index.ts): React Renderer 源代码

## 总结

[`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts) 是一个完整的低代码 Schema 示例，包含了页面、组件、状态、方法、生命周期等完整的低代码元素。该 Schema 用于测试 React Renderer 的渲染能力，验证了低代码 Schema 能够正确渲染为 React 组件树，为模块的质量保证提供了基础。
