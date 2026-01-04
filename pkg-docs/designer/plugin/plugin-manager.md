# PluginManager - 插件管理器

## 功能概述

[`PluginManager`](packages/designer/src/plugin/plugin-manager.ts:17) 是低代码引擎的插件管理器，负责管理插件的注册、初始化、销毁等生命周期。

## 主要功能

1. **插件注册**：注册插件到管理器
2. **插件初始化**：初始化已注册的插件
3. **插件销毁**：销毁已注册的插件
4. **依赖管理**：管理插件之间的依赖关系
5. **插件状态管理**：管理插件的激活状态
6. **插件配置**：管理插件的配置项
7. **插件事件**：处理插件的初始化、销毁事件

## 类定义

```typescript
export class PluginManager {
  private plugins = new Map<string, Plugin>();
  private pluginNames: string[] = [];
  private designer: Designer;
  private toBeInitPlugins: string[] = [];
  
  constructor(designer: Designer);
  
  register(plugin: IPublicTypePlugin | IPublicTypePluginCtor, options?: any): void;
  init(pluginName: string): Promise<void>;
  has(pluginName: string): boolean;
  get(pluginName: string): Plugin | undefined;
  getAll(): Plugin[];
  delete(pluginName: string): void;
  dispose(): void;
  
  private async initPlugin(plugin: Plugin): Promise<void>;
  private checkDepends(plugin: Plugin): void;
  private resolveDepends(plugin: Plugin): Promise<void>;
  private emitInitEvents(plugin: Plugin): void;
  private emitDestroyEvents(plugin: Plugin): void;
}
```

## 主要属性

### plugins
插件映射，存储插件名称到插件实例的映射。

类型：`Map<string, Plugin>`

### pluginNames
插件名称列表，存储所有已注册插件的名称。

类型：`string[]`

### designer
设计器实例。

类型：`Designer`

### toBeInitPlugins
待初始化的插件名称列表。

类型：`string[]`

## 主要方法

### register(plugin: IPublicTypePlugin | IPublicTypePluginCtor, options?: any): void
注册插件。

**参数：**
- `plugin`: 插件对象或插件构造函数
- `options`: 插件配置项（可选）

**功能：**
1. 检查插件是否已注册
2. 如果是插件构造函数，创建插件实例
3. 检查插件依赖
4. 将插件添加到插件映射和插件名称列表
5. 将插件添加到待初始化列表

**使用示例：**
```typescript
// 注册插件对象
designer.pluginManager.register({
  name: 'myPlugin',
  init() {
    console.log('Plugin initialized');
  },
  destroy() {
    console.log('Plugin destroyed');
  },
});

// 注册插件构造函数
designer.pluginManager.register(MyPlugin, {
  config: 'value',
});
```

### init(pluginName: string): Promise<void>
初始化插件。

**参数：**
- `pluginName`: 插件名称

**功能：**
1. 获取插件实例
2. 检查插件是否已初始化
3. 解析插件依赖
4. 调用插件的 init 方法
5. 标记插件为已初始化
6. 触发插件初始化事件

**使用示例：**
```typescript
await designer.pluginManager.init('myPlugin');
```

### has(pluginName: string): boolean
检查插件是否已注册。

**参数：**
- `pluginName`: 插件名称

**返回值：** 是否已注册

**使用示例：**
```typescript
if (designer.pluginManager.has('myPlugin')) {
  console.log('Plugin is registered');
}
```

### get(pluginName: string): Plugin | undefined
获取插件实例。

**参数：**
- `pluginName`: 插件名称

**返回值：** 插件实例或 undefined

**使用示例：**
```typescript
const plugin = designer.pluginManager.get('myPlugin');
if (plugin) {
  console.log('Plugin:', plugin);
}
```

### getAll(): Plugin[]
获取所有插件实例。

**返回值：** 插件实例列表

**使用示例：**
```typescript
const allPlugins = designer.pluginManager.getAll();
console.log('All plugins:', allPlugins);
```

### delete(pluginName: string): void
删除插件。

**参数：**
- `pluginName`: 插件名称

**功能：**
1. 获取插件实例
2. 调用插件的 destroy 方法
3. 从插件映射中删除
4. 从插件名称列表中删除

**使用示例：**
```typescript
designer.pluginManager.delete('myPlugin');
```

### dispose(): void
销毁所有插件。

**功能：**
1. 遍历所有插件
2. 调用每个插件的 destroy 方法
3. 清空插件映射和插件名称列表

**使用示例：**
```typescript
designer.pluginManager.dispose();
```

## 内部方法

### private async initPlugin(plugin: Plugin): Promise<void>
初始化插件。

**参数：**
- `plugin`: 插件实例

**功能：**
1. 检查插件是否已初始化
2. 解析插件依赖
3. 调用插件的 init 方法
4. 标记插件为已初始化
5. 触发插件初始化事件

### private checkDepends(plugin: Plugin): void
检查插件依赖。

