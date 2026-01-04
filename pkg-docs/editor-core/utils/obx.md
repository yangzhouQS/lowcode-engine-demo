# Obx 模块文档

## 文件路径

`packages/editor-core/src/utils/obx.ts`

## 功能概述

`obx` 模块是编辑器的 MobX 集成模块，配置了 MobX 的全局行为，并导出了 MobX 的核心 API。

## 主要功能

### 1. MobX 配置

- 配置 MobX 的全局行为
- 设置 `enforceActions` 为 `'never'`

### 2. MobX API 导出

- 导出 MobX 的核心 API
- 提供统一的接口

## 配置

### MobX 全局配置

```typescript
configure({
  enforceActions: 'never',
});
```

**`enforceActions: 'never'` 的含义:**
- 允许在 action 外部修改 observable
- 不强制要求所有状态修改都在 action 中进行
- 提供更灵活的状态管理方式

## 导出的 API

### 核心装饰器

- `observable`: 创建可观察对象
- `computed`: 创建计算属性
- `action`: 创建 action
- `observer`: React 高阶组件，用于观察状态变化

### 核心函数

- `makeObservable`: 使对象可观察
- `makeAutoObservable`: 自动使对象可观察
- `autorun`: 自动运行副作用
- `reaction`: 创建响应式副作用
- `when`: 等待条件满足后执行
- `runInAction`: 在 action 中运行函数

## 使用示例

### 创建可观察对象

```typescript
import { observable, makeObservable, action } from '@alilc/lowcode-editor-core';

class Store {
  @observable count = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  increment() {
    this.count++;
  }
}

const store = new Store();
store.increment();
console.log(store.count); // 1
```

### 创建计算属性

```typescript
import { observable, computed, makeObservable } from '@alilc/lowcode-editor-core';

class Store {
  @observable firstName = 'John';
  @observable lastName = 'Doe';

  constructor() {
    makeObservable(this);
  }

  @computed
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const store = new Store();
console.log(store.fullName); // John Doe
```

### 使用 observer

```typescript
import { observer } from '@alilc/lowcode-editor-core';

const Counter = observer(({ store }) => {
  return (
    <div>
      <p>Count: {store.count}</p>
      <button onClick={() => store.increment()}>Increment</button>
    </div>
  );
});
```

### 使用 autorun

```typescript
import { autorun } from '@alilc/lowcode-editor-core';

const store = new Store();

autorun(() => {
  console.log('Count changed:', store.count);
});
```

### 使用 reaction

```typescript
import { reaction } from '@alilc/lowcode-editor-core';

const store = new Store();

reaction(
  () => store.count,
  (count) => {
    console.log('Count changed to:', count);
  }
);
```

### 使用 when

```typescript
import { when } from '@alilc/lowcode-editor-core';

const store = new Store();

when(
  () => store.count > 10,
  () => {
    console.log('Count is greater than 10!');
  }
);
```

### 使用 runInAction

```typescript
import { runInAction } from '@alilc/lowcode-editor-core';

const store = new Store();

runInAction(() => {
  store.count++;
  store.firstName = 'Jane';
});
```

## 注意事项

1. **enforceActions**: 配置为 `'never'`，允许在 action 外部修改 observable
2. **性能**: 使用 computed 可以提高性能，避免重复计算
3. **React 集成**: 使用 observer 高阶组件让 React 组件响应 MobX 状态变化
4. **清理**: 使用 autorun、reaction 时记得返回清理函数
5. **调试**: 可以使用 MobX DevTools 进行调试

## 相关文件

- [`../editor.ts`](../editor.md) - Editor 核心类，使用 MobX
- [`../config.ts`](../config.ts) - 配置管理，使用 MobX

## 外部依赖

- `mobx` - 提供 MobX 核心功能

## 典型使用场景

1. **状态管理**: 使用 MobX 管理应用状态
2. **响应式更新**: 使用 observer 让组件响应状态变化
3. **计算属性**: 使用 computed 计算派生状态
4. **副作用**: 使用 autorun、reaction 处理副作用
5. **异步操作**: 使用 action 处理异步操作
