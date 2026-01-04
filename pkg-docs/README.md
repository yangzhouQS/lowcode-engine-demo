# Package Docs

本目录包含各个模块包的详细功能文档。

## 目录结构

```
pkg-docs/
├── README.md                 # 本文档
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
└── [其他模块文档...]
```

## 文档说明

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
   - [`context.md`](editor-skeleton/context.md) - React Context，提供 Skeleton 实例
   - [`register-defaults.md`](editor-skeleton/register-defaults.md) - 注册默认的配置转换器

2. **Widget 模块** (Widget)
   - [`widget/widget.md`](editor-skeleton/widget/widget.md) - Widget 基类
   - [`widget/panel.md`](editor-skeleton/widget/panel.md) - 面板 Widget
   - [`widget/dock.md`](editor-skeleton/widget/dock.md) - Dock Widget
   - [`widget/panel-dock.md`](editor-skeleton/widget/panel-dock.md) - 面板 Dock Widget
   - [`widget/stage.md`](editor-skeleton/widget/stage.md) - Stage Widget
   - [`widget/widget-container.md`](editor-skeleton/widget/widget-container.md) - Widget 容器
   - [`widget/utils.ts`](editor-skeleton/widget/utils.md) - 工具函数

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
