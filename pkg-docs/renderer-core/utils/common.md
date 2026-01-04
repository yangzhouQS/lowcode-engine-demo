# Common - 通用工具函数

## 功能概述

[`utils/common.ts`](../../packages/renderer-core/src/utils/common.ts) 是通用工具函数模块，提供了各种通用工具函数，包括 Schema 验证、表达式解析、国际化处理、类型判断等。

## 主要功能

1. **Schema 验证**：验证 Schema 格式
2. **表达式解析**：解析 JS 表达式
3. **国际化处理**：处理国际化字符串
4. **类型判断**：判断各种类型
5. **数据转换**：转换数据格式
6. **工具函数**：提供各种工具函数

## 核心函数

### isSchema

验证 Schema 是否有效。

```typescript
export function isSchema(schema: any): schema is IPublicTypeNodeSchema
```

**参数：**
- `schema: any` - 要验证的 Schema

**返回值：** `schema is IPublicTypeNodeSchema` - 是否为有效的 Schema

**说明：**
- 验证 Schema 格式是否正确
- 检查 componentName 和 props 是否存在
- 支持 Leaf 和 Slot 组件

**使用示例：**

```typescript
import { isSchema } from '@alilc/lowcode-renderer-core';

const schema = {
  componentName: 'Button',
  props: {
    text: 'Click me',
  },
};

if (isSchema(schema)) {
  console.log('Valid schema');
}
```

### isFileSchema

验证 Schema 是否为容器类型。

```typescript
export function isFileSchema(schema: IPublicTypeNodeSchema): schema is IPublicTypeRootSchema
```

**参数：**
- `schema: IPublicTypeNodeSchema` - 要验证的 Schema

**返回值：** `schema is IPublicTypeRootSchema` - 是否为容器类型的 Schema

**说明：**
- 验证 Schema 是否为 Page、Block、Component 等容器类型

**使用示例：**

```typescript
import { isFileSchema } from '@alilc/lowcode-renderer-core';

const schema = {
  componentName: 'Page',
  props: {},
};

if (isFileSchema(schema)) {
  console.log('File schema');
}
```

### getFileCssName

从 Schema 的 fileName 获取 CSS 样式名。

```typescript
export function getFileCssName(fileName: string)
```

**参数：**
- `fileName: string` - 文件名

**返回值：** `string` - CSS 样式名

**说明：**
- 将文件名转换为 CSS 样式名
- FileName -> lce-file-name

**使用示例：**

```typescript
import { getFileCssName } from '@alilc/lowcode-renderer-core';

const cssName = getFileCssName('FileName');
console.log(cssName); // 'lce-file-name'
```

### isJSSlot

判断对象是否为 JSSlot 类型。

```typescript
export function isJSSlot(obj: any): obj is IPublicTypeJSSlot
```

**参数：**
- `obj: any` - 要判断的对象

**返回值：** `obj is IPublicTypeJSSlot` - 是否为 JSSlot 类型

**说明：**
- 判断对象是否为 JSSlot 类型
- 兼容旧协议的 JSBlock

**使用示例：**

```typescript
import { isJSSlot } from '@alilc/lowcode-renderer-core';

const obj = {
  type: 'JSSlot',
  value: () => {},
};

if (isJSSlot(obj)) {
  console.log('JSSlot');
}
```

### getValue

从对象中获取值。

```typescript
export function getValue(obj: any, path: string, defaultValue = {})
```

**参数：**
- `obj: any` - 对象
- `path: string` - 路径
- `defaultValue` - 默认值

**返回值：** `any` - 获取的值

**说明：**
- 从对象中获取指定路径的值
- 支持点号分隔的路径

**使用示例：**

```typescript
import { getValue } from '@alilc/lowcode-renderer-core';

const obj = {
  user: {
    name: 'John',
  },
};

const name = getValue(obj, 'user.name', 'Unknown');
console.log(name); // 'John'
```

### getI18n

处理国际化字符串。

```typescript
export function getI18n(key: string, values = {}, locale = 'zh-CN', messages: Record<string, any> = {})
```

**参数：**
- `key: string` - 语料标识
- `values` - 字符串模版变量
- `locale` - 国际化标识，例如 zh-CN、en-US
- `messages: Record<string, any>` - 国际化语言包

