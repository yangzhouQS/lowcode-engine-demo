# Package Docs

本目录包含各个模块包的详细功能文档。

## 目录结构

```
pkg-docs/
├── README.md                 # 本文档
├── workspace/                # Workspace 模块文档
│   ├── 01-架构设计.md        # 架构设计文档
│   ├── 02-API设计.md         # API 设计文档
│   ├── 03-文件功能说明.md    # 文件功能说明文档
│   └── README.md             # 模块概览文档
├── utils/                   # Utils 模块文档
│   ├── 01-架构设计.md        # 架构设计文档
│   ├── 02-文件功能说明.md    # 文件功能说明文档
│   └── README.md             # 模块概览文档
├── react-renderer/           # React Renderer 模块文档
│   ├── 01-架构设计.md        # 架构设计文档
│   ├── 02-API设计.md         # API 设计文档
│   └── 03-文件功能说明.md    # 文件功能说明文档
├── react-simulator-renderer/ # React Simulator Renderer 模块文档
│   ├── 01-架构设计.md        # 架构设计文档
│   ├── 02-API设计.md         # API 设计文档
│   ├── 03-文件功能说明.md    # 文件功能说明文档
│   ├── 04-package.json.md     # NPM 包配置文档
│   ├── 05-src-index.ts.md     # 模块入口文件文档
│   ├── 06-src-renderer.ts.md   # 核心渲染器实现文档
│   ├── 07-src-host.ts.md       # 模拟器宿主文档
│   ├── 08-src-renderer-view.tsx.md  # React 视图组件文档
│   ├── 09-src-renderer.less.md  # 样式文件文档
│   ├── 10-src-README.md        # 源码目录说明文档
│   ├── 11-src-builtin-components-leaf.tsx.md  # Leaf 组件文档
│   ├── 12-src-builtin-components-slot.tsx.md  # Slot 组件文档
│   ├── 13-src-locale-index.ts.md  # 国际化工具文档
│   ├── 14-src-utils-get-client-rects.ts.md  # 客户端矩形工具文档
│   ├── 15-src-utils-is-dom-node.ts.md  # DOM 节点判断文档
│   ├── 16-src-utils-misc.ts.md  # 杂项工具文档
│   ├── 17-src-utils-react-find-dom-nodes.ts.md  # React DOM 查找文档
│   ├── 18-src-utils-url.ts.md  # URL 工具文档
│   ├── 19-src-builtin-components-builtin-components.ts.md  # 内置组件文档
│   ├── 20-src-locale-en-US.json.md  # 英文语言包文档
│   ├── 21-src-locale-zh-CN.json.md  # 中文语言包文档
│   └── README.md             # 模块概览文档
├── editor-skeleton/          # Editor Skeleton 模块文档
│   ├── README.md            # Editor Skeleton 概览
│   ├── area.md             # Area 区域管理
│   ├── skeleton.md          # Skeleton 核心类
│   ├── types.md            # 类型定义
│   ├── widget/             # Widget 组件
│   │   ├── widget.md       # Widget 基类
│   │   ├── panel.md        # Panel 类
│   │   ├── widget-container.md # Widget 容器
│   │   ├── dock.md         # Dock 类
│   │   ├── panel-dock.md   # PanelDock 类
│   │   └── stage.ts        # Stage 类
│   ├── components/         # UI 组件
│   │   ├── settings/       # 设置面板组件
│   │   │   ├── settings-pane.md
│   │   │   └── settings-primary-pane.md
│   │   ├── field/          # 字段组件
│   │   │   ├── index.md
│   │   │   └── fields.md
│   │   ├── widget-views/   # Widget 视图组件
│   │   │   └── index.md
│   │   ├── popup/          # 弹窗组件
│   │   │   └── index.md
│   │   ├── draggable-line/ # 可拖拽分割线
│   │   │   └── index.md
│   │   ├── stage-box/      # Stage 盒子组件
│   │   │   └── index.md
│   │   └── settings/       # 设置面板
│   │       └── index.md
│   ├── layouts/           # 布局组件
│   │   ├── workbench.md    # 工作台
│   │   ├── left-area.md    # 左侧区域
│   │   ├── left-float-pane.md  # 左侧浮动面板
│   │   ├── left-fixed-pane.md  # 左侧固定面板
│   │   ├── right-area.md   # 右侧区域
│   │   ├── top-area.md     # 顶部区域
│   │   ├── sub-top-area.md # 子顶部区域
│   │   ├── bottom-area.md  # 底部区域
│   │   ├── main-area.md    # 主区域
│   │   └── toolbar.md      # 工具栏
│   ├── transducers/       # 数据转换器
│   │   ├── parse-func.md  # 函数解析器
│   │   ├── parse-props.md  # 属性解析器
│   │   └── addon-combine.md # 插件组合器
│   ├── icons/            # 图标组件
│   │   ├── arrow.md
│   │   ├── fix.md
│   │   ├── float.md
│   │   ├── exit.md
│   │   ├── clear.md
│   │   ├── convert.md
│   │   ├── slot.md
│   │   └── variable.md
│   └── locale/           # 国际化
│       ├── index.md
│       ├── zh-CN.md
│       └── en-US.md
├── editor-core/              # Editor Core 模块文档
│   ├── README.md            # Editor Core 概览
│   ├── editor.md            # Editor 核心类
│   ├── event-bus.md         # 事件总线
│   ├── command.md           # 命令系统
│   ├── config.md            # 配置管理
│   ├── hotkey.md            # 快捷键系统
│   ├── di/                  # 依赖注入
│   │   ├── setter.md       # Setter 管理
│   │   └── ioc-context.md  # IOC 上下文
│   ├── intl/                # 国际化
│   │   └── index.md        # 国际化入口
│   ├── utils/               # 工具函数
│   │   ├── index.md        # 工具函数入口
│   │   ├── logger.md       # 日志工具
│   │   ├── obx.md          # MobX 集成
│   │   └── preference.md   # 偏好设置
│   └── widgets/             # UI 组件
│       ├── tip.md          # 提示组件
│       ├── tip-container.md # 提示容器
│       └── title.md        # 标题组件
├── engine/                   # Engine 模块文档
│   ├── README.md            # Engine 概览
│   ├── engine-core.md       # 引擎核心
│   ├── index.md             # 模块入口
│   ├── inner-plugins/       # 内置插件
│   │   ├── builtin-hotkey.md
│   │   ├── component-meta-parser.md
│   │   ├── default-context-menu.md
│   │   ├── default-panel-registry.md
│   │   └── setter-registry.md
│   ├── locale/              # 语言包
│   │   ├── en-US.json
│   │   ├── zh-CN.json
│   │   └── index.ts
│   └── modules/             # 模块定义
│       ├── classes.ts
│       ├── designer-types.ts
│       ├── live-editing.ts
│       ├── lowcode-types.ts
│       ├── shell-model-factory.ts
│       ├── skeleton-types.ts
│       └── symbols.ts
├── designer/                 # Designer 模块文档
│   ├── index.md             # Designer 概览
│   ├── designer/            # 设计器核心
│   │   ├── designer.md      # Designer 核心类
│   │   ├── dragon.md        # Dragon 拖拽引擎
│   │   ├── detecting.md     # 悬停检测
│   │   ├── location.md      # 位置管理
│   │   └── setting/         # 设置面板
│   │       └── setting-top-entry.md
│   ├── document/            # 文档模型
│   │   ├── document-model.md # 文档模型
│   │   ├── selection.md     # 选择管理
│   │   ├── history.md       # 历史记录
│   │   └── node/            # 节点系统
│   │       ├── node.md      # 节点类
│   │       └── props/       # 属性管理
│   │           └── props.md
│   ├── project/             # 项目管理
│   │   └── project.md      # 项目类
│   ├── builtin-simulator/    # 内置模拟器
│   │   ├── host.md         # 模拟器宿主
│   │   └── renderer.md     # 渲染器接口
│   ├── plugin/              # 插件系统
│   │   └── plugin-manager.md # 插件管理器
│   ├── component-actions.md # 组件操作管理
│   ├── component-meta.md    # 组件元数据
│   └── context-menu-actions.md # 右键菜单操作
└── renderer-core/            # Renderer Core 模块文档
    ├── README.md            # Renderer Core 概览
    ├── adapter/             # 运行时适配器
    │   └── index.md       # 运行时适配器
    ├── context/             # 上下文管理
    │   └── index.md       # 上下文工厂
    ├── hoc/                 # 高阶组件
    │   ├── index.md        # HOC 入口
    │   └── leaf.md        # Leaf HOC
    ├── renderer/             # 渲染器
    │   ├── index.md        # 渲染器入口
    │   ├── base.md         # 基础渲染器
    │   ├── page.md         # 页面渲染器
    │   ├── component.md    # 组件渲染器
    │   ├── block.md        # 区块渲染器
    │   ├── addon.md        # 插件渲染器
    │   ├── temp.md         # 临时渲染器
    │   └── renderer.md    # 渲染器入口组件
    ├── components/           # 基础组件
    │   ├── Div.tsx        # Div 组件
    │   └── VisualDom/     # 虚拟 DOM 组件
    │       ├── index.tsx
    │       └── index.css
    ├── types/               # 类型定义
    │   └── index.md       # 所有类型定义
    └── utils/               # 工具函数
        ├── index.md        # 工具函数入口
        ├── common.ts       # 通用工具函数
        ├── data-helper.ts  # 数据源管理
        ├── logger.ts       # 日志工具
        └── request.ts      # 请求工具
```

