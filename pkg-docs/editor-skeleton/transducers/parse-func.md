# parse-func 模块文档

## 文件路径

`packages/editor-skeleton/src/transducers/parse-func.ts`

## 功能概述

`parse-func` 是一个配置转换器，用于将组件元数据中的函数字符串转换为实际的函数对象。它支持多种函数字符串格式，包括箭头函数、函数声明等。

## 主要功能

### 1. 函数字符串转换

将字符串形式的函数转换为可执行的函数对象。

### 2. 多种格式支持

支持以下函数字符串格式：
- 箭头函数：`() => {}` 或 `val => {}`
- 函数声明：`setValue() {}`
- 命名函数：`function() {}` 或 `function setValue() {}`

### 3. 递归处理

递归处理对象中的所有属性，包括嵌套对象和数组。

## 函数定义

```typescript
function transformStringToFunction(str: string): Function
```

将函数字符串转换为函数对象。

**参数:**
- `str`: 函数字符串

**返回值:** 转换后的函数对象

**转换逻辑:**
1. 检查字符串是否以函数名开头（如 `setValue(`）
2. 如果是，在前面添加 `function` 关键字
3. 创建一个包装函数，使用 `new Function` 执行原始函数字符串
4. 添加错误处理，捕获执行错误并返回错误消息

```typescript
function transformStringToFunction(str: string) {
  if (typeof str !== 'string') return str;

  let fn;
  if (leadingFnNameRe.test(str) && !leadingFnRe.test(str)) {
    str = `function ${str}`;
  }
  let fnBody = `
    return function() {
      const self = this;
      try {
        return (${str}).apply(self, arguments);
      } catch(e) {
        console.warn('call function which parsed by lowcode failed: ', e);
        return e.message;
      }
    };
  `;
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function(fnBody)();
  } catch (e) {
    logger.error(str);
    logger.error(e.message);
  }
  return fn;
}
```

### `function parseJSFunc(obj: any, enableAllowedKeys = true): void`

递归解析对象中的函数字符串。

**参数:**
- `obj`: 要解析的对象
- `enableAllowedKeys`: 是否只处理允许的键，默认为 `true`

**行为:**
1. 遍历对象的所有键
2. 检查每个值是否为 JSFunction 类型
3. 如果是，调用 `transformStringToFunction` 进行转换
4. 如果是数组，递归处理数组元素
5. 如果是普通对象，递归处理对象属性

```typescript
function parseJSFunc(obj: any, enableAllowedKeys = true) {
  if (!obj) return;
  Object.keys(obj).forEach(key => {
    const item = obj[key];
    if (isJSFunction(item)) {
      obj[key] = transformStringToFunction(item.value);
    } else if (Array.isArray(item)) {
      item.forEach(o => parseJSFunc(o, enableAllowedKeys));
    } else if (isPlainObject(item)) {
      parseJSFunc(item, enableAllowedKeys);
    }
  });
}
```

### `export default function (metadata: IPublicTypeTransformedComponentMetadata): IPublicTypeTransformedComponentMetadata`

默认导出函数，作为配置转换器使用。

**参数:**
- `metadata`: 组件元数据

**返回值:** 处理后的组件元数据

**行为:**
1. 调用 `parseJSFunc` 解析元数据中的所有函数字符串
2. 返回处理后的元数据

## 使用示例

### 作为配置转换器使用

```typescript
import parseJSFunc from '@alilc/lowcode-editor-skeleton/lib/transducers/parse-func';

// 注册转换器
material.registerMetadataTransducer(parseJSFunc, 1, 'parse-func');
```

### 转换示例

```typescript
// 箭头函数
const str1 = '() => { return "hello"; }';
const fn1 = transformStringToFunction(str1);
console.log(fn1()); // "hello"

// 带参数的箭头函数
const str2 = '(val) => { return val * 2; }';
const fn2 = transformStringToFunction(str2);
console.log(fn2(5)); // 10

// 函数声明
const str3 = 'function() { return "world"; }';
const fn3 = transformStringToFunction(str3);
console.log(fn3()); // "world"

// 命名函数
const str4 = 'setValue(val) { return val + 1; }';
const fn4 = transformStringToFunction(str4);
console.log(fn4(5)); // 6
```

