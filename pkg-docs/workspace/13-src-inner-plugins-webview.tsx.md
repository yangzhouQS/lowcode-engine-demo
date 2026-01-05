# src/inner-plugins/webview.tsx 文档

## 文件路径

`packages/workspace/src/inner-plugins/webview.tsx`

## 功能概述

Webview 插件，为 webview 类型的视图提供 iframe 渲染支持，允许在编辑器中嵌入外部页面。

## 主要功能

1. **iframe 渲染**: 使用 iframe 渲染外部页面
2. **插件注册**: 提供插件注册函数
3. **骨架集成**: 与骨架系统集成，在主区域显示 webview

## 代码分析

### 导入

```typescript
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
```

### 组件定义

#### DesignerView

```typescript
export function DesignerView(props: {
  url: string;
  viewName?: string;
})
```

**功能**: Webview 视图组件

**参数**:
- `url: string` - 要加载的 URL
- `viewName?: string` - 视图名称（可选）

**返回值**: JSX.Element

**说明**:
- 渲染一个包含 iframe 的 div 容器
- iframe 使用 `webview-view-${viewName}` 作为 name 属性
- iframe 宽高都是 100%
- iframe src 属性为传入的 url

**使用示例**:
```typescript
<DesignerView
  url="https://example.com"
  viewName="my-webview"
/>
```

### 函数定义

#### getWebviewPlugin

```typescript
export function getWebviewPlugin(url: string, viewName: string)
```

**功能**: 获取 webview 插件

**参数**:
- `url: string` - 要加载的 URL
- `viewName: string` - 视图名称

**返回值**: 插件函数

**说明**:
- 返回一个插件函数
- 插件函数接收插件上下文作为参数
- 在 init 方法中，将 DesignerView 添加到骨架的主区域
- 插件名称为 '___webview_plugin___'

**使用示例**:
```typescript
const plugin = getWebviewPlugin('https://example.com', 'my-webview');
await plugins.register(plugin);
```

### 插件结构

```typescript
function webviewPlugin(ctx: IPublicModelPluginContext) {
  const { skeleton } = ctx;
  return {
    init() {
      skeleton.add({
        area: 'mainArea',
        name: 'designer',
        type: 'Widget',
        content: DesignerView,
        contentProps: {
          ctx,
          url,
          viewName,
        },
      });
    },
  };
}

webviewPlugin.pluginName = '___webview_plugin___';
```

**说明**:
- `skeleton.add`: 将 DesignerView 添加到骨架
- `area: 'mainArea'`: 添加到主区域
- `name: 'designer'`: 组件名称
- `type: 'Widget'`: 组件类型为 Widget
- `content: DesignerView`: 组件内容
- `contentProps`: 组件属性，包括上下文、URL 和视图名称
- `pluginName`: 插件名称为 '___webview_plugin___'

## 使用示例

### 创建 webview 插件

```typescript
import { getWebviewPlugin } from '@alilc/lowcode-workspace';

const plugin = getWebviewPlugin('https://example.com', 'my-webview');
```

### 注册 webview 插件

```typescript
await plugins.register(plugin);
```

### 在视图中使用

```typescript
import { Context } from '@alilc/lowcode-workspace';

const context = new Context(
  workspace,
  editorWindow,
  {
    viewName: 'my-webview',
    viewType: 'webview',
    url: () => 'https://example.com',
  },
  options
);

await context.init();
```

## 注意事项

1. **URL 安全**: 确保 URL 是可信的，避免 XSS 攻击
2. **跨域限制**: iframe 可能受到跨域限制
3. **性能影响**: iframe 可能会影响页面性能
4. **插件名称**: 插件名称为 '___webview_plugin___'，避免与其他插件冲突
5. **视图名称**: 视图名称用于生成 iframe 的 name 属性，确保唯一性

## 最佳实践

1. **URL 验证**: 在使用前验证 URL 的安全性
2. **错误处理**: 添加 iframe 加载错误处理
3. **性能优化**: 使用懒加载或按需加载
4. **样式隔离**: 确保 iframe 内容不会影响主页面样式
5. **通信机制**: 如果需要与 iframe 通信，使用 postMessage API

## 相关文件

- [`context/view-context.ts`](./12-src-context-view-context.ts.md) - 视图上下文类，使用 webview 插件
- [`view/window-view.tsx`](./18-src-view-window-view.tsx.md) - 窗口视图组件

## 总结

`src/inner-plugins/webview.tsx` 是 webview 插件，为 webview 类型的视图提供 iframe 渲染支持。它提供了 DesignerView 组件和 getWebviewPlugin 函数，允许在编辑器中嵌入外部页面。
