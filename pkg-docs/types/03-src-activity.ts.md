# src/activity.ts - 活动类型定义

## 文件路径
`packages/types/src/activity.ts`

## 文件概述
定义了活动（Activity）相关的类型，用于描述编辑器中的操作活动。活动类型主要用于记录和追踪编辑器中的操作历史，包括添加、删除、修改等操作。

## 功能说明

### 主要职责
1. **活动类型定义**: 定义不同类型的活动（添加、删除、修改、复合）
2. **活动数据结构**: 定义活动的数据结构，包括操作类型和负载
3. **历史记录**: 支持编辑器的操作历史记录功能

## 类型定义详解

### 1. ActivityType
活动类型枚举，定义了所有可能的活动类型。

```typescript
export enum ActivityType {
  'ADDED' = 'added',        // 添加活动
  'DELETED' = 'deleted',    // 删除活动
  'MODIFIED' = 'modified',  // 修改活动
  'COMPOSITE' = 'composite' // 复合活动
}
```

**活动类型说明**:

- **ADDED (added)**: 表示添加操作
  - 添加新节点
  - 添加新组件
  - 添加新属性

- **DELETED (deleted)**: 表示删除操作
  - 删除节点
  - 删除组件
  - 删除属性

- **MODIFIED (modified)**: 表示修改操作
  - 修改节点属性
  - 修改组件配置
  - 修改属性值

- **COMPOSITE (composite)**: 表示复合操作
  - 多个操作的组合
  - 批量操作
  - 复杂的多步骤操作

**使用场景**:
- 记录编辑器中的操作历史
- 支持撤销/重做功能
- 追踪编辑器的状态变化

### 2. IActivityPayload
活动负载接口，定义活动的详细信息。

```typescript
interface IActivityPayload {
  schema: IPublicTypeNodeSchema;  // 节点 Schema
  location?: {
    parent: {
      nodeId: string;   // 父节点 ID
      index: number;    // 索引位置
    };
  };
  prop: any;           // 属性
  oldValue: any;       // 旧值
  newValue: any;       // 新值
}
```

**负载字段说明**:

- **schema**: 节点的 Schema 定义
  - 包含节点的完整结构信息
  - 用于重建节点状态

- **location**: 可选的位置信息
  - parent: 父节点信息
    - nodeId: 父节点的唯一标识
    - index: 在父节点中的索引位置
  - 用于确定节点在树中的位置

- **prop**: 属性信息
  - 被操作的属性
  - 属性的类型和值

- **oldValue**: 旧值
  - 操作前的值
  - 用于撤销操作

- **newValue**: 新值
  - 操作后的值
  - 用于重做操作

**使用场景**:
- 记录操作的详细信息
- 支持撤销/重做功能
- 恢复编辑器状态

### 3. ActivityData
活动数据类型，包含活动类型和负载。

```typescript
/**
 * TODO: not sure if this is used anywhere
 * @deprecated
 */
export type ActivityData = {
  type: ActivityType;        // 活动类型
  payload: IActivityPayload; // 活动负载
};
```

**注意**:
- 该类型已标记为 `@deprecated`
- 注释说明不确定是否在任何地方使用
- 可能会在未来版本中移除

**使用场景**:
- 记录完整的活动信息
- 传递活动数据
- 历史记录管理

## 使用示例

### 基本活动数据
```typescript
import { ActivityType, ActivityData } from '@alilc/lowcode-types';

const addActivity: ActivityData = {
  type: ActivityType.ADDED,
  payload: {
    schema: {
      componentName: 'Div',
      props: {
        className: 'container'
      }
    },
    location: {
      parent: {
        nodeId: 'root',
        index: 0
      }
    },
    prop: null,
    oldValue: null,
    newValue: null
  }
};
```

### 修改活动数据
```typescript
const modifyActivity: ActivityData = {
  type: ActivityType.MODIFIED,
  payload: {
    schema: {
      componentName: 'Div',
      props: {
        className: 'container'
      }
    },
    prop: 'className',
    oldValue: 'container',
    newValue: 'new-container'
  }
};
```

### 删除活动数据
```typescript
const deleteActivity: ActivityData = {
  type: ActivityType.DELETED,
  payload: {
    schema: {
      componentName: 'Div',
      props: {
        className: 'container'
      }
    },
    location: {
      parent: {
        nodeId: 'root',
        index: 0
      }
    },
    prop: null,
    oldValue: null,
    newValue: null
  }
};
```

### 复合活动数据
```typescript
const compositeActivity: ActivityData = {
  type: ActivityType.COMPOSITE,
  payload: {
    schema: {
      componentName: 'Page',
      children: [
        {
          componentName: 'Div',
          props: {
            className: 'header'
          }
        },
        {
          componentName: 'Div',
          props: {
            className: 'content'
          }
        }
      ]
    },
    prop: null,
    oldValue: null,
    newValue: null
  }
};
```

## 设计特点

### 1. 操作追踪
- 记录所有编辑器操作
- 支持操作历史
- 便于调试和审计

### 2. 撤销/重做
- 保存操作前后的状态
- 支持撤销操作
- 支持重做操作

### 3. 状态恢复
- 保存完整的节点信息
- 支持恢复编辑器状态
- 支持回滚操作

### 4. 类型安全
- 使用枚举定义活动类型
- 严格的类型检查
- 防止类型错误

## 注意事项

1. **弃用警告**: `ActivityData` 类型已标记为 `@deprecated`，建议使用新的类型定义
2. **负载完整性**: 确保负载信息完整，特别是 `schema` 和 `location` 信息
3. **旧值和新值**: 对于修改操作，需要同时保存旧值和新值
4. **位置信息**: 对于添加和删除操作，需要提供位置信息
5. **复合操作**: 复合操作可能包含多个子操作，需要确保数据结构正确

## 相关文件

- [`index.ts`](./01-src-index.ts) - 模块入口
- [`shell/type/node-schema.ts`](./shell/type/node-schema.ts) - 节点 Schema 类型
- [`shell/model/history.ts`](./shell/model/history.ts) - 历史记录模型

## 版本历史

- **v1.3.2**: 当前版本，包含活动类型定义
- 未来版本计划移除 `ActivityData` 类型

## 使用建议

1. **避免使用弃用类型**: `ActivityData` 已标记为弃用，建议使用新的类型定义
2. **完整记录信息**: 记录活动时，确保提供完整的信息，特别是 `schema` 和 `location`
3. **历史记录管理**: 使用活动数据构建历史记录系统，支持撤销/重做功能
4. **操作审计**: 利用活动数据进行操作审计和追踪
5. **性能优化**: 对于大量操作，考虑使用复合活动类型减少记录数量
