# src/resource.ts 文档

## 文件路径

`packages/workspace/src/resource.ts`

## 功能概述

资源类，封装编辑器视图资源，提供资源数据管理、编辑器视图管理、资源操作接口（导入、保存、获取 URL）和事件系统。

## 主要功能

1. **资源数据管理**: 存储资源数据和选项
2. **编辑器视图管理**: 管理多个编辑器视图
3. **资源操作**: 导入 Schema、保存数据、获取 URL
4. **事件系统**: 发射资源相关事件
5. **上下文集成**: 集成 BasicContext

## 代码分析

### 类定义

```typescript
export class Resource implements IResource {
  readonly resourceData: IPublicResourceData;
  readonly resourceType: IResourceType;
  readonly workspace: IWorkspace;
  readonly options: any;
  private context: BasicContext;
  resourceTypeInstance: IPublicTypeResourceTypeConfig;
  editorViewMap: Map<string, IPublicTypeEditorView>;
  emitter: IEventBus;
}
```

### 关键属性

- `resourceData`: 资源数据
- `resourceType`: 资源类型
- `workspace`: 工作空间实例
- `options`: 资源选项
- `context`: 基础上下文
- `resourceTypeInstance`: 资源类型实例
- `editorViewMap`: 编辑器视图映射
- `emitter`: 事件总线

### 构造函数

```typescript
constructor(
  readonly resourceData: IPublicResourceData,
  readonly resourceType: IResourceType,
  readonly workspace: IWorkspace
)
```

**说明**:
- 创建 BasicContext 实例
- 创建资源类型实例
- 初始化编辑器视图映射
- 初始化事件总线
- 调用初始化方法

### 核心方法

#### init()

```typescript
private init(): void
```

**功能**: 初始化资源

**说明**:
- 遍历编辑器视图
- 为每个视图创建 Context 实例
- 存储到编辑器视图映射中

#### import()

```typescript
async import(schema: any): Promise<any>
```

**功能**: 导入资源 Schema

**参数**:
- `schema`: Schema 数据

**返回值**: `Promise<any>`

**说明**:
- 调用资源类型实例的 import 方法
- 返回导入结果

**使用示例**:
```typescript
const schema = {
  componentName: 'Page',
  props: {},
  children: []
};
const result = await resource.import(schema);
```

#### save()

```typescript
async save(value: any): Promise<any>
```

**功能**: 保存资源数据

**参数**:
- `value`: 要保存的数据

**返回值**: `Promise<any>`

**说明**:
- 调用资源类型实例的 save 方法
- 返回保存结果

**使用示例**:
```typescript
const value = { data: 'some data' };
const result = await resource.save(value);
```

#### url()

```typescript
async url(): Promise<string>
```

**功能**: 获取资源 URL

**返回值**: `Promise<string>`

**说明**:
- 调用资源类型实例的 url 方法
- 返回 URL 字符串

**使用示例**:
```typescript
const url = await resource.url();
console.log(url);
```

#### getEditorView()

```typescript
getEditorView(viewName: string): IPublicTypeEditorView | undefined
```

**功能**: 获取编辑器视图

**参数**:
- `viewName`: 视图名称

**返回值**: `IPublicTypeEditorView | undefined`

**说明**:
- 从编辑器视图映射中查找视图
- 返回视图配置或 undefined

**使用示例**:
```typescript
const view = resource.getEditorView('editor-view');
```

## 使用示例

### 创建资源

```typescript
import { Resource } from '@alilc/lowcode-workspace';

const resource = new Resource(
  { resourceName: 'myResource', options: {} },
  resourceType,
  workspace
);
```

### 导入 Schema

```typescript
const schema = {
  componentName: 'Page',
  props: {},
  children: []
};
await resource.import(schema);
```

### 保存数据

```typescript
const value = { data: 'some data' };
await resource.save(value);
```

### 获取 URL

```typescript
const url = await resource.url();
console.log(url);
```

### 获取编辑器视图

```typescript
const view = resource.getEditorView('editor-view');
```

## 注意事项

1. **资源类型**: 资源类型需要在创建资源前注册
2. **异步操作**: 所有资源操作都是异步的，需要使用 await
3. **错误处理**: 使用 try-catch 处理异步操作的错误
4. **上下文隔离**: 每个资源有独立的 BasicContext 实例

## 最佳实践

1. **资源验证**: 创建资源前验证资源数据
2. **错误处理**: 使用 try-catch 处理所有异步操作
3. **资源复用**: 避免重复创建相同的资源
4. **视图管理**: 合理管理编辑器视图，避免视图过多

## 相关文件

- [`resource-type.ts`](./07-src-resource-type.ts.md) - 资源类型类
- [`context/base-context.ts`](./08-src-context-base-context.ts.md) - 基础上下文类
- [`workspace.ts`](./05-src-workspace.ts.md) - 工作空间核心类

## 总结

`src/resource.ts` 是资源类，负责管理编辑器视图资源。它提供了完整的资源管理能力，包括资源数据管理、编辑器视图管理、资源操作和事件系统，为开发者提供了强大、灵活的资源管理能力。
