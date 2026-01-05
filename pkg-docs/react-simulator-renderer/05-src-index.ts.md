# src/index.ts 文档

## 文件信息

- **文件路径**: [`packages/react-simulator-renderer/src/index.ts`](packages/react-simulator-renderer/src/index.ts)
- **文件类型**: TypeScript 模块入口文件
- **代码行数**: 17 行

## 功能概述

`src/index.ts` 是 React Simulator Renderer 模块的入口文件，负责导出渲染器实例并初始化全局对象。它是模块的对外接口，所有外部访问都通过这个文件进行。

## 逐行代码分析

### 第 1 行：导入 MobX

```typescript
import { runInAction } from 'mobx';
```

**说明**:
- 从 `mobx` 导入 `runInAction` 函数
- `runInAction` 用于在 MobX action 中执行代码，确保状态更新的原子性

**设计考虑**:
- MobX 的 action 可以批量处理状态更新，提高性能
- 使用 `runInAction` 确保清理操作在 action 中执行

### 第 2 行：导入渲染器

```typescript
import renderer from './renderer';
```

**说明**:
- 导入默认导出的渲染器实例
- `renderer` 是 `SimulatorRendererContainer` 的单例

**设计考虑**:
- 使用单例模式确保全局只有一个渲染器实例
- 简化模块间的引用关系

### 第 3-6 行：挂载到全局对象

```typescript
if (typeof window !== 'undefined') {
  (window as any).SimulatorRenderer = renderer;
}
```

**说明**:
- 检查是否在浏览器环境（`window` 存在）
- 将渲染器实例挂载到 `window.SimulatorRenderer`
- 使用类型断言 `(window as any)` 避免 TypeScript 类型错误

**设计考虑**:
- 只在浏览器环境挂载，避免 Node.js 环境出错
- 提供全局访问点，方便调试和外部调用
- 使用 `any` 类型绕过 TypeScript 的严格类型检查

**使用场景**:
- 浏览器控制台调试：`window.SimulatorRenderer.rerender()`
- 外部脚本访问渲染器实例
- 测试环境中的模拟器访问

### 第 8-15 行：页面卸载监听

```typescript
window.addEventListener('beforeunload', () => {
  runInAction(() => {
    (window as any).LCSimulatorHost = null;
    renderer.dispose?.();
    (window as any).SimulatorRenderer = null;
    (window as any).ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  });
});
```

**说明**:
- 监听 `beforeunload` 事件，在页面即将卸载时执行清理
- 使用 `runInAction` 确保所有状态更新在 MobX action 中执行
- 清理步骤：
  1. 清空主机引用：`LCSimulatorHost = null`
  2. 销毁渲染器：`renderer.dispose?.()`
  3. 清空渲染器引用：`SimulatorRenderer = null`
  4. 卸载 React 组件：`ReactDOM.unmountComponentAtNode(document.getElementById('app'))`

**设计考虑**:
- 使用可选链操作符 `?.()` 确保 `dispose` 方法存在才调用
- 清空所有全局引用，避免内存泄漏
- 卸载 React 组件，清理 DOM 节点
- 使用 `runInAction` 批量处理状态更新

**清理顺序**:
1. 先清空主机引用，断开与设计器的连接
2. 销毁渲染器，清理内部状态和资源
3. 清空渲染器引用，移除全局访问点
4. 卸载 React 组件，清理 DOM

### 第 17 行：默认导出

```typescript
export default renderer;
```

**说明**:
- 默认导出渲染器实例
- 外部模块可以通过 `import renderer from '@alilc/lowcode-react-simulator-renderer'` 使用

**设计考虑**:
- 默认导出简化导入语法
- 导出单例实例，确保全局唯一

## 主要功能

### 1. 全局对象挂载

将渲染器实例挂载到 `window.SimulatorRenderer`，提供全局访问点。

**优点**:
- 方便浏览器控制台调试
- 支持外部脚本访问
- 便于测试和开发

**示例**:
```javascript
// 浏览器控制台
window.SimulatorRenderer.rerender();
window.SimulatorRenderer.autoRender = false;
```

### 2. 资源清理

监听页面卸载事件，执行完整的资源清理。

**清理内容**:
- 主机引用
- 渲染器实例
- React 组件
- DOM 节点

**优点**:
- 避免内存泄漏
- 确保资源正确释放
- 提高应用稳定性

### 3. 模块导出

默认导出渲染器实例，提供标准的模块导入方式。

**优点**:
- 符合 ES Module 规范
- 支持 TypeScript 类型推断
- 便于模块化开发

**示例**:
```typescript
import renderer from '@alilc/lowcode-react-simulator-renderer';

renderer.run();
renderer.rerender();
```

## 设计模式

### 1. 单例模式 (Singleton Pattern)

```typescript
import renderer from './renderer';
export default renderer;
```

**说明**:
- `renderer` 是 `SimulatorRendererContainer` 的单例
- 整个应用只有一个渲染器实例

