# logger.ts API 设计文档

## 文件路径

`packages/utils/src/logger.ts`

## 功能概述

`logger.ts` 提供了一个功能强大的日志记录系统，支持多级别日志、业务名称过滤、彩色输出和灵活的配置。该日志系统专为低代码引擎设计，支持通过 URL 参数动态配置日志级别和业务名称过滤。

## 主要功能

1. **多级别日志**: 支持 debug、log、info、warn、error 五个日志级别
2. **业务名称过滤**: 支持按业务名称过滤日志，便于调试特定模块
3. **彩色输出**: 不同级别和业务名称使用不同颜色，便于在控制台中区分
4. **URL 参数配置**: 支持通过 URL 参数（如 `__logConf__=log:bizName`）动态配置日志
5. **日志级别过滤**: 只输出指定级别及以上的日志
6. **对象格式化**: 自动识别对象类型并使用 `%o` 格式化输出
7. **字符串格式化**: 自动识别字符串类型并使用 `%s` 格式化输出

## 类型定义

```typescript
export type Level = 'debug' | 'log' | 'info' | 'warn' | 'error';

interface Options {
  level: Level;           // 日志级别
  bizName: string;       // 业务名称
}
```

## 类定义

```typescript
class Logger {
  bizName: string;         // 当前业务名称
  targetBizName: string;   // 目标业务名称（用于过滤）
  targetLevel: string;      // 目标日志级别
  
  constructor(options: Options)
  
  debug(...args: any[]): void
  log(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
}
```

## 工厂函数

```typescript
export function getLogger(config: { level: Level; bizName: string }): Logger
```

## 日志级别说明

| 级别 | 值 | 说明 | 输出颜色 | 标记 |
|------|-----|------|----------|------|
| debug | -1 | 调试信息 | #fadb14 | debug |
| log | 0 | 普通日志 | #8c8c8c | log |
| info | 0 | 信息日志 | #52c41a | info |
| warn | 1 | 警告信息 | #fa8c16 | warn |
| error | 2 | 错误信息 | #ff4d4f | error |

**注意**: `log` 和 `info` 级别值相同，但标记不同，便于区分。

## 使用示例

### 基本使用

```typescript
import { getLogger } from '@alilc/lowcode-utils';

// 创建日志实例
const logger = getLogger({
  level: 'debug',      // 设置日志级别为 debug
  bizName: 'MyModule'  // 设置业务名称
});

// 输出不同级别的日志
logger.debug('Debug message:', { data: 'value' });
logger.log('Log message:', 'simple string');
logger.info('Info message:', 123);
logger.warn('Warn message:', { warning: true });
logger.error('Error message:', new Error('Something went wrong'));
```

### 业务名称过滤

```typescript
// 创建不同业务模块的日志实例
const componentLogger = getLogger({ level: 'debug', bizName: 'Component' });
const rendererLogger = getLogger({ level: 'debug', bizName: 'Renderer' });
const editorLogger = getLogger({ level: 'debug', bizName: 'Editor' });

// 只输出 Component 相关的日志
const logger = getLogger({ 
  level: 'debug',
  bizName: 'Component'  // 只显示 Component 的日志
});

componentLogger.debug('This will be shown'); // 显示
rendererLogger.debug('This will be hidden'); // 隐藏
```

### 日志级别过滤

```typescript
// 设置日志级别为 warn，只输出 warn 和 error 级别的日志
const logger = getLogger({ level: 'warn', bizName: 'MyModule' });

logger.debug('Debug message');  // 不输出
logger.log('Log message');     // 不输出
logger.info('Info message');    // 不输出
logger.warn('Warn message');    // 输出
logger.error('Error message');   // 输出
```

### URL 参数配置

