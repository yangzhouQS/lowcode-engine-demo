# misc.ts API 设计文档

## 文件路径

`packages/utils/src/misc.ts`

## 功能概述

`misc.ts` 提供了一系列杂项工具函数，包括变量判断、国际化支持、异步等待、数组比较、兼容性处理、类型守卫等功能。这些函数主要用于低代码引擎的各种场景。

## 主要功能

1. **变量判断**: 判断对象是否为变量类型
2. **国际化支持**: 判断和转换国际化对象
3. **异步等待**: 等待对象属性存在
4. **数组比较**: 数组浅比较
5. **兼容性处理**: 兼容旧版本的枚举值
6. **类型守卫**: 多个类型判断函数
7. **工具函数**: 执行延迟函数、不变性检查、废弃警告等

## 函数列表

### 1. isVariable

判断对象是否为变量类型。

```typescript
export function isVariable(obj: any): obj is Variable
```

**参数**:
- `obj`: 要判断的对象

**返回值**: 如果是变量类型返回 `true`，否则返回 `false`

**类型定义**:
```typescript
interface Variable {
  type: 'variable';
  variable: string;
  value: any;
}
```

**使用示例**:
```typescript
import { isVariable } from '@alilc/lowcode-utils';

const obj1 = { type: 'variable', variable: 'myVar', value: 123 };
console.log(isVariable(obj1)); // true

const obj2 = { type: 'string', value: 'hello' };
console.log(isVariable(obj2)); // false
```

### 2. isUseI18NSetter

判断属性是否使用了 I18nSetter。

```typescript
export function isUseI18NSetter(prototype: any, propName: string): boolean
```

**参数**:
- `prototype`: 原型对象
- `propName`: 属性名称

**返回值**: 如果使用了 I18nSetter 返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isUseI18NSetter } from '@alilc/lowcode-utils';

class MyComponent {
  static options = {
    configure: [
      { name: 'title', setter: { type: { displayName: 'I18nSetter' } } },
      { name: 'content', setter: { type: { displayName: 'StringSetter' } } }
    ]
  };
}

console.log(isUseI18NSetter(MyComponent, 'title')); // true
console.log(isUseI18NSetter(MyComponent, 'content')); // false
```

### 3. convertToI18NObject

将字符串转换为国际化对象。

```typescript
export function convertToI18NObject(v: string | any, locale: string = 'zh-CN'): any
```

**参数**:
- `v`: 要转换的值
- `locale`: 语言环境，默认为 `'zh-CN'`

**返回值**: 国际化对象或原值

**使用示例**:
```typescript
import { convertToI18NObject } from '@alilc/lowcode-utils';

// 转换字符串
const i18n1 = convertToI18NObject('Hello', 'zh-CN');
console.log(i18n1); // { type: 'i18n', use: 'zh-CN', 'zh-CN': 'Hello' }

// 转换为英文
const i18n2 = convertToI18NObject('Hello', 'en-US');
console.log(i18n2); // { type: 'i18n', use: 'en-US', 'en-US': 'Hello' }

// 已经是国际化对象，直接返回
const i18n3 = { type: 'i18n', use: 'zh-CN', 'zh-CN': 'Hello' };
console.log(convertToI18NObject(i18n3)); // { type: 'i18n', use: 'zh-CN', 'zh-CN': 'Hello' }
```

### 4. isString

判断值是否为字符串类型。

```typescript
export function isString(v: any): v is string
```

**参数**:
- `v`: 要判断的值

**返回值**: 如果是字符串返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isString } from '@alilc/lowcode-utils';

console.log(isString('hello')); // true
console.log(isString(123)); // false
console.log(isString(null)); // false
```

### 5. waitForThing

等待对象的指定路径属性存在。

```typescript
export function waitForThing(obj: any, path: string): Promise<any>
```

**参数**:
- `obj`: 目标对象
- `path`: 属性路径（使用 lodash 的路径语法）

**返回值**: Promise，解析为属性的值

**使用示例**:
```typescript
import { waitForThing } from '@alilc/lowcode-utils';

const obj = { user: null };

// 异步设置属性
setTimeout(() => {
  obj.user = { name: 'Alice' };
}, 1000);

// 等待属性存在
waitForThing(obj, 'user.name').then(name => {
  console.log(name); // 'Alice'
});
```

### 6. arrShallowEquals

数组浅比较。

```typescript
export function arrShallowEquals(arr1: any[], arr2: any[]): boolean
```

**参数**:
- `arr1`: 第一个数组
- `arr2`: 第二个数组

**返回值**: 如果数组相等返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { arrShallowEquals } from '@alilc/lowcode-utils';

