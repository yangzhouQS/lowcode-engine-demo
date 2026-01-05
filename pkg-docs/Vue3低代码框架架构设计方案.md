# Vue3 低代码框架架构设计方案

## 目录

1. [项目概述](#1-项目概述)
2. [当前架构分析](#2-当前架构分析)
3. [技术栈选型](#3-技术栈选型)
4. [Monorepo 子包设计](#4-monorepo-子包设计)
5. [核心架构设计](#5-核心架构设计)
6. [引擎内核架构](#6-引擎内核架构)
7. [渲染器架构](#7-渲染器架构)
8. [物料协议设计](#8-物料协议设计)
9. [设计器面板架构](#9-设计器面板架构)
10. [插件系统架构](#10-插件系统架构)
11. [数据流转与组件交互](#11-数据流转与组件交互)
12. [性能优化策略](#12-性能优化策略)
13. [扩展性设计](#13-扩展性设计)
14. [开发规范](#14-开发规范)
15. [实施路线图](#15-实施路线图)

---

## 1. 项目概述

### 1.1 项目背景

基于阿里低代码引擎（React 版本）的成功实践，设计并实现一套完全基于 Vue3 生态的低代码框架。该框架将充分利用 Vue3 的 Composition API、响应式系统和 TypeScript 类型系统，提供高性能、高可扩展性的低代码开发平台。

### 1.2 设计目标

1. **高性能**: 利用 Vue3 的响应式系统和虚拟 DOM 优化，实现高效的渲染和更新
2. **高可扩展性**: 设计灵活的插件系统，支持第三方扩展
3. **类型安全**: 完整的 TypeScript 类型定义，提供开发时类型检查
4. **开发体验**: 基于 Composition API，提供清晰的代码组织和复用能力
5. **模块化**: 清晰的模块边界，便于维护和升级
6. **现代化**: 采用最新的前端技术栈（Vue3、Vite 6、pnpm、Monorepo）

### 1.3 核心特性

- **Schema 驱动渲染**: 通过 JSON Schema 描述页面结构，实现可视化搭建
- **实时预览**: 支持设计模式和预览模式的无缝切换
- **组件市场**: 内置丰富的 Element Plus 组件，支持自定义组件扩展
- **插件系统**: 强大的插件机制，支持功能扩展和定制
- **多窗口支持**: 支持多页面同时编辑
- **国际化**: 内置 i18n 支持，支持多语言切换
- **主题系统**: 支持亮色/暗色主题切换
- **代码生成**: 支持将低代码页面导出为 Vue3 源码

---

## 2. 当前架构分析

### 2.1 React 版本架构总结

基于对现有架构文档的分析，React 版本的核心架构包括：

#### 2.1.1 核心模块

| 模块 | 职责 | 主要技术 |
|------|------|----------|
| **React Renderer** | 将 Schema 转换为 React 组件树 | React 16、适配器模式 |
| **React Simulator Renderer** | 设计器中的模拟器渲染 | React 16、MobX、React Router |
| **Workspace** | 工作空间管理、窗口系统 | MobX、单例模式 |
| **Types** | 类型定义 | TypeScript |
| **Utils** | 工具函数 | TypeScript |
| **Editor Core** | 编辑器核心功能 | MobX、事件系统 |
| **Designer** | 设计器核心能力 | MobX、拖拽系统 |
| **Renderer Core** | 渲染核心（框架无关） | TypeScript、适配器模式 |
| **Editor Skeleton** | 编辑器骨架和布局 | React、MobX |
| **Engine** | 引擎入口和协调 | TypeScript |

#### 2.1.2 核心架构模式

1. **适配器模式**: 将 React 框架适配到通用渲染核心
2. **工厂模式**: 创建不同类型的渲染器
3. **组合模式**: 支持嵌套组件树
4. **观察者模式**: MobX 响应式状态管理
5. **单例模式**: 渲染器容器实例
6. **策略模式**: 设备适配、设计模式切换
7. **装饰器模式**: React 组件功能增强

#### 2.1.3 数据流设计

```
Schema → Renderer → Component Tree → DOM
         ↓
    Runtime Adapter
         ↓
    Renderer Core
```

#### 2.1.4 状态管理

- **MobX**: 响应式状态管理
- **@obx**: 可观察属性
- **@observer**: 观察者组件
- **@computed**: 计算属性

### 2.2 架构优缺点分析

#### 2.2.1 优点

1. **模块化设计**: 清晰的模块边界，职责分明
2. **框架无关性**: 渲染核心支持多种框架
3. **插件系统**: 强大的扩展能力
4. **类型安全**: 完整的 TypeScript 类型定义
5. **响应式更新**: MobX 提供精确的响应式更新

#### 2.2.2 缺点

1. **技术栈老旧**: React 16 相对老旧
2. **MobX 学习成本**: MobX 的概念和 API 相对复杂
3. **构建工具**: build-scripts 相对老旧
4. **包管理**: 未使用 Monorepo，依赖管理复杂

### 2.3 Vue3 版本改进方向

1. **利用 Vue3 响应式系统**: 替代 MobX，简化状态管理
2. **Composition API**: 提供更好的代码组织和复用能力
3. **Vite 6**: 更快的构建速度和开发体验
4. **pnpm + Monorepo**: 更高效的依赖管理和项目组织
5. **Element Plus**: 现代化的 UI 组件库
6. **Pinia**: Vue3 官方推荐的状态管理库

---

## 3. 技术栈选型

### 3.1 核心技术栈

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| **Vue** | 3.4+ | 核心框架 | Vue3 的 Composition API 和响应式系统 |
| **TypeScript** | 5.3+ | 类型系统 | 提供完整的类型安全 |
| **Vite** | 6.0+ | 构建工具 | 极快的构建速度，优秀的开发体验 |
| **pnpm** | 8.0+ | 包管理器 | 高效的磁盘空间利用，支持 Monorepo |
| **Element Plus** | 2.4+ | UI 组件库 | 丰富的组件，Vue3 原生支持 |
| **Pinia** | 2.1+ | 状态管理 | Vue3 官方推荐，简洁的 API |
| **Vue Router** | 4.2+ | 路由管理 | Vue3 官方路由方案 |
| **VueUse** | 10.7+ | 组合式工具集 | 丰富的 Composition API 工具函数 |

### 3.2 开发工具链

| 工具 | 版本 | 用途 |
|------|------|------|
| **ESLint** | 8.50+ | 代码检查 |
| **Prettier** | 3.0+ | 代码格式化 |
| **Stylelint** | 15.10+ | 样式检查 |
| **Vitest** | 1.0+ | 单元测试 |
| **@vue/test-utils** | 2.4+ | Vue 组件测试 |
| **Commitlint** | 17.7+ | Git 提交检查 |
| **Lerna** | 8.0+ | Monorepo 管理 |
| **Changesets** | 2.26+ | 版本管理 |

### 3.3 技术对比

#### 3.3.1 Vue3 vs React

| 特性 | Vue3 | React |
|------|-------|-------|
| **响应式系统** | 内置，基于 Proxy | 需要第三方库（MobX、Redux） |
| **Composition API** | 原生支持 | 需要 Hooks |
| **TypeScript 支持** | 优秀 | 优秀 |
| **学习曲线** | 平缓 | 较陡峭 |
| **性能** | 优秀 | 优秀 |
| **生态** | 丰富 | 非常丰富 |

#### 3.3.2 Pinia vs MobX

| 特性 | Pinia | MobX |
|------|-------|-------|
| **Vue3 集成** | 原生支持 | 需要适配器 |
| **TypeScript 支持** | 优秀 | 优秀 |
| **DevTools** | 原生支持 | 需要插件 |
| **API 复杂度** | 简洁 | 较复杂 |
| **学习曲线** | 平缓 | 较陡峭 |

#### 3.3.3 Vite vs Webpack

| 特性 | Vite 6 | Webpack 5 |
|------|---------|------------|
| **开发启动速度** | 极快 | 较慢 |
| **HMR** | 即时 | 较慢 |
| **构建速度** | 快 | 较快 |
| **配置复杂度** | 简洁 | 复杂 |
| **生态** | 丰富 | 非常丰富 |

---

## 4. Monorepo 子包设计

### 4.1 Monorepo 架构图

```
lowcode-vue3/
├── packages/                    # 子包目录
│   ├── @lowcode/types/         # 类型定义包
│   ├── @lowcode/utils/         # 工具函数包
│   ├── @lowcode/renderer-core/ # 渲染核心（框架无关）
│   ├── @lowcode/vue-renderer/  # Vue3 渲染器
│   ├── @lowcode/vue-simulator-renderer/ # Vue3 模拟器渲染器
│   ├── @lowcode/designer/      # 设计器核心
│   ├── @lowcode/editor-core/   # 编辑器核心
│   ├── @lowcode/editor-skeleton/ # 编辑器骨架
│   ├── @lowcode/workspace/     # 工作空间管理
│   ├── @lowcode/engine/        # 引擎入口
│   ├── @lowcode/plugin-system/ # 插件系统
│   ├── @lowcode/material-protocol/ # 物料协议
│   ├── @lowcode/code-generator/ # 代码生成器
│   └── @lowcode/built-in-setters/ # 内置设置器
├── apps/                       # 应用目录
│   ├── designer/               # 设计器应用
│   ├── preview/                # 预览应用
│   └── demo/                   # 示例应用
├── docs/                       # 文档目录
├── pnpm-workspace.yaml          # pnpm 工作区配置
├── lerna.json                  # Lerna 配置
├── package.json                # 根 package.json
├── tsconfig.json              # 根 TypeScript 配置
├── .eslintrc.js             # ESLint 配置
├── .prettierrc.js           # Prettier 配置
└── vitest.config.ts         # Vitest 配置
```

### 4.2 子包职责划分

#### 4.2.1 @lowcode/types

**职责**: 提供整个框架的类型定义

**依赖**: 无

**导出**:
- 核心类型（Editor、Designer、Renderer 等）
- Schema 类型定义
- 插件类型定义
- 事件类型定义
- 工具类型定义

**特点**:
- 纯类型定义包，无运行时代码
- 所有其他包都依赖此包
- 提供完整的 TypeScript 类型安全

#### 4.2.2 @lowcode/utils

**职责**: 提供通用工具函数

**依赖**:
- @lowcode/types

**导出**:
- 深拷贝、浅比较等基础工具
- 类型检查函数
- Schema 类型守卫
- 日志工具
- 事务管理器

**特点**:
- 纯函数，无副作用
- 完整的单元测试覆盖
- 性能优化

#### 4.2.3 @lowcode/renderer-core

**职责**: 框架无关的渲染核心

**依赖**:
- @lowcode/types
- @lowcode/utils

**导出**:
- 渲染器接口定义
- 上下文管理
- 组件解析逻辑
- 生命周期管理
- 错误处理

**特点**:
- 框架无关，支持适配多种框架
- 核心渲染逻辑
- 可扩展的插件机制

#### 4.2.4 @lowcode/vue-renderer

**职责**: Vue3 渲染器实现

**依赖**:
- @lowcode/renderer-core
- @lowcode/types
- @lowcode/utils
- vue
- vue-router

**导出**:
- VueRenderer 组件
- Vue 运行时适配器
- Vue3 渲染器工厂
- 内置组件（Leaf、Slot 等）

**特点**:
- 将 Vue3 框架适配到渲染核心
- 支持多种渲染器类型（Page、Component、Block 等）
- 完整的 Vue3 集成

#### 4.2.5 @lowcode/vue-simulator-renderer

**职责**: 设计器中的模拟器渲染器

**依赖**:
- @lowcode/vue-renderer
- @lowcode/types
- @lowcode/utils
- vue
- vue-router
- pinia

**导出**:
- SimulatorRendererContainer
- SimulatorRendererView
- DocumentInstance
- 内存路由管理

**特点**:
- 在设计器中模拟渲染
- 支持多文档管理
- 实例生命周期管理
- 响应式更新

#### 4.2.6 @lowcode/designer

**职责**: 设计器核心能力

**依赖**:
- @lowcode/types
- @lowcode/utils
- @lowcode/vue-simulator-renderer
- pinia

**导出**:
- Designer 类
- Dragon 拖拽引擎
- Detecting 悬停检测
- Location 位置管理
- ComponentMeta 组件元数据

**特点**:
- 节点树管理
- 拖拽投放
- 属性编辑
- 选择管理
- 历史记录

#### 4.2.7 @lowcode/editor-core

**职责**: 编辑器核心功能

**依赖**:
- @lowcode/types
- @lowcode/utils
- @lowcode/designer
- pinia

**导出**:
- Editor 类
- 事件总线
- 命令系统
- 配置管理
- 快捷键系统
- 国际化系统

**特点**:
- 编辑器生命周期管理
- 事件系统
- 命令系统
- 配置管理
- 快捷键管理

#### 4.2.8 @lowcode/editor-skeleton

**职责**: 编辑器骨架和布局

**依赖**:
- @lowcode/types
- @lowcode/editor-core
- @lowcode/designer
- vue
- element-plus
- pinia

**导出**:
- Skeleton 类
- Widget 系统（Panel、Dock、Stage 等）
- 布局组件（Workbench、LeftArea、TopArea 等）
- 设置面板组件

**特点**:
- 布局管理
- Widget 系统
- 设置面板
- 国际化支持

#### 4.2.9 @lowcode/workspace

**职责**: 工作空间管理

**依赖**:
- @lowcode/types
- @lowcode/editor-core
- @lowcode/designer
- @lowcode/editor-skeleton
- vue
- pinia

**导出**:
- Workspace 类
- Resource 类
- EditorWindow 类
- BasicContext 类
- Context 类（视图上下文）
- Workbench 组件

**特点**:
- 窗口管理
- 资源管理
- 插件上下文
- 布局系统
- 事件系统

#### 4.2.10 @lowcode/engine

**职责**: 引擎入口和协调

**依赖**:
- @lowcode/types
- @lowcode/editor-core
- @lowcode/designer
- @lowcode/editor-skeleton
- @lowcode/workspace
- @lowcode/plugin-system

**导出**:
- init() 函数
- 内置插件
- 引擎配置

**特点**:
- 引擎初始化
- 内置插件管理
- 模块集成
- 插件上下文组装

#### 4.2.11 @lowcode/plugin-system

**职责**: 插件系统

**依赖**:
- @lowcode/types
- @lowcode/utils

**导出**:
- PluginManager 类
- PluginContext 类
- 插件生命周期钩子
- 插件元数据

**特点**:
- 插件注册和销毁
- 插件上下文管理
- 插件生命周期
- 插件依赖管理

#### 4.2.12 @lowcode/material-protocol

**职责**: 物料协议定义

**依赖**:
- @lowcode/types

**导出**:
- ComponentSchema 接口
- ComponentMeta 接口
- NpmInfo 接口
- 物料验证函数

**特点**:
- 物料标准定义
- 物料验证
- 物料解析

#### 4.2.13 @lowcode/code-generator

**职责**: 代码生成器

**依赖**:
- @lowcode/types
- @lowcode/material-protocol
- @lowcode/utils

**导出**:
- generateCode() 函数
- 代码生成配置
- 模板系统

**特点**:
- Schema 到 Vue3 源码转换
- 支持多种生成策略
- 可配置的模板

#### 4.2.14 @lowcode/built-in-setters

**职责**: 内置设置器

**依赖**:
- @lowcode/types
- @lowcode/plugin-system
- element-plus
- vue

**导出**:
- 各种 Setter 组件
- Setter 注册

**特点**:
- 丰富的属性编辑器
- 基于 Element Plus
- 可扩展

### 4.3 依赖关系图

```
@lowcode/types (无依赖)
    ↓
@lowcode/utils
    ↓
@lowcode/renderer-core
    ↓
@lowcode/vue-renderer
    ↓
@lowcode/vue-simulator-renderer
    ↓
@lowcode/designer
    ↓
@lowcode/editor-core
    ↓
@lowcode/editor-skeleton
    ↓
@lowcode/workspace
    ↓
@lowcode/engine

@lowcode/plugin-system (独立)
@lowcode/material-protocol (依赖 types)
@lowcode/code-generator (依赖 types, material-protocol)
@lowcode/built-in-setters (依赖 types, plugin-system)
```

### 4.4 包管理策略

#### 4.4.1 pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

#### 4.4.2 根 package.json

```json
{
  "name": "lowcode-vue3",
  "private": true,
  "version": "1.0.0",
  "description": "Vue3 低代码框架",
  "scripts": {
    "build": "lerna run build",
    "dev": "lerna run dev --parallel",
    "test": "lerna run test",
    "lint": "lerna run lint",
    "format": "prettier --write \"**/*.{ts,tsx,vue,json,md}\"",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.26.0",
    "lerna": "^8.0.0",
    "pnpm": "^8.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.3.0",
    "vite": "^6.0.0",
    "vitest": "^1.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

#### 4.4.3 子包 package.json 示例

```json
{
  "name": "@lowcode/vue-renderer",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "test": "vitest"
  },
  "dependencies": {
    "@lowcode/renderer-core": "workspace:*",
    "@lowcode/types": "workspace:*",
    "@lowcode/utils": "workspace:*",
    "vue": "^3.4.0",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vite": "^6.0.0",
    "vite-plugin-dts": "^3.7.0",
    "vitest": "^1.0.0"
  }
}
```

---

## 5. 核心架构设计

### 5.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        应用层 (Apps)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Designer    │  │   Preview    │  │    Demo      │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼───────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │         Engine (引擎入口)           │
          │  - 初始化所有模块                   │
          │  - 注册内置插件                     │
          │  - 组装插件上下文                   │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │       Workspace (工作空间)           │
          │  - 窗口管理                        │
          │  - 资源管理                        │
          │  - 插件上下文                      │
          │  - 布局系统                        │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │   Editor Skeleton (编辑器骨架)      │
          │  - Widget 系统                     │
          │  - 布局组件                        │
          │  - 设置面板                        │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │    Editor Core (编辑器核心)        │
          │  - 事件系统                        │
          │  - 命令系统                        │
          │  - 配置管理                        │
          │  - 快捷键系统                      │
          │  - 国际化系统                      │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │      Designer (设计器核心)          │
          │  - 节点树管理                      │
          │  - 拖拽投放                        │
          │  - 属性编辑                        │
          │  - 选择管理                        │
          │  - 历史记录                        │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │  Vue Simulator Renderer (模拟器)    │
          │  - 组件渲染                        │
          │  - 实例管理                        │
          │  - 路由模拟                        │
          │  - 响应式更新                      │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │     Vue Renderer (Vue3 渲染器)      │
          │  - Schema 解析                     │
          │  - 组件映射                        │
          │  - 生命周期管理                    │
          │  - 错误处理                        │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │    Renderer Core (渲染核心)          │
          │  - 框架无关                        │
          │  - 组件解析逻辑                    │
          │  - 上下文管理                      │
          │  - 插件机制                        │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │         Utils (工具函数)            │
          │  - 基础工具                        │
          │  - 类型检查                        │
          │  - 日志工具                        │
          └──────────────────┬───────────────────┘
                             │
          ┌──────────────────────────────────────┐
          │         Types (类型定义)            │
          │  - 核心类型                        │
          │  - Schema 类型                      │
          │  - 插件类型                        │
          └──────────────────────────────────────┘
```

### 5.2 架构分层

#### 5.2.1 应用层 (Application Layer)

**职责**: 提供最终用户使用的应用

**包含**:
- Designer 应用：低代码设计器
- Preview 应用：页面预览器
- Demo 应用：示例和文档

**特点**:
- 用户直接交互的界面
- 调用 Engine 初始化
- 使用 Workspace 提供的布局

#### 5.2.2 引擎层 (Engine Layer)

**职责**: 协调和初始化所有子系统

**包含**:
- Engine：引擎入口
- Workspace：工作空间管理
- Editor Skeleton：编辑器骨架
- Editor Core：编辑器核心
- Designer：设计器核心

**特点**:
- 提供统一的初始化接口
- 管理插件生命周期
- 协调各子系统

#### 5.2.3 渲染层 (Renderer Layer)

**职责**: 将 Schema 渲染为 Vue 组件

**包含**:
- Vue Simulator Renderer：模拟器渲染器
- Vue Renderer：Vue3 渲染器
- Renderer Core：渲染核心

**特点**:
- Schema 驱动渲染
- 支持多种渲染器类型
- 框架无关的核心

#### 5.2.4 基础层 (Foundation Layer)

**职责**: 提供基础能力和类型定义

**包含**:
- Utils：工具函数
- Types：类型定义
- Plugin System：插件系统
- Material Protocol：物料协议
- Code Generator：代码生成器

**特点**:
- 纯函数和类型定义
- 无运行时依赖
- 可独立使用

### 5.3 核心设计模式

#### 5.3.1 适配器模式 (Adapter Pattern)

**应用场景**: 将 Vue3 框架适配到渲染核心

**实现**:
```typescript
// Vue 运行时适配器
export const vueRuntimeAdapter: RuntimeAdapter = {
  Component: defineComponent,
  createContext: (defaultValue) => {
    return {
      Provider: defineComponent({
        name: 'ContextProvider',
        setup(props, { slots }) {
          provide(contextKey, defaultValue);
          return () => slots.default?.();
        }
      }),
      Consumer: defineComponent({
        name: 'ContextConsumer',
        setup(_, { slots }) {
          const context = inject(contextKey, defaultValue);
          return () => slots.default?.(context);
        }
      })
    };
  },
  createElement: h,
  forwardRef: defineComponent,
  findDOMNode: (instance) => {
    return instance?.$el;
  }
};
```

**优点**:
- 屏蔽框架差异
- 核心逻辑框架无关
- 便于支持多种框架

#### 5.3.2 工厂模式 (Factory Pattern)

**应用场景**: 创建不同类型的渲染器

**实现**:
```typescript
export function createVueRenderer(
  type: 'page' | 'component' | 'block' | 'addon' | 'temp'
): VueRenderer {
  const renderer = createRenderer(type);
  
  return class VueRendererImpl extends renderer {
    // Vue3 特定实现
  };
}
```

**优点**:
- 统一创建逻辑
- 便于扩展新类型
- 代码复用

#### 5.3.3 组合模式 (Composite Pattern)

**应用场景**: 支持嵌套组件树

**实现**:
```typescript
export class VueRenderer {
  render() {
    return h(
      'div',
      {
        class: 'lowcode-component',
        'data-id': this.schema.id
      },
      this.children.map(child => h(VueRenderer, { schema: child.schema }))
    );
  }
}
```

**优点**:
- 支持任意深度嵌套
- 统一的组件接口
- 递归渲染

#### 5.3.4 观察者模式 (Observer Pattern)

**应用场景**: Vue3 响应式系统

**实现**:
```typescript
// 使用 Vue3 的 ref 和 reactive
export const useDocument = () => {
  const document = reactive<IDocumentModel>({
    nodes: [],
    selection: [],
    history: []
  });

  // 响应式更新
  watch(
    () => document.nodes,
    (newNodes) => {
      // 节点变化时触发
    },
    { deep: true }
  );

  return { document };
};
```

**优点**:
- 自动追踪依赖
- 精确更新
- 代码简洁

#### 5.3.5 单例模式 (Singleton Pattern)

**应用场景**: 全局唯一的实例

**实现**:
```typescript
export class SimulatorRendererContainer {
  private static instance: SimulatorRendererContainer;

  private constructor() {
    // 私有构造函数
  }

  static getInstance(): SimulatorRendererContainer {
    if (!SimulatorRendererContainer.instance) {
      SimulatorRendererContainer.instance = new SimulatorRendererContainer();
    }
    return SimulatorRendererContainer.instance;
  }
}
```

**优点**:
- 全局唯一
- 便于访问
- 统一管理

#### 5.3.6 策略模式 (Strategy Pattern)

**应用场景**: 设备适配、设计模式切换

**实现**:
```typescript
export interface DeviceStrategy {
  getViewport(): Viewport;
  getStyles(): CSSProperties;
}

export class MobileStrategy implements DeviceStrategy {
  getViewport() {
    return { width: 375, height: 667 };
  }
  
  getStyles() {
    return { transform: 'scale(0.5)' };
  }
}

export class DesktopStrategy implements DeviceStrategy {
  getViewport() {
    return { width: 1920, height: 1080 };
  }
  
  getStyles() {
    return {};
  }
}

export function useDeviceStrategy(device: 'mobile' | 'desktop') {
  return device === 'mobile' ? new MobileStrategy() : new DesktopStrategy();
}
```

**优点**:
- 算法可互换
- 避免条件判断
- 便于扩展

#### 5.3.7 插件模式 (Plugin Pattern)

**应用场景**: 插件系统

**实现**:
```typescript
export interface Plugin {
  name: string;
  init(context: PluginContext): void;
  destroy(): void;
}

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  register(plugin: Plugin) {
    this.plugins.set(plugin.name, plugin);
    plugin.init(this.createContext(plugin.name));
  }

  unregister(name: string) {
    const plugin = this.plugins.get(name);
    if (plugin) {
      plugin.destroy();
      this.plugins.delete(name);
    }
  }
}
```

**优点**:
- 动态扩展
- 不修改核心代码
- 便于第三方集成

---

## 6. 引擎内核架构

### 6.1 Engine 类设计

```typescript
export class Engine {
  private workspace: Workspace;
  private editor: Editor;
  private designer: Designer;
  private skeleton: Skeleton;
  private pluginManager: PluginManager;

  constructor(config: EngineConfig) {
    this.initialize(config);
  }

  private async initialize(config: EngineConfig) {
    // 1. 初始化插件管理器
    this.pluginManager = new PluginManager();
    
    // 2. 初始化工作空间
    this.workspace = new Workspace(config, this.pluginManager);
    
    // 3. 初始化编辑器
    this.editor = new Editor(config, this.workspace);
    
    // 4. 初始化设计器
    this.designer = new Designer(config, this.editor);
    
    // 5. 初始化骨架
    this.skeleton = new Skeleton(this.editor, this.designer);
    
    // 6. 注册内置插件
    await this.registerInnerPlugins();
    
    // 7. 初始化完成
    this.emit('ready');
  }

  private async registerInnerPlugins() {
    // 注册内置插件
    await this.pluginManager.register(new ComponentMetaParserPlugin());
    await this.pluginManager.register(new SetterRegistryPlugin());
    await this.pluginManager.register(new DefaultPanelRegistryPlugin());
    await this.pluginManager.register(new BuiltinHotkeyPlugin());
    await this.pluginManager.register(new DefaultContextMenuPlugin());
  }

  public async init() {
    await this.workspace.init();
  }

  public dispose() {
    this.pluginManager.dispose();
    this.workspace.dispose();
    this.editor.dispose();
    this.designer.dispose();
    this.skeleton.dispose();
  }
}
```

### 6.2 引擎配置

```typescript
export interface EngineConfig {
  // 设计器配置
  designMode?: 'design' | 'preview' | 'live';
  device?: 'desktop' | 'mobile' | 'tablet';
  locale?: string;
  theme?: 'light' | 'dark';
  
  // 插件配置
  plugins?: Plugin[];
  innerPlugins?: Plugin[];
  
  // 物料配置
  components?: Record<string, Component>;
  assets?: Asset[];
  
  // 路由配置
  router?: RouterConfig;
  
  // 其他配置
  [key: string]: any;
}
```

### 6.3 引擎初始化流程

```
用户调用 init()
    ↓
Engine 构造函数
    ↓
初始化 PluginManager
    ↓
初始化 Workspace
    ↓
初始化 Editor
    ↓
初始化 Designer
    ↓
初始化 Skeleton
    ↓
注册内置插件
    ↓
触发 'ready' 事件
    ↓
引擎初始化完成
```

---

## 7. 渲染器架构

### 7.1 Vue Renderer 核心类

```typescript
export class VueRenderer {
  private schema: ComponentSchema;
  private components: Record<string, Component>;
  private appContext: AppContext;

  constructor(props: VueRendererProps) {
    this.schema = props.schema;
    this.components = props.components || {};
    this.appContext = props.appContext || {};
  }

  public render() {
    return h(
      'div',
      {
        class: 'lowcode-component',
        'data-id': this.schema.id
      },
      this.renderChildren()
    );
  }

  private renderChildren() {
    if (!this.schema.children) {
      return null;
    }

    return this.schema.children.map(child => {
      if (child.componentName) {
        const Component = this.components[child.componentName];
        if (Component) {
          return h(Component, {
            ...child.props,
            key: child.id
          });
        }
      }
      return h(VueRenderer, {
        schema: child,
        components: this.components,
        appContext: this.appContext,
        key: child.id
      });
    });
  }
}
```

### 7.2 渲染器类型

| 渲染器类型 | 用途 | 特点 |
|-----------|------|------|
| **PageRenderer** | 渲染页面级组件 | 包含页面布局、路由等 |
| **ComponentRenderer** | 渲染普通组件 | 最通用的渲染器 |
| **BlockRenderer** | 渲染区块组件 | 支持插槽、循环等 |
| **AddonRenderer** | 渲染插件组件 | 支持插件扩展 |
| **TempRenderer** | 渲染临时组件 | 用于预览、拖拽等 |

### 7.3 渲染流程

```
Schema
    ↓
解析 Schema
    ↓
查找组件映射
    ↓
创建 Vue 组件
    ↓
递归渲染子节点
    ↓
生成 VNode
    ↓
渲染到 DOM
```

---

## 8. 物料协议设计

### 8.1 ComponentSchema 接口

```typescript
export interface ComponentSchema {
  // 基础信息
  componentName: string;
  id?: string;
  title?: string;
  description?: string;
  
  // 属性
  props?: Record<string, any>;
  propsExtends?: Record<string, any>;
  
  // 子节点
  children?: ComponentSchema[] | ComponentSchema;
  
  // 样式
  style?: CSSProperties;
  className?: string;
  
  // 条件渲染
  condition?: string | boolean;
  
  // 循环渲染
  loop?: {
    args: string[];
    dataSource: string;
  };
  
  // 插槽
  slotFor?: string;
  
  // 其他元数据
  [key: string]: any;
}
```

### 8.2 ComponentMeta 接口

```typescript
export interface ComponentMeta {
  // 组件信息
  componentName: string;
  title: string;
  description?: string;
  docUrl?: string;
  screenshot?: string;
  devMode?: 'proCode' | 'lowCode';
  tags?: string[];
  
  // npm 信息
  npm?: NpmInfo;
  
  // 组件属性
  props?: PropConfig[];
  propsExtends?: PropConfig[];
  
  // 组件行为
  configure?: Configure;
  actions?: ComponentAction[];
  
  // 其他元数据
  [key: string]: any;
}
```

### 8.3 NpmInfo 接口

```typescript
export interface NpmInfo {
  package: string;
  version: string;
  exportName?: string;
  main?: string;
  destructuring?: boolean;
  subName?: string;
}
```

### 8.4 物料验证

```typescript
export function validateComponentSchema(schema: ComponentSchema): ValidationResult {
  const errors: string[] = [];
  
  // 验证必需字段
  if (!schema.componentName) {
    errors.push('componentName is required');
  }
  
  // 验证 props
  if (schema.props) {
    Object.entries(schema.props).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        errors.push(`prop ${key} is null or undefined`);
      }
    });
  }
  
  // 验证子节点
  if (schema.children) {
    if (Array.isArray(schema.children)) {
      schema.children.forEach((child, index) => {
        const childValidation = validateComponentSchema(child);
        errors.push(...childValidation.errors.map(e => `children[${index}]: ${e}`));
      });
    } else {
      const childValidation = validateComponentSchema(schema.children);
      errors.push(...childValidation.errors.map(e => `children: ${e}`));
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

---

## 9. 设计器面板架构

### 9.1 面板类型

| 面板类型 | 位置 | 用途 |
|---------|------|------|
| **TopArea** | 顶部 | 工具栏、菜单栏 |
| **LeftArea** | 左侧 | 组件面板、大纲面板 |
| **LeftFloatPane** | 左侧浮动 | 属性面板、样式面板 |
| **LeftFixedPane** | 左侧固定 | 固定面板 |
| **SubTopArea** | 子顶部 | 面板工具栏 |
| **MainArea** | 中间 | 画布区域 |
| **BottomArea** | 底部 | 日志面板、控制台 |

### 9.2 Widget 系统

```typescript
export interface Widget {
  type: 'Panel' | 'Dock' | 'Stage';
  name: string;
  title?: string;
  icon?: string;
  area?: AreaType;
  props?: Record<string, any>;
  content?: Component;
  propsNode?: ComponentSchema;
}
```

### 9.3 面板组件示例

```vue
<template>
  <div class="lc-panel lc-left-float-pane">
    <div class="lc-panel-header">
      <el-icon><component :is="icon" /></el-icon>
      <span>{{ title }}</span>
    </div>
    <div class="lc-panel-body">
      <component :is="content" v-bind="props" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ElIcon } from 'element-plus';

const props = defineProps<{
  title: string;
  icon: Component;
  content: Component;
  [key: string]: any;
}>();
</script>

<style scoped>
.lc-panel {
  /* 样式定义 */
}
</style>
```

---

## 10. 插件系统架构

### 10.1 插件接口

```typescript
export interface Plugin {
  // 插件元数据
  name: string;
  version?: string;
  description?: string;
  
  // 插件生命周期
  init(context: PluginContext): void | Promise<void>;
  destroy?(): void | Promise<void>;
  
  // 插件配置
  config?: PluginConfig;
  
  // 插件依赖
  dependencies?: string[];
}
```

### 10.2 插件上下文

```typescript
export interface PluginContext {
  // 核心能力
  workspace: Workspace;
  project: Project;
  skeleton: Skeleton;
  designer: Designer;
  
  // API
  canvas: CanvasAPI;
  material: MaterialAPI;
  setters: SettersAPI;
  plugins: PluginsAPI;
  common: CommonAPI;
  event: EventAPI;
  logger: LoggerAPI;
  hotkey: HotkeyAPI;
  
  // 配置
  config: EngineConfig;
  
  // 其他
  [key: string]: any;
}
```

### 10.3 插件管理器

```typescript
export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private contexts: Map<string, PluginContext> = new Map();

  async register(plugin: Plugin) {
    // 检查依赖
    await this.checkDependencies(plugin);
    
    // 创建上下文
    const context = this.createContext(plugin);
    
    // 初始化插件
    await plugin.init(context);
    
    // 存储插件
    this.plugins.set(plugin.name, plugin);
    this.contexts.set(plugin.name, context);
    
    // 触发事件
    this.emit('plugin:registered', plugin);
  }

  async unregister(name: string) {
    const plugin = this.plugins.get(name);
    if (plugin) {
      // 销毁插件
      if (plugin.destroy) {
        await plugin.destroy();
      }
      
      // 清理
      this.plugins.delete(name);
      this.contexts.delete(name);
      
      // 触发事件
      this.emit('plugin:unregistered', plugin);
    }
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  getContext(name: string): PluginContext | undefined {
    return this.contexts.get(name);
  }

  private async checkDependencies(plugin: Plugin) {
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this.plugins.has(dep)) {
          throw new Error(`Plugin dependency ${dep} not found`);
        }
      }
    }
  }

  private createContext(plugin: Plugin): PluginContext {
    // 组装插件上下文
    return {
      workspace: this.workspace,
      project: this.project,
      skeleton: this.skeleton,
      designer: this.designer,
      canvas: this.canvas,
      material: this.material,
      setters: this.setters,
      plugins: this.pluginsAPI,
      common: this.common,
      event: this.event,
      logger: this.logger,
      hotkey: this.hotkey,
      config: this.config
    };
  }
}
```

### 10.4 插件生命周期

```
插件注册
    ↓
检查依赖
    ↓
创建上下文
    ↓
调用 init()
    ↓
插件运行中
    ↓
插件销毁
    ↓
调用 destroy()
    ↓
清理资源
```

---

## 11. 数据流转与组件交互

### 11.1 响应式系统

#### 11.1.1 使用 Vue3 响应式

```typescript
// 使用 reactive 创建响应式对象
export const useDocument = () => {
  const document = reactive<IDocumentModel>({
    nodes: [],
    selection: [],
    history: []
  });

  // 监听变化
  watch(
    () => document.nodes,
    (newNodes, oldNodes) => {
      console.log('Nodes changed:', newNodes);
    },
    { deep: true }
  );

  return { document };
};

// 使用 ref 创建响应式引用
export const useSelection = () => {
  const selection = ref<INode[]>([]);

  // 监听变化
  watch(selection, (newSelection) => {
    console.log('Selection changed:', newSelection);
  });

  return { selection };
};
```

#### 11.1.2 Composition API 优势

1. **逻辑复用**: 通过组合函数复用逻辑
2. **类型推断**: 更好的 TypeScript 支持
3. **代码组织**: 相关逻辑组织在一起
4. **性能优化**: 更细粒度的响应式

### 11.2 数据流设计

#### 11.2.1 单向数据流

```
用户操作
    ↓
触发事件
    ↓
更新状态 (Pinia Store)
    ↓
触发响应式更新
    ↓
组件重新渲染
    ↓
更新 DOM
```

#### 11.2.2 Pinia Store 示例

```typescript
import { defineStore } from 'pinia';

export const useDocumentStore = defineStore('document', () => {
  // 状态
  const nodes = ref<INode[]>([]);
  const selection = ref<INode[]>([]);
  const history = ref<IHistoryItem[]>([]);
  const historyIndex = ref(0);

  // 计算属性
  const selectedNode = computed(() => {
    return selection.value.length === 1 ? selection.value[0] : null;
  });

  // 操作
  function addNode(node: INode) {
    nodes.value.push(node);
  }

  function removeNode(id: string) {
    const index = nodes.value.findIndex(n => n.id === id);
    if (index !== -1) {
      nodes.value.splice(index, 1);
    }
  }

  function selectNode(node: INode) {
    selection.value = [node];
  }

  function clearSelection() {
    selection.value = [];
  }

  // 历史记录
  function pushHistory(item: IHistoryItem) {
    history.value.push(item);
    historyIndex.value = history.value.length - 1;
  }

  function undo() {
    if (historyIndex.value > 0) {
      historyIndex.value--;
      const item = history.value[historyIndex.value];
      // 恢复状态
    }
  }

  function redo() {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++;
      const item = history.value[historyIndex.value];
      // 恢复状态
    }
  }

  return {
    // 状态
    nodes,
    selection,
    history,
    historyIndex,
    
    // 计算属性
    selectedNode,
    
    // 操作
    addNode,
    removeNode,
    selectNode,
    clearSelection,
    pushHistory,
    undo,
    redo
  };
});
```

### 11.3 组件交互

#### 11.3.1 父子组件通信

```vue
<!-- 父组件 -->
<template>
  <div>
    <ChildComponent
      :value="parentValue"
      @update:value="handleUpdate"
      @custom-event="handleCustomEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentValue = ref('initial value');

function handleUpdate(newValue: string) {
  parentValue.value = newValue;
}

function handleCustomEvent(payload: any) {
  console.log('Custom event:', payload);
}
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <input v-model="localValue" @input="emitUpdate" />
    <button @click="triggerCustomEvent">Trigger Event</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits<{
  'update:value': [value: string];
  'custom-event': [payload: any];
}>();

const localValue = ref(props.value);

watch(() => props.value, (newValue) => {
  localValue.value = newValue;
});

function emitUpdate() {
  emit('update:value', localValue.value);
}

function triggerCustomEvent() {
  emit('custom-event', { data: 'test' });
}
</script>
```

#### 11.3.2 跨组件通信

```typescript
// 使用事件总线
import { EventBus } from '@lowcode/utils';

const eventBus = new EventBus();

// 发送事件
eventBus.emit('node:select', { nodeId: 'xxx' });

// 监听事件
eventBus.on('node:select', (data) => {
  console.log('Node selected:', data);
});

// 取消监听
eventBus.off('node:select');
```

```typescript
// 使用 Pinia Store
import { useDocumentStore } from './stores/document';

const documentStore = useDocumentStore();

// 在组件中使用
documentStore.selectNode(node);
const selectedNode = documentStore.selectedNode;
```

---

## 12. 性能优化策略

### 12.1 渲染优化

#### 12.1.1 虚拟滚动

```vue
<template>
  <div class="virtual-list-container" ref="containerRef">
    <div class="virtual-list-content" :style="{ height: totalHeight + 'px' }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="virtual-list-item"
        :style="{ transform: `translateY(${item.offset}px)` }"
      >
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  items: any[];
  itemHeight: number;
}>();

const containerRef = ref<HTMLElement>();
const scrollTop = ref(0);
const containerHeight = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);

const visibleItems = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight);
  const end = Math.min(
    start + Math.ceil(containerHeight.value / props.itemHeight),
    props.items.length
  );

  return props.items.slice(start, end).map((item, index) => ({
    ...item,
    offset: (start + index) * props.itemHeight
  }));
});

const handleScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop;
    containerHeight.value = containerRef.value.clientHeight;
  }
};

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll);
    containerHeight.value = containerRef.value.clientHeight;
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll);
  }
});
</script>
```

#### 12.1.2 组件懒加载

```typescript
// 使用 defineAsyncComponent
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'));