## 文档说明

### Workspace 模块

`@alilc/lowcode-workspace` 是低代码引擎的工作空间管理模块，负责管理编辑器的窗口系统、资源管理、插件上下文和布局系统。

#### 核心功能

- **窗口管理**: 管理编辑器窗口的创建、打开、关闭、切换和销毁
- **资源管理**: 管理编辑器视图资源和 Web 视图资源
- **插件上下文**: 为插件提供统一的上下文环境
- **布局系统**: 提供完整的工作台布局
- **事件系统**: 提供窗口和资源相关的事件通信
- **多窗口支持**: 支持多窗口管理和窗口队列
- **窗口休眠**: 支持窗口休眠机制，优化性能

#### 主要文档

1. **架构设计文档** ([`01-架构设计.md`](workspace/01-架构设计.md))
   - 模块定位和概述
   - 架构模式（单例模式、上下文模式、工厂模式、观察者模式、事件驱动模式、策略模式、代理模式）
   - 核心组件说明（Workspace、Resource、EditorWindow、BasicContext、Context）
   - 数据流设计（窗口管理流程、窗口切换流程、资源初始化流程、插件上下文组装流程）
   - 关键技术实现（窗口状态管理、窗口队列机制、事件系统、插件上下文组装、响应式布局）
   - 性能优化（窗口休眠机制、窗口队列、MobX 响应式更新、事件总线）
   - 扩展性设计（资源类型扩展、插件扩展、视图扩展）
   - 安全性设计（窗口状态管理、插件上下文隔离、事件系统）
   - 测试策略（单元测试、集成测试、快照测试）
   - 总结

2. **API 设计文档** ([`02-API设计.md`](workspace/02-API设计.md))
   - Workspace 类 API（构造函数、initWindow、openEditorWindowByResource、openEditorWindow、removeEditorWindow、checkWindowQueue、setActive、registerResourceType、事件监听方法）
   - Resource 类 API（构造函数、init、import、save、url、getEditorView）
   - EditorWindow 类 API（构造函数、updateState、importSchema、save、init、changeViewName、事件监听方法）
   - ResourceType 类 API（构造函数、name 属性、type 属性）
   - BasicContext 类 API（构造函数、核心属性）
   - Context 类 API（构造函数、init、setActivate、onSimulatorRendererReady、save）
   - Workbench 组件 API（Props、State）
   - 类型定义（IWorkspace、IResource、IEditorWindow、IResourceType、IBasicContext、IViewContext、WINDOW_STATE、IWindowInfo）
   - 使用示例（基本使用、打开窗口、窗口操作、插件开发）
   - 最佳实践（窗口管理、事件监听、插件开发、错误处理、性能优化）
   - 注意事项（窗口状态管理、事件监听、插件上下文、资源类型、异步操作）
   - API 变更历史

3. **文件功能说明文档** ([`03-文件功能说明.md`](workspace/03-文件功能说明.md))
   - 目录结构总览
   - 文件功能分类（核心模块、上下文模块、窗口模块、布局模块、视图模块、插件模块、样式模块、配置文件）
   - 文件依赖关系
   - 文件功能详解（核心模块文件、上下文模块文件、窗口模块文件、布局模块文件、视图模块文件、插件模块文件、样式模块文件）
   - 代码统计（总代码行数、各模块代码行数）
   - 关键文件说明（src/workspace.ts、src/context/base-context.ts、src/window.ts、src/resource.ts、src/layouts/workbench.tsx）
   - 文件修改建议（性能优化建议、代码质量建议、文档建议、测试建议）

4. **模块概览**
   - [`README.md`](workspace/README.md) - 模块概览，包含快速开始、核心功能、架构特点、主要功能、技术栈、相关模块、贡献指南、许可证

### Utils 模块

`@alilc/lowcode-utils` 是低代码引擎的工具函数库模块，提供各种通用工具函数、类型检查函数、React 组件和构建辅助函数。该模块为低代码引擎的其他模块提供基础的工具支持。

#### 核心功能

- **工具函数**: 提供深拷贝、唯一 ID 生成、浅比较、原型操作等基础工具函数
- **类型检查**: 提供运行时类型检查函数，包括对象、函数、React 元素、DOM 元素等类型判断
- **Schema 类型检查**: 提供 24 个 Schema 相关的类型守卫函数，用于检查低代码 Schema 的各种类型
- **React 组件**: 提供图标组件、上下文菜单组件、工作区组件等可复用 React 组件
- **构建辅助**: 提供组件构建、应用辅助、节点辅助、Schema 辅助等构建相关函数
- **CSS 辅助**: 提供 CSS 样式处理和光标管理功能
- **日志工具**: 提供统一的日志记录功能
- **事务管理**: 提供事务管理器，支持批量操作
- **属性类型检查**: 提供 PropTypes 类型的属性检查功能

