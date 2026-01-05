# src/utils/url.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/utils/url.ts`

## 功能概述

该文件提供了 URL 查询字符串的解析和序列化工具函数。

## 主要功能

1. **解析查询字符串**: 将查询字符串解析为对象
2. **序列化对象**: 将对象序列化为查询字符串
3. **添加查询参数**: 向 URL 添加查询参数

## 代码分析

### 完整代码

```typescript
export function parseQuery(search: string) {
  const params: Record<string, string> = {};
  const pairs = search.slice(1).split('&');
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  });
  return params;
}

export function stringifyQuery(params: Record<string, any>) {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export function withQueryParams(url: string, params: Record<string, any>) {
  const [base, search] = url.split('?');
  const existingParams = search ? parseQuery(search) : {};
  const mergedParams = { ...existingParams, ...params };
  const queryString = stringifyQuery(mergedParams);
  return queryString ? `${base}?${queryString}` : base;
}
```

### 逐行解释

**parseQuery 函数（第 1-9 行）**:

```typescript
export function parseQuery(search: string) {
  const params: Record<string, string> = {};
  const pairs = search.slice(1).split('&');
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  });
  return params;
}
```
- 导出 `parseQuery` 函数
- 参数 `search`: 查询字符串（如 `?a=1&b=2`）
- 创建空对象存储参数
- 使用 `slice(1)` 移除 `?` 字符
- 使用 `split('&')` 分割键值对
- 遍历每个键值对：
  - 使用 `split('=')` 分割键和值
  - 使用 `decodeURIComponent` 解码值
  - 存储到对象中
- 返回参数对象

**stringifyQuery 函数（第 11-16 行）**:

```typescript
export function stringifyQuery(params: Record<string, any>) {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
}
```
- 导出 `stringifyQuery` 函数
- 参数 `params`: 参数对象
- 获取对象的所有键
- 使用 `map` 将每个键值对转换为字符串
- 使用 `encodeURIComponent` 编码值
- 使用 `join('&')` 连接所有键值对
- 返回查询字符串

**withQueryParams 函数（第 18-25 行）**:

```typescript
export function withQueryParams(url: string, params: Record<string, any>) {
  const [base, search] = url.split('?');
  const existingParams = search ? parseQuery(search) : {};
  const mergedParams = { ...existingParams, ...params };
  const queryString = stringifyQuery(mergedParams);
  return queryString ? `${base}?${queryString}` : base;
}
```
- 导出 `withQueryParams` 函数
- 参数 `url`: URL 字符串
- 参数 `params`: 要添加的参数对象
- 使用 `split('?')` 分割基础 URL 和查询字符串
- 解析现有的查询参数
- 合并现有参数和新参数
- 序列化合并后的参数
- 如果有查询字符串，返回带查询参数的 URL，否则返回基础 URL

## 使用示例

### 解析查询字符串

```typescript
import { parseQuery } from './utils/url';

const params = parseQuery('?a=1&b=2&c=hello%20world');
console.log(params);
// 输出: { a: '1', b: '2', c: 'hello world' }
```

### 序列化对象

```typescript
import { stringifyQuery } from './utils/url';

const queryString = stringifyQuery({ a: 1, b: 2, c: 'hello world' });
console.log(queryString);
// 输出: 'a=1&b=2&c=hello%20world'
```

### 添加查询参数

```typescript
import { withQueryParams } from './utils/url';

const url = withQueryParams('https://example.com/path?a=1', { b: 2, c: 'hello' });
console.log(url);
// 输出: 'https://example.com/path?a=1&b=2&c=hello'
```

### 在路由中使用

```typescript
import { withQueryParams } from './utils/url';

function navigateToPage(page: string, params: Record<string, any>) {
  const url = withQueryParams(`/pages/${page}`, params);
  history.push(url);
}
```

## 注意事项

1. **编码解码**: 使用 `encodeURIComponent` 和 `decodeURIComponent` 处理特殊字符
2. **参数合并**: 新参数会覆盖现有参数
3. **空值处理**: 如果参数为空，不添加查询字符串

## 相关文件

- **[`renderer-view.tsx`](08-src-renderer-view.tsx.md)**: React 视图组件，可能使用 URL 工具

## 设计模式

### 解析模式

解析查询字符串为对象：

```typescript
const pairs = search.slice(1).split('&');
pairs.forEach(pair => {
  const [key, value] = pair.split('=');
  params[key] = decodeURIComponent(value);
});
```

### 序列化模式

序列化对象为查询字符串：

```typescript
Object.keys(params)
  .map(key => `${key}=${encodeURIComponent(params[key])}`)
  .join('&');
```

### 合并模式

合并现有参数和新参数：

```typescript
const mergedParams = { ...existingParams, ...params };
```

## 最佳实践

1. **编码解码**: 始终使用 `encodeURIComponent` 和 `decodeURIComponent`
2. **参数合并**: 使用对象展开运算符合并参数
3. **错误处理**: 处理可能的错误情况
4. **文档说明**: 为工具函数添加文档说明

## 总结

`url.ts` 提供了 URL 查询字符串的解析和序列化工具函数。这些函数使用标准的 URL 编码和解码方法，确保正确处理特殊字符。

主要特点：
- **编码解码**: 使用标准的编码解码方法
- **参数合并**: 支持合并现有参数和新参数
- **简洁性**: 函数实现简洁
- **类型安全**: 使用 TypeScript 类型定义