console.log(arrShallowEquals([1, 2, 3], [1, 2, 3])); // true
console.log(arrShallowEquals([1, 2, 3], [3, 2, 1])); // true（顺序不重要）
console.log(arrShallowEquals([1, 2], [1, 2, 3])); // false
console.log(arrShallowEquals([1, 2], 'not an array')); // false
```

### 7. isFromVC

判断元数据是否从 VC prototype 转换而来。

```typescript
export function isFromVC(meta: IPublicModelComponentMeta): boolean
```

**参数**:
- `meta`: 组件元数据

**返回值**: 如果是从 VC 转换而来返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isFromVC } from '@alilc/lowcode-utils';

const meta1 = {
  getMetadata: () => ({
    configure: {
      advanced: true
    }
  })
};

console.log(isFromVC(meta1)); // true

const meta2 = {
  getMetadata: () => ({
    configure: {}
  })
};

console.log(isFromVC(meta2)); // false
```

### 8. executePendingFn

延迟执行函数。

```typescript
export function executePendingFn(fn: () => void, timeout: number = 2000): NodeJS.Timeout
```

**参数**:
- `fn`: 要执行的函数
- `timeout`: 延迟时间（毫秒），默认为 2000

**返回值**: 定时器 ID

**使用示例**:
```typescript
import { executePendingFn } from '@alilc/lowcode-utils';

// 2秒后执行
const timerId = executePendingFn(() => {
  console.log('Executed after 2 seconds');
});

// 1秒后执行
const timerId2 = executePendingFn(() => {
  console.log('Executed after 1 second');
}, 1000);
```

### 9. compatStage

兼容旧版本的枚举值。

```typescript
export function compatStage(stage: IPublicEnumTransformStage | number): IPublicEnumTransformStage
```

**参数**:
- `stage`: 转换阶段（字符串或数字）

**返回值**: 标准的枚举值

**使用示例**:
```typescript
import { compatStage } from '@alilc/lowcode-utils';
import { IPublicEnumTransformStage } from '@alilc/lowcode-types';

// 使用字符串（推荐）
console.log(compatStage(IPublicEnumTransformStage.Render)); // 'render'

// 使用数字（已废弃）
console.log(compatStage(1)); // 'render'，但会输出警告
```

**警告**: 数字版本的使用方式已过时，将在下一版本移除。

### 10. invariant

不变性检查，如果检查失败则抛出错误。

```typescript
export function invariant(check: any, message: string, thing?: any): void
```

**参数**:
- `check`: 检查条件
- `message`: 错误消息
- `thing`: 相关对象（可选）

**返回值**: 无

**使用示例**:
```typescript
import { invariant } from '@alilc/lowcode-utils';

// 检查通过
invariant(true, 'This should not fail');

// 检查失败，抛出错误
invariant(false, 'This will fail'); // Error: Invariant failed: This will fail

// 带上下文
invariant(user !== null, 'User must exist', 'getUser');
// Error: Invariant failed: User must exist in 'getUser'
```

### 11. deprecate

废弃警告。

```typescript
export function deprecate(fail: any, message: string, alterative?: string): void
```

**参数**:
- `fail`: 是否触发警告
- `message**: 警告消息
- `alterative**: 替代方案（可选）

**返回值**: 无

**使用示例**:
```typescript
import { deprecate } from '@alilc/lowcode-utils';

// 触发警告
deprecate(true, 'This method is deprecated', 'useNewMethod');
// 输出: Deprecation: This method is deprecated, use useNewMethod instead.

// 不触发警告
deprecate(false, 'This method is deprecated');
```

### 12. isRegExp

判断对象是否为正则表达式。

```typescript
export function isRegExp(obj: any): obj is RegExp
```

**参数**:
- `obj`: 要判断的对象

**返回值**: 如果是正则表达式返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isRegExp } from '@alilc/lowcode-utils';

console.log(isRegExp(/abc/)); // true
console.log(isRegExp(new RegExp('abc'))); // true
console.log(isRegExp({ test: () => {}, exec: () => {}, compile: () => {} })); // true
console.log(isRegExp('not a regex')); // false
```

### 13. shouldUseVariableSetter

判断是否应该使用变量 Setter。

```typescript
export function shouldUseVariableSetter(
  propSupportVariable: boolean | undefined,
  globalSupportVariable: boolean,
): boolean
```

**参数**:
- `propSupportVariable`: 属性级别的支持变量标志
- `globalSupportVariable`: 全局级别的支持变量标志

**返回值**: 如果应该使用变量 Setter 返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { shouldUseVariableSetter } from '@alilc/lowcode-utils';

// 属性明确支持
console.log(shouldUseVariableSetter(true, false)); // true

// 属性明确不支持
console.log(shouldUseVariableSetter(false, true)); // false

// 属性未指定，使用全局设置
console.log(shouldUseVariableSetter(undefined, true)); // true
console.log(shouldUseVariableSetter(undefined, false)); // false
```