#### 主要文档

1. **架构设计文档** ([`01-架构设计.md`](utils/01-架构设计.md))
   - 模块定位和概述
   - 架构模式（函数式编程、类型守卫、工厂模式、单例模式）
   - 核心组件说明（工具函数、类型检查、React 组件、样式辅助）
   - 数据流设计（单向数据流、无状态设计）
   - 关键技术实现（深拷贝、唯一 ID 生成、类型守卫、事务管理器）
   - 性能优化（惰性求值、记忆化、提前返回）
   - 扩展性设计（函数组合、插件化、配置化）
   - 安全性设计（类型安全、参数验证、错误处理）
   - 测试策略（单元测试、快照测试、类型测试）
   - 总结

2. **文件功能说明文档** ([`02-文件功能说明.md`](utils/02-文件功能说明.md))
   - 目录结构总览
   - 文件功能分类（工具函数、类型检查、React 组件、构建辅助、配置文件）
   - 文件依赖关系
   - 文件功能详解（工具函数文件、类型检查文件、React 组件文件、构建辅助文件）
   - 代码统计（总代码行数、各模块代码行数）
   - 关键文件说明（src/index.ts、src/clone-deep.ts、src/unique-id.ts、src/logger.ts、src/transaction-manager.ts、src/check-types/）
   - 文件修改建议（性能优化建议、代码质量建议、文档建议、测试建议）

3. **模块概览**
   - [`README.md`](utils/README.md) - 模块概览，包含快速开始、核心功能、架构特点、主要功能、技术栈、模块统计、相关模块、贡献指南、许可证

### React Renderer 模块

`@alilc/lowcode-react-renderer` 是阿里低代码引擎的 React 渲染器模块，负责将低代码描述的 Schema 转换为实际的 React 组件树并进行渲染。该模块是低代码引擎运行时的核心组件之一。

### React Simulator Renderer 模块

`@alilc/lowcode-react-simulator-renderer` 是低代码引擎的模拟器渲染器模块，负责在设计器中模拟和渲染低代码组件。它是连接低代码设计器和实际运行时环境的桥梁，提供实时的预览和交互能力。

#### 核心功能

- **组件渲染**: 在模拟器环境中渲染低代码组件和页面
- **实例管理**: 管理组件实例的生命周期和状态
- **路由模拟**: 提供内存路由，支持多页面应用模拟
- **国际化支持**: 提供多语言切换能力
- **设备适配**: 支持不同设备的响应式渲染
- **事件处理**: 处理组件的交互事件
- **DOM 操作**: 提供 DOM 节点查询和操作能力

#### 主要文档

1. **架构设计文档** ([`01-架构设计.md`](react-simulator-renderer/01-架构设计.md))
   - 模块定位和概述
   - 架构模式（观察者模式、单例模式、工厂模式、适配器模式、策略模式、装饰器模式）
   - 核心组件说明（DocumentInstance、SimulatorRendererContainer）
   - 数据流设计
   - 关键技术实现（React Fiber 遍历、实例生命周期管理、内存路由实现、国际化实现）
   - 性能优化
   - 扩展性设计
   - 安全性设计
   - 测试策略
   - 总结

2. **API 设计文档** ([`02-API设计.md`](react-simulator-renderer/02-API设计.md))
   - SimulatorRendererContainer 属性和方法
   - DocumentInstance 属性和方法
   - 工具函数 API
   - 内置组件 API
   - 事件系统
   - 类型定义
   - 使用示例
   - 最佳实践
   - 注意事项

3. **文件功能说明文档** ([`03-文件功能说明.md`](react-simulator-renderer/03-文件功能说明.md))
   - 目录结构总览
   - 配置文件说明
   - 源代码文件说明
   - 测试文件说明
   - 文件依赖关系
   - 文件功能分类
   - 代码统计
   - 关键文件说明
   - 文件修改建议

4. **配置文件文档**
   - [`04-package.json.md`](react-simulator-renderer/04-package.json.md) - NPM 包配置，包括依赖、脚本和发布配置

5. **源代码文件文档**
   - [`05-src-index.ts.md`](react-simulator-renderer/05-src-index.ts.md) - 模块入口文件，导出渲染器实例并初始化全局对象
   - [`06-src-renderer.ts.md`](react-simulator-renderer/06-src-renderer.ts.md) - 核心渲染器实现，包含所有主要逻辑

6. **模块概览**
   - [`README.md`](react-simulator-renderer/README.md) - 模块概览，包含快速开始、核心概念、架构特点、主要功能、技术栈、性能优化、扩展性、测试、常见问题、相关资源

#### 核心功能

- **Schema 驱动渲染**: 将低代码 Schema 渲染为 React 组件
- **运行时适配**: 通过适配器模式将 React 框架的能力适配到通用的渲染核心中
- **多种渲染器类型**: 支持页面、组件、区块、插件、临时组件等多种渲染器类型
- **组件映射**: 支持自定义组件映射，灵活使用任意 React 组件
- **工具函数扩展**: 通过 appHelper 提供工具函数和常量
- **国际化支持**: 内置多语言支持，方便国际化应用开发
- **类型安全**: 使用 TypeScript 提供完整的类型定义

#### 主要文档

1. **架构设计文档** ([`01-架构设计.md`](react-renderer/01-架构设计.md))
   - 模块定位和概述
   - 架构模式（适配器模式、工厂模式、组合模式）
   - 核心组件说明
   - 数据流设计
   - 扩展性设计
   - 架构优势

2. **API 设计文档** ([`02-API设计.md`](react-renderer/02-API设计.md))
   - ReactRenderer 组件 Props 接口
   - 实例方法说明
   - 类型定义
   - 使用示例
   - API 设计原则

3. **文件功能说明文档** ([`03-文件功能说明.md`](react-renderer/03-文件功能说明.md))
   - 目录结构说明
   - 核心文件详解
   - 配置文件说明
   - 测试文件说明
   - 示例文件说明
   - 文件依赖关系

4. **源代码文件文档**
   - [`04-src-index.ts.md`](react-renderer/04-src-index.ts.md) - 主入口文件，初始化 React 运行时环境并注册渲染器
   - [`05-package.json.md`](react-renderer/05-package.json.md) - NPM 包配置，包括依赖、脚本和发布配置
   - [`06-tsconfig.json.md`](react-renderer/06-tsconfig.json.md) - TypeScript 编译配置

5. **构建配置文件文档**
   - [`07-build.json.md`](react-renderer/07-build.json.md) - 开发和生产构建配置
   - [`08-jest.config.js.md`](react-renderer/08-jest.config.js.md) - Jest 测试配置
   - [`09-build.test.json.md`](react-renderer/09-build.test.json.md) - 测试构建配置
   - [`10-build.umd.json.md`](react-renderer/10-build.umd.json.md) - UMD 构建配置

