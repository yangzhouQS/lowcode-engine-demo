# unique-id.ts API 设计文档

## 文件路径

`packages/utils/src/unique-id.ts`

## 功能概述

`uniqueId` 函数用于生成全局唯一的标识符。它基于时间戳和递增计数器生成唯一 ID，支持自定义前缀，适用于生成组件 ID、DOM 元素 ID、临时 ID 等场景。

## 主要功能

1. **全局唯一性**: 使用全局计数器确保每次调用都生成唯一 ID
2. **自定义前缀**: 支持添加前缀，便于区分不同类型的 ID
3. **时间戳基准**: 以当前时间戳为基准，避免页面刷新后 ID 冲突
4. **36 进制**: ID 以 36 进制字符串形式返回，确保可读性
5. **小写输出**: 转换为小写，确保 ID 格式一致

## 函数定义

```typescript
let guid = Date.now();

export function uniqueId(prefix = ''): string
```

## 参数说明

### prefix

- **类型**: `string`
- **描述**: ID 的前缀字符串
- **必需**: 否
- **默认值**: `''` (空字符串)
- **说明**: 
  - 用于标识 ID 的类型或来源
  - 可以是任意字符串，如 `'component-'`, `'item-'`, `'temp-'` 等
  - 前缀会直接添加到 ID 前面

## 返回值

- **类型**: `string`
- **描述**: 唯一标识符字符串
- **格式**: `{prefix}{guid}`
  - `prefix`: 用户提供的自定义前缀
  - `guid`: 递增的数字，转换为 36 进制字符串并小写

## 使用示例

### 基本使用

```typescript
import { uniqueId } from '@alilc/lowcode-utils';

// 生成不带前缀的 ID
const id1 = uniqueId();
console.log(id1); // 类似 'l1a2b3c' (36 进制的时间戳递增值)

const id2 = uniqueId();
console.log(id2); // 类似 'l1a2b3d' (递增 1)
```

### 带前缀的 ID

```typescript
// 生成带前缀的 ID
const componentId1 = uniqueId('component-');
console.log(componentId1); // 类似 'component-l1a2b3c'

const componentId2 = uniqueId('component-');
console.log(componentId2); // 类似 'component-l1a2b3d'

const itemId = uniqueId('item-');
console.log(itemId); // 类似 'item-l1a2b3e'

const tempId = uniqueId('temp-');
console.log(tempId); // 类似 'temp-l1a2b3f'
```

### 在 React 中使用

```typescript
import { uniqueId } from '@alilc/lowcode-utils';

function MyComponent() {
  const [items, setItems] = useState([
    { id: uniqueId('item-'), name: 'Item 1' },
    { id: uniqueId('item-'), name: 'Item 2' },
  ]);

  const addItem = () => {
    setItems([...items, { id: uniqueId('item-'), name: `Item ${items.length + 1}` }]);
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}
```

### 动态前缀

```typescript
// 根据类型动态生成不同前缀的 ID
function generateId(type: 'component' | 'item' | 'temp'): string {
  return uniqueId(`${type}-`);
}

const componentId = generateId('component'); // component-l1a2b3c
const itemId = generateId('item');         // item-l1a2b3d
const tempId = generateId('temp');         // temp-l1a2b3e
```

### 批量生成 ID

```typescript
// 批量生成唯一 ID
const items = Array.from({ length: 10 }, (_, index) => ({
  id: uniqueId('item-'),
  name: `Item ${index + 1}`
}));

console.log(items);
// [
//   { id: 'item-l1a2b3c', name: 'Item 1' },
//   { id: 'item-l1a2b3d', name: 'Item 2' },
//   ...
//   { id: 'item-l1a2b45', name: 'Item 10' }
// ]
```

## 实现细节

### 生成算法

1. **时间戳初始化**: 使用 `Date.now()` 作为初始基准值
2. **递增计数**: 每次调用时，全局计数器 `guid` 递增 1
3. **36 进制转换**: 将数字转换为 36 进制字符串（0-9, a-z）
4. **小写转换**: 将结果转换为小写，确保格式一致
5. **前缀拼接**: 将前缀和生成的 ID 拼接

### 关键代码

```typescript
let guid = Date.now();

export function uniqueId(prefix = '') {
  return `${prefix}${(guid++).toString(36).toLowerCase()}`;
}
```

### 36 进制说明

- 数字 0-9: 表示为 '0'-'9'
- 数字 10-35: 表示为 'a'-'z'
- 示例转换:
  - 10 → 'a'
  - 35 → 'z'
  - 36 → '10'
  - 100 → '2s'

## 特性说明

### 全局唯一性

```typescript
// 在整个应用生命周期内，ID 都是唯一的
const id1 = uniqueId();
const id2 = uniqueId();
const id3 = uniqueId();

console.log(id1 !== id2 && id2 !== id3 && id1 !== id3); // true
```

### 页面刷新

```typescript
// 页面刷新后，guid 会重新初始化为当前时间戳
// 因此新的 ID 序列从新的时间戳开始，避免与旧 ID 冲突
```

