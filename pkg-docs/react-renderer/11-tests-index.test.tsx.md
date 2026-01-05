# tests/index.test.tsx 文件功能说明

## 文件路径

`packages/react-renderer/tests/index.test.tsx`

## 功能概述

[`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) 是 React Renderer 模块的主要测试文件，使用 Jest 和 React Test Renderer 测试框架验证 React Renderer 的基本渲染功能。

## 主要功能

1. **基本渲染测试**: 测试 React Renderer 的基本渲染能力
2. **组件集成测试**: 测试 Fusion Design 组件库的集成
3. **Schema 渲染测试**: 测试低代码 Schema 的渲染
4. **快照测试**: 使用快照测试确保渲染结果的一致性

## 代码结构

```tsx
import React from 'react';
import renderer from 'react-test-renderer';
import { Box, Breadcrumb, Form, Select, Input, Button, Table, Pagination, Dialog } from '@alifd/next';
import ReactRenderer from '../src';
import schema from './fixtures/schema/basic';

describe('React Renderer', () => {
  it('render basic case', () => {
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
    const content = (
      <ReactRenderer
        schema={schema}
        components={components}
      />);
    const tree = renderer.create(content).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

## 详细说明

### 1. 导入依赖

```tsx
import React from 'react';
import renderer from 'react-test-renderer';
import { Box, Breadcrumb, Form, Select, Input, Button, Table, Pagination, Dialog } from '@alifd/next';
import ReactRenderer from '../src';
import schema from './fixtures/schema/basic';
```

**功能**: 导入测试所需的依赖。

**导入说明**:

| 导入项 | 来源 | 用途 |
|-------|------|------|
| `React` | `'react'` | React 核心库 |
| `renderer` | `'react-test-renderer'` | React 测试渲染器 |
| `Box, Breadcrumb, ...` | `'@alifd/next'` | Fusion Design 组件库 |
| `ReactRenderer` | `'../src'` | React Renderer 组件 |
| `schema` | `'./fixtures/schema/basic'` | 测试用的低代码 Schema |

### 2. describe 块

```tsx
describe('React Renderer', () => {
  // 测试用例
});
```

**功能**: 定义测试套件。

**说明**:
- `describe` 是 Jest 提供的测试组织函数
- 用于将相关的测试用例分组
- 第一个参数是测试套件的名称
- 第二个参数是包含测试用例的函数

### 3. it 块

```tsx
it('render basic case', () => {
  // 测试逻辑
});
```

**功能**: 定义单个测试用例。

**说明**:
- `it` 是 Jest 提供的测试用例函数
- 第一个参数是测试用例的描述
- 第二个参数是测试逻辑函数

### 4. 组件映射

```tsx
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
```

**功能**: 定义组件映射表。

**组件说明**:

| 组件名 | 组件类型 | 用途 |
|-------|---------|------|
| `Box` | Fusion Design 基础容器 | 布局容器 |
| `Breadcrumb` | Fusion Design 面包屑 | 导航面包屑 |
| `Breadcrumb.Item` | Fusion Design 面包屑项 | 面包屑子项 |
| `Form` | Fusion Design 表单 | 表单容器 |
| `Form.Item` | Fusion Design 表单项 | 表单字段 |
| `Select` | Fusion Design 下拉选择 | 下拉选择器 |
| `Input` | Fusion Design 输入框 | 文本输入 |
| `Button` | Fusion Design 按钮 | 按钮组件 |
| `Button.Group` | Fusion Design 按钮组 | 按钮组容器 |
| `Table` | Fusion Design 表格 | 数据表格 |
| `Pagination` | Fusion Design 分页 | 分页组件 |
| `Dialog` | Fusion Design 对话框 | 弹窗组件 |

**设计说明**:
- 组件映射表将 Schema 中的组件名映射到实际的 React 组件
- 支持嵌套组件（如 `Breadcrumb.Item`、`Form.Item`）
- 所有组件来自 Fusion Design 组件库

### 5. 创建 React Renderer

```tsx
const content = (
  <ReactRenderer
    schema={schema}
    components={components}
  />);
```

**功能**: 创建 React Renderer 组件实例。

**Props 说明**:

| 属性 | 类型 | 用途 |
|------|------|------|
| `schema` | Object | 低代码 Schema 定义 |
| `components` | Object | 组件映射表 |

**Schema 说明**:
- [`schema`](packages/react-renderer/tests/fixtures/schema/basic.ts:1) 是从 [`./fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts:1) 导入的
- 包含完整的页面结构、状态、方法、生命周期等
- 详细说明见 [`12-tests-fixtures-schema-basic.ts.md`](pkg-docs/react-renderer/12-tests-fixtures-schema-basic.ts.md)

### 6. 渲染测试

```tsx
const tree = renderer.create(content).toJSON();
```

**功能**: 使用 React Test Renderer 渲染组件并获取 JSON 表示。

**步骤说明**:

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | `renderer.create(content)` | 创建渲染器并渲染组件 |
| 2 | `.toJSON()` | 获取渲染结果的 JSON 表示 |

**toJSON 说明**:
- 返回渲染树的 JSON 表示
- 不包含 React 内部属性
- 适合用于快照测试

### 7. 快照断言

```tsx
expect(tree).toMatchSnapshot();
```

**功能**: 断言渲染结果与快照匹配。

**快照测试说明**:
- 第一次运行时创建快照文件
- 后续运行时与快照比较
- 如果不匹配，测试失败
- 可以使用 `-u` 参数更新快照

**快照文件位置**:
```
tests/__snapshots__/index.test.tsx.snap
```

## 测试执行

### 运行测试

```bash
npm test
```

**功能**: 运行所有测试。

**输出**:
```
 PASS  packages/react-renderer/tests/index.test.tsx
  React Renderer
    ✓ render basic case (XX ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

### 运行特定测试

```bash
npm test -- tests/index.test.tsx
```

**功能**: 运行特定的测试文件。

### 更新快照

```bash
npm test -- -u
```

**功能**: 更新所有快照。

### 查看覆盖率

```bash
npm test -- --coverage
```

**功能**: 生成测试覆盖率报告。

**输出目录**:
- `coverage/` 目录
- 包含 HTML、JSON、LCOV 等格式的报告

## 测试覆盖的功能

### 1. 基本渲染

- ✅ 页面渲染
- ✅ 组件渲染
- ✅ 嵌套组件渲染

### 2. Fusion Design 组件

- ✅ Box 容器
- ✅ Breadcrumb 面包屑
- ✅ Form 表单
- ✅ Select 下拉选择
- ✅ Input 输入框
- ✅ Button 按钮
- ✅ Table 表格
- ✅ Pagination 分页
- ✅ Dialog 对话框

### 3. Schema 功能

- ✅ 组件树结构
- ✅ 组件属性
- ✅ 嵌套组件
- ✅ 状态管理
- ✅ 方法定义
- ✅ 生命周期钩子
- ✅ 事件处理

## 测试设计模式

### 1. 快照测试

**优点**:
- 简单易用
- 自动检测渲染结果变化
- 适合回归测试

**缺点**:
- 快照文件可能过大
- 需要定期审查快照
- 可能误报

### 2. 组件映射测试

**优点**:
- 测试组件映射的正确性
- 验证组件库集成
- 确保组件可用性

**缺点**:
- 需要维护组件映射表
- 组件更新时需要更新测试

## 与其他文件的关系

### 与 fixtures/schema/basic.ts 的关系

| 文件 | 用途 |
|------|------|
| [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) | 测试文件 |
| [`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts) | 测试数据 |

**协作方式**:
1. [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) 导入 [`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts)
2. 使用 Schema 渲染组件
3. 验证渲染结果

### 与 jest.config.js 的关系

| 文件 | 用途 |
|------|------|
| [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) | 测试文件 |
| [`jest.config.js`](packages/react-renderer/jest.config.js) | Jest 配置 |

**协作方式**:
1. [`jest.config.js`](packages/react-renderer/jest.config.js) 配置测试运行时
2. [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) 按照配置运行

## 最佳实践

### 1. 测试组织

- **测试套件**: 使用 `describe` 组织相关测试
- **测试用例**: 使用 `it` 定义单个测试
- **描述清晰**: 使用清晰的描述说明测试目的

### 2. 测试覆盖

- **核心功能**: 优先测试核心功能
- **边界情况**: 测试边界情况
- **错误处理**: 测试错误处理

### 3. 快照管理

- **定期审查**: 定期审查快照文件
- **及时更新**: 及时更新过时的快照
- **版本控制**: 将快照文件纳入版本控制

## 常见问题

### 1. 测试失败

**问题**: 测试运行失败

**解决方案**:
- 检查测试代码是否正确
- 查看错误日志
- 验证组件映射是否正确

### 2. 快照不匹配

**问题**: 快照测试失败

**解决方案**:
- 检查渲染结果是否确实改变
- 使用 `-u` 参数更新快照
- 审查快照文件

### 3. 组件找不到

**问题**: 组件映射失败

**解决方案**:
- 检查组件映射表是否正确
- 确认组件是否正确导入
- 验证组件名称是否匹配

## 相关文件

- [`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts): 测试 Schema
- [`jest.config.js`](packages/react-renderer/jest.config.js): Jest 配置
- [`build.test.json`](packages/react-renderer/build.test.json): 测试构建配置
- [`src/index.ts`](packages/react-renderer/src/index.ts): React Renderer 源代码

## 总结

[`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx) 是 React Renderer 模块的主要测试文件，通过快照测试验证了 React Renderer 的基本渲染能力和 Fusion Design 组件库的集成。该测试确保了低代码 Schema 能够正确渲染为 React 组件树，为模块的质量保证提供了基础。