### 处理对象中的函数

```typescript
const metadata = {
  props: [
    {
      name: 'onClick',
      type: 'func',
      defaultValue: {
        type: 'JSFunction',
        value: '(event) => { console.log(event); }',
      },
    },
    {
      name: 'onHover',
      type: 'func',
      defaultValue: {
        type: 'JSFunction',
        value: 'function() { console.log("hovered"); }',
      },
    },
  ],
};

parseJSFunc(metadata);

// 现在 metadata.props 中的函数字符串已被转换为实际的函数
console.log(typeof metadata.props[0].defaultValue.value); // "function"
```

### 处理嵌套对象

```typescript
const complexObj = {
  level1: {
    level2: {
      fn1: {
        type: 'JSFunction',
        value: '() => { return "nested"; }',
      },
    },
  },
  arr: [
    {
      fn2: {
        type: 'JSFunction',
        value: '(x) => { return x * x; }',
      },
    },
  ],
};

parseJSFunc(complexObj);

// 所有嵌套的函数字符串都已被转换
console.log(typeof complexObj.level1.level2.fn1.value); // "function"
console.log(typeof complexObj.arr[0].fn2.value); // "function"
```

## 正则表达式

### `leadingFnRe`

匹配以 `function` 开头的字符串。

```typescript
const leadingFnRe = /^function/;
```

### `leadingFnNameRe`

匹配以函数名开头的字符串（如 `setValue(`）。

```typescript
const leadingFnNameRe = /^\w+\s*\(/;
```

## 错误处理

转换过程中的错误会被捕获并记录：

```typescript
try {
  fn = new Function(fnBody)();
} catch (e) {
  logger.error(str);
  logger.error(e.message);
}
```

执行过程中的错误也会被捕获：

```typescript
try {
  return (${str}).apply(self, arguments);
} catch(e) {
  console.warn('call function which parsed by lowcode failed: ', e);
  return e.message;
}
```

## 性能考虑

1. **递归处理**: `parseJSFunc` 会递归处理所有嵌套对象和数组
2. **惰性执行**: 函数字符串只在需要时才转换为函数对象
3. **错误恢复**: 转换失败不会中断整个流程，只会记录错误

## 注意事项

1. **函数作用域**: 转换后的函数使用 `this` 作为上下文
2. **参数传递**: 使用 `arguments` 对象传递所有参数
3. **错误处理**: 执行错误会返回错误消息而不是抛出异常
4. **类型检查**: 只处理 `isJSFunction` 返回 `true` 的值
5. **安全性**: 使用 `new Function` 需要注意安全性问题

## 相关文件

- [`../register-defaults.ts`](../register-defaults.md) - 默认配置注册
- [`parse-props.ts`](./parse-props.md) - 属性解析转换器
- [`addon-combine.ts`](./addon-combine.md) - 插件组合转换器

## 外部依赖

- `@alilc/lowcode-types` - 提供 `IPublicTypeTransformedComponentMetadata` 类型
- `@alilc/lowcode-utils` - 提供 `isPlainObject`、`isJSFunction`、`getLogger` 等工具函数

## 转换器优先级

`parse-func` 转换器的优先级为 `1`，是最早执行的转换器之一。这确保了函数字符串在其他转换器处理之前就被转换为函数对象。

```typescript
material.registerMetadataTransducer(parseJSFunc, 1, 'parse-func');
```

## 典型使用场景

1. **组件元数据处理**: 在组件注册时，将元数据中的函数字符串转换为函数
2. **事件处理器**: 将事件处理器的字符串形式转换为可执行函数
3. **动态函数**: 支持从配置或数据库加载的动态函数
4. **序列化/反序列化**: 支持函数的序列化和反序列化
