# event/prop.ts - 属性事件类型定义

## 文件路径
`packages/types/src/event/prop.ts`

## 文件概述
定义了属性事件相关的类型和常量，包括属性变化事件及其参数。

## 功能说明

### 主要职责
1. **属性事件定义**: 定义属性变化事件的类型
2. **事件参数**: 定义事件处理函数的参数类型
3. **事件常量**: 定义事件名称常量

## 类型定义详解

### 1. ChangeOptions
属性变化事件的参数接口。

```typescript
export interface ChangeOptions {
  key?: string | number;    // 属性键
  prop?: any;              // 属性对象
  node: Node;              // 节点对象
  newValue: any;           // 新值
  oldValue: any;           // 旧值
}
```

**字段详细说明**:

#### key
- **类型**: `string | number`
- **必填**: 否
- **说明**: 属性键，标识变化的属性
- **示例**: `"className"`, `"style"`, `0`, `1`
- **使用场景**:
  - 识别变化的属性
  - 属性过滤
  - 条件处理

#### prop
- **类型**: `any`
- **必填**: 否
- **说明**: 属性对象，包含属性的详细信息
- **示例**: 属性对象实例
- **使用场景**:
  - 访问属性对象
  - 获取属性元信息
  - 属性操作

#### node
- **类型**: `Node`
- **必填**: 是
- **说明**: 节点对象，属性所属的节点
- **示例**: 节点实例
- **使用场景**:
  - 访问节点信息
  - 节点操作
  - 节点关联

#### newValue
- **类型**: `any`
- **必填**: 是
- **说明**: 新值，属性变化后的值
- **示例**: `"new-class"`, `{ color: 'red' }`, `123`
- **使用场景**:
  - 获取新值
  - 值验证
  - 值转换

#### oldValue
- **类型**: `any`
- **必填**: 是
- **说明**: 旧值，属性变化前的值
- **示例**: `"old-class"`, `{ color: 'blue' }`, `456`
- **使用场景**:
  - 获取旧值
  - 值对比
  - 撤销操作

### 2. Change
属性变化事件名称常量（已弃用）。

```typescript
/**
 * Node Prop 变化事件
 * @Deprecated Please Replace With InnerPropChange
 */
export const Change = 'node.prop.change';
```

**说明**:
- **常量名称**: `Change`
- **事件名称**: `'node.prop.change'`
- **状态**: `@Deprecated`
- **使用场景**:
  - 监听属性变化
  - 响应属性更新
  - 触发相关逻辑

**注意**: 该事件已标记为 `@Deprecated`，建议使用 `InnerChange` 替代。

### 3. InnerChange
属性变化事件名称常量。

```typescript
/** Node Prop 变化事件 */
export const InnerChange = 'node.innerProp.change';
```

**说明**:
- **常量名称**: `InnerChange`
- **事件名称**: `'node.innerProp.change'`
- **使用场景**:
  - 监听属性变化
  - 响应属性更新
  - 触发相关逻辑

**注意**: 这是推荐使用的属性变化事件。

## 使用示例

### 基本属性变化监听
```typescript
import { InnerChange, ChangeOptions } from '@alilc/lowcode-types';

// 监听属性变化
editor.on(InnerChange, (options: ChangeOptions) => {
  console.log('Property changed:', options);
  console.log('Key:', options.key);
  console.log('New value:', options.newValue);
  console.log('Old value:', options.oldValue);
});
```

### 属性过滤
```typescript
import { InnerChange, ChangeOptions } from '@alilc/lowcode-types';

// 只监听特定属性的变化
editor.on(InnerChange, (options: ChangeOptions) => {
  const { key, newValue, oldValue } = options;
  
  // 只处理 className 属性
  if (key === 'className') {
    console.log(`Class name changed from ${oldValue} to ${newValue}`);
  }
  
  // 只处理 style 属性
  if (key === 'style') {
    console.log('Style changed:', newValue);
  }
});
```

### 值验证
```typescript
import { InnerChange, ChangeOptions } from '@alilc/lowcode-types';

// 验证属性值
editor.on(InnerChange, (options: ChangeOptions) => {
  const { key, newValue } = options;
  
  // 验证 className
  if (key === 'className') {
    if (typeof newValue !== 'string') {
      console.error('Invalid className type:', typeof newValue);
      return;
    }
  }
  
  // 验证 style
  if (key === 'style') {
    if (typeof newValue !== 'object') {
      console.error('Invalid style type:', typeof newValue);
      return;
    }
  }
});
```

