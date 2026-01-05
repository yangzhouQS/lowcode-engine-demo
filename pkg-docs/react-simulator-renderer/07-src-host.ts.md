# src/host.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/host.ts`

## 功能概述

该文件仅用于类型标注，导出模拟器宿主（Simulator Host）的引用。它从全局 window 对象中获取 `LCSimulatorHost` 实例，为模块提供类型安全的宿主访问。

## 主要功能

1. **类型标注**: 为模拟器宿主提供 TypeScript 类型定义
2. **全局引用**: 从 window 对象获取宿主实例
3. **类型安全**: 确保宿主操作符合 `BuiltinSimulatorHost` 接口

## 代码分析

### 完整代码

```typescript
// NOTE: 仅做类型标注，切勿做其它用途
import { BuiltinSimulatorHost } from '@alilc/lowcode-designer';

export const host: BuiltinSimulatorHost = (window as any).LCSimulatorHost;
```

### 逐行解释

**第 1 行**:
```typescript
// NOTE: 仅做类型标注，切勿做其它用途
```
- 注释说明该文件的用途
- 强调仅用于类型标注，不应进行其他操作
- 提醒开发者不要在此文件中添加业务逻辑

**第 2 行**:
```typescript
import { BuiltinSimulatorHost } from '@alilc/lowcode-designer';
```
- 从 `@alilc/lowcode-designer` 包导入 `BuiltinSimulatorHost` 类型
- `BuiltinSimulatorHost` 是模拟器宿主的接口定义
- 该接口定义了模拟器宿主的所有方法和属性

**第 4 行**:
```typescript
export const host: BuiltinSimulatorHost = (window as any).LCSimulatorHost;
```
- 导出 `host` 常量
- 类型标注为 `BuiltinSimulatorHost`，确保类型安全
- 从全局 `window` 对象的 `LCSimulatorHost` 属性获取宿主实例
- 使用 `as any` 类型断言，因为 `window` 对象上可能没有 `LCSimulatorHost` 的类型定义
- `LCSimulatorHost` 是在运行时由设计器模块注入的全局对象

## 类型定义

### BuiltinSimulatorHost

`BuiltinSimulatorHost` 是模拟器宿主的接口，包含以下主要功能：

- **设计器访问**: 提供对设计器实例的访问
- **文档管理**: 管理文档实例和文档状态
- **组件注册**: 管理组件库和组件映射
- **路由管理**: 管理路由状态和导航
- **事件系统**: 提供事件发布订阅机制
- **设备模拟**: 支持不同设备的模拟
- **国际化**: 提供多语言支持
- **配置管理**: 管理模拟器配置

## 使用示例

### 基本使用

```typescript
import { host } from './host';

// 访问设计器
const designer = host.designer;

// 访问当前文档
const document = designer.currentDocument;

// 访问组件
const component = host.getComponent('MyComponent');
```

### 在渲染器中使用

```typescript
import { host } from './host';

class Renderer extends Component {
  render() {
    // 使用宿主提供的配置
    const { designMode, device } = host;

    return (
      <div>
        {/* 渲染内容 */}
      </div>
    );
  }
}
```

## 注意事项

1. **仅用于类型标注**: 该文件仅提供类型标注，不应添加任何业务逻辑
2. **全局依赖**: 依赖 `window.LCSimulatorHost`，必须在设计器环境中使用
3. **类型安全**: 使用 TypeScript 类型标注，确保宿主操作符合接口定义
4. **运行时注入**: `LCSimulatorHost` 是在运行时由设计器模块注入的
5. **不可修改**: 不应修改 `host` 对象的属性或方法

## 相关文件

- **[`renderer.ts`](06-src-renderer.ts.md)**: 核心渲染器实现，使用 `host` 访问设计器功能
- **[`renderer-view.tsx`](08-src-renderer-view.tsx.md)**: React 视图组件，使用 `host` 访问设计器配置
- **[`index.ts`](05-src-index.ts.md)**: 模块入口文件

## 设计模式

### 全局访问模式

该文件使用全局访问模式，通过 `window` 对象提供对宿主的访问：

```typescript
// 全局对象
window.LCSimulatorHost = hostInstance;

// 类型安全的访问
export const host: BuiltinSimulatorHost = window.LCSimulatorHost;
```

### 依赖注入模式

宿主实例通过依赖注入的方式提供，而不是直接导入：

```typescript
// 宿主在运行时注入
window.LCSimulatorHost = new BuiltinSimulatorHost(...);

// 模块通过全局对象访问
export const host = window.LCSimulatorHost;
```

## 最佳实践

1. **类型安全**: 始终使用 TypeScript 类型标注，确保类型安全
2. **不修改宿主**: 不要修改 `host` 对象的属性或方法
3. **错误处理**: 在使用宿主功能时，应该进行错误处理
4. **文档注释**: 为使用宿主的代码添加清晰的注释
5. **测试隔离**: 在测试环境中，应该模拟 `host` 对象

## 错误处理

```typescript
import { host } from './host';

// 检查宿主是否存在
if (!host) {
  console.error('Simulator host not found');
  return;
}

// 检查设计器是否存在
if (!host.designer) {
  console.error('Designer not found in host');
  return;
}
```

## 测试建议

在测试环境中，应该模拟 `host` 对象：

```typescript
// 模拟宿主对象
const mockHost = {
  designer: {
    currentDocument: mockDocument,
    // ... 其他属性和方法
  },
  // ... 其他属性和方法
};

// 设置全局对象
(window as any).LCSimulatorHost = mockHost;
```

## 总结

`host.ts` 是一个简单的类型标注文件，它从全局 `window` 对象中获取模拟器宿主实例，并提供类型安全的访问。该文件遵循"仅做类型标注"的原则，不包含任何业务逻辑。通过使用 TypeScript 类型标注，确保了宿主操作的类型安全性。

该文件的设计体现了以下优点：
- **简洁性**: 仅包含必要的类型标注代码
- **类型安全**: 使用 TypeScript 确保类型安全
- **全局访问**: 通过全局对象提供对宿主的访问
- **依赖注入**: 宿主实例通过依赖注入的方式提供
- **易于测试**: 可以在测试环境中模拟宿主对象
