# React 相关函数 API 设计文档

## 概述

本文档包含 utils 模块中与 React 相关的函数的 API 设计说明，包括 React 组件判断、DOM 元素判断、CSS URL 判断等。

## 函数列表

### 1. isPlainObject

判断值是否为纯对象（Plain Object）。

```typescript
export function isPlainObject(value: any): value is any
```

**参数**:
- `value`: 要判断的值

**返回值**: 如果是纯对象返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isPlainObject } from '@alilc/lowcode-utils';

console.log(isPlainObject({})); // true
console.log(isPlainObject({ a: 1 })); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject([])); // false（数组不是纯对象）
console.log(isPlainObject(new Date())); // false（Date 不是纯对象）
console.log(isPlainObject(null)); // false
console.log(isPlainObject(undefined)); // false
```

**实现细节**:
```typescript
import { isObject } from './is-object';

export function isPlainObject(value: any): value is any {
  if (!isObject(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null;
}
```

**判断逻辑**:
1. 首先检查是否为对象
2. 获取对象的原型
3. 判断原型是否为 `Object.prototype`、`null` 或 `null` 的原型

**与 isObject 的区别**:
- `isObject([])` 返回 `true`（数组是对象）
- `isPlainObject([])` 返回 `false`（数组不是纯对象）

---

### 2. isReactClass

判断值是否为 React 类组件。

```typescript
export function isReactClass(obj: any): obj is ComponentClass<any>
```

**参数**:
- `obj`: 要判断的值

**返回值**: 如果是 React 类组件返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isReactClass } from '@alilc/lowcode-utils';
import { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <div>Hello</div>;
  }
}

console.log(isReactClass(MyComponent)); // true
console.log(isReactClass(() => <div>Hello</div>)); // false（函数组件）
console.log(isReactClass({})); // false
```

**实现细节**:
```typescript
export function isReactClass(obj: any): obj is ComponentClass<any> {
  if (!obj) {
    return false;
  }
  if (obj.prototype && (obj.prototype.isReactComponent || obj.prototype instanceof Component)) {
    return true;
  }
  return false;
}
```

**判断逻辑**:
1. 检查对象是否存在
2. 检查对象是否有 `prototype`
3. 检查 `prototype.isReactComponent` 或 `prototype` 是否继承自 `Component`

---

### 3. acceptsRef

判断组件是否接受 ref。

```typescript
export function acceptsRef(obj: any): boolean
```

**参数**:
- `obj`: 要判断的组件

**返回值**: 如果组件接受 ref 返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { acceptsRef } from '@alilc/lowcode-utils';
import { forwardRef, memo } from 'react';

const MyComponent = forwardRef((props, ref) => {
  return <div ref={ref}>Hello</div>;
});

const MemoComponent = memo(MyComponent);

console.log(acceptsRef(MyComponent)); // true
console.log(acceptsRef(MemoComponent)); // true
console.log(acceptsRef(() => <div>Hello</div>)); // false
```

**实现细节**:
```typescript
export function acceptsRef(obj: any): boolean {
  if (!obj) {
    return false;
  }
  if (obj?.prototype?.isReactComponent || isForwardOrMemoForward(obj)) {
    return true;
  }

  return false;
}
```

**判断逻辑**:
1. 检查对象是否存在
2. 检查是否为 React 类组件
3. 检查是否为 `forwardRef` 或 `memo(forwardRef())` 组件

---

### 4. isForwardRefType

判断组件是否为 `React.forwardRef` 类型。

```typescript
export function isForwardRefType(obj: any): boolean
```

**参数**:
- `obj`: 要判断的组件

**返回值**: 如果是 `forwardRef` 类型返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isForwardRefType } from '@alilc/lowcode-utils';
import { forwardRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
  return <div ref={ref}>Hello</div>;
});

console.log(isForwardRefType(MyComponent)); // true
console.log(isForwardRefType(() => <div>Hello</div>)); // false
```

**实现细节**:
```typescript
export const REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;

export function isForwardRefType(obj: any): boolean {
  if (!obj || !obj?.$$typeof) {
    return false;
  }
  return obj?.$$typeof === REACT_FORWARD_REF_TYPE;
}
```

**判断逻辑**:
1. 检查对象是否存在
2. 检查对象是否有 `$$typeof` 属性
3. 检查 `$$typeof` 是否等于 `REACT_FORWARD_REF_TYPE`

---

### 5. isMemoType

判断组件是否为 `React.memo` 类型。

```typescript
export function isMemoType(obj: any): boolean
```

**参数**:
- `obj`: 要判断的组件

**返回值**: 如果是 `memo` 类型返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isMemoType } from '@alilc/lowcode-utils';
import { memo } from 'react';

const MyComponent = () => <div>Hello</div>;
const MemoComponent = memo(MyComponent);

console.log(isMemoType(MemoComponent)); // true
console.log(isMemoType(MyComponent)); // false
```

**实现细节**:
```typescript
export const REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;

export function isMemoType(obj: any): boolean {
  if (!obj || !obj?.$$typeof) {
    return false;
  }
  return obj.$$typeof === REACT_MEMO_TYPE;
}
```

**判断逻辑**:
1. 检查对象是否存在
2. 检查对象是否有 `$$typeof` 属性
3. 检查 `$$typeof` 是否等于 `REACT_MEMO_TYPE`

---

### 6. isForwardOrMemoForward

判断组件是否为 `forwardRef` 或 `memo(forwardRef())` 类型。

```typescript
export function isForwardOrMemoForward(obj: any): boolean
```

**参数**:
- `obj`: 要判断的组件

**返回值**: 如果是 `forwardRef` 或 `memo(forwardRef())` 类型返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isForwardOrMemoForward } from '@alilc/lowcode-utils';
import { forwardRef, memo } from 'react';

const ForwardRefComponent = forwardRef((props, ref) => {
  return <div ref={ref}>Hello</div>;
});

const MemoForwardComponent = memo(ForwardRefComponent);

console.log(isForwardOrMemoForward(ForwardRefComponent)); // true
console.log(isForwardOrMemoForward(MemoForwardComponent)); // true
console.log(isForwardOrMemoForward(() => <div>Hello</div>)); // false
```

**实现细节**:
```typescript
export function isForwardOrMemoForward(obj: any): boolean {
  if (!obj || !obj?.$$typeof) {
    return false;
  }
  return (
    // React.forwardRef(..)
    isForwardRefType(obj) ||
    // React.memo(React.forwardRef(..))
    (isMemoType(obj) && isForwardRefType(obj.type))
  );
}
```

**判断逻辑**:
1. 检查对象是否存在
2. 检查对象是否有 `$$typeof` 属性
3. 检查是否为 `forwardRef` 类型
4. 检查是否为 `memo(forwardRef())` 类型（`memo` 且 `type` 为 `forwardRef`）

---

### 7. isReactComponent

判断值是否为 React 组件（类组件、函数组件、forwardRef、memo 等）。

```typescript
export function isReactComponent(obj: any): obj is ComponentType<any>
```

**参数**:
- `obj`: 要判断的值

**返回值**: 如果是 React 组件返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isReactComponent } from '@alilc/lowcode-utils';
import { Component, forwardRef, memo } from 'react';