// 或者使用 Suspense
<Suspense>
  <template #default>
    <HeavyComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

### 12.2 状态管理优化

#### 12.2.1 按需订阅

```typescript
// 使用 computed 按需计算
const selectedNode = computed(() => {
  return documentStore.nodes.find(node => 
    node.id === documentStore.selection[0]?.id
  );
});

// 使用 watchEffect 自动追踪依赖
watchEffect(() => {
  if (selectedNode.value) {
    console.log('Selected node changed:', selectedNode.value);
  }
});
```

#### 12.2.2 防抖和节流

```typescript
import { debounce, throttle } from '@lowcode/utils';

// 防抖
const debouncedSearch = debounce((keyword: string) => {
  // 搜索逻辑
}, 300);

// 节流
const throttledScroll = throttle((scrollTop: number) => {
  // 滚动逻辑
}, 100);
```

### 12.3 内存优化

#### 12.3.1 组件卸载清理

```vue
<script setup lang="ts">
import { onUnmounted } from 'vue';
import { eventBus } from '@lowcode/utils';

onUnmounted(() => {
  // 清理事件监听
  eventBus.off('node:select');
  
  // 清理定时器
  clearInterval(timer);
  
  // 清理其他资源
});
</script>
```

#### 12.3.2 对象池

```typescript
// 使用对象池复用对象
class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;

  constructor(factory: () => T, initialSize = 10) {
    this.factory = factory;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }

  acquire(): T {
    return this.pool.pop() || this.factory();
  }

  release(obj: T) {
    this.pool.push(obj);
  }
}
```