6. **测试文件文档**
   - [`11-tests-index.test.tsx.md`](react-renderer/11-tests-index.test.tsx.md) - 主测试文件，使用快照测试验证渲染功能
   - [`12-tests-fixtures-schema-basic.ts.md`](react-renderer/12-tests-fixtures-schema-basic.ts.md) - 测试 Schema 文件，包含完整的页面结构

7. **Demo 组件文档**
   - [`13-demo-config-components-index.js.md`](react-renderer/13-demo-config-components-index.js.md) - 组件导出文件，集中导出所有 demo 组件
   - [`14-demo-config-components-Div.jsx.md`](react-renderer/14-demo-config-components-Div.jsx.md) - Div 容器组件文档
   - [`15-demo-config-components-Text.jsx.md`](react-renderer/15-demo-config-components-Text.jsx.md) - Text 文本组件文档
   - [`16-demo-config-components-A.jsx.md`](react-renderer/16-demo-config-components-A.jsx.md) - A 链接组件文档
   - [`17-demo-config-components-Image.jsx.md`](react-renderer/17-demo-config-components-Image.jsx.md) - Image 图片组件文档

8. **Demo 配置文档**
   - [`18-demo-config-utils.js.md`](react-renderer/18-demo-config-utils.js.md) - 工具函数文档，包括 Message 和 moment
   - [`19-demo-config-constants.js.md`](react-renderer/19-demo-config-constants.js.md) - 常量定义文档

9. **Demo 示例文档**
   - [`20-demo-markdown-files.md`](react-renderer/20-demo-markdown-files.md) - Demo Markdown 文件文档，包括列表、表格、复杂组件、数据源和国际化示例

### Editor Skeleton 模块

`@alilc/lowcode-editor-skeleton` 是低代码编辑器的骨架模块，负责编辑器界面的布局、面板管理和组件渲染。

#### 核心功能

- **布局管理**: 提供多个预定义区域（左侧、顶部、底部、右侧、主区域等）用于放置插件
- **面板系统**: 支持固定面板和浮动面板，可动态切换显示状态
- **Widget 系统**: 提供可复用的 Widget 组件，支持 Dock、Panel、Stage 等类型
- **设置面板**: 提供属性配置界面，支持多种 Setter 类型
- **国际化**: 内置中英文支持
- **事件系统**: 完整的事件发布订阅机制

#### 主要模块

1. **核心模块** (Core)
   - [`area.md`](editor-skeleton/area.md) - 区域管理，定义编辑器的各个布局区域
   - [`skeleton.md`](editor-skeleton/skeleton.md) - 骨架核心类，管理所有 Widget 和面板
   - [`types.md`](editor-skeleton/types.md) - 类型定义，包括 Widget、Dock、Panel 等配置类型

2. **Widget 模块** (Widget)
   - [`widget/widget.md`](editor-skeleton/widget/widget.md) - Widget 基类
   - [`widget/panel.md`](editor-skeleton/widget/panel.md) - 面板 Widget
   - [`widget/dock.md`](editor-skeleton/widget/dock.md) - Dock Widget
   - [`widget/panel-dock.md`](editor-skeleton/widget/panel-dock.md) - 面板 Dock Widget
   - [`widget/stage.md`](editor-skeleton/widget/stage.md) - Stage Widget
   - [`widget/widget-container.md`](editor-skeleton/widget/widget-container.md) - Widget 容器

3. **组件模块** (Components)
   - [`components/settings/settings-pane.md`](editor-skeleton/components/settings/settings-pane.md) - 设置面板组件
   - [`components/settings/settings-primary-pane.md`](editor-skeleton/components/settings/settings-primary-pane.md) - 主设置面板
   - [`components/field/index.md`](editor-skeleton/components/field/index.md) - 字段组件入口
   - [`components/field/fields.md`](editor-skeleton/components/field/fields.md) - 字段组件实现
   - [`components/widget-views/index.md`](editor-skeleton/components/widget-views/index.md) - Widget 视图组件
   - [`components/popup/index.md`](editor-skeleton/components/popup/index.md) - 弹窗组件
   - [`components/draggable-line/index.md`](editor-skeleton/components/draggable-line/index.md) - 可拖拽分割线
   - [`components/stage-box/index.md`](editor-skeleton/components/stage-box/index.md) - Stage 盒子组件

4. **布局模块** (Layouts)
   - [`layouts/workbench.md`](editor-skeleton/layouts/workbench.md) - 工作台主布局
   - [`layouts/left-area.md`](editor-skeleton/layouts/left-area.md) - 左侧区域
   - [`layouts/left-float-pane.md`](editor-skeleton/layouts/left-float-pane.md) - 左侧浮动面板
   - [`layouts/left-fixed-pane.md`](editor-skeleton/layouts/left-fixed-pane.md) - 左侧固定面板
   - [`layouts/right-area.md`](editor-skeleton/layouts/right-area.md) - 右侧区域
   - [`layouts/top-area.md`](editor-skeleton/layouts/top-area.md) - 顶部区域
   - [`layouts/sub-top-area.md`](editor-skeleton/layouts/sub-top-area.md) - 子顶部区域
   - [`layouts/bottom-area.md`](editor-skeleton/layouts/bottom-area.md) - 底部区域
   - [`layouts/main-area.md`](editor-skeleton/layouts/main-area.md) - 主区域
   - [`layouts/toolbar.md`](editor-skeleton/layouts/toolbar.md) - 工具栏

5. **转换器模块** (Transducers)
   - [`transducers/parse-func.md`](editor-skeleton/transducers/parse-func.md) - 函数解析器
   - [`transducers/parse-props.md`](editor-skeleton/transducers/parse-props.md) - 属性解析器
   - [`transducers/addon-combine.md`](editor-skeleton/transducers/addon-combine.md) - 插件组合器

6. **图标模块** (Icons)
   - [`icons/arrow.md`](editor-skeleton/icons/arrow.md) - 箭头图标
   - [`icons/fix.md`](editor-skeleton/icons/fix.md) - 固定图标
   - [`icons/float.md`](editor-skeleton/icons/float.md) - 浮动图标
   - [`icons/exit.md`](editor-skeleton/icons/exit.md) - 退出图标
   - [`icons/clear.md`](editor-skeleton/icons/clear.md) - 清除图标
   - [`icons/convert.md`](editor-skeleton/icons/convert.md) - 转换图标
   - [`icons/slot.md`](editor-skeleton/icons/slot.md) - 插槽图标
   - [`icons/variable.md`](editor-skeleton/icons/variable.md) - 变量图标

7. **国际化模块** (Locale)
   - [`locale/index.md`](editor-skeleton/locale/index.md) - 国际化入口
   - [`locale/zh-CN.md`](editor-skeleton/locale/zh-CN.md) - 中文语言包
   - [`locale/en-US.md`](editor-skeleton/locale/en-US.md) - 英文语言包

### Editor Core 模块

`@alilc/lowcode-editor-core` 是低代码编辑器的核心模块，提供编辑器的核心功能，包括编辑器生命周期管理、事件系统、命令系统、配置管理等。

#### 核心功能

