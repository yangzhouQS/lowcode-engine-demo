# src/renderer.less 文档

## 文件路径

`packages/react-simulator-renderer/src/renderer.less`

## 功能概述

该文件定义了模拟器渲染器的样式，包括基础样式、容器占位符、滚动条样式、光标样式等。

## 主要功能

1. **基础样式**: 重置 body 和 html 的默认样式
2. **光标样式**: 定义不同操作状态下的光标样式
3. **滚动条样式**: 自定义滚动条样式
4. **容器占位符**: 为空容器提供占位符样式
5. **文档样式**: 为文档容器提供清除浮动样式
6. **实时编辑样式**: 为实时编辑元素提供样式

## 代码分析

### 基础样式（第 1-10 行）

```less
body, html {
  display: block;
  background: white;
  padding: 0;
  margin: 0;
}

html.engine-design-mode {
  padding-bottom: 0;
}
```

**功能说明**:
- 重置 body 和 html 的默认样式
- 设置背景色为白色
- 移除内边距和外边距
- 在设计模式下，移除底部的内边距

### 光标样式（第 12-22 行）

```less
html.engine-cursor-move, html.engine-cursor-move * {
  cursor: grabbing !important;
}

html.engine-cursor-copy, html.engine-cursor-copy * {
  cursor: copy !important;
}

html.engine-cursor-ew-resize, html.engine-cursor-ew-resize * {
  cursor: ew-resize !important;
}
```

**功能说明**:
- `engine-cursor-move`: 拖拽移动状态，使用 grabbing 光标
- `engine-cursor-copy`: 拖拽复制状态，使用 copy 光标
- `engine-cursor-ew-resize`: 水平调整大小状态，使用 ew-resize 光标
- 使用 `!important` 确保样式优先级

### 滚动条样式（第 24-32 行）

```less
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
```

**功能说明**:
- 设置滚动条的宽度和高度为 5px
- 设置滚动条滑块的背景色为半透明黑色
- 设置滚动条滑块的圆角为 5px

### 容器占位符样式（第 34-55 行）

```less
.lc-container {
  &:empty {
    background: #f2f3f5;
    color: #a7b1bd;
    outline: 1px dashed rgba(31, 56, 88, 0.2);
    outline-offset: -1px !important;
    height: 66px;
    max-height: 100%;
    min-width: 140px;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    &:before {
      content: '\62D6\62FD\7EC4\4EF6\6216\6A21\677F\5230\8FD9\91CC';
      font-size: 14px;
      z-index: 1;
      width: 100%;
      white-space: nowrap;
    }
  }
}
```

**功能说明**:
- 为空容器提供占位符样式
- 背景色为浅灰色
- 文字颜色为灰色
- 虚线边框
- 最小高度为 66px
- 最小宽度为 140px
- 使用 flex 布局居中显示
- 使用 `:before` 伪元素显示提示文字

### 占位容器样式（第 57-72 行）

```less
.lc-container-placeholder {
  min-height: 60px;
  height: 100%;
  width: 100%;
  background-color: rgb(240, 240, 240);
  border: 1px dotted;
  color: rgb(167, 177, 189);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &.lc-container-locked {
    background: #eccfcf;
  }
}
```

**功能说明**:
- 为占位容器提供样式
- 最小高度为 60px
- 背景色为浅灰色
- 点状边框
- 使用 flex 布局居中显示
- 锁定状态的背景色为浅红色

### 文档样式（第 74-82 行）

```less
body.engine-document {
  &:after, &:before {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
}
```

**功能说明**:
- 为文档容器提供清除浮动样式
- 使用 `:after` 和 `:before` 伪元素
- 清除浮动，防止布局问题

### 实时编辑样式（第 84-89 行）

```less
.engine-live-editing {
  cursor: text;
  outline: none;
  box-shadow: 0 0 0 2px rgb(102, 188, 92);
  user-select: text;
}
```

**功能说明**:
- 为实时编辑元素提供样式
- 光标为文本光标
- 无轮廓
- 绿色阴影边框
- 允许文本选择

### App 容器样式（第 91-93 行）

```less
#app {
  height: 100vh;
}
```

**功能说明**:
- 设置 app 容器的高度为 100vh
- 确保容器占满整个视口

## 使用示例

### 基本使用

```less
// 引入样式文件
import './renderer.less';
```

### 自定义样式

```less
// 覆盖默认样式
.lc-container {
  &:empty {
    background: #ff0000;
  }
}
```

## 注意事项

1. **样式优先级**: 使用 `!important` 确保样式优先级
2. **浏览器兼容性**: 使用 `-webkit-` 前缀支持 WebKit 浏览器
3. **Unicode 编码**: 提示文字使用 Unicode 编码
4. **清除浮动**: 使用伪元素清除浮动
5. **Flex 布局**: 使用 Flex 布局实现居中

## 相关文件

- **[`renderer-view.tsx`](08-src-renderer-view.tsx.md)**: React 视图组件，使用这些样式

## 最佳实践

1. **样式隔离**: 使用类名避免样式冲突
2. **响应式设计**: 使用相对单位（如 %、vh）
3. **可维护性**: 使用嵌套语法组织样式
4. **性能优化**: 避免使用通配符选择器
5. **浏览器兼容**: 添加浏览器前缀

## 总结

`renderer.less` 定义了模拟器渲染器的样式，包括基础样式、光标样式、滚动条样式、容器占位符样式等。该文件使用 Less 语法，代码结构清晰，易于维护。

主要特点：
- **完整性**: 覆盖了所有需要的样式
- **可维护性**: 使用嵌套语法组织样式
- **兼容性**: 添加浏览器前缀
- **优先级**: 使用 `!important` 确保样式优先级
- **灵活性**: 支持自定义样式覆盖