---

## 13. 扩展性设计

### 13.1 插件扩展点

#### 13.1.1 生命周期钩子

```typescript
export interface PluginHooks {
  // 引擎生命周期
  onEngineInit?(engine: Engine): void;
  onEngineReady?(engine: Engine): void;
  onEngineDestroy?(engine: Engine): void;
  
  // 文档生命周期
  onDocumentCreate?(document: IDocumentModel): void;
  onDocumentDestroy?(document: IDocumentModel): void;
  
  // 节点生命周期
  onNodeAdd?(node: INode): void;
  onNodeRemove?(node: INode): void;
  onNodeSelect?(node: INode): void;
  onNodeUpdate?(node: INode): void;
  
  // 渲染生命周期
  onRenderStart?(schema: ComponentSchema): void;
  onRenderEnd?(vnode: VNode): void;
  
  // 其他钩子
  onEvent?(event: string, data: any): void;
  onError?(error: Error): void;
}
```

#### 13.1.2 API 扩展点

```typescript
// Canvas API 扩展
export interface CanvasAPI {
  // 内置方法
  getNodes(): INode[];
  addNode(node: INode): void;
  removeNode(id: string): void;
  
  // 扩展方法
  [key: string]: any;
}

// Material API 扩展
export interface MaterialAPI {
  // 内置方法
  getComponent(name: string): Component;
  registerComponent(name: string, component: Component): void;
  
  // 扩展方法
  [key: string]: any;
}
```