**参数：**
- `plugin`: 插件实例

**功能：**
1. 检查插件依赖是否已注册
2. 如果依赖未注册，抛出错误

### private async resolveDepends(plugin: Plugin): Promise<void>
解析插件依赖。

**参数：**
- `plugin`: 插件实例

**功能：**
1. 遍历插件依赖列表
2. 初始化每个依赖插件
3. 等待所有依赖初始化完成

### private emitInitEvents(plugin: Plugin): void
触发插件初始化事件。

**参数：**
- `plugin`: 插件实例

**功能：**
1. 触发 `onPluginInit` 事件
2. 触发 `on${plugin.name}Init` 事件

### private emitDestroyEvents(plugin: Plugin): void
触发插件销毁事件。

**参数：**
- `plugin`: 插件实例

**功能：**
1. 触发 `onPluginDestroy` 事件
2. 触发 `on${plugin.name}Destroy` 事件

## 类型定义

### IPublicTypePlugin
插件对象类型定义。

```typescript
export interface IPublicTypePlugin {
  name: string;
  init?(ctx: IPublicTypePluginContext, options?: any): Promise<void> | void;
  destroy?(ctx: IPublicTypePluginContext): void;
}
```

### IPublicTypePluginCtor
插件构造函数类型定义。

```typescript
export interface IPublicTypePluginCtor {
  new (ctx: IPublicTypePluginContext, options?: any): IPublicTypePlugin;
}
```

### IPublicTypePluginContext
插件上下文类型定义。

```typescript
export interface IPublicTypePluginContext {
  designer: IDesigner;
  editor: IPublicModelEditor;
  project: IProject;
  setReadOnly?: (readOnly: boolean) => void;
  // ... 其他属性
}
```

## 使用示例

### 注册插件

```typescript
// 注册插件对象
designer.pluginManager.register({
  name: 'myPlugin',
  async init(ctx, options) {
    console.log('Plugin initialized with options:', options);
    // 初始化逻辑
  },
  destroy(ctx) {
    console.log('Plugin destroyed');
    // 清理逻辑
  },
});

// 注册插件构造函数
class MyPlugin {
  name = 'myPlugin';
  
  constructor(private ctx: IPublicTypePluginContext, private options?: any) {
    console.log('Plugin created with options:', options);
  }
  
  async init() {
    console.log('Plugin initialized');
    // 初始化逻辑
  }
  
  destroy() {
    console.log('Plugin destroyed');
    // 清理逻辑
  }
}

designer.pluginManager.register(MyPlugin, {
  config: 'value',
});
```

### 初始化插件

```typescript
await designer.pluginManager.init('myPlugin');
```

### 检查插件

```typescript
if (designer.pluginManager.has('myPlugin')) {
  console.log('Plugin is registered');
}

const plugin = designer.pluginManager.get('myPlugin');
if (plugin) {
  console.log('Plugin:', plugin);
}
```

### 删除插件

```typescript
designer.pluginManager.delete('myPlugin');
```

### 销毁所有插件

```typescript
designer.pluginManager.dispose();
```

### 插件依赖

```typescript
// 插件 A
designer.pluginManager.register({
  name: 'pluginA',
  async init(ctx) {
    console.log('Plugin A initialized');
  },
});

// 插件 B 依赖插件 A
designer.pluginManager.register({
  name: 'pluginB',
  deps: ['pluginA'],
  async init(ctx) {
    console.log('Plugin B initialized');
  },
});

// 初始化插件 B 会自动初始化插件 A
await designer.pluginManager.init('pluginB');
```

### 插件事件

```typescript
// 监听插件初始化事件
designer.pluginManager.on('onPluginInit', (plugin) => {
  console.log('Plugin initialized:', plugin.name);
});

// 监听特定插件初始化事件
designer.pluginManager.on('onMyPluginInit', (plugin) => {
  console.log('MyPlugin initialized');
});

// 监听插件销毁事件
designer.pluginManager.on('onPluginDestroy', (plugin) => {
  console.log('Plugin destroyed:', plugin.name);
});
```

## 注意事项

1. **插件名称唯一**：插件名称必须唯一，否则会覆盖已注册的插件
2. **依赖管理**：插件依赖必须在注册时声明，初始化时会自动解析
3. **初始化顺序**：插件按照依赖顺序初始化，依赖先于被依赖初始化
4. **生命周期**：插件有 init 和 destroy 两个生命周期方法
5. **上下文传递**：插件的 init 和 destroy 方法会接收插件上下文
6. **异步初始化**：插件的 init 方法可以是异步的
7. **事件触发**：插件初始化和销毁时会触发相应的事件
8. **配置传递**：插件配置项会在注册时传递给插件构造函数

## 相关文件

- [`../designer/designer.ts`](../designer/designer.md) - 设计器核心
- [`../project/project.ts`](../project/project.md) - 项目管理

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-editor-core`: 编辑器核心库
