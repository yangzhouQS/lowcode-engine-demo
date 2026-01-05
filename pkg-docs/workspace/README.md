# Workspace 模块文档

## 概述

`@alilc/lowcode-workspace` 是低代码引擎的工作空间管理模块，负责管理编辑器的窗口系统、资源管理、插件上下文和布局系统。

## 文档列表

### 核心文档

- [架构设计文档](./01-架构设计.md) - 模块架构设计、核心组件、数据流、技术实现
- [API 设计文档](./02-API设计.md) - 完整的 API 参考、类型定义、使用示例、最佳实践
- [文件功能说明](./03-文件功能说明.md) - 所有文件的功能说明、依赖关系、代码统计

### 源文件文档

#### 核心模块

- [src/index.ts](./04-src-index.ts.md) - 模块入口文件
- [src/workspace.ts](./05-src-workspace.ts.md) - 工作空间核心类
- [src/resource.ts](./06-src-resource.ts.md) - 资源类
- [src/resource-type.ts](./07-src-resource-type.ts.md) - 资源类型类
- [src/skeleton-context.ts](./08-src-skeleton-context.ts.md) - 骨架上下文
- [src/window.ts](./09-src-window.ts.md) - 编辑器窗口类
- [src/less-variables.less](./10-src-less-variables.less.md) - LESS 变量定义

#### 上下文模块

- [src/context/base-context.ts](./11-src-context-base-context.ts.md) - 基础上下文类
- [src/context/view-context.ts](./12-src-context-view-context.ts.md) - 视图上下文类

#### 布局模块

- [src/layouts/workbench.tsx](./14-src-layouts-workbench.tsx.md) - 工作台布局组件

#### 视图模块

- [src/view/editor-view.tsx](./15-src-view-editor-view.tsx.md) - 编辑器视图组件
- [src/view/resource-view.tsx](./16-src-view-resource-view.tsx.md) - 资源视图组件
- [src/view/resource-view.less](./17-src-view-resource-view.less.md) - 资源视图样式
- [src/view/window-view.tsx](./18-src-view-window-view.tsx.md) - 窗口视图组件

#### 插件模块

- [src/inner-plugins/webview.tsx](./13-src-inner-plugins-webview.tsx.md) - Webview 插件

#### 样式模块

（样式模块已在核心模块中）

#### 配置文件

- [package.json](./19-package.json.md) - NPM 包配置
- [build.json](./20-build.json.md) - 构建配置
- [build.test.json](./21-build.test.json.md) - 测试构建配置
- [jest.config.js](./22-jest.config.js.md) - Jest 测试配置
- [tsconfig.json](./23-tsconfig.json.md) - TypeScript 配置

## 快速开始

### 安装

```bash
npm install @alilc/lowcode-workspace
```

### 基本使用

```typescript
import { Workspace, Workbench } from '@alilc/lowcode-workspace';

// 创建工作空间
const workspace = new Workspace(
  (plugins) => {
    // 注册内部插件
  },
  shellModelFactory
);

// 注册资源类型
await workspace.registerResourceType({
  resourceName: 'page',
  resourceType: 'editor',
  resourceTypeModel: {
    editorViews: [
      {
        viewName: 'editor-view',
        type: 'editor',
      }
    ],
  }
});

// 初始化窗口
await workspace.initWindow();

// 渲染工作台
<Workbench workspace={workspace} />
```

## 核心功能

### 1. 窗口管理

```typescript
// 打开窗口
await workspace.openEditorWindowByResource(resource);

// 切换窗口
await workspace.openEditorWindowById(windowId);

// 关闭窗口
workspace.removeEditorWindow(windowId);

// 监听窗口变化
workspace.onChangeWindows(() => {
  console.log('Windows changed');
});
```

### 2. 资源管理

```typescript
// 注册资源类型
await workspace.registerResourceType(resourceTypeModel);

// 创建资源
const resource = new Resource(resourceData, resourceType, workspace);

// 导入 Schema
await resource.import(schema);

// 保存数据
await resource.save(data);
```

### 3. 插件开发

```typescript
// 插件通过上下文访问所有能力
const context = plugins._getLowCodePluginContext({
  pluginName: 'myPlugin',
});

// 访问项目
context.project.get('documentId');

// 访问骨架
context.skeleton.addPanel({
  type: 'Panel',
  name: 'myPanel',
});

// 访问设置器
context.setters.get('mySetter');
```

## 架构特点

### 1. 模块化设计

- 清晰的职责划分
- 易于维护和扩展
- 高内聚低耦合

### 2. 响应式状态管理

- 使用 MobX 进行状态管理
- 自动响应数据变化
- 高效的 UI 更新

### 3. 事件驱动

- 使用事件总线进行通信
- 解耦组件间依赖
- 支持事件监听和取消

### 4. 插件系统

- 统一的插件上下文
- 丰富的插件 API
- 灵活的插件注册

### 5. 多窗口支持

- 支持多窗口管理
- 窗口队列机制
- 窗口休眠功能

## 技术栈

- **React**: UI 框架
- **MobX**: 状态管理
- **TypeScript**: 类型系统
- **LESS**: 样式预处理器

## 相关模块

- [@alilc/lowcode-designer](../react-renderer/README.md) - 设计器模块
- [@alilc/lowcode-editor-core](../react-renderer/README.md) - 编辑器核心模块
- [@alilc/lowcode-editor-skeleton](../react-renderer/README.md) - 骨架模块

## 贡献指南

欢迎贡献代码和文档！请参考项目的 [CONTRIBUTING.md](../../CONTRIBUTOR.md)。

## 许可证

[MIT](../../LICENSE)