### 13.2 组件扩展

#### 13.2.1 自定义组件

```typescript
// 定义组件
const MyComponent = defineComponent({
  name: 'MyComponent',
  props: {
    title: String,
    content: String
  },
  setup(props) {
    return () => h('div', { class: 'my-component' }, [
      h('h2', props.title),
      h('p', props.content)
    ]);
  }
});

// 注册组件
const components = {
  'MyComponent': MyComponent
};

// 在渲染器中使用
<VueRenderer
  :schema="schema"
  :components="components"
/>
```

#### 13.2.2 自定义 Setter

```vue
<template>
  <div class="custom-setter">
    <el-input v-model="localValue" @input="handleChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  value: string;
  onChange: (value: string) => void;
}>();

const localValue = ref(props.value);

watch(() => props.value, (newValue) => {
  localValue.value = newValue;
});

function handleChange(value: string) {
  localValue.value = value;
  props.onChange(value);
}
</script>
```

```typescript
// 注册 Setter
import { registerSetter } from '@lowcode/plugin-system';

registerSetter('MyCustomSetter', {
  component: defineAsyncComponent(() => import('./MyCustomSetter.vue')),
  title: '自定义 Setter',
  description: '自定义属性编辑器'
});
```

### 13.3 主题扩展

#### 13.3.1 主题配置

