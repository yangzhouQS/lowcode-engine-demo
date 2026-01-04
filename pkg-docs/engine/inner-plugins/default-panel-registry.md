# Default Panel Registry 插件文档

## 文件路径

`packages/engine/src/inner-plugins/default-panel-registry.tsx`

## 功能概述

`default-panel-registry` 是默认的面板注册插件，负责注册默认的设计器和设置面板。它会在引擎初始化时自动添加这些面板到骨架中。

## 主要功能

### 1. 设计器面板注册

- 注册设计器面板到主区域
- 传递引擎配置和编辑器实例

### 2. 设置面板注册

- 注册设置面板到右侧区域
- 支持配置面板属性
- 可以禁用默认设置面板

## 插件定义

```typescript
export const defaultPanelRegistry = (editor: any) => {
  const fun = (ctx: IPublicModelPluginContext) => {
    return {
      init() {
        const { skeleton, config } = ctx;
        // 注册设计器面板
        skeleton.add({
          area: 'mainArea',
          name: 'designer',
          type: 'Widget',
          content: <DesignerPlugin
            engineConfig={config}
            engineEditor={editor}
          />,
        });
        // 注册设置面板
        if (!config.get('disableDefaultSettingPanel')) {
          skeleton.add({
            area: 'rightArea',
            name: 'settingsPane',
            type: 'Panel',
            content: <SettingsPrimaryPane
              engineEditor={editor}
            />,
            props: {
              ignoreRoot: true,
            },
            panelProps: {
              ...(config.get('defaultSettingPanelProps') || {}),
            },
          });
        }
      },
    };
  };

  fun.pluginName = '___default_panel___';

  return fun;
};
```

## 参数说明

### `editor: any`

编辑器实例，传递给面板组件。

### `ctx: IPublicModelPluginContext`

插件上下文，包含：
- `skeleton`: 骨架实例
- `config`: 配置管理器

## 面板配置

### 设计器面板

```typescript
skeleton.add({
  area: 'mainArea',
  name: 'designer',
  type: 'Widget',
  content: <DesignerPlugin
    engineConfig={config}
    engineEditor={editor}
  />,
});
```

**配置项:**
- `area`: 面板区域（`'mainArea'`）
- `name`: 面板名称（`'designer'`）
- `type`: 面板类型（`'Widget'`）
- `content`: 面板内容（`DesignerPlugin` 组件）

### 设置面板

```typescript
if (!config.get('disableDefaultSettingPanel')) {
  skeleton.add({
    area: 'rightArea',
    name: 'settingsPane',
    type: 'Panel',
    content: <SettingsPrimaryPane
      engineEditor={editor}
    />,
    props: {
      ignoreRoot: true,
    },
    panelProps: {
      ...(config.get('defaultSettingPanelProps') || {}),
    },
  });
}
```

**配置项:**
- `area`: 面板区域（`'rightArea'`）
- `name`: 面板名称（`'settingsPane'`）
- `type`: 面板类型（`'Panel'`）
- `content`: 面板内容（`SettingsPrimaryPane` 组件）
- `props`: 面板属性
  - `ignoreRoot`: 是否忽略根节点（`true`）
- `panelProps`: 面板属性
  - 从配置中获取默认面板属性

## 配置选项

### `disableDefaultSettingPanel`

禁用默认设置面板。

```typescript
config.get('disableDefaultSettingPanel')
```

如果为 `true`，则不会注册设置面板。

### `defaultSettingPanelProps`

默认设置面板属性。

```typescript
config.get('defaultSettingPanelProps')
```

可以自定义设置面板的属性。

## 使用示例

### 启用默认面板

默认情况下，设计器和设置面板都会被注册。

### 禁用设置面板

```typescript
await init(container, {
  disableDefaultSettingPanel: true,
});
```

### 自定义设置面板属性

```typescript
await init(container, {
  defaultSettingPanelProps: {
    // 自定义属性
  },
});
```

## 注意事项

1. **自动注册**: 插件会在引擎初始化时自动注册
2. **配置控制**: 可以通过配置控制是否注册设置面板
3. **面板属性**: 可以通过配置自定义面板属性
4. **区域分配**: 设计器在主区域，设置面板在右侧区域

## 相关文件

- [`../engine-core.md`](../engine-core.md) - 引擎核心
- [`builtin-hotkey.md`](./builtin-hotkey.md) - 内置快捷键
- [`component-meta-parser.md`](./component-meta-parser.md) - 组件元数据解析

## 外部依赖

- `@alilc/lowcode-types` - 提供类型定义
- `@alilc/lowcode-editor-skeleton` - 提供骨架组件
- `@alilc/lowcode-plugin-designer` - 提供设计器插件

## 典型使用场景

1. **默认布局**: 使用默认的设计器和设置面板布局
2. **自定义布局**: 通过配置自定义面板属性
3. **禁用面板**: 禁用默认设置面板，使用自定义面板
