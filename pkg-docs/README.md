# LowCode Engine Packages 技术文档

## 文档概述

本文档库提供了 LowCode Engine 项目中所有核心模块的深度技术设计文档，涵盖架构设计、数据流向、接口定义、类与函数详细说明、依赖关系映射、核心算法实现细节以及设计模式应用。

## 文档结构

```
pkg-docs/
├── README.md                           # 本文档
├── 00-overview/                        # 整体架构概览
│   ├── architecture-overview.md         # 系统架构总览
│   ├── module-dependencies.md           # 模块依赖关系
│   └── design-patterns.md              # 设计模式应用
├── 01-designer/                       # Designer 模块文档
│   ├── index.md                        # 模块总览
│   ├── designer-core.md                 # Designer 核心类
│   ├── document-model.md               # 文档模型
│   ├── node-system.md                  # 节点系统
│   ├── props-system.md                 # 属性系统
│   ├── selection-system.md             # 选区系统
│   ├── history-system.md               # 历史记录系统
│   ├── simulator-host.md               # 模拟器宿主
│   ├── drag-drop-system.md             # 拖拽系统
│   ├── detecting-system.md             # 检测系统
│   ├── plugin-system.md                # 插件系统
│   └── component-meta.md               # 组件元数据
├── 02-editor-core/                    # Editor Core 模块文档
│   ├── index.md                        # 模块总览
│   ├── editor-class.md                 # Editor 类详解
│   ├── event-system.md                 # 事件系统
│   ├── config-system.md                # 配置系统
│   ├── hotkey-system.md                # 快捷键系统
│   ├── di-container.md                 # 依赖注入容器
│   └── intl-system.md                 # 国际化系统
├── 03-engine/                         # Engine 模块文档
│   ├── index.md                        # 模块总览
│   ├── engine-core.md                  # Engine 核心
│   ├── inner-plugins.md                # 内置插件
│   ├── shell-factory.md               # Shell 模型工厂
│   └── initialization.md              # 初始化流程
├── 04-renderer-core/                  # Renderer Core 模块文档
│   ├── index.md                        # 模块总览
│   ├── renderer-factory.md             # 渲染器工厂
│   ├── base-renderer.md               # 基础渲染器
│   ├── component-renderer.md           # 组件渲染器
│   ├── page-renderer.md                # 页面渲染器
│   ├── block-renderer.md               # 区块渲染器
│   ├── adapter-system.md               # 适配器系统
│   └── hoc-system.md                  # 高阶组件系统
├── 05-react-renderer/                 # React Renderer 模块文档
│   ├── index.md                        # 模块总览
│   ├── renderer-implementation.md       # 渲染器实现
│   └── integration-guide.md            # 集成指南
├── 06-react-simulator-renderer/        # React Simulator Renderer 模块文档
│   ├── index.md                        # 模块总览
│   ├── simulator-renderer.md           # 模拟器渲染器
│   └── bridge-communication.md        # 桥接通信
├── 07-editor-skeleton/                # Editor Skeleton 模块文档
│   ├── index.md                        # 模块总览
│   ├── skeleton-core.md                # 骨架核心
│   ├── panel-system.md                 # 面板系统
│   ├── widget-system.md                # 组件系统
│   ├── stage-system.md                 # 阶段系统
│   ├── layout-system.md               # 布局系统
│   └── component-library.md           # 组件库
├── 08-ignitor/                        # Ignitor 模块文档
│   └── index.md                        # 模块总览
├── 09-plugins/                        # 插件模块文档
│   ├── index.md                        # 插件总览
│   ├── plugin-command.md               # 命令插件
│   ├── plugin-designer.md              # 设计器插件
│   ├── plugin-outline-pane.md          # 大纲面板插件
│   └── plugin-development.md           # 插件开发指南
├── 10-shell/                         # Shell 模块文档
│   ├── index.md                        # 模块总览
│   ├── shell-models.md                 # Shell 模型
│   └── api-exposure.md                 # API 暴露
├── 11-types/                         # Types 模块文档
│   ├── index.md                        # 类型定义总览
│   ├── core-types.md                   # 核心类型
│   ├── model-types.md                  # 模型类型
│   ├── shell-types.md                  # Shell 类型
│   └── type-utilities.md              # 类型工具
├── 12-utils/                         # Utils 模块文档
│   ├── index.md                        # 工具总览
│   ├── schema-utils.md                 # Schema 工具
│   ├── node-utils.md                  # 节点工具
│   ├── check-types.md                 # 类型检查工具
│   └── common-utils.md                # 通用工具
└── 13-workspace/                     # Workspace 模块文档
    ├── index.md                        # 模块总览
    ├── workspace-core.md               # 工作区核心
    └── window-management.md           # 窗口管理
```

## 文档阅读指南

### 按角色阅读

#### 架构师
- 首先阅读 `00-overview/` 下的所有文档
- 然后根据需要深入各个模块的架构设计部分
- 关注设计模式应用和模块依赖关系

#### 开发者
- 从 `00-overview/architecture-overview.md` 开始了解整体架构
- 根据开发任务深入对应模块文档
- 重点关注接口定义、类与函数说明、使用场景

#### 插件开发者
- 阅读 `08-plugins/plugin-development.md`
- 了解插件系统和插件上下文
- 参考现有插件实现

### 按学习路径阅读

1. **入门路径**
   - `00-overview/architecture-overview.md`
   - `03-engine/index.md`
   - `01-designer/index.md`

2. **深入路径**
   - `01-designer/designer-core.md`
   - `01-designer/document-model.md`
   - `01-designer/node-system.md`

3. **扩展路径**
   - `08-plugins/plugin-development.md`
   - `09-shell/api-exposure.md`
   - `10-types/core-types.md`

## 技术术语表

| 术语 | 英文 | 说明 |
|------|------|------|
| 设计器 | Designer | 负责可视化编辑的核心模块 |
| 模拟器 | Simulator | 负责组件渲染和交互的沙箱环境 |
| 文档模型 | Document Model | 描述页面结构的树形数据模型 |
| 节点 | Node | 文档模型中的基本单元 |
| 属性 | Prop | 节点的属性描述 |
| 选区 | Selection | 当前选中的节点集合 |
| 渲染器 | Renderer | 负责将 Schema 渲染为组件 |
| Shell | Shell | 对外暴露的 API 层 |
| 插件 | Plugin | 扩展引擎功能的模块 |
| 骨架 | Skeleton | 编辑器 UI 框架结构 |

## 版本信息

- LowCode Engine 版本: 1.x
- 文档生成日期: 2026-01-04
- 文档版本: 1.0.0

## 贡献指南

本文档是自动生成的生产级技术文档，如需更新或修正，请遵循以下规范：

1. 保持文档结构与代码同步
2. 使用 Markdown 格式编写
3. 包含必要的代码示例和 Mermaid 流程图
4. 确保文档的准确性和完整性

## 联系方式

如有疑问或建议，请通过以下方式联系：

- GitHub Issues: [LowCode Engine Issues](https://github.com/alibaba/lowcode-engine/issues)
- 官方文档: [LowCode Engine Docs](https://lowcode-engine.cn/)