```typescript
export interface ThemeConfig {
  name: string;
  variables: Record<string, string>;
  components?: Record<string, any>;
}

export const themes: Record<string, ThemeConfig> = {
  light: {
    name: 'Light',
    variables: {
      '--primary-color': '#409eff',
      '--bg-color': '#ffffff',
      '--text-color': '#303133'
    }
  },
  dark: {
    name: 'Dark',
    variables: {
      '--primary-color': '#409eff',
      '--bg-color': '#1a1a1a',
      '--text-color': '#e5e5e5'
    }
  }
};
```

#### 13.3.2 主题切换

```vue
<template>
  <div :class="['app', currentTheme]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue';

const currentTheme = ref('light');

provide('theme', currentTheme);

watch(currentTheme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
});
</script>
```

---

## 14. 开发规范

### 14.1 命名规范

#### 14.1.1 文件命名

- **组件文件**: PascalCase，如 `MyComponent.vue`
- **工具文件**: camelCase，如 `myUtils.ts`
- **类型文件**: camelCase，如 `myTypes.ts`
- **常量文件**: UPPER_SNAKE_CASE，如 `CONSTANTS.ts`

#### 14.1.2 变量命名

- **常量**: UPPER_SNAKE_CASE，如 `MAX_SIZE`
- **变量**: camelCase，如 `userName`
- **类名**: PascalCase，如 `MyClass`
- **接口**: PascalCase，以 I 开头，如 `IUser`
- **类型**: PascalCase，如 `UserType`

