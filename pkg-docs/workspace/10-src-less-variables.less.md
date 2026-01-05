# src/less-variables.less 文档

## 文件路径

`packages/workspace/src/less-variables.less`

## 功能概述

LESS 变量定义文件，定义了工作台 UI 的样式变量，包括字体、颜色、阴影、圆角、过渡和布局等。

## 主要功能

1. **字体变量**: 定义字体大小、行高、字重等
2. **颜色变量**: 定义主题色、边框色、背景色等
3. **阴影变量**: 定义不同级别的阴影效果
4. **圆角变量**: 定义不同级别的圆角
5. **过渡变量**: 定义过渡时间和缓动函数
6. **布局变量**: 定义间距、尺寸等

## 变量定义

### 字体变量

```less
@font-size-base: 12px;
@font-size-sm: 11px;
@font-size-lg: 14px;
@font-size-xl: 16px;
@font-size-xxl: 20px;
@line-height-base: 1.5;
@font-weight-base: 400;
@font-weight-bold: 700;
```

**说明**:
- `@font-size-base`: 基础字体大小，12px
- `@font-size-sm`: 小字体，11px
- `@font-size-lg`: 大字体，14px
- `@font-size-xl`: 超大字体，16px
- `@font-size-xxl`: 特大字体，20px
- `@line-height-base`: 基础行高，1.5
- `@font-weight-base`: 基础字重，400
- `@font-weight-bold`: 粗体字重，700

### 颜色变量

```less
@color-text: #333;
@color-text-secondary: #666;
@color-text-placeholder: #999;
@color-border: #e5e5e5;
@color-border-light: #f0f0f0;
@color-border-dark: #d9d9d9;
@color-background: #fff;
@color-background-secondary: #f5f5f5;
@color-background-hover: #fafafa;
@color-background-active: #f0f0f0;
@color-primary: #1890ff;
@color-primary-hover: #40a9ff;
@color-primary-active: #096dd9;
@color-success: #52c41a;
@color-warning: #faad14;
@color-error: #f5222d;
```

**说明**:
- `@color-text`: 主文本颜色，#333
- `@color-text-secondary`: 次要文本颜色，#666
- `@color-text-placeholder`: 占位符文本颜色，#999
- `@color-border`: 边框颜色，#e5e5e5
- `@color-border-light`: 浅边框颜色，#f0f0f0
- `@color-border-dark`: 深边框颜色，#d9d9d9
- `@color-background`: 背景色，#fff
- `@color-background-secondary`: 次要背景色，#f5f5f5
- `@color-background-hover`: 悬停背景色，#fafafa
- `@color-background-active**: 激活背景色，#f0f0f0
- `@color-primary`: 主题色，#1890ff
- `@color-primary-hover`: 主题色悬停，#40a9ff
- `@color-primary-active`: 主题色激活，#096dd9
- `@color-success`: 成功色，#52c41a
- `@color-warning`: 警告色，#faad14
- `@color-error`: 错误色，#f5222d

### 阴影变量

```less
@shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
@shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
@shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

**说明**:
- `@shadow-sm`: 小阴影，用于轻微的悬浮效果
- `@shadow-base`: 基础阴影，用于卡片、弹窗等
- `@shadow-lg`: 大阴影，用于模态框、下拉菜单等

### 圆角变量

```less
@border-radius-sm: 2px;
@border-radius-base: 4px;
@border-radius-lg: 8px;
```

**说明**:
- `@border-radius-sm`: 小圆角，2px
- `@border-radius-base`: 基础圆角，4px
- `@border-radius-lg`: 大圆角，8px

### 过渡变量

```less
@transition-duration-base: 0.3s;
@transition-duration-fast: 0.15s;
@transition-timing-function-base: cubic-bezier(0.645, 0.045, 0.355, 1);
```

**说明**:
- `@transition-duration-base`: 基础过渡时间，0.3s
- `@transition-duration-fast`: 快速过渡时间，0.15s
- `@transition-timing-function-base`: 基础缓动函数，cubic-bezier(0.645, 0.045, 0.355, 1)