```typescript
// 通过 URL 参数配置日志
// 格式: __logConf__=logLevel:bizName

// 示例 1: 设置日志级别为 debug，显示所有业务名称
// URL: http://example.com?__logConf__=debug
const logger = getLogger({ level: 'warn', bizName: 'MyModule' });
// 实际生效的级别: debug

// 示例 2: 设置日志级别为 warn，只显示 Component 业务名称
// URL: http://example.com?__logConf__=warn:Component
const logger = getLogger({ level: 'debug', bizName: 'MyModule' });
// 实际生效的级别: warn，业务名称: Component

// 示例 3: 设置日志级别为 info，显示所有业务名称
// URL: http://example.com?__logConf__=info:*
const logger = getLogger({ level: 'warn', bizName: 'MyModule' });
// 实际生效的级别: info，业务名称: * (所有)
```

### 对象格式化

```typescript
const logger = getLogger({ level: 'debug', bizName: 'Test' });

// 对象会自动使用 %o 格式化
logger.debug('Object data:', { 
  name: 'Alice', 
  age: 25, 
  address: { city: 'Beijing' } 
});

// 输出格式: [Test][debug]: Object data: { name: 'Alice', age: 25, address: { city: 'Beijing' } }
// 对象部分会以不同颜色显示
```

### 多个参数

```typescript
const logger = getLogger({ level: 'debug', bizName: 'Test' });

// 支持多个参数
logger.debug('User:', { name: 'Alice' }, 'Age:', 25);
logger.info('Status:', 'loading', 'Progress:', 50);
logger.error('Error:', new Error('Failed'), 'Code:', 500);
```

## 配置说明

### Options 参数

```typescript
interface Options {
  level: Level;      // 日志级别，默认 'warn'
  bizName: string;    // 业务名称，默认 '*'
}
```

**level**: 
- `'debug'`: 输出所有级别的日志
- `'log'` / `'info'`: 输出 log、info、warn、error 级别的日志
- `'warn'`: 输出 warn、error 级别的日志
- `'error'`: 只输出 error 级别的日志

**bizName**:
- 业务模块名称，用于标识日志来源
- 默认为 `'*'`，表示所有业务名称
- 可以设置为具体的模块名，如 `'Component'`、`'Renderer'`、`'Editor'` 等

## 业务名称颜色

系统为不同的业务名称分配了不同的颜色，共 53 种颜色：

```typescript
const bizNameColors = [
  '#daa569', '#00ffff', '#385e0f', '#7fffd4', '#00c957',
  '#b0e0e6', '#4169e1', '#6a5acd', '#87ceeb', '#ffff00',
  '#e3cf57', '#ff9912', '#eb8e55', '#ffe384', '#40e0d0',
  '#a39480', '#d2691e', '#ff7d40', '#f0e68c', '#bc8f8f',
  '#c76114', '#734a12', '#5e2612', '#0000ff', '#3d59ab',
  '#1e90ff', '#03a89e', '#33a1c9', '#a020f0', '#a066d3',
  '#da70d6', '#dda0dd', '#688e23', '#2e8b57'
];
```

颜色会循环使用，确保不同的业务名称有不同的颜色。

## 实现细节

### 配置解析

```typescript
const parseLogConf = (logConf: string, options: Options): { level: string; bizName: string } => {
  if (!logConf) {
    return {
      level: options.level,
      bizName: options.bizName,
    };
  }
  
  // 支持三种格式
  // 1. logLevel (如 "debug")
  // 2. logLevel:bizName (如 "debug:Component")
  // 3. logLevel:* (如 "debug:*")
  
  if (logConf.indexOf(':') > -1) {
    const pair = logConf.split(':');
    return {
      level: pair[0],
      bizName: pair[1] || '*',
    };
  }
  
  return {
    level: logConf,
    bizName: '*',
  };
};
```

### 输出判断

```typescript
const shouldOutput = (
  logLevel: string,
  targetLevel: string = 'warn',
  bizName: string,
  targetBizName: string,
): boolean => {
  const isLevelFit = (levels as any)[targetLevel] <= (levels as any)[logLevel];
  const isBizNameFit = targetBizName === '*' || bizName.indexOf(targetBizName) > -1;
  return isLevelFit && isBizNameFit;
};
```