- **编辑器管理**: 管理编辑器的生命周期，包括初始化、销毁等
- **事件系统**: 提供完整的事件发布订阅机制，支持模块级事件总线
- **命令系统**: 管理命令的注册、执行、批量执行等功能
- **配置管理**: 管理引擎配置、设计器配置、偏好设置等
- **快捷键系统**: 管理快捷键的绑定、激活、取消绑定等功能
- **依赖注入**: 提供 IOC 容器，管理依赖注入
- **国际化**: 提供多语言支持，支持 ICU MessageFormat 语法
- **状态管理**: 集成 MobX，提供响应式状态管理
- **偏好设置**: 管理用户偏好设置，支持 localStorage 持久化

#### 主要模块

1. **核心模块** (Core)
   - [`editor.md`](editor-core/editor.md) - Editor 核心类，管理编辑器生命周期
   - [`event-bus.md`](editor-core/event-bus.md) - 事件总线，提供事件发布订阅机制
   - [`command.md`](editor-core/command.md) - 命令系统，管理命令注册和执行
   - [`config.md`](editor-core/config.md) - 配置管理，管理引擎配置和偏好设置
   - [`hotkey.md`](editor-core/hotkey.md) - 快捷键系统，管理快捷键绑定和激活

2. **依赖注入模块** (DI)
   - [`di/setter.md`](editor-core/di/setter.md) - Setter 管理，管理属性编辑器
   - [`di/ioc-context.md`](editor-core/di/ioc-context.md) - IOC 上下文，提供依赖注入容器

3. **国际化模块** (Intl)
   - [`intl/index.md`](editor-core/intl/index.md) - 国际化入口，提供多语言支持

4. **工具模块** (Utils)
   - [`utils/index.md`](editor-core/utils/index.md) - 工具函数入口
   - [`utils/logger.md`](editor-core/utils/logger.md) - 日志工具，提供日志记录功能
   - [`utils/obx.md`](editor-core/utils/obx.md) - MobX 集成，提供响应式状态管理
   - [`utils/preference.md`](editor-core/utils/preference.md) - 偏好设置，管理用户偏好设置

5. **组件模块** (Widgets)
   - [`widgets/tip.md`](editor-core/widgets/tip.md) - 提示组件，显示提示信息
   - [`widgets/tip-container.md`](editor-core/widgets/tip-container.md) - 提示容器，渲染提示内容
   - [`widgets/title.md`](editor-core/widgets/title.md) - 标题组件，显示标题文本

### Engine 模块

`@alilc/lowcode-engine` 是低代码引擎的核心模块，负责初始化和协调所有子系统，包括编辑器、设计器、骨架、插件管理等。它是低代码引擎的入口点，提供了完整的低代码编辑器功能。

#### 核心功能

- **引擎初始化**: 初始化编辑器实例、设计器实例、骨架实例、工作区实例
- **内置插件管理**: 注册和管理内置插件（组件元数据解析器、Setter 注册器、默认面板注册器、内置快捷键、默认右键菜单、命令插件、大纲面板插件）
- **模块集成**: 集成 Editor Core、Designer、Skeleton、Workspace 等子系统
- **插件上下文组装**: 为每个插件组装 API，提供插件上下文
- **引擎销毁**: 清理所有文档、卸载 DOM 容器
- **实时编辑支持**: 支持文本实时编辑和表达式实时编辑
- **国际化支持**: 提供中英文语言包

#### 主要模块

1. **核心模块** (Core)
   - [`engine-core.md`](engine/engine-core.md) - 引擎核心，负责初始化和协调所有子系统
   - [`index.md`](engine/index.md) - 模块入口，导出所有公共 API

2. **内置插件模块** (Inner Plugins)
   - [`inner-plugins/builtin-hotkey.md`](engine/inner-plugins/builtin-hotkey.md) - 内置快捷键，提供删除、复制粘贴、撤销重做、节点选择和移动等功能
   - [`inner-plugins/component-meta-parser.md`](engine/inner-plugins/component-meta-parser.md) - 组件元数据解析器，监听物料变化并构建组件元数据映射表
   - [`inner-plugins/default-context-menu.md`](engine/inner-plugins/default-context-menu.md) - 默认右键菜单，提供选择组件、复制粘贴、删除等功能
   - [`inner-plugins/default-panel-registry.md`](engine/inner-plugins/default-panel-registry.md) - 默认面板注册器，注册设计器和设置面板
   - [`inner-plugins/setter-registry.md`](engine/inner-plugins/setter-registry.md) - Setter 注册器，注册默认的 Setter

3. **语言包模块** (Locale)
   - [`locale/en-US.json`](engine/locale/en-US.json) - 英文语言包
   - [`locale/zh-CN.json`](engine/locale/zh-CN.json) - 中文语言包
   - [`locale/index.ts`](engine/locale/index.ts) - 国际化入口，提供多语言支持

4. **模块定义模块** (Modules)
   - [`modules/classes.ts`](engine/modules/classes.ts) - 类定义，导出 Shell 模块的所有类
   - [`modules/designer-types.ts`](engine/modules/designer-types.ts) - 设计器类型定义
   - [`modules/live-editing.ts`](engine/modules/live-editing.md) - 实时编辑，支持文本和表达式实时编辑
   - [`modules/lowcode-types.ts`](engine/modules/lowcode-types.ts) - 低代码类型定义
   - [`modules/shell-model-factory.ts`](engine/modules/shell-model-factory.ts) - Shell 模型工厂，创建 Node 和 SettingField 实例
   - [`modules/skeleton-types.ts`](engine/modules/skeleton-types.ts) - 骨架类型定义
   - [`modules/symbols.ts`](engine/modules/symbols.ts) - 符号导出，导出内部符号

### Designer 模块

`@alilc/lowcode-designer` 是低代码引擎的设计器模块，负责管理低代码编辑器的核心设计能力，包括节点树管理、拖拽投放、属性编辑、选择管理、历史记录等。

#### 核心功能

- **节点树管理**: 管理文档的节点树结构，支持节点的增删改查
- **拖拽投放**: 提供完整的拖拽投放能力，支持节点拖拽、外部拖拽、复制拖拽
- **属性编辑**: 管理节点的属性，支持属性的增加、删除、修改
- **选择管理**: 管理节点的选择状态，支持单选和多选
- **历史记录**: 管理文档的历史记录，支持撤销和重做
- **组件元数据**: 管理组件的元数据，包括属性配置、行为配置等
- **组件操作**: 提供组件的内置操作，如删除、复制、锁定、隐藏等
- **右键菜单**: 提供右键菜单操作，如复制、删除、锁定、隐藏等
- **模拟器**: 提供画布渲染能力，支持设备模拟、实时编辑等
- **插件系统**: 提供插件管理能力，支持插件的注册、初始化、销毁

#### 主要模块