**优点**:
- 全局唯一，避免重复创建
- 统一管理状态
- 简化模块间通信

### 2. 全局访问模式 (Global Access Pattern)

```typescript
(window as any).SimulatorRenderer = renderer;
```

**说明**:
- 将渲染器挂载到全局对象
- 提供全局访问点

**优点**:
- 方便调试
- 支持外部访问
- 便于测试

### 3. 清理模式 (Cleanup Pattern)

```typescript
window.addEventListener('beforeunload', () => {
  runInAction(() => {
    // 清理代码
  });
});
```

**说明**:
- 监听页面卸载事件
- 执行完整的资源清理

**优点**:
- 避免内存泄漏
- 确保资源正确释放
- 提高应用稳定性

## 使用场景

### 1. 正常使用

```typescript
import renderer from '@alilc/lowcode-react-simulator-renderer';

// 启动渲染器
renderer.run();

// 刷新渲染器
renderer.rerender();

// 销毁渲染器
renderer.dispose();
```

### 2. 浏览器控制台调试

```javascript
// 查看渲染器状态
console.log(window.SimulatorRenderer);

// 刷新渲染器
window.SimulatorRenderer.rerender();

// 查看组件
console.log(window.SimulatorRenderer.components);
```

### 3. 外部脚本访问

```javascript
// 在其他脚本中访问渲染器
const renderer = window.SimulatorRenderer;

if (renderer) {
  renderer.autoRender = false;
  // 执行其他操作
}
```

## 注意事项

### 1. 环境检查

```typescript
if (typeof window !== 'undefined') {
  // 只在浏览器环境执行
}
```

**说明**:
- 避免在 Node.js 环境出错
- 确保代码只在浏览器环境执行

### 2. 类型断言

```typescript
(window as any).SimulatorRenderer = renderer;
```

**说明**:
- 使用 `any` 类型绕过 TypeScript 的严格类型检查
- 需要谨慎使用，避免类型错误

### 3. 可选链操作

```typescript
renderer.dispose?.();
```

**说明**:
- 使用可选链操作符确保方法存在才调用
- 避免 `dispose` 方法不存在时抛出错误

### 4. MobX Action

```typescript
runInAction(() => {
  // 状态更新代码
});
```

**说明**:
- 在 MobX action 中执行状态更新
- 确保状态更新的原子性和性能优化

## 常见问题

### 1. 为什么需要挂载到全局对象？

**答**: 提供全局访问点，方便调试和外部访问。特别是在浏览器控制台中，可以直接访问和操作渲染器。

### 2. 为什么使用 `runInAction`？

**答**: 确保状态更新在 MobX action 中执行，这样可以批量处理状态更新，提高性能，并避免不必要的渲染。

### 3. 清理顺序为什么很重要？

**答**: 正确的清理顺序可以避免依赖问题。先清空主机引用，断开与设计器的连接；再销毁渲染器，清理内部状态；最后卸载 React 组件，清理 DOM。

### 4. 为什么使用可选链操作符？

**答**: 防止 `dispose` 方法不存在时抛出错误。虽然 `dispose` 方法应该总是存在，但使用可选链操作符可以提高代码的健壮性。

## 最佳实践

### 1. 调试技巧

```javascript
// 浏览器控制台
// 查看渲染器状态
console.log(window.SimulatorRenderer);

// 查看文档实例
console.log(window.SimulatorRenderer.documentInstances);

// 查看组件
console.log(window.SimulatorRenderer.components);

// 强制刷新
window.SimulatorRenderer.rerender();
```

### 2. 错误处理

```typescript
try {
  const renderer = window.SimulatorRenderer;
  if (renderer) {
    renderer.rerender();
  }
} catch (error) {
  console.error('Failed to rerender:', error);
}
```

### 3. 资源清理

```typescript
// 手动清理（不依赖 beforeunload）
const cleanup = () => {
  runInAction(() => {
    (window as any).LCSimulatorHost = null;
    renderer.dispose?.();
    (window as any).SimulatorRenderer = null;
    if (typeof ReactDOM !== 'undefined') {
      ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    }
  });
};

// 在需要时调用
cleanup();
```

## 相关文件

- [`src/renderer.ts`](packages/react-simulator-renderer/src/renderer.ts) - 渲染器实现
- [`src/host.ts`](packages/react-simulator-renderer/src/host.ts) - 主机引用

## 总结

`src/index.ts` 是模块的入口文件，虽然代码简单，但承担着重要的职责：

**核心功能**:
1. 导出渲染器实例
2. 挂载全局对象
3. 资源清理

**设计优势**:
- 简洁的接口
- 完善的清理机制
- 方便的调试支持

**关键点**:
- 使用单例模式确保全局唯一
- 提供全局访问点方便调试
- 完善的资源清理避免内存泄漏

这个文件虽然只有 17 行代码，但体现了良好的工程实践，包括环境检查、类型安全、资源清理等。
