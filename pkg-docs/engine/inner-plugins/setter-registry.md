# Setter Registry 插件文档

## 文件路径

`packages/engine/src/inner-plugins/setter-registry.ts`

## 功能概述

`setter-registry` 是 Setter 注册插件，负责注册默认的 Setter。它会在引擎初始化时自动注册内置的 Setter。

## 主要功能

### 1. Setter 注册

- 注册默认的 Setter
- 支持禁用默认 Setter
- 从 `@alilc/lowcode-engine-ext` 加载内置 Setter

## 插件定义

```typescript
export const setterRegistry = (ctx: IPublicModelPluginContext) => {
  return {
    init() {
      const { config } = ctx;
      if (config.get('disableDefaultSetters')) return;
      const builtinSetters = require('@alilc/lowcode-engine-ext')?.setters;
      if (builtinSetters) {
        ctx.setters.registerSetter(builtinSetters);
      }
    },
  };
};

setterRegistry.pluginName = '___setter_registry___';
```

## 参数说明

### `ctx: IPublicModelPluginContext`

插件上下文，包含：
- `config`: 配置管理器
- `setters`: Setter 管理器

## 方法

### `init()`

初始化插件。

**行为:**
- 检查是否禁用默认 Setter
- 如果未禁用，加载内置 Setter
- 注册内置 Setter

## 配置选项

### `disableDefaultSetters`

禁用默认 Setter。

```typescript
config.get('disableDefaultSetters')
```

如果为 `true`，则不会注册默认 Setter。

## 内置 Setter

内置 Setter 从 `@alilc/lowcode-engine-ext` 加载：

```typescript
const builtinSetters = require('@alilc/lowcode-engine-ext')?.setters;
```

## 使用示例

### 启用默认 Setter

默认情况下，所有内置 Setter 都会被注册。

### 禁用默认 Setter

```typescript
await init(container, {
  disableDefaultSetters: true,
});
```

### 自定义 Setter

```typescript
// 在插件中注册自定义 Setter
const { setters } = ctx;

setters.registerSetter('mySetter', MySetterComponent);
```

## 注意事项

1. **自动注册**: 插件会在引擎初始化时自动注册
2. **配置控制**: 可以通过配置控制是否注册默认 Setter
3. **外部依赖**: 内置 Setter 来自 `@alilc/lowcode-engine-ext` 包
4. **动态加载**: 使用 `require` 动态加载 Setter

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`builtin-hotkey.md`](./builtin-hotkey.md) - 内置快捷键
- [`component-meta-parser.md`](./component-meta-parser.md) - 组件元数据解析

## 外部依赖

- `@alilc/lowcode-types` - 提供类型定义

## 典型使用场景

1. **默认 Setter**: 使用内置的 Setter 编辑属性
2. **自定义 Setter**: 注册自定义 Setter 扩展功能
3. **禁用默认**: 禁用默认 Setter，完全自定义
