# shallow-equal.ts API 设计文档

## 文件路径

`packages/utils/src/shallow-equal.ts`

## 功能概述

`shallowEqual` 函数用于执行对象的浅比较，比较两个对象的键和值是否相等。这是 React 中常用的性能优化技术，用于避免不必要的重新渲染。

## 主要功能

1. **浅层比较**: 只比较对象的第一层属性，不进行深度递归
2. **键值比较**: 同时比较对象的键和对应的值
3. **类型检查**: 验证参数是否为对象类型
4. **快速返回**: 如果两个引用相同，立即返回 true
5. **性能优化**: 使用简单的循环和比较，性能高效

## 函数定义

```typescript
export function shallowEqual(objA: any, objB: any): boolean
```

## 参数说明

### objA

- **类型**: `any`
- **描述**: 第一个比较对象
- **必需**: 是
- **说明**: 
  - 可以是任何类型的值
  - 如果不是对象，会与 objB 进行严格相等比较

### objB

- **类型**: `any`
- **描述**: 第二个比较对象
- **必需**: 是
- **说明**: 
  - 可以是任何类型的值
  - 如果不是对象，会与 objA 进行严格相等比较

## 返回值

- **类型**: `boolean`
- **描述**: 比较结果
- **值**:
  - `true`: 两个对象相等（引用相同或键值相同）
  - `false`: 两个对象不相等

## 使用示例

### 基本使用

```typescript
import { shallowEqual } from '@alilc/lowcode-utils';

// 相同引用
const obj1 = { a: 1, b: 2 };
const obj2 = obj1;
console.log(shallowEqual(obj1, obj2)); // true

// 相同内容，不同引用
const obj3 = { a: 1, b: 2 };
const obj4 = { a: 1, b: 2 };
console.log(shallowEqual(obj3, obj4)); // true

// 不同内容
const obj5 = { a: 1, b: 2 };
const obj6 = { a: 1, b: 3 };
console.log(shallowEqual(obj5, obj6)); // false
```

### 基本类型比较

```typescript
// 基本类型使用严格相等比较
console.log(shallowEqual(1, 1));         // true
console.log(shallowEqual('hello', 'hello')); // true
console.log(shallowEqual(true, true));   // true
console.log(shallowEqual(null, null));   // true
console.log(shallowEqual(undefined, undefined)); // true

console.log(shallowEqual(1, 2));         // false
console.log(shallowEqual('hello', 'world')); // false
console.log(shallowEqual(true, false));  // false
console.log(shallowEqual(null, undefined)); // false
```

### 数组比较

```typescript
// 数组也是对象，会进行浅比较
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
console.log(shallowEqual(arr1, arr2)); // true

const arr3 = [1, 2, 3];
const arr4 = [1, 2, 4];
console.log(shallowEqual(arr3, arr4)); // false

// 相同引用
const arr5 = [1, 2, 3];
const arr6 = arr5;
console.log(shallowEqual(arr5, arr6)); // true
```

### 嵌套对象比较（浅比较）

```typescript
// 浅比较不进行深度递归
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(shallowEqual(obj1, obj2)); // false，因为 b 的引用不同

// 如果 b 的引用相同
const nested = { c: 2 };
const obj3 = { a: 1, b: nested };
const obj4 = { a: 1, b: nested };
console.log(shallowEqual(obj3, obj4)); // true
```

### 键的数量不同

```typescript
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2, c: 3 };
console.log(shallowEqual(obj1, obj2)); // false，键的数量不同

const obj3 = { a: 1 };
const obj4 = { a: 1, b: 2 };
console.log(shallowEqual(obj3, obj4)); // false，键的数量不同
```

### 特殊值比较

```typescript
// null 和 undefined
console.log(shallowEqual(null, null));     // true
console.log(shallowEqual(undefined, undefined)); // true
console.log(shallowEqual(null, undefined)); // false

// 空对象
console.log(shallowEqual({}, {}));         // true
console.log(shallowEqual({ a: 1 }, {}));   // false

// 空数组
console.log(shallowEqual([], []));         // true
console.log(shallowEqual([1], []));       // false
```

### 在 React 中使用（性能优化）

