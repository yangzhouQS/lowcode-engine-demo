# transaction-manager.ts API 设计文档

## 文件路径

`packages/utils/src/transaction-manager.ts`

## 功能概述

`transaction-manager.ts` 提供了一个事务管理器，用于管理事务的开始和结束事件。它基于事件发射器（EventEmitter）实现，支持在事务执行前后触发回调函数，常用于批量操作、状态管理和性能优化场景。

## 主要功能

1. **事务执行**: 在事务中执行函数，自动触发开始和结束事件
2. **事件监听**: 监听事务开始和结束事件
3. **事务类型**: 支持不同类型的事务（如 REPAINT、SAVE 等）
4. **MobX 集成**: 使用 `runInAction` 确保事务在 MobX 的 action 中执行
5. **取消监听**: 提供取消监听的函数

## 类型定义

```typescript
import { IPublicEnumTransitionType } from '@alilc/lowcode-types';

// 事务类型枚举
enum IPublicEnumTransitionType {
  REPAINT = 'repaint',
  SAVE = 'save',
  RENDER = 'render',
  // ... 其他类型
}
```

## 类定义

```typescript
class TransactionManager {
  emitter: EventEmitter;
  
  executeTransaction(fn: () => void, type?: IPublicEnumTransitionType): void;
  onStartTransaction(fn: () => void, type?: IPublicEnumTransitionType): () => void;
  onEndTransaction(fn: () => void, type?: IPublicEnumTransitionType): () => void;
}
```

## 导出实例

```typescript
export const transactionManager = new TransactionManager();
```

## API 说明

### executeTransaction

执行事务函数，自动触发开始和结束事件。

```typescript
executeTransaction(fn: () => void, type: IPublicEnumTransitionType = IPublicEnumTransitionType.REPAINT): void
```

**参数**:
- `fn`: 要执行的函数
- `type`: 事务类型，默认为 `REPAINT`

**功能**:
1. 触发 `[type]startTransaction` 事件
2. 在 MobX action 中执行函数
3. 触发 `[type]endTransaction` 事件

### onStartTransaction

监听事务开始事件。

```typescript
onStartTransaction(fn: () => void, type: IPublicEnumTransitionType = IPublicEnumTransitionType.REPAINT): () => void
```

**参数**:
- `fn`: 事务开始时执行的回调函数
- `type`: 事务类型，默认为 `REPAINT`

**返回值**: 取消监听的函数

### onEndTransaction

监听事务结束事件。

```typescript
onEndTransaction(fn: () => void, type: IPublicEnumTransitionType = IPublicEnumTransitionType.REPAINT): () => void
```

**参数**:
- `fn`: 事务结束时执行的回调函数
- `type`: 事务类型，默认为 `REPAINT`

**返回值**: 取消监听的函数

## 使用示例

### 基本使用

```typescript
import { transactionManager } from '@alilc/lowcode-utils';

// 执行事务
transactionManager.executeTransaction(() => {
  console.log('Executing transaction...');
  // 执行一些操作
  updateState();
  renderComponents();
});
```

### 监听事务事件

```typescript
import { transactionManager } from '@alilc/lowcode-utils';

// 监听事务开始
const unsubscribeStart = transactionManager.onStartTransaction(() => {
  console.log('Transaction started');
  // 显示加载指示器
  showLoadingIndicator();
});

// 监听事务结束
const unsubscribeEnd = transactionManager.onEndTransaction(() => {
  console.log('Transaction ended');
  // 隐藏加载指示器
  hideLoadingIndicator();
});

// 取消监听
unsubscribeStart();
unsubscribeEnd();
```

### 指定事务类型

```typescript
import { transactionManager, IPublicEnumTransitionType } from '@alilc/lowcode-utils';

// 监听 REPAINT 类型的事务
transactionManager.onStartTransaction(() => {
  console.log('Repaint transaction started');
}, IPublicEnumTransitionType.REPAINT);

// 监听 SAVE 类型的事务
transactionManager.onStartTransaction(() => {
  console.log('Save transaction started');
}, IPublicEnumTransitionType.SAVE);

// 执行不同类型的事务
transactionManager.executeTransaction(() => {
  console.log('Repainting...');
}, IPublicEnumTransitionType.REPAINT);

transactionManager.executeTransaction(() => {
  console.log('Saving...');
}, IPublicEnumTransitionType.SAVE);
```

### 在 React 中使用

```typescript
import { useEffect } from 'react';
import { transactionManager } from '@alilc/lowcode-utils';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const unsubscribeStart = transactionManager.onStartTransaction(() => {
      setLoading(true);
    });
    
    const unsubscribeEnd = transactionManager.onEndTransaction(() => {
      setLoading(false);
    });
    
    return () => {
      unsubscribeStart();
      unsubscribeEnd();
    };
  }, []);
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      <button onClick={() => {
        transactionManager.executeTransaction(() => {
          // 执行一些操作
        });
      }}>
        Execute Transaction
      </button>
    </div>
  );
}
```