**返回值：** `string` - 国际化字符串

**说明：**
- 处理国际化字符串
- 支持字符串模版变量

**使用示例：**

```typescript
import { getI18n } from '@alilc/lowcode-renderer-core';

const messages = {
  'zh-CN': {
    hello: '你好，{name}！',
  },
  'en-US': {
    hello: 'Hello, {name}!',
  },
};

const text = getI18n('hello', { name: 'John' }, 'en-US', messages);
console.log(text); // 'Hello, John!'
```

### canAcceptsRef

判断当前组件是否能够设置 ref。

```typescript
export function canAcceptsRef(Comp: any)
```

**参数：**
- `Comp: any` - 需要判断的组件

**返回值：** `boolean` - 是否能够设置 ref

**说明：**
- 判断组件是否能够设置 ref
- 检查组件是否为 React 组件

**使用示例：**

```typescript
import { canAcceptsRef } from '@alilc/lowcode-renderer-core';

const Component = () => <div>Hello</div>;

if (canAcceptsRef(Component)) {
  console.log('Can accept ref');
}
```

### transformArrayToMap

将数组转换为对象。

```typescript
export function transformArrayToMap(arr: any[], key: string, overwrite = true)
```

**参数：**
- `arr: any[]` - 要转换的数组
- `key: string` - 数组项的键
- `overwrite` - 是否覆盖已存在的项

**返回值：** `object` - 转换后的对象

**说明：**
- 将数组转换为对象
- 使用数组项的指定键作为对象的键

**使用示例：**

```typescript
import { transformArrayToMap } from '@alilc/lowcode-renderer-core';

const arr = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

const map = transformArrayToMap(arr, 'id');
console.log(map); // { 1: { id: 1, name: 'John' }, 2: { id: 2, name: 'Jane' } }
```

### transformStringToFunction

将字符串转换为函数。

```typescript
export function transformStringToFunction(str: string)
```

**参数：**
- `str: string` - 函数字符串

**返回值：** `function` - 转换后的函数

**说明：**
- 将字符串转换为函数
- 使用 new Function 创建函数

**使用示例：**

```typescript
import { transformStringToFunction } from '@alilc/lowcode-renderer-core';

const fn = transformStringToFunction('return a + b');
console.log(fn(1, 2)); // 3
```

### parseExpression

解析 JS 表达式。

```typescript
function parseExpression(options: { str: any; self: any; thisRequired?: boolean; logScope?: string }): any;
function parseExpression(str: any, self: any, thisRequired?: boolean): any;
```

**参数：**
- `str: any` - 表达式字符串
- `self: any` - 作用域对象
- `thisRequired?: boolean` - 是否需要 this
- `logScope?: string` - 日志作用域

**返回值：** `any` - 解析后的值

**说明：**
- 解析 JS 表达式
- 支持省略 this

**使用示例：**

```typescript
import { parseExpression } from '@alilc/lowcode-renderer-core';

const self = {
  state: {
    count: 0,
  },
};

const result = parseExpression({
  str: { type: 'JSExpression', value: 'this.state.count' },
  self,
  thisRequired: true,
});
console.log(result); // 0
```

### parseThisRequiredExpression

解析需要 this 的 JS 表达式。

```typescript
export function parseThisRequiredExpression(str: any, self: any)
```

**参数：**
- `str: any` - 表达式字符串
- `self: any` - 作用域对象

**返回值：** `any` - 解析后的值

**说明：**
- 解析需要 this 的 JS 表达式

**使用示例：**

```typescript
import { parseThisRequiredExpression } from '@alilc/lowcode-renderer-core';

const self = {
  state: {
    count: 0,
  },
};

const result = parseThisRequiredExpression({ type: 'JSExpression', value: 'this.state.count' }, self);
console.log(result); // 0
```

### capitalizeFirstLetter

将首字母大写。

```typescript
export function capitalizeFirstLetter(word: string)
```

**参数：**
- `word: string` - 要处理的字符串

**返回值：** `string` - 首字母大写的字符串

**说明：**
- 将字符串的首字母大写

**使用示例：**

```typescript
import { capitalizeFirstLetter } from '@alilc/lowcode-renderer-core';

const result = capitalizeFirstLetter('hello');
console.log(result); // 'Hello'
```

