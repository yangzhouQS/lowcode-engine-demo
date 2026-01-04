# Index 模块文档

## 文件路径

`packages/engine/src/index.ts`

## 功能概述

`index.ts` 是引擎模块的入口文件，负责导出所有公共 API 并在控制台打印版本信息。

## 主要功能

### 1. API 导出

- 导出所有公共 API
- 导出类型定义

### 2. 版本信息

- 在控制台打印版本信息
- 使用彩色样式显示

## 代码实现

```typescript
import { version } from './engine-core';

export * from './engine-core';
console.log(
  `%c AliLowCodeEngine %c v${version} `,
  'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
  'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
);
```

## 导出的内容

导出 `engine-core.ts` 中的所有内容，包括：
- 核心实例（skeleton, plugins, project 等）
- 初始化和销毁函数
- 类型定义
- 内部符号

## 使用示例

### 导入引擎

```typescript
import { init, destroy, skeleton, plugins } from '@alilc/lowcode-engine';

// 初始化引擎
await init();

// 使用导出的 API
skeleton.add({...});
plugins.register(MyPlugin, {});

// 销毁引擎
await destroy();
```

## 注意事项

1. **版本信息**: 模块加载时会自动打印版本信息
2. **API 导出**: 所有公共 API 都通过此文件导出
3. **彩色输出**: 版本信息使用彩色样式，便于识别

## 相关文件

- [`engine-core.md`](./engine-core.md) - 引擎核心实现

## 外部依赖

- 无外部依赖（仅依赖内部模块）

## 典型使用场景

1. **引擎初始化**: 导入并初始化引擎
2. **API 使用**: 导入并使用引擎 API
3. **版本检查**: 通过控制台输出查看引擎版本