### 批量操作优化

```typescript
import { transactionManager } from '@alilc/lowcode-utils';

// 批量更新组件
function batchUpdateComponents(components: Component[]) {
  transactionManager.executeTransaction(() => {
    components.forEach(component => {
      component.update();
    });
  });
}

// 只触发一次重新渲染，而不是 N 次
```

### 性能监控

```typescript
import { transactionManager } from '@alilc/lowcode-utils';

let startTime = 0;

transactionManager.onStartTransaction(() => {
  startTime = Date.now();
});

transactionManager.onEndTransaction(() => {
  const duration = Date.now() - startTime;
  console.log(`Transaction took ${duration}ms`);
});
```

### 事务嵌套

```typescript
import { transactionManager } from '@alilc/lowcode-utils';

// 外层事务
transactionManager.executeTransaction(() => {
  console.log('Outer transaction started');
  
  // 内层事务
  transactionManager.executeTransaction(() => {
    console.log('Inner transaction started');
    // 执行操作
  });
  
  console.log('Outer transaction ended');
});
```

## 实现细节

### 核心代码

```typescript
import { IPublicEnumTransitionType } from '@alilc/lowcode-types';
import { runInAction } from 'mobx';
import EventEmitter from 'events';

class TransactionManager {
  emitter = new EventEmitter();

  executeTransaction = (fn: () => void, type: IPublicEnumTransitionType = IPublicEnumTransitionType.REPAINT): void => {
    this.emitter.emit(`[${type}]startTransaction`);
    runInAction(fn);
    this.emitter.emit(`[${type}]endTransaction`);
  };

  onStartTransaction = (fn: () => void, type: IPublicEnumTransitionType = IPublicEnumTransitionType.REPAINT): () => void => {
    this.emitter.on(`[${type}]startTransaction`, fn);
    return () => {
      this.emitter.off(`[${type}]startTransaction`, fn);
    };
  };

  onEndTransaction = (fn: () => void, type: IPublicEnumTransitionType = IPublicEnumTransitionType.REPAINT): () => void => {
    this.emitter.on(`[${type}]endTransaction`, fn);
    return () => {
      this.emitter.off(`[${type}]endTransaction`, fn);
    };
  };
}

export const transactionManager = new TransactionManager();
```

### 事件命名规则

事件名称格式: `[type]startTransaction` 和 `[type]endTransaction`

示例:
- `[repaint]startTransaction`
- `[repaint]endTransaction`
- `[save]startTransaction`
- `[save]endTransaction`

### MobX 集成

使用 `runInAction` 确保所有状态更新都在 MobX 的 action 中执行，这样可以:
- 自动追踪依赖
- 批量更新
- 避免不必要的重新渲染

## 特性说明

### 单例模式

```typescript
export const transactionManager = new TransactionManager();
```

整个应用共享同一个事务管理器实例，确保所有事务事件都能被正确监听。

### 事件驱动

基于 EventEmitter 实现事件驱动架构，支持:
- 多个监听器
- 动态添加/移除监听器
- 不同类型的事务独立管理

### 类型安全

使用 TypeScript 类型定义，确保:
- 事务类型正确
- 回调函数类型正确
- 返回值类型正确

## 性能考虑

1. **事件监听开销**: 每个监听器都会增加事件触发的时间
2. **内存泄漏**: 如果忘记取消监听，可能导致内存泄漏
3. **事务嵌套**: 支持事务嵌套，但要注意性能影响
4. **MobX action**: 使用 `runInAction` 确保性能优化

## 限制和注意事项

1. **全局状态**: 
   - `transactionManager` 是全局单例
   - 所有监听器都会收到所有事务事件
   - 需要使用 `type` 参数区分不同类型的事务

2. **事件顺序**: 
   - 事务开始事件先触发
   - 然后执行事务函数
   - 最后触发事务结束事件
   - 多个监听器的执行顺序不确定

3. **错误处理**: 
   - 如果事务函数抛出错误，事务结束事件仍会触发
   - 需要在事务函数内部处理错误

4. **异步操作**: 
   - 事务函数应该是同步的
   - 如果需要异步操作，需要在事务外处理

5. **取消监听**: 
   - 必须调用返回的取消函数，否则会导致内存泄漏
   - 在 React 组件中，应该在 useEffect 的清理函数中取消监听

## 最佳实践

