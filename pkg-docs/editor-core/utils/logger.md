# Logger 模块文档

## 文件路径

`packages/editor-core/src/utils/logger.ts`

## 功能概述

`logger` 是编辑器的日志记录器，基于 `@alilc/lowcode-utils` 的 `logger` 工具，提供了统一的日志记录接口。

## 主要功能

### 1. 日志记录

- 记录不同级别的日志
- 支持日志级别过滤

## 函数定义

```typescript
export const logger = createLogger('editor-core');
```

## 使用说明

### 日志级别

logger 支持以下日志级别：

- `log`: 普通日志
- `info`: 信息日志
- `warn`: 警告日志
- `error`: 错误日志
- `debug`: 调试日志

## 使用示例

### 基本使用

```typescript
import { logger } from '@alilc/lowcode-editor-core';

// 记录普通日志
logger.log('This is a log message');

// 记录信息日志
logger.info('This is an info message');

// 记录警告日志
logger.warn('This is a warning message');

// 记录错误日志
logger.error('This is an error message');

// 记录调试日志
logger.debug('This is a debug message');
```

### 带参数的日志

```typescript
// 带参数的日志
logger.info('User {name} logged in', { name: 'John' });
logger.error('Failed to load file: {filename}', { filename: 'config.json' });
```

### 条件日志

```typescript
// 条件日志
if (someCondition) {
  logger.warn('Condition is true, this might be a problem');
}
```

## 注意事项

1. **日志级别**: 建议根据日志的重要程度选择合适的日志级别
2. **性能**: 频繁记录日志可能影响性能，建议在生产环境关闭 debug 日志
3. **调试**: 在开发环境可以开启 debug 日志，方便调试
4. **模块名称**: logger 的模块名称是 `'editor-core'`，用于区分不同模块的日志

## 相关文件

- [`../editor.ts`](../editor.md) - Editor 核心类，使用 logger
- [`../event-bus.ts`](../event-bus.md) - 事件总线，使用 logger
- [`../hotkey.ts`](../hotkey.md) - 快捷键系统，使用 logger

## 外部依赖

- `@alilc/lowcode-utils` - 提供 `createLogger` 工具函数

## 典型使用场景

1. **调试**: 记录调试信息，方便排查问题
2. **错误处理**: 记录错误信息，方便定位问题
3. **警告提示**: 记录警告信息，提醒用户注意
4. **信息记录**: 记录重要信息，方便追踪
5. **性能监控**: 记录性能数据，优化性能
