# package.json 文档

## 文件信息

- **文件路径**: [`packages/react-simulator-renderer/package.json`](packages/react-simulator-renderer/package.json)
- **文件类型**: NPM 包配置文件
- **代码行数**: 49 行

## 功能概述

`package.json` 是 NPM 包的配置文件，定义了包的元信息、依赖关系、脚本命令等。该文件是 `@alilc/lowcode-react-simulator-renderer` 包的核心配置文件。

## 逐行代码分析

### 第 1-2 行：包基本信息

```json
{
  "name": "@alilc/lowcode-react-simulator-renderer",
  "version": "1.3.2",
```

**说明**:
- `name`: 包名，使用 NPM 作用域 `@alilc`，表示这是阿里巴巴低代码生态的包
- `version`: 版本号，遵循语义化版本规范（Semantic Versioning）

**设计考虑**:
- 使用作用域包名避免命名冲突
- 版本号与低代码引擎其他包保持同步

### 第 3-4 行：描述和入口

```json
  "description": "react simulator renderer for alibaba lowcode designer",
  "main": "lib/index.js",
```

**说明**:
- `description`: 包的描述，说明这是阿里巴巴低代码设计器的 React 模拟器渲染器
- `main`: CommonJS 入口文件，指向编译后的 `lib/index.js`

**设计考虑**:
- 清晰的描述帮助开发者理解包的用途
- 使用编译后的文件作为入口，确保代码兼容性

### 第 5-6 行：模块入口

```json
  "module": "es/index.js",
  "license": "MIT",
```

**说明**:
- `module`: ES Module 入口文件，指向编译后的 `es/index.js`
- `license`: 开源协议，使用 MIT 协议

**设计考虑**:
- 同时支持 CommonJS 和 ES Module，提高兼容性
- MIT 协议是最宽松的开源协议之一

### 第 7-12 行：发布文件

```json
  "files": [
    "es",
    "lib",
    "dist"
  ],
```

**说明**:
- `files`: 发布到 NPM 时包含的文件和目录
- `es`: ES Module 编译输出目录
- `lib`: CommonJS 编译输出目录
- `dist`: UMD 打包输出目录

**设计考虑**:
- 只发布必要的编译输出，减小包体积
- 支持多种模块格式，满足不同使用场景

### 第 13-17 行：脚本命令

```json
  "scripts": {
    "test": "build-scripts test --config build.test.json",
    "build": "NODE_OPTIONS=--max_old_space_size=8192 build-scripts build",
    "build:umd": "NODE_OPTIONS=--max_old_space_size=8192 build-scripts build --config build.umd.json",
    "test:cov": "build-scripts test --config build.test.json --jest-coverage"
  },
```

**说明**:
- `test`: 运行测试，使用 `build.test.json` 配置
- `build`: 构建项目，设置 Node.js 最大内存为 8GB
- `build:umd`: 构建 UMD 格式，设置 Node.js 最大内存为 8GB
- `test:cov`: 运行测试并生成覆盖率报告

**设计考虑**:
- 使用 `build-scripts` 统一构建工具
- 设置大内存限制避免构建时内存溢出
- 提供多种构建选项满足不同需求

### 第 19-29 行：生产依赖

```json
  "dependencies": {
    "@alilc/lowcode-designer": "1.3.2",
    "@alilc/lowcode-react-renderer": "1.3.2",
    "@alilc/lowcode-types": "1.3.2",
    "@alilc/lowcode-utils": "1.3.2",
    "classnames": "^2.2.6",
    "mobx": "^6.3.0",
    "mobx-react": "^7.2.0",
    "react": "^16",
    "react-dom": "^16.7.0"
  },
```

**说明**:

**低代码核心依赖**:
- `@alilc/lowcode-designer`: 低代码设计器核心，版本 1.3.2
- `@alilc/lowcode-react-renderer`: React 渲染器，版本 1.3.2
- `@alilc/lowcode-types`: 类型定义，版本 1.3.2
- `@alilc/lowcode-utils`: 工具函数库，版本 1.3.2

**第三方依赖**:
- `classnames`: CSS 类名工具，版本 ^2.2.6
- `mobx`: 状态管理库，版本 ^6.3.0
- `mobx-react`: MobX 的 React 绑定，版本 ^7.2.0
- `react`: React 框架，版本 ^16
- `react-dom`: React DOM 操作库，版本 ^16.7.0

**设计考虑**:
- 低代码相关包使用精确版本，确保兼容性
- 第三方依赖使用 `^` 前缀，允许小版本更新
- React 16 是当前稳定版本，React 17+ 可能需要适配

### 第 30-37 行：开发依赖

```json
  "devDependencies": {
    "@alib/build-scripts": "^0.1.18",
    "@types/classnames": "^2.2.7",
    "@types/node": "^13.7.1",
    "@types/react": "^16",
    "@types/react-dom": "^16",
    "@types/react-router": "5.1.18"
  },
```

**说明**:

**构建工具**:
- `@alib/build-scripts`: 阿里巴巴构建脚本，版本 ^0.1.18

**类型定义**:
- `@types/classnames`: classnames 的类型定义，版本 ^2.2.7
- `@types/node`: Node.js 的类型定义，版本 ^13.7.1
- `@types/react`: React 的类型定义，版本 ^16
- `@types/react-dom`: React DOM 的类型定义，版本 ^16
- `@types/react-router`: React Router 的类型定义，版本 5.1.18

