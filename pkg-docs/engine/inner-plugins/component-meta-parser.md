# Component Meta Parser 插件文档

## 文件路径

`packages/engine/src/inner-plugins/component-meta-parser.ts`

## 功能概述

`component-meta-parser` 是组件元数据解析器插件，负责监听物料变化并构建组件元数据映射表。当物料发生变化时，会自动解析所有组件的元数据。

## 主要功能

### 1. 物料变化监听

- 监听物料变化事件
- 获取最新的物料信息
- 解析组件元数据

### 2. 组件元数据构建

- 从物料中提取组件列表
- 构建组件元数据映射表
- 更新设计器的元数据缓存

## 插件定义

```typescript
export const componentMetaParser = (designer: any) => {
  const fun = (ctx: IPublicModelPluginContext) => {
    return {
      init() {
        const { material } = ctx;
        material.onChangeAssets(() => {
          const assets = material.getAssets();
          const { components = [] } = assets;
          designer.buildComponentMetasMap(components);
        });
      },
    };
  };

  fun.pluginName = '___component_meta_parser___';

  return fun;
};
```

## 参数说明

### `designer: any`

设计器实例，用于构建组件元数据映射表。

### `ctx: IPublicModelPluginContext`

插件上下文，包含：
- `material`: 物料管理器

## 方法

### `init()`

初始化插件。

**行为:**
- 监听物料变化
- 当物料变化时，获取最新物料
- 从物料中提取组件列表
- 调用设计器的 `buildComponentMetasMap` 方法构建元数据映射表

## 使用示例

### 自动注册

该插件会在引擎初始化时自动注册，无需手动调用。

### 物料变化处理

当物料发生变化时，插件会自动处理：

```typescript
// 物料变化时
material.onChangeAssets(() => {
  const assets = material.getAssets();
  const { components = [] } = assets;
  designer.buildComponentMetasMap(components);
});
```

## 工作流程

1. **插件初始化**: 插件被注册并初始化
2. **监听物料**: 监听物料的 `onChangeAssets` 事件
3. **物料变化**: 当物料发生变化时触发
4. **获取物料**: 调用 `material.getAssets()` 获取最新物料
5. **提取组件**: 从物料中提取组件列表
6. **构建映射**: 调用 `designer.buildComponentMetasMap(components)` 构建元数据映射表

## 注意事项

1. **自动触发**: 物料变化时自动触发元数据构建
2. **性能考虑**: 大量组件时可能影响性能
3. **依赖设计器**: 需要设计器实例来构建元数据映射表
4. **物料格式**: 物料必须包含 `components` 字段

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`builtin-hotkey.md`](./builtin-hotkey.md) - 内置快捷键
- [`default-context-menu.md`](./default-context-menu.md) - 默认右键菜单

## 外部依赖

- `@alilc/lowcode-types` - 提供类型定义

## 典型使用场景

1. **物料更新**: 当物料更新时自动更新组件元数据
2. **组件注册**: 新组件注册时自动解析元数据
3. **元数据缓存**: 构建组件元数据映射表，提高查询性能