class ClassComponent extends Component {
  render() {
    return <div>Hello</div>;
  }
}

const FunctionComponent = () => <div>Hello</div>;
const ForwardRefComponent = forwardRef((props, ref) => {
  return <div ref={ref}>Hello</div>;
});
const MemoComponent = memo(FunctionComponent);

console.log(isReactComponent(ClassComponent)); // true
console.log(isReactComponent(FunctionComponent)); // true
console.log(isReactComponent(ForwardRefComponent)); // true
console.log(isReactComponent(MemoComponent)); // true
console.log(isReactComponent({})); // false
console.log(isReactComponent('string')); // false
```

**实现细节**:
```typescript
export function isReactComponent(obj: any): obj is ComponentType<any> {
  if (!obj) {
    return false;
  }

  return Boolean(
    isReactClass(obj) || 
    typeof obj === 'function' || 
    isForwardRefType(obj) || 
    isMemoType(obj)
  );
}
```

**判断逻辑**:
1. 检查对象是否存在
2. 检查是否为 React 类组件
3. 检查是否为函数
4. 检查是否为 `forwardRef` 类型
5. 检查是否为 `memo` 类型

---

### 8. wrapReactClass

将函数组件包装为类组件。

```typescript
export function wrapReactClass(view: FunctionComponent): ComponentClass<any>
```

**参数**:
- `view`: 函数组件

**返回值**: 类组件

**使用示例**:
```typescript
import { wrapReactClass } from '@alilc/lowcode-utils';

const FunctionComponent = ({ name }) => {
  return <div>Hello {name}</div>;
};

const ClassComponent = wrapReactClass(FunctionComponent);