1. **核心模块** (Core)
   - [`index.md`](designer/index.md) - Designer 概览，包含模块架构、API 设计、使用示例
   - [`designer/designer.md`](designer/designer/designer.md) - Designer 核心类，协调所有设计器能力
   - [`designer/dragon.md`](designer/designer/dragon.md) - Dragon 拖拽引擎，处理拖拽投放逻辑
   - [`designer/detecting.md`](designer/designer/detecting.md) - 悬停检测，提供实时悬停反馈
   - [`designer/location.md`](designer/designer/location.md) - 位置管理，管理拖拽投放位置
   - [`designer/setting/setting-top-entry.md`](designer/designer/setting/setting-top-entry.md) - 设置面板入口，管理属性编辑

2. **文档模型模块** (Document)
   - [`document/document-model.md`](designer/document/document-model.md) - 文档模型，管理节点树、选择、历史
   - [`document/selection.md`](designer/document/selection.md) - 选择管理，管理节点的选择状态
   - [`document/history.md`](designer/document/history.md) - 历史记录，管理撤销和重做
   - [`document/node/node.md`](designer/document/node/node.md) - 节点类，表示节点树中的节点
   - [`document/node/props/props.md`](designer/document/node/props/props.md) - 属性管理，管理节点的属性

3. **项目管理模块** (Project)
   - [`project/project.md`](designer/project/project.md) - 项目类，管理多个文档

4. **模拟器模块** (Simulator)
   - [`builtin-simulator/host.md`](designer/builtin-simulator/host.md) - 模拟器宿主，管理画布渲染

5. **插件模块** (Plugin)
   - [`plugin/plugin-manager.md`](designer/plugin/plugin-manager.md) - 插件管理器，管理插件生命周期

6. **组件管理模块** (Component)
   - [`component-actions.md`](designer/component-actions.md) - 组件操作管理，管理组件的内置操作
   - [`component-meta.md`](designer/component-meta.md) - 组件元数据，管理组件的元数据配置
   - [`context-menu-actions.md`](designer/context-menu-actions.md) - 右键菜单操作，管理右键菜单操作

### Renderer Core 模块

`@alilc/lowcode-renderer-core` 是低代码引擎的渲染器核心模块，负责将低代码 Schema 渲染为 React 组件。它提供了完整的渲染能力，包括组件渲染、属性解析、数据源管理、循环渲染、插槽渲染等。

#### 核心功能

- **Schema 驱动渲染**: 将低代码 Schema 渲染为 React 组件
- **运行时适配**: 支持 React 和 Rax 两种运行时框架
- **表达式解析**: 支持 JS 表达式解析和求值，支持 `this` 上下文
- **数据源管理**: 支持数据源的配置、请求、缓存和更新
- **循环渲染**: 支持基于数据源的循环渲染
- **插槽渲染**: 支持插槽内容的渲染和注入
- **生命周期管理**: 完整的组件生命周期管理
- **错误处理**: 提供错误边界和错误组件
- **国际化支持**: 支持多语言国际化
- **设计模式支持**: 支持设计模式和预览模式

#### 主要模块

1. **适配器模块** (Adapter)
   - [`adapter/index.md`](renderer-core/adapter/index.md) - 运行时适配器，支持 React 和 Rax

2. **上下文模块** (Context)
   - [`context/index.md`](renderer-core/context/index.md) - 上下文工厂，提供 AppContext

3. **高阶组件模块** (HOC)
   - [`hoc/index.md`](renderer-core/hoc/index.md) - HOC 入口
   - [`hoc/leaf.md`](renderer-core/hoc/leaf.md) - Leaf HOC，设计模式事件处理

4. **渲染器模块** (Renderer)
   - [`renderer/index.md`](renderer-core/renderer/index.md) - 渲染器入口
   - [`renderer/base.md`](renderer-core/renderer/base.md) - 基础渲染器，核心渲染逻辑
   - [`renderer/page.md`](renderer-core/renderer/page.md) - 页面渲染器
   - [`renderer/component.md`](renderer-core/renderer/component.md) - 组件渲染器
   - [`renderer/block.md`](renderer-core/renderer/block.md) - 区块渲染器
   - [`renderer/addon.md`](renderer-core/renderer/addon.md) - 插件渲染器
   - [`renderer/temp.md`](renderer-core/renderer/temp.md) - 临时渲染器
   - [`renderer/renderer.md`](renderer-core/renderer/renderer.md) - 渲染器入口组件

5. **组件模块** (Components)
   - [`components/Div.tsx`](renderer-core/components/Div.tsx) - Div 组件
   - [`components/VisualDom/index.tsx`](renderer-core/components/VisualDom/index.tsx) - 虚拟 DOM 组件
   - [`components/VisualDom/index.css`](renderer-core/components/VisualDom/index.css) - 虚拟 DOM 样式

6. **类型模块** (Types)
   - [`types/index.md`](renderer-core/types/index.md) - 所有类型定义

7. **工具模块** (Utils)
   - [`utils/index.md`](renderer-core/utils/index.md) - 工具函数入口
   - [`utils/common.ts`](renderer-core/utils/common.ts) - 通用工具函数
   - [`utils/data-helper.ts`](renderer-core/utils/data-helper.ts) - 数据源管理
   - [`utils/logger.ts`](renderer-core/utils/logger.ts) - 日志工具
   - [`utils/request.ts`](renderer-core/utils/request.ts) - 请求工具

## 文档特点

### 详细的代码说明

每个文档都包含：
- **功能概述**: 简要描述文件的主要功能
- **主要功能**: 列出核心功能点
- **类/函数定义**: 完整的类型定义和签名
- **属性/参数说明**: 详细的属性和参数说明
- **方法说明**: 每个方法的功能和行为
- **使用示例**: 实际的代码示例
- **注意事项**: 使用时需要注意的要点

### 代码文档结合方式

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-05

- 创建 Types 模块文档
- 创建模块概览文档（README.md）
- 更新主 README.md，添加 Types 模块文档链接

- 创建 Utils 模块文档
- 创建架构设计文档（01-架构设计.md）
- 创建文件功能说明文档（02-文件功能说明.md）
- 创建模块概览文档（README.md）
- 更新主 README.md，添加 Utils 模块文档链接

- 创建 React Renderer 模块文档
- 创建架构设计文档（01-架构设计.md）
- 创建 API 设计文档（02-API设计.md）
- 创建文件功能说明文档（03-文件功能说明.md）

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）
- 创建 Engine 模块文档
- 创建 Designer 模块文档
- 创建 Designer 核心模块文档（designer、dragon、detecting、location、setting-top-entry）
- 创建 Document 模块文档（document-model、selection、history、node、props）
- 创建 Project 模块文档（project）
- 创建 Simulator 模块文档（host）
- 创建 Plugin 模块文档（plugin-manager）
- 创建 Component 模块文档（component-actions、component-meta、context-menu-actions）
- 创建 Renderer Core 模块文档
- 创建 Renderer Core 核心模块文档（adapter、context、hoc、renderer、types、utils）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
   - [`document/document-model.md`](designer/document/document-model.md) - 文档模型，管理节点树、选择、历史
   - [`document/selection.md`](designer/document/selection.md) - 选择管理，管理节点的选择状态
   - [`document/history.md`](designer/document/history.md) - 历史记录，管理撤销和重做
   - [`document/node/node.md`](designer/document/node/node.md) - 节点类，表示节点树中的节点
   - [`document/node/props/props.md`](designer/document/node/props/props.md) - 属性管理，管理节点的属性

