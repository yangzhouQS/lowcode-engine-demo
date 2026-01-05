# event/index.ts - 事件配置类型定义

## 文件路径
`packages/types/src/event/index.ts`

## 文件概述
定义了事件配置的类型，用于描述低代码引擎中的事件系统。该文件作为事件模块的入口，导出了节点事件相关的类型和常量。

## 功能说明

### 主要职责
1. **事件配置**: 定义事件配置的接口
2. **事件导出**: 导出节点事件相关的类型和常量
3. **类型安全**: 提供事件系统的类型支持

## 类型定义详解

### 1. EventConfig
事件配置接口，定义了所有可能的事件及其处理函数。

```typescript
export interface EventConfig {
  [Node.Prop.Change]: (options: Node.Prop.ChangeOptions) => any;
  [Node.Prop.InnerChange]: (options: Node.Prop.ChangeOptions) => any;
  [Node.Rerender]: (options: Node.RerenderOptions) => void;
  [eventName: string]: any;
}
```

**字段详细说明**:

#### Node.Prop.Change
- **类型**: `(options: Node.Prop.ChangeOptions) => any`
- **说明**: 节点属性变化事件（已弃用）
- **事件名称**: `'node.prop.change'`
- **参数**: `Node.Prop.ChangeOptions`
  - `key?: string | number`: 属性键
  - `prop?: any`: 属性对象
  - `node: Node`: 节点对象
  - `newValue: any`: 新值
  - `oldValue: any`: 旧值
- **返回值**: `any`
- **使用场景**:
  - 监听节点属性变化
  - 响应属性更新
  - 触发相关逻辑

**注意**: 该事件已标记为 `@Deprecated`，建议使用 `Node.Prop.InnerChange` 替代。

#### Node.Prop.InnerChange
- **类型**: `(options: Node.Prop.ChangeOptions) => any`
- **说明**: 节点内部属性变化事件
- **事件名称**: `'node.innerProp.change'`
- **参数**: `Node.Prop.ChangeOptions`
  - `key?: string | number`: 属性键
  - `prop?: any`: 属性对象
  - `node: Node`: 节点对象
  - `newValue: any`: 新值
  - `oldValue: any`: 旧值
- **返回值**: `any`
- **使用场景**:
  - 监听节点内部属性变化
  - 响应属性更新
  - 触发相关逻辑

**注意**: 这是推荐使用的属性变化事件。

#### Node.Rerender
- **类型**: `(options: Node.RerenderOptions) => void`
- **说明**: 节点重新渲染事件
- **事件名称**: `'node.edit.rerender.time'`
- **参数**: `Node.RerenderOptions`
  - `time: number`: 渲染时间
  - `componentName?: string`: 组件名称
  - `type?: string`: 类型
  - `nodeCount?: number`: 节点数量
- **返回值**: `void`
- **使用场景**:
  - 监听节点重新渲染
  - 性能监控
  - 渲染统计

#### [eventName: string]: any
- **类型**: `any`
- **说明**: 支持自定义事件
- **使用场景**:
  - 扩展事件系统
  - 自定义事件处理
  - 插件事件

### 2. 导出
```typescript
export * as Node from './node';
```

导出节点事件相关的所有类型和常量。

## 使用示例

### 基本事件配置
```typescript
import { EventConfig } from '@alilc/lowcode-types';

const eventConfig: EventConfig = {
  'node.innerProp.change': (options) => {
    console.log('Property changed:', options);
    console.log('New value:', options.newValue);
    console.log('Old value:', options.oldValue);
  },
  'node.edit.rerender.time': (options) => {
    console.log('Node rerendered:', options);
    console.log('Render time:', options.time);
  }
};
```

### 属性变化事件监听
```typescript
import { EventConfig } from '@alilc/lowcode-types';

const eventConfig: EventConfig = {
  'node.innerProp.change': (options) => {
    const { key, node, newValue, oldValue } = options;
    
    console.log(`Property ${key} changed on node ${node.id}`);
    console.log(`Old value: ${oldValue}`);
    console.log(`New value: ${newValue}`);
    
    // 根据属性变化执行特定逻辑
    if (key === 'className') {
      console.log('Class name changed, updating styles...');
    }
  }
};
```

### 重新渲染事件监听
```typescript
import { EventConfig } from '@alilc/lowcode-types';

const eventConfig: EventConfig = {
  'node.edit.rerender.time': (options) => {
    const { time, componentName, type, nodeCount } = options;
    
    console.log(`Component ${componentName} (${type}) rerendered in ${time}ms`);
    console.log(`Total nodes: ${nodeCount}`);
    
    // 性能监控
    if (time > 100) {
      console.warn(`Slow render detected: ${time}ms`);
    }
  }
};
```

### 自定义事件
```typescript
import { EventConfig } from '@alilc/lowcode-types';

const eventConfig: EventConfig = {
  'node.innerProp.change': (options) => {
    console.log('Property changed:', options);
  },
  'custom.event': (data) => {
    console.log('Custom event triggered:', data);
  },
  'plugin.event': (options) => {
    console.log('Plugin event:', options);
  }
};
```

### 事件注册
```typescript
// 在编辑器中注册事件
editor.on('node.innerProp.change', (options) => {
  console.log('Property changed:', options);
});

editor.on('node.edit.rerender.time', (options) => {
  console.log('Node rerendered:', options);
});
```

## 设计特点

### 1. 类型安全
- 完整的 TypeScript 类型定义
- 严格的事件类型检查
- 防止事件名称错误

### 2. 灵活性
- 支持预定义事件
- 支持自定义事件
- 灵活的事件处理

### 3. 向后兼容
- 保留已弃用的事件
- 平滑版本升级
- 渐进式迁移

### 4. 扩展性
- 支持自定义事件
- 支持插件事件
- 易于扩展

## 注意事项

1. **弃用事件**: `node.prop.change` 已标记为弃用，建议使用 `node.innerProp.change` 替代
2. **事件名称**: 事件名称是字符串，确保使用正确的事件名称
3. **事件参数**: 事件处理函数的参数类型必须与事件定义匹配
4. **自定义事件**: 自定义事件的参数类型为 `any`，需要自行处理类型检查
5. **性能考虑**: 对于频繁触发的事件（如属性变化），注意性能优化

## 相关文件

- [`event/node.ts`](./08-event-node.ts.md) - 节点事件类型
- [`event/prop.ts`](./09-event-prop.ts.md) - 属性事件类型
- [`../index.ts`](./01-src-index.ts) - 模块入口

## 版本历史

- **v1.3.2**: 当前版本，包含事件配置类型定义

## 使用建议

1. **使用新事件**: 优先使用 `node.innerProp.change` 而不是 `node.prop.change`
2. **事件处理**: 在事件处理函数中添加适当的错误处理
3. **性能优化**: 对于频繁触发的事件，考虑使用防抖或节流
4. **事件清理**: 在组件卸载时移除事件监听器
5. **类型检查**: 对于自定义事件，建议定义明确的类型

## 扩展功能

可以基于这些类型实现以下功能：

1. **事件总线**: 实现全局事件总线
2. **事件队列**: 实现事件队列管理
3. **事件过滤**: 实现事件过滤和拦截
4. **事件重放**: 实现事件重放功能
5. **事件监控**: 实现事件监控和统计
