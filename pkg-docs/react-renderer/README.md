# React Renderer 模块文档

## 概述

React Renderer 是阿里巴巴低代码引擎的 React 渲染器模块，负责将低代码 Schema 渲染为 React 组件树。本文档详细介绍了 React Renderer 模块的架构设计、API 设计、文件功能和使用方法。

## 目录结构

```
pkg-docs/react-renderer/
├── README.md                           # 本文档
├── 01-架构设计.md                      # 架构设计文档
├── 02-API设计.md                        # API 设计文档
├── 03-文件功能说明.md                   # 文件功能概览
├── 04-src-index.ts.md                   # 主入口文件文档
├── 05-package.json.md                   # NPM 包配置文档
├── 06-tsconfig.json.md                  # TypeScript 配置文档
├── 07-build.json.md                    # 构建配置文档
├── 08-jest.config.js.md                # Jest 配置文档
├── 09-build.test.json.md               # 测试构建配置文档
├── 10-build.umd.json.md                # UMD 构建配置文档
├── 11-tests-index.test.tsx.md          # 测试文件文档
├── 12-tests-fixtures-schema-basic.ts.md  # 测试 Schema 文档
├── 13-demo-config-components-index.js.md  # 组件导出文档
├── 14-demo-config-components-Div.jsx.md  # Div 组件文档
├── 15-demo-config-components-Text.jsx.md # Text 组件文档
├── 16-demo-config-components-A.jsx.md    # A 组件文档
├── 17-demo-config-components-Image.jsx.md # Image 组件文档
├── 18-demo-config-utils.js.md          # 工具函数文档
├── 19-demo-config-constants.js.md      # 常量定义文档
└── 20-demo-markdown-files.md           # Demo Markdown 文件文档
```

## 文档索引

### 架构与设计

- **[01-架构设计.md](./01-架构设计.md)** - React Renderer 的架构设计，包括设计模式、核心组件、数据流和扩展性设计
- **[02-API设计.md](./02-API设计.md)** - React Renderer 的完整 API 文档，包括 Props 接口、实例方法和类型定义

### 源代码文件

- **[04-src-index.ts.md](./04-src-index.ts.md)** - 主入口文件，初始化 React 运行时环境并注册渲染器

### 配置文件

- **[05-package.json.md](./05-package.json.md)** - NPM 包配置，包括依赖、脚本和发布配置
- **[06-tsconfig.json.md](./06-tsconfig.json.md)** - TypeScript 编译配置
- **[07-build.json.md](./07-build.json.md)** - 开发和生产构建配置
- **[08-jest.config.js.md](./08-jest.config.js.md)** - Jest 测试配置
- **[09-build.test.json.md](./09-build.test.json.md)** - 测试构建配置
- **[10-build.umd.json.md](./10-build.umd.json.md)** - UMD 构建配置

### 测试文件

- **[11-tests-index.test.tsx.md](./11-tests-index.test.tsx.md)** - 主测试文件，使用快照测试验证渲染功能
- **[12-tests-fixtures-schema-basic.ts.md](./12-tests-fixtures-schema-basic.ts.md)** - 测试 Schema 文件，包含完整的页面结构

### Demo 组件

- **[13-demo-config-components-index.js.md](./13-demo-config-components-index.js.md)** - 组件导出文件，集中导出所有 demo 组件
- **[14-demo-config-components-Div.jsx.md](./14-demo-config-components-Div.jsx.md)** - Div 容器组件文档
- **[15-demo-config-components-Text.jsx.md](./15-demo-config-components-Text.jsx.md)** - Text 文本组件文档
- **[16-demo-config-components-A.jsx.md](./16-demo-config-components-A.jsx.md)** - A 链接组件文档
- **[17-demo-config-components-Image.jsx.md](./17-demo-config-components-Image.jsx.md)** - Image 图片组件文档

### Demo 配置

