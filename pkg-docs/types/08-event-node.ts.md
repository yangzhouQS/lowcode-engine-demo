# event/node.ts - 节点事件类型定义

## 文件路径
`packages/types/src/event/node.ts`

## 文件概述
定义了节点事件相关的类型和常量，包括节点重新渲染事件和属性变化事件。

## 功能说明

### 主要职责
1. **节点事件定义**: 定义节点相关的事件类型
2. **事件常量**: 定义事件名称常量
3. **事件参数**: 定义事件处理函数的参数类型

## 类型定义详解

### 1. RerenderOptions
节点重新渲染事件的参数接口。

```typescript
export interface RerenderOptions {
  time: number;              // 渲染时间（毫秒）
  componentName?: string;     // 组件名称
  type?: string;            // 类型
  nodeCount?: number;       // 节点数量
}
```

**字段详细说明**:

#### time
- **类型**: `number`
- **必填**: 是
- **说明**: 渲染时间，单位为毫秒
- **示例**: `123`, `45.6`
- **使用场景**:
  - 性能监控
  - 渲染性能分析
  - 慢渲染检测

#### componentName
- **类型**: `string`
- **必填**: 否
- **说明**: 组件名称
- **示例**: `"Div"`, `"Button"`, `"Page"`
- **使用场景**:
  - 识别渲染的组件
  - 组件性能分析
  - 调试和日志

#### type
- **类型**: `string`
- **必填**: 否
- **说明**: 类型
- **示例**: `"Page"`, `"Component"`, `"Container"`
- **使用场景**:
  - 识别节点类型
  - 类型分类
  - 条件处理

#### nodeCount
- **类型**: `number`
- **必填**: 否
- **说明**: 节点数量
- **示例**: `10`, `100`, `1000`
- **使用场景**:
  - 统计节点数量
  - 复杂度分析
  - 性能评估

### 2. Rerender
节点重新渲染事件名称常量。

```typescript
export const Rerender = 'node.edit.rerender.time';
```

**说明**:
- **常量名称**: `Rerender`
- **事件名称**: `'node.edit.rerender.time'`
- **使用场景**:
  - 监听节点重新渲染
  - 性能监控
  - 渲染统计

### 3. 导出
```typescript
export * as Prop from './prop';
```

导出属性事件相关的所有类型和常量。

## 使用示例

### 基本重新渲染事件
```typescript
import { Rerender, RerenderOptions } from '@alilc/lowcode-types';

// 监听重新渲染事件
editor.on(Rerender, (options: RerenderOptions) => {
  console.log('Node rerendered:', options);
  console.log('Render time:', options.time, 'ms');
  console.log('Component:', options.componentName);
});
```

### 性能监控
```typescript
import { Rerender, RerenderOptions } from '@alilc/lowcode-types';

// 性能监控
editor.on(Rerender, (options: RerenderOptions) => {
  const { time, componentName, nodeCount } = options;
  
  console.log(`Component ${componentName} rerendered in ${time}ms`);
  console.log(`Total nodes: ${nodeCount}`);
  
  // 慢渲染警告
  if (time > 100) {
    console.warn(`Slow render detected: ${componentName} took ${time}ms`);
  }
  
  // 复杂度警告
  if (nodeCount && nodeCount > 500) {
    console.warn(`Complex component: ${componentName} has ${nodeCount} nodes`);
  }
});
```

### 渲染统计
```typescript
import { Rerender, RerenderOptions } from '@alilc/lowcode-types';

// 渲染统计
const renderStats = {
  totalRenders: 0,
  totalTime: 0,
  componentStats: {} as Record<string, { count: number; totalTime: number }>
};

editor.on(Rerender, (options: RerenderOptions) => {
  const { time, componentName } = options;
  
  // 总体统计
  renderStats.totalRenders++;
  renderStats.totalTime += time;
  
  // 组件统计
  if (componentName) {
    if (!renderStats.componentStats[componentName]) {
      renderStats.componentStats[componentName] = { count: 0, totalTime: 0 };
    }
    renderStats.componentStats[componentName].count++;
    renderStats.componentStats[componentName].totalTime += time;
  }
  
  console.log('Render stats:', renderStats);
});
```

### 类型过滤
```typescript
import { Rerender, RerenderOptions } from '@alilc/lowcode-types';

// 根据类型过滤事件
editor.on(Rerender, (options: RerenderOptions) => {
  const { type, componentName } = options;
  
  // 只处理特定类型的节点
  if (type === 'Page') {
    console.log('Page rerendered:', componentName);
  }
  
  // 只处理特定组件
  if (componentName === 'Button') {
    console.log('Button rerendered:', options);
  }
});
```

### 节点数量监控
```typescript
import { Rerender, RerenderOptions } from '@alilc/lowcode-types';

// 节点数量监控
editor.on(Rerender, (options: RerenderOptions) => {
  const { nodeCount, componentName } = options;
  
  if (nodeCount) {
    console.log(`Component ${componentName} has ${nodeCount} nodes`);
    
    // 节点数量分级
    if (nodeCount < 10) {
      console.log('Simple component');
    } else if (nodeCount < 100) {
      console.log('Medium complexity component');
    } else {
      console.log('Complex component');
    }
  }
});
```

## 设计特点

### 1. 性能监控
- 提供渲染时间信息
- 支持性能分析
- 便于优化

### 2. 详细信息
- 提供组件名称
- 提供类型信息
- 提供节点数量

### 3. 类型安全
- 完整的 TypeScript 类型定义
- 严格的类型检查
- 防止类型错误

### 4. 灵活性
- 大部分字段为可选
- 支持不同场景
- 易于扩展

## 注意事项

1. **性能考虑**: 重新渲染事件可能频繁触发，注意性能优化
2. **可选字段**: 大部分字段为可选，使用前需要检查是否存在
3. **时间单位**: 渲染时间的单位是毫秒
4. **事件名称**: 使用常量 `Rerender` 而不是硬编码字符串
5. **统计逻辑**: 在事件处理函数中添加统计逻辑时，注意不要影响性能

## 相关文件

- [`event/index.ts`](./07-event-index.ts) - 事件配置类型
- [`event/prop.ts`](./09-event-prop.ts) - 属性事件类型
- [`../index.ts`](./01-src-index.ts) - 模块入口

## 版本历史

- **v1.3.2**: 当前版本，包含节点事件类型定义

## 使用建议

1. **性能优化**: 对于频繁触发的事件，考虑使用防抖或节流
2. **错误处理**: 在事件处理函数中添加适当的错误处理
3. **统计收集**: 使用事件收集性能数据，用于优化
4. **条件过滤**: 根据组件名称或类型过滤事件，减少不必要的处理
5. **日志记录**: 合理使用日志，避免日志过多影响性能

## 扩展功能

可以基于这些类型实现以下功能：

1. **性能分析工具**: 实现完整的性能分析工具
2. **渲染监控**: 实现渲染监控和报警
3. **组件分析**: 实现组件复杂度分析
4. **性能报告**: 生成性能报告
5. **优化建议**: 基于性能数据提供优化建议