3. **项目管理模块** (Project)
   - [`project/project.md`](designer/project/project.md) - 项目类，管理多个文档

4. **模拟器模块** (Simulator)
   - [`builtin-simulator/host.md`](designer/builtin-simulator/host.md) - 模拟器宿主，管理画布渲染

5. **插件模块** (Plugin)
   - [`plugin/plugin-manager.md`](designer/plugin/plugin-manager.md) - 插件管理器，管理插件生命周期

6. **组件管理模块** (Component)
   - [`component-actions.md`](designer/component-actions.md) - 组件操作管理，管理组件的内置操作
   - [`component-meta.md`](designer/component-meta.md) - 组件元数据，管理组件的元数据配置
   - [`context-menu-actions.md`](designer/context-menu-actions.md) - 右键菜单操作，管理右键菜单操作

### Renderer Core 模块

`@alilc/lowcode-renderer-core` 是低代码引擎的渲染器核心模块，负责将低代码 Schema 渲染为 React 组件。它提供了完整的渲染能力，包括组件渲染、属性解析、数据源管理、循环渲染、插槽渲染等。

#### 核心功能

- **Schema 驱动渲染**: 将低代码 Schema 渲染为 React 组件
- **运行时适配**: 支持 React 和 Rax 两种运行时框架
- **表达式解析**: 支持 JS 表达式解析和求值，支持 `this` 上下文
- **数据源管理**: 支持数据源的配置、请求、缓存和更新
- **循环渲染**: 支持基于数据源的循环渲染
- **插槽渲染**: 支持插槽内容的渲染和注入
- **生命周期管理**: 完整的组件生命周期管理
- **错误处理**: 提供错误边界和错误组件
- **国际化支持**: 支持多语言国际化
- **设计模式支持**: 支持设计模式和预览模式

#### 主要模块

1. **适配器模块** (Adapter)
   - [`adapter/index.md`](renderer-core/adapter/index.md) - 运行时适配器，支持 React 和 Rax

2. **上下文模块** (Context)
   - [`context/index.md`](renderer-core/context/index.md) - 上下文工厂，提供 AppContext

3. **高阶组件模块** (HOC)
   - [`hoc/index.md`](renderer-core/hoc/index.md) - HOC 入口
   - [`hoc/leaf.md`](renderer-core/hoc/leaf.md) - Leaf HOC，设计模式事件处理

4. **渲染器模块** (Renderer)
   - [`renderer/index.md`](renderer-core/renderer/index.md) - 渲染器入口
   - [`renderer/base.md`](renderer-core/renderer/base.md) - 基础渲染器，核心渲染逻辑
   - [`renderer/page.md`](renderer-core/renderer/page.md) - 页面渲染器
   - [`renderer/component.md`](renderer-core/renderer/component.md) - 组件渲染器
   - [`renderer/block.md`](renderer-core/renderer/block.md) - 区块渲染器
   - [`renderer/addon.md`](renderer-core/renderer/addon.md) - 插件渲染器
   - [`renderer/temp.md`](renderer-core/renderer/temp.md) - 临时渲染器
   - [`renderer/renderer.md`](renderer-core/renderer/renderer.md) - 渲染器入口组件

5. **组件模块** (Components)
   - [`components/Div.tsx`](renderer-core/components/Div.tsx) - Div 组件
   - [`components/VisualDom/index.tsx`](renderer-core/components/VisualDom/index.tsx) - 虚拟 DOM 组件
   - [`components/VisualDom/index.css`](renderer-core/components/VisualDom/index.css) - 虚拟 DOM 样式

6. **类型模块** (Types)
   - [`types/index.md`](renderer-core/types/index.md) - 所有类型定义

7. **工具模块** (Utils)
   - [`utils/index.md`](renderer-core/utils/index.md) - 工具函数入口
   - [`utils/common.ts`](renderer-core/utils/common.ts) - 通用工具函数
   - [`utils/data-helper.ts`](renderer-core/utils/data-helper.ts) - 数据源管理
   - [`utils/logger.ts`](renderer-core/utils/logger.ts) - 日志工具
   - [`utils/request.ts`](renderer-core/utils/request.ts) - 请求工具

## 文档特点

### 详细的代码说明

每个文档都包含：
- **功能概述**: 简要描述文件的主要功能
- **主要功能**: 列出核心功能点
- **类/函数定义**: 完整的类型定义和签名
- **属性/参数说明**: 详细的属性和参数说明
- **方法说明**: 每个方法的功能和行为
- **使用示例**: 实际的代码示例
- **注意事项**: 使用时需要注意的要点

### 代码文档结合方式

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）
- 创建 Engine 模块文档
- 创建 Designer 模块文档
- 创建 Designer 核心模块文档（designer、dragon、detecting、location、setting-top-entry）
- 创建 Document 模块文档（document-model、selection、history、node、props）
- 创建 Project 模块文档（project）
- 创建 Simulator 模块文档（host）
- 创建 Plugin 模块文档（plugin-manager）
- 创建 Component 模块文档（component-actions、component-meta、context-menu-actions）
- 创建 Renderer Core 模块文档
- 创建 Renderer Core 核心模块文档（adapter、context、hoc、renderer、types、utils）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队

- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）
- 创建 Engine 模块文档
- 创建 Designer 模块文档
- 创建 Designer 核心模块文档（designer、dragon、detecting、location、setting-top-entry）
- 创建 Document 模块文档（document-model、selection、history、node、props）
- 创建 Project 模块文档（project）
- 创建 Simulator 模块文档（host）
- 创建 Plugin 模块文档（plugin-manager）
- 创建 Component 模块文档（component-actions、component-meta、context-menu-actions）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


   - [`document/document-model.md`](designer/document/document-model.md) - 文档模型，管理节点树、选择、历史
   - [`document/selection.md`](designer/document/selection.md) - 选择管理，管理节点的选择状态
   - [`document/history.md`](designer/document/history.md) - 历史记录，管理撤销和重做
   - [`document/node/node.md`](designer/document/node/node.md) - 节点类，表示节点树中的节点
   - [`document/node/props/props.md`](designer/document/node/props/props.md) - 属性管理，管理节点的属性

3. **项目管理模块** (Project)
   - [`project/project.md`](designer/project/project.md) - 项目类，管理多个文档

4. **模拟器模块** (Simulator)
   - [`builtin-simulator/host.md`](designer/builtin-simulator/host.md) - 模拟器宿主，管理画布渲染

5. **插件模块** (Plugin)
   - [`plugin/plugin-manager.md`](designer/plugin/plugin-manager.md) - 插件管理器，管理插件生命周期

6. **组件管理模块** (Component)
   - [`component-actions.md`](designer/component-actions.md) - 组件操作管理，管理组件的内置操作
   - [`component-meta.md`](designer/component-meta.md) - 组件元数据，管理组件的元数据配置
   - [`context-menu-actions.md`](designer/context-menu-actions.md) - 右键菜单操作，管理右键菜单操作