// 现在可以使用类组件的特性
console.log(ClassComponent.displayName); // 'FunctionComponent'
```

**实现细节**:
```typescript
export function wrapReactClass(view: FunctionComponent) {
  let ViewComponentClass = class extends Component {
    render() {
      const { children, ...other } = this.props;
      return createElement(view, other, children);
    }
  } as any;
  ViewComponentClass = cloneEnumerableProperty(ViewComponentClass, view);
  ViewComponentClass.displayName = view.displayName;
  return ViewComponentClass;
}
```

**功能**:
1. 创建一个继承自 `Component` 的类
2. 在 `render` 方法中调用函数组件
3. 克隆函数组件的可枚举属性到类组件
4. 设置 `displayName` 为函数组件的 `displayName`

---

### 9. isElement

判断值是否为 DOM 元素。

```typescript
export function isElement(node: any): node is Element
```

**参数**:
- `node`: 要判断的节点

**返回值**: 如果是 DOM 元素返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isElement } from '@alilc/lowcode-utils';

console.log(isElement(document.createElement('div'))); // true
console.log(isElement(document.createElement('span'))); // true
console.log(isElement(document.createTextNode('text'))); // false（文本节点）
console.log(isElement(document.createComment('comment'))); // false（注释节点）
console.log(isElement({})); // false
console.log(isElement(null)); // false
```

**实现细节**:
```typescript
export function isElement(node: any): node is Element {
  if (!node) return false;
  return node.nodeType === Node.ELEMENT_NODE;
}
```

**判断逻辑**:
1. 检查节点是否存在
2. 检查节点的 `nodeType` 是否为 `Node.ELEMENT_NODE`（值为 1）

**节点类型**:
- `Node.ELEMENT_NODE` (1): 元素节点
- `Node.TEXT_NODE` (3): 文本节点
- `Node.COMMENT_NODE` (8): 注释节点
- 等等...

---

### 10. isCSSUrl

判断字符串是否为 CSS URL。

```typescript
export function isCSSUrl(url: string): boolean
```

**参数**:
- `url`: 要判断的 URL 字符串

**返回值**: 如果是 CSS URL 返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isCSSUrl } from '@alilc/lowcode-utils';

console.log(isCSSUrl('style.css')); // true
console.log(isCSSUrl('style.css?version=1')); // true
console.log(isCSSUrl('https://example.com/style.css')); // true
console.log(isCSSUrl('style.js')); // false
console.log(isCSSUrl('style.scss')); // false
console.log(isCSSUrl('style.less')); // false
```

**实现细节**:
```typescript
export function isCSSUrl(url: string): boolean {
  return /\.css(\?.*)?$/.test(url);
}
```

**正则表达式**: `/\.css(\?.*)?$/`

匹配规则:
- 以 `.css` 结尾
- 可以有查询参数（`?version=1`）
- 不区分大小写

---

### 11. isESModule

判断对象是否为 ES Module。

```typescript
export function isESModule(obj: any): obj is ESModule
```

**参数**:
- `obj`: 要判断的对象

**返回值**: 如果是 ES Module 返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isESModule } from '@alilc/lowcode-utils';

const esModule = { __esModule: true, default: MyComponent };
const normalObject = { default: MyComponent };

console.log(isESModule(esModule)); // true
console.log(isESModule(normalObject)); // false
console.log(isESModule(null)); // false
```

**类型定义**:
```typescript
export type ESModule = {
  __esModule: true;
  default: any;
};
```

**实现细节**:
```typescript
export function isESModule(obj: any): obj is ESModule {
  return obj && obj.__esModule;
}
```

**判断逻辑**:
1. 检查对象是否存在
2. 检查对象是否有 `__esModule` 属性

**用途**:
- 用于处理 ES Module 导入
- 在 `createIcon` 等函数中自动提取 `default` 导出

---

## 使用场景

### 1. 组件类型判断

```typescript
import { isReactComponent, isReactClass, isForwardRefType } from '@alilc/lowcode-utils';

function processComponent(component: any) {
  if (isReactClass(component)) {
    // 处理类组件
    console.log('Class component');
  } else if (isForwardRefType(component)) {
    // 处理 forwardRef 组件
    console.log('ForwardRef component');
  } else if (isReactComponent(component)) {
    // 处理其他 React 组件
    console.log('React component');
  } else {
    console.log('Not a React component');
  }
}
```

### 2. DOM 操作

```typescript
import { isElement } from '@alilc/lowcode-utils';

function processNode(node: Node) {
  if (isElement(node)) {
    // 处理元素节点
    console.log('Element:', node.tagName);
  } else {
    // 处理其他节点
    console.log('Other node:', node.nodeType);
  }
}
```

### 3. CSS 加载

```typescript
import { isCSSUrl } from '@alilc/lowcode-utils';

function loadResource(url: string) {
  if (isCSSUrl(url)) {
    // 加载 CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  } else {
    // 加载其他资源
    const script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
  }
}
```

