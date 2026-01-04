# Engine 模块文档

## 模块概述

`@alilc/lowcode-engine` 是低代码引擎的核心模块，负责初始化和协调所有子系统，包括编辑器、设计器、骨架、插件管理等。它是低代码引擎的入口点，提供了完整的低代码编辑器功能。

## 主要功能

### 1. 引擎初始化

- 初始化编辑器实例
- 创建设计器实例
- 注册内置插件
- 配置工作区

### 2. 内置插件管理

- 组件元数据解析器
- Setter 注册器
- 默认面板注册器
- 内置快捷键
- 默认右键菜单
- 命令插件
- 大纲面板插件

### 3. 模块集成

- 集成 Editor Core
- 集成 Designer
- 集成 Skeleton
- 集成 Workspace
- 集成各种 Shell 模块

### 4. 实时编辑支持

- 支持文本实时编辑
- 支持表达式实时编辑
- 提供编辑保存处理器

### 5. 国际化支持

- 中英文语言包
- 国际化消息格式化

## 模块结构

```
packages/engine/
├── src/
│   ├── engine-core.ts          # 引擎核心文件
│   ├── index.ts               # 模块入口
│   ├── inner-plugins/          # 内置插件
│   │   ├── builtin-hotkey.ts
│   │   ├── component-meta-parser.ts
│   │   ├── default-context-menu.ts
│   │   ├── default-panel-registry.tsx
│   │   └── setter-registry.ts
│   ├── locale/                # 语言包
│   │   ├── en-US.json
│   │   ├── zh-CN.json
│   │   └── index.ts
│   └── modules/               # 模块定义
│       ├── classes.ts
│       ├── designe r-types.ts
│       ├── live-editing.ts
│       ├── lowcode-types.ts
│       ├── shell-model-factory.ts
│       ├── skeleton-types.ts
│       └── symbols.ts
```

## 核心概念

### 引擎容器

引擎需要一个 DOM 容器来渲染编辑器界面。容器可以是：
- 传入的 HTMLElement
- 自动创建的 div 元素（追加到 document.body）

### 工作区模式

引擎支持两种模式：
- **普通模式**: 单文档编辑模式
- **工作区模式**: 多文档工作区模式

### 内置插件

引擎在初始化时会自动注册一批内置插件，提供基础功能：
- 组件元数据解析
- Setter 注册
- 默认面板
- 快捷键
- 右键菜单
- 命令系统
- 大纲面板

### Shell 模型工厂

Shell 模型工厂负责创建 Node 和 SettingField 的实例，是设计器和 Shell 之间的桥梁。

## 使用示例

### 基本初始化

```typescript
import { init } from '@alilc/lowcode-engine';

// 使用默认容器
await init();

// 使用自定义容器
const container = document.getElementById('engine-container');
await init(container);

// 传入配置选项
await init(container, {
  designMode: 'design',
  locale: 'zh-CN',
  device: 'desktop',
});
```

### 工作区模式

```typescript
await init(container, {
  enableWorkspaceMode: true,
  enableAutoOpenFirstWindow: true,
});
```

### 销毁引擎

```typescript
import { destroy } from '@alilc/lowcode-engine';

await destroy();
```

## 导出的 API

引擎导出以下核心 API：

- `skeleton` - 骨架实例
- `plugins` - 插件管理器
- `project` - 项目实例
- `setters` - Setter 管理器
- `material` - 物料管理器
- `config` - 配置管理器
- `event` - 事件总线
- `logger` - 日志记录器
- `hotkey` - 快捷键管理器
- `common` - 通用工具
- `workspace` - 工作区实例
- `canvas` - 画布实例
- `commonUI` - 通用 UI
- `command` - 命令管理器

## 内部符号

引擎导出了一些内部符号（仅供内部使用）：

```typescript
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
  symbols,
  classes,
};
```

**警告**: 这些符号仅供内部使用，外部使用可能会导致不可预知的问题。

## 版本信息

引擎版本信息存储在配置中：

```typescript
engineConfig.set('ENGINE_VERSION', version);
```

可以通过以下方式获取：

```typescript
import { version } from '@alilc/lowcode-engine';
console.log(version);
```

## 注意事项

1. **容器管理**: 引擎会自动管理容器的创建和销毁
2. **插件注册**: 内置插件在初始化时自动注册
3. **文档清理**: 销毁引擎时会清理所有文档
4. **工作区模式**: 工作区模式和普通模式的初始化流程不同
5. **版本兼容**: 引擎版本信息用于兼容性检查

## 相关文件

- [`engine-core.md`](./engine-core.md) - 引擎核心实现
- [`inner-plugins/builtin-hotkey.md`](./inner-plugins/builtin-hotkey.md) - 内置快捷键
- [`inner-plugins/component-meta-parser.md`](./inner-plugins/component-meta-parser.md) - 组件元数据解析
- [`inner-plugins/default-context-menu.md`](./inner-plugins/default-context-menu.md) - 默认右键菜单
- [`inner-plugins/default-panel-registry.md`](./inner-plugins/default-panel-registry.md) - 默认面板注册
- [`inner-plugins/setter-registry.md`](./inner-plugins/setter-registry.md) - Setter 注册
- [`modules/live-editing.md`](./modules/live-editing.md) - 实时编辑
- [`locale/index.md`](./locale/index.md) - 国际化

## 外部依赖

- `@alilc/lowcode-editor-core` - 编辑器核心
- `@alilc/lowcode-editor-skeleton` - 编辑器骨架
- `@alilc/lowcode-designer` - 设计器
- `@alilc/lowcode-workspace` - 工作区
- `@alilc/lowcode-shell` - Shell 模块
- `@alilc/lowcode-plugin-command` - 命令插件
- `@alilc/lowcode-plugin-outline-pane` - 大纲面板插件
- `@alilc/lowcode-types` - 类型定义
- `@alilc/lowcode-utils` - 工具函数
- `react` - React 框架
- `react-dom` - React DOM

## 典型使用场景

1. **初始化编辑器**: 创建低代码编辑器实例
2. **插件开发**: 开发自定义插件扩展编辑器功能
3. **集成开发**: 将低代码引擎集成到现有应用中
4. **多文档管理**: 使用工作区模式管理多个文档
5. **实时编辑**: 启用实时编辑功能提升用户体验
