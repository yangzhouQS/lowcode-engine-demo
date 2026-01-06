# @vue3-lowcode/utils

Vue3 LowCode Engine 工具函数库，提供常用的工具函数和 Vue3 特定的组合式 API 工具。

## 安装

```bash
pnpm install @vue3-lowcode/utils
```

## 使用

### 类型守卫函数

```typescript
import { isString, isNumber, isObject, isArray, isFunction, isNil, isPlainObject } from '@vue3-lowcode/utils'

// 检查是否为字符串
isString('hello') // true

// 检查是否为数字
isNumber(123) // true

// 检查是否为对象
isObject({}) // true

// 检查是否为数组
isArray([1, 2, 3]) // true

// 检查是否为函数
isFunction(() => {}) // true

// 检查是否为 null 或 undefined
isNil(null) // true
isNil(undefined) // true

// 检查是否为纯对象
isPlainObject({}) // true
isPlainObject([]) // false
```

### 对象操作函数

```typescript
import { get, set, has, keys, values, entries, merge, clone, deepMerge } from '@vue3-lowcode/utils'

// 获取对象属性值
get({ a: { b: { c: 1 } } }, 'a.b.c') // 1

// 设置对象属性值
const obj = {}
set(obj, 'a.b.c', 1)
// obj = { a: { b: { c: 1 } } }

// 检查对象是否包含指定属性
has({ a: 1 }, 'a') // true

// 获取对象的所有键
keys({ a: 1, b: 2 }) // ['a', 'b']

// 获取对象的所有值
values({ a: 1, b: 2 }) // [1, 2]

// 获取对象的所有键值对
entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]

// 合并对象
merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// 浅拷贝对象
clone({ a: 1 }) // { a: 1 }

// 深度合并对象
deepMerge({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
```

### 数组操作函数

```typescript
import { first, last, flatten, uniq, chunk, groupBy, sortBy, findIndex, find } from '@vue3-lowcode/utils'

// 获取数组第一个元素
first([1, 2, 3]) // 1

// 获取数组最后一个元素
last([1, 2, 3]) // 3

// 扁平化数组
flatten([1, [2, [3]]]) // [1, 2, [3]]

// 数组去重
uniq([1, 2, 2, 3]) // [1, 2, 3]

// 数组分块
chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]

// 数组分组
groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
// { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }

// 数组排序
sortBy([{ a: 2 }, { a: 1 }], 'a')
// [{ a: 1 }, { a: 2 }]

// 查找元素索引
findIndex([1, 2, 3], (x) => x === 2) // 1

// 查找元素
find([1, 2, 3], (x) => x === 2) // 2
```

### 字符串操作函数

```typescript
import { camelCase, kebabCase, snakeCase, pascalCase, capitalize, lowerCase, upperCase, trim, startsWith, endsWith } from '@vue3-lowcode/utils'

// 转换为驼峰命名
camelCase('hello-world') // 'helloWorld'

// 转换为短横线命名
kebabCase('helloWorld') // 'hello-world'

// 转换为蛇形命名
snakeCase('helloWorld') // 'hello_world'

// 转换为帕斯卡命名
pascalCase('hello-world') // 'HelloWorld'

// 首字母大写
capitalize('hello') // 'Hello'

// 转换为小写
lowerCase('HELLO') // 'hello'

// 转换为大写
upperCase('hello') // 'HELLO'

// 去除首尾空格
trim('  hello  ') // 'hello'

// 检查字符串开头
startsWith('hello world', 'hello') // true

// 检查字符串结尾
endsWith('hello world', 'world') // true
```

### 函数操作函数

```typescript
import { debounce, throttle, memoize, once, compose, pipe, curry, partial } from '@vue3-lowcode/utils'

// 防抖函数
const debouncedFn = debounce(() => {
  console.log('Debounced')
}, 300)

// 节流函数
const throttledFn = throttle(() => {
  console.log('Throttled')
}, 300)

// 记忆化函数
const memoizedFn = memoize((x: number) => x * x)

// 只执行一次的函数
const onceFn = once(() => {
  console.log('Only once')
})

// 函数组合（从右到左）
const composedFn = compose(
  (x: number) => x + 1,
  (x: number) => x * 2
)
composedFn(1) // 3

// 函数管道（从左到右）
const pipedFn = pipe(
  (x: number) => x + 1,
  (x: number) => x * 2
)
pipedFn(1) // 4

// 函数柯里化
const curriedFn = curry((a: number, b: number, c: number) => a + b + c)
curriedFn(1)(2)(3) // 6

// 函数偏应用
const partialFn = partial((a: number, b: number, c: number) => a + b + c, 1, 2)
partialFn(3) // 6
```

