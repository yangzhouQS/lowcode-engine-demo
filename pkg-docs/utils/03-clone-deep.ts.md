# clone-deep.ts API 设计文档

## 文件路径

`packages/utils/src/clone-deep.ts`

## 功能概述

`cloneDeep` 函数是一个深拷贝工具函数，用于递归地复制对象和数组，创建一个与原对象完全独立的副本。该函数支持处理嵌套对象、数组以及基本数据类型。

## 主要功能

1. **深拷贝对象**: 递归复制对象的所有属性，包括嵌套对象
2. **深拷贝数组**: 递归复制数组的所有元素，包括嵌套数组
3. **处理基本类型**: 对 null、undefined、基本数据类型直接返回
4. **只复制自有属性**: 使用 `hasOwnProperty` 检查，只复制对象的自有属性，不复制原型链上的属性
5. **类型保持**: 保持原数据的类型（对象、数组、基本类型等）

## 函数定义

```typescript
import { isPlainObject } from './is-plain-object';

export function cloneDeep(src: any): any
```

## 参数说明

### src

- **类型**: `any`
- **描述**: 需要被深拷贝的源数据
- **必需**: 是
- **可选值**: 任意 JavaScript 值（对象、数组、基本类型、null、undefined）

## 返回值

- **类型**: `any`
- **描述**: 深拷贝后的数据副本
- **说明**: 
  - 如果 `src` 是 `null` 或 `undefined`，直接返回 `src`
  - 如果 `src` 是数组，返回一个新数组，每个元素都经过深拷贝
  - 如果 `src` 是普通对象，返回一个新对象，每个属性都经过深拷贝
  - 其他情况（如函数、Date、RegExp 等），直接返回 `src`

## 使用示例

### 基本使用

```typescript
import { cloneDeep } from '@alilc/lowcode-utils';

// 拷贝对象
const original = {
  name: 'Alice',
  age: 25,
  address: {
    city: 'Beijing',
    country: 'China'
  }
};

const cloned = cloneDeep(original);

console.log(cloned === original); // false
console.log(cloned.name === original.name); // true
console.log(cloned.address === original.address); // false
console.log(cloned.address.city === original.address.city); // true

// 修改克隆对象不影响原对象
cloned.name = 'Bob';
cloned.address.city = 'Shanghai';

console.log(original.name); // 'Alice'
console.log(original.address.city); // 'Beijing'
console.log(cloned.name); // 'Bob'
console.log(cloned.address.city); // 'Shanghai'
```

### 拷贝数组

```typescript
const originalArray = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  [1, 2, 3]
];

const clonedArray = cloneDeep(originalArray);

console.log(clonedArray === originalArray); // false
console.log(clonedArray[0] === originalArray[0]); // false
console.log(clonedArray[2] === originalArray[2]); // false
```

### 处理特殊值

```typescript
// null 和 undefined
console.log(cloneDeep(null)); // null
console.log(cloneDeep(undefined)); // undefined

// 基本类型
console.log(cloneDeep('hello')); // 'hello'
console.log(cloneDeep(123)); // 123
console.log(cloneDeep(true)); // true
```

### 嵌套结构

```typescript
const complex = {
  users: [
    { name: 'Alice', friends: ['Bob', 'Charlie'] },
    { name: 'Bob', friends: ['Alice', 'Charlie'] }
  ],
  settings: {
    theme: 'dark',
    notifications: {
      email: true,
      sms: false
    }
  }
};

const clonedComplex = cloneDeep(complex);

// 修改深层嵌套属性
clonedComplex.users[0].friends[0] = 'David';
clonedComplex.settings.notifications.email = false;

console.log(complex.users[0].friends[0]); // 'Bob' (原对象未受影响)
console.log(complex.settings.notifications.email); // true (原对象未受影响)
console.log(clonedComplex.users[0].friends[0]); // 'David'
console.log(clonedComplex.settings.notifications.email); // false
```

## 实现细节

### 算法流程

1. **类型检查**: 首先检查源数据的类型
2. **基本类型处理**: 
   - `null` 或 `undefined`: 直接返回
   - `Array`: 使用 `map` 递归处理每个元素
   - `Object` 且是普通对象: 创建新对象，遍历所有自有属性并递归拷贝
   - 其他: 直接返回（如函数、Date、RegExp 等）

### 关键实现

```typescript
export function cloneDeep(src: any): any {
  const type = typeof src;

  let data: any;
  
  // 处理 null 和 undefined
  if (src === null || src === undefined) {
    data = src;
  } 
  // 处理数组
  else if (Array.isArray(src)) {
    data = src.map(item => cloneDeep(item));
  } 
  // 处理普通对象
  else if (type === 'object' && isPlainObject(src)) {
    data = {};
    for (const key in src) {
      // 只拷贝自有属性
      if (src.hasOwnProperty(key)) {
        data[key] = cloneDeep(src[key]);
      }
    }
  } 
  // 其他类型直接返回
  else {
    data = src;
  }

  return data;
}
```

### 依赖关系

- `isPlainObject`: 用于判断是否为普通对象（非 null、非数组、非函数、非特殊对象）

## 性能考虑

1. **递归深度**: 对于深度嵌套的对象，递归可能导致栈溢出
2. **循环引用**: 当前实现不支持循环引用，会导致无限递归
3. **性能**: 对于大型对象，递归拷贝可能较慢

## 限制和注意事项

1. **不支持循环引用**: 
   ```typescript
   const obj: any = {};
   obj.self = obj;
   const cloned = cloneDeep(obj); // 会导致无限递归
   ```

2. **不支持特殊对象**: 
   - 函数: 直接返回原函数引用
   - Date: 直接返回原 Date 对象
   - RegExp: 直接返回原 RegExp 对象
   - Map/Set: 直接返回原对象

3. **性能**: 对于大型对象，考虑使用更高效的深拷贝方法（如 `structuredClone`）

4. **Symbol 属性**: 当前实现不会拷贝 Symbol 属性

## 最佳实践

1. **使用场景**:
   - 需要独立副本时使用
   - 需要修改对象而不影响原对象时使用
   - 需要比较对象状态时使用

2. **避免场景**:
   - 不需要独立副本时，避免不必要的深拷贝
   - 大型对象慎用，考虑性能影响
   - 包含循环引用的对象不能使用

3. **替代方案**:
   - 现代浏览器: `structuredClone()` (支持循环引用和更多类型)
   - JSON 方法: `JSON.parse(JSON.stringify(obj))` (不支持函数、undefined、Symbol)

## 相关函数

- [`isPlainObject`](./is-plain-object.ts) - 判断是否为普通对象
- [`shallowEqual`](./shallow-equal.ts) - 浅比较函数
- [`cloneEnumerableProperty`](./clone-enumerable-property.ts) - 拷贝可枚举属性

## 使用建议

1. **性能敏感场景**: 对于大型对象，考虑使用 `structuredClone` 或其他高性能深拷贝方法
2. **类型安全**: 建议配合 TypeScript 使用，提供类型参数
3. **循环引用**: 如果需要支持循环引用，使用其他深拷贝实现
4. **不可变数据**: 在 React 等框架中，深拷贝常用于创建不可变数据

## 示例：在 React 中使用

```typescript
import { cloneDeep } from '@alilc/lowcode-utils';

function Component({ data }: { data: any }) {
  const handleClick = () => {
    // 创建数据的深拷贝，避免直接修改 props
    const clonedData = cloneDeep(data);
    clonedData.value = 'modified';
    // 使用 clonedData...
  };

  return <button onClick={handleClick}>Modify</button>;
}
```