1. **React 组件中使用**:
   ```typescript
   useEffect(() => {
     const unsubscribeStart = transactionManager.onStartTransaction(() => {
       // 处理开始事件
     });
     
     const unsubscribeEnd = transactionManager.onEndTransaction(() => {
       // 处理结束事件
     });
     
     return () => {
       unsubscribeStart();
       unsubscribeEnd();
     };
   }, []);
   ```

2. **使用事务类型**:
   ```typescript
   // 为不同类型的事务使用不同的类型
   transactionManager.executeTransaction(() => {
     // 渲染操作
   }, IPublicEnumTransitionType.REPAINT);
   
   transactionManager.executeTransaction(() => {
     // 保存操作
   }, IPublicEnumTransitionType.SAVE);
   ```

3. **错误处理**:
   ```typescript
   transactionManager.executeTransaction(() => {
     try {
       // 执行操作
     } catch (error) {
       console.error('Transaction error:', error);
       throw error; // 重新抛出错误
     }
   });
   ```

4. **批量操作**:
   ```typescript
   // 使用事务批量更新，避免多次渲染
   transactionManager.executeTransaction(() => {
     items.forEach(item => {
       item.update();
     });
   });
   ```

5. **性能监控**:
   ```typescript
   let transactionCount = 0;
   
   transactionManager.onStartTransaction(() => {
     transactionCount++;
   });
   
   transactionManager.onEndTransaction(() => {
     transactionCount--;
     console.log(`Active transactions: ${transactionCount}`);
   });
   ```

## 使用场景

1. **批量更新**: 批量更新多个组件或状态
2. **性能优化**: 减少不必要的重新渲染
3. **状态管理**: 在事务中管理复杂的状态更新
4. **加载状态**: 显示/隐藏加载指示器
5. **性能监控**: 监控事务执行时间
6. **撤销/重做**: 配合历史记录实现撤销/重做功能

## 相关函数

- [`runInAction`](https://mobx.js.org/api.html#runinaction) - MobX action 执行
- [`EventEmitter`](https://nodejs.org/api/events.html) - Node.js 事件发射器

## 使用建议

1. **合理使用事务**: 只在需要批量操作时使用事务
2. **取消监听**: 始终取消不再需要的监听器
3. **错误处理**: 在事务函数中处理可能的错误
4. **类型区分**: 使用事务类型区分不同类型的事务
5. **性能监控**: 监控事务执行时间，优化性能

## 示例：完整的事务管理系统

```typescript
import { transactionManager } from '@alilc/lowcode-utils';
import { IPublicEnumTransitionType } from '@alilc/lowcode-types';

// 事务管理器包装器
class TransactionManagerWrapper {
  private loadingCount = 0;
  private listeners: Map<string, Set<() => void>> = new Map();
  
  // 开始事务
  startTransaction(type: IPublicEnumTransitionType) {
    this.loadingCount++;
    this.notifyListeners('start', type);
  }
  
  // 结束事务
  endTransaction(type: IPublicEnumTransitionType) {
    this.loadingCount--;
    this.notifyListeners('end', type);
  }
  
  // 添加监听器
  addListener(event: 'start' | 'end', type: IPublicEnumTransitionType, fn: () => void) {
    const key = `${event}:${type}`;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(fn);
  }
  
  // 移除监听器
  removeListener(event: 'start' | 'end', type: IPublicEnumTransitionType, fn: () => void) {
    const key = `${event}:${type}`;
    this.listeners.get(key)?.delete(fn);
  }
  
  // 通知监听器
  private notifyListeners(event: 'start' | 'end', type: IPublicEnumTransitionType) {
    const key = `${event}:${type}`;
    this.listeners.get(key)?.forEach(fn => fn());
  }
  
  // 是否正在加载
  isLoading(): boolean {
    return this.loadingCount > 0;
  }
}

// 使用
const wrapper = new TransactionManagerWrapper();

transactionManager.onStartTransaction(() => {
  wrapper.startTransaction(IPublicEnumTransitionType.REPAINT);
}, IPublicEnumTransitionType.REPAINT);

transactionManager.onEndTransaction(() => {
  wrapper.endTransaction(IPublicEnumTransitionType.REPAINT);
}, IPublicEnumTransitionType.REPAINT);

// 在 React 组件中使用
function MyComponent() {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const updateLoading = () => setLoading(wrapper.isLoading());
    
    wrapper.addListener('start', IPublicEnumTransitionType.REPAINT, updateLoading);
    wrapper.addListener('end', IPublicEnumTransitionType.REPAINT, updateLoading);
    
    return () => {
      wrapper.removeListener('start', IPublicEnumTransitionType.REPAINT, updateLoading);
      wrapper.removeListener('end', IPublicEnumTransitionType.REPAINT, updateLoading);
    };
  }, []);
  
  return <div>{loading ? 'Loading...' : 'Ready'}</div>;
}
```