### 值转换
```typescript
import { InnerChange, ChangeOptions } from '@alilc/lowcode-types';

// 转换属性值
editor.on(InnerChange, (options: ChangeOptions) => {
  const { key, newValue, node } = options;
  
  // 转换颜色值
  if (key === 'color' && typeof newValue === 'string') {
    const hexColor = convertToHex(newValue);
    console.log('Converted color:', hexColor);
  }
  
  // 转换数字值
  if (key === 'width' && typeof newValue === 'string') {
    const numericWidth = parseInt(newValue, 10);
    console.log('Numeric width:', numericWidth);
  }
});
```

### 历史记录
```typescript
import { InnerChange, ChangeOptions } from '@alilc/lowcode-types';

// 记录属性变化历史
const history: ChangeOptions[] = [];

editor.on(InnerChange, (options: ChangeOptions) => {
  history.push(options);
  
  // 限制历史记录数量
  if (history.length > 100) {
    history.shift();
  }
  
  console.log('History length:', history.length);
});
```

### 属性同步
```typescript
import { InnerChange, ChangeOptions } from '@alilc/lowcode-types';

// 同步属性到其他系统
editor.on(InnerChange, (options: ChangeOptions) => {
  const { key, newValue, node } = options;
  
  // 同步到状态管理
  if (key === 'value') {
    stateManager.setValue(node.id, newValue);
  }
  
  // 同步到本地存储
  if (key === 'settings') {
    localStorage.setItem('settings', JSON.stringify(newValue));
  }
  
  // 同步到服务器
  if (key === 'data') {
    api.updateNodeData(node.id, newValue);
  }
});
```

### 条件触发
```typescript
import { InnerChange, ChangeOptions } from '@alilc/lowcode-types';

// 根据属性变化触发特定操作
editor.on(InnerChange, (options: ChangeOptions) => {
  const { key, newValue, oldValue } = options;
  
  // 当 visible 变为 true 时
  if (key === 'visible' && newValue === true) {
    console.log('Node became visible');
    // 执行显示相关操作
  }
  
  // 当 disabled 变为 false 时
  if (key === 'disabled' && newValue === false) {
    console.log('Node became enabled');
    // 执行启用相关操作
  }
  
  // 当值发生变化时
  if (newValue !== oldValue) {
    console.log('Value changed:', { from: oldValue, to: newValue });
  }
});
```

## 设计特点

### 1. 详细信息
- 提供属性键
- 提供属性对象
- 提供节点信息
- 提供新旧值

### 2. 类型安全
- 完整的 TypeScript 类型定义
- 严格的类型检查
- 防止类型错误

### 3. 向后兼容
- 保留已弃用的事件
- 平滑版本升级
- 渐进式迁移

### 4. 灵活性
- 大部分字段为可选
- 支持不同场景
- 易于扩展

## 注意事项

1. **弃用事件**: `node.prop.change` 已标记为弃用，建议使用 `node.innerProp.change` 替代
2. **事件名称**: 使用常量 `InnerChange` 而不是硬编码字符串
3. **可选字段**: `key` 和 `prop` 是可选的，使用前需要检查是否存在
4. **值类型**: `newValue` 和 `oldValue` 的类型为 `any`，需要自行处理类型检查
5. **性能考虑**: 属性变化事件可能频繁触发，注意性能优化

## 相关文件

- [`event/index.ts`](./07-event-index.ts) - 事件配置类型
- [`event/node.ts`](./08-event-node.ts) - 节点事件类型
- [`../index.ts`](./01-src-index.ts) - 模块入口

## 版本历史

- **v1.3.2**: 当前版本，包含属性事件类型定义

## 使用建议

1. **使用新事件**: 优先使用 `InnerChange` 而不是 `Change`
2. **属性过滤**: 根据属性键过滤事件，减少不必要的处理
3. **值验证**: 在事件处理函数中添加值验证逻辑
4. **性能优化**: 对于频繁触发的事件，考虑使用防抖或节流
5. **错误处理**: 在事件处理函数中添加适当的错误处理

## 扩展功能

可以基于这些类型实现以下功能：

1. **属性历史**: 实现属性变化历史记录
2. **属性验证**: 实现属性值验证
3. **属性同步**: 实现属性同步到其他系统
4. **属性转换**: 实现属性值转换
5. **属性分析**: 实现属性使用分析