**判断逻辑**:
- 日志级别必须满足: `targetLevel <= logLevel`
- 业务名称必须满足: `targetBizName === '*'` 或 `bizName.indexOf(targetBizName) > -1`

### 格式化输出

```typescript
const getLogArgs = (args: any, bizName: string, logLevel: string) => {
  const color = getColor(bizName);
  const bodyColor = bodyColors[logLevel];
  
  const argsArray = args[0];
  let prefix = `%c[${bizName}]%c[${levelMarks[logLevel]}]:`;
  
  // 遍历所有参数，判断类型
  argsArray.forEach((arg: any) => {
    if (isObject(arg)) {
      prefix += '%o';  // 对象
    } else {
      prefix += '%s';  // 字符串或其他
    }
  });
  
  // 添加颜色标记
  let processedArgs = [prefix, `color: ${color}`, `color: ${bodyColor}`];
  processedArgs = processedArgs.concat(argsArray);
  
  return processedArgs;
};
```

## 使用场景

### 开发环境

```typescript
// 开发环境使用 debug 级别
const logger = getLogger({ 
  level: 'debug', 
  bizName: 'Dev' 
});

logger.debug('Development mode enabled');
logger.info('API request:', { url: '/api/data' });
```

### 生产环境

```typescript
// 生产环境使用 warn 级别
const logger = getLogger({ 
  level: 'warn', 
  bizName: 'Prod' 
});

logger.warn('Performance warning:', { metric: 'slow' });
logger.error('API error:', { status: 500 });
```

### 模块化日志

```typescript
// 为不同模块创建独立的日志实例
const loggerConfig = {
  component: getLogger({ level: 'debug', bizName: 'Component' }),
  renderer: getLogger({ level: 'debug', bizName: 'Renderer' }),
  editor: getLogger({ level: 'debug', bizName: 'Editor' }),
  plugin: getLogger({ level: 'debug', bizName: 'Plugin' }),
};

// 使用
loggerConfig.component.debug('Component initialized');
loggerConfig.renderer.info('Rendering page');
loggerConfig.editor.warn('Invalid configuration');
loggerConfig.plugin.error('Plugin failed to load');
```

### 条件日志

```typescript
const logger = getLogger({ level: 'debug', bizName: 'Feature' });

function processFeature(feature: boolean) {
  if (!feature) {
    logger.warn('Feature is disabled, skipping...');
    return;
  }
  
  logger.debug('Processing feature...');
  // 处理逻辑...
  logger.info('Feature processed successfully');
}
```

## 性能考虑

1. **字符串拼接**: 使用模板字符串拼接日志前缀，性能良好
2. **颜色计算**: 业务名称颜色会缓存，避免重复计算
3. **条件判断**: 在输出前先判断是否应该输出，避免不必要的字符串拼接
4. **对象序列化**: 对象会自动格式化，不需要手动 JSON.stringify

## 限制和注意事项

1. **浏览器兼容性**: 
   - 使用 `console.log`、`console.warn`、`console.error` 等标准 API
   - 颜色格式化（`%c`）在现代浏览器中支持良好
   - 旧版 IE 可能不支持彩色输出

2. **URL 参数优先级**: 
   - URL 参数配置的优先级高于构造函数参数
   - 如果 URL 中没有配置，使用构造函数的参数

3. **业务名称匹配**: 
   - 使用 `indexOf` 进行字符串包含匹配
   - 如果业务名称是 `'Component'`，则 `'ComponentManager'` 也会匹配
   - 建议使用更具体的业务名称

4. **日志丢失**: 
   - 如果页面在日志输出前崩溃，可能导致日志丢失
   - 建议在关键操作后立即输出日志

5. **性能影响**: 
   - 在高频调用场景中，日志可能影响性能
   - 生产环境建议使用 `warn` 或 `error` 级别

## 最佳实践