### isString

判断是否为字符串类型。

```typescript
export function isString(str: any): boolean
```

**参数：**
- `str: any` - 要判断的对象

**返回值：** `boolean` - 是否为字符串类型

**说明：**
- 判断对象是否为字符串类型

**使用示例：**

```typescript
import { isString } from '@alilc/lowcode-renderer-core';

console.log(isString('hello')); // true
console.log(isString(123)); // false
```

### isVariable

判断是否为变量结构。

```typescript
export function isVariable(obj: any)
```

**参数：**
- `obj: any` - 要判断的对象

**返回值：** `boolean` - 是否为变量结构

**说明：**
- 判断对象是否为变量结构

**使用示例：**

```typescript
import { isVariable } from '@alilc/lowcode-renderer-core';

const obj = {
  type: 'variable',
  value: 'count',
};

console.log(isVariable(obj)); // true
```

### parseI18n

解析 i18n 结构。

```typescript
export function parseI18n(i18nInfo: any, self: any)
```

**参数：**
- `i18nInfo: any` - i18n 信息
- `self: any` - 上下文

**返回值：** `any` - 解析后的值

**说明：**
- 将 i18n 结构降级解释为对 i18n 接口的调用

**使用示例：**

```typescript
import { parseI18n } from '@alilc/lowcode-renderer-core';

const i18nInfo = {
  type: 'i18n',
  key: 'hello',
};

const result = parseI18n(i18nInfo, self);
console.log(result);
```

### forEach

遍历对象。

```typescript
export function forEach(targetObj: any, fn: any, context?: any)
```

**参数：**
- `targetObj: any` - 要遍历的对象
- `fn: any` - 处理每个项的函数
- `context` - 上下文

**返回值：** `void`

**说明：**
- 遍历对象的每个键值对
- 调用处理函数处理每个项

**使用示例：**

```typescript
import { forEach } from '@alilc/lowcode-renderer-core';

const obj = {
  name: 'John',
  age: 30,
};

forEach(obj, (value, key) => {
  console.log(key, value);
});
```

### parseData

解析数据。

```typescript
export function parseData(schema: unknown, self: any, options: IParseOptions = {}): any
```

**参数：**
- `schema: unknown` - Schema
- `self: any` - 上下文
- `options: IParseOptions` - 解析选项

**返回值：** `any` - 解析后的数据

**说明：**
- 解析 Schema 数据
- 支持表达式、i18n、函数等

**使用示例：**

```typescript
import { parseData } from '@alilc/lowcode-renderer-core';

const schema = {
  title: {
    type: 'JSExpression',
    value: 'this.state.title',
  },
};

const result = parseData(schema, self);
console.log(result);
```

### serializeParams

处理 URL 查询参数。

```typescript
export function serializeParams(obj: any)
```

**参数：**
- `obj: any` - 要处理的参数

**返回值：** `string` - 序列化后的参数字符串

**说明：**
- 将对象序列化为 URL 查询参数字符串

**使用示例：**

```typescript
import { serializeParams } from '@alilc/lowcode-renderer-core';

const params = {
  name: 'John',
  age: 30,
};

const result = serializeParams(params);
console.log(result); // 'name=John&age=30'
```

## 注意事项

1. **表达式解析**：表达式解析需要注意安全性
2. **类型判断**：类型判断需要考虑边界情况
3. **国际化**：国际化需要提供完整的语言包
4. **性能优化**：工具函数需要考虑性能优化
5. **错误处理**：提供友好的错误信息

## 相关文件

- [`../renderer/base.tsx`](../renderer/base.md) - 基础渲染器
- [`../hoc/leaf.tsx`](../hoc/leaf.md) - Leaf HOC
- [`./data-helper.ts`](data-helper.md) - 数据源管理

## 外部依赖

- `@alilc/lowcode-utils`: 工具函数
- `@alilc/lowcode-types`: 类型定义
- `lodash`: 工具函数库
- `intl-messageformat`: 国际化消息格式化

## 典型使用场景

1. **Schema 验证**：验证 Schema 格式
2. **表达式解析**：解析 JS 表达式
3. **国际化处理**：处理国际化字符串
4. **类型判断**：判断各种类型
5. **数据转换**：转换数据格式