## 文档特点

### 详细的代码说明

每个文档都包含：
- **功能概述**: 简要描述文件的主要功能
- **主要功能**: 列出核心功能点
- **类/函数定义**: 完整的类型定义和签名
- **属性/参数说明**: 详细的属性和参数说明
- **方法说明**: 每个方法的功能和行为
- **使用示例**: 实际的代码示例
- **注意事项**: 使用时需要注意的要点

### 代码文档结合方式

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）
- 创建 Engine 模块文档
- 创建 Designer 模块文档
- 创建 Designer 核心模块文档（designer、dragon、detecting、location、setting-top-entry）
- 创建 Document 模块文档（document-model、selection、history、node、props）
- 创建 Project 模块文档（project）
- 创建 Simulator 模块文档（host）
- 创建 Plugin 模块文档（plugin-manager）
- 创建 Component 模块文档（component-actions、component-meta、context-menu-actions）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- **注意事项**: 使用时需要注意的要点

### 代码文档结合方式

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）
- 创建 Engine 模块文档
- 创建 Designer 模块文档
- 创建 Designer 核心模块文档（designer、dragon、detecting、location、setting-top-entry）
- 创建 Document 模块文档（document-model、selection、history、node、props）
- 创建 Project 模块文档（project）
- 创建 Simulator 模块文档（host）
- 创建 Plugin 模块文档（plugin-manager）
- 创建 Component 模块文档（component-actions、component-meta、context-menu-actions）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队



   - [`document/selection.md`](designer/document/selection.md) - 选择管理，管理节点的选择状态
   - [`document/history.md`](designer/document/history.md) - 历史记录，管理撤销和重做
   - [`document/node/node.md`](designer/document/node/node.md) - 节点类，表示节点树中的节点
   - [`document/node/props/props.md`](designer/document/node/props/props.md) - 属性管理，管理节点的属性

3. **项目管理模块** (Project)
   - [`project/project.md`](designer/project/project.md) - 项目类，管理多个文档

4. **模拟器模块** (Simulator)
   - [`builtin-simulator/host.md`](designer/builtin-simulator/host.md) - 模拟器宿主，管理画布渲染

5. **插件模块** (Plugin)
   - [`plugin/plugin-manager.md`](designer/plugin/plugin-manager.md) - 插件管理器，管理插件生命周期

6. **组件管理模块** (Component)
   - [`component-actions.md`](designer/component-actions.md) - 组件操作管理，管理组件的内置操作
   - [`component-meta.md`](designer/component-meta.md) - 组件元数据，管理组件的元数据配置
   - [`context-menu-actions.md`](designer/context-menu-actions.md) - 右键菜单操作，管理右键菜单操作

## 文档特点

### 详细的代码说明

每个文档都包含：
- **功能概述**: 简要描述文件的主要功能
- **主要功能**: 列出核心功能点
- **类/函数定义**: 完整的类型定义和签名
- **属性/参数说明**: 详细的属性和参数说明
- **方法说明**: 每个方法的功能和行为
- **使用示例**: 实际的代码示例
- **注意事项**: 使用时需要注意的要点

### 代码文档结合方式

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）
- 创建 Engine 模块文档
- 创建 Designer 模块文档
- 创建 Designer 核心模块文档（designer、dragon、detecting、location、setting-top-entry）
- 创建 Document 模块文档（document-model、selection、history、node、props）
- 创建 Project 模块文档（project）
- 创建 Simulator 模块文档（host）
- 创建 Plugin 模块文档（plugin-manager）
- 创建 Component 模块文档（component-actions、component-meta、context-menu-actions）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- **注意事项**: 使用时需要注意的要点

### 代码文档结合方式

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）
- 创建 Engine 模块文档
- 创建 Designer 模块文档
- 创建 Designer 核心模块文档（designer、dragon、detecting、location、setting-top-entry）
- 创建 Document 模块文档（document-model、selection、history、node、props）
- 创建 Project 模块文档（project）
- 创建 Simulator 模块文档（host）
- 创建 Plugin 模块文档（plugin-manager）
- 创建 Component 模块文档（component-actions、component-meta、context-menu-actions）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队

文档采用代码文档结合的方式：
1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队


1. **代码分析**: 深入分析源代码的实现逻辑
2. **功能总结**: 提炼出核心功能和使用场景
3. **API 文档**: 提供完整的 API 说明
4. **示例代码**: 提供实际可用的代码示例
5. **最佳实践**: 给出使用建议和注意事项

## 使用指南

### 查找文档

1. 根据模块名称查找对应的目录
2. 在目录中查找具体的文件文档
3. 阅读文档了解功能和使用方法

### 文档阅读顺序

建议按照以下顺序阅读文档：

1. 先阅读模块的 [`README.md`](editor-skeleton/README.md) 了解整体架构
2. 阅读核心模块文档（如 [`skeleton.md`](editor-skeleton/skeleton.md)）了解核心功能
3. 阅读具体组件文档（如 [`widget/widget.md`](editor-skeleton/widget/widget.md)）了解组件实现
4. 阅读使用示例，学习如何使用

### 代码示例

所有文档都包含实际可用的代码示例，可以直接复制使用：

```typescript
import { Skeleton } from '@alilc/lowcode-editor-skeleton';

const skeleton = new Skeleton(editor);

skeleton.add({
  type: 'Panel',
  name: 'myPanel',
  area: 'leftFloatArea',
  props: {
    title: '我的面板',
  },
  content: MyPanelComponent,
});
```

## 更新日志

### 2026-01-04

- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队
- 初始化文档结构
- 创建 Editor Skeleton 模块文档
- 创建核心模块文档（area、skeleton、types）
- 创建 Widget 模块文档（widget、panel、widget-container）
- 创建布局模块文档（workbench）
- 创建转换器模块文档（parse-func）
- 创建组件模块文档（settings-pane、widget-views）
- 创建 Editor Core 模块文档
- 创建核心模块文档（editor、event-bus、command、config、hotkey）
- 创建依赖注入模块文档（setter、ioc-context）
- 创建国际化模块文档（intl）
- 创建工具模块文档（logger、obx、preference）
- 创建组件模块文档（tip、tip-container、title）

## 贡献指南

### 添加新文档

1. 在对应的模块目录下创建新的 `.md` 文件
2. 按照现有文档的格式编写内容
3. 包含功能概述、API 说明、使用示例等
4. 更新本 README.md 的目录结构

### 文档格式

建议使用以下格式：

```markdown
# 模块名称

## 文件路径

`packages/module-name/src/file-name.ts`

## 功能概述

简述模块的主要功能。

## 主要功能

1. 功能点1
2. 功能点2
3. 功能点3

## 类/函数定义

```typescript
// 代码定义
```

## 使用示例

```typescript
// 示例代码
```

## 注意事项

1. 注意点1
2. 注意点2
```

## 相关资源

- [LowCode Engine 官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [API 文档](https://lowcode-engine.cn/doc/api)

## 反馈与支持

如有问题或建议，请通过以下方式反馈：

- 提交 GitHub Issue
- 参与社区讨论
- 联系维护团队



