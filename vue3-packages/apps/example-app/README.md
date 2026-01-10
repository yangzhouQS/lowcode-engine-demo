# Vue3 低代码引擎 - 示例应用

这是一个基于 Vue3 低代码引擎的示例应用，展示了如何使用 Vue3 LowCode Engine 构建完整的低代码开发平台。

## 📋 目录

- [项目概述](#项目概述)
- [核心功能](#核心功能)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [功能详解](#功能详解)
- [使用指南](#使用指南)
- [API 文档](#api-文档)
- [开发指南](#开发指南)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)

## 项目概述

本示例应用是一个功能完整的低代码编辑器，提供了可视化拖拽设计、实时预览、属性配置等核心功能。通过这个示例，您可以了解如何：

- 集成 Vue3 低代码引擎的各个模块
- 构建可视化拖拽编辑器
- 实现组件物料库
- 管理页面 Schema 数据
- 实现撤销/重做、保存/加载等功能

## 核心功能

### 1. 可视化拖拽编辑器

- **组件面板**：左侧提供丰富的组件库，支持拖拽添加到画布
- **画布区域**：中间区域展示页面结构，支持组件选择、删除、移动
- **属性面板**：右侧面板配置选中组件的属性、样式和事件

### 2. 组件物料库

支持以下组件类型：

- **基础组件**：按钮、链接、文本、图标
- **表单组件**：输入框、数字输入、选择器、开关、滑块、时间选择、日期选择、评分、颜色选择、穿梭框、表单、单选框、多选框
- **数据展示**：表格、标签、进度条、树形控件、分页、标记、头像、骨架屏、空状态、描述列表、结果、统计数值
- **反馈组件**：警告、加载、消息提示、弹窗、通知、对话框、抽屉、气泡确认框、弹出框、文字提示
- **布局组件**：容器、行、列、卡片、折叠面板、标签页、面包屑、页头、分割线、间距

### 3. 数据管理

- **撤销/重做**：支持操作历史记录，可随时撤销或重做
- **保存/加载**：支持将当前方案保存到本地存储，或从本地存储加载
- **导出/导入**：支持将方案导出为 JSON 文件，或从 JSON 文件导入
- **清空画布**：一键清空画布，重新开始设计

### 4. 实时预览

- 支持实时预览页面效果
- 在预览模式下查看组件的实际渲染效果

## 技术栈

- **框架**: Vue 3.4+ (Composition API)
- **UI 库**: Element Plus 2.4+
- **构建工具**: Vite 5.0+
- **语言**: TypeScript 5.3+
- **包管理**: pnpm
- **低代码引擎**: @vue3-lowcode/*

## 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 进入 vue3-packages 目录
cd vue3-packages

# 安装所有依赖
pnpm install
```

### 构建所有包

```bash
# 构建所有 @vue3-lowcode/* 包
pnpm build
```

### 启动开发服务器

```bash
# 进入示例应用目录
cd apps/example-app

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
example-app/
├── src/
│   ├── components/
│   │   └── editor/
│   │       ├── EditorLayout.vue      # 编辑器主布局
│   │       ├── ComponentPanel.vue    # 左侧组件面板
│   │       ├── CanvasPanel.vue      # 中间画布区域
│   │       ├── SchemaNode.vue       # Schema 节点组件
│   │       ├── PropertyPanel.vue    # 右侧属性面板
│   │       ├── PreviewPanel.vue     # 预览面板
│   │       └── SchemaRenderer.vue   # Schema 渲染器
│   ├── App.vue                    # 应用根组件
│   └── main.ts                   # 应用入口
├── index.html                     # HTML 模板
├── package.json                   # 项目配置
├── tsconfig.json                 # TypeScript 配置
├── vite.config.ts                # Vite 配置
└── README.md                    # 项目文档
```

## 功能详解

### 编辑器布局

编辑器采用经典的三栏布局：

```
┌─────────────────────────────────────────────────────────┐
│                  顶部工具栏                          │
├──────────┬──────────────────────────────┬───────────┤
│          │                              │           │
│  组件面板  │           画布区域              │  属性面板   │
│          │                              │           │
│          │                              │           │
└──────────┴──────────────────────────────┴───────────┘
```

### 组件面板

组件面板按类别组织组件，每个类别可折叠展开：

```vue
<el-collapse v-model="activeNames" accordion>
  <el-collapse-item title="基础组件" name="basic">
    <!-- 组件列表 -->
  </el-collapse-item>
  <el-collapse-item title="表单组件" name="form">
    <!-- 组件列表 -->
  </el-collapse-item>
  <!-- 更多类别... -->
</el-collapse>
```

### 画布区域

画布区域支持以下操作：

- **拖拽添加**：从组件面板拖拽组件到画布
- **选择组件**：点击组件进行选中
- **移动组件**：通过上移/下移按钮调整组件顺序
- **删除组件**：通过删除按钮移除组件
- **缩放画布**：通过放大/缩小按钮调整画布显示比例

### 属性面板

属性面板包含三个配置区域：

#### 1. 基础信息

- 组件 ID（只读）
- 组件名称（只读）
- 显示名称（可编辑）

#### 2. 属性配置

- 动态显示组件的所有属性
- 根据属性类型显示不同的输入控件
- 支持添加自定义属性

属性类型支持：
- 字符串：文本输入框
- 数字：数字输入框
- 布尔：开关
- 数组：多选下拉框
- 对象：JSON 编辑器

#### 3. 样式配置

支持配置以下样式属性：
- 宽度
- 高度
- 内边距
- 外边距
- 背景色
- 文字颜色
- 字体大小
- 圆角
- 边框

#### 4. 事件配置

支持配置以下事件：
- 点击 (click)
- 双击 (dblclick)
- 输入 (input)
- 改变 (change)
- 聚焦 (focus)
- 失焦 (blur)
- 提交 (submit)
- 重置 (reset)

## 使用指南

### 基础操作

#### 1. 添加组件

1. 在左侧组件面板中找到需要的组件
2. 按住鼠标左键拖拽组件
3. 将组件拖拽到中间画布区域
4. 松开鼠标完成添加

#### 2. 选择组件

1. 在画布区域点击任意组件
2. 组件会被高亮显示
3. 右侧属性面板会显示该组件的配置

#### 3. 配置组件

1. 选中需要配置的组件
2. 在右侧属性面板中修改属性、样式或事件
3. 修改会实时反映在画布上

#### 4. 移动组件

1. 选中需要移动的组件
2. 点击组件上方的上移/下移按钮
3. 组件会移动到新位置

#### 5. 删除组件

1. 选中需要删除的组件
2. 点击组件上方的删除按钮
3. 确认删除操作

#### 6. 撤销/重做

- 点击工具栏的"撤销"按钮撤销上一步操作
- 点击工具栏的"重做"按钮重做已撤销的操作

#### 7. 保存方案

1. 点击工具栏的"保存"按钮
2. 方案会保存到浏览器的本地存储
3. 刷新页面后可以通过"加载"按钮恢复

#### 8. 导出方案

1. 点击工具栏的"导出"按钮
2. 方案会下载为 JSON 文件
3. 可以将文件分享给其他人或备份

#### 9. 导入方案

1. 点击工具栏的"导入"按钮
2. 选择之前导出的 JSON 文件
3. 方案会加载到画布中

#### 10. 预览页面

1. 点击工具栏的"预览"按钮
2. 在新窗口中查看页面的实际效果
3. 点击"关闭"按钮返回编辑器

### 高级功能

#### 自定义组件

您可以通过修改 `ComponentPanel.vue` 中的组件列表来添加自定义组件：

```typescript
const customComponents = [
  { name: 'MyComponent', label: '我的组件', icon: 'Star', componentName: 'MyComponent' },
];
```

#### 自定义属性

在属性面板中，您可以添加自定义属性：

1. 在"属性配置"区域找到"添加属性"部分
2. 输入属性名
3. 选择属性类型（字符串、数字、布尔、数组）
4. 点击"添加"按钮

#### 自定义样式

在"样式配置"区域，您可以：

1. 修改组件的尺寸（宽度、高度）
2. 调整间距（内边距、外边距）
3. 设置颜色（背景色、文字颜色）
4. 调整字体（字体大小）
5. 设置边框和圆角

#### 自定义事件

在"事件配置"区域，您可以：

1. 从下拉列表中选择事件类型
2. 输入事件处理函数名称
3. 点击"添加"按钮

## API 文档

### Schema 数据结构

```typescript
interface Schema {
  componentName: string;    // 组件名称
  id: string;              // 组件 ID
  label?: string;          // 显示名称
  props?: Record<string, any>;  // 组件属性
  style?: Record<string, string>; // 组件样式
  events?: Record<string, string>; // 组件事件
  children?: Schema[];     // 子组件
}
```

### 组件属性配置

每个组件都有默认属性，例如：

```typescript
// 按钮组件默认属性
const buttonProps = {
  type: 'primary',    // 按钮类型
  size: 'default',    // 按钮尺寸
  disabled: false,     // 是否禁用
  loading: false,     // 是否加载中
};
```

### 事件处理

事件处理函数名称会存储在 Schema 中：

```typescript
{
  events: {
    click: 'handleClick',
    change: 'handleChange'
  }
}
```

## 开发指南

### 添加新组件

1. 在 `ComponentPanel.vue` 中添加组件定义：

```typescript
const newComponents = [
  { name: 'NewComponent', label: '新组件', icon: 'Star', componentName: 'ElNewComponent' },
];
```

2. 在 `SchemaRenderer.vue` 中注册组件：

```typescript
const componentMap: Record<string, any> = {
  // ... 其他组件
  ElNewComponent: ElementPlus.ElNewComponent,
};
```

3. 在 `CanvasPanel.vue` 的 `getDefaultProps` 方法中添加默认属性：

```typescript
const getDefaultProps = (componentName: string): any => {
  const defaultProps: Record<string, any> = {
    // ... 其他组件
    ElNewComponent: { prop1: 'value1', prop2: 'value2' },
  };
  return defaultProps[componentName] || {};
};
```

### 扩展属性面板

您可以扩展 `PropertyPanel.vue` 来支持更多的属性类型：

```vue
<el-form-item :label="key">
  <!-- 自定义属性编辑器 -->
  <MyCustomEditor v-model="value" />
</el-form-item>
```

### 自定义主题

修改全局样式文件 `src/App.vue` 中的 CSS 变量：

```css
:root {
  --primary-color: #409eff;
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --danger-color: #f56c6c;
}
```

## 常见问题

### Q: 如何清空画布？

A: 点击工具栏的"清空"按钮，确认后画布会被清空。

### Q: 如何撤销操作？

A: 点击工具栏的"撤销"按钮，或使用快捷键 Ctrl+Z。

### Q: 如何重做操作？

A: 点击工具栏的"重做"按钮，或使用快捷键 Ctrl+Y。

### Q: 如何保存我的设计？

A: 点击工具栏的"保存"按钮，方案会保存到本地存储。刷新页面后可以通过"加载"按钮恢复。

### Q: 如何导出设计？

A: 点击工具栏的"导出"按钮，方案会下载为 JSON 文件。

### Q: 如何导入设计？

A: 点击工具栏的"导入"按钮，选择之前导出的 JSON 文件。

### Q: 如何预览页面？

A: 点击工具栏的"预览"按钮，在新窗口中查看页面效果。

### Q: 如何添加自定义组件？

A: 修改 `ComponentPanel.vue` 中的组件列表，并在 `SchemaRenderer.vue` 中注册组件。

### Q: 如何修改组件默认属性？

A: 在 `CanvasPanel.vue` 的 `getDefaultProps` 方法中修改对应组件的默认属性。

### Q: 如何自定义样式？

A: 在属性面板的"样式配置"区域修改样式属性，或在全局样式文件中修改 CSS 变量。

### Q: 组件拖拽不工作怎么办？

A: 请检查：
1. 浏览器是否支持 HTML5 拖拽 API
2. 是否有 JavaScript 错误
3. 组件是否正确设置了 `draggable="true"` 属性

### Q: 预览功能不工作怎么办？

A: 请检查：
1. Schema 数据是否正确
2. 组件是否在 `SchemaRenderer.vue` 中正确注册
3. 浏览器控制台是否有错误信息

## 贡献指南

欢迎贡献代码、报告问题或提出改进建议。

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

- 项目地址: https://github.com/vue3-lowcode/engine
- 问题反馈: https://github.com/vue3-lowcode/engine/issues
- 邮箱: support@vue3-lowcode.com

## 相关资源

- [Vue3 官方文档](https://vuejs.org/)
- [Element Plus 官方文档](https://element-plus.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vue3 低代码引擎架构文档](../../docs/architecture.md)
- [Vue3 低代码引擎 API 文档](../../docs/api.md)

## 致谢

感谢所有贡献者和使用者的支持！