```typescript
import { shallowEqual } from '@alilc/lowcode-utils';
import { useState, useEffect } from 'react';

function MyComponent({ user, settings }) {
  const [prevProps, setPrevProps] = useState({ user, settings });
  
  useEffect(() => {
    // 使用浅比较避免不必要的重新渲染
    if (!shallowEqual(prevProps, { user, settings })) {
      console.log('Props changed, updating...');
      setPrevProps({ user, settings });
    }
  }, [user, settings, prevProps]);
  
  return <div>{user.name}</div>;
}
```

### 自定义 shouldComponentUpdate

```typescript
import { shallowEqual } from '@alilc/lowcode-utils';

class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    // 使用浅比较优化性能
    return !shallowEqual(this.props, nextProps);
  }
  
  render() {
    return <div>{this.props.data}</div>;
  }
}
```

### React.memo 配合使用

```typescript
import { shallowEqual } from '@alilc/lowcode-utils';
import { memo } from 'react';

// 使用自定义比较函数
const MyComponent = memo(
  function MyComponent({ user, settings }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // 返回 true 表示 props 相等，不需要重新渲染
    return shallowEqual(prevProps, nextProps);
  }
);
```

## 实现细节

### 比较算法

1. **引用检查**: 如果 `objA === objB`，立即返回 `true`
2. **类型检查**: 如果任一参数不是对象或为 null，返回 `false`
3. **键数量检查**: 如果两个对象的键数量不同，返回 `false`
4. **键值比较**: 遍历所有键，检查：
   - objB 是否有相同的键
   - 对应的值是否相等
5. **返回结果**: 如果所有检查都通过，返回 `true`

### 关键代码

```typescript
import { hasOwnProperty } from './has-own-property';

export function shallowEqual(objA: any, objB: any): boolean {
  // 1. 引用检查
  if (objA === objB) {
    return true;
  }
  
  // 2. 类型检查
  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }
  
  // 3. 键数量检查
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  
  // 4. 键值比较
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  
  return true;
}
```

### 依赖函数

```typescript
// hasOwnProperty 的安全版本
export function hasOwnProperty(obj: any, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
```

## 特性说明

### 浅比较 vs 深比较

```typescript
// 浅比较（shallowEqual）
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(shallowEqual(obj1, obj2)); // false

// 深比较（需要深度递归）
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
console.log(deepEqual(obj1, obj2)); // true
```

### 性能优势

```typescript
// 浅比较性能更好
const obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

// 浅比较：O(n)，n 为键的数量
console.time('shallowEqual');
shallowEqual(obj1, obj2);
console.timeEnd('shallowEqual'); // ~0.1ms

// 深比较：O(n*m)，m 为嵌套深度
console.time('deepEqual');
JSON.stringify(obj1) === JSON.stringify(obj2);
console.timeEnd('deepEqual'); // ~0.5ms
```

### 引用相等性

```typescript
// 相同引用
const obj1 = { a: 1 };
const obj2 = obj1;
console.log(shallowEqual(obj1, obj2)); // true，立即返回

// 不同引用但内容相同
const obj3 = { a: 1 };
const obj4 = { a: 1 };
console.log(shallowEqual(obj3, obj4)); // true，需要遍历比较
```

## 性能考虑

1. **时间复杂度**: O(n)，n 为对象的键数量
2. **空间复杂度**: O(n)，存储键数组
3. **最佳情况**: O(1)，当两个引用相同时立即返回
4. **最坏情况**: O(n)，需要遍历所有键进行比较
5. **性能优势**: 比深比较快很多，适合性能优化场景

## 限制和注意事项

1. **浅层比较**: 
   - 不进行深度递归
   - 嵌套对象即使内容相同，如果引用不同也会返回 false
   - 不适合需要深度比较的场景

2. **对象类型**: 
   - 不区分数组和普通对象
   - 数组也会作为对象进行键值比较
   - 函数、Date、RegExp 等特殊对象使用严格相等比较

3. **NaN 比较**: 
   - NaN !== NaN，所以包含 NaN 的对象会比较为 false
   - 如果需要处理 NaN，需要特殊处理

4. **原型链**: 
   - 只比较对象自身的属性，不比较原型链上的属性
   - 使用 `hasOwnProperty` 检查属性是否存在