**优先级**: 属性级别的 `supportVariable` 优先于全局的 `supportVariable`。

## 实现细节

### waitForThing 实现

```typescript
function _innerWaitForThing(obj: any, path: string): Promise<any> {
  const timeGap = 200;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const thing = get(obj, path);
      if (thing) {
        return resolve(thing);
      }
      reject();
    }, timeGap);
  }).catch(() => {
    return _innerWaitForThing(obj, path);
  });
}

export function waitForThing(obj: any, path: string): Promise<any> {
  const thing = get(obj, path);
  if (thing) {
    return Promise.resolve(thing);
  }
  return _innerWaitForThing(obj, path);
}
```

**算法**:
1. 首先检查属性是否已存在，如果存在则立即返回
2. 如果不存在，每 200ms 检查一次
3. 使用递归实现轮询，直到属性存在

### compatStage 实现

```typescript
const stageList = [
  'render',
  'serilize',
  'save',
  'clone',
  'init',
  'upgrade',
];

export function compatStage(stage: IPublicEnumTransformStage | number): IPublicEnumTransformStage {
  if (typeof stage === 'number') {
    console.warn('stage 直接指定为数字的使用方式已经过时，将在下一版本移除，请直接使用 IPublicEnumTransformStage.Render|Serilize|Save|Clone|Init|Upgrade');
    return stageList[stage - 1] as IPublicEnumTransformStage;
  }
  return stage as IPublicEnumTransformStage;
}
```

**映射关系**:
- 1 → 'render'
- 2 → 'serilize'
- 3 → 'save'
- 4 → 'clone'
- 5 → 'init'
- 6 → 'upgrade'

## 使用场景

### 1. 变量处理

```typescript
import { isVariable } from '@alilc/lowcode-utils';

function processValue(value: any) {
  if (isVariable(value)) {
    // 处理变量
    return resolveVariable(value.variable);
  }
  // 处理普通值
  return value;
}
```

### 2. 国际化

```typescript
import { convertToI18NObject, isUseI18NSetter } from '@alilc/lowcode-utils';

class MyComponent {
  static options = {
    configure: [
      { name: 'title', setter: { type: { displayName: 'I18nSetter' } } }
    ]
  };
}

// 转换为国际化
const title = convertToI18NObject('Hello', 'en-US');

// 检查是否使用国际化
if (isUseI18NSetter(MyComponent, 'title')) {
  // 使用国际化逻辑
}
```

### 3. 异步等待

```typescript
import { waitForThing } from '@alilc/lowcode-utils';

// 等待组件挂载
waitForThing(this, 'component').then(component => {
  component.render();
});
```

### 4. 数组比较

```typescript
import { arrShallowEquals } from '@alilc/lowcode-utils';

// 比较选中的组件
if (!arrShallowEquals(prevSelected, currentSelected)) {
  // 更新选中状态
}
```

### 5. 不变性检查

```typescript
import { invariant } from '@alilc/lowcode-utils';

function deleteNode(node: Node) {
  invariant(node !== null, 'Node must exist', 'deleteNode');
  invariant(!node.isLocked, 'Node is locked', 'deleteNode');
  // 删除节点
}
```

### 6. 废弃警告

```typescript
import { deprecate } from '@alilc/lowcode-utils';

function oldMethod() {
  deprecate(true, 'oldMethod is deprecated', 'newMethod');
  // 旧逻辑
}

function newMethod() {
  // 新逻辑
}
```

## 最佳实践

1. **使用类型守卫**: 使用类型守卫函数（如 `isVariable`、`isString`）进行类型检查
2. **国际化支持**: 使用 `convertToI18NObject` 和 `isUseI18NSetter` 处理国际化
3. **错误处理**: 使用 `invariant` 进行前置条件检查
4. **兼容性**: 使用 `compatStage` 处理旧版本的枚举值
5. **性能优化**: 使用 `arrShallowEquals` 进行数组比较，避免不必要的更新

## 相关函数

- [`isI18NObject`](./is-object.ts) - 判断是否为国际化对象
- [`get`](https://lodash.com/docs/4.17.15#get) - Lodash 的 get 函数
- [`Logger`](./logger.ts) - 日志工具

## 使用建议

1. **变量处理**: 使用 `isVariable` 判断变量类型，然后进行相应处理
2. **国际化**: 使用 `convertToI18NObject` 转换字符串为国际化对象
3. **异步等待**: 使用 `waitForThing` 等待异步属性，避免回调地狱
4. **数组比较**: 使用 `arrShallowEquals` 进行数组浅比较
5. **错误检查**: 使用 `invariant` 进行前置条件检查，提前发现问题
6. **废弃警告**: 使用 `deprecate` 标记废弃的 API，引导用户使用新 API