1. **日志级别选择**:
   ```typescript
   // 开发环境
   const devLogger = getLogger({ level: 'debug', bizName: 'Dev' });
   
   // 测试环境
   const testLogger = getLogger({ level: 'info', bizName: 'Test' });
   
   // 生产环境
   const prodLogger = getLogger({ level: 'warn', bizName: 'Prod' });
   ```

2. **业务名称规范**:
   ```typescript
   // 使用模块名作为业务名称
   const componentLogger = getLogger({ level: 'debug', bizName: 'Component' });
   const rendererLogger = getLogger({ level: 'debug', bizName: 'Renderer' });
   const editorLogger = getLogger({ level: 'debug', bizName: 'Editor' });
   
   // 使用功能名作为业务名称
   const dragLogger = getLogger({ level: 'debug', bizName: 'Drag' });
   const dropLogger = getLogger({ level: 'debug', bizName: 'Drop' });
   ```

3. **错误日志**:
   ```typescript
   const logger = getLogger({ level: 'debug', bizName: 'API' });
   
   try {
     // API 调用
     const result = await fetch('/api/data');
     logger.info('API success:', result);
   } catch (error) {
     // 记录完整的错误对象
     logger.error('API failed:', error);
     // 记录错误上下文
     logger.error('Error context:', { url: '/api/data', method: 'GET' });
   }
   ```

4. **性能日志**:
   ```typescript
   const logger = getLogger({ level: 'debug', bizName: 'Performance' });
   
   const startTime = Date.now();
   // 执行操作...
   const duration = Date.now() - startTime;
   
   if (duration > 1000) {
     logger.warn('Slow operation:', { operation: 'render', duration: `${duration}ms` });
   } else {
     logger.debug('Operation completed:', { operation: 'render', duration: `${duration}ms` });
   }
   ```

5. **调试技巧**:
   ```typescript
   // 使用 URL 参数临时开启 debug 日志
   // URL: http://localhost:3000?__logConf__=debug:Renderer
   const logger = getLogger({ level: 'warn', bizName: 'Renderer' });
   // 实际会输出 Renderer 模块的 debug 日志
   
   // 使用通配符查看多个模块的日志
   // URL: http://localhost:3000?__logConf__=debug:*
   const logger = getLogger({ level: 'warn', bizName: 'MyModule' });
   // 实际会输出所有模块的 debug 日志
   ```

## 相关函数

- [`isObject`](./is-object.ts) - 判断是否为对象类型
- [`shallowEqual`](./shallow-equal.ts) - 浅比较函数

## 使用建议

1. **环境区分**: 根据环境设置不同的日志级别
2. **模块隔离**: 为不同的模块创建独立的日志实例
3. **错误处理**: 使用 error 级别记录所有异常和错误
4. **性能监控**: 使用 warn 级别记录性能问题
5. **调试友好**: 在开发环境使用 debug 级别，便于问题排查
6. **生产安全**: 在生产环境限制日志输出，避免敏感信息泄露

## 示例：完整的日志系统

```typescript
import { getLogger } from '@alilc/lowcode-utils';

// 日志配置
const LOG_CONFIG = {
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  bizName: 'MyApp',
};

// 创建日志实例
const logger = getLogger(LOG_CONFIG);

// 应用日志
class App {
  init() {
    logger.info('Application initializing...');
    logger.debug('Config:', LOG_CONFIG);
  }
  
  loadComponent() {
    logger.debug('Loading component...');
    try {
      // 加载逻辑...
      logger.info('Component loaded successfully');
    } catch (error) {
      logger.error('Failed to load component:', error);
      throw error;
    }
  }
  
  render() {
    const startTime = Date.now();
    // 渲染逻辑...
    const duration = Date.now() - startTime;
    
    if (duration > 100) {
      logger.warn('Slow render detected:', { duration: `${duration}ms` });
    } else {
      logger.debug('Render completed:', { duration: `${duration}ms` });
    }
  }
}
```
