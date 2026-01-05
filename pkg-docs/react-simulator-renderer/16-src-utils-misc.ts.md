# src/utils/misc.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/utils/misc.ts`

## 功能概述

该文件提供了杂项工具函数，包括获取项目工具函数和检查渲染器是否分离。

## 主要功能

1. **获取项目工具**: 获取项目级别的工具函数
2. **检查渲染器分离**: 检查渲染器 iframe 是否已分离

## 代码分析

### 完整代码

```typescript
export function getProjectUtils() {
  return (window as any).LCSimulatorHost?.designer?.editor?.get('project')?.utils;
}

export function isRendererDetached() {
  const iframe = (window as any).document?.querySelector('iframe');
  if (!iframe) {
    return true;
  }
  return !document.body.contains(iframe);
}
```

### 逐行解释

**getProjectUtils 函数（第 1-3 行）**:

```typescript
export function getProjectUtils() {
  return (window as any).LCSimulatorHost?.designer?.editor?.get('project')?.utils;
}
```
- 导出 `getProjectUtils` 函数
- 从全局 `window` 对象获取 `LCSimulatorHost`
- 使用可选链（`?.`）安全访问嵌套属性
- 获取路径：`LCSimulatorHost.designer.editor.get('project').utils`
- 返回项目工具函数对象

**isRendererDetached 函数（第 5-12 行）**:

```typescript
export function isRendererDetached() {
  const iframe = (window as any).document?.querySelector('iframe');
  if (!iframe) {
    return true;
  }
  return !document.body.contains(iframe);
}
```
- 导出 `isRendererDetached` 函数
- 从 `window.document` 查询 iframe 元素
- 如果 iframe 不存在，返回 true（表示已分离）
- 使用 `document.body.contains(iframe)` 检查 iframe 是否还在 DOM 中
- 返回布尔值，true 表示已分离，false 表示未分离

## 使用示例

### 获取项目工具

```typescript
import { getProjectUtils } from './utils/misc';

const utils = getProjectUtils();
console.log(utils);
// 输出: { i18n: {...}, request: {...}, ... }
```

### 使用项目工具

```typescript
import { getProjectUtils } from './utils/misc';

const utils = getProjectUtils();
if (utils?.i18n) {
  const message = utils.i18n.getMessage('hello');
}
```

### 检查渲染器分离

```typescript
import { isRendererDetached } from './utils/misc';

if (isRendererDetached()) {
  console.log('Renderer is detached');
  // 停止渲染或其他操作
}
```

### 在渲染器中使用

```typescript
import { isRendererDetached } from './utils/misc';

class Renderer extends Component {
  render() {
    if (isRendererDetached()) {
      return null;
    }
    // 正常渲染
  }
}
```

## 注意事项

1. **可选链**: 使用可选链（`?.`）安全访问嵌套属性
2. **全局对象**: 依赖全局 `window` 对象
3. **iframe 查询**: 查询 iframe 元素，可能不准确
4. **DOM 检查**: 使用 `contains` 方法检查元素是否在 DOM 中

## 相关文件

- **[`host.ts`](07-src-host.ts.md)**: 模拟器宿主
- **[`renderer-view.tsx`](08-src-renderer-view.tsx.md)**: React 视图组件

## 设计模式

### 空对象模式

使用可选链避免空值错误：

```typescript
(window as any).LCSimulatorHost?.designer?.editor?.get('project')?.utils
```

### 检查模式

检查渲染器是否分离：

```typescript
return !document.body.contains(iframe);
```

## 最佳实践

1. **可选链**: 使用可选链安全访问嵌套属性
2. **错误处理**: 检查对象是否存在，避免错误
3. **文档说明**: 为工具函数添加文档说明
4. **类型安全**: 使用 TypeScript 类型定义

## 总结

`misc.ts` 提供了杂项工具函数，包括获取项目工具函数和检查渲染器是否分离。这些工具函数使用可选链和 DOM 检查，确保代码的健壮性。

主要特点：
- **安全性**: 使用可选链避免空值错误
- **实用性**: 提供实用的工具函数
- **简洁性**: 函数实现简洁
- **类型安全**: 使用 TypeScript 类型定义
