# Renderer - 渲染器入口

## 功能概述

[`renderer/index.ts`](../../packages/renderer-core/src/renderer/index.ts) 是渲染器入口模块，负责导出所有渲染器。它提供了各种类型的渲染器，包括基础渲染器、页面渲染器、组件渲染器、区块渲染器、插件渲染器、临时渲染器等。

## 主要功能

1. **渲染器导出**：导出所有渲染器
2. **渲染器工厂**：提供渲染器工厂函数
3. **渲染器类型**：支持多种渲染器类型
4. **渲染器配置**：支持渲染器配置

## 导出的渲染器

### LowCodeRenderer

低代码渲染器，用于渲染低代码协议的 Schema。

```typescript
export { LowCodeRenderer } from './base';
```

### PageRenderer

页面渲染器，用于渲染页面组件。

```typescript
export { PageRenderer } from './page';
```

### ComponentRenderer

组件渲染器，用于渲染普通组件。

```typescript
export { ComponentRenderer } from './component';
```

### BlockRenderer

区块渲染器，用于渲染区块组件。

```typescript
export { BlockRenderer } from './block';
```

### AddonRenderer

插件渲染器，用于渲染插件组件。

```typescript
export { AddonRenderer } from './addon';
```

### TempRenderer

临时渲染器，用于渲染临时组件。

```typescript
export { TempRenderer } from './temp';
```

### Renderer

渲染器入口组件。

```typescript
export { Renderer } from './renderer';
```

## 渲染器类型

### LowCodeRenderer

低代码渲染器，支持完整的低代码协议功能。

**特点：**
- 支持完整的低代码协议
- 支持组件生命周期
- 支持数据源管理
- 支持国际化
- 支持表达式解析
- 支持循环渲染
- 支持条件渲染
- 支持样式注入
- 支持设计模式

**使用场景：**
- 低代码平台
- 可视化编辑器
- 动态表单
- 页面构建器

### PageRenderer

页面渲染器，用于渲染页面组件。

**特点：**
- 继承自 LowCodeRenderer
- 专门用于渲染页面
- 支持页面级别的配置
- 支持页面级别的生命周期

**使用场景：**
- 页面渲染
- 页面预览
- 页面发布

### ComponentRenderer

组件渲染器，用于渲染普通组件。

**特点：**
- 继承自 LowCodeRenderer
- 专门用于渲染组件
- 支持组件级别的配置
- 支持组件级别的生命周期

**使用场景：**
- 组件渲染
- 组件预览
- 组件发布

### BlockRenderer

区块渲染器，用于渲染区块组件。

**特点：**
- 继承自 LowCodeRenderer
- 专门用于渲染区块
- 支持区块级别的配置
- 支持区块级别的生命周期

**使用场景：**
- 区块渲染
- 区块预览
- 区块发布

### AddonRenderer

插件渲染器，用于渲染插件组件。

**特点：**
- 继承自 LowCodeRenderer
- 专门用于渲染插件
- 支持插件级别的配置
- 支持插件级别的生命周期

**使用场景：**
- 插件渲染
- 插件预览
- 插件发布

### TempRenderer

临时渲染器，用于渲染临时组件。

**特点：**
- 继承自 LowCodeRenderer
- 专门用于渲染临时组件
- 支持临时组件级别的配置
- 支持临时组件级别的生命周期

**使用场景：**
- 临时组件渲染
- 临时组件预览
- 临时组件发布

## 使用示例

### 使用 LowCodeRenderer

```typescript
import { LowCodeRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new LowCodeRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
  },
  components: {
    Button: ButtonComponent,
  },
  designMode: 'design',
});

renderer.render();
```

### 使用 PageRenderer

```typescript
import { PageRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new PageRenderer({
  schema: {
    componentName: 'Page',
    props: {},
    children: [],
  },
  components: {
    Button: ButtonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 使用 ComponentRenderer

```typescript
import { ComponentRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new ComponentRenderer({
  schema: {
    componentName: 'Button',
    props: {
      text: 'Click me',
    },
  },
  components: {
    Button: ButtonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 使用 BlockRenderer

```typescript
import { BlockRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new BlockRenderer({
  schema: {
    componentName: 'Block',
    props: {},
    children: [],
  },
  components: {
    Block: BlockComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 使用 AddonRenderer

```typescript
import { AddonRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new AddonRenderer({
  schema: {
    componentName: 'Addon',
    props: {},
    children: [],
  },
  components: {
    Addon: AddonComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 使用 TempRenderer

```typescript
import { TempRenderer } from '@alilc/lowcode-renderer-core';

const renderer = new TempRenderer({
  schema: {
    componentName: 'Temp',
    props: {},
    children: [],
  },
  components: {
    Temp: TempComponent,
  },
  designMode: 'live',
});

renderer.render();
```

### 使用 Renderer

```typescript
import { Renderer } from '@alilc/lowcode-renderer-core';

<Renderer
  schema={{
    componentName: 'Page',
    props: {},
    children: [],
  }}
  components={{
    Button: ButtonComponent,
  }}
  designMode="design"
/>
```

## 注意事项

1. **渲染器选择**：根据场景选择合适的渲染器
2. **渲染器配置**：正确配置渲染器参数
3. **组件注册**：正确注册所有需要的组件
4. **设计模式**：正确设置设计模式
5. **性能优化**：注意渲染性能优化
6. **错误处理**：提供友好的错误处理
7. **内存管理**：注意内存管理
8. **类型安全**：使用 TypeScript 类型确保类型安全

## 相关文件

- [`renderer/base.tsx`](base.md) - 基础渲染器
- [`renderer/page.tsx`](page.md) - 页面渲染器
- [`renderer/component.tsx`](component.md) - 组件渲染器
- [`renderer/block.tsx`](block.md) - 区块渲染器
- [`renderer/addon.tsx`](addon.md) - 插件渲染器
- [`renderer/temp.tsx`](temp.md) - 临时渲染器
- [`renderer/renderer.tsx`](renderer.md) - 渲染器入口组件

## 外部依赖

- `react`: React 运行时
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数

## 典型使用场景

1. **低代码平台**：在低代码平台中使用渲染器
2. **可视化编辑器**：在可视化编辑器中使用渲染器
3. **动态表单**：在动态表单中使用渲染器
4. **页面构建器**：在页面构建器中使用渲染器
5. **组件预览**：在组件预览中使用渲染器
