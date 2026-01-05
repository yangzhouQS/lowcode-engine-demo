# src/index.ts - 模块入口文件

## 文件路径
`packages/types/src/index.ts`

## 文件概述
这是 `@alilc/lowcode-types` 模块的入口文件，负责导出所有类型定义。该文件作为模块的统一导出点，将所有子模块的类型定义集中暴露给外部使用。

## 功能说明

### 主要职责
1. **统一导出**: 集中导出所有子模块的类型定义
2. **模块组织**: 按功能模块组织导出，便于使用者按需导入
3. **向后兼容**: 导出已弃用的类型定义，保持向后兼容性

### 导出模块

#### 1. 数据源类型
```typescript
export * from '@alilc/lowcode-datasource-types';
```
- 导出数据源相关的类型定义
- 包括数据源引擎、数据源配置等类型

#### 2. 编辑器核心类型
```typescript
export * from './editor';
```
- 导出编辑器配置相关类型
- 包括 `EditorConfig`、`PluginConfig`、`I18nConfig` 等

#### 3. 活动类型
```typescript
export * from './activity';
```
- 导出活动（Activity）相关类型
- 包括 `ActivityType` 枚举、`ActivityData` 类型

#### 4. 代码中间表示类型
```typescript
export * from './code-intermediate';
```
- 导出代码中间表示类型
- 包括 `PackageJSON` 接口

#### 5. 代码结果类型
```typescript
export * from './code-result';
```
- 导出代码生成结果类型
- 包括 `ResultDir`、`ResultFile` 接口

#### 6. 资源类型
```typescript
export * from './assets';
```
- 导出资源相关类型
- 包括 `AssetLevel`、`AssetType` 枚举、`AssetItem` 接口

#### 7. 事件类型
```typescript
export * as GlobalEvent from './event';
```
- 导出全局事件类型
- 包括节点事件、属性事件等

#### 8. Shell 类型
```typescript
export * from './shell';
```
- 导出 Shell 相关的所有类型
- 包括 API、Model、Type、Enum 等所有 Shell 类型

#### 9. Shell 模型工厂类型
```typescript
export * from './shell-model-factory';
```
- 导出 Shell 模型工厂相关类型
- 包括模型创建、模型实例化等类型

#### 10. 已弃用类型
```typescript
export * from './deprecated';
```
- 导出已弃用的类型定义
- 用于向后兼容，标记为 TODO 未来版本移除

## 使用示例

### 完整导入
```typescript
// 导入所有类型
import * as LowCodeTypes from '@alilc/lowcode-types';
```

### 按需导入
```typescript
// 导入编辑器配置类型
import { EditorConfig, PluginConfig } from '@alilc/lowcode-types';

// 导入事件类型
import { GlobalEvent } from '@alilc/lowcode-types';

// 导入 Shell API 类型
import { IPublicApiCanvas, IPublicApiCommand } from '@alilc/lowcode-types';

// 导入 Model 类型
import { IPublicModelNode, IPublicModelDocumentModel } from '@alilc/lowcode-types';
```

### 导入特定模块
```typescript
// 只导入编辑器类型
import type { EditorConfig } from '@alilc/lowcode-types';

// 只导入资源类型
import type { AssetLevel, AssetType } from '@alilc/lowcode-types';
```

## 设计特点

### 1. 模块化设计
- 按功能模块组织导出
- 每个子模块独立维护
- 便于按需导入，减少打包体积

### 2. 类型安全
- 完整的 TypeScript 类型定义
- 严格的类型检查
- 提供智能提示和类型推导

### 3. 向后兼容
- 保留已弃用类型
- 平滑版本升级
- 渐进式迁移

### 4. 文档完善
- 清晰的模块划分
- 完整的类型注释
- 便于理解和使用

## 注意事项

1. **导入方式**: 推荐使用按需导入，避免导入整个模块
2. **弃用类型**: `deprecated` 模块中的类型标记为未来版本移除，建议使用新的类型定义
3. **类型命名**: 所有公共类型使用 `IPublic` 前缀，表示公共 API
4. **模块依赖**: 某些类型之间存在依赖关系，导入时需要注意顺序

## 相关文件

- [`editor.ts`](./editor.ts) - 编辑器核心类型
- [`activity.ts`](./activity.ts) - 活动类型
- [`code-intermediate.ts`](./code-intermediate.ts) - 代码中间表示类型
- [`code-result.ts`](./code-result.ts) - 代码结果类型
- [`assets.ts`](./assets.ts) - 资源类型
- [`event/index.ts`](./event/index.ts) - 事件类型
- [`shell/index.ts`](./shell/index.ts) - Shell 类型
- [`shell-model-factory.ts`](./shell-model-factory.ts) - Shell 模型工厂类型
- [`deprecated/index.ts`](./deprecated/index.ts) - 已弃用类型

## 版本历史

- **v1.3.2**: 当前版本，包含所有类型定义
- 未来版本计划移除 `deprecated` 模块
