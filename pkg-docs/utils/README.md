# Utils 模块文档

## 概述

`@alilc/lowcode-utils` 是低代码引擎的工具函数库，提供了丰富的工具函数、类型检查、React 组件等功能，为整个低代码引擎提供基础支持。

## 文档列表

### 核心文档

- [架构设计文档](./01-架构设计.md) - 模块架构设计、核心组件、数据流、技术实现
- [文件功能说明](./02-文件功能说明.md) - 所有文件的功能说明、依赖关系、代码统计

### API 文档

#### 工具函数

- [clone-deep.ts](./03-clone-deep.ts.md) - 深拷贝函数 API 文档
- [unique-id.ts](./04-unique-id.ts.md) - 唯一 ID 生成函数 API 文档
- [shallow-equal.ts](./06-shallow-equal.ts.md) - 浅比较函数 API 文档
- [transaction-manager.ts](./07-transaction-manager.ts.md) - 事务管理器 API 文档
- [misc.ts](./08-misc.ts.md) - 杂项工具函数 API 文档（13个函数）

#### 类型检查函数

- [类型检查函数](./10-类型检查函数.md) - 基础类型检查函数 API 文档（6个函数）
- [React 相关函数](./11-React相关函数.md) - React 相关函数 API 文档（11个函数）

#### Schema 类型检查函数

- [Schema 类型检查函数](./12-Schema类型检查函数.md) - Schema 类型检查函数 API 文档（27个函数）

#### React 组件

- [create-icon.tsx](./09-create-icon.tsx.md) - 图标创建函数 API 文档

#### 日志工具

- [logger.ts](./05-logger.ts.md) - 日志工具 API 文档

## 快速开始

### 安装

```bash
npm install @alilc/lowcode-utils
```

### 基本使用

```typescript
// 工具函数
import { cloneDeep, uniqueId, shallowEqual } from '@alilc/lowcode-utils';

// 类型检查
import { isObject, isFunction, isReact } from '@alilc/lowcode-utils';

// React 组件
import { createIcon, ContextMenu } from '@alilc/lowcode-utils';

// CSS 辅助
import { css } from '@alilc/lowcode-utils';

// 日志
import { logger } from '@alilc/lowcode-utils';

// 事务管理
import { transactionManager } from '@alilc/lowcode-utils';
```

## 核心功能

### 1. 工具函数

```typescript
// 深拷贝
const cloned = cloneDeep({ a: 1, b: { c: 2 } });

// 唯一 ID
const id1 = uniqueId('prefix'); // 'prefix_1'
const id2 = uniqueId('prefix'); // 'prefix_2'

// 浅比较
const isEqual = shallowEqual({ a: 1 }, { a: 1 }); // true

// 获取原型
const proto = getPrototypeOf({});

// 设置原型
setPrototypeOf({}, Object.prototype);

// 检查自有属性
hasOwnProperty({}, 'key'); // true
```

### 2. 类型检查

```typescript
// 对象检查
isObject({}); // true
isObject(null); // false

// 函数检查
isFunction(() => {}); // true

// React 元素检查
isReact(<div />); // true

// DOM 元素检查
isElement(document.createElement('div')); // true

// CSS URL 检查
isCssUrl('https://example.com/style.css'); // true

// ES 模块检查
isEsModule({ __esModule: true }); // true

// 表单事件检查
isFormEvent({ type: 'submit' }); // true

// 纯对象检查
isPlainObject({}); // true
isPlainObject([1, 2, 3]); // false

// 摇树优化检查
isShaken({}); // false
```

### 3. Schema 类型检查

```typescript
import {
  isNodeSchema,
  isComponentSchema,
  isProjectSchema,
  isJSExpression,
  isJSSlot,
  isI18nData,
  isJSBlock,
  isDynamicSetter,
  isSetterConfig,
  isSettingField,
  isTitleConfig,
  isBasicPropType,
  isRequiredPropType,
  isCustomView,
  isActionContentObject,
  isDragNodeObject,
  isDragNodeDataObject,
  isDragAnyObject,
  isLocationData,
  isLocationChildrenDetail,
  isDomText,
  isLowcodeComponentType,
  isProcodeComponentType,
  isLowcodeProjectSchema,
} from '@alilc/lowcode-utils';

// 使用示例
if (isNodeSchema(schema)) {
  // 处理节点 Schema
}

if (isJSExpression(value)) {
  // 处理 JS 表达式
}

if (isJSSlot(value)) {
  // 处理 JS 插槽
}
```