### Vue3 特定工具函数

```typescript
import { useRef, useReactive, useComputed, useWatch, useWatchEffect, useProvide, useInject, useEventBus } from '@vue3-lowcode/utils'

// 创建响应式引用
const count = useRef(0)

// 创建响应式对象
const state = useReactive({ count: 0 })

// 创建计算属性
const doubled = useComputed(() => count.value * 2)

// 监听响应式数据
useWatch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// 立即执行并追踪依赖
useWatchEffect(() => {
  console.log('Count is:', count.value)
})

// 提供值给后代组件
useProvide('theme', 'dark')

// 注入祖先组件提供的值
const theme = useInject('theme')

// 创建事件总线
const eventBus = useEventBus()
eventBus.on('event-name', handler)
eventBus.emit('event-name', payload)
eventBus.off('event-name', handler)
eventBus.once('event-name', handler)
eventBus.clear()
```

## API 文档

### 类型守卫

| 函数 | 描述 |
|------|------|
| `isString(value)` | 检查值是否为字符串 |
| `isNumber(value)` | 检查值是否为数字 |
| `isBoolean(value)` | 检查值是否为布尔值 |
| `isObject(value)` | 检查值是否为对象（不包括 null 和数组） |
| `isArray(value)` | 检查值是否为数组 |
| `isFunction(value)` | 检查值是否为函数 |
| `isNil(value)` | 检查值是否为 null 或 undefined |
| `isPlainObject(value)` | 检查值是否为纯对象 |

### 对象操作

| 函数 | 描述 |
|------|------|
| `get(obj, path)` | 获取对象指定路径的值 |
| `set(obj, path, value)` | 设置对象指定路径的值 |
| `has(obj, path)` | 检查对象是否包含指定路径 |
| `keys(obj)` | 获取对象的所有键 |
| `values(obj)` | 获取对象的所有值 |
| `entries(obj)` | 获取对象的所有键值对 |
| `merge(...objects)` | 合并多个对象 |
| `clone(obj)` | 浅拷贝对象 |
| `deepMerge(...objects)` | 深度合并多个对象 |

### 数组操作

| 函数 | 描述 |
|------|------|
| `first(array)` | 获取数组第一个元素 |
| `last(array)` | 获取数组最后一个元素 |
| `flatten(array)` | 扁平化数组 |
| `uniq(array)` | 数组去重 |
| `chunk(array, size)` | 数组分块 |
| `groupBy(array, key)` | 数组分组 |
| `sortBy(array, key)` | 数组排序 |
| `findIndex(array, predicate)` | 查找元素索引 |
| `find(array, predicate)` | 查找元素 |

### 字符串操作

| 函数 | 描述 |
|------|------|
| `camelCase(str)` | 转换为驼峰命名 |
| `kebabCase(str)` | 转换为短横线命名 |
| `snakeCase(str)` | 转换为蛇形命名 |
| `pascalCase(str)` | 转换为帕斯卡命名 |
| `capitalize(str)` | 首字母大写 |
| `lowerCase(str)` | 转换为小写 |
| `upperCase(str)` | 转换为大写 |
| `trim(str)` | 去除首尾空格 |
| `startsWith(str, prefix)` | 检查字符串开头 |
| `endsWith(str, suffix)` | 检查字符串结尾 |

### 函数操作

| 函数 | 描述 |
|------|------|
| `debounce(fn, wait)` | 创建防抖函数 |
| `throttle(fn, wait)` | 创建节流函数 |
| `memoize(fn, resolver)` | 创建记忆化函数 |
| `once(fn)` | 创建只执行一次的函数 |
| `compose(...fns)` | 函数组合（从右到左） |
| `pipe(...fns)` | 函数管道（从左到右） |
| `curry(fn, arity)` | 函数柯里化 |
| `partial(fn, ...args)` | 函数偏应用 |

### Vue3 工具

| 函数 | 描述 |
|------|------|
| `useRef(value)` | 创建响应式引用 |
| `useReactive(value)` | 创建响应式对象 |
| `useComputed(getterOrOptions)` | 创建计算属性 |
| `useWatch(source, callback, options)` | 监听响应式数据 |
| `useWatchEffect(effect, options)` | 立即执行并追踪依赖 |
| `useProvide(key, value)` | 提供值给后代组件 |
| `useInject(key, defaultValue)` | 注入祖先组件提供的值 |
| `useEventBus()` | 创建事件总线 |

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## License

MIT