### 前缀灵活性

```typescript
// 前缀可以是任意字符串
uniqueId('prefix-');     // prefix-l1a2b3c
uniqueId('prefix_');     // prefix_l1a2b3d
uniqueId('prefix.');     // prefix.l1a2b3e
uniqueId('prefix/');     // prefix/l1a2b3f
uniqueId('prefix');      // prefixl1a2b40
uniqueId('PREFIX');      // PREFIXl1a2b41
```

## 性能考虑

1. **时间复杂度**: O(1)，每次调用都是常数时间
2. **空间复杂度**: O(1)，只维护一个全局计数器
3. **性能**: 非常高效，适合高频调用场景
4. **内存占用**: 极低，只存储一个数字变量

## 限制和注意事项

1. **全局状态**: 
   - `guid` 是全局变量，在整个应用中共享
   - 页面刷新后会重置为新的时间戳
   - 多个页面/标签页会有独立的计数器

2. **ID 格式**:
   - ID 格式为 `{prefix}{guid}`
   - `guid` 是递增的 36 进制数字
   - 不保证 ID 的长度一致（因为 36 进制数字长度会变化）

3. **唯一性范围**:
   - 在单个页面生命周期内保证唯一
   - 页面刷新后可能生成与之前相同的 ID（如果时间戳相同）
   - 不适用于分布式系统或跨页面的唯一性保证

4. **可预测性**:
   - ID 是可预测的（递增序列）
   - 不适用于需要随机或加密 ID 的场景

5. **并发安全**:
   - 在 JavaScript 单线程环境中是安全的
   - 不适用于多线程环境（如 Web Workers）

## 最佳实践

1. **使用场景**:
   - React 组件的 key 属性
   - DOM 元素的 ID 属性
   - 列表项的唯一标识
   - 临时数据的标识
   - 表单字段的 ID

2. **前缀命名建议**:
   - 使用连字符分隔: `'component-'`, `'item-'`, `'temp-'`
   - 语义化命名: `'button-'`, `'input-'`, `'modal-'`
   - 避免特殊字符: 不建议使用空格、特殊符号

3. **避免场景**:
   - 不需要全局唯一性时，使用局部计数器
   - 需要随机 ID 时，使用其他方法（如 UUID）
   - 需要跨页面唯一性时，考虑其他方案

4. **替代方案**:
   - 随机 ID: `Math.random().toString(36).substr(2, 9)`
   - UUID: 使用 `crypto.randomUUID()` 或第三方库
   - 纳米 ID: 使用 `nanoid` 等库
   - 时间戳 ID: `Date.now().toString()`

## 相关函数

- [`cloneDeep`](./clone-deep.ts) - 深拷贝函数
- [`shallowEqual`](./shallow-equal.ts) - 浅比较函数

## 使用建议

1. **React 最佳实践**:
   ```typescript
   // ✅ 推荐: 使用 uniqueId 生成 key
   {items.map(item => (
     <div key={uniqueId('item-')}>{item.name}</div>
   ))}
   
   // ❌ 不推荐: 使用索引作为 key
   {items.map((item, index) => (
     <div key={index}>{item.name}</div>
   ))}
   ```

2. **前缀管理**:
   ```typescript
   // 为不同类型的 ID 定义常量前缀
   const ID_PREFIXES = {
     COMPONENT: 'component-',
     ITEM: 'item-',
     TEMP: 'temp-',
     MODAL: 'modal-',
   } as const;
   
   const componentId = uniqueId(ID_PREFIXES.COMPONENT);
   ```

3. **调试友好**:
   ```typescript
   // 使用语义化前缀，便于调试
   const modalId = uniqueId('modal-'); // modal-l1a2b3c
   const dialogId = uniqueId('dialog-'); // dialog-l1a2b3d
   
   // 在调试器中可以清楚地看到 ID 的类型
   ```

4. **性能优化**:
   ```typescript
   // 在循环中批量生成 ID
   const items = Array.from({ length: 1000 }, (_, i) => ({
     id: uniqueId('item-'),
     data: generateData(i)
   }));
   // 比在循环内创建局部计数器更高效
   ```

## 示例：完整的组件 ID 管理

```typescript
import { uniqueId } from '@alilc/lowcode-utils';

// ID 前缀常量
const ID_PREFIXES = {
  COMPONENT: 'comp-',
  ITEM: 'item-',
  TEMP: 'temp-',
} as const;

// 组件工厂
function createComponent(componentName: string) {
  return {
    id: uniqueId(ID_PREFIXES.COMPONENT),
    name: componentName,
    createdAt: Date.now(),
  };
}

// 使用示例
const button1 = createComponent('Button');
const button2 = createComponent('Button');
const modal1 = createComponent('Modal');

console.log(button1.id); // comp-l1a2b3c
console.log(button2.id); // comp-l1a2b3d
console.log(modal1.id);  // comp-l1a2b3e
```