5. **Symbol 键**: 
   - `Object.keys()` 不包含 Symbol 键
   - Symbol 键不会被比较

## 最佳实践

1. **React 性能优化**:
   ```typescript
   // ✅ 推荐: 使用 shallowEqual 优化 shouldComponentUpdate
   shouldComponentUpdate(nextProps) {
     return !shallowEqual(this.props, nextProps);
   }
   
   // ✅ 推荐: 使用 shallowEqual 优化 React.memo
   const MyComponent = memo(Component, (prev, next) => {
     return shallowEqual(prev, next);
   });
   ```

2. **避免深度比较**:
   ```typescript
   // ❌ 不推荐: 对嵌套对象使用浅比较
   const obj1 = { data: { items: [1, 2, 3] } };
   const obj2 = { data: { items: [1, 2, 3] } };
   shallowEqual(obj1, obj2); // false，但内容相同
   
   // ✅ 推荐: 对扁平对象使用浅比较
   const obj3 = { name: 'Alice', age: 25 };
   const obj4 = { name: 'Alice', age: 25 };
   shallowEqual(obj3, obj4); // true
   ```

3. **使用不可变数据**:
   ```typescript
   // ✅ 推荐: 使用不可变数据，配合浅比较
   const state1 = { user: { name: 'Alice' } };
   const state2 = { ...state1, user: { ...state1.user, age: 25 } };
   
   // 如果 user 对象没有变化，可以直接返回
   if (shallowEqual(state1.user, state2.user)) {
     return state1;
   }
   ```

4. **选择合适的比较方式**:
   ```typescript
   // 简单对象：使用浅比较
   shallowEqual({ a: 1 }, { a: 1 }); // true
   
   // 复杂对象：使用深比较
   JSON.stringify({ a: { b: 1 } }) === JSON.stringify({ a: { b: 1 } }); // true
   
   // 性能敏感：使用浅比较 + 不可变数据
   const obj1 = { data: { items: [1, 2, 3] } };
   const obj2 = { ...obj1 };
   shallowEqual(obj1, obj2); // false，但 data 引用相同
   ```

## 使用场景

1. **React 组件优化**:
   - `shouldComponentUpdate` 方法
   - `React.memo` 的比较函数
   - `useMemo` 和 `useCallback` 的依赖比较

2. **状态管理**:
   - Redux 的 `shouldComponentUpdate`
   - MobX 的 observable 比较
   - 自定义状态管理的优化

3. **数据验证**:
   - 表单数据比较
   - 配置对象比较
   - 缓存键比较

4. **性能优化**:
   - 避免不必要的重新渲染
   - 避免不必要的计算
   - 避免不必要的网络请求

## 相关函数

- [`hasOwnProperty`](./has-own-property.ts) - 安全的 hasOwnProperty 检查
- [`cloneDeep`](./clone-deep.ts) - 深拷贝函数
- [`isObject`](./is-object.ts) - 判断是否为对象类型

## 使用建议

1. **性能优先**: 在性能敏感的场景，优先使用浅比较
2. **不可变数据**: 配合不可变数据模式使用浅比较效果更好
3. **避免嵌套**: 避免对嵌套对象使用浅比较，结果可能不符合预期
4. **明确需求**: 根据实际需求选择浅比较或深比较
5. **测试验证**: 对关键比较逻辑编写测试用例

## 示例：完整的比较工具

```typescript
import { shallowEqual } from '@alilc/lowcode-utils';

// 深比较函数
function deepEqual(objA: any, objB: any): boolean {
  if (objA === objB) return true;
  
  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }
  
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;
  
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (!deepEqual(objA[key], objB[key])) return false;
  }
  
  return true;
}

// 智能比较（自动选择浅比较或深比较）
function smartEqual(objA: any, objB: any): boolean {
  // 如果是简单对象，使用浅比较
  if (isSimpleObject(objA) && isSimpleObject(objB)) {
    return shallowEqual(objA, objB);
  }
  
  // 否则使用深比较
  return deepEqual(objA, objB);
}

function isSimpleObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false;
  const keys = Object.keys(obj);
  if (keys.length > 10) return false; // 键太多，可能复杂
  
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      return false; // 包含嵌套对象
    }
  }
  
  return true;
}
```