### 4. React 组件

```typescript
// 创建图标
const icon = createIcon({
  icon: 'plus',
  size: 16,
  onClick: () => console.log('clicked'),
});

// 上下文菜单
const menu = (
  <ContextMenu
    items={[
      { key: 'copy', label: '复制' },
      { key: 'paste', label: '粘贴' },
    ]}
    onSelect={(key) => console.log(key)}
  />
);

// SVG 图标
<svg-icon type="plus" size={16} />
```

### 5. CSS 辅助

```typescript
import { css } from '@alilc/lowcode-utils';

const style = css`
  .container {
    width: 100%;
    height: 100%;
  }
`;
```

### 6. 日志工具

```typescript
import { logger } from '@alilc/lowcode-utils';

const log = logger('my-module');

log.log('This is a log message');
log.warn('This is a warning message');
log.error('This is an error message');
```

### 7. 事务管理

```typescript
import { transactionManager } from '@alilc/lowcode-utils';

// 添加事务
transactionManager.add(() => {
  // 执行操作
});

// 执行所有事务
transactionManager.execute();
```

### 8. 属性类型检查

```typescript
import { checkPropTypes } from '@alilc/lowcode-utils';

const propTypes = {
  title: 'string',
  content: 'object',
};

const errors = checkPropTypes(props, propTypes);
if (errors) {
  console.error(errors);
}
```

### 9. 构建组件

```typescript
import { buildComponents, getSubComponent } from '@alilc/lowcode-utils';

// 构建组件
const components = buildComponents(schema);

// 获取子组件
const subComponent = getSubComponent(schema, 'SubComponent');
```

### 10. 其他工具

```typescript
// 资源处理
import { asset } from '@alilc/lowcode-utils';

// 创建内容
import { createContent } from '@alilc/lowcode-utils';

// 创建延迟函数
import { createDefer } from '@alilc/lowcode-utils';

// 应用辅助
import { appHelper } from '@alilc/lowcode-utils';

// 节点辅助
import { nodeHelper } from '@alilc/lowcode-utils';

// Schema 工具
import { schema } from '@alilc/lowcode-utils';

// 脚本工具
import { script } from '@alilc/lowcode-utils';

// 光标工具
import { cursor } from '@alilc/lowcode-utils';

// 原生选择
import { nativeSelection } from '@alilc/lowcode-utils';

// 环境变量
import { env } from '@alilc/lowcode-utils';

// 杂项工具
import { misc } from '@alilc/lowcode-utils';
```

## 架构特点

### 1. 函数式编程

- 无状态
- 可预测
- 易于测试
- 易于组合

### 2. 类型安全

- TypeScript 类型守卫
- 编译时检查
- 运行时验证

### 3. 性能优化

- 惰性求值
- 记忆化
- 早期返回

### 4. 可扩展性

- 函数组合
- 插件化
- 配置化

### 5. 安全性

- 类型安全
- 参数验证
- 错误处理

## 技术栈

- **TypeScript**: 类型系统
- **React**: UI 框架
- **SCSS**: 样式预处理器
- **Jest**: 测试框架

## 模块统计

### 文件分类统计

| 分类 | 文件数 | 说明 |
|------|--------|------|
| 工具函数 | 11 | 核心工具函数 |
| 类型检查 | 24 | Schema 和数据类型检查 |
| React 组件 | 5 | React 组件和样式 |
| 构建辅助 | 10 | 构建和辅助工具 |
| 配置文件 | 5 | 构建和测试配置 |
| 入口文件 | 1 | 模块入口 |

### 代码统计

- **总文件数**: 50 个源文件
- **总代码行数**: 约 3000+ 行
- **TypeScript 文件**: 40 个
- **TypeScript/React 文件**: 4 个
- **SCSS 文件**: 1 个
- **CSS 文件**: 1 个

### 测试统计

- **测试文件数**: 25 个测试文件
- **测试代码行数**: 约 1500+ 行
- **快照文件数**: 2 个

## 相关模块

- [@alilc/lowcode-types](../react-renderer/README.md) - 类型定义模块
- [@alilc/lowcode-designer](../react-renderer/README.md) - 设计器模块
- [@alilc/lowcode-editor-core](../react-renderer/README.md) - 编辑器核心模块

## 贡献指南

欢迎贡献代码和文档！请参考项目的 [CONTRIBUTING.md](../../CONTRIBUTOR.md)。

## 许可证

[MIT](../../LICENSE)