- **[18-demo-config-utils.js.md](./18-demo-config-utils.js.md)** - 工具函数文档，包括 Message 和 moment
- **[19-demo-config-constants.js.md](./19-demo-config-constants.js.md)** - 常量定义文档

### Demo 示例

- **[20-demo-markdown-files.md](./20-demo-markdown-files.md)** - Demo Markdown 文件文档，包括列表、表格、复杂组件、数据源和国际化示例

## 快速开始

### 安装

```bash
npm install @alilc/lowcode-react-renderer
```

### 基本使用

```jsx
import ReactRenderer from '@alilc/lowcode-react-renderer';
import components from './components';

const schema = {
  componentName: 'Page',
  props: {},
  children: []
};

<ReactRenderer
  schema={schema}
  components={components}
/>
```

### 国际化使用

```jsx
<ReactRenderer
  schema={schema}
  components={components}
  locale="zh-CN"
  messages={{
    "hello": "你好",
    "china": "中国"
  }}
/>
```

## 核心概念

### 1. Schema

Schema 是低代码页面的描述，包含组件树、状态、方法、生命周期等信息。

```javascript
{
  componentName: 'Page',
  props: {},
  state: {},
  methods: {},
  lifeCycles: {},
  children: []
}
```

### 2. 组件映射

组件映射表将 Schema 中的组件名映射到实际的 React 组件。

```javascript
const components = {
  Div: DivComponent,
  Text: TextComponent,
  Button: ButtonComponent
};
```

### 3. AppHelper

AppHelper 提供应用级别的辅助功能，如工具函数和常量。

```javascript
const appHelper = {
  utils: {
    Message,
    moment
  },
  constants: {
    name: 'renderer-demo'
  }
};
```

## 设计模式

### 1. 适配器模式

通过适配器将 React 框架能力桥接到渲染器核心。

### 2. 工厂模式

使用工厂模式创建不同类型的渲染器（Page、Component、Block、Addon、Temp、Div）。

### 3. 组合模式

将核心渲染器与 React Component 接口组合，实现 React 组件。

## 构建流程

### 开发构建

```bash
npm run build
```

生成：
- `lib/` - CommonJS 格式
- `es/` - ES Module 格式

### UMD 构建

```bash
npm run build:umd
```

生成：
- `dist/` - UMD 格式

### 测试

```bash
npm test
```

## 依赖关系

### 核心依赖

- `@alilc/lowcode-renderer-core` - 渲染器核心库
- `@alifd/next` - Fusion Design 组件库
- `react` - React 核心库
- `react-dom` - React DOM 库

### 开发依赖

- `@alib/build-scripts` - 构建工具
- `jest` - 测试框架
- `typescript` - TypeScript 编译器

## 最佳实践

### 1. 组件设计

- 使用 PureComponent 优化性能
- 提供清晰的 displayName
- 使用 PropTypes 验证属性

### 2. Schema 设计

- 保持组件树结构清晰
- 使用有意义的组件名称
- 提供完整的组件属性

### 3. 状态管理

- 只保留必要的状态
- 使用有意义的变量名
- 提供合理的初始值

### 4. 性能优化

- 使用 PureComponent
- 避免不必要的渲染
- 合理使用 key 属性

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

### 3. 构建失败

**问题**: 构建过程中出现错误

**解决方案**:
- 检查插件版本是否兼容
- 查看构建日志中的错误信息
- 尝试清理缓存后重新构建

## 相关资源

- [低代码引擎官方文档](https://lowcode-engine.cn/)
- [Fusion Design 组件库](https://fusion.design/)
- [React 官方文档](https://reactjs.org/)

## 更新日志

### 2026-01-05

- 创建完整的模块文档
- 添加架构设计文档
- 添加 API 设计文档
- 添加所有文件的功能说明文档
- 添加使用示例和最佳实践

## 贡献

欢迎贡献！请阅读 [CONTRIBUTOR.md](../../CONTRIBUTOR.md) 了解如何参与贡献。

## 许可证

MIT License