#### 14.1.3 函数命名

- **普通函数**: camelCase，如 `getUserInfo`
- **事件处理**: handle + 动作，如 `handleClick`
- **生命周期**: on + 事件，如 `onMounted`

### 14.2 代码风格

#### 14.2.1 Vue 组件

```vue
<template>
  <div class="my-component">
    <h1>{{ title }}</h1>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Props
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// State
const internalCount = ref(props.count);

// Computed
const doubledCount = computed(() => internalCount.value * 2);

// Methods
function handleClick(event: MouseEvent) {
  internalCount.value++;
  emit('click', event);
}

// Lifecycle
onMounted(() => {
  console.log('Component mounted');
});
</script>

<style scoped>
.my-component {
  /* 样式定义 */
}
</style>
```

#### 14.2.2 TypeScript

```typescript
// 类型定义
interface User {
  id: string;
  name: string;
  age?: number;
}

// 函数定义
function getUserInfo(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}

// 类定义
class UserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json();
  }
}

// 泛型
function identity<T>(value: T): T {
  return value;
}
```

### 14.3 注释规范

#### 14.3.1 文件注释

```typescript
/**
 * 文件描述
 * 
 * @module myModule
 * @author 作者名
 * @date 创建日期
 */

/**
 * 函数描述
 * 
 * @param param1 参数1说明
 * @param param2 参数2说明
 * @returns 返回值说明
 * @example
 * ```typescript
 * const result = myFunction('arg1', 'arg2');
 * ```
 */
function myFunction(param1: string, param2: number): boolean {
  // 实现
}
```