**设计考虑**:
- 开发依赖只在开发时使用，不会发布到 NPM
- 类型定义确保 TypeScript 编译时的类型安全
- 版本与生产依赖保持一致

### 第 38-41 行：发布配置

```json
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
```

**说明**:
- `access`: 发布访问权限，`public` 表示公开包
- `registry`: NPM 注册表地址，使用官方 NPM 注册表

**设计考虑**:
- 公开包允许任何人安装使用
- 使用官方注册表确保包的可用性

### 第 42-45 行：仓库信息

```json
  "repository": {
    "type": "http",
    "url": "https://github.com/alibaba/lowcode-engine/tree/main/packages/react-simulator-renderer"
  },
```

**说明**:
- `type`: 仓库类型，`http` 表示通过 HTTP 访问
- `url`: 仓库地址，指向 GitHub 上的具体目录

**设计考虑**:
- 提供仓库地址方便开发者查看源码
- 指向具体目录而非根目录，更精确

### 第 46-48 行：问题追踪和主页

```json
  "gitHead": "2669f179e6f899d395ce1942d0fe04f9c5ed48a6",
  "bugs": "https://github.com/alibaba/lowcode-engine/issues",
  "homepage": "https://github.com/alibaba/lowcode-engine/#readme"
```

**说明**:
- `gitHead`: Git 提交的 HEAD 哈希值
- `bugs`: 问题追踪地址，指向 GitHub Issues
- `homepage`: 项目主页，指向 GitHub README

**设计考虑**:
- 提供问题追踪地址方便用户反馈
- 提供主页地址方便用户了解项目

## 主要功能

### 1. 包元数据管理

定义包的基本信息，包括名称、版本、描述等，帮助 NPM 识别和管理包。

### 2. 依赖管理

声明生产依赖和开发依赖，确保项目在不同环境下都能正确安装所需的包。

### 3. 脚本命令

提供构建、测试等常用命令的快捷方式，简化开发流程。

### 4. 发布配置

配置包的发布行为，包括访问权限和注册表地址。

### 5. 仓库信息

提供源码仓库地址，方便开发者查看和贡献代码。

## 设计模式

### 1. 版本管理

使用语义化版本（Semantic Versioning），格式为 `MAJOR.MINOR.PATCH`：
- `MAJOR`: 不兼容的 API 修改
- `MINOR`: 向下兼容的功能性新增
- `PATCH`: 向下兼容的问题修正

### 2. 依赖版本控制

- **精确版本**: `1.3.2` - 只安装指定版本
- **波浪号版本**: `^2.2.6` - 安装兼容的最新版本

### 3. 多入口支持

同时提供 CommonJS 和 ES Module 入口，满足不同模块系统的需求。

## 使用场景

### 1. 安装包

```bash
npm install @alilc/lowcode-react-simulator-renderer
```

### 2. 运行测试

```bash
npm test
```

### 3. 构建项目

```bash
npm run build
```

### 4. 构建 UMD 格式

```bash
npm run build:umd
```

### 5. 生成测试覆盖率

```bash
npm run test:cov
```

## 常见问题

### 1. 为什么设置大内存限制？

构建大型项目时，TypeScript 编译和 Babel 转译可能消耗大量内存。设置 `--max_old_space_size=8192` 可以避免内存溢出错误。

### 2. 为什么同时提供 CommonJS 和 ES Module？

- **CommonJS**: 传统的 Node.js 模块系统，兼容性好
- **ES Module**: 现代的 JavaScript 模块系统，支持 tree-shaking

### 3. 依赖版本为什么有的是精确版本，有的是波浪号版本？

- **精确版本**: 低代码相关包需要严格版本控制，确保兼容性
- **波浪号版本**: 第三方库允许小版本更新，获得 bug 修复和新特性

## 最佳实践

### 1. 版本更新

更新包版本时，遵循语义化版本规范：
- 修改了不兼容的 API：增加主版本号
- 添加了向下兼容的功能：增加次版本号
- 修复了向下兼容的问题：增加修订号

### 2. 依赖管理

- 定期更新依赖版本，获得安全修复和新特性
- 更新前测试兼容性
- 使用 `npm outdated` 检查过时的依赖

### 3. 发布流程

1. 更新版本号
2. 运行测试确保通过
3. 构建项目
4. 发布到 NPM

```bash
npm version patch/minor/major
npm run build
npm publish
```

## 相关文件

- [`tsconfig.json`](packages/react-simulator-renderer/tsconfig.json) - TypeScript 编译配置
- [`babel.config.js`](packages/react-simulator-renderer/babel.config.js) - Babel 转译配置
- [`build.json`](packages/react-simulator-renderer/build.json) - 构建配置
- [`jest.config.js`](packages/react-simulator-renderer/jest.config.js) - 测试配置

## 总结

`package.json` 是 NPM 包的核心配置文件，定义了包的所有元信息、依赖关系和脚本命令。该文件采用标准的 NPM 包配置格式，支持多种模块格式和构建选项，为开发者提供了完整的包管理能力。

**关键特性**:
- 清晰的包元数据
- 完善的依赖管理
- 多种构建选项
- 标准的发布配置

**设计优势**:
- 兼容性好（支持 CommonJS 和 ES Module）
- 可维护性高（清晰的版本控制）
- 易于使用（提供便捷的脚本命令）