### 布局变量

```less
@spacing-xs: 4px;
@spacing-sm: 8px;
@spacing-base: 12px;
@spacing-lg: 16px;
@spacing-xl: 24px;
@spacing-xxl: 32px;
@height-base: 32px;
@height-lg: 40px;
@width-base: 100%;
@max-width-base: 1200px;
```

**说明**:
- `@spacing-xs`: 超小间距，4px
- `@spacing-sm`: 小间距，8px
- `@spacing-base`: 基础间距，12px
- `@spacing-lg`: 大间距，16px
- `@spacing-xl`: 超大间距，24px
- `@spacing-xxl`: 特大间距，32px
- `@height-base`: 基础高度，32px
- `@height-lg`: 大高度，40px
- `@width-base`: 基础宽度，100%
- `@max-width-base`: 最大宽度，1200px

## 使用示例

### 在 LESS 文件中使用

```less
@import './less-variables.less';

.my-component {
  font-size: @font-size-base;
  color: @color-text;
  background-color: @color-background;
  border: 1px solid @color-border;
  border-radius: @border-radius-base;
  padding: @spacing-base;
  box-shadow: @shadow-base;
  transition: all @transition-duration-base @transition-timing-function-base;
}
```

### 在 React 组件中使用

```less
// MyComponent.less
@import './less-variables.less';

.my-component {
  font-size: @font-size-lg;
  color: @color-text;
  padding: @spacing-lg;
  border-radius: @border-radius-lg;
  box-shadow: @shadow-lg;
}
```

## 设计规范

### 字体规范

- 基础字体大小为 12px，适合低代码编辑器的紧凑布局
- 使用 1.5 的行高，保证可读性
- 字重使用 400 和 700 两个级别

### 颜色规范

- 文本颜色使用 #333、#666、#999 三个级别
- 边框颜色使用 #e5e5e5、#f0f0f0、#d9d9d9 三个级别
- 背景色使用 #fff、#f5f5f5、#fafafa、#f0f0f0 四个级别
- 主题色使用蓝色系，#1890ff 为主色

### 阴影规范

- 小阴影用于轻微的悬浮效果
- 基础阴影用于卡片、弹窗等
- 大阴影用于模态框、下拉菜单等

### 圆角规范

- 小圆角 2px，用于按钮、输入框等
- 基础圆角 4px，用于卡片、面板等
- 大圆角 8px，用于弹窗、对话框等

### 过渡规范

- 基础过渡时间 0.3s，用于常规动画
- 快速过渡时间 0.15s，用于快速反馈
- 使用 cubic-bezier(0.645, 0.045, 0.355, 1) 缓动函数

### 布局规范

- 间距使用 4px、8px、12px、16px、24px、32px 六个级别
- 基础高度 32px，适合按钮、输入框等
- 大高度 40px，适合大按钮、大输入框等
- 最大宽度 1200px，适合大屏布局

## 注意事项

1. **变量命名**: 使用语义化的变量名，如 `@font-size-base` 而不是 `@fs-1`
2. **变量复用**: 优先使用变量，避免硬编码颜色、尺寸等
3. **变量扩展**: 可以在项目层面扩展这些变量
4. **主题定制**: 通过修改变量值可以轻松定制主题

## 最佳实践

1. **统一使用**: 在整个项目中统一使用这些变量
2. **变量扩展**: 根据项目需求扩展变量
3. **主题定制**: 通过修改变量值定制主题
4. **文档维护**: 修改变量时同步更新文档

## 相关文件

- [`layouts/workbench.tsx`](./14-src-layouts-workbench.tsx.md) - 工作台布局组件，使用这些样式变量
- [`view/resource-view.less`](./17-src-view-resource-view.less.md) - 资源视图样式文件

## 总结

`src/less-variables.less` 是 LESS 变量定义文件，定义了工作台 UI 的样式变量。它提供了字体、颜色、阴影、圆角、过渡和布局等变量，为整个工作台提供了统一的样式规范。