### 4. ES Module 处理

```typescript
import { isESModule } from '@alilc/lowcode-utils';

function importModule(module: any) {
  if (isESModule(module)) {
    // 提取 default 导出
    return module.default;
  }
  // 直接返回
  return module;
}

// 使用
import * as iconModule from './icon';
const Icon = importModule(iconModule);
```

### 5. 组件包装

```typescript
import { wrapReactClass } from '@alilc/lowcode-utils';

// 将函数组件包装为类组件
const FunctionComponent = ({ name }) => {
  return <div>Hello {name}</div>;
};

const ClassComponent = wrapReactClass(FunctionComponent);

// 现在可以使用类组件的特性
console.log(ClassComponent.displayName);
```

## 最佳实践

1. **组件类型判断**:
   ```typescript
   // ✅ 推荐: 使用 isReactComponent 判断
   if (isReactComponent(component)) {
     // 处理 React 组件
   }
   
   // ❌ 不推荐: 使用 typeof 判断
   if (typeof component === 'function') {
     // 可能漏掉类组件、forwardRef 等
   }
   ```

2. **纯对象判断**:
   ```typescript
   // ✅ 推荐: 使用 isPlainObject 判断
   if (isPlainObject(obj)) {
     // 处理纯对象
   }
   
   // ❌ 不推荐: 使用 isObject 判断
   if (isObject(obj)) {
     // 数组也会被判断为对象
   }
   ```

3. **DOM 元素判断**:
   ```typescript
   // ✅ 推荐: 使用 isElement 判断
   if (isElement(node)) {
     // 处理 DOM 元素
   }
   
   // ❌ 不推荐: 直接访问属性
   if (node && node.nodeType === Node.ELEMENT_NODE) {
     // 需要额外的 null 检查
   }
   ```

4. **ES Module 处理**:
   ```typescript
   // ✅ 推荐: 先判断再处理
   if (isESModule(module)) {
     return module.default;
   }
   
   // ❌ 不推荐: 直接访问
   return module.default; // 可能报错
   ```

## 性能考虑

1. **isPlainObject**: O(1)，访问原型链
2. **isReactClass**: O(1)，检查原型属性
3. **acceptsRef**: O(1)，检查多个条件
4. **isForwardRefType**: O(1)，检查 `$$typeof` 属性
5. **isMemoType**: O(1)，检查 `$$typeof` 属性
6. **isForwardOrMemoForward**: O(1)，检查多个条件
7. **isReactComponent**: O(1)，检查多个条件
8. **isElement**: O(1)，检查 `nodeType` 属性
9. **isCSSUrl**: O(n)，正则表达式匹配
10. **isESModule**: O(1)，检查 `__esModule` 属性

## 限制和注意事项

1. **isPlainObject**:
   - `Object.create(null)` 返回 `true`（原型为 null）
   - 自定义构造函数创建的对象可能返回 `false`
   - 不区分数组和对象

2. **React 组件判断**:
   - 依赖 React 内部属性（`$$typeof`、`isReactComponent`）
   - React 版本更新可能导致判断失效
   - 不适用于所有 React 版本

3. **isElement**:
   - 只判断 DOM 元素，不判断 React 元素
   - 需要传入真实的 DOM 节点
   - 在 SSR 环境中可能不可用

4. **isCSSUrl**:
   - 只检查文件扩展名，不验证 URL 有效性
   - 可能误判其他以 `.css` 结尾的文件
   - 不支持相对路径

5. **isESModule**:
   - 只检查 `__esModule` 属性
   - 可能误判其他具有相同结构的对象
   - 不验证 `default` 属性是否存在

## 相关函数

- [`isObject`](./10-类型检查函数.md) - 判断是否为对象类型
- [`isFunction`](./10-类型检查函数.md) - 判断是否为函数类型
- [`createIcon`](./09-create-icon.tsx.md) - 图标创建函数（使用 isESModule）
- [`cloneEnumerableProperty`](./clone-enumerable-property.ts) - 克隆可枚举属性

## 使用建议

1. **组件类型**: 使用 `isReactComponent` 判断组件类型，然后进行相应处理
2. **纯对象**: 使用 `isPlainObject` 判断纯对象，排除数组等
3. **DOM 操作**: 使用 `isElement` 判断 DOM 元素，避免操作非元素节点
4. **CSS 加载**: 使用 `isCSSUrl` 判断 CSS URL，然后使用相应的加载方式
5. **ES Module**: 使用 `isESModule` 判断 ES Module，然后提取 `default` 导出
6. **组件包装**: 使用 `wrapReactClass` 将函数组件包装为类组件，保留函数组件的特性