#### 14.3.2 行内注释

```typescript
// 单行注释
const value = 10;

/**
 * 多行注释
 * 详细说明
 */
const value = 10;

// TODO: 待办事项
// FIXME: 需要修复
// HACK: 临时方案
```

### 14.4 Git 提交规范

#### 14.4.1 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 14.4.2 类型

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式调整
- **refactor**: 重构
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建/工具链相关

#### 14.4.3 示例

```
feat(renderer): add virtual scrolling support

Implement virtual scrolling for large lists to improve performance.

- Add VirtualList component
- Add useVirtualList composable
- Update documentation

Closes #123
```

---

## 15. 实施路线图

### 15.1 阶段一：基础设施（1-2个月）

**目标**: 搭建 Monorepo 基础设施和核心类型定义

**任务**:
1. 初始化 Monorepo 项目
2. 配置 pnpm workspace
3. 配置 Lerna 和 Changesets
4. 配置 Vite 6 构建
5. 配置 TypeScript
6. 配置 ESLint、Prettier、Stylelint
7. 配置 Vitest 测试
8. 创建 @lowcode/types 包
9. 创建 @lowcode/utils 包
10. 创建 @lowcode/plugin-system 包

**交付物**:
- 完整的 Monorepo 项目结构
- 基础工具链配置
- 核心类型定义
- 工具函数库
- 插件系统基础

