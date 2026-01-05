# src/view/resource-view.less 文档

## 文件路径

`packages/workspace/src/view/resource-view.less`

## 功能概述

资源视图样式文件，定义资源视图组件的样式。

## 主要功能

1. **资源视图容器样式**: 定义资源视图容器的布局和定位
2. **编辑器主体样式**: 定义编辑器主体的布局

## 样式定义

### .workspace-resource-view

```less
.workspace-resource-view {
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
```

**说明**:
- `display: flex`: 使用 flex 布局
- `position: absolute`: 绝对定位
- `flex-direction: column`: 垂直方向布局
- `top: 0; bottom: 0; left: 0; right: 0`: 填充整个父容器

### .workspace-editor-body

```less
.workspace-editor-body {
  position: relative;
  height: 100%;
}
```

**说明**:
- `position: relative`: 相对定位
- `height: 100%`: 高度为 100%

## 使用示例

### 在组件中使用

```less
@import './resource-view.less';

.my-resource-view {
  @extend .workspace-resource-view;
}
```

### 自定义样式

```less
.workspace-resource-view {
  background-color: #f5f5f5;
  
  .workspace-editor-body {
    padding: 16px;
  }
}
```

## 注意事项

1. **定位方式**: 使用绝对定位填充整个父容器
2. **布局方向**: 使用垂直方向的 flex 布局
3. **高度设置**: 编辑器主体高度为 100%，确保填充剩余空间
4. **样式覆盖**: 可以通过覆盖这些类名来自定义样式

## 最佳实践

1. **样式隔离**: 使用独立的样式文件，避免样式冲突
2. **响应式设计**: 根据需要添加响应式样式
3. **性能优化**: 避免使用过于复杂的选择器
4. **可维护性**: 使用有意义的类名，便于维护

## 相关文件

- [`view/resource-view.tsx`](./16-src-view-resource-view.tsx.md) - 资源视图组件

## 总结

`src/view/resource-view.less` 是资源视图样式文件，定义了资源视图组件的样式。它提供了资源视图容器和编辑器主体的样式，确保组件正确显示。
