# @vue3-engine/vue3-renderer

Vue 3 渲染器，用于阿里低代码引擎。

## 简介

这是阿里低代码引擎的 Vue 3 版本渲染器，负责将低代码协议的 schema 转换为 Vue 3 组件并渲染到页面上。

## 特性

- 🚀 基于 Vue 3 Composition API
- 📦 完整的低代码协议支持
- 🔧 支持多种渲染器类型（Page、Component、Block、Addon、Temp）
- 🎨 支持样式和类名绑定
- 🌍 支持国际化
- 📊 支持数据源管理
- 🔄 支持生命周期钩子
- 🎯 支持 JS 表达式和函数

## 安装

```bash
npm install @vue3-engine/vue3-renderer
# 或
yarn add @vue3-engine/vue3-renderer
# 或
pnpm add @vue3-engine/vue3-renderer
```

## 使用

### 基础用法

```vue
<template>
  <Renderer :schema="schema" :components="components" />
</template>

<script setup>
import { ref } from 'vue';
import Renderer from '@vue3-engine/vue3-renderer';

const schema = ref({
  componentName: 'Page',
  props: {},
  children: [
    {
      componentName: 'Div',
      props: {
        className: 'container',
        style: { padding: '20px' }
      },
      children: 'Hello LowCode!'
    }
  ]
});

const components = {
  Div: {
    name: 'Div',
    render() {
      return this.$slots.default ? this.$slots.default() : null;
    }
  }
};
</script>
```

### 完整配置

```vue
<template>
  <Renderer
    :schema="schema"
    :components="components"
    :appHelper="appHelper"
    :designMode="designMode"
    :locale="locale"
    :messages="messages"
    :device="device"
    :thisRequiredInJSE="true"
  />
</template>

<script setup>
import { ref } from 'vue';
import Renderer from '@vue3-engine/vue3-renderer';

const schema = ref({ /* schema */ });
const components = ref({ /* components */ });
const appHelper = ref({
  utils: {
    router: { /* router methods */ },
    i18n: { /* i18n methods */ }
  },
  constants: { /* constants */ }
});
const designMode = ref('design'); // 'design' | 'preview' | 'live'
const locale = ref('zh-CN');
const messages = ref({ /* i18n messages */ });
const device = ref('default'); // 'default' | 'mobile'
</script>
```

## 渲染器类型

### PageRenderer

页面级渲染器，用于渲染整个页面。

```javascript
{
  componentName: 'Page',
  props: {},
  children: [...]
}
```

### ComponentRenderer

组件级渲染器，用于渲染单个组件。

```javascript
{
  componentName: 'Component',
  props: {},
  children: [...]
}
```

### BlockRenderer

块级渲染器，用于渲染代码块。

```javascript
{
  componentName: 'Block',
  props: {},
  children: [...]
}
```

### AddonRenderer

附加组件渲染器，用于渲染插件组件。

```javascript
{
  componentName: 'Addon',
  props: {},
  children: [...]
}
```

### TempRenderer

临时组件渲染器，用于渲染临时组件。

```javascript
{
  componentName: 'Temp',
  props: {},
  children: [...]
}
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| schema | `IPublicTypeRootSchema` | `{}` | 低代码 schema |
| components | `Record<string, Component>` | `{}` | 组件映射表 |
| appHelper | `IRendererAppHelper` | `undefined` | 应用辅助对象 |
| designMode | `string` | `''` | 设计模式 |
| locale | `string` | `undefined` | 语言环境 |
| messages | `Record<string, any>` | `{}` | 国际化消息 |
| device | `string` | `undefined` | 设备类型 |
| thisRequiredInJSE | `boolean` | `true` | JS 表达式中是否需要 this |
| onCompGetRef | `(schema, ref) => void` | `undefined` | 组件 ref 回调 |
| onCompGetCtx | `(schema, ctx) => void` | `undefined` | 组件上下文回调 |

### 暴露的方法

| 方法 | 说明 |
|------|------|
| `$(filedId, instance?)` | 获取字段值 |
| `reloadDataSource()` | 重新加载数据源 |

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 相关包

- [@vue3-engine/renderer-core](../renderer-core) - 渲染器核心
- [@vue3-engine/types](../types) - 类型定义
- [@vue3-engine/utils](../utils) - 工具函数

## 许可证

MIT