### 15.2 阶段二：渲染器（2-3个月）

**目标**: 实现渲染核心和 Vue3 渲染器

**任务**:
1. 创建 @lowcode/renderer-core 包
2. 实现框架无关的渲染核心
3. 创建 @lowcode/vue-renderer 包
4. 实现 Vue3 运行时适配器
5. 实现多种渲染器类型
6. 创建 @lowcode/vue-simulator-renderer 包
7. 实现模拟器渲染器
8. 实现实例管理
9. 实现路由模拟
10. 编写单元测试

**交付物**:
- 渲染核心库
- Vue3 渲染器
- 模拟器渲染器
- 完整的测试覆盖

### 15.3 阶段三：设计器核心（2-3个月）

**目标**: 实现设计器核心能力

**任务**:
1. 创建 @lowcode/designer 包
2. 实现节点树管理
3. 实现 Dragon 拖拽引擎
4. 实现 Detecting 悬停检测
5. 实现 Location 位置管理
6. 实现选择管理
7. 实现历史记录
8. 实现属性编辑
9. 创建 @lowcode/material-protocol 包
10. 实现物料协议

**交付物**:
- 设计器核心库
- 物料协议定义
- 拖拽投放系统
- 属性编辑系统

### 15.4 阶段四：编辑器（2-3个月）

**目标**: 实现编辑器核心和骨架

**任务**:
1. 创建 @lowcode/editor-core 包
2. 实现事件系统
3. 实现命令系统
4. 实现配置管理
5. 实现快捷键系统
6. 实现国际化系统
7. 创建 @lowcode/editor-skeleton 包
8. 实现 Widget 系统
9. 实现布局组件
10. 实现设置面板

**交付物**:
- 编辑器核心库
- 编辑器骨架库
- Widget 系统
- 布局系统

### 15.5 阶段五：工作空间（1-2个月）

**目标**: 实现工作空间管理

**任务**:
1. 创建 @lowcode/workspace 包
2. 实现窗口管理
3. 实现资源管理
4. 实现插件上下文
5. 实现布局系统
6. 实现事件系统
7. 实现多窗口支持
8. 编写集成测试

**交付物**:
- 工作空间库
- 窗口管理系统
- 资源管理系统

### 15.6 阶段六：引擎和应用（1-2个月）

**目标**: 实现引擎入口和示例应用

**任务**:
1. 创建 @lowcode/engine 包
2. 实现引擎初始化
3. 实现内置插件
4. 创建 Designer 应用
5. 创建 Preview 应用
6. 创建 Demo 应用
7. 集成所有模块
8. 编写端到端测试

**交付物**:
- 引擎库
- Designer 应用
- Preview 应用
- Demo 应用

### 15.7 阶段七：代码生成和扩展（1-2个月）

**目标**: 实现代码生成器和扩展功能

**任务**:
1. 创建 @lowcode/code-generator 包
2. 实现代码生成器
3. 实现模板系统
4. 创建 @lowcode/built-in-setters 包
5. 实现内置 Setter
6. 编写插件开发文档
7. 编写组件开发文档
8. 编写 API 文档

**交付物**:
- 代码生成器
- 内置 Setter 库
- 完整的开发文档

### 15.8 阶段八：优化和发布（1个月）

**目标**: 性能优化和正式发布

**任务**:
1. 性能优化
2. 内存优化
3. 代码优化
4. 文档完善
5. 示例完善
6. 发布准备
7. 正式发布 v1.0.0

**交付物**:
- 性能优化版本
- 完整文档
- 正式发布版本

---

## 总结

本架构设计方案基于对现有 React 版本低代码引擎的深入分析，结合 Vue3 生态的最新特性，设计了一套完整的、高性能的、高可扩展的低代码框架。

### 核心优势

1. **现代化技术栈**: Vue3、Vite 6、pnpm、Monorepo
2. **高性能**: Vue3 响应式系统、虚拟滚动、按需加载
3. **高可扩展性**: 强大的插件系统、丰富的扩展点
4. **类型安全**: 完整的 TypeScript 类型定义
5. **开发体验**: Composition API、清晰的代码组织
6. **模块化**: 清晰的模块边界、Monorepo 管理

### 关键创新

1. **基于 Vue3 响应式系统**: 替代 MobX，简化状态管理
2. **Composition API**: 提供更好的逻辑复用和代码组织
3. **Pinia 状态管理**: Vue3 官方推荐，简洁的 API
4. **Vite 6 构建工具**: 极快的构建速度和开发体验
5. **pnpm + Monorepo**: 高效的依赖管理和项目组织

### 实施建议

1. **分阶段实施**: 按照路线图逐步实施，每个阶段都有明确的交付物
2. **持续集成**: 使用 CI/CD 确保代码质量
3. **测试驱动**: 编写完整的单元测试、集成测试、端到端测试
4. **文档先行**: 同步编写文档，确保文档与代码同步
5. **社区参与**: 开放源代码，吸引社区贡献

本架构设计方案为 Vue3 低代码框架的开发提供了详细的指导，可以作为实际开发的蓝图。
